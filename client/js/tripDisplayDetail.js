var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var PropTypes = React.PropTypes;
var ItemTypes = require('./Constants').ItemTypes;
var DragSource = require('react-dnd').DragSource;


var poiSource = {
  beginDrag: function (props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
};

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

  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function(props){
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}>
        <div className="trip-poi poi-entry" onClick={this.selectPoi}>
          <div className="poi-img"><img src={this.props.poi.image_url} /></div>
          <div className="poi-reorder">{'\u25B2'}<br />{'\u25BC'}</div>
          <div className="poi-name"><a href={this.props.poi.url} target="_blank">{this.props.poi.name}</a> <img src={this.props.poi.rating_img_url} /></div>
          <div className="poi-location">{this.props.poi.location[0]}, {this.props.poi.location[1]}</div>
          <button onClick={this.deletePoi} >Delete</button>
        </div>
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

module.exports = DragSource(ItemTypes.POI, poiSource, collect)(Container);
