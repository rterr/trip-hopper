var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');


var TripDisplay = React.createClass({
  getInitialState: function(){
      return {
         dummyPoi: [
          {name: "Zoo", location: "CA", desc: "animals"},
          {name: "Bar", location: "TX", desc: "get drunk"},
          {name: "Restuarant", location: "NY", desc: "tasty food"}
         ]
      };
  },

  editPoi: function(event){

  },

  render: function(props){
    if (!this.props.trips[0]) {
      return (
        <div>
          <p>Enter a trip</p>
        </div>
      )
    }
    return(
    <div className="trip-display">
      {this.props.trips[0].pois.map((poidata) =>
      {return <div key={poidata.id} className="trip-poi">
          <div className="poi-name">{poidata.name}</div>
          <div className="poi-location">{poidata.location.display_address}</div>
          <div className="poi-desc">
              {poidata.rating}
          </div>
          <input type="button" name="edit" value="Edit" onClick={this.editPoi} />
      </div>})}
    </div>)
  }
});

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      searchResults: state.searchResults
    };
};

var Container = connect(mapStateToProps)(TripDisplay);

module.exports = Container;
