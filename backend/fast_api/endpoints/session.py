import json
from fastapi import APIRouter
from fastapi import Response, Depends
from uuid import UUID, uuid4

from auth import auth

router = APIRouter()



@router.post("/create_session/{email_p}")
async def create_session(email_p: str, response: Response):

    session = uuid4()
    data = auth.SessionData(email_s=email_p)

    await auth.backend.create(session, data)
    auth.cookie.attach_to_response(response, session)

    return f"created session for {email_p}"


@router.get("/whoami", dependencies=[Depends(auth.cookie)])
async def whoami(session_data: auth.SessionData = Depends(auth.verifier)):
    return session_data


@router.post("/delete_session")
async def del_session(response: Response, session_id: UUID = Depends(auth.cookie)):
    await auth.backend.delete(session_id)
    auth.cookie.delete_from_response(response)
    return "deleted session"
