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
var config = require('../config')

dotenv.load();

var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret,
});

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;




mongoose.connect(config.mongoDB.dbPath);
console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(passport.initialize());
app.use(jsonParser.json());
app.use(express.static(process.env.CLIENT_PATH));


app.get("/", function(req, res){
  res.send("Hello World");
})

<<<<<<< HEAD
<<<<<<< HEAD
app.get("/trip-hopper", function(req, res){
 User.find(function(err, user) {
=======
app.get("/trips", function(req, res){
  Trip.find(function(err, user) {
>>>>>>> 061cfc2c93665348e702704a54ab283fdac84355
        if (err) {
            return res.sendStatus(500);
        }
        res.send(user);

    });
});

app.post('/trip-hopper', jsonParser, function(req, res) {
    if (!req.body.username){
        return res.status(422).json({message: 'Missing field: tripname'})
    }
     if (typeof req.body.username !== 'string'){
        return res.status(422).json({message: 'Incorrect field type: tripname'})
    }
    User.create({
        name: req.body.name
    }, function(err, user) {
        if (err) {
            return res.sendStatus(500);
        }
        res.status(201).location('/trips/'+trip._id).json({});
    });
});

=======
// app.get("/trip-hopper", function(req, res){
//  User.find(function(err, user) {
//         if (err) {
//             return res.sendStatus(500);
//         }
//         res.send(user);
//
//     });
// });
//
// app.post('/trip-hopper', jsonParser, function(req, res) {
//     if (!req.body.username){
//         return res.status(422).json({message: 'Missing field: tripname'})
//     }
//      if (typeof req.body.username !== 'string'){
//         return res.status(422).json({message: 'Incorrect field type: tripname'})
//     }
//     User.create({
//         name: req.body.name
//     }, function(err, user) {
//         if (err) {
//             return res.sendStatus(500);
//         }
//         res.status(201).location('/trips/'+trip._id).json({});
//     });
// });
>>>>>>> 46b6b75b949a8463455afac93f35bfa2ae367608

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
<<<<<<< HEAD
<<<<<<< HEAD
          favorites: [],
          fullName: profile.displayName
=======
          trips: []
>>>>>>> 061cfc2c93665348e702704a54ab283fdac84355
=======
          trips: []
>>>>>>> 46b6b75b949a8463455afac93f35bfa2ae367608
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
    console.log(req.user.accessToken)
    res.cookie('accessToken', req.user.accessToken, {expires: 0});
    res.redirect('/');
  }
);
//Is this all that we need?
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

<<<<<<< HEAD
<<<<<<< HEAD
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

=======
>>>>>>> 061cfc2c93665348e702704a54ab283fdac84355
=======

>>>>>>> 46b6b75b949a8463455afac93f35bfa2ae367608
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

<<<<<<< HEAD
<<<<<<< HEAD
// PUT: Add to favorites (avoids duplicates)
// app.put('/user/:googleID', passport.authenticate('bearer', {session: false}),
//   function(req, res) {
//     User.update({ 'googleID':req.params.googleID },
//                   { $addToSet : { 'favorites':req.body.favorites } },
//       function(err, user) {
//         if(err) {
//           return res.send(err)
//         }
//         return res.send({message: "Favorite added!"});
//       });
//   });
//  'favorites.trail_id':trailID, 'googleID':googleID },
//                   { $pull : { 'favorites':{ 'trail_id':trailID } } },
//                   { new: true },
//       function(err,//
// // PUT: Remove from favorites
// app.put('/user/favorites/:trail_id', passport.authenticate('bearer', {session: false}),
//   function(req, res) {
//     var trailID = parseInt(req.params.trail_id);
//     var googleID = req.body.googleID;
//     User.update( { user) {
//         if(err) {
//           return res.send(err)
//         }
//         return res.send({message: "Favorite removed!"});
//       });
//   });
//
//
//

=======
//Yelp request endpoint
>>>>>>> 061cfc2c93665348e702704a54ab283fdac84355
=======
//Yelp request endpoint
>>>>>>> 46b6b75b949a8463455afac93f35bfa2ae367608
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
    User.findOneAndUpdate({ 'googleID':req.user.googleID },
                  { $push: { 'trips':req.body } },
                  {new: true},
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.json(user);
      });
  });

// PUT: Remove from trips
app.put('/user/trips/:googleID/:tripName', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var tripName = req.params.tripName;
    var googleID = req.user.googleID;
    User.findOneAndUpdate( { 'googleID':googleID, 'trips.tripName':tripName },
                  { $push : { 'trips.$.pois': req.body } },
                  { new: true },
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
