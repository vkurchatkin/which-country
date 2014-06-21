var data = require('../data.json');
var pip = require('point-in-polygon');

var tree = require('./tree.js')().fromJSON(data);

function contains (polygon, point) {
  var r = pip(point, polygon.coordinates[0]);
  var i = 1;

  while (r && i < polygon.coordinates.length)
    r = !pip(point, polygon.coordinates[i++]);

  return r;
};

function country (point) {
  var r = null;
  var i = 0;
  var rect = [point[0], point[1], point[0], point[1]];
  var possible = tree.search(rect);

  for (var i = 0; i < possible.length; i++)
    if (contains(possible[i], point))
      return possible[i].country;

  return null;
}

module.exports = country;
