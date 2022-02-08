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

session.delete



puts "<html>"
puts "<head>"
puts "<title>Ruby Session Destroyed</title>"
puts "</head>"
puts "<body>"
puts "<h1>Session Destroyed</h1>"
puts "<a href=\"/rb-cgiform.html\">Back to the Ruby CGI Form</a><br />"
puts "<a href=\"/cgi-bin/rb-sessions-1.rb\">Back to Page 1</a><br />"
puts "<a href=\"/cgi-bin/rb-sessions-2.rb\">Back to Page 2</a>"
puts "</body>"
puts "</html>"