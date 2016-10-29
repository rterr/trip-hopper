var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;


var Landing = function(){

	return (
		<div id="landing">
			<div id="landing-header"><h1>Trip Hopper!</h1></div>
			<span>A trip planning app.</span>
			<button className='button btn btn-primary'><a href="/auth/google">Register/Login</a></button>
		</div>

		)

};


module.exports = Landing;
