import * as path from 'path'
import * as fs from 'fs'
import * as fsExtra from 'fs-extra'
import * as rimraf from 'rimraf' /* A "rm -rf" util for nodejs */
import _ from '../lodash.local'

/**
 * Check if a directory exists
 * @param absPath string
 * @return Promise<boolean>
 */
export const directoryExists = async (absPath: string): Promise<boolean> => {
  return await new Promise((resolve) => {
    fs.access(absPath, fs.constants.F_OK, (error) => {
      if (!_.isNil(error)) return resolve(false)
      return resolve(true)
    })
  })
}

/**
 * Create a directory if not exists.
 * Returns true if the directory exists and has been created, or an error object.
 * @param absPath string
 * @return Promise<boolean|Error>
 */
export const ensureDir = async (absPath: string): Promise<boolean|Error> => {
  try {
    await fsExtra.ensureDir(absPath)
    return true
  } catch (error) {
    return error
  }
}

/**
 * Remove a directory and its content.
 * Returns true or an Error object.
 * @param absPath string
 * @return Promise<boolean|Error>
 */
export const removeDir = async (absPath: string): Promise<boolean|Error> => {
  return await new Promise(function (resolve) {
    rimraf(absPath, (error: Error) => {
      if (error instanceof Error) return resolve(error)
      resolve(true)
    })
  })
}

/**
 * Copy a directory from/to path, with some options (from fs-extra).
 * @param pathFrom string
 * @param pathTo string
 * @param options object (see fsExtra.copy)
 */
export const copyDirectory = async (pathFrom: string, pathTo: string, options: fsExtra.CopyOptions): Promise<{
  error: null|Error
  pathFrom: string
  pathTo: string
}> => {
  options = {
    overwrite: false, /* safe copy by default */
    ...options
  }
  const result = {
    error: null as Error,
    pathFrom,
    pathTo
  }
  try {
    await fsExtra.copy(pathFrom, pathTo, options)
  } catch (error) {
    result.error = error
  }
  return result
}

/**
 * Read the content of a directory, process the whole directory content (directoryFn) and the single items (itemFn).
 * Return an array of strings (absolute paths), null if no items found, or an error.
 * @param absPath string
 * @param directoryFn (items: Array<string>) => Promise<any>
 * @param itemFn  (item: string, index: number, items: Array<string>) => Promise<any>
 * @return Promise<Array<string>|null|Error>
 */
export const readDirectory = async (
  absPath: string,
  directoryFn: (items: string[]) => Promise<any>,
  itemFn: (item: string, index: number, items: string[]) => Promise<any>
): Promise<string[]|null|Error> => {
  const runItemsRead = async (items: string[]): Promise<string[]|Error> => {
    try {
      if (!_.isNil(directoryFn)) await directoryFn(items)
      if (!_.isNil(itemFn)) {
        for (let i = 0; i < items.length; i++) {
          await itemFn(items[i], i, items)
        }
      }
      return items
    } catch (error) {
      return error
    }
  }

  return await new Promise<string[]|null|Error>((resolve, reject) => {
    fs.readdir(absPath, (error, items) => {
      if (!_.isNil(error)) {
        reject(error)
        return
      }
      if (_.isNil(items)) {
        resolve(null)
        return
      }
      runItemsRead(items).then(resolve).catch(reject)
    })
  })
}

/**
 * Get a unique directory name for a new potential directory inside parent path.
 * Return null when it is not possible (e.g. after many attempts)
 * @param parentPath string
 * @param directoryName string
 * @param attempts number (-1 for infinite)
 * @return Promise<string|null>
 */
export const uniqueDirectoryName = async (parentPath: string, directoryName: string, attempts: number = 1000): Promise<string|null> => {
  let testDestinationPath = path.join(parentPath, directoryName)
  let i = Math.min(1, attempts); let uniqueDirName
  while (await directoryExists(testDestinationPath) && (i === -1 || i < attempts)) {
    uniqueDirName = `${directoryName}_${i}`
    testDestinationPath = path.join(parentPath, uniqueDirName)
    i++
  }
  if (i >= attempts && attempts !== -1) return null
  return uniqueDirName
}
