var pip = require('point-in-polygon');

var tree = require('./tree.js')();

function contains (polygon, point) {
  var r = pip(point, polygon.coordinates[0]);
  var i = 1;

  while (r && i < polygon.coordinates.length)
    r = !pip(point, polygon.coordinates[i++]);

  return r;
};

function country (point) {
  var polygons = tree.search(point.concat(point));

  for (var i = 0; i < polygons.length; i++)
    if (contains(polygons[i], point))
      return polygons[i].country;

  return null;
}

module.exports = country;
