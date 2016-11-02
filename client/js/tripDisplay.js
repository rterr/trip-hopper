var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var TripDisplayDetail = require('./tripDisplayDetail');


var TripDisplay = React.createClass({
  deleteTrip: function(){
      console.log("deleteTrip hit!");
    this.props.dispatch(actions.removeTrip(this.props.googleID, this.props.activeTrip));
    this.props.dispatch(actions.fetchUser());
  },

  render: function(props){
        if (!this.props.trips[0]) {
        return (
          <div>
            <p>Enter a trip</p>
          </div>
        )
      }


    var tripPoiList = this.props.trips[0].pois.map((poidata) => {
      return (<TripDisplayDetail key={poidata.id} poi={poidata} />)
    });

    return (
      <div>
        <div>
          <h1>{this.props.trips[0].tripName}</h1>
          <input onClick={this.deleteTrip} type="button" name="rename" value="Delete Trip" />
        </div>
        {tripPoiList}
      </div>
    )

  }
});

var mapStateToProps = function(state, props) {
    return {
      googleID: state.googleID,
      trips: state.trips,
      searchResults: state.searchResults,
      activeTrip: state.activeTrip
    };
};

var Container = connect(mapStateToProps)(TripDisplay);

module.exports = Container;
