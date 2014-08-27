var rbush = require('rbush');

function tree () {
  return rbush(7, ['.minLng', '.minLat', '.maxLng', '.maxLat']);
}

module.exports = tree;
