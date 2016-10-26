var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
//var actions = require('../actions');

var SearchInput = require('./searchInput');
var SearchResults = require('./searchResults');

var SearchModule = React.createClass({
  render: function(){
    <div className="search-module">
      <SearchInput />
      <SearchResults />
    </div>
  }
});

var mapStateToProps = function(state, props) {
    return {
      null:null
    };
};


var Container = connect(mapStateToProps)(SearchModule);

module.exports = Container;
