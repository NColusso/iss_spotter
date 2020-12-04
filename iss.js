const request = require("request");

/*
Makes a single API request to retrieve the user's IP address
Input:
  - A callback (to pass back an error or the IP string)
Returns (via callback):
  - An error, if any (nullable)
  - The IP address as a string (null if error) Example: "162.245.144.188"
*/

const fetchMyIP = function(callback) {
  // use request to fetch IP
  request("https://api.ipify.org?format=json", function(error, response, body) {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    } else {
      const IP = JSON.parse(body).ip;
      return callback(null, IP);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, function(error, response, body) {
    if (error) {
      let msg = error;
      return callback(msg, null);
    } else {
      const status = JSON.parse(body).status;
      if (status === "fail") {
        let msg = `Status: failed`;
        return callback(msg, null);
      } else {
        const coordinates = [JSON.parse(body).lat, JSON.parse(body).lon];
        return callback(null, coordinates);
      }
    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates[0]}&lon=${coordinates[1]}`, function(error, response, body) {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      return callback(msg, null);
    } else {
      const times = JSON.parse(body).response;
      return callback(null, times);
    }
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};


// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };
