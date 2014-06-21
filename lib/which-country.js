var data = require('./data.geo.json');
var pip = require('point-in-polygon');
var rbush = require('rbush');

var polygons = rbush(9, ['.minLng', '.minLat', '.maxLng', '.maxLat']);

function Polygon (coordinates, country) {
  this.country = country;
  this._coordinates = coordinates;

  var coords = coordinates[0];
  var minLng = coords[0][0];
  var maxLng = coords[0][0];
  var minLat = coords[0][1];
  var maxLat = coords[0][1];

  for (var i = 1; i < coords.length; i++) {
    var point = coords[i];

    if (point[0] < minLng)
      minLng = point[0];
    else if (point[0] > maxLng)
      maxLng = point[0];

    if (point[1] < minLat)
      minLat = point[1];
    else if (point[1] > maxLat)
      maxLat = point[1];
  }

  this.minLng = minLng;
  this.minLat = minLat;
  this.maxLng = maxLng;
  this.maxLat = maxLat;
}

Polygon.prototype.contains = function (point) {
  var r = pip(point, this._coordinates[0]);
  var i = 1;

  while (r && i < this._coordinates.length)
    r = !pip(point, this._coordinates[i++]);

  return r;
};


data.features.forEach(function (feature) {
  var coordinates;

  switch (feature.geometry.type) {
    case 'Polygon' : coordinates = [feature.geometry.coordinates]; break;
    case 'MultiPolygon' : coordinates = feature.geometry.coordinates; break;
    default : throw new Error('Unsupported geometry');
  }

  coordinates.forEach(function (c) {
    polygons.insert(new Polygon(c, feature.id));
  });
});

function country (point) {
  var r = null;
  var i = 0;
  var rect = [point[0], point[1], point[0], point[1]];
  var possible = polygons.search(rect);

  for (var i = 0; i < possible.length; i++)
    if (possible[i].contains(point))
      return possible[i].country;

  return null;
}

module.exports = country;
