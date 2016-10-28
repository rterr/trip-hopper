var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var TripTitle = React.createClass({
  getInitialState: function(){
      return ({
         renameOn: false
      });
  },

  renameToggle: function(event){
    this.setState({
      renameOn:true
    })
  },

  renameTrip: function(event){
    event.preventDefault();
    this.setState({
      renameOn: false
    })
  },

  render: function(){

    if (this.state.renameOn == false){
      return (
        <div>
          <h1>Trip Title</h1>
          <input onClick={this.renameToggle} type="button" name="rename" value="Rename Trip" />
        </div>)}

    else {
      return (<div>
        <form onSubmit={this.renameTrip}>
          <input type="text" placeholder="Type new title..." name="renameTitle" id="renameTitle" className="rename-input" autoComplete="off" required ref="renameTitle" />
          <input type="submit" id="renameButton" className="button btn btn-primary" name="submit" value="Submit"/>
        </form>
      </div>)
    }
  }
});

var mapStateToProps = function(state, props) {
    return {null:null
    };
};

var Container = connect(mapStateToProps)(TripTitle);

module.exports = Container;
