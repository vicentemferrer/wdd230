const hamburgerMenu = document.getElementById('menu')
const navigation = document.querySelector('nav')

hamburgerMenu.addEventListener('click', () => {
  navigation.classList.toggle('open')
  hamburgerMenu.classList.toggle('open')
})