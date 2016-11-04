import { withGoogleMap } from "react-google-maps";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
var locations = [
			['Wrigley Field', 41.9484, -87.6553, 4],
			['Merchandise Mart', 41.8885, -87.6354, 5],
			['US Cellular Field', 41.8299, -87.6338, 3],
			['Sears Tower', 41.8789, -87.6359, 2],
			['Shedd Aquarium', 41.8676, -87.6140, 1]
		];

		import { withGoogleMap } from "react-google-maps";

		// Wrap all `react-google-maps` components with `withGoogleMap` HOC
		// and name it GettingStartedGoogleMap
		const GettingStartedGoogleMap = withGoogleMap(props => (
		  <GoogleMap
		    ref={props.onMapLoad}
		    defaultZoom={3}
		    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
		    onClick={props.onMapClick}
		  >
		    {props.markers.map((marker, index) => (
		      <Marker
		        {...marker}
		        onRightClick={() => props.onMarkerRightClick(index)}
		      />
		    ))}
		  </GoogleMap>
		));
		// Then, render it:
		render(
		  <GettingStartedGoogleMap
		    containerElement={
		      <div style={{ height: `100%` }} />
		    }
		    mapElement={
		      <div style={{ height: `100%` }} />
		    }
		    onMapLoad={_.noop}
		    onMapClick={_.noop}
		    markers={markers}
		    onMarkerRightClick={_.noop}
		  />,
		  document.getElementById('root')
		);

		default export GettingStartedGoogleMap;
