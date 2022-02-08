#!/usr/bin/python
import os
import json
from datetime import datetime
from json import JSONEncoder

time = datetime.now()
address = os.environ.get("REMOTE_ADDR")

print("Content-type:application/json\r\n\r\n")

x = {
    "title": "Hello, Python!",
    "heading": "Hello, Python!",
    "message": "This page was generated with the Python programming language",
    "time": time.isoformat(),
    "IP": address
}

y = json.dumps(x)
print(y)