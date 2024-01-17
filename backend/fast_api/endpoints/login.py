from fastapi import HTTPException
from fastapi import APIRouter

from user import * 
from SQL.BaseSQL import *


router = APIRouter()

users_file = 'data/users.json'

connection = connect_to_exist_database()
check = check_connection(connection)
if check == False:
        create_table(connection)

@router.post("/api/user")
async def create_user(user: User):
    existing_users = load_users_from_file()

    if existing_users:
        for users in existing_users: 
            if (user.email == users["email"]) and (user.password == users["password"]):
                return(users["name"])
            elif (user.email == users["email"]) and (user.password != users["password"]):
                raise HTTPException(status_code=400, detail="Неверный пароль")

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "money" : 0
    }

    insert_user(user.name, user.email, user.password, new_user["money"])

    return user.name


@router.get("/api/user/{user_email}", response_model = UserOut)
async def return_user(user_email):
    existing_users = load_users_from_file()
    for user in existing_users:
        if user["email"] == user_email:
            return user
    raise HTTPException(status_code=400, detail="Пользователь с такой почтой не существует")



def load_users_from_file():
    return get_data_from_table(connection)

def insert_user(name, email, password, money):
    insert_data_info_table(connection, name, email, password, money)

def upate_user(uUser): 
    update_data(connection, uUser["name"], uUser["email"], uUser["money"])
