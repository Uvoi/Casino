from fastapi import APIRouter, HTTPException, Response, Depends
from uuid import UUID, uuid4
from user import *  
from auth import auth
from endpoints.login import load_users_from_file, save_users_to_file
import random
import math
from typing import List


router = APIRouter()


capabilities = [90, 66, 66, 50, 50, 40]

scratchgame_ar = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]

scratchgame_opened = [-1,-1,-1]

rouletteslidergame_win_index = 0

rouletteslidergame_ar = [5,10,25,100,500,1000,5000,10000,50000,100000]




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

class SlotsGame(BaseModel):
    bet: int

class RouletteGame_result(BaseModel):
    bet: int
    sumOfMults: int
    betsCount: int

class Scratchgame(BaseModel):
    row: int
    col: int
    index: int

class Scratchgame_result(BaseModel):
    bet: int

class Scratchgame_new(BaseModel):
    masNumber: int

class RouletteSliderGame_result(BaseModel):
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

    first_num_ones = 2
    if random.random() <= 0.5:
        first_num_ones = 1

    ROWS = {
        1: {'size': 2, 'num_ones': first_num_ones},
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
    # print(array)
    return array

    raise HTTPException(status_code=477, detail="Serv error")


@router.patch("/api/games/guessinggame/result",  dependencies=[Depends(auth.cookie)])
async def guessinggame_result(guessinggame_result: GuessingGame_result, session_data: auth.SessionData = Depends(auth.verifier),session_id: UUID = Depends(auth.cookie)):

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



    raise HTTPException(status_code=468, detail="Serv error")


@router.patch("/api/games/slotsgame", dependencies=[Depends(auth.cookie)])
async def slotsgame(slots_game: SlotsGame, session_data: auth.SessionData = Depends(auth.verifier),session_id: UUID = Depends(auth.cookie)):

    existing_users = load_users_from_file()
    found_user = None
    for user in existing_users:
        if user["email"] == session_data.email:
            found_user = user
            break


    random_numbers = [8,8,8]

    if found_user is not None:

        probabilities = [0.06, 0.08, 0.08, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18]

        
        if random.random() < 0.2:
            element = random.choices(range(9), weights=probabilities)
            random_numbers = element + element + element
            found_user["money"] = int(found_user["money"]) + slots_game.bet*(9-element[0])
            save_users_to_file(existing_users)

        else:
            random_numbers = random.choices(range(9), k=3)
            found_user["money"] = int(found_user["money"]) - slots_game.bet
            save_users_to_file(existing_users)


        print(random_numbers)
        return random_numbers


    raise HTTPException(status_code=468, detail="Serv error")

@router.patch("/api/games/roulettegame/result",  dependencies=[Depends(auth.cookie)])
async def roulettegame_result(rg: RouletteGame_result, session_data: auth.SessionData = Depends(auth.verifier),session_id: UUID = Depends(auth.cookie)):

    existing_users = load_users_from_file()
    found_user = None
    for user in existing_users:
        if user["email"] == session_data.email:
            found_user = user
            break

    if found_user is not None:

        found_user["money"] = int(found_user["money"]) + rg.bet*(rg.sumOfMults)
        found_user["money"] = int(found_user["money"]) - rg.bet*rg.betsCount
        save_users_to_file(existing_users)



        return rg.bet*(rg.sumOfMults)-rg.bet*rg.betsCount
    
    else : raise HTTPException(status_code=402, detail="invalid operation")



    raise HTTPException(status_code=468, detail="Serv error")

@router.get("/api/games/roulettegame")
async def roulettegame():
    res_num = random.randint(0, 37)
    if res_num == 37:
        res_num = "00"
    else: 
        res_num = str(res_num)

    return res_num




@router.patch("/api/games/scratchgame/result",  dependencies=[Depends(auth.cookie)])
async def scratchgame_result(scrg_result: Scratchgame_result, session_data: auth.SessionData = Depends(auth.verifier),session_id: UUID = Depends(auth.cookie)):

    existing_users = load_users_from_file()
    found_user = None
    for user in existing_users:
        if user["email"] == session_data.email:
            found_user = user
            break

    res = -scrg_result.bet
    if found_user is not None:
        print(f"mas: {scratchgame_opened}")
        if (scratchgame_opened[0] == scratchgame_opened[1]) and (scratchgame_opened[0] == scratchgame_opened[2]):
            if (scratchgame_opened[0] == 0) or (scratchgame_opened[0] == 3) or (scratchgame_opened[0] == 6):
                res += scrg_result.bet*3
            elif (scratchgame_opened[0] == 1) or (scratchgame_opened[0] == 4) or (scratchgame_opened[0] == 7):
                res += scrg_result.bet*5
            elif (scratchgame_opened[0] == 2) or (scratchgame_opened[0] == 5) or (scratchgame_opened[0] == 8):
                res += scrg_result.bet*10
            
        
        print(res)
        found_user["money"] = int(found_user["money"]) + res
        save_users_to_file(existing_users)


    return scratchgame_ar,res

    raise HTTPException(status_code=468, detail="Serv error")


@router.post("/api/games/scratchgame_new")
async def scratchgame(scrg_new: Scratchgame_new):
    global scratchgame_ar  
    numbers = [0, 1, 2]
    if (scrg_new.masNumber == 3) or (scrg_new.masNumber == 4):
        numbers = [3, 4, 5]
    elif (scrg_new.masNumber == 5) or (scrg_new.masNumber == 6):
        numbers = [6, 7, 8]
    scratchgame_ar = [number for number in numbers for _ in range(3)]

    random.shuffle(scratchgame_ar)

    result = [scratchgame_ar[i:i+3] for i in range(0, len(scratchgame_ar), 3)]



    scratchgame_ar = result


    print(scratchgame_ar)
    global scratchgame_opened
    scratchgame_opened = [-1,-1,-1]
    return {"message": "Array updated"}


@router.post("/api/games/scratchgame")
async def scratchgame(sg: Scratchgame):
    scratchgame_opened[sg.index] = scratchgame_ar[sg.row][sg.col]
    print (scratchgame_opened)
    return scratchgame_ar[sg.row][sg.col]





@router.get("/api/games/rouletteslidergame")
async def rouletteslidergame():
    global rouletteslidergame_win_index
    probabilities = [13, 20, 27, 10, 5, 10, 10, 5]
    element = random.choices(range(8), weights=probabilities)
    print (element)
    rouletteslidergame_win_index = element[0]

    return element


@router.patch("/api/games/rouletteslidergame/result",  dependencies=[Depends(auth.cookie)])
async def rouletteslidergame_result(rsg: RouletteSliderGame_result, session_data: auth.SessionData = Depends(auth.verifier),session_id: UUID = Depends(auth.cookie)):

    existing_users = load_users_from_file()
    found_user = None
    for user in existing_users:
        if user["email"] == session_data.email:
            found_user = user
            break
    global rouletteslidergame_win_index

    

    res = -rsg.bet
    if found_user is not None:
        if rouletteslidergame_win_index == 5:
            res+= rsg.bet*2
        elif rouletteslidergame_win_index == 6:
            res+= rsg.bet*3
        elif rouletteslidergame_win_index == 7:
            res+= rsg.bet*5
        elif rsg.bet == 100:
            res+=rouletteslidergame_ar[rouletteslidergame_win_index]
        elif rsg.bet == 500:
            res+=rouletteslidergame_ar[rouletteslidergame_win_index+2]
        elif rsg.bet == 1000:
            res+=rouletteslidergame_ar[rouletteslidergame_win_index+3]
        elif rsg.bet == 5000:
            res+=rouletteslidergame_ar[rouletteslidergame_win_index+4]
        elif rsg.bet == 20000:
            res+=rouletteslidergame_ar[rouletteslidergame_win_index+5]            
        
        # print(res)
        found_user["money"] = int(found_user["money"]) + res
        save_users_to_file(existing_users)


    return res
