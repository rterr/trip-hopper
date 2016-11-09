// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import React,  { Component } from 'react';
// import ReactDOM from 'react-dom';
//
// class GooMap extends Component {
// 	withGoogleMap(props => (
//
// 		<GoogleMap
// 			ref={props.onMapLoad}
// 			defaultZoom={12}
// 			defaultCenter={{ lat: 41.9484, lng: -87.6553 }}
// 			onClick={props.onMapClick}
// 		>
//
// 			{props.markers.map((marker, index) => (
// 				<Marker
// 					{...marker}
// 					onRightClick={() => props.onMarkerRightClick(index)}
// 				/>
// 			))}
// 		</GoogleMap>
// 	));
//
// 	render(
// 		<withGoogleMap
// 		containerElement={
// 			<div style={{ height: '100%' }} />
// 		}
// 		mapElement={
// 			<div style={{ height: '100%'}} />
// 		}
// 		onMapLoad={}
// 		onMapClick={}
// 		markers={markers}
// 		onMarkerRightClick={}
// 		/>
// 	)
//
// }
// // Wrap all `react-google-maps` components with `withGoogleMap` HOC
// // and name it GettingStartedGoogleMap
// // var locations = [
// // 			['Wrigley Field', 41.9484, -87.6553, 4],
// // 			['Merchandise Mart', 41.8885, -87.6354, 5],
// // 			['US Cellular Field', 41.8299, -87.6338, 3],
// // 			['Sears Tower', 41.8789, -87.6359, 2],
// // 			['Shedd Aquarium', 41.8676, -87.6140, 1]
// // 		];
// 		var marker = [{lat: 41.885, lng: -87.6354}];
// 	//
// 		// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// 		// and name it GettingStartedGoogleMap
// 		export const GettingStartedGoogleMap = withGoogleMap(props => (
//
// 			<GoogleMap
// 		    ref={props.onMapLoad}
// 		    defaultZoom={12}
// 		    defaultCenter={{ lat: 41.9484, lng: -87.6553 }}
// 		    onClick={props.onMapClick}
// 		  >
//
// 		    {props.markers.map((marker, index) => (
// 		      <Marker
// 		        {...marker}
// 		        onRightClick={() => props.onMarkerRightClick(index)}
// 		      />
// 		    ))}
// 		  </GoogleMap>
// 		));
// export default GooMap;
