var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var TripListDetail = React.createClass({
  // componentDidMount: function() {
  //   this.props.dispatch(actions.fetchUser());
  // },

  loadTrip: function(){

  },

  render: function(props){
    //console.log('SEARCHPOI ', this.props);
    return (
      <div className="saved-trip">
          <div className="trip-name">{this.props.trip.tripName}</div>
          <input type="button" name="load" value="Load" onClick={this.loadTrip} />
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
