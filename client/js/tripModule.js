var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var TripDisplay = require('./tripDisplay');
var TripSaveLoad = require('./tripSaveLoad');
var TripTitle = require('./tripTitle');

var TripModule = React.createClass({
  render: function(){
    return (
    <div className="trip-module">
      <TripTitle />
      <TripDisplay />
      <TripSaveLoad />
    </div>)
  }
});

var mapStateToProps = function(state, props) {
    return {
      null:null
    };
};

var Container = connect(mapStateToProps)(TripModule);

module.exports = Container;
