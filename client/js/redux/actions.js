require('isomorphic-fetch');
var Cookies = require("js-cookie");


var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(user, score, answer) {
  return {
    type: FETCH_USER_SUCCESS,
    user: user
  };
};

var FETCH_USER_ERROR = 'FETCH_USER_ERROR';
var fetchUserError = function(error) {
  return {
    type: FETCH_USER_ERROR,
    error: error
  };
};

var FETCH_POI_SUCCESS = 'FETCH_POI_SUCCESS';
var fetchPoiSuccess = function(searchResults) {
  console.log('Search results action hit!', searchResults);
  return {
    type: FETCH_POI_SUCCESS,
    searchResults: searchResults
  };
};

var FETCH_POI_ERROR = 'FETCH_POI_ERROR';
var fetchPoiError = function(error) {
  return {
    type: FETCH_POI_ERROR,
    error: error
  };
};

var SET_ACTIVETRIP = 'SET_ACTIVETRIP';
var setActiveTrip = function(tripName) {
  console.log('ActiveTrip action hit!', tripName);
  return {
    type: SET_ACTIVETRIP,
    tripName: tripName
  };
};

// GET request for user info from DB using accessToken
var fetchUser = function() {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
  	var headers = new Headers({
  		Authorization: 'bearer ' + token
  	});
    var url = '/user';
    return fetch(url, {headers: headers}).then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      return dispatch(
        fetchUserSuccess(user)
      );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
      );
    });
  }
};

// GET request for initial starting point-of-interest (poi)
var poiSearch = function(searchTerm, searchLocation) {
  return function(dispatch) {
    var location = searchLocation;
    var term = searchTerm;
    var url = `/api/${term}/${location}`;
    return fetch(url)
    .then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(searchResults) {
      return dispatch(
        fetchPoiSuccess(searchResults)
      );
    })
    .catch(function(error) {
      return dispatch(
        fetchPoiError(error)
      );
    });
  }
};

// PUT request to add trip
var addTrip = function(tripName, poi, googleID) {
  console.log('ACTION TRIPNAME', tripName);
  console.log('ACTION POI', poi);
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `/user/${googleID}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'tripName': tripName,
      'pois': [{
        'name': poi.poi.name,
        'location': poi.poi.location.display_address,
        'coordinate': poi.poi.location.coordinate,
        'id': poi.poi.id,
        'url': poi.poi.url,
        'image_url': poi.poi.image_url,
        'rating': poi.poi.rating,
        'review_count': poi.poi.review_count,
        'rating_img_url': poi.poi.rating_img_url,
        'rating_img_url_small': poi.poi.rating_img_url_small,
        'display_phone': poi.poi.display_phone,
        'categories': poi.poi.categories
      }]
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(response) {
      return dispatch(
        fetchUserSuccess(response)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

// PUT request to remove entire trip from trips array
var removeTrip = function(googleID, tripName) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `/user/${googleID}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'tripName': tripName
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(response) {
      return dispatch(
        fetchUserSuccess(response)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

// PUT request to add POI
var addPoi = function(tripName, poi, googleID) {
  console.log('ACTION PROPS', poi);
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `/user/trips/${googleID}/${tripName}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'name': poi.poi.name,
      'location': poi.poi.location.display_address,
      'coordinate': poi.poi.location.coordinate,
      'id': poi.poi.id,
      'url': poi.poi.url,
      'image_url': poi.poi.image_url,
      'rating': poi.poi.rating,
      'review_count': poi.poi.review_count,
      'rating_img_url': poi.poi.rating_img_url,
      'rating_img_url_small': poi.poi.rating_img_url_small,
      'display_phone': poi.poi.display_phone,
      'categories': poi.poi.categories
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(response) {
      return dispatch(
        fetchUserSuccess(response)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

// PUT request to remove entire trip from trips array
var removePoi = function(googleID, tripName, poi) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `/user/trips/${googleID}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'tripName': tripName,
      'id': poi.id
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(response) {
      return dispatch(
        fetchUserSuccess(response)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

exports.fetchUser = fetchUser;
exports.fetchUserSuccess = fetchUserSuccess;
exports.fetchUserError = fetchUserError;
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;

exports.poiSearch = poiSearch;
exports.fetchPoiSuccess = fetchPoiSuccess;
exports.fetchPoiError = fetchPoiError;
exports.FETCH_POI_SUCCESS = FETCH_POI_SUCCESS;
exports.FETCH_POI_ERROR = FETCH_POI_ERROR;

exports.setActiveTrip = setActiveTrip;
exports.SET_ACTIVETRIP = SET_ACTIVETRIP;

exports.addTrip = addTrip;
exports.removeTrip = removeTrip;
exports.addPoi = addPoi;
exports.removePoi = removePoi;
