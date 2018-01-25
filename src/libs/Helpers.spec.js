import assert from 'assert'
import { createNestedArrays, flatten } from './Helpers'

describe('Helpers', () => {
  describe('#createNestedArrays', () => {
    it(`should return an array of arrays of specified length`, function() {
      const ary = new Array(100).fill(0).map((_, i) => i+1)
      const nested5 = createNestedArrays(ary, 5)
      const nested10 = createNestedArrays(ary, 10)
      const nested25 = createNestedArrays(ary, 25)

      assert.equal(20, nested5.length)
      assert.equal(5, nested5[0].length)
      assert.equal(5, nested5[19].length)
      assert.equal('undefined', typeof nested5[20])
      assert.equal(1, nested5[0][0])
      assert.equal(2, nested5[0][1])
      assert.equal(3, nested5[0][2])
      assert.equal(4, nested5[0][3])
      assert.equal(5, nested5[0][4])
      assert.equal('undefined', typeof nested5[0][5])

      assert.equal(10, nested10.length)
      assert.equal(4, nested25.length)
    })
  })

  describe('#flatten', () => {
    it(`should flatten array with nested arrays`, function() {
      const nestedArray1 = [1, 2, [3, [4, 5]], [6, [7, 8, 9, [10]]]]
      const desiredArray1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      const flattenedArray1 = flatten(nestedArray1)
      flattenedArray1.forEach((v, i) => {
        assert.equal(desiredArray1[i], v)
      })
    })
  })
})
