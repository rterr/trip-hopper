var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var Link = require('react-router').Link;

var TripListDetail = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  loadTrip: function(){
    this.props.dispatch(actions.setActiveTrip(this.props.trip._id));
    this.props.changeView();
  },

  render: function(props){
    return (
      <div className="saved-trip">
          <div className="trip-name">{this.props.trip.tripName}</div>
          <Link to="/planner/viewtrip"><input type="button" className="save-load" name="load" value="Load" onClick={this.loadTrip} /></Link>
      </div>
    )
  }

});

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      activeTrip: state.activeTrip
    };
};

var Container = connect(mapStateToProps)(TripListDetail);

module.exports = Container;
