var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var SearchModule = require('./searchModule');
var TripModule = require('./tripModule');

var Planner = React.createClass({

componentDidMount: function() {
  	this.props.dispatch(actions.fetchUser());
  },

render: function() {
    return (
        <div>
          <SearchModule />
          <TripModule />
        </div>
    )
}
});

var mapStateToProps = function(state, props) {
    return {
        null:null
    };
};

var Container = connect(mapStateToProps)(Planner);
module.exports = Container;
