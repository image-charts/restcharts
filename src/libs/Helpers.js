export function flatten(ary) {
  const nestedFlattened = ary.map(v => {
    if (v instanceof Array)
      return flatten(v)
    return v
  })
  return [].concat.apply([], nestedFlattened)
}

export function createNestedArrays(ary, length=10) {
  const aryCopy   = ary.slice(0)
  let nestedArys  = []

  while (aryCopy.length > 0) {
    nestedArys.push(aryCopy.splice(0, length))
  }
  return nestedArys
}
