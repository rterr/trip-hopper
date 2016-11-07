var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var PlannerHeader = React.createClass({
  showMenu: function(){
    this.refs.menu.show();
  },

  render: function(props){
    return (
      <div className="planner-header">
      <h1>Trip Hopper</h1>
      <div className="yelp-credit">Powered by <a href="http://www.yelp.com"><img src="./assets/yelp-2c.png" /></a></div>
      <button><a href="/logout">Log Out</a></button>

      </div>
    )

  }
});

var mapStateToProps = function(state, props) {
  return {
    null:null
  };
};

var Container = connect(mapStateToProps)(PlannerHeader);

module.exports = Container;
