#!/usr/bin/ruby
require 'json'

puts "Content-type: application/json\n\n"

time = Time.now
address = ENV["REMOTE_ADDR"]

contents = {
    'title' => "Hello, Ruby!",
    'heading' => "Hello, Ruby!",
    'message' => "This page was created with the Ruby programming language",
    'time' => "#{time}",
    'IP' => "#{address}"
}

obj = JSON.generate(contents)

puts obj