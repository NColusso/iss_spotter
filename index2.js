// const { fetchMyIP } = require("./iss_promised");
// const { fetchCoordsByIP } = require("./iss_promised");
// const { fetchISSFlyOverTimes } = require("./iss_promised");
const { nextISSTimesForMyLocation } = require("./iss_promised");

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body))


  nextISSTimesForMyLocation()
    .then((passTimes) => {
      const passes = JSON.parse(passTimes).response
      for (const pass of passes) {
        let datetime = new Date(0);
        datetime.setUTCSeconds(pass.risetime);
        console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
      }
    })
    .catch((error) => {
      console.log("You messed up: ", error.message)
    })