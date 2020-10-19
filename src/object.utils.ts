import _ from './lodash.local'

/**
 * Check if the object is a plain object (like JSON)
 * @param obj
 * @return boolean
 */
export const isPlainObject = (obj: object): boolean => {
  return (_.isObject(obj) === true && obj.constructor === Object)
}

/**
 * Check if an object is a Promise
 * @param obj any
 * @return boolean
 */
export const isPromise = (obj: any): boolean => {
  return (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

/**
 * Change the sequence of object keys by object keys.
 * @param obj object
 * @return object
 */
export const sortObjectByKey = (obj: object): object => {
  return _.fromPairs(_.sortBy(_.toPairs(obj), function (a: any) { return a[0] }))
}

/**
 * Change the sequence of object keys by object values.
 * @param obj object
 * @return object
 */
export const sortObjectByValue = (obj: object): object => {
  return _.fromPairs(_.sortBy(_.toPairs(obj), function (a: any) { return a[1] }))
}
