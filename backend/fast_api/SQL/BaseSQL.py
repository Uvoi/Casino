import psycopg2
# from config import host, user, password, db_name
from SQL.config import host, user, password, db_name

def connect_to_exist_database():
    
    connection = psycopg2.connect(
    host=host,
    user=user,
    password=password,
    database=db_name,
    )
    connection.autocommit = True

    return connection

def check_connection(connection):

    cursor = connection.cursor()
    cursor.execute(
        f"""
        SELECT count(*)
        FROM pg_catalog.pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'users';
        """
    )
    result = cursor.fetchone()

    if result[0] == 1:
        return True
    else:
        return False

def create_table(connection):
    with connection.cursor() as cursor:
        cursor.execute(
            """CREATE TABLE users(
            name varchar(16) NOT NULL,
            email varchar(24) NOT NULL PRIMARY KEY,
            password varchar(24) NOT NULL,
            money integer NOT NULL);
            """
        )

def insert_data_info_table(connection, name :str, email :str, password :str, money :int):
    with connection.cursor() as cursor:
        cursor.execute(
        f"""INSERT INTO users (name, email, password, money) VALUES
           ('{name}', '{email}', '{password}', '{money}');
        """
    )
        
def update_data(connection, name, email, money): 
    with connection.cursor() as cursor: 
        cursor.execute( 
            f""" 
            UPDATE users 
            SET money = '{money}', 
            name = '{name}' 
            WHERE email = '{email}'; 
            """ 
        )


def get_data_from_table(connection):
    with connection.cursor() as cursor:
        cursor.execute(
            """SELECT json_agg(json_build_object(
                'name', name,
                'email', email,
                'password', password,
                'money', money
                )) FROM users;
            """
        )
        return cursor.fetchone()[0]
    

