var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
//var actions = require('../actions');

var tripDisplay = require('./tripDisplay');
var tripSaveLoad = require('./tripSaveLoad');
var tripTitle = require('./tripTitle');

var TripModule = React.createClass({
  render: function(){
    <div className="trip-module">
      <tripTitle />
      <tripDisplay />
      <tripSaveLoad />
    </div>
  }
});

var mapStateToProps = function(state, props) {
    return {
      null:null
    };
};

var Container = connect(mapStateToProps)(TripModule);

module.exports = Container;
