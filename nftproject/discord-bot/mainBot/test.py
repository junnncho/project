import discord
import asyncio
from discord.ext.commands import Bot
from mee6_py_api import API
import os
from discord.ext import tasks
import json
import datetime
import time
intents = discord.Intents.all()
client = discord.Client()

bot = Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print('다음으로 로그인합니다: ')
    print(bot.user.name)
    print('connection was succesful')
    await bot.change_presence(status=discord.Status.online, activity=None)
    myloop.start()

@tasks.loop(seconds = 2)
async def myloop():
    guild = bot.get_guild(1000714277629476955)
    mee6API = API(1000714277629476955)
    role1 = discord.utils.get(guild.roles, name="Bronze")
    role2 = discord.utils.get(guild.roles, name="Silver")
    role3 = discord.utils.get(guild.roles, name="Gold")
    role4 = discord.utils.get(guild.roles, name="Peace")
    while True:
        try:
            for member in guild.members:
                level = await mee6API.levels.get_user_level(member.id)
                print(level)
                if level is None:
                    continue
                if level >= 10:
                    if not role4 in member.roles:
                        await member.add_roles(role4)
                        await member.remove_roles(role3)
                        await member.remove_roles(role2)
                        await member.remove_roles(role1)
                elif level >= 7:
                    if not role3 in member.roles:
                        await member.add_roles(role3)
                        await member.remove_roles(role2)
                        await member.remove_roles(role1)
                elif level >= 5:
                    if not role2 in member.roles:
                        await member.add_roles(role2)
                        await member.remove_roles(role1)
                elif level >= 3:
                    if not role1 in member.roles:
                        await member.add_roles(role1)
        except:
            print("zzzzz")
            asyncio.sleep(10)
            #await asyncio.sleep(0.5)
        
        
        

    
    
@bot.event
async def on_message(message):
    if message.author.bot:
        print("봇")
        return
    print('name',message.author)
    totalInvites = 0
    for i in await message.guild.invites():
        if i.inviter == message.author:
            totalInvites += i.uses
    print("invite",totalInvites)
    mee6API = API(message.guild.id)
    level = -1
    role1 = discord.utils.get(message.guild.roles, name="WL")
    role2 = discord.utils.get(message.guild.roles, name="OG")
    role3 = discord.utils.get(message.guild.roles, name="manage")
    role4 = discord.utils.get(message.guild.roles, name="Partner")
    if (not role1 in message.author.roles) and (totalInvites >= 3):
        level = await mee6API.levels.get_user_level(message.author.id)
        print("WL 레벨체크",level)
        if level>=3:
            print("추가")
            await message.author.add_roles(role1)
            await message.channel.send(f"{message.author.mention}, you just got the WL role! check <#1000641874626891806>.")
            
    
    if (not role2 in message.author.roles) and (len(role2.members) <= 250) and totalInvites >= 5:
        if level < 0:
            level = await mee6API.levels.get_user_level(message.author.id)
        print("OG 레벨체크",level)
        if level >= 5:
            print("추가")
            await message.author.add_roles(role2)
            await message.channel.send(f"{message.author.mention}, you just got the OG role! check <#1000393550304915506>.")
    msg= message.content.lower()
    if (not role3 in message.author.roles) and (not role4 in message.author.roles):
        link = ["https:",".com","discord.gg","discordapp.com","http:","www."]
        if any(word in msg for word in link):
            await message.delete()
            await message.channel.send(f"{message.author.mention}, No Link Allowed")


with open('secret.json') as f:
    secrets = json.load(f)
casino = secrets['casino']

bot.run(casino)
