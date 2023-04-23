const toggleDarkMode = () => {
  const $toggledark = document.getElementById('toggle-dark')
  // Toggle between dark mode
  function toggleDarkMode () {
    document.documentElement.classList.toggle('dark')
  }

  $toggledark.addEventListener('click', () => {
    toggleDarkMode()
  })
}

const header = {
  init: () => {
    toggleDarkMode()
  }
}

export default header
