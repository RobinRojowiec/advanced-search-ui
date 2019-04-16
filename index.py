import json
import os
from time import sleep

from elasticsearch import Elasticsearch, TransportError

es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

INDEX_NAME = "wikipedia_pages"
DOC_TYPE = "Wikipage"

if es.indices.exists(INDEX_NAME):
    es.indices.delete(index=INDEX_NAME)

if not es.indices.exists(INDEX_NAME):
    es.indices.create(index=INDEX_NAME)

    with open("data/mapping.json", "r", encoding="utf-8") as file:
        mapping_json: dict = json.load(file)
        es.indices.put_mapping(body=mapping_json, index=INDEX_NAME)

    path: str = "data/docs/"
    for r, d, f in os.walk(path):
        counter = 0
        for file_name in f:
            if file_name.endswith(".json"):
                try:
                    with open(path + file_name, "r", encoding="utf-8") as file:
                        json_object: dict = json.load(file)
                        es.index(index=INDEX_NAME, body=json_object)
                    counter += 1
                    sleep(0.1)
                    print("Indexed file: %s, doc_number: %i" % (file_name, counter))
                except TransportError as e:
                    print(e.info)
