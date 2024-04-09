import { toTitleCase, itemComponent, generateTextElement, generateImage, apiFetch } from './helpers.js'

const url = 'https://vicentemferrer.github.io/wdd230/scoots/data/rentals.json'

const nameSetter = (type, brand, model, features) => `${brand} ${model}${type !== 'jeep' ? ` ${toTitleCase(type, type === 'atv')}` : ` - ${features?.doors} doors`}`

const rentalCard = ({ type, brand, model, features, imageURL }) => {
  const itemName = nameSetter(type, brand, model, features)

  const article = document.createElement('article')
  const img = generateImage(itemName, '../' + imageURL)
  const h3 = generateTextElement('h3', itemName)
  const detail = featuresSection(features)

  article.appendChild(img)
  article.appendChild(h3)
  article.appendChild(detail)

  article.classList.add('card')

  return article
}

function displayAgreements(rentals) {
  const agreementsSection = document.querySelector('#agreements article')
  const pricingSection = document.getElementById('pricing')

  rentals.forEach(rental => rentalsSection.appendChild(rentalCard(rental)))

  pricingSection.appendChild(pricingTable(rentals))
}

apiFetch(url, displayAgreements)