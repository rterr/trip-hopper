var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var TripDisplayDetail = require('./tripDisplayDetail');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');


var TripDisplay = React.createClass({
  componentWillMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  deleteTrip: function(){
    this.props.dispatch(actions.removeTrip(this.props.googleID, this.props.activeTrip));
  },

  render: function(props){
    if (this.props.activeTrip == null) {
      return (
        <div>
          <p>Enter a trip</p>
        </div>
      )
    }

    var tripPoiList = this.props.trip.pois.map((poidata) => {
      return (<TripDisplayDetail key={poidata.id} poi={poidata} />)
    });

    return (
      <div>
        <div>
          <h1>{this.props.trip.tripName}</h1>
          <input onClick={this.deleteTrip} type="button" name="rename" value="Delete Trip" />
        </div>
        {tripPoiList}
      </div>
    )

  }
});

var mapStateToProps = function(state, props) {
  return {
    googleID: state.googleID,
    trip: state.trips.find((trip) => {
      if(state.activeTrip == trip._id) {
        return trip
      }
    }),
    searchResults: state.searchResults,
    activeTrip: state.activeTrip
  };
};

var Container = connect(mapStateToProps)(TripDisplay);

module.exports = DragDropContext(HTML5Backend)(Container);
