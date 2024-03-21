class Coin:
    def __init__(self, ticker, price, amount, kind, lev, timestamp, setting):
        self.price_change = False
        self.kind = kind
        self.ticker = ticker
        self.lev = lev
        self.price = price
        self.origin_price = price
        self.amount = amount
        self.precision = self.price
        self.time = timestamp
        self.p_price = self.price+setting['margin']*self.price \
            if kind == 1 else (
            self.price+setting['stopLoss']*self.price)
        self.n_price = self.price-setting['stopLoss']*self.price if kind == - \
            1 else (self.price-setting['margin']*self.price)
        self.defense = 0
        self.exist = True
        self.manual = False
