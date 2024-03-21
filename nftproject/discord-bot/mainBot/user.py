
from tinydb import TinyDB, Query
db = TinyDB('db.json')
User = Query()

default_money = 10000
items = []
game_og = 0

def signup(_id):
    if check_exist(_id):
        return "이미 구구카지노의 회원입니다(ALREADY GOOGOO CASINO MEMBER)"
    db.insert({'id':_id, 'money': default_money, 'items':items, 'og':game_og})
    return "이제부터 구구카지노 회원입니다(FROM NOW ON, YOU ARE GOOGOO CASINO MEMBER)"
    
    
def check_exist(_id):
    print(_id)
    print(db.search(User.id == _id) )
    if not db.search(User.id == _id) :
        return True
    return False
        
def get_data(_id):
    return  db.search(User.id == _id)[0]