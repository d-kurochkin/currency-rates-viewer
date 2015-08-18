def currencies():
    return ['AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP',
            'GPY', 'KZT', 'RUB', 'UAH', 'USD']


def get_pairs(currency):
    if currency not in currencies():
        raise ValueError("Unavailable currency")

    pass


def get_ratios(currency):
    if currency not in currencies():
        raise ValueError("Unavailable currency")

    pass
