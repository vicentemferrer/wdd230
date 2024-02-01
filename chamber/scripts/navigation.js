const hamburgerMenu = document.getElementById('menu')
const navigation = document.querySelector('.nav-links')

function toggleNavLinks() {
  if (navigation.classList.contains('open') && window.innerWidth < 500) {
    document.body.appendChild(navigation)
  } else {
    document.querySelector('nav').appendChild(navigation)
  }
}

window.addEventListener('resize', () => toggleNavLinks())

hamburgerMenu.addEventListener('click', () => {
  navigation.classList.toggle('open')
  toggleNavLinks()
  hamburgerMenu.classList.toggle('open')
})