import flask
import json

app = flask.Flask(__name__)

CURRENCIES = ['AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP',
              'GPY', 'KZT', 'RUB', 'UAH', 'USD']

CURRENCY_RATION = {
    "USD": {"BMD": 10, "SZL": 10},
    "BMD": {"USD": 9, "SZL": 9},
    "SZL": {"BMD": 8, "USD": 8}
}


@app.route("/")
def index():
    return flask.redirect(flask.url_for('static', filename='index.html'))


@app.route("/ratio/<currency>")
def ratio(currency):
    try:
        return json.dumps({"ratio": CURRENCY_RATION[currency]})
    except KeyError, e:
        flask.abort(400)
        # @todo: log it


if __name__ == "__main__":
    app.run(debug=True)
