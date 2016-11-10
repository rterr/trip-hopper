var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;


var Landing = function(){

	return (
		<div id="landing">
			<h1>Trip Hopper</h1>
			<p>A trip planning app.</p>
			<a href="/auth/google"><input className="login" type="button" value="Register/Login" /></a>
		</div>
	)

};


module.exports = Landing;
