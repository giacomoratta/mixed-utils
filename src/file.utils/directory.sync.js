import * as path from 'path'
import _ from '../lodash.local'
import * as fs from 'fs'
const fsExtra = require('fs-extra')
const rimraf = require('rimraf') /* A "rm -rf" util for nodejs */

export const checkAndSetPathSync = (pathString, callback) => {
  if (!_.isString(pathString)) return null
  if (!fs.existsSync(pathString)) return null
  pathString = path.resolve(pathString) + path.sep
  if (callback) callback(pathString)
  return pathString
}

export const directoryExistsSync = (pathString) => {
  if (!_.isString(pathString)) return false
  return fs.existsSync(pathString)
}

export const ensureDirSync = (pathString) => {
  try {
    fsExtra.ensureDirSync(pathString)
  } catch (e) {
    return false
  }
  return true
}

export const ensureParentDirSync = (pathString) => {
  try {
    fsExtra.ensureDirSync(path.parse(pathString).dir)
  } catch (e) {
    return false
  }
  return true
}

export const copyDirectorySync = (pathFrom, pathTo, options) => {
  options = {
    overwrite: false,
    errorOnExist: false,
    ...options
  }
  const result = {
    err: null,
    pathFrom: pathFrom,
    pathTo: pathTo
  }
  try {
    fsExtra.copySync(pathFrom, pathTo, options)
  } catch (err) {
    result.err = err
    // console.error(result)
  }
  return result
}

export const moveDirectorySync = (pathFrom, pathTo, options) => {
  options = {
    overwrite: false,
    errorOnExist: false,
    setDirName: false,
    ...options
  }
  if (options.setDirName === true) {
    pathTo = path.join(pathTo, path.basename(pathFrom))
  }
  const result = {
    err: null,
    pathFrom: pathFrom,
    pathTo: pathTo
  }

  try {
    fsExtra.moveSync(pathFrom, pathTo, options)
  } catch (err) {
    result.err = err
    // console.error(result)
  }
  return result
}

export const readDirectorySync = (pathString, preProcessItemsFn, itemFn) => {
  if (!itemFn) itemFn = function () {}
  if (!preProcessItemsFn) preProcessItemsFn = function () {}
  let items = null
  try {
    items = fs.readdirSync(pathString)
  } catch (e) {
    // console.error(e)
    return null
  }
  if (!items) return null
  preProcessItemsFn(items)
  for (let i = 0; i < items.length; i++) {
    itemFn(items[i], i, items)
  }
  return items
}

export const uniqueDirectoryNameSync = ({ parentPath, directoryName }) => {
  let newDestinationPath = path.join(parentPath, directoryName)
  const parsedDir = path.parse(newDestinationPath)
  let i = 1
  while (directoryExistsSync(newDestinationPath) === true && i < 1000) {
    newDestinationPath = path.join(parsedDir.dir, `${parsedDir.base}_${i}`)
    i++
  }
  if (i >= 1000) return null
  return newDestinationPath
}

export const removeDirSync = (pathString) => {
  try {
    rimraf.sync(pathString)
    return true
  } catch (e) {
    // console.error(e)
    return false
  }
}

export const getPathStatsSync = (pathString, errorFn) => {
  // usage: isDirectory, isFile
  try {
    return fs.lstatSync(pathString)
  } catch (e) {
    errorFn && errorFn(e)
  }
}
