const hamburgerMenu = document.getElementById('menu')
const navElement = document.querySelector('nav')
const navigation = document.getElementById('nav-links')
const mode = document.querySelector('#mode')
const main = document.querySelector('body')

function toggleNavLinks(navMode) {
  if (navMode === 'close') {
    navigation.classList.remove('open')
    hamburgerMenu.classList.remove('open')
  }

  if (navMode === 'open' && window.innerWidth < 500) {
    document.body.appendChild(navigation)
  } else {
    navElement.appendChild(navigation)
    navElement.appendChild(mode)
  }
}

window.addEventListener('resize', () => {
  toggleNavLinks('close')
})

hamburgerMenu.addEventListener('click', () => {
  toggleNavLinks('open')
  navigation.classList.toggle('open')
  hamburgerMenu.classList.toggle('open')
})

mode.addEventListener('click', () => {
  main.classList.toggle('dark')
  mode.classList.toggle('dark')
})