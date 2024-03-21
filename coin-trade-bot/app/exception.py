
class OrderCancel(Exception):    # 구매 안될 시 오류
    def __init__(self):
        super().__init__('주문이 체결되지 않음')


class ThreadCancel(Exception):    # 스레드 죽이기
    def __init__(self):
        super().__init__('스레드 종료')
