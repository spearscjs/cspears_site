#!/usr/bin/python3
import os
import sys
import urllib.parse

print("Cache-Control: no-cache")
print("Content-type:text/html\r\n\r\n")

print("<html>")
print("<head>")
print("<title>Post Request Echo</title>")
print("</head>")
print("<body>")
print("<h1 align=center>Post Request Echo</h1>")

input = sys.stdin.read()
print("Raw: ", input)

print("<br/>")
print("<br/>")

inputParse = urllib.parse.parse_qs(input)
for k, v in inputParse.items():
    for i in range(len(v)):
        print(k,":",v[i],"<br/>")  


print("</body>")
print("</html>")
