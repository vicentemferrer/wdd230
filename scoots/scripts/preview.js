import { randInt, generateTextElement, generateImage, apiFetch } from './helpers.js'

const url = 'https://vicentemferrer.github.io/wdd230/scoots/data/rentals.json'

const filterPreviews = previews => {
  const shallow = [...previews]

  while (shallow.length > 3) {
    shallow.splice(randInt(shallow.length), 1)
  }

  return shallow
}

const previewCard = ({ type, brand, model, features, maxPersons, imageURL }) => {
  const itemName = `${brand} ${model}${type === 'scooter' ? ` (${features?.cc}cc)` : type === 'jeep' ? ` (${features?.doors} doors)` : ''}`

  const article = document.createElement('article')
  const img = generateImage(itemName, imageURL)
  const h3 = generateTextElement('h3', itemName)
  const detail = generateTextElement('p', `${maxPersons} persons max.`)

  article.appendChild(img)
  article.appendChild(h3)
  article.appendChild(detail)

  article.classList.add('card')

  return article
}

function displayPreview(rentals) {
  const carousel = document.querySelector('.carousel')

  filterPreviews(rentals).forEach(rental => carousel.appendChild(previewCard(rental)))
}

apiFetch(url, displayPreview)