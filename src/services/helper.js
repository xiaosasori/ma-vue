export function nthIndex (str, key, n) {
  let i = -1
  while (n-- && i++ < str.length) {
    i = str.indexOf(key, i)
    if (i < 0) break
  }
  return i
}