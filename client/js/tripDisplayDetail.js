var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
import GoogleMap from './maps'


var TripDisplayDetail = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  deletePoi: function(){
    this.props.dispatch(actions.removePoi(this.props.googleID, this.props.activeTrip, this.props.poi));
  },

  selectPoi: function(event){
    console.log("Selected " + this.props.poi.name);
  },

  render: function(props){

    return (
      <div className="trip-poi poi-entry" onClick={this.selectPoi}>
        <div className="poi-img"><img src={this.props.poi.image_url} /></div>
        {/*<div className="poi-reorder">{'\u25B2'}<br />{'\u25BC'}</div>*/}
        <div className="poi-name"><a href={this.props.poi.url} target="_blank">{this.props.poi.name}</a> <img src={this.props.poi.rating_img_url} /></div>
        <div className="poi-location">{this.props.poi.location[0]}, {this.props.poi.location[1]}</div>
        <GoogleMap lat={this.props.poi.coordinate.latitude} lng={this.props.poi.coordinate.longitude}/>
        <input type="button" onClick={this.deletePoi} className="delete-poi" value="Delete" />
      </div>
    );
  }
});

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      activeTrip: state.activeTrip
    };
};

var Container = connect(mapStateToProps)(TripDisplayDetail);

module.exports = Container;
