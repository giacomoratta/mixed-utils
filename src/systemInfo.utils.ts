import { platform } from 'os'

// https://nodejs.org/dist/latest-v8.x/docs/api/os.html#os_os_platform
/*
os.EOL
os.arch()
os.cpus()
os.endianness()
os.freemem()
os.homedir()
os.hostname()
os.loadavg()
os.networkInterfaces()
os.platform()
os.release()
os.tmpdir()
os.totalmem()
os.type()
os.uptime()
*/

export const isWindows = (): boolean => {
  return platform() === 'win32'
}

export const isMacOS = (): boolean => {
  return platform() === 'darwin'
}

export const isLinux = (): boolean => {
  return platform() === 'linux'
}
