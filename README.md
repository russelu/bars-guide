# bars-guide
Hi, this is a one-page guide of bars around Michigan Wahtenaw County.
You will find around 10-15 bars collected through Google Maps API and Foursquare API.
(if connection to Google Maps fails, results will be limited to 5)

To use:
Simply open index.html with your favourite browser.


Features:
1. Highlight marker
Hovering over markers will highlight them.

2. Select marker
Selected marker will bounce once.
Info window with Foursquare average rating for this bar will pop up.
Also there will be a link to the Foursquare homepage of this bar.

3. Filter by name
Typing in sidebar textarea lets you filter the bars by their names.

4. Select by name
You can also select any of the filtered (or original list of) bars by clicking its name in sidebar.

5. Asynchronized Google Maps requests for bar lists.
Instead of storing list of info of bars locally, this app will automatically grab the Google search results when you first open it.
But I still have a default_list of places stored locally, in case anything breaks.