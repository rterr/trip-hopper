import 'babel-polyfill';
import express from 'express';
var dotenv = require('dotenv');
var request = require('request');
var Yelp = require('yelp');

dotenv.load();
var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret,
});

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(express.static(process.env.CLIENT_PATH));

app.get('/api/:term/:location', function(req, res){
  let term = req.params.term;
  let location = req.params.location;
  yelp.search({ term: term,
   location: location,
   sort: '1', limit: '3', radius_filter:'2000'})
  .then(function (data) {
    // console.log(data)
    return res.send(data)
   })
  .catch(function (err) {
    console.error(err);
  });
});
  
function runServer() {
    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}

if (require.main === module) {
    runServer();
}
