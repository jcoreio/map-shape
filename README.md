# map-shape

[![CircleCI](https://circleci.com/gh/jcoreio/map-shape.svg?style=svg)](https://circleci.com/gh/jcoreio/map-shape)
[![Coverage Status](https://codecov.io/gh/jcoreio/map-shape/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/map-shape)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/map-shape.svg)](https://badge.fury.io/js/map-shape)

One of those missing lodash functions. Includes TypeScript definitions and Flow definitions
(they aren't prefect, there are some edge cases...)

```js
import mapShape from 'map-shape'

mapShape(
  {
    foo: 1,
    bar: '2',
    baz: 'hello',
  },
  {
    foo: (value, key, obj) => `${value} ${key} ${obj.baz}`,
    bar: value => parseInt(value),
  }
)
// outputs { foo: '1 foo hello', bar: 2 }
```

Each mapper function is called with three arguments:

- `value` - the value of the input property
- `key` - the key of the input property
- `obj` - the input object

### Notes

If the input object is `null`, returns `null`. If the input object is `undefined`, returns `undefined`.

## FP Version

Works better with `lodash/fp`. Only passes the `value` to each mapper function.

```js
import mapShape from 'map-shape/fp'

mapShape({
  foo: String,
  bar: parseInt,
})({
  foo: 1,
  bar: '2',
  baz: 'hello',
})
// outputs { foo: '1', bar: 2 }
```
