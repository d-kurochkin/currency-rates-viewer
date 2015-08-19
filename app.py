import flask
from flask import jsonify
import xchange

import logging
from logging.handlers import TimedRotatingFileHandler

app = flask.Flask(__name__)


@app.route("/")
def index():
    return flask.redirect(flask.url_for('static', filename='index.html'))


@app.route("/list")
def currencies():
    return jsonify({'currencies': xchange.currencies()})


@app.route("/ratio/<currency>")
def ratio(currency):
    try:
        return jsonify({'ratio': xchange.get_rates(currency)})
    except ValueError, e:
        app.logger.error(e)
        flask.abort(400)


if __name__ == "__main__":
    handler = TimedRotatingFileHandler('app.log', backupCount=1, when='midnight')
    formatter = logging.Formatter("%(asctime)s  %(levelname)s: %(message)s")
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)
    app.run(debug=True)
