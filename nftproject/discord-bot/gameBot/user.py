from tinydb import TinyDB, Query
db = TinyDB('db.json')
User = Query()


c_name = 1
c_id = 2
c_lvl = 3
c_exp = 4
c_money = 5
c_loss = 6
c_og = 7

default_money = 10000

#=========================checking==================================
def checkUserNum():
    count = len(db.all())
    return count


def checkUser(_name, _id):
    print("user.py - checkUser")
    print(str(_name) + "<" + str(_id) + ">의 존재 여부 확인")
    print("")


    userNum = checkUserNum()
    print("등록된 유저수: ", userNum)
    print("")

    print("이름과 고유번호 탐색")
    print("")
    if not db.get(User.id == _id) is None :
        return True, db.get(User.id == _id)
    return False, None


#=========================Money==================================
def getMoney(data):
    print("user.py - getMoney")

    print(data['name'], "의 돈을 탐색")
    result = data['money']
    print(data['name'],"의 보유 자산: ", result)
    return result

def remit(sender_data, receiver_data, _amount):
    print("user.py - remit")
    #loadFile()
    
    print("보내는 사람(Sender): ", str(sender_data['name']))
    print("받는 사람(Receiver): ", str(receiver_data['name']))
    print("보내는 돈(Amount): ", _amount)
    print("")

    modifyMoney(receiver_data, int(_amount))
    modifyMoney(sender_data, -int(_amount))

    print("")

def modifyMoney( data, _amount):
    print("user.py - modifyMoney")

    print(data['name'], "의 자산데이터 수정")
    print(data['name'], "의 자산: " + str(data['money']))
    print("추가할 액수: ", _amount)
    sum = data['money']+_amount
    db.update({'money': sum},User.id == data['id'])
    
    print("자산데이터 수정 완료")
    print("수정된", data['name'], "의 자산: ",sum)


def addLoss(data, _amount):
    print("user.py - addLoss")

    print(data['name'], "의 잃은 돈 추가")
    print(data['name'], "의 잃은돈: " + str(data['loss']))
    print("추가할 액수: ", _amount)
    sum = data['loss']+_amount
    db.update({'loss': sum},User.id == data['id'])
    print("잃은 돈 추가 완료")
    print(data['name'], "의 총 잃은 돈: ", sum)

#=========================Level==================================
def levelupCheck(data):
    print("user.py - levelupCheck")
    name = data['name']
    exp = data['exp']
    lvl = data['lvl']
    amount_to_up = lvl*lvl + 6*lvl
    count = 0

    print(name,"의 레벨업 조사")
    print(name, "의 현재 레벨: ", lvl, "(", exp, "/", amount_to_up,")")

    if exp >= amount_to_up:
        while(exp >= amount_to_up and exp >= 0):
            print("레벨업에 필요한 경험치 :", amount_to_up)
            print("현재 경험치: ", exp)

            print("충분한 경험치양을 확인")
            db.update({'lvl': data['lvl']+1},User.id == data['id'])
            count += 1
            print("레벨 데이터 수정")
            db.update({'exp': data['exp']-amount_to_up},User.id == data['id'])
            print("경험치 초기화")
            new_data = db.get(User.id == data['id'])
            lvl = new_data['lvl']
            exp = new_data['exp']
            amount_to_up = lvl*lvl + 6*lvl
        return True, lvl
    else:
        return False, lvl

def modifyExp(data, _amount):
    print("user.py - modifyExp")

    name = data['name']
    print(name, "의 경험치 획득량: ", _amount)

    db.update({'exp': data['exp']+_amount},User.id == data['id'])
#=========================Ranking==================================
def ranking():
    print("user.py - ranking")

    userRanking =  {}
    userNum = checkUserNum()

    print("등록된 유저수: ", userNum)
    print("")

    print("랭킹 집계중")

    for item in db.all():
        _name = item['name']
        _val = item['money']
        userRanking[_name] = _val

    print("랭킹 집계 완료")
    a = sorted(userRanking.items(), reverse=True, key=lambda item:item[1])
    result = []
    for items in a:
        result.append(items[0])
        result.append(items[1])
    print(result)
    print("")

    return result

def getRank(data):
    print("user.py - getRank")
    user = data['name']
    print(user, "의 랭킹 조사")
    rank = ranking()

    result = int(rank.index(user)/2)+1
    print(user, "의 랭킹: ",result, "위")

    return result

#=========================Account==================================
def Signup(_name, _id):
    print("user.py - signup")
    db.insert({'name': _name, 'id':_id, 'lvl': 1, 'exp':0,'money':default_money,'loss':0})
    print("데이터 추가 완료")

def DeleteAccount(_id):
    print("user.py - DeleteAccount")
    print("회원탈퇴 진행")

    print("유저 데이터 삭제")
    db.remove(User.id== _id)
    print("회원탈퇴 완료")

def userInfo(data):
    _lvl = data['lvl']
    _exp = data['exp']
    _money = data['money']
    _loss = data['loss']

    print("레벨: ", _lvl)
    print("경험치: ", _exp)
    print("보유자산: ", _money)
    print("잃은 돈: ", _loss)


    return _lvl, _exp, _money, _loss


#=========================For Test==================================
def resetData():

    print("유저 데이터를 삭제")

    db.truncate()

    print("데이터 삭제 완료")

def backupDB():
    comment = "{"
    count = 1
    for item in db.all():
        comment += '"'
        comment += str(count)
        comment += '":'
        comment += str(item)
        comment += ","
        count += 1
    comment += "}"
    return comment

def addMoney(data, _amount):

    db.update({'money': data['money']+_amount},User.id == data['id'])
    
    a = db.all()
    print(a)

def addExp(data, _amount):
    db.update({'exp': data['exp']+_amount},User.id == data['id'])
def adjustlvl(data, _amount):
    db.update({'lvl': _amount},User.id == data['id'])
    db.update({'exp': 0},User.id == data['id'])
