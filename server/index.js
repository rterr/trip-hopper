import 'babel-polyfill';
import express from 'express';
var mongoose = require('mongoose');
var Trip = require('./models/trips.js');
var jsonParser = require('body-parser');
var dotenv = require('dotenv');
var request = require('request');
var Yelp = require('yelp');
import unirest from 'unirest';
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var passport = require("passport");

dotenv.load();
var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret,
});

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;




mongoose.connect('mongodb://localhost/trips');
console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(passport.initialize());
app.use(jsonParser.json());
app.use(express.static(process.env.CLIENT_PATH));


app.get("/", function(req, res){
  res.send("Hello World");
})



//User model schema
var User = require('./models/user');

try {
  var config = require('../config');
} catch (e) {};

// // Setup for DB connection
// var db = 'mongodb://localhost:27017/trips';
// //var db = process.env.DBPATH || config.mongoDB.dbPath;
// //mongoose.connect(db);
//


// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID || config.googleAuth.clientID,
  clientSecret: process.env.CLIENTSECRET || config.googleAuth.clientSecret,
  callbackURL: process.env.CALLBACKURL || config.googleAuth.callbackURL,
  },

function(accessToken, refreshToken, profile, done) {
    User.findOne({googleID: profile.id}, function(err, user) {
      if (!user) {
        User.create({
          googleID: profile.id,
          accessToken: accessToken,
          trips: []
        }, function(err, user) {
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
}));

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  function(req, res) {
    res.cookie('accessToken', req.user.accessToken, {expires: 0});
    //res.redirect('/#/trails');
  }
);
//Is this all that we need?
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


// Bearer Strategy
passport.use(new BearerStrategy(
  function(token, done) {
  User.findOne({ accessToken: token },
    function(err, user) {
      if(err) {
          return done(err)
      }
      if(!user) {
          return done(null, false)
      }
      return done(null, user, { scope: 'read' })
    }
  );
}
));
//confirm user authentication/creation
app.get('/user', passport.authenticate('bearer', {session: false}), function(req, res) {
  var googleID = req.user.googleID;
  User.find({googleID: googleID}, function(err, user) {
    if (err) {
      res.send("Error has occured")
    } else {
      res.json(user);
    }
  });
});

//Yelp request endpoint
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



// PUT: Add to trips (avoids duplicates)
app.put('/user/:googleID', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    User.update({ 'googleID':req.params.googleID },
                  { $push: { 'trips':req.body } },
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.send({message: "Trip added!"});
      });
  });

// PUT: Remove from trips
app.put('/user/trips/:userId/:tripName', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var tripName = parseInt(req.params.tripName);
    var googleID = req.body.googleID;
    User.update( { 'trips.tripName':tripName, 'googleID':googleID },
                  { $push : { 'pois':{ 'poi':req.body.poi } } },
                  { new: true },
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.send({message: "Trip removed!"});
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
