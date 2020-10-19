/**
 * Exit from current process with a message and an additional data (e.g. the error object)
 * @param message string
 * @param data any
 */
export const EXIT = (message?: string, data?: any): undefined => {
  if (message !== undefined) console.log('\n' + message)
  if (data !== undefined) console.log(data)
  console.log('Process terminated.\n')
  process.exit(0)
}
