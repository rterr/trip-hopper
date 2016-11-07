var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var TripDisplayDetail = require('./tripDisplayDetail');
var update = require('react/lib/update');


var TripDisplay = React.createClass({
  componentWillMount: function() {
    this.props.dispatch(actions.fetchUser());
  },

  deleteTrip: function(props){
    this.props.dispatch(actions.removeTrip(this.props.googleID, this.props.activeTrip));
  },

  comparePois: function(poi1, poi2) {
    console.log('comparePois hit!!!');
    console.log('(comparePois) poi1 parameter: ', poi1);
    console.log('(comparePois) poi2 parameter: ', poi2);
    return poi1.order - poi2.order;
  },

  swapPois: function(id1, id2) {
    console.log('swapPois hit!!!');
    var pois = this.props.trip.pois;
    console.log('(swapPois) var pois: ', pois);
    var poi1 = pois.filter(function(poi) {return poi.id === id1})[0];
    var poi2 = pois.filter(function(poi) {return poi.id === id2})[0];
    console.log('(swapPois) id1 parameter: ', id1);
    console.log('(swapPois) var poi1: ', poi1);
    console.log('(swapPois) id2 parameter: ', id2);
    console.log('(swapPois) var poi2: ', poi2);
    var poi1Order = pois.indexOf(poi1);
    var poi2Order = pois.indexOf(poi2);
    var poiOneOrder = poi1Order;
    poi1Order = poi2Order;
    poi2Order = poiOneOrder;

    pois.sort(this.comparePois);
  },

  // getInitialState: function(props) {
  //   return {
  //     pois: this.props.trip.pois
  //   }
  // },

  // moveCard: function(id1, id2) {
  //   var pois = this.state;
  //   var poi1 = pois.filter(function(poi) {return poi.id === id1})[0];
  //   var poi2 = pois.filter(function(poi) {return poi.id === id2})[0];
  //   var poi1Order = pois.indexOf(poi1);
  //   var poi2Order = pois.indexOf(poi2);
  //   this.setState(update(this.state, {
  //     pois: {
  //       $splice: [
  //         [poi1Order, 1],
  //         [poi2Order, 0, poi1]
  //       ]
  //     }
  //   }));
  // },

  render: function(props){
    if (this.props.activeTrip == null) {
      return (
        <div>
          <p>Enter a trip</p>
        </div>
      )
    }
    var counter = -1;
    var tripPoiList = this.props.trip.pois.map((poidata, index) => {
      counter++;
      return (<TripDisplayDetail key={index} id={poidata.id} poi={poidata} order={index} swapPois={this.swapPois} />);
    }, this);

    // console.log(tripPoiList)

    return (
      <div>
        <div>
          <h1>{this.props.trip.tripName}</h1>
          <input onClick={this.deleteTrip} type="button" name="rename" value="Delete Trip" />
        </div>
        {tripPoiList}
      </div>
    )

  }
});

// var mapStateToProps = function(state, props) {
//   return {
//     googleID: state.googleID,
//     trip: state.trips.find((trip) => {
//       if(state.activeTrip == trip._id) {
//         return trip
//       }
//     }),
//     searchResults: state.searchResults,
//     activeTrip: state.activeTrip
//   };
// };

var Container = connect()(TripDisplay);

module.exports = Container;
