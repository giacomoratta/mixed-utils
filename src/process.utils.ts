/**
 * Exit from current process with a message and an additional data (e.g. the error object)
 * @param message string
 * @param data any
 */
module.exports.EXIT = (message?: string, data?: any) => {
  if (message) console.log('\n' + message)
  if (data) console.log(data)
  console.log('Process terminated.\n')
  process.exit(0)
}
