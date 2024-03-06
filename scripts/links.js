const linksURL = "https://vicentemferrer.github.io/wdd230/data/links.json"

const linkComponent = ({ url, title }) => {
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', url)

  if (/codepen/.test(url) || !/html/.test(url)) linkElement.setAttribute('target', '_blank')

  linkElement.textContent = title

  return linkElement
}

const spanElement = () => {
  const spanTag = document.createElement('span')
  spanTag.setAttribute('class', 'divider')
  spanTag.textContent = '|'
  return spanTag
}

const lessonComponent = ({ lesson, links }) => {
  const listItemElement = document.createElement('li')
  const linksComposed = links.map(link => linkComponent(link))

  listItemElement.innerHTML = `Week ${lesson}: `

  linksComposed.forEach((link, index, array) => {
    listItemElement.appendChild(link)

    if (index !== array.length - 1) listItemElement.appendChild(spanElement())
  })

  return listItemElement
}

function displayLinks({ lessons }) {
  const lessonList = document.querySelector('section.card ul')

  lessons.forEach(lesson => {
    const lessonElement = lessonComponent(lesson)

    lessonList.appendChild(lessonElement)
  })
}

async function getLinks(url) {
  const response = await fetch(url)
  const data = await response.json()

  displayLinks(data)
}

getLinks(linksURL)