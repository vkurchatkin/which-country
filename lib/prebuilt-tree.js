var data = require('../data.json');
var createBaseTree = require('./base-tree.js');

function createPrebuiltTree () {
  return createBaseTree().fromJSON(data);
}

module.exports = createPrebuiltTree;
