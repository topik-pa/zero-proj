// import api from './api.js'

import mainMenu from '../components/shared/header/main-menu/main-menu.js'
import cookieLayer from '../components/shared/cookie_layer/cookie_layer.js'
import gotoTop from '../components/shared/goto_top/goto_top.js'

import home from '../views/home.js'
import users from '../views/users/users.js'
import privacy from '../views/privacy/privacy.js'
import contatti from '../views/contatti/contatti.js'
import err404 from '../views/404/404.js'

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

mainMenu.toggleMobileMenu()
cookieLayer.init()
gotoTop.init()

goToHash()

if (document.querySelector('body#home')) {
  home.init()
}
if (document.querySelector('body#users')) {
  users.init()
}
if (document.querySelector('body#privacy')) {
  privacy.init()
}
if (document.querySelector('body#contacts')) {
  contatti.init()
}
if (document.querySelector('body#err404')) {
  err404.init()
}

