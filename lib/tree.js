var rbush = require('rbush');

function tree () {
  return rbush(9, ['.minLng', '.minLat', '.maxLng', '.maxLat']);
}

module.exports = tree;
