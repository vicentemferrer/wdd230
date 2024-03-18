import { toTitleCase, itemComponent, apiFetch } from './helpers.js'

const membersURL = 'https://vicentemferrer.github.io/wdd230/chamber/data/members.json'

const socialIconElement = (type, isWebsite = false) => {
  const icon = document.createElement('i')
  const iconClassList = !isWebsite ? `fa-brands fa-${type}` : 'fa-solid fa-globe'

  icon.setAttribute('class', iconClassList)

  return icon
}

const socialLinkComponent = ({ url, type }) => {
  const linkElement = document.createElement('a')

  linkElement.setAttribute('href', url)
  linkElement.setAttribute('target', '_blank')

  linkElement.appendChild(socialIconElement(type, type === 'website'))

  return linkElement
}

const generateImage = (company, imageURL) => {
  const img = document.createElement('img')

  img.setAttribute('src', imageURL)
  img.setAttribute('alt', `${company} Logo`)
  img.setAttribute('width', 150)
  img.setAttribute('height', 150)
  img.setAttribute('loading', 'lazy')

  return img
}

const generateContact = (address, phone) => {
  const contactElement = document.createElement('address')

  contactElement.appendChild(itemComponent('phone', phone || '---'))
  contactElement.appendChild(itemComponent('address', address))

  return contactElement
}

const generateInfo = (membership, category, service) => {
  const infoElement = document.createElement('div')

  infoElement.appendChild(itemComponent('category', category, toTitleCase, true))
  infoElement.appendChild(itemComponent('service', service, toTitleCase, true))
  infoElement.appendChild(itemComponent('membership level', membership, toTitleCase, true))

  return infoElement
}

const memberComponent = ({ name, address, phone, socialLinks, imageURL, membership, category, service }) => {
  const memberCard = document.createElement('section')
  const memberName = document.createElement('h3')
  const memberArticle = document.createElement('article')
  const memberSocial = document.createElement('div')

  const memberLogo = generateImage(name, imageURL)
  const memberContact = generateContact(address, phone)
  const memberInfo = generateInfo(membership, category, service)

  memberName.textContent = name

  const socialLinksComposed = socialLinks.map(link => socialLinkComponent(link))

  socialLinksComposed.forEach(link => memberSocial.appendChild(link))

  memberArticle.appendChild(memberInfo)
  memberArticle.appendChild(memberContact)

  memberCard.appendChild(memberLogo)
  memberCard.appendChild(memberName)
  memberCard.appendChild(memberArticle)
  memberCard.appendChild(memberSocial)

  memberCard.setAttribute('class', 'card')

  return memberCard
}

function displayMembers(members) {
  const membersContainer = document.getElementById('members')

  members.forEach(member => {
    const memberElement = memberComponent(member)

    membersContainer.appendChild(memberElement)
  })
}

apiFetch(membersURL, displayMembers)