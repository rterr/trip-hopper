var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleID: {
    type: String,
    index: true
  },
  accessToken: {
    type: String,
    required: true
  },
	trips: {
    type: Array,
    default: []
  },
  activeTrip: {
    type: String
  }
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
