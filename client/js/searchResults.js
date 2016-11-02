var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var SearchDetail = require('./searchDetail');

var SearchResults = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  render: function(props){
    var searchResultsDetail = this.props.searchResults.map((poi) => {
      return <SearchDetail key={poi.id} poi={poi} />
    });
    return (
      <div>
        {searchResultsDetail}
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

var Container = connect(mapStateToProps)(SearchResults);

module.exports = Container;
