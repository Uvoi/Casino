import json
from fastapi import APIRouter, HTTPException, Response, Depends
from uuid import UUID, uuid4
from endpoints.login import create_user, load_users_from_file, save_users_to_file
# from fastapi.responses import JSONResponse

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



@router.put("/api/change_name", dependencies=[Depends(auth.cookie)])
async def change_name(new_name: str, session_data: auth.SessionData = Depends(auth.verifier), session_id: UUID = Depends(auth.cookie)):
    existing_users = load_users_from_file()

    # Найдем пользователя с указанной электронной почтой
    found_user = None
    for user in existing_users:
        if user["email"] == session_data.email:
            found_user = user
            break

    if found_user is not None:
        # Обновим имя пользователя
        found_user["name"] = new_name

        # Обновим данные сессии с новым именем
        session_data.name = new_name
        await auth.backend.update(session_id, session_data)

        # Сохраните обновленные данные пользователей обратно в файл
        save_users_to_file(existing_users)

        return {"message": "Name updated successfully"}

    # Если пользователь не найден, бросьте исключение
    raise HTTPException(status_code=404, detail="User not found")


