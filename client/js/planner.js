var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var SearchModule = require('./searchModule');
var TripModule = require('./tripModule');

var Planner = React.createClass({

componentWillMount: function() {
  	this.props.dispatch(actions.fetchUser());
  },

render: function(props) {
  return (
    <div>
      <div className="header">
        <h1 id="title">TRIP HOPPER</h1> 
        <button id="logout" ><a href="/logout">Log Out</a></button>
        <div className="yelp-credit footer"> 
          <p id="powered-by">POWERED BY</p>
          <a href="http://www.yelp.com" ><img src="./assets/yelp-2c.png" /></a>
        </div>
      </div>
      
      <div>
        <SearchModule />
        <TripModule />
      </div>  
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
