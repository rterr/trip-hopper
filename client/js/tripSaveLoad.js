var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
//var actions = require('../actions');

var TripSaveLoad = React.createClass({
  render: function(){
    <div>
      <input type="button" name="save" value="Save Trip" />   <input type="button" name="load" value="View Saved Trips/Load" />
    </div>
  }
});

var mapStateToProps = function(state, props) {
    return {null:null
    };
};

var Container = connect(mapStateToProps)(TripSaveLoad);

module.exports = Container;
