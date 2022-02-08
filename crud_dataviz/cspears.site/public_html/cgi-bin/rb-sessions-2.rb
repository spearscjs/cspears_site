#!/usr/bin/ruby
puts("Content-type:text/html\r\n\r\n")
require 'cgi'
require 'cgi/session'
require 'cgi/session/pstore'     

# Create a new Perl Session
#$session = new CGI::Session("driver:File", undef, {Directory=>"/tmp"});
cgi = CGI.new("html5")

# https://docs.ruby-lang.org/en/2.0.0/CGI/Session.html
session = CGI::Session.new(cgi, 
    'database_manager' => CGI::Session::PStore,  # use PStore
    'session_key' => '_rb_sess_id',              # custom session key
    'session_expires' => Time.now + 30 * 60,     # 30 minute timeout
    'prefix' => 'pstore_sid_'
)                   
if cgi.has_key?('username') and cgi['username'] != ''
    # coerce to String: cgi[] returns the
    # string-like CGI::QueryExtension::Value
    session['username'] = cgi['username'].to_s
end
name = session['username']

session.close


puts "<html>"
puts "<head>"
puts "<title>Ruby Sessions</title>"
puts "</head>"
puts "<body>"

puts "<h1>Ruby Sessions Page 2</h1>"

if name 
    puts "<p><b>Name:</b> #{name}"
else 
    puts "<p><b>Name:</b>no name found"
end


puts "<br/><br/>"
puts "<a href=\"/cgi-bin/rb-sessions-2.rb\">Session Page 2</a><br/>"
puts "<a href=\"/rb-cgiform.html\">Ruby CGI Form</a><br />"
puts "<form style=\"margin-top:30px\" action=\"/cgi-bin/rb-destroy-session.rb\" method=\"get\">"
puts "<button type=\"submit\">Destroy Session</button>"
puts "</form>"

puts "</body>"
puts "</html>"