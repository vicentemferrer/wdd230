const navElement = document.querySelector('nav')
const hamburgerMenu = document.getElementById('menu')
const navigation = document.getElementById('nav-links')

function toggleNavLinks(navMode) {
  if (navMode === 'close') {
    navigation.classList.remove('open')
    hamburgerMenu.classList.remove('open')
  }

  if (navMode === 'open' && window.innerWidth < 500) {
    document.querySelector('body').appendChild(navigation)
  } else {
    navElement.appendChild(navigation)
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