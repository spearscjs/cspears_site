#!/usr/bin/python3
import os
import cgi
import requests
from http import cookies

cookie_string = os.environ.get('HTTP_COOKIE')

cookie = cookies.SimpleCookie()

print("Cache-Control: no-cache")
print("Content-type:text/html\r\n\r\n")

print("<html>")
print("<head>")
print("<title>Python Sessions Page 1</title>")

print("</head>")
print("<body>")
print("<h1 align=center>Python Sessions Page</h1>")

if not cookie_string:
    print("Name: no name found")
else:
    cookie.load(cookie_string)
    name = cookie.get("PYSESSUNN")
    if name:
        name = name.value
        print("<p><b>Name:</b>", name,"</p>")
    else:
        print("<p><b>Name:</b>no name found</p>")

print("<br/><br/>")
print("<a href=\"/cgi-bin/py-sessions-1.py\">Session Page 1</a><br/>")
print("<a href=\"/py-cgiform.html\">Python CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

print("</body>")