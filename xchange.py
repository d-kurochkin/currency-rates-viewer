def currencies():
    return ['EUR', 'GPY', 'KZT', 'RUB', 'UAH', 'USD']


def currency_pairs(base):
    if base not in currencies():
        raise ValueError("Unavailable currency")

    return ["'%s%s'" % (base, quote) for quote in currencies()]


def build_query(currency):
    pass


def get_ratios(currency):
    if currency not in currencies():
        raise ValueError("Unavailable currency")

    pass
