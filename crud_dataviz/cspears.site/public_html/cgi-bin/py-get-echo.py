#!/usr/bin/python3
import os
import urllib.parse

print("Cache-Control: no-cache")
print("Content-type:text/html\r\n\r\n")

print("<html>")
print("<head>")
print("<title>Get Request Echo</title>")
print("</head>")
print("<body>")
print("<h1 align=center>Get Request Echo</h1>")

queryString = os.environ.get("QUERY_STRING")
queryParse = urllib.parse.parse_qs(queryString)

print("Query String: ",queryString,"<br/>")

for k, v in queryParse.items():
    for i in range(len(v)):
        print(k,":",v[i],"<br/>")

print("</body>")
print("</html>")
