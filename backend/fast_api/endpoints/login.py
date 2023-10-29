from fastapi import HTTPException
from fastapi import APIRouter
import json
from user import * 



router = APIRouter()


users_file = 'data/users.json'

@router.post("/api/user")
async def create_user(user: User):
    existing_users = load_users_from_file()

    # Проверить, существует ли пользователь с такой почтой
    for users in existing_users: 
        if user.email == users["email"]:
            # error = False
            raise HTTPException(status_code=400, detail="Пользователь с такой почтой уже существует")

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": user.password
    }

    # Добавить нового пользователя к существующим пользователям 
    existing_users.append(new_user)

    #Сохранить обновленные данные в файл
    save_users_to_file(existing_users)



    return new_user["email"]



@router.get("/api/user/{user_email}", response_model = UserOut)
async def return_user(user_email):
    existing_users = load_users_from_file()
    for user in existing_users:
        if user["email"] == user_email:
            return user
    raise HTTPException(status_code=400, detail="Пользователь с такой почтой не существует")


def load_users_from_file():
    try:
        with open(users_file, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_users_to_file(users):
    with open(users_file, 'w') as file:
        json.dump(users, file, indent=2)