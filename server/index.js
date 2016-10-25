import 'babel-polyfill';
import express from 'express';
var mongoose = require('mongoose');
var Trip = require('./models/trips.js');
var jsonParser = require('body-parser');
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
mongoose.connect('mongodb://localhost/trips');
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
