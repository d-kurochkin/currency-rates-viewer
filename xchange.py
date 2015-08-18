def currencies():
    return ['AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP',
            'GPY', 'KZT', 'RUB', 'UAH', 'USD']


def get_pairs(base):
    if base not in currencies():
        raise ValueError("Unavailable currency")

    return ["'%s%s'" % (base, quote) for quote in currencies()]


def get_ratios(currency):
    if currency not in currencies():
        raise ValueError("Unavailable currency")

    pass
