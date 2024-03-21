from utils import *
import time
from binance import ThreadedWebsocketManager
from telegram.ext import Updater, MessageHandler, Filters, CommandHandler
from functools import partial
from algorithm import checkCoin, rsiCheck
from coin import Coin
from message import Telegram
from binance.client import Client
from exception import *


class Account:
    def __init__(self, client: Client, profile, ticker_list, setting, telegram: Telegram):
        self.activate = 1
        self.finish = False
        self.initial_balance = 0
        self.my = client
        self.flow = [0 for _ in range(setting['number'])]
        self.binance = profile
        self.all = ticker_list
        self.list = dict()  # {ticker:[object,twm,socket],}
        self.temp = set()
        self.telegram = telegram
        self.telegram.dispatcher.add_handler(
            CommandHandler('bring', self.print_balance))
        self.setting = setting
        self.lev = setting['leverage']

    def start(self):
        # =============================이미있는 자산 체크==========================
        self.telegram.start()
        self.telegram.print('=====매크로 시작중======')
        balance = self.binance.fetch_balance()
        self.initial_balance = float(balance['info']['totalWalletBalance'])
        positions = balance['info']['positions']
        count = 0
        for position in positions:
            if float(position["positionAmt"]) != 0:
                count += 1
                twm = ThreadedWebsocketManager()
                twm.start()
                self.addCoin(position['symbol'], twm)
        # ========================================================================

        # ============================초기 n개 맞춰주기===========================
        try:
            while count < self.setting['number']:
                print('initial setting')
                twm = ThreadedWebsocketManager()
                twm.start()
                self.findCoin(twm)
                count += 1
        except Exception as e:
            print(e)
            self.telegram.print('검색중단')

        # while self.telegram.activate == 1:
        #     balance = self.binance.fetch_balance()
        #     total_money = float(balance['info']['totalWalletBalance'])
        #     self.telegram.print('실행중 -> 잔고: '+str(round(total_money, 2))+'수익률: '+str(
        #         round((total_money - self.initial_balance)/self.initial_balance*100, 3)))
        #     time.sleep(3600)

        for ob in self.list:
            self.list[ob][1].join()
            print('조인')
        self.telegram.print('=====매크로 종료중======')
        self.list = dict()
        self.temp = set()
        self.telegram.print('매크로를 종료합니다.')
        print('finish')
        # ========================================================================

    def print_balance(self, update, context):
        try:
            balance = self.binance.fetch_balance()
            positions = balance['info']['positions']
            total_wallet = balance['info']['totalWalletBalance']
            total_coin = [['전액', total_wallet]]
            for position in positions:
                if float(position["positionAmt"]) != 0:
                    ticker = position['symbol']
                    price = self.list[ticker][0].origin_price * \
                        self.list[ticker][0].amount/self.list[ticker][0].lev
                    profit = round(
                        float(position['unrealizedProfit'])/price*100, 3)
                    total_coin.append(
                        ['코인', ticker, '투자금', round(price, 4), '손익률', profit])
            self.telegram.print(arr_print([[total_coin, "전체 계좌 조회"]]))

        except Exception as e:
            print('전체계좌 출력실패', e)
            self.telegram.print('전체계좌 출력실패')

    def precision(self, ticker, price, diff=0):
        digit = self.all[ticker]
        return round(price+diff/(10**digit), digit)

    def addCoin(self, ticker, twm):
        balance = self.binance.fetch_balance()
        positions = balance['info']['positions']
        for position in positions:
            if position["symbol"] == ticker:
                lev = int(position['leverage'])
                price = float(position['entryPrice'])
                amount = float(position['positionAmt'])
                timestamp = int(position['updateTime'])
                if amount > 0:
                    kind = 1
                else:
                    amount = -amount
                    kind = -1
        print('코인추가', ticker, kind, (price+0.002*price/lev)
              if kind == 1 else (price-0.002*price/lev))
        socket = twm.start_symbol_ticker_futures_socket(
            callback=partial(checkCoin, account=self, sym=ticker, twm=twm), symbol=ticker)
        if not socket in twm._socket_running:
            socket = twm.start_symbol_ticker_futures_socket(
                callback=partial(checkCoin, account=self, sym=ticker, twm=twm), symbol=ticker)
        elif not twm._socket_running[socket]:
            socket = twm.start_symbol_ticker_futures_socket(
                callback=partial(self.checkCoin, account=self, sym=ticker, twm=twm), symbol=ticker)
        coin = Coin(ticker, price, amount, kind, lev, timestamp, self.setting)
        self.list[ticker] = [
            coin, twm, socket]
        self.temp.discard(ticker)
        return coin

    def removeCoin(self, ticker):
        print('코인삭제', ticker)
        twm = self.list[ticker][1]
        socket = self.list[ticker][2]
        del (self.list[ticker])
        twm.stop_socket(socket)

    def buyCoin(self, ticker, kind, lev):
        self.my.futures_change_leverage(symbol=ticker, leverage=lev)
        balance = self.binance.fetch_balance()
        size = float(balance['info']['totalWalletBalance']
                     )/self.setting['number']*0.8
        price = float(self.my.futures_orderbook_ticker(symbol=ticker)['bidPrice']) if kind == 1 else float(
            self.my.futures_orderbook_ticker(symbol=ticker)['askPrice'])
        amount = size/price*lev
        print('구매주문예정', ticker, kind, '가격=', price, '갯수=', decimal(amount))
        order = self.my.futures_create_order(
            symbol=ticker,
            type="LIMIT",
            timeInForce='FOK',
            price=self.precision(
                ticker, price*1.0002) if kind == 1 else self.precision(ticker, price*0.9998),
            side='BUY' if kind == 1 else 'SELL',
            quantity=decimal(amount)
        )
        print('구매주문', ticker, kind)
        time.sleep(3)
        if not self.orderCheck(ticker, order['orderId']):
            self.my.futures_cancel_order(
                symbol=ticker,
                orderId=order['orderId'])
            raise OrderCancel
        else:
            print('주문 체결', ticker)
            self.telegram.print(arr_print([[ticker, kind, '종류', str(kind),
                                '전체잔고', balance['info']['totalWalletBalance']]], '주문 체결'))

    def orderCheck(self, ticker, orderId):
        order_check = self.my.futures_get_order(
            symbol=ticker,
            orderId=orderId)
        if order_check['status'] == 'NEW':
            return False
        elif order_check['status'] == 'FILLED':
            return True
        elif order_check['status'] == 'CANCELED':
            return False
        elif order_check['status'] == 'PARTIALLY_FILLED':
            return False

    def findCoin(self, twm):
        stop = True
        print(self.list.keys())
        print(self.temp)
        while stop:
            for ticker in self.all:
                if self.telegram.activate == 0:
                    raise ThreadCancel
                if ticker not in self.list and ticker not in self.temp:
                    self.temp.add(ticker)
                    kind = rsiCheck(ticker)
                    self.flow.append(kind)
                    del self.flow[0]
                    if kind:
                        try:
                            self.buyCoin(ticker, kind, self.lev)
                        except Exception as e:
                            print('구매실패', e)
                            self.telegram.print('구매실패: '+ticker)
                            self.temp.discard(ticker)
                            continue

                        coin = self.addCoin(ticker, twm)
                        self.orderCoin(coin)
                        stop = False
                        break
                    self.temp.discard(ticker)

    def orderCoin(self, coin: Coin):
        order1 = self.my.futures_create_order(
            symbol=coin.ticker,
            type="STOP",
            stopPrice=self.precision(
                coin.ticker, coin.p_price, -1) if coin.kind == 1 else self.precision(coin.ticker, coin.n_price, 1),
            price=self.precision(
                coin.ticker, coin.p_price) if coin.kind == 1 else self.precision(coin.ticker, coin.n_price),
            side='SELL' if coin.kind == 1 else 'BUY',
            quantity=coin.amount
        )
        order2 = self.my.futures_create_order(
            symbol=coin.ticker,
            type="TAKE_PROFIT",
            stopPrice=self.precision(
                coin.ticker, coin.p_price, 1) if coin.kind == 1 else self.precision(coin.ticker, coin.n_price, -1),
            price=self.precision(
                coin.ticker, coin.p_price) if coin.kind == 1 else self.precision(coin.ticker, coin.n_price),
            side='SELL' if coin.kind == 1 else 'BUY',
            quantity=coin.amount
        )
    # twm에서 callback하는 함수
