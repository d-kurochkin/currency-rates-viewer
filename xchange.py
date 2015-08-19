from requests import get
from cache import Cached


def currencies():
    return ['EUR', 'JPY', 'KZT', 'RUB', 'UAH', 'USD']


def _currency_pairs(base):
    if base not in currencies():
        raise ValueError("Unavailable currency")

    return ["'%s%s'" % (base, quote) for quote in currencies() if quote != base]


def _build_query(currency):
    pairs = _currency_pairs(currency)

    return "select * from yahoo.finance.xchange where pair in (%s)" % ", ".join(pairs)


@Cached(lifetime=60)
def get_rates(currency):
    if currency not in currencies():
        raise ValueError("Unavailable currency")

    parameters = {
        "q": _build_query(currency),
        "env": "store://datatables.org/alltableswithkeys",
        "format": "json"
    }

    response = get("https://query.yahooapis.com/v1/public/yql", params=parameters)
    rates = response.json().get("query", {}).get("results", {}).get("rate", [])

    return {item['id']: item['Rate'] for item in rates}
