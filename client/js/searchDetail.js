var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var SearchDetail = React.createClass({
  // componentDidMount: function() {
  //   this.props.dispatch(actions.fetchUser());
  // },

  addPoi: function(){
    this.props.dispatch(actions.addPoi(this.props.activeTrip, this.props, this.props.googleID));
  },

  addTrip: function(){
    var tripName = prompt('Enter trip name');
    this.props.dispatch(actions.addTrip(tripName, this.props, this.props.googleID));
    this.props.dispatch(actions.setActiveTrip(tripName));
  },

  render: function(props){
    //console.log('SEARCHPOI ', this.props);
    return (
      <div className="poi-entry">
        <div className="poi-img"><img src={this.props.poi.image_url} /></div>
        <div><span className="poi-name">{this.props.poi.name}</span> <span className="poi-rating">{this.props.poi.rating}</span></div>
        <div className="poi-location">{this.props.poi.location.display_address[0]} {this.props.poi.location.display_address[1]}</div>
        <button onClick={this.addPoi} >Add To Existing Trip</button>
        <button onClick={this.addTrip} >Start New Trip</button>
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

var Container = connect(mapStateToProps)(SearchDetail);

module.exports = Container;
