var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var Link = require('react-router').Link;
import GoogleMap from './maps'

var NewTripDetail = React.createClass({
  // componentDidMount: function() {
  //   this.props.dispatch(actions.fetchUser());
  // },

  addPoi: function(){
    this.props.dispatch(actions.addPoi(this.props.activeTrip, this.props, this.props.googleID));
  },

  addTrip: function(){
    var tripName = prompt('Enter trip name');
    if (tripName == null) {
      return;
    };
    this.props.dispatch(actions.addTrip(tripName, this.props, this.props.googleID));
    // this.props.dispatch(actions.setActiveTrip(tripName));
  },

  render: function(props){
    //console.log('SEARCHPOI ', this.props);
    return (
      <div className="poi-entry">
        <div className="poi-img"><img src={this.props.poi.image_url} /></div>
        <div className="poi-name"><a href={this.props.poi.url} target="_blank">{this.props.poi.name}</a> <img src={this.props.poi.rating_img_url} /></div>
        <div className="poi-location">{this.props.poi.location.display_address[0]} {this.props.poi.location.display_address[1]}</div>
        <GoogleMap lat={this.props.poi.location.coordinate.latitude} lng={this.props.poi.location.coordinate.longitude}/>
        <Link to="/planner/viewtrip"><input type="button" onClick={this.addTrip} value="Start New Trip" /></Link>
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

var Container = connect(mapStateToProps)(NewTripDetail);

module.exports = Container;
