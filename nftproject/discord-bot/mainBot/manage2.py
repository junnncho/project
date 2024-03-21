import asyncio
import discord
import time
from discord.ext.commands import Bot
import os
import json

intents = discord.Intents.all()

bot = Bot(command_prefix="!!", intents=intents)


@bot.event
async def on_ready():
    print('다음으로 로그인합니다: ')
    print(bot.user.name)
    print('connection was succesful')
    await bot.change_presence(status=discord.Status.online, activity=None)


@bot.command()
async def 인증(ctx):
    embed = discord.Embed(title="GooGoo Holder Verify", url="https://discord.com/oauth2/authorize?client_id=1013899126020247705&redirect_uri=https%3A%2F%2Fgoogoo.world%2Fnft&response_type=code&scope=identify",
                          description="Click above link and verify your nft.", color=0xFF5733)
    await ctx.send(embed=embed)

with open('secret.json') as f:
    secrets = json.load(f)
verify = secrets['verify']

bot.run(verify)
