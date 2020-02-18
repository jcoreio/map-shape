/* eslint-env mocha */

import { expect } from 'chai'
import mapShape from './fp'

describe('map-shape/fp', () => {
  it('works', () => {
    expect(
      mapShape({
        foo: String,
        bar: parseInt,
      })({
        foo: 1,
        bar: '2',
        baz: 'hello',
      })
    ).to.deep.equal({
      foo: '1',
      bar: 2,
    })
  })
})
