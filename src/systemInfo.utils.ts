import { platform, EOL } from 'os'

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

module.exports.EOL = EOL

module.exports.isWindows = () => {
  return platform() === 'win32'
}

module.exports.isMacOS = () => {
  return platform() === 'darwin'
}

module.exports.isLinux = () => {
  return platform() === 'linux'
}
