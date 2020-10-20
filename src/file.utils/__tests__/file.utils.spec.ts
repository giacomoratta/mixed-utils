import * as path from 'path'
import * as fileUtils from '../index'

describe('file.utils: common', function () {
  it('should create standard cross-os absolute paths', function () {
    const pathFile11Std = fileUtils.setAsAbsPath(path.join('file_utils_test_dir', 'directory1', 'file11.txt'), true)
    const pathFile11Local = fileUtils.setAsAbsPath(path.join('.', 'file_utils_test_dir', 'directory1', 'file11.txt'), true)
    const pathDir2Std = fileUtils.setAsAbsPath(path.join('.', 'file_utils_test_dir', 'directory1', 'directory2'))
    const pathDir2Local = fileUtils.setAsAbsPath(path.join('.', 'file_utils_test_dir', 'directory1', 'directory2'))
    const pathFileCustomDir = fileUtils.setAsAbsPath(path.join('.', 'file_utils_test_dir', 'directory1', 'file11.txt'), false, path.join(path.parse(__dirname).root, 'custom', 'dir'))
    const pathDirCustomDir = fileUtils.setAsAbsPath(path.join('.', 'file_utils_test_dir', 'directory1', 'directory2'), false, path.join(path.parse(__dirname).root, 'custom', 'dir'))

    expect(fileUtils.isAbsolutePath(__dirname)).toEqual(true)
    expect(fileUtils.isAbsolutePath(path.join('abc', 'fgh'))).toEqual(false)

    expect(pathFile11Std.startsWith(__dirname.substr(0, 16))).toEqual(true)
    expect(pathFile11Local.startsWith(__dirname.substr(0, 16))).toEqual(true)
    expect(pathDir2Std.startsWith(__dirname.substr(0, 16))).toEqual(true)
    expect(pathDir2Local.startsWith(__dirname.substr(0, 16))).toEqual(true)
    expect(pathFileCustomDir.startsWith(__dirname.substr(0, 8))).toEqual(false)
    expect(pathFileCustomDir.startsWith(path.join(path.parse(__dirname).root, 'custom', 'dir'))).toEqual(true)
    expect(pathDirCustomDir.startsWith(__dirname.substr(0, 8))).toEqual(false)
    expect(pathDirCustomDir.startsWith(path.join(path.parse(__dirname).root, 'custom', 'dir'))).toEqual(true)

    expect(pathFile11Std.startsWith(path.parse(__dirname).root)).toEqual(true)
    expect(pathFile11Std.endsWith(path.sep)).toEqual(false)
    expect(pathFile11Local.startsWith(path.parse(__dirname).root)).toEqual(true)
    expect(pathFile11Local.endsWith(path.sep)).toEqual(false)
    expect(pathDir2Std.startsWith(path.parse(__dirname).root)).toEqual(true)
    expect(pathDir2Std.endsWith(path.sep)).toEqual(true)
    expect(pathDir2Local.startsWith(path.parse(__dirname).root)).toEqual(true)
    expect(pathDir2Local.endsWith(path.sep)).toEqual(true)
    expect(pathFileCustomDir.startsWith(path.parse(__dirname).root)).toEqual(true)
    expect(pathFileCustomDir.endsWith(path.sep)).toEqual(true)
    expect(pathDirCustomDir.startsWith(path.parse(__dirname).root)).toEqual(true)
    expect(pathDirCustomDir.endsWith(path.sep)).toEqual(true)
  })
})
