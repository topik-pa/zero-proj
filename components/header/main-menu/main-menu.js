let main_menu = {
  toggleMobileMenu: () => {
    let header = document.querySelector('header')
    let menu_icon = header.querySelector('.icon-menu')
    let menu = header.querySelector('nav')
    menu_icon.addEventListener('click', () => {
      menu.classList.toggle('show')
    })
  }
}

export default main_menu