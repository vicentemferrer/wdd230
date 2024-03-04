const cards = document.getElementById('cards')

const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json'

const prophetComponent = (name, lname, imagesrc, birth, death) => {
  let card = document.createElement('section')
  let fullName = document.createElement('h2')
  let portrait = document.createElement('img')

  fullName.textContent = `${name} ${lname}`
  portrait.setAttribute('src', imagesrc)
  portrait.setAttribute('alt', `Portrait of ${name} ${lname}`)
  portrait.setAttribute('data-birth', birth)
  portrait.setAttribute('data-death', death)
  portrait.setAttribute('loading', 'lazy')
  portrait.setAttribute('width', '340')
  portrait.setAttribute('height', '440')

  card.appendChild(fullName)
  card.appendChild(portrait)

  cards.appendChild(card)
}

const displayProphet = ({ name, lastname, imageurl, birthdate, death }) => prophetComponent(name, lastname, imageurl, birthdate, death)

async function getProphetData() {
  const response = await fetch(url)
  const { prophets } = await response.json()

  prophets.forEach(displayProphet);
}

getProphetData()
