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
    var url = 'http://localhost:8080/user';
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
var poiSearch = function(searchTerm, location) {
  return function(dispatch) {
    var location = location;
    var searchTerm = searchTerm;
    var url = `http://localhost:8080/api/${searchTerm}/${location}`;
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
var addTrip = function(props) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var userId = props.userId;
    var url = `http://localhost:8080/user/${userId}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      trips: {
        'name': props.name,
        'start': props.start
      }
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
var addPoi = function(props) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var userId = props.userId;
    var tripId = props.tripId;
    var url = `http://localhost:8080/user/trips/${userId}/${tripId}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'name': props.name,
      'location': props.location
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

// // PUT request to remove favorites from user schema
// var removeFavorite = function(props) {
//   return function(dispatch) {
//     var token = Cookies.get('accessToken');
//     var url = 'http://localhost:8080/user/favorites/'+props.trail_id;
//   return fetch(url,
//   {
//     method: 'put',
//     headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
//     body: JSON.stringify({
//       'googleID': props.userId
//     })
//   }
//     ).then(function(response) {
//       if(response.status < 200 || response.status > 300) {
//         var error = new Error(response.statusText);
//         error.response = response;
//         throw error;
//       }
//       return response.json();
//     })
//     .then(function(response) {
//       return dispatch(
//         fetchUserSuccess()
//         );
//     })
//     .catch(function(error) {
//       return dispatch(
//         fetchUserError(error)
//         );
//     });
//   }
// };

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

exports.addTrip = addTrip;
exports.addPoi = addPoi;
// exports.removeFavorite = removeFavorite;
