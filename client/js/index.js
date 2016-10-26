// import 'babel-polyfill';
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'j_md1n-30a1fG1OBGOl_YQ',
  consumer_secret: 'RXg9CLH7C9WBYBo_WjBYVIwDjNA',
  token: 'LnTjb6RhUPIrrYcWt0VfkyABEb5MJ4I1',
  token_secret: 'egwIGFCOmR1wyOnU6Ga0stCG3Y0',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'cocktails',
 location: '1113 S Charles St, Baltimore, MD 21230',
 sort: '1', limit: '3', radius_filter:'2000'})
.then(function (data) {
  console.log(data.businesses[0].id);
//   console.log(data.businesses[0].location.display_address.join(','));
//   console.log(data.businesses[1].name);
//   console.log(data.businesses[1].location.display_address.join(','));
//   console.log(data.businesses[2].name);
//   console.log(data.businesses[2].location.display_address.join(','));
 })
.catch(function (err) {
  console.error(err);
});
console.log(`Client running in ${process.env.NODE_ENV} mode`);
