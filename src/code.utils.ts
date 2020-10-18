/**
 * Basic function constructor.
 * @param args
 * @constructor
 */
const F = function (args: any): any {
  return Function.apply(this, args)
}

/**
 * Dynamically create a function.
 * @param params Array<String>: array with parameters names
 * @param body String: function body, without main brackets
 */
module.exports.createFunction = function (params: string[], body: string) {
  try {
    F.prototype = Function.prototype
    return new (F as any)([...params, body])
  } catch (e) {
    console.error(e)
    return null
  }
}
