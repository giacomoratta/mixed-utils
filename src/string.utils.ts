export const truncateStart = (string: string, options: { length: number, omission: string }): string => {
  options = {
    length: 30,
    omission: '...',
    ...options
  }
  if (string.length <= options.length) return string
  return options.omission + string.substring(string.length - options.length + 1)
}

export const truncateEnd = (string: string, options: { length: number, omission: string }): string => {
  options = {
    length: 30,
    omission: '...',
    ...options
  }
  if (string.length <= options.length) return string
  return string.substring(0, options.length) + options.omission
}

export const splitAndTrim = (string: string, separator?: string): string[] => {
  const array: string[] = []
  if (separator !== undefined) separator = ','
  string = string.trim()
  const stringPieces = string.split(separator)
  stringPieces.forEach((piece) => {
    piece = piece.trim()
    if (piece.length > 0) array.push(piece)
  })
  return array
}
