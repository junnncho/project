from message import Telegram
from utils import *
from account import Account
import ccxt
import time
from binance.client import Client
import json

# =================================예외처리 목록=============================================================


def main():
    # ==========================기초 세팅=============================
    with open('secret.json') as f:
        secrets = json.load(f)
    apiKey = secrets['binance_key']
    secret = secrets['binance_secret']
    botToken = secrets['telegram_token']
    chatId = secrets['telegram_chatId']
    with open('setting.json') as f:
        setting = json.load(f)

    profile = ccxt.binance(config={
        'apiKey': apiKey,
        'secret': secret,
        'enableRateLimit': True,
        'options': {
            'defaultType': 'future'
        }
    })
    client = Client(api_key=apiKey, api_secret=secret)
    ticker_list = {'FTMUSDT': 4, 'EOSUSDT': 3, 'DOTUSDT': 3, 'DOGEUSDT': 5,
                   'BCHUSDT': 2, 'XRPUSDT': 4, 'ADAUSDT': 4, 'ATOMUSDT': 3, 'TRXUSDT': 5,
                   'BNBUSDT': 2, 'LTCUSDT': 2, 'ETCUSDT': 3}
    # [SOLUSDT':2,  'LUNAUSDT':3,'BTCUSDT':2, 'ETHUSDT':2,'AVAXUSDT':2,]
    telegram = Telegram(botToken, chatId)
    account = Account(client, profile, ticker_list, setting, telegram)

    while True:
        time.sleep(3)
        if telegram.activate == 1:
            account.start()


if __name__ == "__main__":

    main()
