const toTitleCase = text => text.split(' ').filter(word => word !== '').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

const urlBuilder = (base, options) => `${base}?${Object.entries(options).map(option => option.join('=')).join('&')}`

const diffCalc = date => {
  const msToDays = 24 * 60 * 60 * 1000
  return (Date.now() - date) / msToDays
}

const randInt = limit => Math.floor(Math.random() * limit)

const getWeekday = index => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return weekdays[index]
}

const itemComponent = (textItem, content, fn = () => { }, isFnNeeded = false, contentArr = [], isArrayNeeded = false) => {
  const paragraph = document.createElement('p')

  const itemContent = isFnNeeded ? isArrayNeeded ? fn(...contentArr) : fn(content) : content

  paragraph.innerHTML = `<strong>${toTitleCase(textItem)}:</strong> ${itemContent}`

  return paragraph
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

export { toTitleCase, urlBuilder, diffCalc, randInt, getWeekday, divGenerator, itemComponent, generateImage, apiFetch }