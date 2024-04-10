const redirectManager = fromWhere => {
  localStorage.setItem('location', fromWhere)
  window.location.href = "http://vicentemferrer.github.io/wdd230/scoots/thankyou.html"
}

document.addEventListener('submit', event => {
  event.preventDefault()

  redirectManager(window.location.pathname.split('/').filter(fr => fr !== '')[2])
})