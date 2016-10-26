var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
//var actions = require('../actions');

var PoiResult = function(props) {
    return (
        <div className="search-poi">
            <div className="poi-name">{props.name}</div>
            <img className="poi-location" src={props.location} />
            <div className="poi-desc">
                {props.desc}
            </div>
        </div>
    );
};

var SearchResults = React.createClass({

  render: function(){
    <div className="search-results">
      <PoiResult />
    </div>
  }
});

var mapStateToProps = function(state, props) {
    return {null:null
    };
};

var Container = connect(mapStateToProps)(SearchResults);

module.exports = Container;
