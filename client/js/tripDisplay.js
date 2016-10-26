var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
//var actions = require('../actions');

var PoiEntry = function(props) {
    return (
        <div className="trip-poi">
            <div className="poi-name">{props.name}</div>
            <img className="poi-location" src={props.location} />
            <div className="poi-desc">
                {props.desc}
            </div>
        </div>
    );
};

var TripDisplay = React.createClass({

  render: function(){
    <div className="trip-display">
      <PoiEntry />
    </div>
  }
});

var mapStateToProps = function(state, props) {
    return {null:null
    };
};

var Container = connect(mapStateToProps)(TripDisplay);

module.exports = Container;
