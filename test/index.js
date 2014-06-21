var data = require('./data.json');
var assert = require('assert');

var country = require('../index.js');

data.forEach(function (item) {
  assert.equal(country(item.point), item.country);
});
