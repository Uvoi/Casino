from fastapi import  FastAPI, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID, uuid4

from auth import auth
from endpoints.login import router as login_router
from endpoints.session import router as session_router


app = FastAPI()

app.include_router(login_router)
app.include_router(session_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Укажите только методы, которые используются
    allow_headers=["*"],  # Укажите только необходимые заголовки
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)