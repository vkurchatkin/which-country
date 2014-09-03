var L = require('leaflet');
var wc = require('../');
var countries = require('world-countries');

require('../node_modules/leaflet/dist/leaflet.css');
require('./style.css');

var byISO = {};

countries.forEach(function (country) {
  byISO[country.cca3] = country;
});

var map = L.map('map').setView([0, 0], 1);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function (e) {
  var latlng = e.latlng;
  var iso = wc([latlng.lng, latlng.lat]);

  if (!iso) return;

  var country = byISO[iso];

  if (!country) return;

  map.openPopup(country.name, latlng);
});

