# which-country

Get ISO 3166-1 alpha-3 country code for geographic coordinates
in node.js or browser.

CAVEAT: currently doesn't work for points in territorial waters

Powered by [rbush](https://github.com/mourner/rbush) and modified
[Natural Earth 50m countries dataset](http://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/).

If you are interested in more general solution, try [which-polygon](https://github.com/mapbox/which-polygon).

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

#Demo

[Demo](http://vkurchatkin.github.io/which-country/) whith leaflet and browserify

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
