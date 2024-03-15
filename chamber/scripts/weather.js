import { windChill } from './windchill.js'

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather`
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast`

const options = {
  lat: -41.871803,
  lon: -73.808186,
  units: 'imperial',
  appid: '0e34dfa26862e0a73a00a6bbb75e8b79'
}

const toTitleCase = text => text.split(' ').filter(word => word !== '').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

const urlBuilder = (base, options) => `${base}?${Object.entries(options).map(option => option.join('=')).join('&')}`

const getWeekday = index => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return weekdays[index].slice(0, 3)
}

const diffCalc = date => {
  const msToDays = 24 * 60 * 60 * 1000
  return (Date.now() - date) / msToDays
}

const forecastDepurer = (list) => {
  const grouped = Object.groupBy(list, ({ dt_txt }) => new Date(dt_txt).getDay())

  const events = Object.values(grouped).map(list => {
    const [event] = list.filter(({ dt_txt, dt }) => new Date(dt_txt).getHours() === 12 && diffCalc(dt) >= 1)

    return event
  })

  return events.sort((a, b) => a.dt - b.dt)
}

const divGenerator = (...classList) => {
  const div = document.createElement('div')

  classList.forEach(classItem => {
    div.classList.add(classItem)
  })

  return div
}

const itemComponent = (textItem, content, contentArr = [], isArrayNeeded = false, fn = () => { }, isFnNeeded = false) => {
  const paragraph = document.createElement('p')

  const itemContent = isFnNeeded ? isArrayNeeded ? fn(...contentArr) : fn(content) : content

  paragraph.innerHTML = `<strong>${toTitleCase(textItem)}:</strong> ${itemContent}`

  return paragraph
}

const currentWeatherComponent = ({ description, icon }, temp) => {
  const figure = document.createElement('figure')
  const img = document.createElement('img')
  const figcaption = document.createElement('figcaption')
  const tempP = document.createElement('p')
  const descriptionP = document.createElement('p')

  const iconsrc = `https://openweathermap.org/img/w/${icon}.png`

  img.setAttribute('src', iconsrc)
  img.setAttribute('alt', 'Current Weather icon')
  img.setAttribute('loading', 'lazy')

  tempP.innerHTML = `${temp.toFixed(0)}&deg;F`
  descriptionP.innerHTML = `<strong>${toTitleCase(description)}</strong>`

  figcaption.appendChild(tempP)
  figcaption.appendChild(descriptionP)

  figure.appendChild(img)
  figure.appendChild(figcaption)

  figure.setAttribute('id', 'currentTemp')

  return figure
}

const forecastItemComponent = ({ description, icon }, temp, day) => {
  const figure = document.createElement('figure')
  const figcaption = document.createElement('figcaption')
  const img = document.createElement('img')
  const tempP = document.createElement('p')
  const titleP = document.createElement('p')

  const iconsrc = `https://openweathermap.org/img/w/${icon}.png`

  titleP.innerHTML = `<strong>${getWeekday(day)}</strong>`

  img.setAttribute('src', iconsrc)
  img.setAttribute('alt', toTitleCase(description))
  img.setAttribute('loading', 'lazy')

  tempP.innerHTML = `${temp.toFixed(0)}&deg;F`

  figcaption.appendChild(tempP)

  figure.appendChild(titleP)
  figure.appendChild(img)
  figure.appendChild(figcaption)

  figure.setAttribute('class', 'forecastItem')

  return figure
}

function displayCurrent({ main: { temp, humidity }, wind: { speed }, weather: [firstEvent, ..._] }) {
  const weatherInfo = document.querySelector('#weather article')
  const container = divGenerator('container')
  const row = divGenerator('row')

  const percentParser = (humidity) => `${humidity}%`

  container.appendChild(itemComponent('wind chill', '', [temp, speed], true, windChill, true))
  container.appendChild(itemComponent('humidity', humidity, [], false, percentParser, true))
  row.appendChild(currentWeatherComponent(firstEvent, temp))
  row.appendChild(container)

  weatherInfo.appendChild(row)
}

function displayForecast({ list }) {
  const weatherInfo = document.querySelector('#weather article')
  const row = divGenerator('row')

  forecastDepurer(list).forEach(({ main: { temp }, weather: [firstEvent, ..._], dt_txt }) => {
    const weatherEventComposed = forecastItemComponent(firstEvent, temp, new Date(dt_txt).getDay())

    row.appendChild(weatherEventComposed)
  })

  weatherInfo.appendChild(row)
}

async function apiFetch(url, isCurrent = true) {
  const response = await fetch(url)

  try {
    if (!response.ok) throw Error(await response.text())

    const data = await response.json()

    isCurrent ? displayCurrent(data) : displayForecast(data)

  } catch (error) {
    console.error(error)
  }
}


apiFetch(urlBuilder(currentWeatherURL, options))
apiFetch(urlBuilder(forecastURL, options), false)