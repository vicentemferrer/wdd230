import { toTitleCase, itemComponent, generateTextElement, generateImage, divGenerator, apiFetch } from './helpers.js'

const url = 'https://vicentemferrer.github.io/wdd230/scoots/data/rentals.json'

// const processFeatures = (type, features) => {
//   const dict = {
//     'doors': 'doors',
//     'cc': 'engine capacity',
//     'ac': 'air conditioning'
//   }

//   const container = divGenerator('container')

//   if (type === 'scooter') {
//     container.appendChild(itemComponent(dict['cc'], `${features?.cc}cc`))
//   } else if (type === 'jeep') {
//     const ul = document.createElement('ul')

//     Object.entries(features).forEach(([key, value]) => {
//       if (!(key in dict)) return

//       const li = document.createElement('li')

//       li.textContent = typeof value !== 'boolean' ? `${value} ${dict[key]}` : value ? toTitleCase(dict[key]) : ''

//       ul.appendChild(li)
//     })

//     container.appendChild(ul)
//   }

//   return container
// }

const rentalCard = ({ type, brand, model, features, maxPersons, imageURL }) => {
  const itemName = `${brand} ${model}${type === 'scooter' ? ` (${features?.cc}cc)` : type === 'jeep' ? ` (${features?.doors} doors)` : ''}`

  const article = document.createElement('article')
  const img = generateImage(itemName, imageURL)
  const h3 = generateTextElement('h3', itemName)
  const detail = generateTextElement('p', `${maxPersons} person max.`)

  article.appendChild(img)
  article.appendChild(h3)
  article.appendChild(detail)

  return article
}

function displayRentals({ rentals }) {
  const carousel = document.querySelector('.carousel')

  rentals.forEach(rental => carousel.appendChild(rentalCard(rental)))
}

apiFetch(url, displayRentals)