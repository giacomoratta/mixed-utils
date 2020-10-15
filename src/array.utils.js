const libUtils = {}

libUtils.sortFilesArray = (array) => {
  array.sort(function (a, b) {
    const aName = a.toLowerCase()
    const bName = b.toLowerCase()
    if (aName < bName) return -1
    if (aName > bName) return 1
    return 0
  })
  return array
}

libUtils.sortParallelArrays = (array, compareFN, swapFn) => {
  if (!compareFN) compareFN = function () {}
  if (!swapFn) swapFn = function () {}
  for (let i = 0, j = 0, tmp = null; i < array.length - 1; i++) {
    for (j = i + 1; j < array.length; j++) {
      if (compareFN(array[i], array[j]) > 0) {
        tmp = array[i]
        array[i] = array[j]
        array[j] = tmp
        swapFn(i /* old index */, j /* new index */, array[i], array[j])
      }
    }
  }
  return array
}

libUtils.sortParallelFileArrays = (array, swapFn) => {
  this.sortParallelArrays(array, function (a, b) {
    const aName = a.toLowerCase()
    const bName = b.toLowerCase()
    if (aName < bName) return -1
    if (aName > bName) return 1
    return 0
  }, swapFn)
  return array
}

libUtils.searchInObjectArray = (array, key, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) return true
  }
  return false
}

libUtils.shuffleArray = (array) => {
  let cindex = array.length; let tempv; let rindex
  // While there remain elements to shuffle...
  while (cindex !== 0) {
    // Pick a remaining element...
    rindex = Math.floor(Math.random() * cindex)
    cindex -= 1
    // And swap it with the current element.
    tempv = array[cindex]
    array[cindex] = array[rindex]
    array[rindex] = tempv
  }
  return array
}

module.exports = libUtils
