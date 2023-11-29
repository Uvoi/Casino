from fastapi import APIRouter, HTTPException, Response, Depends
from uuid import UUID, uuid4
from user import *  
from auth import auth
from endpoints.login import load_users_from_file, save_users_to_file
import random
import math



router = APIRouter()


capabilities = [90, 66, 66, 50, 50, 40]


users_file = 'data/users.json'


class Shellgame_result(BaseModel):
    result: str
    bet: int

class GuessingGame(BaseModel):
    row: int

class GuessingGame_result(BaseModel):
    result: str
    bet: int
    mult: float



@router.get("/api/games/shellgame")
async def shellgame():
    numbers = [0,1,2]    
    random.shuffle(numbers)
    random_number = random.choice(numbers)
    return {random_number}

    # Если пользователь не найден, бросьте исключение
    raise HTTPException(status_code=469, detail="Serv error")



    

@router.patch("/api/games/shellgame/result",  dependencies=[Depends(auth.cookie)])
async def shellgame_result(shellgame_result: Shellgame_result, session_data: auth.SessionData = Depends(auth.verifier),session_id: UUID = Depends(auth.cookie)):
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




@router.post("/api/games/guessinggame")
async def guessinggame(game: GuessingGame):

    ROWS = {
        1: {'size': 2, 'num_ones': 2},
        2: {'size': 3, 'num_ones': 2},
        3: {'size': 3, 'num_ones': 2},
        4: {'size': 4, 'num_ones': 2},
        5: {'size': 4, 'num_ones': 2},
        6: {'size': 5, 'num_ones': 2},
    }

    if game.row not in ROWS:
        raise HTTPException(status_code=499, detail="invalid row")

    size = ROWS[game.row]['size']
    num_ones = ROWS[game.row]['num_ones']

    array = [0] * size

    for _ in range(num_ones):
        while True:
            position = random.randint(0, size - 1)
            if array[position] == 0:
                array[position] = 1
                break


    # result = random.choices(['win', 'lose'], weights=[capabilities[game.raw-1], 100-capabilities[game.raw-1]]) 
    # result = [0,1]
    print(array)
    return array

    # Если пользователь не найден, бросьте исключение
    raise HTTPException(status_code=477, detail="Serv error")


@router.patch("/api/games/guessinggame/result",  dependencies=[Depends(auth.cookie)])
async def guessinggame_result(guessinggame_result: GuessingGame_result, session_data: auth.SessionData = Depends(auth.verifier),session_id: UUID = Depends(auth.cookie)):
    # return (shellgame_result.result, shellgame_result.bet)

    existing_users = load_users_from_file()
    found_user = None
    for user in existing_users:
        if user["email"] == session_data.email:
            found_user = user
            break

    if found_user is not None:

        if guessinggame_result.result == "win":
            found_user["money"] = int(found_user["money"]) + math.ceil(guessinggame_result.bet*guessinggame_result.mult)
            save_users_to_file(existing_users)

        elif guessinggame_result.result == "lose":
            found_user["money"] = int(found_user["money"]) - guessinggame_result.bet
            save_users_to_file(existing_users)

        else : raise HTTPException(status_code=402, detail="invalid operation")

        return {"message": "Money updated successfully"}



    # Если пользователь не найден, бросьте исключение
    raise HTTPException(status_code=468, detail="Serv error")