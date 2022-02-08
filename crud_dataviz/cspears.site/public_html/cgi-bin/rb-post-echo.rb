#!/usr/bin/ruby

puts("Cache-Control: no-cache")
puts("Content-type:text/html\r\n\r\n")

puts("<html>")
puts("<head>")
puts("<title>Post Request Echo</title>")
puts("</head>")
puts("<body>")
puts("<h1 align=center>Post Request Echo</h1>")

input = $stdin.read
puts("Raw: #{input}")

input.split("&").each { | e |
    k, v = e.split("=")
    puts "#{k}:#{v}<br/>"
}

puts("<br/>")
puts("<br/>")



puts("</body>")
puts("</html>")
