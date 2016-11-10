var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var SearchInput = React.createClass({
  getInitialState: function(event){
    return ({
      optionSelected: '__'
    })
  },

  optionChange: function(event){

  },

  submitSearch: function(event){
    event.preventDefault();
    var searchText = this.refs.inputText.value;
    var searchLocation = this.refs.inputLocation.value;
    this.props.dispatch(actions.poiSearch(searchText, searchLocation));
  },

  render: function(props){
    return (
      <div>
        <form onSubmit={this.submitSearch}>
          <input type="text" placeholder="Search for..." name="searchText" id="searchText" className="text input-text" autoComplete="off" required ref="inputText" />
          <input type="text" placeholder="In location..." name="searchLocation" id="searchLocation" className="text input-text" autoComplete="off" required ref="inputLocation" />
          <input type="submit" className="search-button" name="submit" value="Search"/>
        </form>
      {/*<div>
       <select onChange={this.optionChange} value={this.state.optionSelected}>
          <option value="__">Choose an option...</option>
          <option value="restaurants">Restaurants</option>
          <option value="cafes">Cafes</option>
          <option value="hotels">Hotels</option>
          <option value="entertainment">entertainment</option>
        </select> in Location...
      </div>*/}
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


var Container = connect(mapStateToProps)(SearchInput);

module.exports = Container;
