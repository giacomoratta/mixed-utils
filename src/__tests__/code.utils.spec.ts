const libUtils = require('../code.utils')

describe('code.utils', function () {
  describe('createFunction', function () {
    it('should create simple add function', function () {
      const functionBody = 'return a+b+3;'
      const f = libUtils.createFunction(['a', 'b'], functionBody)
      expect(f(4, 5)).toEqual(12)
    })

    it('should create add function with if-else', function () {
      const functionBody = `
        if(a>=4) return a+b+3;
        else return a+b;
      `
      const f = libUtils.createFunction(['a', 'b'], functionBody)
      expect(f(4, 5)).toEqual(12)
      expect(f(2, 5)).toEqual(7)
    })
  })
})
