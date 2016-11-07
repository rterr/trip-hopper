var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var PropTypes = React.PropTypes;
var ItemTypes = require('./Constants').ItemTypes;
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;
var flow = require('lodash/flow');


// Implements the drag source contract
var poiSource = {
  beginDrag: function (props) {
    return { id: props.id };
  }
};

var poiTarget = {
  drop: function (props, monitor) {
    var draggedId = monitor.getItem().id;
    console.log('var draggedId: ', draggedId)
    console.log('poiTarget props: ', props)
    if (draggedId !== props.id) {
      console.log('NOT THE SAME POI');
      props.swapPois(draggedId, props.id);
    }
  }
};

var TripDisplayDetail = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    swapPois: PropTypes.func.isRequired
  },

  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  deletePoi: function(){
    this.props.dispatch(actions.removePoi(this.props.googleID, this.props.activeTrip, this.props.poi));
  },

  selectPoi: function(event){
    console.log("Selected " + this.props.poi.name);
  },

  render: function(){
    var id = this.props.id;
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;
    var connectDropTarget = this.props.connectDropTarget;
    
    return connectDragSource(connectDropTarget(
      <div style={ { opacity: isDragging ? 0.5 : 1, cursor: 'move' } }>
        <div className="trip-poi poi-entry" onClick={this.selectPoi}>
          <div className="poi-img"><img src={this.props.poi.image_url} /></div>
          <div className="poi-reorder">{'\u25B2'}<br />{'\u25BC'}</div>
          <div className="poi-name"><a href={this.props.poi.url} target="_blank">{this.props.poi.name}</a> <img src={this.props.poi.rating_img_url} /></div>
          <div className="poi-location">{this.props.poi.location[0]}, {this.props.poi.location[1]}</div>
          <button onClick={this.deletePoi} >Delete</button>
        </div>
      </div>
    ));
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


module.exports = flow(
  // Wrap the component with DragSource to make it draggable
  DragSource(
    ItemTypes.POI,
    poiSource,
    // Specifies the props to inject into your component
    function(connect, monitor) {
      return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
      };
    }
  ),
  // Wrap the component with DropTarget to make it react to the compatible items being dragged, hovered, or dropped on it.
  DropTarget(
    ItemTypes.POI,
    poiTarget,
    // Specifies the props to inject into your component
    function(connect) {
      return {
        connectDropTarget: connect.dropTarget()
      };
    }
  )
)(Container);


// var DragSourceDecorator = DragSource(ItemTypes.POI, poiSource,
//   function(connect, monitor) {
//     return {
//       connectDragSource: connect.dragSource(),
//       isDragging: monitor.isDragging()
//     };
// });

// var DropTargetDecorator = DropTarget(ItemTypes.POI, poiTarget,
//   function(connect) {
//     return {
//       connectDropTarget: connect.dropTarget()
//     };
// });

// module.exports = DropTargetDecorator(DragSourceDecorator(Container));


