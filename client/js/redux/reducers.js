var actions = require('./actions');

var initialState = {
	googleID: '105105095864688158123',
	trips: [
		{
			tripName: 'Baseball Game',
			poi: [
				{
					name: 'Location a',
					location: {
						display_address: ['123 Main St'],
						coordinate: {latitude: 39.27, longitude: -40.34},
					},
					id: 'location-a',
					url: 'www.google.com/location-a',
					image_url: 'www.google.com/image_url_loc-a',
					rating: 4.5,
					review_count: 25,
					rating_img_url: 'www.google.com/rating_img_loc-a',
					rating_img_url_small: 'www.google.com/rating_img_small_loc-a',
					display_phone: '1-800-555-5555',
					categories: [['Southern', 'southern'], ['Bars', 'bar']]
				},
				{
					name: 'Location b',
					location: {
						display_address: ['456 South St'],
						coordinate: {latitude: 40.45, longitude: -50.12},
					},
					id: 'location-b',
					url: 'www.google.com/location-b',
					image_url: 'www.google.com/image_url_loc-b',
					rating: 3.7,
					review_count: 30,
					rating_img_url: 'www.google.com/rating_img_loc-b',
					rating_img_url_small: 'www.google.com/rating_img_small_loc-b',
					display_phone: '1-800-555-5555',
					categories: [['Mexican', 'mexican'], ['Restaurant', 'restaurant']]
				},
				{
					name: 'Location c',
					location: {
						display_address: ['789 Park Ave'],
						coordinate: {latitude: 25.43, longitude: -27.54},
					},
					id: 'location-c',
					url: 'www.google.com/location-c',
					image_url: 'www.google.com/image_url_loc-c',
					rating: 2.0,
					review_count: 7,
					rating_img_url: 'www.google.com/rating_img_loc-c',
					rating_img_url_small: 'www.google.com/rating_img_small_loc-c',
					display_phone: '1-800-555-5555',
					categories: [['Italian', 'italian'], ['Diner', 'diner']]
				}
			]
		},
		{
			tripName: 'Movie Night',
			poi: [
				{
					name: 'Location a',
					location: {
						display_address: ['123 Main St'],
						coordinate: {latitude: 39.27, longitude: -40.34},
					},
					id: 'location-a',
					url: 'www.google.com/location-a',
					image_url: 'www.google.com/image_url_loc-a',
					rating: 4.5,
					review_count: 25,
					rating_img_url: 'www.google.com/rating_img_loc-a',
					rating_img_url_small: 'www.google.com/rating_img_small_loc-a',
					display_phone: '1-800-555-5555',
					categories: [['Southern', 'southern'], ['Bars', 'bar']]
				},
				{
					name: 'Location b',
					location: {
						display_address: ['456 South St'],
						coordinate: {latitude: 40.45, longitude: -50.12},
					},
					id: 'location-b',
					url: 'www.google.com/location-b',
					image_url: 'www.google.com/image_url_loc-b',
					rating: 3.7,
					review_count: 30,
					rating_img_url: 'www.google.com/rating_img_loc-b',
					rating_img_url_small: 'www.google.com/rating_img_small_loc-b',
					display_phone: '1-800-555-5555',
					categories: [['Mexican', 'mexican'], ['Restaurant', 'restaurant']]
				},
				{
					name: 'Location c',
					location: {
						display_address: ['789 Park Ave'],
						coordinate: {latitude: 25.43, longitude: -27.54},
					},
					id: 'location-c',
					url: 'www.google.com/location-c',
					image_url: 'www.google.com/image_url_loc-c',
					rating: 2.0,
					review_count: 7,
					rating_img_url: 'www.google.com/rating_img_loc-c',
					rating_img_url_small: 'www.google.com/rating_img_small_loc-c',
					display_phone: '1-800-555-5555',
					categories: [['Italian', 'italian'], ['Diner', 'diner']]
				}
			]
		}
	],
	searchResults: [
		{
			name: 'Location 1',
			location: {
				display_address: ['123 Main St'],
				coordinate: {latitude: 39.27, longitude: -40.34},
			},
			id: 'location-1',
			url: 'www.google.com/location-1',
			image_url: 'www.google.com/image_url_loc-1',
			rating: 4.5,
			review_count: 25,
			rating_img_url: 'www.google.com/rating_img_loc-1',
			rating_img_url_small: 'www.google.com/rating_img_small_loc-1',
			display_phone: '1-800-555-5555',
			categories: [['Southern', 'southern'], ['Bars', 'bar']]
		},
		{
			name: 'Location 2',
			location: {
				display_address: ['456 South St'],
				coordinate: {latitude: 40.45, longitude: -50.12},
			},
			id: 'location-2',
			url: 'www.google.com/location-2',
			image_url: 'www.google.com/image_url_loc-2',
			rating: 3.7,
			review_count: 30,
			rating_img_url: 'www.google.com/rating_img_loc-2',
			rating_img_url_small: 'www.google.com/rating_img_small_loc-2',
			display_phone: '1-800-555-5555',
			categories: [['Mexican', 'mexican'], ['Restaurant', 'restaurant']]
		},
		{
			name: 'Location 3',
			location: {
				display_address: ['789 Park Ave'],
				coordinate: {latitude: 25.43, longitude: -27.54},
			},
			id: 'location-3',
			url: 'www.google.com/location-3',
			image_url: 'www.google.com/image_url_loc-3',
			rating: 2.0,
			review_count: 7,
			rating_img_url: 'www.google.com/rating_img_loc-3',
			rating_img_url_small: 'www.google.com/rating_img_small_loc-3',
			display_phone: '1-800-555-5555',
			categories: [['Italian', 'italian'], ['Diner', 'diner']]
		}
	]
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