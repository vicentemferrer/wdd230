import { toTitleCase, itemComponent, generateImage, divGenerator, apiFetch } from './helpers.js'

const membersContainer = document.getElementById('members')
const styleToggler = document.querySelector('.controls button')
const togglerIcon = document.querySelector('.controls button i')

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
  linkElement.innerHTML += `<span> ${toTitleCase(type)}</span>`

  return linkElement
}

const generateContact = (address, phone) => {
  const contactElement = document.createElement('address')

  if (phone) contactElement.appendChild(itemComponent('phone', phone))
  contactElement.appendChild(itemComponent('address', address))

  return contactElement
}

const memberComponent = ({ name, address, phone, socialLinks, imageURL }) => {
  const memberCard = document.createElement('section')
  const memberName = document.createElement('h3')
  const memberArticle = document.createElement('article')
  const memberSocial = divGenerator('social')

  const presentation = divGenerator('row')

  const memberLogo = generateImage(name, imageURL)
  const memberContact = generateContact(address, phone)

  memberName.textContent = name

  memberName.setAttribute('id', 'name')

  const socialLinksComposed = socialLinks.map(link => socialLinkComponent(link))

  socialLinksComposed.forEach(link => memberSocial.appendChild(link))

  presentation.appendChild(memberLogo)

  memberArticle.appendChild(memberName)
  memberArticle.appendChild(memberContact)
  memberArticle.appendChild(memberSocial)

  memberCard.appendChild(presentation)
  memberCard.appendChild(memberArticle)

  memberCard.setAttribute('class', 'card')

  return memberCard
}

function displayMembers(members) {
  members.forEach(member => {
    const memberElement = memberComponent(member)

    membersContainer.appendChild(memberElement)
  })
}

apiFetch(membersURL, displayMembers)

styleToggler.addEventListener('click', () => {
  membersContainer.classList.toggle('list')

  if (togglerIcon.classList.contains('fa-list')) {
    togglerIcon.classList.remove('fa-list')
    togglerIcon.classList.add('fa-border-all')
  } else {
    togglerIcon.classList.remove('fa-border-all')
    togglerIcon.classList.add('fa-list')
  }
})