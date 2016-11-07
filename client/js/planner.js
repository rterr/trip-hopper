var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var PlannerHeader = require('./plannerHeader');
var TripModule = require('./tripModule');

var Planner = React.createClass({

componentWillMount: function() {
  	this.props.dispatch(actions.fetchUser());
  },

render: function(props) {
    return (
      <div>
      <PlannerHeader />
        {this.props.children}
      </div>
    )
}
});

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      searchResults: state.searchResults
    };
};

var Container = connect(mapStateToProps)(Planner);
module.exports = Container;
