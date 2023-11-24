from fastapi import APIRouter, HTTPException, Response, Depends
from uuid import UUID, uuid4
from user import *  
from auth import auth
from endpoints.login import load_users_from_file, save_users_to_file
import random



router = APIRouter()


users_file = 'data/users.json'


class Shellgame_result(BaseModel):
    result: str
    bet: int



@router.get("/api/games/shellgame")
async def shellgame():
    numbers = [0,1,2]    
    random.shuffle(numbers)
    random_number = random.choice(numbers)
    return {random_number}

    # Если пользователь не найден, бросьте исключение
    raise HTTPException(status_code=469, detail="Serv error")



    

@router.patch("/api/games/shellgame/result",  dependencies=[Depends(auth.cookie)])
async def shellgame_result(shellgame_result: Shellgame_result,session_data: auth.SessionData = Depends(auth.verifier),session_id: UUID = Depends(auth.cookie)):
    # return (shellgame_result.result, shellgame_result.bet)

    existing_users = load_users_from_file()
    found_user = None
    for user in existing_users:
        if user["email"] == session_data.email:
            found_user = user
            break

    if found_user is not None:

        if shellgame_result.result == "win":
            found_user["money"] = int(found_user["money"]) + shellgame_result.bet*2
            save_users_to_file(existing_users)

        elif shellgame_result.result == "lose":
            found_user["money"] = int(found_user["money"]) - shellgame_result.bet
            save_users_to_file(existing_users)

        else : raise HTTPException(status_code=402, detail="invalid operation")

        return {"message": "Money updated successfully"}



    # Если пользователь не найден, бросьте исключение
    raise HTTPException(status_code=468, detail="Serv error")