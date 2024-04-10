import { divGenerator, generateTextElement } from "./helpers.js"

export const bannerComponent = temp => {
  const banner = divGenerator('kufam', 'banner')
  const button = document.createElement('button')
  const paragraph = generateTextElement('p', `Today we expect to have ${temp.toFixed(0)}°F. Enjoy, and be careful!`)

  button.textContent = '✔️'

  button.addEventListener('click', () => {
    const body = document.querySelector('body')

    body.removeChild(banner)
  })

  banner.appendChild(button)
  banner.appendChild(paragraph)

  return banner
}