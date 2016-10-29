var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
import {bindActionCreators} from 'redux';

var SearchResults = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  addPoi: function(key){
    console.log(key);
    this.props.dispatch(actions.addPoi(key));
  },

  addTrip: function(key){
    var tripName = prompt('Enter trip name');
    console.log('KEY', key, 'THIS.PROPS', this.props, 'TRIPNAME', tripName);
    this.props.dispatch(actions.addTrip(key));
  },

  showResults: function() {
    return this.props.searchResults.map( (poi) => {
      return ( <div className="search-poi" key={poi.id}>
        <div className="poi-name">{poi.name}</div>
        <div className="poi-location">{poi.location.display_address}</div>
        <div className="poi-desc">{poi.rating}</div>
        <input type="button" name="add" value="Add To Existing Trip" onClick={this.addPoi} />
        <input type="button" name="add" value="Start New Trip" onClick={this.addTrip} />
      </div>
      )
    })
  },

  render: function(props){
    console.log(this.props);
    return (
      <div>
        {
          this.props.searchResults && <div className="search-results">
          {this.showResults()}
          </div>
        }
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


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({SearchResults: searchResults}, dispatch)
//   }


var Container = connect(mapStateToProps)(SearchResults);

module.exports = Container;
