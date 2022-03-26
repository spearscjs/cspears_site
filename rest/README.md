

HTTP REQUESTS *****************************************************

All urls correspond to metricName except for cspears.site/api/browsers so for instance neworkInformation is under 
cspears.site/networkInformation

Errors cannot be PUT or POSTED to.


GET ******************************************
Any GET with a body is not allowed.

For any initialBrowserData post, the data section must be in JSON format or a GET will return this.
{
        "BADFORMAT": "{\"id\": 89,asdasdas\""
}
Any other data section does not have this behavior though as they were inconsistent in format for me.



POST *****************************************
You can send posts to cspears.site/api if you include a metricName. 
It will send to the database corresponding to the metricName key.
Or can send it to cspears.site/api/[metricName] (except for browsers)


PUT ******************************************

data key ---------------------------

This function will attempt to JSON.parse the data key. So if you enter data in a json format and want it to enter correctly, it must be 
	{"key1":1, "key2":"val2"}
This is example of int and string being entered.

You can also just enter any input like 123123 not in json format and it will enter it in. This was done because some of the data sections are not JSON. 
If no valid keys are entered, nothing happens and it will error out, posting the error to the /api/error database.


vitalScore --------------------------

Simply add vitalScore to key and the value you want


Note: data and vitalScore are the only things I allow a PUT on, none of other sections made sense to me to allow chage via PUT.
