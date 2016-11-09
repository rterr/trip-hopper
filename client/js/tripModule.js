var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var TripDisplay = require('./tripDisplay');
var TripSaveLoad = require('./tripSaveLoad');


var TripModule = React.createClass({
  render: function(props){
    return (
    <div className="trip-module">
      <TripDisplay />
      <TripSaveLoad />
    </div>)
  }
});

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      searchResults: state.searchResults
    };
};

var Container = connect(mapStateToProps)(TripModule);

module.exports = Container;
