import 'babel-polyfill';
import express from 'express';
var mongoose = require('mongoose');
var jsonParser = require('body-parser');
var dotenv = require('dotenv');
var request = require('request');
var Yelp = require('yelp');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var passport = require("passport");
var config = require('../config')

dotenv.load();

var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret
});

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;




var db = process.env.DBPATH || config.mongoDB.dbPath;
mongoose.connect(db);
console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(passport.initialize());
app.use(jsonParser.json());
app.use(express.static(process.env.CLIENT_PATH));


app.get("/", function(req, res){
  res.send("Hello World");
})


//User model schema
var User = require('./models/users');

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
          trips: [],
          activeTrip: null
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
    res.redirect('/#/planner');
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
  User.findOne({googleID: googleID}, function(err, user) {
    if (err) {
      res.send("Error has occured")
    } else {
      res.json(user);
    }
  });
});


//Yelp request endpoint
app.get('/api/:term', function(req, res) {
  let term = req.params.term;
  let location = req.query.location;
  let cll = req.query.cll;
  let query = {term: term,
    sort: '1', limit: '3', radius_filter:'9000'
  };

  if (location) {
    query.location = location
  }
  if (cll) {
    query.cll = cll
  }
  yelp.search(query)
  .then(function (data) {
    return res.send(data)
   })
  .catch(function (err) {
    console.error(err);
  });
});

// PUT: Request to add trip
app.put('/user/:googleID/:tripName', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    User.findOneAndUpdate({ 'googleID':req.user.googleID },
                  {
                    $push: { 'trips':req.body },
                    $set: { 'activeTrip':req.body._id}
                  },
                  {new: true},
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.json(user);
      });
  });

// DELETE: remove entire trip from trips array
app.delete('/user/removeTrip/:googleID', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    User.findOneAndUpdate({ 'googleID':req.user.googleID },
                  {
                    $pull: { 'trips':{'_id':req.body._id} },
                    $set: {'activeTrip': null}
                  },
                  {new: true},
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.json(user);
      });
  });


// PUT: add pois to existing trips
app.put('/user/trips/:googleID/:_id', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var _id = req.params._id;
    var googleID = req.user.googleID;
    User.findOneAndUpdate( { 'googleID':googleID, 'trips._id':_id },
                  { $push : { 'trips.$.pois': req.body } },
                  { new: true },
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.json(user);
      });
  });

// DELETE: remove poi from existing trip
app.delete('/user/poi/removePoi/:googleID', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var _id = req.body._id;
    var googleID = req.user.googleID;
    var poiID = req.body.id
    User.findOneAndUpdate( { 'googleID':googleID, 'trips._id': _id },
                  { $pull : { 'trips.$.pois':{ 'id': poiID } } },
                  { new: true },
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.json(user);
      });
  });

// PUT: update activeTrip
app.put('/user/:_id', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    User.findOneAndUpdate({ 'googleID':req.user.googleID },
                  { $set: { 'activeTrip':req.params._id } },
                  {new: true},
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.json(user);
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
