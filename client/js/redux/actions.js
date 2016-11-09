require('isomorphic-fetch');
var Cookies = require("js-cookie");
var ObjectID = require("bson-objectid");


var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(user) {

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
var poiSearch = function(searchTerm, searchLocation, searchCLL) {
  return function(dispatch) {
    var location = searchLocation;
    var term = searchTerm;
    var cll = searchCLL;
    if (location) {
      var url = `/api/${term}?location=${location}`;
    } else if (cll) {
      var url = `/api/${term}?cll=${cll}`;
    }
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
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var activeTrip = tripName
    var url = `/user/${googleID}/${activeTrip}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'tripName': tripName,
      '_id': ObjectID(),
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
var removeTrip = function(googleID, _id) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `/user/removeTrip/${googleID}`;
  return fetch(url,
  {
    method: 'delete',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      '_id': _id
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
var removePoi = function(googleID, _id, poi) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `/user/poi/removePoi/${googleID}`;
  return fetch(url,
  {
    method: 'delete',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      '_id': _id,
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

// PUT request to change activeTrip
var setActiveTrip = function(activeTrip) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `/user/${activeTrip}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token}
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

exports.removeTrip = removeTrip;

exports.setActiveTrip = setActiveTrip;

exports.addTrip = addTrip;
exports.addPoi = addPoi;
exports.removePoi = removePoi;
