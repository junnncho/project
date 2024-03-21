from utils import *
from functools import partial
import numpy as np
import time
import ccxt
import talib

# 예약가에 도달했는지 체크해주는 함수


def checkCoin(account, msg, sym=None, twm=None):
    finish = False
    try:
        ticker = msg['data']['s']
        coin = account.list[ticker][0]
        if not coin.exist:
            twm.stop_socket(sym)
    except Exception as e:
        print('소켓데이터 오류', e, msg)
        account.telegram.print('소켓데이터 오류')
        twm.start_symbol_ticker_futures_socket(callback=partial(
            checkCoin, sym=sym, twm=twm), symbol=sym)
        return None
    ask = float(msg['data']['a'])
    bid = float(msg['data']['b'])
    price = ask if coin.kind == 1 else bid
    if account.web == 1:
        print(arr_print([[ticker, coin.kind, '현재흐름', account.flow[-1], '진입', coin.time,
                          '현재퍼센트', calc_percent(price, coin.origin_price)*coin.lev]], '웹소켓 콜백'))
        account.telegram.print(arr_print([[ticker, coin.kind, '현재흐름', account.flow[-1], '진입', coin.time,
                                           '현재퍼센트', calc_percent(price, coin.origin_price)*coin.lev]], '웹소켓 콜백'))
    if coin.kind == 1:
        if coin.p_price <= ask:
            finish = True
            account.telegram.print(
                arr_print([[ticker, 'LONG', '수익여부', '이익']], '매도하겠음'))
        elif coin.n_price >= ask:
            finish = True
            account.telegram.print(
                arr_print([[ticker, 'LONG', '수익여부', '대량손해']], '매도하겠음'))
    elif coin.kind == -1:
        if coin.n_price >= bid:
            finish = True
            account.telegram.print(
                arr_print([[ticker, 'SHORT', '수익여부', '이익']], '매수하겠음'))
        elif coin.p_price <= bid:
            finish = True
            account.telegram.print(
                arr_print([[ticker, 'SHORT', '수익여부', '대량손해']], '매수하겠음'))
    if finish:
        if account.activate == 0:
            account.list[ticker][1].stop()
            account.telegram.print('검색중단')
        else:
            try:
                account.findCoin(account.list[ticker][1])
            except Exception as e:
                account.telegram.print('검색중단')
                print(e)
                account.list[ticker][1].stop()
                return None
            account.removeCoin(ticker)

# RSI체크해서 22미만이면 1, 78초과면 -1, 아니면 0


def rsiCheck(ticker):
    binance = ccxt.binance(config={
        'enableRateLimit': True,
        'options': {
            'defaultType': 'future'
        }
    })
    time.sleep(0.7)
    try:
        ohlcv = binance.fetch_ohlcv(ticker)
        df = [row[4] for row in ohlcv]
        # fastk, fastd = talib.STOCHRSI(np.asarray(df), timeperiod=5, fastk_period=3, fastd_period=3, fastd_matype=0,)
        rsi = talib.RSI(np.asarray(df), 7)
        rsi2 = talib.RSI(np.asarray(df), 14)
        ema1 = talib.EMA(np.asarray(df), 5)
        ema2 = talib.EMA(np.asarray(df), 10)
        ema3 = talib.EMA(np.asarray(df), 20)
        ema4 = talib.EMA(np.asarray(df), 30)
        # diff1 = fastk[-1] - fastd[-1]

        if True:
            # if ema1[-1] >= ema2[-1] and ema2[-1] >= ema3[-1] and ema3[-1] >= ema4[-1]:
            if rsi[-1] >= 58 and rsi2[-1] >= 58:
                print('rsi체크', ticker, 'rsi 78이상')
                return -1
            else:
                for i in range(2, 9):
                    if not (ema1[-i] >= ema2[-i] and ema2[-i] >= ema3[-i] and ema3[-i] >= ema4[-i]):
                        break
                    if i == 6:
                        if ema1[-1] - ema3[-1] >= ema1[-2] - ema3[-2] and ema1[-2] - ema3[-2] <= ema1[-3] - ema3[-3] and ema1[-2] - ema3[-2] <= ema1[-4] - ema3[-4]:
                            if rsi[-1] < 45:
                                print('rsi체크', ticker, 'rsi 45미만')
                                return 1
                    if i == 8:
                        if ema1[-1] - ema3[-1] >= ema1[-3] - ema3[-3] and ema1[-3] - ema3[-3] >= ema1[-5] - ema3[-5] and ema1[-5] - ema3[-5] >= ema1[-8] - ema3[-8]:
                            if rsi[-1] >= 72:
                                print('rsi체크', ticker, 'rsi 72이상')
                                return -1

        if True:
            # if ema1[-1] <= ema2[-1] and ema2[-1] <= ema3[-1] and ema3[-1] <= ema4[-1]:
            if rsi[-1] <= 42 and rsi2[-1] <= 42:
                print('rsi체크', ticker, 'rsi 22이하')
                return 1
            else:
                for i in range(2, 9):
                    if not (ema1[-i] <= ema2[-i] and ema2[-i] <= ema3[-i] and ema3[-i] <= ema4[-i]):
                        break
                    if i == 6:
                        if ema1[-1] - ema3[-1] <= ema1[-2] - ema3[-2] and ema1[-2] - ema3[-2] >= ema1[-3] - ema3[-3] and ema1[-2] - ema3[-2] >= ema1[-4] - ema3[-4]:
                            if rsi[-1] > 55:
                                print('rsi체크', ticker, 'rsi 55초과')
                                return -1
                    if i == 8:
                        if ema1[-1] - ema3[-1] <= ema1[-3] - ema3[-3] and ema1[-3] - ema3[-3] <= ema1[-5] - ema3[-5] and ema1[-5] - ema3[-5] <= ema1[-8] - ema3[-8]:
                            if rsi[-1] <= 28:
                                print('rsi체크', ticker, 'rsi 28이하')
                                return 1
        print('rsi체크', ticker, '실패')
        return 0

    except Exception as e:
        print('너무 많은 요청', e)
        time.sleep(5)
        return 0
