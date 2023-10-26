from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()



class User(BaseModel):
    name: str
    email: str
    password: str

# Добавьте middleware для обработки CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Укажите только методы, которые используются
    allow_headers=["*"],  # Укажите только необходимые заголовки
)

users_file = 'users.json'

@app.post("/api/user")
async def create_user(user: User):
    # Загрузить существующие пользователи из файла, если он существует
    # print(f"Received request with email: {email} and password: {password}")
    existing_users = load_users_from_file()



    # error = False
    # Проверить, существует ли пользователь с такой почтой
    for users in existing_users: 
        if user.email == users["email"]:
            # error = False
            raise HTTPException(status_code=400, detail="Пользователь с такой почтой уже существует")


    # if not error:
    # Создать нового пользователя
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




def load_users_from_file():
    try:
        with open(users_file, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_users_to_file(users):
    with open(users_file, 'w') as file:
        json.dump(users, file, indent=2)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)