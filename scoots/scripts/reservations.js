import { toTitleCase, apiFetch } from './helpers.js'

const url = 'https://vicentemferrer.github.io/wdd230/scoots/data/rentals.json'

const nameSetter = (type, brand, model, features) => `${brand} ${model}${type !== 'jeep' ? ` ${toTitleCase(type, type === 'atv')}` : ` - ${features?.doors} doors`}`

const rentalType = ({ type, brand, model, features }) => {
  const itemName = nameSetter(type, brand, model, features)

  const option = document.createElement('option')

  option.textContent = itemName

  option.setAttribute('value', `${brand}-${model.replace(' ', '-')}${'doors' in features ? `-${features['doors']}` : ''}`.toLowerCase())

  return option
}

function completeOptions(rentals) {
  const select = document.querySelector('select')

  rentals.forEach(rental => select.appendChild(rentalType(rental)))
}

apiFetch(url, completeOptions)