import os

import jsonpickle
from flask import Flask, request
from werkzeug.exceptions import BadRequest

from searcher import Searcher

app = Flask(__name__)

QUERY_KEY = 'query'
CONTEXT = 'context'

searcher: Searcher = Searcher()
searcher.connect()


@app.route('/search', methods=['GET'])
def search():
    query_string: str = request.args.get(QUERY_KEY)
    if query_string:
        results = searcher.search(query_string)
        response = app.response_class(
            response=jsonpickle.encode(results, unpicklable=False),
            status=200,
            mimetype='application/json'
        )
        return response
    raise BadRequest("Query missing or incomplete!")


@app.route('/get_answer', methods=['GET'])
def get_answer():
    query_string: str = request.args.get(QUERY_KEY)
    context: str = request.args.get(CONTEXT)
    if query_string:
        results = searcher.get_answer(query_string, context)
        response = app.response_class(
            response=jsonpickle.encode(results, unpicklable=False),
            status=200,
            mimetype='application/json'
        )
        return response
    raise BadRequest("Query missing or incomplete!")


if __name__ == '__main__':
    port: int = os.getenv("PORT", 1200)
    app.run(port=port, host="0.0.0.0")
