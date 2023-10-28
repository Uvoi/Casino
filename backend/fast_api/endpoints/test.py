import json

users_file = '../data/users.json'




def load_users_from_file():
    try:
        with open(users_file, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}


existing_users = load_users_from_file()
print("\n\n\n\n\n\n\n",existing_users,"\n\n\n\n\n\n\n")

