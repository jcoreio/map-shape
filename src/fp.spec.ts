/* eslint-env mocha */

import { expect } from 'chai'
import mapShape from './fp'
import { map } from 'lodash/fp'
import keep from './keep'

const parseDate = (x: string): Date => new Date(x)

describe('map-shape/fp', () => {
  it(`returns null or undefined input as is`, function() {
    expect(mapShape({ foo: parseInt })(null)).to.be.null
    expect(mapShape({ foo: parseInt })(undefined)).to.be.undefined
  })
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
  it(`deep picking`, function() {
    expect(
      map(
        mapShape({
          author: mapShape({
            id: keep,
            name: keep,
          }),
          date: parseDate,
          text: keep,
          comments: map(
            mapShape({
              id: keep,
              author: mapShape({
                id: keep,
                name: keep,
              }),
              date: parseDate,
              text: keep,
            })
          ),
        })
      )([
        {
          author: {
            id: 1,
            name: 'dude',
            age: 42,
          },
          date: 'Jan 1 2020',
          text: 'blah',
          comments: [
            {
              id: 8,
              author: {
                id: 6,
                name: 'Trump',
                age: 'seventysomething',
              },
              date: 'Jan 5 2020',
              text: 'SAD',
              shouldBeBanned: true,
            },
            {
              id: 10,
              author: {
                id: 9,
                name: 'Barr',
                age: 'old',
              },
              date: 'Jan 6 2020',
              text: 'Quit making my job impossible',
            },
          ],
        },
      ])
    ).to.deep.equal([
      {
        author: {
          id: 1,
          name: 'dude',
        },
        date: new Date('Jan 1 2020'),
        text: 'blah',
        comments: [
          {
            id: 8,
            author: {
              id: 6,
              name: 'Trump',
            },
            date: new Date('Jan 5 2020'),
            text: 'SAD',
          },
          {
            id: 10,
            author: {
              id: 9,
              name: 'Barr',
            },
            date: new Date('Jan 6 2020'),
            text: 'Quit making my job impossible',
          },
        ],
      },
    ])
  })
})
