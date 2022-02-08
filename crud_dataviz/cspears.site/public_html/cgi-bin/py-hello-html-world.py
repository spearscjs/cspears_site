#!/usr/bin/python3
import os

from datetime import datetime
time = datetime.now()
address = os.environ.get("REMOTE_ADDR")

print("Content-type:text/html\r\n\r\n")
print("<html>")
print("<head>")
print("<title>Hello, Python!</title>")
print("</head>")
print("<body>")
print("<h2>Hello World! This is my first CGI program</h2>")
print("<h1>Curtis was here - Hello, Python!</h1>")
print("<p>This page was generated with the Python programming langauge</p>")

print("This program was generated at: ", time, "<br/>")
print("Your current IP address is: ", address, "<br/>")

print("</body>")
print("</html>")



