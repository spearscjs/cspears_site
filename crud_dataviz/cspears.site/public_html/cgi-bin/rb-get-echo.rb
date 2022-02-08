#!/usr/bin/ruby
require 'cgi'

puts("Cache-Control: no-cache")
puts("Content-type:text/html\r\n\r\n")

puts("<html>")
puts("<head>")
puts("<title>Get Request Echo</title>")
puts("</head>")
puts("<body>")
puts("<h1 align=center>Get Request Echo</h1>")

queryString = "#{ENV["QUERY_STRING"]}"
puts("Query String: #{queryString}<br/>")

queryString.split("&").each { | e |
    k, v = e.split("=")
    puts "#{k}:#{v}<br/>"
}

puts("</body>")
puts("</html>")
