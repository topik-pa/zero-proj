// import api from './api.js'

import mainMenu from '../components/shared/header/main-menu/main-menu.js'
import cookieLayer from '../components/shared/cookie_layer/cookie_layer.js'
import gotoTop from '../components/shared/goto_top/goto_top.js'

mainMenu.toggleMobileMenu()
cookieLayer.init()
gotoTop.init()

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
if (document.querySelector('body#privacy')) {
  import('../views/privacy/privacy.js').then((module) => {
    module.privacy.init()
  })
}
if (document.querySelector('body#contacts')) {
  import('../views/contacts/contacts.js').then((module) => {
    module.contacts.init()
  })
}
if (document.querySelector('body#err404')) {
  import('../views/err404/err404.js').then((module) => {
    module.err404.init()
  })
}

