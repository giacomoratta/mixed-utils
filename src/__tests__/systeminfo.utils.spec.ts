import { platform } from 'os'
import * as libUtils from '../systemInfo.utils'

describe('systemInfo.utils', function () {
  describe('platform information', function () {
    it('should detect current platform', function () {
      const currentPlatform = platform()

      if (currentPlatform === 'linux') {
        expect(libUtils.isLinux()).toBeTruthy()
        expect(libUtils.isMacOS()).toBeFalsy()
        expect(libUtils.isWindows()).toBeFalsy()
      } else if (currentPlatform === 'darwin') {
        expect(libUtils.isLinux()).toBeFalsy()
        expect(libUtils.isMacOS()).toBeFalsy()
        expect(libUtils.isWindows()).toBeFalsy()
      } else if (currentPlatform === 'win32') {
        expect(libUtils.isLinux()).toBeFalsy()
        expect(libUtils.isMacOS()).toBeFalsy()
        expect(libUtils.isWindows()).toBeTruthy()
      }
    })
  })
})
