import { divGenerator, getWeekday } from "./helpers.js"

const bannerComponent = date => {
  const banner = divGenerator('banner')
  const button = document.createElement('button')
  const paragraph = document.createElement('p')

  button.textContent = '✔️'
  paragraph.innerHTML = `<small>You are invited to our weekly meeting ${date === 1 ? `this ${getWeekday(3)}` : date === 2 ? 'TOMORROW' : 'TODAY'} at 7pm!</small>`

  button.addEventListener('click', () => {
    const body = document.querySelector('body')

    body.removeChild(banner)
  })

  banner.appendChild(button)
  banner.appendChild(paragraph)

  return banner
}

function displayBanner() {
  const body = document.querySelector('body')
  const day = new Date().getDay()

  if (day > 0 && day < 4) body.appendChild(bannerComponent(day))
}

displayBanner()