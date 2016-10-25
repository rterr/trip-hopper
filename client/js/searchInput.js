var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
//var actions = require('../actions');

var SearchInput = React.createClass({
  render: function(){
    <form>
    <input type="text" name="searchText" id="searchText" className="text" autoComplete="off" required ref="input" />
    <input type="submit" id="inputButton" className="button btn btn-primary" name="submit" value="Search"/>
  </form>
  }
});

var mapStateToProps = function(state, props) {
    return {
      null:null
    };
};


var Container = connect(mapStateToProps)(SearchInput);

module.exports = Container;
