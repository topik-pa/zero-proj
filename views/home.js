import defaultFunc, { moduleVariable, moduleFunc as moduleF } from '../scripts/module.js'
import Person from '../scripts/personClass.js'

/* Modules */
const jsModules = () => {
  console.log(moduleVariable)
  moduleF()
  defaultFunc()
}

/* Hoisting */
const hoisting = () => {
  functionDeclaration()
  // funcExpression() // can't use before decalration
  const funcExpression = function () {
    console.log('This is a function expression')
  }
  function functionDeclaration () {
    console.log('This is a function declaration')
  }
  funcExpression()
}

/* typeof */
const typeOf = () => {
  const x = 5
  const y = 5.222
  const z = '55555'
  const a = []
  const o = {}
  const f = function () {
    return 'Pippo'
  }
  const b = true
  let u
  const n = null

  console.log(typeof x)
  console.log(typeof y)
  console.log(typeof z)
  console.log(typeof a)
  console.log(typeof o)
  console.log(typeof f)
  console.log(typeof b)
  console.log(typeof u)
  console.log(typeof n)
}

/* DOM traversal and nodelist loop */
const domTraversal = () => {
  console.log('getElementById: ', document.getElementById('es-1'))
  console.log('getElementsByTagName: ', document.getElementsByTagName('main'))
  console.log('getElementsByClassName: ', document.getElementsByClassName('esercizio'))
  console.log('querySelector: ', document.querySelector('h2'))
  console.log('querySelectorAll: ', document.querySelectorAll('h2'))

  const elements = document.querySelectorAll('div')
  for (const elem of elements) {
    elem.classList.add('new-class')
  }
}

/* Events */
const events = () => {
  const $wrap = document.getElementById('es-2')
  const $btn = $wrap.getElementsByTagName('a')[0]
  $btn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(e.target)
    $wrap.classList.toggle('clicked')
  })
}

/* Closure */
const closure = () => {
  const myOuterFunc = function () {
    let x = 0
    const myInnerFunc = function () {
      console.log('x inside closure is: ', x)
      x++
    }
    return myInnerFunc
  }

  const myHandler = myOuterFunc()
  myHandler()
  myHandler()
  myHandler()
  myHandler()
}

/* Remote fetch */
const remoteFetch = () => {
  const $jsonBtn = document.getElementById('fetch-js')
  const $wrapper = document.getElementById('es-4')
  const getRemoteData = function (e) {
    e.preventDefault()
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then((json) => {
        const $ul = document.createElement('ul')
        for (let i = 0; i < json.users.length; i++) {
          const user = json.users[i]
          const $li = document.createElement('li')
          $li.dataset.id = user.id
          $li.innerText = user.firstName
          $ul.append($li)
        }
        $wrapper.append($ul)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  $jsonBtn.addEventListener('click', getRemoteData)
}

/* Classes */
const jsClass = () => {
  const marco = new Person('Marco', 42)
  marco.printData()
}

/* Promise */
const jsPromise = () => {
  const myProm = new Promise((resolve, reject) => {
    let x
    setTimeout(() => {
      x = Math.random()
      if (x < 0.5) {
        reject(new Error('x è troppo basso'))
      } else {
        resolve(x)
      }
    }, 1500)
  })
  myProm
    .then(value => console.log('x è : ', value))
    .catch(err => console.error(err))
    .finally(() => { console.log('Computazione terminata') })
}

/* Async / Await */
const asyncAwait = () => {
  function fToAwait () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('UNOEMEZZO')
        reject(new Error('NOOOO!'))
      }, 2000)
    })
  }
  async function asyncFunc () {
    console.log('UNO')
    try {
      await fToAwait()
    } catch (error) {
      console.error(error)
    }
    console.log('DUE')
  }
  asyncFunc()
}

/* JS Objects */
const obj = () => {
/* Objects */
  const age = 42
  const name = 'Marco'
  const marcoObj = {
    age,
    name,
    [name]: 'This is the name',
    print () {
      console.log(`My name is ${this.name}`)
    }
  }
  console.log(marcoObj)
  marcoObj.print()

  console.log('console.table')
  console.table(marcoObj)

  console.log('in loop')
  for (const x in marcoObj) {
    console.log(x)
  }
  Object.keys(marcoObj).forEach((k, i) => {
    console.log(`La chiave ${i} è denominata: ${k}`)
  })
  Object.values(marcoObj).forEach(function (v, i) {
    console.log(`Il valore ${v} ha chiave: ${i}`)
  })
  console.log('Object.entries')
  Object.entries(marcoObj).forEach((e) => {
    console.log(e)
  })
  console.log('Object.keys')
  console.log(Object.keys(marcoObj))
}

/* Array */
const jsArray = () => {
  const arr = [1, 2, 3, 'quattro', () => { console.log('cinque') }, undefined, { sette: 7 }]
  console.table(arr)
  console.log(Array.isArray(arr))
  console.log(arr.at(3))
  console.log(arr.includes(4))
}

export const home = {
  init: async () => {
    console.log('Home page')

    jsModules()
    hoisting()
    typeOf()
    domTraversal()
    events()
    closure()
    remoteFetch()
    jsClass()
    jsPromise()
    asyncAwait()
    obj()
    jsArray()
  }
}
