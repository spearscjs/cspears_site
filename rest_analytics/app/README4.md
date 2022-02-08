SITE___________________________________________________________________________________________________________________________________________________________________________________________________________________
reporting.cspears.site


USERS _________________________________________________________________________________________________________________________________________________________________________________________________________________

admin	ADMIN_MercY
grader	H@ve_MercY





AUTHENTICATION ________________________________________________________________________________________________________________________________________________________________________________________________________

At first was going to try to use apache2 redirects and authenticate with basic authentication. But then realized there is no good way to log out and it is not designed for this. 

I wanted to use session authentication opposed to cookies because sessions are destroyed upon closing the app. This is more secure considering we are allowing direct access to an important database of users.

The website is simple, and the permissions are simple so it seemed trivial to make the authentication system by hand using cgi and php. I am managing the database by hand for users so it seemed using a third
party library would cause unecessary bloat on my server. If it was a more complex system I would have likely went with a library like auth0 or something else possibly which is certainly a more robust system with 
more features (that I don't have to waste my time implementing). However, when I look at the website many of these features are just unneccesary for the purpose of this assignment. All I wanted was a basic and 
simple authentication system, so doing so via sessions seemed like a good option. 

Although the language isn't very important for this purpose, I chose PHP because it has session handling built into the language that is easy to use and can access mysql databases easily. Given the time constraints, 
this seemed like a good option. I did all authentication on server side and use cookies to track the session ID. This allows a lot of flexibility in terms of what I decide to add to each session and it is a very 
straightforward and easy way to approach the problem. I just simply add the level of authentication to the SESSION cookie and use that information to determine access control via a script. I made a seperate script 
for admin users and basic users which can just be added to the top of each page to control access to it. Admins are allowed into the basic pages but basic users cannot access admin pages. 



TABLES ______________________________

CREATE TABLE users(
    id TINYINT NOT NULL AUTO_INCREMENT KEY,		-- not planning on having many users for this database so used TINYINT
    username VARCHAR(32) UNIQUE,		
    email VARCHAR(320) UNIQUE,				-- 320 is the max characters for email according to IETF
    password VARCHAR(255),				-- 255 is what php recommended for their hashing algorithm in case it is updated even though it is currently set at a constant 60 characters
    admin TINYINT(1)					-- TINYINT(1) == boolean in mysql
);





DASHBOARD ______________________________________________________________________________________________________________________________________________________________________________________________________________ 

Some of this information is in reporting.cspears.site as well

We wanted to get more metrics on mobile users, and see who our mobile users were and how they were experiencing the site. 

We renedered the charts on the client side so we have better user interaction and we parsed the majority of data on the server so we can have the data ready to be put in the chart on the client. We wanted to get some
good aspects of both the client and server but not get too crazy given the time constraints.

So we made a pie chart first to see how many of our users are on mobile devices. Turns out a lot are. We chose this as a pie chart because it is a simple question and a simple pie chart seemed to be able
to show this most effectively. We just wanted to know the ratio of mobile vs non-mobile users. So we were trying to categorize our users and show proportions in a simple way. Therefore a pie chart seems like the best
option.

We also wanted to get an understanding of what users were experiencing on mobile. 

For chart we chose to use a bar chart because we are comparing what browsers are used between different groups. A bar chart allows us to do this categorization in a very easy to digest way that is much more 
organized given the context. There are too many categories for something like a pie chart. And a line chart did not seem appropriate either as theirs no continuous measurement or measurement of time.  

We included first paint and first interaction, as well as network speed to account for some outliers and give at least somewhat of a good reference for the performance of device (as many of out metrics were inconsistent and broken).
For the table, we wanted to see averages as well as outliers because we felt this was most relevant to our performance data. A table allows easy interaction to find outliers in multiple different things very quickly (by simply sorting) 
and also allows the display of averages at the bottom. There was a lot of information given on different aspects for each ID / Mobile User so a table. We have qualatiative data that we want averaged over several metrics. We needed 
precision and to see several metrics of the same user. 



REPORT __________________________________________________________________________________________________________________________________________________________________________________________________________________ 

So for the report we decided to use the same visualizations as from the dashboard because we wanted to see what mobile experiences were on the site from the start so all of the data seemed relevant.
We did use a few metrics but we hope that they are being used in a way where it all ties to our question in a reasonable way as we came up with all these metrics with the question in mind so we didn't want to not include 
one of them. 
The reasoning is also explained above and on the webpage.

So we wanted a central question that we could tie multiple things into understanding. Which came to be how mobile users are experiencing the website. We outlined the design decisions for each chart above.
We learned in class how important it can be to make a seperate mobile site and how bad a desktop site can be for mobile users so we wanted to better understand our mobile market. 

We felt it would be a good idea if we are trying to get an understanding of the mobile user's experience, if we knew how many / what % of our users are on mobile. This way we know how many users are experiencing the website
on mobile and how much of our user base is affected by the mobile site. Turns out it was a lot. 

Another thing in understanding how users experience the website on mobile seemed to naturally be: what browsers are most popular? And since IOS and Android handle their browsers differently we wanted to seperate the two 
from each other. The bar chart seemed like the best way to visualize this information in a meaningful way (as outlined above). Getting information on the browsers and device they are using allows us to ensure our site
is able to be compatible with those browsers on those devices. 

So from there we wanted to see what a real interaction of the user looked like. So we wanted to see the time to first paint and the first input delay. We also included network speed to see if it affected any outliers, we wanted 
some level of device performance as well but given time and the broken collector script we weren't able to. This was meant to be more of an interactive chart that you have to spend a bit more time looking at to understand than 
another dataviz chart. We wanted precision in our metrics and the ability to sort the data as well as include an average. All of these abilities give us more insight into the user's experience and allows us to get a sense of 
averages with many different precise metrics at once. The table allowed us to do this in a clean way.

