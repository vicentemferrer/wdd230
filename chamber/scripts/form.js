const dateInput = document.getElementById('date')
const membershipTypes = document.querySelectorAll('input[type=radio]')
const membershipArticle = document.querySelector('#membershipInfo article')

const memberships = {
  'non-profit': {
    'membership': 'Non-Profit',
    'fee': 100,
    'benefits': [
      'Access to monthly networking events.',
      'Free admission to one training workshop per year.',
      'Listing in the chamber\'s online directory'
    ]
  },
  'bronze': {
    'membership': 'Bronze',
    'fee': 200,
    'benefits': [
      'All the benefits of Non-profit level.',
      '10% discount on all chamber events and services.',
      'One spotlight feature on the chamber\'s home page per year.'
    ]
  },
  'silver': {
    'membership': 'Silver',
    'fee': 400,
    'benefits': [
      'All the benefits of Bronze level.',
      '20% discount on all chamber events and services.',
      'Two spotlight features on the chamber\'s home page per year.',
      'One free banner ad on the chamber\'s website per month.',
      'One free ticket to the chamber\'s annual gala.'
    ]
  },
  'gold': {
    'membership': 'Gold',
    'fee': 800,
    'benefits': [
      'All the benefits of Silver level.',
      '30% discount on all chamber events and services.',
      'Four spotlight features on the chamber\'s home page per year.',
      'Two free banner ads on the chamber\'s website per month.',
      'Two free tickets to the chamber\'s annual gala.'
    ]
  }
}

const membershipSelector = (key) => memberships[key.toLowerCase()]

function propertyComponent(name, value, isList = false) {
  const pElement = document.createElement('p')
  const strongElement = document.createElement('strong')

  strongElement.textContent = `${name}:`
  pElement.appendChild(strongElement)

  if (!isList) {
    pElement.innerHTML += ` ${value}`
  } else {
    const ulElement = document.createElement('ul')
    value.forEach(entry => {
      const li = document.createElement('li')
      li.textContent = entry
      ulElement.appendChild(li)
    })

    pElement.appendChild(ulElement)
  }

  return pElement
}

function printDetail(key, articleElement) {
  articleElement.innerHTML = ''

  const membership = membershipSelector(key)

  Object.entries(membership).forEach(([key, content]) => {
    const name = (key === 'membership') ? 'Level' : (key === 'fee') ? 'Annual fee / Monthly fee' : 'Benefits'
    const value = (key === 'fee') ? `$${content.toFixed(2)} / $${(content / 12).toFixed(2)}` : content
    const isList = key === 'benefits'

    const propElement = propertyComponent(name, value, isList)

    articleElement.appendChild(propElement)
  })
}

dateInput.value = Date.now()

membershipTypes.forEach(type => type.addEventListener('input', (event) => printDetail(event.target.value, membershipArticle)))