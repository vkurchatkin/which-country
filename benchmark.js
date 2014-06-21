var country = require('./index.js');
var assert = require('assert');

var s = Date.now();

for (var i = 0; i < 10000; i++) {
  assert.equal(country([33.620021, 45.597221]), 'RUS');
}

console.log(Date.now() - s);
