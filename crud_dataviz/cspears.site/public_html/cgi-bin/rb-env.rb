#!/usr/bin/ruby

puts("Cache-Control: no-cache")
puts("Content-type:text/html\r\n\r\n")

puts("<html>")
puts("<head>")
puts("<title>Environment Variables</title>")
puts("</head>")
puts("<body>")
puts("<h1 align=center>Environment Variables</h1>")

ENV.to_a.each {|x,v| puts "#{x} = #{v}<br/>"}

puts("</body>")
puts("</html>")
