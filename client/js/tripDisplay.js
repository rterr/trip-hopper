var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');


var TripDisplay = React.createClass({
  getInitialState: function(){
      return {
         dummyPoi: [
          {name: "Zoo", location: "CA", desc: "animals"},
          {name: "Bar", location: "TX", desc: "get drunk"},
          {name: "Restuarant", location: "NY", desc: "tasty food"}
         ]
      };
  },

  editPoi: function(event){

  },

  render: function(){
    return(
    <div className="trip-display">
      {this.state.dummyPoi.map((poi) =>
      {return <div className="trip-poi">
          <div className="poi-name">{poi.name}</div>
          <div className="poi-location">{poi.location}</div>
          <div className="poi-desc">
              {poi.desc}
          </div>
          <input type="button" name="edit" value="Edit" onClick={this.editPoi} />
      </div>})}
    </div>)
  }
});

var mapStateToProps = function(state, props) {
    return {null:null
    };
};

var Container = connect(mapStateToProps)(TripDisplay);

module.exports = Container;
