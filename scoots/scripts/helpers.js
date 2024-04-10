const toTitleCase = (text, mayusAll = false) => mayusAll ? text.toUpperCase() : text.split(' ').filter(word => word !== '').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

const urlBuilder = (base, options) => `${base}?${Object.entries(options).map(option => option.join('=')).join('&')}`

const diffCalc = date => {
  const msToDays = 24 * 60 * 60 * 1000
  return (Date.now() - date) / msToDays
}

const randInt = limit => Math.floor(Math.random() * limit)

const itemComponent = (textItem, content, fn = () => { }, isFnNeeded = false) => {
  const paragraph = document.createElement('p')

  const itemContent = isFnNeeded ? Array.isArray(content) ? fn(...content) : fn(content) : content

  paragraph.innerHTML = `<strong>${toTitleCase(textItem)}:</strong> ${itemContent}`

  return paragraph
}

const generateTextElement = (type, content) => {
  const element = document.createElement(type)

  element.textContent = content

  return element
}

const generateImage = (text, imageURL, w = 150, h = 150) => {
  const img = document.createElement('img')

  img.setAttribute('src', imageURL)
  img.setAttribute('alt', `${text}`)
  img.setAttribute('width', w)
  img.setAttribute('height', h)
  img.setAttribute('loading', 'lazy')

  return img
}

const divGenerator = (...classList) => {
  const div = document.createElement('div')

  classList.forEach(classItem => {
    div.classList.add(classItem)
  })

  return div
}

async function apiFetch(url, fn) {
  const response = await fetch(url)

  try {
    if (!response.ok) throw Error(await response.text())

    const data = await response.json()

    fn(data)

  } catch (error) {
    console.error(error)
  }
}

export { toTitleCase, urlBuilder, diffCalc, divGenerator, itemComponent, randInt, generateTextElement, generateImage, apiFetch }