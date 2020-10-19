const _ = require('./lodash.extended')

/**
 * Change the sequence of object keys by object values.
 * @param obj object
 * @return object
 */
module.exports.sortObjectByValue = (obj: object): object => {
  return _.fromPairs(_.sortBy(_.toPairs(obj), function (a: any) { return a[1] }))
}

/**
 * Change the sequence of object keys by object keys.
 * @param obj object
 * @return object
 */
module.exports.sortObjectByKey = (obj: object): object => {
  return _.fromPairs(_.sortBy(_.toPairs(obj), function (a: any) { return a[0] }))
}
