import * as path from 'path'

export const isAbsolutePath = (absPath: string): boolean => {
  if (typeof absPath !== 'string' || absPath.length === 0) return false
  return path.normalize(absPath + path.sep) === path.normalize(path.resolve(absPath) + path.sep)
}

export const isRelativePath = (relPath: string): boolean => {
  if (typeof relPath !== 'string' || relPath.length === 0) return false
  return !isAbsolutePath(relPath)
}

export const setAsAbsPath = (relPath: string, isFile: boolean, rootPath: string): string => {
  relPath = relPath.trim()
  if (typeof rootPath !== 'string') return path.resolve(relPath) + (!isFile ? path.sep : '')
  return path.join(rootPath, relPath, (!isFile ? path.sep : ''))
}

export const pathsAreEqual = (path1: string, path2: string): boolean => {
  path1 = path.join(path1, path.sep).toLowerCase()
  path2 = path.join(path2, path.sep).toLowerCase()
  if (path1.length > path2.length) return path1.endsWith(path2)
  else return path2.endsWith(path1)
}

export const pathChangeFilename = (originalPath: string, changeFn: (fileName: string, pathInfo: object) => string): string => {
  const pathInfo = path.parse(originalPath)
  const fileName = changeFn(pathInfo.name, pathInfo)
  return path.join(pathInfo.dir, fileName + pathInfo.ext)
}

export const pathChangeDirname = (originalPath: string, changeFn: (fileName: string, pathInfo: object) => string): string => {
  const pathInfo = path.parse(originalPath)
  const directoryName = changeFn(pathInfo.base, pathInfo)
  return path.join(pathInfo.dir, directoryName)
}
