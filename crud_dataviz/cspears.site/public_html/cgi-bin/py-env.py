#!/usr/bin/python3
import os

print("Cache-Control: no-cache")
print("Content-type:text/html\r\n\r\n")

print("<html>")
print("<head>")
print("<title>Environment Variables</title>")
print("</head>")
print("<body>")
print("<h1 align=center>Environment Variables</h1>")


for k, v in os.environ.items():
    print(k,"=",v)
    print("<br/>")

print("</body>")
print("</html>")
