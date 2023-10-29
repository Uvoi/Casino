import json
from fastapi import APIRouter
from fastapi import Response, Depends
from uuid import UUID, uuid4

from auth import auth

router = APIRouter()



@router.post("/api/create_session/")
async def create_session(session_d : auth.SessionData, response : Response):

    session = uuid4()
    data = auth.SessionData(name_s = session_d.name_s, email_s = session_d.email_s, password_s = session_d.password_s)

    await auth.backend.create(session, data)
    auth.cookie.attach_to_response(response, session)

    return f"created session for {session_d}"



@router.get("/api/whoami", dependencies=[Depends(auth.cookie)], response_model = auth.SessionDataOut)
async def whoami(session_data: auth.SessionData = Depends(auth.verifier)):
    return session_data


@router.post("/api/delete_session")
async def del_session(response: Response, session_id: UUID = Depends(auth.cookie)):
    await auth.backend.delete(session_id)
    auth.cookie.delete_from_response(response)
    return "deleted session"

