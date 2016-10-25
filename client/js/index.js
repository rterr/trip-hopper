import 'babel-polyfill';

var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

//var actions = require('./client/actions');
//var store = require('./client/store');
//var Provider = require('react-redux').Provider;

var SearchModule = require('./searchModule');
var TripModule = require('./tripModule');

var App = function() {
    return (
        <div className="outer-container">
          <SearchModule />
          <TripModule />
        </div>
    );
};

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      //<Provider store={store}>
      <App />
      //</Provider>
      , document.getElementById('app'));
});
