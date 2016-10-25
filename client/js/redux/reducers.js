var actions = require('./actions');

var initialState = {
	googleID: null,
	trips: [],
	searchResults: []
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
				trips: user.itineraries
			});
			return state;
		
		case action.FETCH_USER_ERROR:
			// console.log('FETCH_USER_ERROR');
			return state;
		
		// Updates state upon location trail search
		case actions.FETCH_POI_SUCCESS:
			// console.log('FETCH_POI_SUCCESS');
			var searchResults = action.searchResults;
			state = Object.assign({}, state, {
				searchResults: searchResults,
			});
			return state;

		case action.FETCH_POI_ERROR:
			// console.log('FETCH_POI_ERROR');
			return state;
	
	}
	return state;	
};


exports.reducer = reducer;