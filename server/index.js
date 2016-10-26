import 'babel-polyfill';
import express from 'express';
var mongoose = require('mongoose');
var Trip = require('./models/trips.js');
var jsonParser = require('body-parser');
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
mongoose.connect('mongodb://localhost/trips');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
import unirest from 'unirest';

var passport = require("passport");

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use = express();


app.get("/", function(req, res){
  res.send("Hello World");
})

app.get("/trips", function(req, res){
  Trip.find(function(err, users) {
        if (err) {
            return res.sendStatus(500);
        }
        res.send(users);

    });
});

app.post('/trips', jsonParser, function(req, res) {
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


// User model schema
var User = require('./models/user');

try {
  var config = require('../config');
} catch (e) {};

// Setup for DB connection
// var db = 'mongodb://localhost:27017/mtb-trails';
var db = process.env.DBPATH || config.mongoDB.dbPath;
mongoose.connect(db);

app.use(passport.initialize());
// app.use('/', express.static('build'));
app.use(bodyParser.json());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID || config.googleAuth.clientID,
  clientSecret: process.env.CLIENTSECRET || config.googleAuth.clientSecret,
  callbackURL: process.env.CALLBACKURL || config.googleAuth.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    User.find({googleID: profile.id}, function(err, user) {
      if (!user.length) {
        User.create({
          googleID: profile.id,
          accessToken: accessToken,
          favorites: [],
          fullName: profile.displayName
        }, function(err, users) {
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
    res.redirect('/#/trails');
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/user', passport.authenticate('bearer', {session: false}), function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.send("Error has occured")
    } else {
      res.json(users);
    }
  });
});

// Bearer Strategy
passport.use(new BearerStrategy(
  function(token, done) {
  User.find({ accessToken: token },
    function(err, users) {
      if(err) {
          return done(err)
      }
      if(!users) {
          return done(null, false)
      }
      return done(null, users, { scope: 'read' })
    }
  );
}
));

// PUT: Add to favorites (avoids duplicates)
app.put('/user/:googleID', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    User.update({ 'googleID':req.params.googleID }, 
                  { $addToSet : { 'favorites':req.body.favorites } },
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.send({message: "Favorite added!"});
      });
  });

// PUT: Remove from favorites
app.put('/user/favorites/:trail_id', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var trailID = parseInt(req.params.trail_id);
    var googleID = req.body.googleID;
    User.update( { 'favorites.trail_id':trailID, 'googleID':googleID }, 
                  { $pull : { 'favorites':{ 'trail_id':trailID } } },
                  { new: true },
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.send({message: "Favorite removed!"});
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
