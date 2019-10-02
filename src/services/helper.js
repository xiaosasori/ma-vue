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