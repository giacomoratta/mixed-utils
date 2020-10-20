import * as libUtils from '../object.utils'

describe('object.utils', function () {
  describe('sortObjectByValue', function () {
    it('should sort values in ascending order', function () {
      const newObj = libUtils.sortObjectByValue({
        f: 24,
        a: 65,
        d: 17
      })
      expect(Object.values(newObj)).toMatchObject([17, 24, 65])
    })
  })

  describe('sortObjectByKey', function () {
    it('should sort keys in ascending order', function () {
      const newObj = libUtils.sortObjectByKey({
        f: 24,
        a: 65,
        d: 17
      })
      expect(Object.keys(newObj)).toMatchObject(['a', 'd', 'f'])
    })
  })
})
