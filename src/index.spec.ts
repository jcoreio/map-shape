/* eslint-env mocha */

import { expect } from 'chai'
import mapShape from './'

describe('map-shape', () => {
  it(`returns null or undefined input as is`, function() {
    expect(mapShape(null, { foo: (x: number) => String(x) })).to.be.null
    expect(mapShape(undefined, { foo: (x: number) => String(x) })).to.be
      .undefined
  })
  it('works', () => {
    expect(
      mapShape(
        {
          foo: 1,
          bar: '2',
          baz: 'hello',
        },
        {
          foo: (x: number) => String(x),
          bar: (x: string) => parseInt(x),
        }
      )
    ).to.deep.equal({
      foo: '1',
      bar: 2,
    })
  })
  it(`additional arguments work`, function() {
    expect(
      mapShape(
        {
          foo: 1,
          bar: '2',
          baz: 'hello',
        },
        {
          foo: (x, key, obj) => `${x} ${key} ${obj.baz}`,
          bar: (x: string) => parseInt(x),
        }
      )
    ).to.deep.equal({ foo: '1 foo hello', bar: 2 })
  })
})
