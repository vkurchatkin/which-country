var data = require('./data.geo.json');
var createBaseTree = require('./base-tree.js');

function createPolygon (coordinates, country) {
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

  return {
    country : country,
    coordinates : coordinates,
    minLng : minLng,
    minLat : minLat,
    maxLng : maxLng,
    maxLat : maxLat
  };
}

function createNewTree () {
  var tree = createBaseTree();

  data.features.forEach(function (feature) {
    var coordinates;

    switch (feature.geometry.type) {
      case 'Polygon' : coordinates = [feature.geometry.coordinates]; break;
      case 'MultiPolygon' : coordinates = feature.geometry.coordinates; break;
      default : throw new Error('Unsupported geometry');
    }

    coordinates.forEach(function (c) {
      tree.insert(createPolygon(c, feature.id));
    });
  });

  return tree;
}

module.exports = createNewTree;
