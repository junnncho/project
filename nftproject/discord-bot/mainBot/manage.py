import discord
from discord.ext.commands import Bot
from discord.ext import tasks
import asyncio
import requests
import json
intents = discord.Intents.all()
role = dict()
level = dict()


async def lookInvite(msg):
    totalInvites = 0
    for i in await msg.guild.invites():
        if i.inviter == msg.author:
            totalInvites += i.uses
    return totalInvites





async def giveTier(msg,level):
    member = msg.author
    if level >= 10:
        if not role['Peace'] in member.roles:
            await member.add_roles(role['Peace'])
            print("peace 추가")
    if level >= 7:
        if not role['Gold'] in member.roles:
            await member.add_roles(role['Gold'])
            print("gold 추가")
    if level >= 5:
        if not role['Silver'] in member.roles:
            await member.add_roles(role['Silver'])
            print("silver 추가")
    if level >= 3:
        if not role['Bronze'] in member.roles:
            await member.add_roles(role['Bronze'])
            print("bronze 추가")
        

        
async def blockUrl(msg):
    msg_content= msg.content.lower()
    if (not role["manage"] in msg.author.roles) and (not role["Partner"] in msg.author.roles) and (not role["INFLU"] in msg.author.roles):
        link = ["https:",".com","discord.gg","discordapp.com","http:","www."]
        if any(word in msg_content for word in link):
            if msg.channel.id != 1005362897590960248 or msg.channel.id != 1010788214132445254:
                await msg.delete()
                await msg.channel.send(f"{msg.author.mention}, No Link Allowed")
    

bot = Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    global role
    print('다음으로 로그인합니다: ')
    print(bot.user.name)
    print('connection was succesful')
    await bot.change_presence(status=discord.Status.online, activity=None)
    guild = bot.get_guild(1000391486749278318)
    role['Bronze'] = discord.utils.get(guild.roles, name="Bronze")
    role['Silver'] = discord.utils.get(guild.roles, name="Silver")
    role['Gold'] = discord.utils.get(guild.roles, name="Gold")
    role['Peace'] = discord.utils.get(guild.roles, name="Peace")
    role['WL'] = discord.utils.get(guild.roles, name="WL")
    role['OG'] = discord.utils.get(guild.roles, name="OG")
    role['manage'] = discord.utils.get(guild.roles, name="manage")
    role['Partner'] = discord.utils.get(guild.roles, name="Partner")
    role['INFLU'] = discord.utils.get(guild.roles, name="INFLU")

@tasks.loop(seconds = 1)
async def myloop():
    global level
    count = 1000
    page = 0
    while count != 0:
        res = requests.get(f'https://mee6.xyz/api/plugins/levels/leaderboard/1000391486749278318?limit=1000&page={page}')
        items = res.json()['players']
        count = len(items)
        for item in items:
            level[int(item['id'])] = int(item['level'])
        await asyncio.sleep(1)
        page += 1
    print("=============loop(5sec)==============")


@bot.event
async def on_message(message):
    if message.content == "lev":
        print(level)
    if message.content == "loop:on":
        print("===========loop start==========")
        await message.channel.send("Loop:ON")
        myloop.start()
    if message.content == "loop:off":
        print("===========loop end===========")
        await message.channel.send("Loop:OFF")
        myloop.cancel()
    if message.author.bot:
        print("Bot: ",message.author)
        return
    try:
        await blockUrl(message)
        invites = await lookInvite(message)
        lvl = level.get(message.author.id)
        print(lvl)
        print(lvl is not None)
        print('name:',message.author,"  invites:",invites,"  level:",lvl)
        if lvl is not None:
            await giveTier(message,lvl)
            await giveWL(message, lvl,invites)
    except Exception as e:
        print("on_message 오류")
        print(e)
    
with open('secret.json') as f:
    secrets = json.load(f)
botKey = secrets['bot']

bot.run(botKey)