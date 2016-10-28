var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var TripTitle = React.createClass({

  renameTrip: function(event){

  },
  render: function(){
    return (
      <div>
        <h1>Trip Title</h1>
        <input onClick={this.renameTrip} type="button" name="rename" value="Rename Trip" />
      </div>)
  }
});

var mapStateToProps = function(state, props) {
    return {null:null
    };
};

var Container = connect(mapStateToProps)(TripTitle);

module.exports = Container;
