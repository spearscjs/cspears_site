#!/usr/bin/python3
import os
import sys
import urllib.parse

print("Cache-Control: no-cache")
print("Content-type:text/html\r\n\r\n")

print("<html>")
print("<head>")
print("<title>General Request Echo</title>")
print("</head>")
print("<body>")
print("<h1 align=center>General Request Echo</h1>")

print("<p><b>HTTP Protocol:</b>",os.environ.get("SERVER_PROTOCOL"),"</p>")
print("<p><b>HTTP Method:</b>",os.environ.get("REQUEST_METHOD"),"</p>")
print("<p><b>Query String:</b>",os.environ.get("QUERY_STRING"),"</p>")

input = sys.stdin.read()
print("<p><b>Message Body:</b>",input,"</p>");

print("</body>")
print("</html>")