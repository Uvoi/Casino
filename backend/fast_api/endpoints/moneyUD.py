from fastapi import APIRouter, HTTPException, Response, Depends
from uuid import UUID, uuid4
from user import *  
from auth import auth
from endpoints.login import load_users_from_file, upate_user



router = APIRouter()




@router.post("/api/moneyUD", dependencies=[Depends(auth.cookie)])
async def moneyUD(
    card_number: str,
    card_date: str,
    card_user_name: str,
    card_code: int,
    card_operation: str,
    card_money_count: str,
    session_data: auth.SessionData = Depends(auth.verifier),
    session_id: UUID = Depends(auth.cookie)
):
    existing_users = load_users_from_file()

    found_user = None
    for user in existing_users:
        if user["email"] == session_data.email:
            found_user = user
            break

    if found_user is not None:
        card_money_count = card_money_count.replace(' ', '')

        if card_operation == "moneyUp":
            found_user["money"] = int(found_user["money"]) + int(card_money_count)
            upate_user(found_user)

        elif card_operation == "moneyDown":
            print('vivod')
            if int(found_user["money"]) >= int(card_money_count):
                print('зашел в if')
                found_user["money"] = int(found_user["money"]) - int(card_money_count)
                print(f"конечное значение монет: {found_user["money"]}")
                upate_user(found_user)
            else: raise HTTPException(status_code=401, detail="Недостаточно средств")

        else : raise HTTPException(status_code=402, detail="invalid operation")

        return {"message": "Money updated successfully"}

    # Если пользователь не найден, бросьте исключение
    raise HTTPException(status_code=403, detail="User not found")
