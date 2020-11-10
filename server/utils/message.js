const moment = require('moment');

let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};


// here lat and lng ==> latitude and longitude
// this latitude and longitude will bw fatched server file and passes in url below and it creates link automatic
let generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat}, ${lng}`,
    createdAt: moment().valueOf()
  }
}

// this will export above to variables to server.js
module.exports = { generateMessage, generateLocationMessage };
