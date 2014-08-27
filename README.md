# which-country

Get ISO 3166-1 alpha-3 country code for geographic coordinates
in node.js or browser.

CAVEAT: currently doesn't work for points in territorial waters

# Usage

```
npm install which-country
```

and then:

```javascript
var wc = require('which-country');

// pass [lng, lat]
console.log(wc([37, 55])); // RUS
console.log(wc([-100, 40])); // USA
console.log(wc([40, -40])); // null, somewhere in Atlantic Ocean
```

# Development

Run tests:

```
npm test
```

Generate R-tree:

```
npm run generate
```


# License

MIT
