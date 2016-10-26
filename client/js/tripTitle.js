var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
//var actions = require('../actions');

var TripTitle = React.createClass({
  render: function(){
      <div>
        <h1>Trip Title</h1>
        <input type="button" name="save" value="Rename Trip" />
      </div>
  }
});

var mapStateToProps = function(state, props) {
    return {null:null
    };
};

var Container = connect(mapStateToProps)(TripTitle);

module.exports = Container;
