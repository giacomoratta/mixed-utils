// Basic Lodash functions
const _ = {
  cloneDeep: require('lodash.clonedeep'),
  deburr: require('lodash.deburr'),
  fromPairs: require('lodash.frompairs'),
  isFunction: require('lodash.isfunction'),
  isNaN: require('lodash.isnan'),
  isNil: function (value: any): boolean { return value === undefined || value === null },
  isObject: require('lodash.isobject'),
  isString: require('lodash.isstring'),
  mixin: require('lodash.mixin'),
  sortBy: require('lodash.sortby'),
  toPairs: require('lodash.topairs')
}

export default _
