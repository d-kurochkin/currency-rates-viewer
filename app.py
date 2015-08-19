import flask
from flask import jsonify
import xchange

app = flask.Flask(__name__)

CURRENCY_RATION = {
    "USD": {"BMD": 10, "SZL": 10},
    "BMD": {"USD": 9, "SZL": 9},
    "SZL": {"BMD": 8, "USD": 8}
}


@app.route("/")
def index():
    return flask.redirect(flask.url_for('static', filename='index.html'))


@app.route("/list")
def currencies():
    return jsonify({'currencies': xchange.currencies()})


@app.route("/ratio/<currency>")
def ratio(currency):
    try:
        return jsonify({"ratio": CURRENCY_RATION[currency]})
    except KeyError, e:
        flask.abort(400)
        # @todo: log it


if __name__ == "__main__":
    app.run(debug=True)
