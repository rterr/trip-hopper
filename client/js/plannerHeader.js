var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var Link = require('react-router').Link;

function PlannerHeader () {
  return (
      <div className="header">
        <Link to="/planner/triplist"><h1 id="title">Trip Hopper</h1></Link>
        <button id="logout" ><a href="/logout">Log Out</a></button>
        <div className="menu-bar">
          <Link to="/planner/triplist"><div>Trip List</div></Link>
          <Link to="/planner/viewtrip"><div>View Trip</div></Link>
          <Link to="/planner/addpoi"><div>Add POI</div></Link>
          <Link to="/planner/newtrip"><div>New Trip</div></Link>
        </div>
      </div>
  )

};

module.exports = PlannerHeader;
