/**
 * Get a resolved promise
 * @param data any
 * @return Promise<any>
 */
export const resolvedPromise = async (data: any): Promise<any> => {
  return await new Promise(function (resolve) { resolve(data) })
}
