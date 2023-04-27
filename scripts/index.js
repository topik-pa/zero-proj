// import proxyFetch from './proxyFetch.js'

import mainMenu from '../components/shared/header/main-menu/main-menu.js'
import cookieLayer from '../components/shared/cookie_layer/cookie_layer.js'
import gotoTop from '../components/shared/goto_top/goto_top.js'
import header from '../components/shared/header/header.js'

mainMenu.toggleMobileMenu()
cookieLayer.init()
gotoTop.init()
header.init()

// Go to the hash element if present
function goToHash () {
  if (location.hash) {
    const $target = document.getElementById(location.hash.replace('#', ''))
    if ($target) {
      setTimeout(() => {
        $target.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }
}
goToHash()

if (document.querySelector('body#home')) {
  import('../views/home.js').then((module) => {
    module.home.init()
  })
}
if (document.querySelector('body#users')) {
  import('../views/users/users.js').then((module) => {
    module.users.init()
  })
}
if (document.querySelector('body#form')) {
  import('../views/form/form.js').then((module) => {
    module.form.init()
  })
}
if (document.querySelector('body#privacy')) {
  import('../views/privacy/privacy.js').then((module) => {
    module.privacy.init()
  })
}
if (document.querySelector('body#err404')) {
  import('../views/404/404.js').then((module) => {
    module.err404.init()
  })
}

