def currencies():
    return ['EUR', 'GPY', 'KZT', 'RUB', 'UAH', 'USD']


def currency_pairs(base):
    if base not in currencies():
        raise ValueError("Unavailable currency")

    return ["'%s%s'" % (base, quote) for quote in currencies() if quote != base]


def build_query(currency):
    pairs = currency_pairs(currency)

    return "select * from yahoo.finance.xchange where pair in (%s)" % ", ".join(pairs)


def get_ratios(currency):
    if currency not in currencies():
        raise ValueError("Unavailable currency")

    pass
