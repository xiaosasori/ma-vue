import { url } from "inspector";

function isInViewport (el) {
  const distance = el.getBoundingClientRect()
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function trackIntersectionObserver () {
  let visibility = 'invisible';
  const target = document.querySelector('.target');
  const statusBar = document.querySelector('.status');


  const io = new IntersectionObserver(entries => {
    if(entries[0].intersectionRatio !== 0) {
      visibility = 'visible';
    } else {
      visibility = 'invisible';
    }
    updateStatus(visibility);
  })

  io.observe(target);

  const updateStatus = (visibilityStatus) => {
    statusBar.textContent = `Target: ${visibilityStatus}`;
    statusBar.className = `status status--${visibilityStatus}`;
  }
}

function urlQueryString () {
  // asuming query is '?post=1234&action=edit'
  const urlParams = new URLSearchParams(window.location.search)
  urlParams.has('post') // true
  urlParams.get('action') // 'edit'
  urlParams.getAll('action') // ['edit']
  urlParams.toString() // ?post=1234&action=edit
  urlParams.append('active', '1') // ?post=1234&action=edit&active=1
}

function swap () {
  // for integers
  let a = 1, b = 2
  // a = a + b
  // b = a - b
  // a = a - b
  [a, b] = [b, a]
  console.log(a, b)

  let one = 'first', two = 'second', three = 'third'
  [one, two, three] = [two, three, one]
  console.log(one, two, three)
}

function ready (callback) {
  // in case the document is already rendered
  if (document.readyState !== 'loading') callback()
  // modern browsers
  else if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', callback)
  // IE <= 8
  else document.attachEvent('onreadystatechange', function() {
    if (document.readyState === 'complete') callback()
  })
}

function replace () {
  let text = 'This is very awesome'
  console.log(text.replace('very', '$& $&'))
  console.log(text.replace('very', '$`'))
  console.log(text.replace('very', '$\''))
  let name = 'Simple JS'
  const re = /(\w+)(\s)(\w+)/
  name = name.replace(re, '0:$0 1:$1 2:$2 3:$3')
  console.log(name)
}

function isObject (obj) {
  return typeof obj === 'object' &&
    obj !== null &&
    Object.prototype.toString.call(obj) !== '[object Array]'
  // isObject({}) // true
  // isObject([]) // false
  // isObject(() => ({})) // false
  // isObject(null) // false
}

// benchmark
function checkPerformance (method) {
  const t0 = performance.now()
  method()
  const t1 = performance.now()
  console.log(`Call method took ${t1 - t0} miliseconds`)
}
console.time('Time')
for(let i =0;i< 10;i++) console.log(i)
console.timeEnd('Time')
// benchmark

// ES2018 {named capture groups}
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
const {year, month, day} = re.exec('2019-10-11').groups
console.log(year, month, day)

// padStart string
const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

// const arr = [4,1,2,6,83,6]
const arr = [[4,1,2],[6,83,6]]
console.log(arr.entries()) // {}
for (let [index, val] of arr.entries()) {
  console.log(index, val)
}

// add conditional properties
const user = {
  name: 'ma'
}
const auToken = ''
const userWithAuth = {
  ...user,
  ...(auToken && {auToken})
}
console.log(userWithAuth)

// rename object properties
const renameObjectKey = ({firstName, ...user}) => ({name: firstName, ...user})

/** these calls are independent
 *  so using await for each of theme
 *  isn't a good choice
 */
const makeSmoothie = async() => {
  const strawBerry = await getFruit('s')
  const grapes = await getFruit('g')
  return [strawBerry, grapes]
}

/** these await calls run concurrently
 *  so it'll be faster
 */
const makeSmoothie2 = async() => {
  const strawBerry = getFruit('s')
  const grapes = getFruit('g')
  const smoothie = await Promise.all([strawBerry, grapes])
  return smoothie
}

// deep copy nest object prop - JSON
const o1 = {name: 1, age: 2, location: {address: 'NY'}}
const o2 = {...o1}
const o3 = JSON.parse(JSON.stringify(o1))
const o4 = {}
Object.assign(o4, o1)

o1.name = 3
o1.location.address = 'LA'
console.log(o2)
console.log(o3)
console.log(o4)

// remove duplicates from an array
const dupArr = [9,10,1,2,3,1,2,6,8,4,2]
const noDup = [...new Set(dupArr)]
console.log(noDup)
// find lastIndex
const lastIndex = this.getStock.map(stock => !!stock.id).lastIndexOf(true)

// split by duplicate values
const input = [
  {index: 0, value: 3},
  {index: 0, value: 3},
  {index: 0, value: 3},
  {index: 1, value: 3},
  {index: 1, value: 3},
  {index: 2, value: 3},
  {index: 2, value: 3},
  {index: 0, value: 3}
];

let obj = input.reduce((res, curr) =>
{
    if (res[curr.index])
        res[curr.index].push(curr);
    else
        Object.assign(res, {[curr.index]: [curr]});

    return res;
}, {});

console.log(obj);
// separate the objects by streaks that have equal indexes you can do this

const input = [
  {index: 0, value: 3},
  {index: 0, value: 3},
  {index: 0, value: 3},
  {index: 1, value: 3},
  {index: 1, value: 3},
  {index: 2, value: 3},
  {index: 2, value: 3},
  {index: 0, value: 3},
  {index: 0, value: 3},
  {index: 0, value: 3},
  {index: 2, value: 3},
  {index: 2, value: 3}
];

let obj = input.reduce((res, curr) =>
{
    if (curr.index === res.last)
    {
        res.r[res.idx - 1].push(curr);
        return res;
    }

    Object.assign(res.r, {[res.idx]: [curr]});
    res.last = curr.index;
    res.idx++;
    return res;

}, {r: {}, idx: 0, last: null});

console.log(obj.r);

// Memoize dec/12th http://bit.ly/2R5g1Hb
let output = document.querySelector('.output');

const cache = {};
function memoize(method) {
  return async function () {
    let args = JSON.stringify(arguments);
    cache[args] = cache[args] || method.apply(this, arguments);
    return cache[args];
  }
}

const getUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const userData = await response.json();
  return userData;
}

const userIds = [1, 1, 2, 2, 3, 4];

userIds.forEach(async userId => {
  let memoizedgetUser = memoize(getUser);
  const userData = await memoizedgetUser(userId)
  output.innerHTML += `user: ${userData.name} <br/><br/>`
})

// JSON.stringify Oct/20th
const user = {username: 'Ajax', email: 'simple@js.com', password: 'hashme'}
const userString = JSON.stringify(user, ['username', 'email'])
// Output: {"username":"Ajax","email":"simple@js.com"}

// JSON.stringify use when object has Sets, WeakSets, Maps, WeakMaps Oct/27th
const user = {
  name: 'Eren',
  friends: new Set(['Mikasa', 'Armin', 'Levi'])
}
console.log(JSON.stringify(user)) // {"username":"Ajax","email":"simple@js.com"}
const properString = JSON.stringify(user, (key, value) => {
  return value instanceof Set ? [...value] : value
}) // {"name":"Eren","friends":["Mikasa","Armin","Levi"]}

// Dynamic import()
import('module/path').then(module => {// Do something})
// OR
let module = await import('module/path')