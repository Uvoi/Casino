import json
from fastapi import APIRouter, HTTPException, Response, Depends
from uuid import UUID, uuid4
from endpoints.login import create_user, load_users_from_file

from user import User
from auth import auth

router = APIRouter()

users_file = 'data/users.json'


@router.post("/api/create_session")
async def create_session(session_d : auth.SessionData, response : Response):

    data = auth.SessionData(name = session_d.name, email = session_d.email, password = session_d.password)
    # await create_user(data)

    new_data = auth.SessionData(name = str(await create_user(data)), email = session_d.email, password = session_d.password)
    data = new_data

    session = uuid4()
    await auth.backend.create(session, data)
    auth.cookie.attach_to_response(response, session)


    return f"created session for {data}"



@router.get("/api/whoami", dependencies=[Depends(auth.cookie)], response_model = auth.SessionDataOut)
async def whoami(session_data: auth.SessionData = Depends(auth.verifier)):
    return session_data


@router.post("/api/delete_session")
async def del_session(response: Response, session_id: UUID = Depends(auth.cookie)):
    try:
        await auth.backend.delete(session_id)
        auth.cookie.delete_from_response(response)
        return "deleted session"
    except Exception as e:
        raise HTTPException(status_code=403, detail="Session doesn't exist")

@router.get("/api/get_money", dependencies=[Depends(auth.cookie)])
async def get_money(session_data: auth.SessionData = Depends(auth.verifier)):
    existing_users = load_users_from_file()

    for users in existing_users:
        if session_data.email == users["email"]:
            return users["money"]

    raise HTTPException(status_code=405, detail="invalid email")
