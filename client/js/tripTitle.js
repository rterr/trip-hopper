var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var TripTitle = React.createClass({
  deleteTrip: function(){
      console.log("deleteTrip hit!");
    this.props.dispatch(actions.removeTrip(this.props.googleID, this.props.activeTrip));
    this.props.dispatch(actions.fetchUser());
  },

  render: function(props){
      return (
        <div>
          <h1>{this.props.trips[0].tripName}</h1>
          <input onClick={this.deleteTrip} type="button" name="rename" value="Delete Trip" />
        </div>)


    }
  });

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      activeTrip: state.activeTrip
    };
};

var Container = connect(mapStateToProps)(TripTitle);

module.exports = Container;
