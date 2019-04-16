import requests
from elasticsearch import Elasticsearch


class Highlight:
    def __init__(self, field: str):
        self.field: str = field
        self.snippets = []

    def add_snippet(self, text: str):
        self.snippets.append(text)


class SearchResult:
    def __init__(self, title):
        self.score: float = 0.0
        self.title: str = title
        self.text: str = ""
        self.highlights: [] = []

    def add_highlight(self, highlight: Highlight):
        self.highlights.append(highlight)


class Searcher:
    def __init__(self):
        self.client: Elasticsearch = None
        self.index_name: str = "wikipedia_pages"
        self.doc_type: str = "Wikipage"
        self.query_template = {
            "query": {
                "simple_query_string": {
                    "fields": [
                        "title",
                        "text"
                    ],
                    "query": "XXX",
                    "default_operator": "or"
                }
            },
            "highlight": {
                "order": "score",
                "fields": {
                    "text": {
                        "type": "unified"
                    }
                }
            }
        }

    def connect(self):
        self.client = Elasticsearch([{'host': 'localhost', 'port': 9200}])
        self.client.ping()

    def get_answer(self, query_string: str, context: str):
        # api-endpoint
        URL = "https://330cf60e.ngrok.io/submitted"
        headers = {'content-type': 'application/x-www-form-urlencoded'}

        # defining a params dict for the parameters to be sent to the API
        IP: str = "178.6.50.168"
        data = {"ip": IP, "Paragraph": context, "Question1": query_string, "Question2": "", "Question3": "",
                "Question4": "", "Question5": ""}

        # sending get request and saving the response as response object
        r = requests.post(url=URL, data=data, headers=headers)

        # extracting data in json format
        return r.json()['question_1']

    def search(self, query_string: str):
        query: dict = self.query_template.copy()
        query['query']['simple_query_string']['query'] = query_string

        raw_results = self.client.search(self.index_name, query, params={"size": 10})
        search_results = []

        for hit in raw_results["hits"]["hits"]:
            result = SearchResult(hit['_source']['title'])
            result.score = hit["_score"]
            result.text = hit['_source']['text']

            for field in hit['highlight']:
                highligth = Highlight(field)
                highligth.snippets = hit['highlight'][field]
                result.add_highlight(highligth)

            search_results.append(result)

        return search_results


if __name__ == '__main__':
    searcher = Searcher()
    response = searcher.get_answer('Who founded google?',
                                   'Google was founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California.')
    print(response)
