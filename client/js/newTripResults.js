var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var NewTripDetail = require('./newTripDetail');

var newTripResults = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  render: function(props){
    var newTripResultsDetail = this.props.searchResults.map((poi) => {
      return <NewTripDetail key={poi.id} poi={poi} />
    });
    return (
      <div>
        {newTripResultsDetail}
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

var Container = connect(mapStateToProps)(newTripResults);

module.exports = Container;
