var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');

var TripDisplay = require('./tripDisplay');
var TripSaveLoad = require('./tripSaveLoad');


var TripModule = React.createClass({
  render: function(props){
    return (
    <div className="trip-module">
      <TripDisplay trip={this.props.trip} googleID={this.props.googleID} activeTrip={this.props.activeTrip} />
      <TripSaveLoad />
    </div>)
  }
});

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      trip: state.trips.find((trip) => {
        if(state.activeTrip == trip._id) {
          return trip
        }
      }),
      activeTrip: state.activeTrip
    };
};

var Container = connect(mapStateToProps)(TripModule);

// Wrap root component of app with DragDropContext to set up React DND
// DragDropContext wraps your component and returns another React component
// HTML5Backend is the backend and can be replaced with another backend
module.exports = DragDropContext(HTML5Backend)(Container);
