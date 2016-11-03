var actions = require('./actions');

var initialState = {
	googleID: '105105095864688158123',
	trips: [
		{
			tripName: '',
			_id: '',
			pois: []}
		],
	searchResults: [],
	activeTrip: null
};

var reducer = function(state, action) {
	state = state || initialState;
	switch (action.type) {

		// Updates state upon fetch user success
		case actions.FETCH_USER_SUCCESS:
			// console.log('FETCH_USER_SUCCESS');
			var user = action.user;
			var newState = Object.assign({}, state, {
				googleID: user.googleID,
				trips: user.trips,
				activeTrip: user.activeTrip
			});
			return newState;

		case actions.FETCH_USER_ERROR:
			// console.log('FETCH_USER_ERROR');
			return state;

		// Updates state upon location trail search
		case actions.FETCH_POI_SUCCESS:
			console.log("FETCH_POI_SUCCESS");
			var searchRes = action.searchResults.businesses;
			var newState = Object.assign({}, state, {
				searchResults: searchRes
			});
			return newState;

		case actions.FETCH_POI_ERROR:
			// console.log('FETCH_POI_ERROR');
			return state;

	}
	return state;
};


exports.reducer = reducer;
