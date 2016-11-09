var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;


var Landing = function(){

	return (
		<div id="landing">
			<h1>Trip Hopper</h1>
			<p>A trip planning app.</p>
			<button className='button btn btn-primary'><a href="/auth/google">Register/Login</a></button>
		</div>
	)

};


module.exports = Landing;
