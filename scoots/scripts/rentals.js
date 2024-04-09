import { toTitleCase, itemComponent, generateTextElement, generateImage, apiFetch } from './helpers.js'

const url = 'https://vicentemferrer.github.io/wdd230/scoots/data/rentals.json'

const nameSetter = (type, brand, model, features) => `${brand} ${model}${type !== 'jeep' ? ` ${toTitleCase(type, type === 'atv')}` : ` - ${features?.doors} doors`}`

const featuresSection = (features) => {
  const process = (...featuresArr) => {
    let ul = '<ul>'

    const dict = {
      'doors': 'doors',
      'cc': 'engine capacity',
      'ac': 'air conditioning'
    }

    featuresArr.forEach(([key, value]) => {
      if (!(key in dict) || !value) return

      const li = `<li>${typeof value !== 'boolean' ? key === 'cc' ? `${value}${key} (${dict[key]})` : `${value} ${dict[key]}` : toTitleCase(dict[key])}</li>`

      ul += li
    })

    ul += '</ul>'

    return ul
  }

  return Object.keys(features).length > 0 ? itemComponent('features', Object.entries(features), process, true) : generateTextElement('p', '')
}

const generateTableRow = (cellType, contentArr, colspan = [], rowspan = []) => {
  const tr = document.createElement('tr')

  contentArr.forEach((text, i) => {
    const cell = document.createElement(cellType)

    cell.textContent = text

    if (colspan.length > 0) cell.setAttribute('colspan', colspan[i])
    if (rowspan.length > 0) cell.setAttribute('rowspan', rowspan[i])

    tr.appendChild(cell)
  })

  return tr
}

const setColgroups = (groupsSpan = [], groupClass = []) => {
  const colgroup = document.createElement('colgroup')

  groupsSpan.forEach((group, i) => {
    const col = document.createElement('col')

    col.setAttribute('span', group)

    if (groupClass.length > 0) col.classList.add(groupClass[i])

    colgroup.appendChild(col)
  })

  return colgroup
}

const rentalRow = ({ type, brand, model, features, pricing: { reservation, walkIn }, maxPersons }) => {
  const name = nameSetter(type, brand, model, features)

  const priceParser = price => `$${price.toFixed(2)}`

  return generateTableRow('td', [name, maxPersons, priceParser(reservation.half), priceParser(reservation.full), priceParser(walkIn.half), priceParser(walkIn.full)])
}

const pricingTable = (rentals) => {
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')

  thead.appendChild(generateTableRow('th', ['', 'Reservation', 'Walk-In'], [2, 2, 2]))
  thead.appendChild(generateTableRow('th', ['Rental Type', 'Max. Persons', 'Half Day (3 hrs)', 'Full Day', 'Half Day (3 hrs)', 'Full Day']))

  rentals.forEach(rental => {
    tbody.appendChild(rentalRow(rental))
  })


  table.appendChild(setColgroups([2, 2, 2], ['detail', 'reservation', 'walkIn']))
  table.appendChild(thead)
  table.appendChild(tbody)

  return table
}

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

function displayRentals(rentals) {
  const rentalsSection = document.getElementById('rentals')
  const pricingSection = document.getElementById('pricing')

  rentals.forEach(rental => rentalsSection.appendChild(rentalCard(rental)))

  pricingSection.appendChild(pricingTable(rentals))
}

apiFetch(url, displayRentals)