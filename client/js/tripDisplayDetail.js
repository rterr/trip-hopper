var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var TripDisplayDetail = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  deletePoi: function(){
    console.log("deletePoi hit!");
    console.log("delete passed ", this.props.googleID, this.props.activeTrip, this.props.poi)
    this.props.dispatch(actions.removePoi(this.props.googleID, this.props.activeTrip, this.props.poi));
    this.props.dispatch(actions.fetchUser());
  },

  render: function(props){
    return (
      <div className="trip-poi">
      <div className="poi-img"><img src={this.props.poi.image_url} /></div>
        <div><span className="poi-name">{this.props.poi.name}</span> <span className="poi-rating">{this.props.poi.rating}</span></div>
      <div className="poi-location">{this.props.poi.location[0]}, {this.props.poi.location[1]}</div>
      <div className="poi-desc">{this.props.poi.categories[0][0]}, {this.props.poi.categories[1][0]}</div>
        <button onClick={this.deletePoi} >Delete</button>
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

var Container = connect(mapStateToProps)(TripDisplayDetail);

module.exports = Container;