var assert = require('assert');
var fs = require('fs');

var country = require('../index.js');
var data = fs.readFileSync(__dirname + '/data.txt', 'utf8').split('\n');

data.forEach(function (line) {
  var parts = line.split(' ');
  var id = parts[0];

  for (var i = 1; i < parts.length; i++) {
    var part = parts[i];
    var coords = part.split(',').map(Number);

    assert.equal(country([coords[1], coords[0]]), id);
  }
});
