// const {fetchMyIP} = require("./iss");
// const {fetchCoordsByIP} = require("./iss");
// const {fetchISSFlyOverTimes} = require("./iss");
const {nextISSTimesForMyLocation} = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let pass of passTimes) {
    let datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  }
});


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Error retrieving IP address: ", error);
//   } else {
//     console.log("Found IP: ", ip);
//   }
// });

// fetchCoordsByIP((error, coordinates) => {
//   if (error) {
//     console.log("Error retrieving coordinates: ", error);
//   } else {
//     console.log(`Coordinates found : Latitude: ${coordinates[0]}, Longitude: ${coordinates[1]}`);
//   }
// });

// fetchISSFlyOverTimes((error, times) => {
//   if (error) {
//     console.log("Error retrieving fly over times: ", error);
//   } else {
//     console.log("Found fly over times: ", times);
//   }
// });

