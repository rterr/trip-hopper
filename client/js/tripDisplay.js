var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('./redux/actions');
var TripDisplayDetail = require('./tripDisplayDetail');


var TripDisplay = React.createClass({
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
        {tripPoiList}
      </div>
    )

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
