#!/usr/bin/ruby
puts "Cache-Control: no-cache\n"
puts "Content-type: text/html\n\n"

puts "<!DOCTYPE html>"
puts "<html>"
puts "<head>"
puts "<title>Hello, Ruby!</title>"
puts "</head>"
puts "<body>"

puts "<h1>Curtis was here - Hello, Ruby!</h1>"
puts "<p>This page was generated with the Ruby programming langauge</p>"

time = Time.now
puts "<p>Current Time: #{time}</p>"

address = ENV["REMOTE_ADDR"]
puts "<p>Your IP Address: #{address}</p>"

puts "</body>"
puts "</html>"