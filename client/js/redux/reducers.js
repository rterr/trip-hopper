var actions = require('./actions');

var initialState = {
	googleID: '105105095864688158123',
	trips: [
		{
			tripName: '',
			pois: []}
		],
	searchResults: [],
	activeTrip: 'test1234'
};

var reducer = function(state, action) {
	state = state || initialState;
	switch (action.type) {

		// Updates state upon fetch user success
		case actions.FETCH_USER_SUCCESS:
			// console.log('FETCH_USER_SUCCESS');
			var user = action.user[0];
			state = Object.assign({}, state, {
				googleID: user.googleID,
				trips: user.trips
			});
			console.log
			return state;

		case action.FETCH_USER_ERROR:
			// console.log('FETCH_USER_ERROR');
			return state;

		// Updates state upon location trail search
		case actions.FETCH_POI_SUCCESS:
			// console.log('FETCH_POI_SUCCESS');
			console.log("FETCH_POI_SUCCESS")
			var searchRes = action.searchResults.businesses;
			state = Object.assign({}, state, {
				searchResults: searchRes
			});
			return state;

		case action.FETCH_POI_ERROR:
			// console.log('FETCH_POI_ERROR');
			return state;

		case action.addPoi:
		console.log(action)
		

	}
	return state;
};


exports.reducer = reducer;
