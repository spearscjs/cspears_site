#!/usr/bin/ruby

puts("Cache-Control: no-cache")
puts("Content-type:text/html\r\n\r\n")

puts("<html>")
puts("<head>")
puts("<title>General Request Echo</title>")
puts("</head>")
puts("<body>")
puts("<h1 align=center>General Request Echo</h1>")

puts("<p><b>HTTP Protocol:</b>#{ENV["SERVER_PROTOCOL"]}</p>")
puts("<p><b>HTTP Method:</b>#{ENV["REQUEST_METHOD"]}</p>")
puts("<p><b>QUERY STRING:</b>#{ENV["QUERY_STRING"]}</p>")

input = $stdin.read
puts("<p><b>Message Body:</b>",input,"</p>");

puts("</body>")
puts("</html>")