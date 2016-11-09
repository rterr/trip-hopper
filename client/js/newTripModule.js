var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var SearchInput = require('./searchInput');
var NewTripResults = require('./newTripResults');

var NewTripModule = React.createClass({
  componentDidMount: function(){
    this.props.dispatch(actions.fetchUser());
  },

  render: function(props){
    return (
    <div className="search-module">
    <h1>Start New Trip</h1>
      <SearchInput />
      <NewTripResults />
    </div> );
  }
});

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      searchResults: state.searchResults
    };
};


var Container = connect(mapStateToProps)(NewTripModule);

module.exports = Container;
