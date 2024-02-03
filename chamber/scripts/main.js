const hamburgerMenu = document.getElementById('menu')
const navigation = document.querySelector('.nav-links')
const mode = document.querySelector('#mode')
const main = document.querySelector('main')

function toggleNavLinks() {
  if (navigation.classList.contains('open') && window.innerWidth < 500) {
    document.body.appendChild(navigation)
  } else {
    document.querySelector('nav').appendChild(navigation)
    document.querySelector('nav').appendChild(mode)
  }
}

window.addEventListener('resize', () => toggleNavLinks())

hamburgerMenu.addEventListener('click', () => {
  navigation.classList.toggle('open')
  toggleNavLinks()
  hamburgerMenu.classList.toggle('open')
})

mode.addEventListener('click', () => {
  main.classList.toggle('dark')
  mode.classList.toggle('dark')
})