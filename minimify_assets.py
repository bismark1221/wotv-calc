#!/usr/bin/env python3

import json
from os import path, walk
from os.path import join, expanduser

def minify(fileName):
    print(fileName)
    file_data = open(fileName, "r", 1).read()
    json_data = json.loads(file_data)
    json_string = json.dumps(json_data, separators=(',', ":"))
    open(fileName, "w+", 1).write(json_string)

fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('client/assets/data')) for f in fn]
for fileName in fileNames:
    minify(fileName)
