const axios = require('axios');
const path = require('path');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
      // 'Authorization': config.TOKEN
    }
  };

  axios(options)
    .then((response) => {
      callback(null, response);
    })
    .catch((err) => {
      callback(err);
    })

}

module.exports.getReposByUsername = getReposByUsername;