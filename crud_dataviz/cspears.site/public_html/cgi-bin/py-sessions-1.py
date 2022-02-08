#!/usr/bin/python3
import os
import cgi
import requests
from http import cookies

form = cgi.FieldStorage()
name = form.getlist("username")

if(name):
    print("Set-Cookie: PYSESSUNN=",name[0])

print("Cache-Control: no-cache")
print("Content-type:text/html\r\n\r\n")

print("<html>")
print("<head>")
print("<title>Python Sessions Page 1</title>")

print("</head>")
print("<body>")
print("<h1 align=center>Python Sessions Page</h1>")

if(name):
    print("<p><b>Name:</b>",name[0],"</p>")
else :
    cookie_string = os.environ.get('HTTP_COOKIE')
    if not cookie_string:
        print("<p><b>Name:</b>no name found</p>")
    else :
        cookie = cookies.SimpleCookie()
        cookie.load(cookie_string)
        name = cookie.get("PYSESSUNN")
        if name:
            name = name.value
            print("<p><b>Name:</b>", name,"</p>")
        else: 
            print("<p><b>Name:</b>no name found")


print("<br/><br/>")
print("<a href=\"/cgi-bin/py-sessions-2.py\">Session Page 2</a><br/>")
print("<a href=\"/py-cgiform.html\">Python CGI Form</a><br />")
print("<form style=\"margin-top:30px\" action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

print("</body>")
print("</html>")