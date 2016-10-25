var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new mongoose.Schema({
    name: String,
    beginning_location: String,
    second_location: String,
    third_location: String,
    fourth_location: String,
    fifth_location: String,
    sixth_location: String,
  });

  var Trip  = mongoose.model('Trip', TripSchema);

  module.exports = Trip;
