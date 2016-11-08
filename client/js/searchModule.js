var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var SearchInput = require('./searchInput');
var SearchResults = require('./searchResults');

var SearchModule = React.createClass({
  componentDidMount: function(){
    this.props.dispatch(actions.fetchUser());
  },

  render: function(props){
    return (
    <div className="search-module">
    <h1>Add POI</h1>
      <SearchInput />
      <SearchResults />
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


var Container = connect(mapStateToProps)(SearchModule);

module.exports = Container;
