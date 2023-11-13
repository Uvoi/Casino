from fastapi import  FastAPI, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID, uuid4

from auth import auth
from endpoints.login import router as login_router
from endpoints.session import router as session_router
from endpoints.moneyUD import router as moneyUD_router


app = FastAPI()

# session_router.backend = backend
app.include_router(login_router)
app.include_router(session_router)
app.include_router(moneyUD_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
