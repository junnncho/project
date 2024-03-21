from ast import Return
import asyncio, discord
import random
from game import *
from user import *
from discord.ext import commands
from tinydb import TinyDB, Query
from discord.ext import tasks
from googoofinder import *
import json

errortxt = ('That is not formatted properly or valid positive integers weren\'t used, ',
            'the proper format is:\n`[Prefix]minesweeper <columns> <rows> <bombs>`\n\n',
            'You can give me nothing for random columns, rows, and bombs.')
errortxt = ''.join(errortxt)
db = TinyDB('db.json')
User = Query()
rumble_switch= False
switch = 0
kor_channel = None
eng_channel = None
test_channel = None
exchange_channel = None
bot = commands.Bot(command_prefix="$")

@bot.event
async def on_ready():
    global kor_channel
    global eng_channel
    global test_channel
    global exchange_channel
    print("I have logged in as {0.user}\n".format(bot))
    kor_channel = bot.get_channel(1007113326070870096)
    eng_channel = bot.get_channel(1007247599742504971)
    test_channel = bot.get_channel(1007667810819911730)
    exchange_channel= bot.get_channel(1007230328403935322)

@tasks.loop(minutes = 8)
async def myloop():
    try:
        await test_channel.send('백업완료!', file=discord.File("db.json"))
        async for message in exchange_channel.history(limit = None):
            await message.delete()
        await 환전소(exchange_channel)
        print("=============loop(8min)==============")
    except Exception as e:
        await test_channel.send("loop 에러")
        await test_channel.send(e)

@bot.command()
async def 데이터복구(ctx,pw):
    await test_channel.send("데이터복구 시작")
    print("데이터복구 시작")
    if pw == "1234":
        namedict = {}
        finish = set()
        async for message in kor_channel.history(limit = None):
            namedict[message.author.name] = message.author.id
        async for message in eng_channel.history(limit = None):
            namedict[message.author.name] = message.author.id
        print(len(namedict))
        count=0
        async for message in kor_channel.history(limit = None):
            count += 1
            print(count//60,"%")
            embeds = message.embeds
            if message.author.id != 1006896203918745621:
                continue
            for embed in embeds:
                embed_dict = embed.to_dict()
                if embed_dict['title'] == "유저 정보" or embed_dict['title'] == "User Information":
                    name = embed_dict['description']
                    if name in finish:
                        continue
                    if embed_dict['fields'][1]['name'] == 'XP' or embed_dict['fields'][1]['name'] == '경험치':
                        continue
                    finish.add(name)
                    id = namedict[name]
                    level = embed_dict['fields'][0]['value']
                    xp = embed_dict['fields'][2]['name'].split('/')[0][3:]
                    balance = embed_dict['fields'][3]['value']
                    loss = embed_dict['fields'][4]['value']
                    db.upsert({"name":name,"id":int(id),"lvl":int(level),"exp":int(xp),"money":int(balance),"loss":int(loss)},User.name == name)
                    
        async for message in eng_channel.history(limit = None):
            count += 1
            print(count//60,"%")
            embeds = message.embeds
            if message.author.id != 1006896203918745621:
                continue
            for embed in embeds:
                embed_dict = embed.to_dict()
                if embed_dict['title'] == "유저 정보" or embed_dict['title'] == "User Information":
                    name = embed_dict['description']
                    if name in finish:
                        continue
                    if embed_dict['fields'][1]['name'] == 'XP' or embed_dict['fields'][1]['name'] == '경험치':
                        continue
                    finish.add(name)
                    id = namedict[name]
                    level = embed_dict['fields'][0]['value']
                    xp = embed_dict['fields'][2]['name'].split('/')[0][3:]
                    balance = embed_dict['fields'][3]['value']
                    loss = embed_dict['fields'][4]['value']
                    db.upsert({"name":name,"id":int(id),"lvl":int(level),"exp":int(xp),"money":int(balance),"loss":int(loss)},User.name == name)
        await test_channel.send("데이터복구 완료")
    else:
        print("디버깅")

@bot.command()
async def 환전소(ctx):
    print("구구환전소")
    embed = discord.Embed(title="환전소(Exchange)",description="레벨을 구구코인으로(Change the level to googoocoin)", color=0x00aaaa)
    embed.add_field(name="레벨 높이는 법(How to Get Exp", value="디스코드 아무채널에서 채팅을 많이하면 경험치 상승!!(If you chat a lot on any Discord channel, your exp will increase!!)", inline=False)
    embed.add_field(name="💸 ", value="클릭하면 환전 시작(Click to start exchanging)", inline=False)
    embed.add_field(name="Level2", value="Level -> 1500Coin", inline=False)
    embed.add_field(name="Level3", value="Level -> 2500coin", inline=False)
    embed.add_field(name="Level4", value="Level -> 4000Coin", inline=False)
    embed.add_field(name="Level5", value="Level -> 10000Coin", inline=False)
    embed.add_field(name="Level6", value="Level -> 20000Coin", inline=False)
    embed.add_field(name="Level7", value="Level -> 40000Coin", inline=False)
    msg = await ctx.send(embed=embed)
    await msg.add_reaction("💸") #step

async def 구구서바이벌(ctx,money):
    global rumble_switch
    if rumble_switch:
        msg = await ctx.send("아직 진행중입니다.")
        ctx.message.delete()
        await asyncio.sleep(2)
        await msg.delete()
        return
    rumble_switch = True
    embed = discord.Embed(title="구구서바이벌(GooSurvival)",description="최종 1인이 되어 상금을 가져가세요(Change the level to googoocoin)", color=0x00aaaa)
    embed.add_field(name="<:7_:1004054861882609674>", value="클릭하면 참가 및 구구코인차감(Click to join survival and deduction of coin)", inline=False)
    embed.add_field(name="티켓가격(ticket price)", value=f"{money} Coin", inline=False)
    msg = await ctx.send(embed=embed)
    await msg.add_reaction("<:7_:1004054861882609674>") #step
    await ctx.send("2분 뒤 시작(start in 2 minutes)")
    await asyncio.sleep(60)
    await ctx.send("1분 뒤 시작(start in 1 minutes)")
    await asyncio.sleep(30)
    await ctx.send("30초 뒤 시작(start in 30 seconds)")
    await asyncio.sleep(20)
    await ctx.send("10초 뒤 시작(start in 10 seconds)")
    await asyncio.sleep(10)
    message = bot.fetch_message(msg.id)
    party = []
    for reaction in message.reactions:
        if reaction.emoji == "<:7_:1004054861882609674>":
            party = reaction.users()
    await ctx.send(str(party))
    
    

@bot.event
async def on_reaction_add(reaction, user):
    if user.bot == 1: #봇이면 패스
        return
    try:
        if str(reaction.emoji) == "<:7_:1004054861882609674>":
            return
        await reaction.remove(user)
        if str(reaction.emoji) == "💸":
            userExistance, data = checkUser(user.name, user.id)
            if userExistance:
                print("환전시작")
                level = data['lvl']
                
                if level == 1:
                    msg = await reaction.message.channel.send(user.name + "님은 레벨1이기에 환전 불가능합니다.(You can't exchange because your level is 1)")
                    await asyncio.sleep(2)
                    await msg.delete()
                    return
                if level == 2:
                    modifyMoney(data, 1500)
                elif level == 3:
                    modifyMoney(data, 2500)
                elif level == 4:
                    modifyMoney(data, 4000)
                elif level == 5:
                    modifyMoney(data, 10000)
                elif level == 6:
                    modifyMoney(data, 20000)
                elif level == 7:
                    modifyMoney(data, 40000)
                db.update({'lvl': 1, 'exp':0},User.id == data['id'])
                msg = await reaction.message.channel.send(user.name + "님이 환전하셨습니다.(Exchange Completed)")
                await asyncio.sleep(2)
                await msg.delete()
    except Exception as e:
        await test_channel.send("reaction 에러")
        await test_channel.send(e)



@bot.command()
async def 도움말(ctx):
    embed = discord.Embed(title = "GOO GOO CASINO 설명서", description = "가장 많은 부를 축적한 구구에게는 소정의 혜택이 주어진다! 룰은 간단합니다. 돈을 늘려가면 됩니다.", color = 0x6E17E3) 
    await ctx.send(embed=embed)
@bot.command()
async def 명령어(ctx):
    embed = discord.Embed(title = "GOO GOO CASINO<:7_:1004054861882609674><:7_:1004054861882609674>", description = "돈을 불려라 ", color = 0x6E17E3) 
    embed.add_field(name = bot.command_prefix + "도움말", value = "도움말을 봅니다", inline = False)
    embed.add_field(name = bot.command_prefix + "회원가입", value = "카지노를 즐기기 위해서는 회원가입 먼저!", inline = False)
    embed.add_field(name = bot.command_prefix + "내정보", value = "자신의 정보를 확인합니다", inline = False)
    embed.add_field(name = bot.command_prefix + "정보 [@대상]", value = "멘션한 [@대상]의 정보를 확인합니다", inline = False)
    embed.add_field(name = bot.command_prefix + "송금 [@대상] [돈]", value = "멘션한 [@대상]에게 [돈]을 보낸다.", inline = False)
    embed.add_field(name = bot.command_prefix + "구구뽑기 [돈]", value = "[돈]을 걸어 도박을 합니다. 황금구구를 뽑아보세요!", inline = False)
    embed.add_field(name = bot.command_prefix + "구구찾기", value = "돈을 걸지 않고 진행하는 지뢰찾기 미니게임", inline = False)
    embed.add_field(name = bot.command_prefix + "구구복권", value = "한 장에 2000코인, 최대 50만코인까지 얻을 수 있다!", inline = False)
    embed.add_field(name = bot.command_prefix + "구구슬롯머신", value = "한 번에 20000코인! 색깔 맞추면 50만코인,금색이면 100만코인.", inline = False)
    embed.add_field(name = "-exchange 채널", value = "레벨을 코인으로 교환해준다.", inline = False)
    embed.add_field(name = bot.command_prefix + "command", value = "ENG Version", inline = False)
    await ctx.send(embed=embed)
    


@bot.command()
async def 주사위(ctx):
    result, _color, bot1, bot2, user1, user2, a, b = dice()
    embed = discord.Embed(title = "주사위 게임 결과", description = None, color = _color)
    embed.add_field(name = "Super Bot의 숫자 " + bot1 + "+" + bot2, value = ":game_die: " + a, inline = False)
    embed.add_field(name = ctx.author.name+"의 숫자 " + user1 + "+" + user2, value = ":game_die: " + b, inline = False)
    embed.set_footer(text="결과: " + result)
    await ctx.send(embed=embed)


@bot.command()
async def 구구복권(ctx):
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if userExistance:
        print("DB에서 ", ctx.author.name, "을 찾았습니다.")
        cur_money = getMoney(data)
        
        if cur_money >= 2000:
            await ctx.send("2천코인 차감되었습니다.")
            result = lotto()
            print("로또결과",result)
            if result == 0:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:zero:||||:zero:||||:zero:||||:zero:||||:zero:||")
            elif result == 2000:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:zero:||||:two:||||:zero:||||:zero:||||:zero:||")
            elif result == 5000:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:zero:||||:five:||||:zero:||||:zero:||||:zero:||")
            elif result == 10000:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:one:||||:zero:||||:zero:||||:zero:||||:zero:||")
            elif result == 30000:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:three:||||:zero:||||:zero:||||:zero:||||:zero:||")
            elif result == 100000:
                await ctx.send(f"{ctx.author.mention} ||:one:||||:zero:||||:zero:||||:zero:||||:zero:||||:zero:||")
            elif result == 500000:
                await ctx.send(f"{ctx.author.mention} ||:five:||||:zero:||||:zero:||||:zero:||||:zero:||||:zero:||")
            modifyMoney(data, result-2000)
            addLoss(data, 2000-result)
        else:
            await ctx.send(f"{ctx.author.mention} 잔액이 부족합니다 ㅜㅜ")
    else:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        await ctx.send(f"{ctx.author.mention} 복권은 회원가입 후 이용 가능합니다.")
            

            
    
            
            
        
    
@bot.command()
async def 구구슬롯머신(ctx):
    googoo = ["||<:googooorange:1001754056651460638>||","||<:googooblue:1001752595716657162>||","||<:googoowhite:1001754207801581579>||","||<:googoogreen:1001754001831907328>||","||<:googoopurple:1001754167104249906>||","||<:googoobrown:1001754107587072080>||","||<:7_:1004054861882609674>||"]
    list = slot()
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if userExistance:
        print("DB에서 ", ctx.author.name, "을 찾았습니다.")
        cur_money = getMoney(data)
        if cur_money >= 20000:
            result = 0
            await ctx.send("2만코인 차감되었습니다.")
            for i in range(3):
                await ctx.send(f"{ctx.author.mention} {str(i+1)}번 구구: {googoo[list[i]]}    :arrow_left: 눌러서 확인하세요")              
            
            if list[0] == list[1] and list[1] == list[2]:
                if list[0] == 6:
                    result = 1000000
                else:
                    result = 500000
            modifyMoney(data, result-20000)
            addLoss(data, 20000-result)
        else:
            await ctx.send(f"{ctx.author.mention} 잔액이 부족합니다 ㅜㅜ")
    else:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        await ctx.send(f"{ctx.author.mention} 슬롯머신은 회원가입 후 이용 가능합니다.")
    
    
@bot.command()
async def 구구뽑기(ctx, money):
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    win = gamble()
    result = ""
    betting = 0
    _color = 0x000000
    if userExistance:
        print("DB에서 ", ctx.author.name, "을 찾았습니다.")
        cur_money = getMoney(data)
        if money == "올인":
            betting = cur_money
            if win:
                result = "성공"
                _color = 0x00ff56
                print(result)
                await ctx.send(f"{ctx.author.mention} ||<:7_:1004054861882609674>||    :arrow_left: 눌러서 확인하세요")
                modifyMoney(data, int(0.6*betting))

            else:
                result = "실패"
                _color = 0xFF0000
                print(result)
                await ctx.send(f"{ctx.author.mention} ||:bomb:||    :arrow_left: 눌러서 확인하세요")
                modifyMoney(data, -int(betting))
                addLoss(data, int(betting))
            
        elif int(money) >= 10:
            if cur_money >= int(money):
                betting = int(money)
                print("배팅금액: ", betting)
                print("")

                if win:
                    result = "성공"
                    _color = 0x00ff56
                    print(result)
                    await ctx.send(f"{ctx.author.mention} ||<:7_:1004054861882609674>||    :arrow_left: 눌러서 확인하세요")
                    modifyMoney(data, int(0.8*betting))

                else:
                    result = "실패"
                    _color = 0xFF0000
                    print(result)
                    await ctx.send(f"{ctx.author.mention} ||:bomb:||    :arrow_left: 눌러서 확인하세요")
                    modifyMoney(data, -int(betting))
                    addLoss(data, int(betting))

            else:
                print("돈이 부족합니다.")
                print("배팅금액: ", money, " | 현재자산: ", cur_money)
                await ctx.send(f"{ctx.author.mention} 돈이 부족합니다. 현재자산: " + str(cur_money))
        else:
            print("배팅금액", money, "가 10보다 작습니다.")
            await ctx.send(f"{ctx.author.mention} 10원 이상만 배팅 가능합니다.")
    else:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        await ctx.send(f"{ctx.author.mention} 도박은 회원가입 후 이용 가능합니다.")

    print("------------------------------\n")

@bot.command()
async def 랭킹(ctx):
    rank = ranking()
    embed = discord.Embed(title = "잔고 랭킹", description = "누가 가장 부자 구구일까???", color = 0x4A44FF)
    num = len(rank)
    if num > 30:
        num = 30
    for i in range(0,num):
        if i%2 == 0:
            name = rank[i]
            money = rank[i+1]
            embed.add_field(name = str(int(i/2+1))+"위 "+name, value ="잔고: "+str(money),inline=False)

    await ctx.send(embed=embed) 

@bot.command()
async def 회원가입(ctx):
    print("회원가입이 가능한지 확인합니다.")
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if userExistance:
        print("DB에서 ", ctx.author.name, "을 찾았습니다.")
        print("------------------------------\n")
        await ctx.send("이미 가입하셨습니다.")
    else:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        print("")

        Signup(ctx.author.name, ctx.author.id)

        print("회원가입이 완료되었습니다.")
        print("------------------------------\n")
        await ctx.send("회원가입이 완료되었습니다.")

@bot.command()
async def 탈퇴(ctx):
    print("탈퇴가 가능한지 확인합니다.")
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if userExistance:
        DeleteAccount(ctx.author.id)
        print("탈퇴가 완료되었습니다.")
        print("------------------------------\n")

        await ctx.send("탈퇴가 완료되었습니다.")
    else:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        print("------------------------------\n")

        await ctx.send("등록되지 않은 사용자입니다.")

@bot.command()
async def 내정보(ctx):
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if not userExistance:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        print("------------------------------\n")
        await ctx.send("회원가입 후 자신의 정보를 확인할 수 있습니다.")
    else:
        level, exp, money, loss = userInfo(data)
        rank = getRank(data)
        userNum = checkUserNum()
        expToUP = level*level + 6*level
        boxes = int(exp/expToUP*20)
        print("------------------------------\n")
        embed = discord.Embed(title="유저 정보", description = ctx.author.name, color = 0x62D0F6)
        embed.add_field(name = "레벨", value = level)
        embed.add_field(name = "순위", value = str(rank) + "/" + str(userNum))
        embed.add_field(name = "XP: " + str(exp) + "/" + str(expToUP), value = boxes * ":blue_square:" + (20-boxes) * ":white_large_square:", inline = False)
        embed.add_field(name = "보유 자산", value = money, inline = False)
        embed.add_field(name = "도박으로 날린 돈", value = loss, inline = False)

        await ctx.send(embed=embed)

@bot.command()
async def 정보(ctx, user: discord.User):
    userExistance, data = checkUser(user.name, user.id)
    
    if not userExistance:
        print("DB에서 ", user.name, "을 찾을 수 없습니다")
        print("------------------------------\n")
        await ctx.send(user.name  + " 은(는) 등록되지 않은 사용자입니다.")
    else:
        level, exp, money, loss = userInfo(data)
        rank = getRank(data)
        userNum = checkUserNum()
        print("------------------------------\n")
        embed = discord.Embed(title="유저 정보", description = user.name, color = 0x62D0F6)
        embed.add_field(name = "레벨", value = level)
        embed.add_field(name = "경험치", value = str(exp) + "/" + str(level*level + 6*level))
        embed.add_field(name = "순위", value = str(rank) + "/" + str(userNum))
        embed.add_field(name = "보유 자산", value = money, inline = False)
        embed.add_field(name = "도박으로 날린 돈", value = loss, inline = False)

        await ctx.send(embed=embed)

@bot.command()
async def 송금(ctx, user: discord.User, money):
    print("송금이 가능한지 확인합니다.")
    senderExistance, senderData = checkUser(ctx.author.name, ctx.author.id)
    receiverExistance, receiverData = checkUser(user.name, user.id)

    if not senderExistance:
        print("DB에서", ctx.author.name, "을 찾을수 없습니다")
        print("------------------------------\n")
        await ctx.send("회원가입 후 송금이 가능합니다.")
    elif not receiverExistance:
        print("DB에서 ", user.name, "을 찾을 수 없습니다")
        print("------------------------------\n")
        await ctx.send(user.name  + " 은(는) 등록되지 않은 사용자입니다.")
    else:
        print("송금하려는 돈: ", money)

        s_money = getMoney(senderData)
        r_money = getMoney(receiverData)

        if s_money >= int(money) and int(money) != 0:
            print("돈이 충분하므로 송금을 진행합니다.")
            print("")

            remit(senderData,receiverData, money)

            print("송금이 완료되었습니다. 결과를 전송합니다.")

            embed = discord.Embed(title="송금 완료", description = "송금된 돈: " + money, color = 0x77ff00)
            embed.add_field(name = "보낸 사람: " + ctx.author.name, value = "현재 자산: " + str(getMoney(senderData)))
            embed.add_field(name = "→", value = ":moneybag:")
            embed.add_field(name="받은 사람: " + user.name, value="현재 자산: " + str(getMoney(receiverData)))
                    
            await ctx.send(embed=embed)
        elif int(money) == 0:
            await ctx.send("0원을 보낼 필요는 없죠")
        else:
            print("돈이 충분하지 않습니다.")
            print("송금하려는 돈: ", money)
            print("현재 자산: ", s_money)
            await ctx.send("돈이 충분하지 않습니다. 현재 자산: " + str(s_money))

        print("------------------------------\n")


@bot.command()
async def reset(ctx,pw):
    if pw =="1234":
        resetData()
        await ctx.send("초기화 완료")
        
@bot.command()
async def backup(ctx,pw):
    if pw =="1234":
        await ctx.send('백업완료!', file=discord.File("db.json"))

@bot.command()
async def addMoney(ctx, money, _id, pw):
    user, data = checkUser("관리자", int(_id))
    print(data)
    if user and pw =="1234":
        modifyMoney(data, int(money))
        print("money")
        await ctx.send(money+ "돈 보내기 완료")
        
@bot.command()
async def addAll(ctx, money, pw):
    if pw =="1234":
        for item in db.all():
            modifyMoney(item, int(money))
        print("money")
        await ctx.send("모두에게 "+money+"코인 지급")

@bot.command()
async def exp(ctx, exp,_id, pw):
    user, data = checkUser("관리자", int(_id))
    if user and pw=="1234":
        addExp(data, int(exp))
        print("exp")
        await ctx.send("경험치 보내기 완료")

@bot.command()
async def lvl(ctx, lvl,_id,pw):
    user, data = checkUser("관리자", int(_id))
    if user and pw=="1234":
        adjustlvl(data, int(lvl))
    print("lvl")
    await ctx.send("레벨 보내기 완료")


@bot.command()
async def 구구찾기(ctx, columns = 10, rows = 10, bombs = 30):
    print("지뢰")
    if columns is None or rows is None and bombs is None:
        if columns is not None or rows is not None or bombs is not None:
            await ctx.send(errortxt)
            return
        else:
            columns = random.randint(4,13)
            rows = random.randint(4,13)
            bombs = columns * rows - 1
            bombs = bombs / 2.5
            bombs = round(random.randint(5, round(bombs)))
    try:
        columns = int(columns)
        rows = int(rows)
        bombs = int(bombs)
    except ValueError:
        await ctx.send(errortxt)
        return
    if columns > 13 or rows > 13:
        await ctx.send('The limit for the columns and rows are 13 due to discord limits...')
        return
    if columns < 1 or rows < 1 or bombs < 1:
        await ctx.send('The provided numbers cannot be zero or negative...')
        return
    if bombs + 1 > columns * rows:
        await ctx.send(':boom:**BOOM**, you have more bombs than spaces on the grid or you attempted to make all of the spaces bombs!')
        return

    final, percentage = googoofinder(columns,rows,bombs)

    embed = discord.Embed(title='\U0001F642 구구찾기 \U0001F635', color=0xC0C0C0)
    embed.add_field(name='열(Columns):', value=columns, inline=True)
    embed.add_field(name='행(Rows):', value=rows, inline=True)
    embed.add_field(name='전체(Total):', value=columns * rows, inline=True)
    embed.add_field(name='<:7_:1004054861882609674> 구구숫자:', value=bombs, inline=True)
    embed.add_field(name='<:7_:1004054861882609674> 구구비율:', value=f'{percentage}%', inline=True)
    embed.add_field(name='요청자:', value=ctx.author.display_name, inline=True)
    await ctx.send(content=f'\U0000FEFF\n{final}', embed=embed)
    
    
    
#=====================================ENG================================================


@bot.command()
async def subject(ctx):
    embed = discord.Embed(title = "GOO GOO CASINO HELP", description = "A small benefit is given to the person who collects the most money. The rule is just to make a lot of money..", color = 0x6E17E3) 
    await ctx.send(embed=embed)
@bot.command()
async def command(ctx):
    embed = discord.Embed(title = "GOO GOO CASINO<:7_:1004054861882609674><:7_:1004054861882609674>", description = "Make money!", color = 0x6E17E3) 
    embed.add_field(name = bot.command_prefix + "subject", value = "Our Mission", inline = False)
    embed.add_field(name = bot.command_prefix + "signup", value = "To enjoy casino, signup first", inline = False)
    embed.add_field(name = bot.command_prefix + "my", value = "Check my information", inline = False)
    embed.add_field(name = bot.command_prefix + "info [@target people]", value = "Check [@target people]'s information", inline = False)
    embed.add_field(name = bot.command_prefix + "send [@target people] [money]", value = "Send [@target people] [money]Goo coins .", inline = False)
    embed.add_field(name = bot.command_prefix + "pickgoo [money]", value = "You gamble with [money]Goo coins. If you pick Golden GooGoo, you win.", inline = False)
    embed.add_field(name = bot.command_prefix + "findgoo", value = "It's a mini game called Goosweeper where you don't bet money", inline = False)
    embed.add_field(name = bot.command_prefix + "lotterygoo", value = "2,000 coins per sheet! You can get up to 1 million Goo coins.", inline = False)
    embed.add_field(name = bot.command_prefix + "slotgoo", value = "20,000 coins at once! 500,000 coins if you match the color, and 1 million coins if it's gold.", inline = False)
    embed.add_field(name = "-exchange channel", value = "Change the level to coins.", inline = False)
    await ctx.send(embed=embed)
    


@bot.command()
async def lotterygoo(ctx):
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if userExistance:
        print("DB에서 ", ctx.author.name, "을 찾았습니다.")
        cur_money = getMoney(data)
        
        if cur_money >= 2000:
            await ctx.send("2,000 Goo coins deducted.")
            result = lotto()
            print("로또결과",result)
            if result == 0:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:zero:||||:zero:||||:zero:||||:zero:||||:zero:||")
            elif result == 2000:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:zero:||||:two:||||:zero:||||:zero:||||:zero:||")
            elif result == 5000:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:zero:||||:five:||||:zero:||||:zero:||||:zero:||")
            elif result == 10000:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:one:||||:zero:||||:zero:||||:zero:||||:zero:||")
            elif result == 30000:
                await ctx.send(f"{ctx.author.mention} ||:zero:||||:three:||||:zero:||||:zero:||||:zero:||||:zero:||")
            elif result == 100000:
                await ctx.send(f"{ctx.author.mention} ||:one:||||:zero:||||:zero:||||:zero:||||:zero:||||:zero:||")
            elif result == 500000:
                await ctx.send(f"{ctx.author.mention} ||:five:||||:zero:||||:zero:||||:zero:||||:zero:||||:zero:||")
            modifyMoney(data, result-2000)
            addLoss(data, 2000-result)
        else:
            await ctx.send(f"{ctx.author.mention} Not enough coin T.T")
            

            
    
            
            
        
    
@bot.command()
async def slotgoo(ctx):
    googoo = ["||<:googooorange:1001754056651460638>||","||<:googooblue:1001752595716657162>||","||<:googoowhite:1001754207801581579>||","||<:googoogreen:1001754001831907328>||","||<:googoopurple:1001754167104249906>||","||<:googoobrown:1001754107587072080>||","||<:7_:1004054861882609674>||"]
    list = slot()
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if userExistance:
        print("DB에서 ", ctx.author.name, "을 찾았습니다.")
        cur_money = getMoney(data)
        if cur_money >= 20000:
            result = 0
            await ctx.send("20,000 Goo coins deducted.")
            for i in range(3):
                await ctx.send(f"{ctx.author.mention} Num{str(i+1)} GooGoo: {googoo[list[i]]}    :arrow_left: Click and Check")              
            
            if list[0] == list[1] and list[1] == list[2]:
                if list[0] == 6:
                    result = 1000000
                else:
                    result = 500000
            modifyMoney(data, result-20000)
            addLoss(data, 20000-result)
        else:
            await ctx.send(f"{ctx.author.mention} Not enough coin T.T")
    
    
@bot.command()
async def pickgoo(ctx, money):
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    win = gamble()
    result = ""
    betting = 0
    _color = 0x000000
    if userExistance:
        print("DB에서 ", ctx.author.name, "을 찾았습니다.")
        cur_money = getMoney(data)
        if money == "allin":
            betting = cur_money
            if win:
                result = "성공"
                _color = 0x00ff56
                print(result)
                await ctx.send(f"{ctx.author.mention} ||<:7_:1004054861882609674>||    :arrow_left: Click and Check")
                modifyMoney(data, int(0.6*betting))

            else:
                result = "실패"
                _color = 0xFF0000
                print(result)
                await ctx.send(f"{ctx.author.mention} ||:bomb:||    :arrow_left: Click and Check")
                modifyMoney(data, -int(betting))
                addLoss(data, int(betting))
            
        elif int(money) >= 10:
            if cur_money >= int(money):
                betting = int(money)
                print("배팅금액: ", betting)
                print("")

                if win:
                    result = "성공"
                    _color = 0x00ff56
                    print(result)
                    await ctx.send(f"{ctx.author.mention} ||<:7_:1004054861882609674>||    :arrow_left: Click and Check")
                    modifyMoney(data, int(0.8*betting))

                else:
                    result = "실패"
                    _color = 0xFF0000
                    print(result)
                    await ctx.send(f"{ctx.author.mention} ||:bomb:||    :arrow_left: Click and Check")
                    modifyMoney(data, -int(betting))
                    addLoss(data, int(betting))

            else:
                print("돈이 부족합니다.")
                print("배팅금액: ", money, " | 현재자산: ", cur_money)
                await ctx.send(f"{ctx.author.mention} Not enough coin T.T. Current balance: " + str(cur_money))
        else:
            print("배팅금액", money, "가 10보다 작습니다.")
            await ctx.send(f"{ctx.author.mention} You can bet more than 10 won.")
    else:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        await ctx.send(f"{ctx.author.mention} Sign up first.")

    print("------------------------------\n")

@bot.command()
async def rank(ctx):
    rank2 = ranking()
    embed = discord.Embed(title = "잔고 랭킹", description = "누가 가장 부자 구구일까???", color = 0x4A44FF)
    num = len(rank2)
    if num > 30:
        num = 30
    for i in range(0,num):
        if i%2 == 0:
            name = rank2[i]
            money = rank2[i+1]
            embed.add_field(name = str(int(i/2+1))+"위 "+name, value ="잔고: "+str(money),inline=False)

    await ctx.send(embed=embed) 

@bot.command()
async def signup(ctx):
    print("회원가입이 가능한지 확인합니다.")
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if userExistance:
        print("DB에서 ", ctx.author.name, "을 찾았습니다.")
        print("------------------------------\n")
        await ctx.send("Already exist.")
    else:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        print("")

        Signup(ctx.author.name, ctx.author.id)

        print("회원가입이 완료되었습니다.")
        print("------------------------------\n")
        await ctx.send("Signup completed.")


@bot.command()
async def my(ctx):
    userExistance, data = checkUser(ctx.author.name, ctx.author.id)
    if not userExistance:
        print("DB에서 ", ctx.author.name, "을 찾을 수 없습니다")
        print("------------------------------\n")
        await ctx.send("Sign up first.")
    else:
        level, exp, money, loss = userInfo(data)
        rank = getRank(data)
        userNum = checkUserNum()
        expToUP = level*level + 6*level
        boxes = int(exp/expToUP*20)
        print("------------------------------\n")
        embed = discord.Embed(title="User Information", description = ctx.author.name, color = 0x62D0F6)
        embed.add_field(name = "Level", value = level)
        embed.add_field(name = "Rank", value = str(rank) + "/" + str(userNum))
        embed.add_field(name = "XP: " + str(exp) + "/" + str(expToUP), value = boxes * ":blue_square:" + (20-boxes) * ":white_large_square:", inline = False)
        embed.add_field(name = "Balance", value = money, inline = False)
        embed.add_field(name = "Coin Lost by Gambling", value = loss, inline = False)

        await ctx.send(embed=embed)

@bot.command()
async def info(ctx, user: discord.User):
    userExistance, data = checkUser(user.name, user.id)
    
    if not userExistance:
        print("DB에서 ", user.name, "을 찾을 수 없습니다")
        print("------------------------------\n")
        await ctx.send(user.name  + " does not exist.")
    else:
        level, exp, money, loss = userInfo(data)
        rank = getRank(data)
        userNum = checkUserNum()
        print("------------------------------\n")
        embed = discord.Embed(title="User Information", description = user.name, color = 0x62D0F6)
        embed.add_field(name = "Level", value = level)
        embed.add_field(name = "XP", value = str(exp) + "/" + str(level*level + 6*level))
        embed.add_field(name = "Rank", value = str(rank) + "/" + str(userNum))
        embed.add_field(name = "Balance", value = money, inline = False)
        embed.add_field(name = "Coin Lost by Gambling", value = loss, inline = False)

        await ctx.send(embed=embed)

@bot.command()
async def send(ctx, user: discord.User, money):
    print("송금이 가능한지 확인합니다.")
    senderExistance, senderData = checkUser(ctx.author.name, ctx.author.id)
    receiverExistance, receiverData = checkUser(user.name, user.id)

    if not senderExistance:
        print("DB에서", ctx.author.name, "을 찾을수 없습니다")
        print("------------------------------\n")
        await ctx.send("Signup First.")
    elif not receiverExistance:
        print("DB에서 ", user.name, "을 찾을 수 없습니다")
        print("------------------------------\n")
        await ctx.send(user.name  + " does not exist.")
    else:
        print("송금하려는 돈: ", money)

        s_money = getMoney(senderData)
        r_money = getMoney(receiverData)

        if s_money >= int(money) and int(money) != 0:
            print("돈이 충분하므로 송금을 진행합니다.")
            print("")

            remit(senderData,receiverData, money)

            print("송금이 완료되었습니다. 결과를 전송합니다.")

            embed = discord.Embed(title="Remittance completed", description = "coin transferred: " + money, color = 0x77ff00)
            embed.add_field(name = "Sender: " + ctx.author.name, value = "Balance: " + str(getMoney(senderData)))
            embed.add_field(name = "→", value = ":moneybag:")
            embed.add_field(name="Receiver: " + user.name, value="Balance: " + str(getMoney(receiverData)))
                    
            await ctx.send(embed=embed)
        elif int(money) == 0:
            await ctx.send("There is no reason to send 0 coin")
        else:
            print("돈이 충분하지 않습니다.")
            print("송금하려는 돈: ", money)
            print("현재 자산: ", s_money)
            await ctx.send("Not enough coin. Current Balance: " + str(s_money))

        print("------------------------------\n")




@bot.command()
async def findgoo(ctx, columns = 10, rows = 10, bombs = 30):
    print("지뢰")
    if columns is None or rows is None and bombs is None:
        if columns is not None or rows is not None or bombs is not None:
            await ctx.send(errortxt)
            return
        else:
            columns = random.randint(4,13)
            rows = random.randint(4,13)
            bombs = columns * rows - 1
            bombs = bombs / 2.5
            bombs = round(random.randint(5, round(bombs)))
    try:
        columns = int(columns)
        rows = int(rows)
        bombs = int(bombs)
    except ValueError:
        await ctx.send(errortxt)
        return
    if columns > 13 or rows > 13:
        await ctx.send('The limit for the columns and rows are 13 due to discord limits...')
        return
    if columns < 1 or rows < 1 or bombs < 1:
        await ctx.send('The provided numbers cannot be zero or negative...')
        return
    if bombs + 1 > columns * rows:
        await ctx.send(':boom:**BOOM**, you have more bombs than spaces on the grid or you attempted to make all of the spaces bombs!')
        return

    final, percentage = googoofinder(columns,rows,bombs)

    embed = discord.Embed(title='\U0001F642 FindGoo \U0001F635', color=0xC0C0C0)
    embed.add_field(name='Columns:', value=columns, inline=True)
    embed.add_field(name='Rows:', value=rows, inline=True)
    embed.add_field(name='Total:', value=columns * rows, inline=True)
    embed.add_field(name='<:7_:1004054861882609674> GooGoo Num:', value=bombs, inline=True)
    embed.add_field(name='<:7_:1004054861882609674> GooGoo Percent:', value=f'{percentage}%', inline=True)
    embed.add_field(name='Requester:', value=ctx.author.display_name, inline=True)
    await ctx.send(content=f'\U0000FEFF\n{final}', embed=embed)



@bot.event
async def on_message(message):
    try:
        global switch
        if message.author == bot.user:
            return
        if message.content == "$help":
            return
        userExistance, data = checkUser(message.author.name, message.author.id)
        channel = message.channel
        if userExistance:
            levelUp, lvl = levelupCheck(data)
            if levelUp:
                print(message.author, "가 레벨업 했습니다")
                print("")
                embed = discord.Embed(title = "LEVEL UP", description = f"GOOGOOCASINO MEMBER {message.author.mention}", color = 0x00A260)
                embed.set_footer(text = f"{message.author.name} Achieved Level {str(lvl)}" )
                await kor_channel.send(embed=embed)
                await eng_channel.send(embed=embed)
            else:
                modifyExp(data, 1)
                print("------------------------------\n")
        if message.content == "카지노 오픈 1234":
            switch = 1
            myloop.start()
            await channel.send("카지노 오픈")
            print("오픈")
        elif message.content == "카지노 종료 1234":
            switch = 0
            myloop.cancel()
            await channel.send("카지노 종료")
            print("종료")
        if switch > 0:
            print("1단계 통과",channel.id)
            if channel.id in [kor_channel.id,eng_channel.id,test_channel.id,exchange_channel.id]:
                print("2단계 통과")
                await bot.process_commands(message)
    except Exception as e:
        await test_channel.send("on_message 에러 발생")
        await test_channel.send(e)







@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send("명령어를 찾지 못했습니다. $도움을 입력하여 명령어를 확인하세요.")

with open('secret.json') as f:
    secrets = json.load(f)
botKey = secrets['bot']

bot.run(botKey)