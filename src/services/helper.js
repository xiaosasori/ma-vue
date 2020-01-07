export function nthIndex (str, key, n) {
  let i = -1
  while (n-- && i++ < str.length) {
    i = str.indexOf(key, i)
    if (i < 0) break
  }
  return i
}

export function preventNonNumericalInput (e) {
  e = e || window.event
  let charCode = (typeof e.which === 'undefined') ? e.keyCode : e.which
  let charStr = String.fromCharCode(charCode)

  if (!charStr.match(/^[0-9]+$/)) {
    e.preventDefault()
  }
}

export function arrayContainsArray (superset, subset) {
  if (subset.length === 0) {
    return false
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0)
  })
}

export function isObjectsEqualWithProps (o1, o2, props) {
  for (let prop of props) {
    if (o1[prop] !== o2[prop]) {
      return false
    }
  }
  return true
}