#Description
Trip Hopper is an app that allows the user to plan a trip by locating nearby
points of interest based on an initial starting point.

#Link
https://trip-hopper.herokuapp.com/

#Tech
Trip Hopper uses:
  -React, Redux and React-Router on the frontend
  -Node, Express and Passport on the backend
  -MongoDB and Mongoose for persistence
  -Sass and Bourbon NEAT for styling
  -Yelp, Google maps and Google OAuth API's were consumed


#Instructions and Features
###Initial Login
Initial login is handled using OAuth 2.0 from Google
  -Simply login using your google credentials or create a new account
###Start New Trip
Once your account is accessed, you may start by clicking on `New Trip`
  -Enter a search term in the field that says `Search for...`
  -Enter a location for that search in the field that says `In location...`
  -Choose a starting point from the returned items, and when prompted,
   add a name to your trip
###Add Hop
To add another stop to your trip, click the `Add Hop` button
  -Enter a search term just like above, and click `Add To Existing Trip`
  -The location will be based off of the last stop on your currently loaded trip
  -Individual stops or entire trips can be deleted at any time
###View Saved Trips
At any time you can view a list of your saved trips by clicking `Trip List`
