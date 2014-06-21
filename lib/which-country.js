var data = require('./data.geo.json');
var pip = require('point-in-polygon');

var polygons = [];

function Polygon (coordinates, country) {
  this.country = country;
  this._coordinates = coordinates;
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
    polygons.push(new Polygon(c, feature.id));
  });
});

function country (point) {
  var r = null;
  var i = 0;

  for (var i = 0; i < polygons.length; i++)
    if (polygons[i].contains(point)) return polygons[i].country;

  return null;
}

module.exports = country;
