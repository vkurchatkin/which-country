try {
  module.exports = require('./prebuilt-tree.js');
} catch (e) {
  module.exports = require('./new-tree.js');
}
