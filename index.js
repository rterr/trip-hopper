import * as server from './server/index';
import * as client from './client/index';
var express = require('express');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var Trip = require('./models/Trip');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/trips/', function(request, response) {
	response.json(storage.items);
});



export {
    server,
    client
};
