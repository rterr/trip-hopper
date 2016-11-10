var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var TripDisplayDetail = require('./tripDisplayDetail');
var Link = require('react-router').Link;


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
        <div className="trip-display-header">
          <h1>{this.props.trip.tripName}</h1>
          <Link to="/planner/triplist"><input className="delete-trip" onClick={this.deleteTrip} type="button" name="rename" value="Delete Trip" /></Link>
        </div>
        <div className="trip-module">
          {tripPoiList}
        </div>
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

module.exports = Container;
