var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');

var SearchResults = React.createClass({
  getInitialState: function(){
      return ({
         dummySearch: [
          {name: "Place1", location: "CA", desc: "eat"},
          {name: "Place2", location: "CA", desc: "sleep"},
          {name: "Place3", location: "CA", desc: "cool things"}
         ]
      });
  },

  addPoi: function(event){
    this.props.dispatch(actions.addPoi());
  },

  render: function(){
    return (
    <div className="search-results">
    {this.state.dummySearch.map((poi) =>
    {return <div className="search-poi">
        <div className="poi-name">{poi.name}</div>
        <div className="poi-location">{poi.location}</div>
        <div className="poi-desc">
            {poi.desc}
        </div>
        <input type="button" name="add" value="Add" onClick={this.addPoi} />
    </div>})}
    </div>)
  }
});

var mapStateToProps = function(state, props) {
    return {null:null
    };
};

var Container = connect(mapStateToProps)(SearchResults);

module.exports = Container;
