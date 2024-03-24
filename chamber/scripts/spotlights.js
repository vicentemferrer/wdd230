import { toTitleCase, randInt, generateImage, divGenerator, apiFetch } from './helpers.js'

const membersURL = 'https://vicentemferrer.github.io/wdd230/chamber/data/members.json'

const filterSpotlights = memberList => {
  const byLevel = memberList.filter(({ membership }) => membership === 'gold' || membership === 'silver')

  while (byLevel.length > 3) {
    byLevel.splice(randInt(byLevel.length), 1)
  }

  return byLevel
}

const phoneDepurer = phone => phone.split(/[\s\+\-]/).filter(fr => fr !== '').join('')

const whatsappLink = phone => `https://wa.me/${phoneDepurer(phone)}`

const mapsLink = address => `https://www.google.com.ar/maps/place/${address}`

const iconElement = classList => {
  const icon = document.createElement('i')

  icon.setAttribute('class', classList)

  return icon
}

const linkComponent = (url, iconClassList) => {
  const linkElement = document.createElement('a')

  linkElement.setAttribute('href', url)
  linkElement.setAttribute('target', '_blank')

  linkElement.appendChild(iconElement(iconClassList))

  return linkElement
}

const spotlightComponent = ({ name, address, phone, imageURL, service }) => {
  const article = document.createElement('article')
  const h3 = document.createElement('h3')
  const p = document.createElement('p')

  const img = generateImage(name, imageURL)

  h3.textContent = name
  p.innerHTML = `<small>${toTitleCase(service)}</small>`

  const rowPresentation = divGenerator('row')
  const infoLinks = divGenerator('social')
  const container = divGenerator('container')

  const links = [phone && linkComponent(whatsappLink(phone), 'fa-brands fa-square-whatsapp'), address && linkComponent(mapsLink(address), 'fa-solid fa-map-location-dot')]

  container.appendChild(h3)
  container.appendChild(p)
  rowPresentation.appendChild(img)
  rowPresentation.appendChild(container)

  links.forEach(link => {
    if (link) infoLinks.appendChild(link)
  })

  article.appendChild(rowPresentation)
  article.appendChild(infoLinks)

  return article
}

function displaySpotlights(members) {
  const spotlightsSection = document.querySelector('.spotlights .row')

  const spotlights = filterSpotlights(members)

  spotlights.forEach(spotlight => {
    spotlightsSection.appendChild(spotlightComponent(spotlight))
  })
}

apiFetch(membersURL, displaySpotlights)