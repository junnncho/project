def trend_flow(arr):
    count = 0
    for i in arr:
        count += i
    if count > 1:
        return 1
    elif count < -1:
        return -1
    else:
        return 0


def arr_print(arr, title=""):
    msg = ""
    if len(title) != 0:
        msg = "===="+title+"===="
    for sub in arr:
        msg = msg + "\n"
        count = 0
        for j in sub:
            if count % 2 == 0 and len(sub)-1 != count:
                msg = msg + str(j) + " = "
            elif len(sub)-1 != count:
                msg = msg + str(j) + ", "
            else:
                msg = msg + str(j)
            count += 1
    return msg


def calc_percent(origin, price):
    return round((price-origin)/origin, 4)*100


def decimal(num):
    if num >= 10:
        return round(num) - 1
    elif num >= 1:
        return round(num, 1)
    elif num >= 0.1:
        return round(num, 2)
    elif num >= 0.01:
        return round(num, 3)
    elif num >= 0.001:
        return round(num, 3)
    else:
        return round(num, 4)

# 매수 기준 함수
