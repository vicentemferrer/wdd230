import { toTitleCase, urlBuilder, diffCalc, divGenerator, itemComponent, apiFetch, generateTextElement, generateImage } from './helpers.js'

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather`
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast`

const options = {
  lat: 20.506916465442046,
  lon: -86.94450232289189,
  units: 'imperial',
  appid: '0e34dfa26862e0a73a00a6bbb75e8b79'
}

const forecastDepurer = (list) => {
  const grouped = Object.groupBy(list, ({ dt_txt }) => new Date(dt_txt).getDay())

  const events = Object.values(grouped).map(list => {
    const [event] = list.filter(({ dt_txt, dt }) => new Date(dt_txt).getHours() === 15 && diffCalc(dt) >= 1)

    return event
  })

  return events.sort((a, b) => a.dt - b.dt).filter(event => typeof event !== 'undefined')[0]
}

const currentWeatherComponent = ({ icon }, temp, humidity) => {
  const percentParser = (humidity) => `${humidity}%`

  const figure = document.createElement('figure')
  const figcaption = document.createElement('figcaption')

  const iconsrc = `https://openweathermap.org/img/w/${icon}.png`

  figcaption.appendChild(generateTextElement('p', `${temp.toFixed(0)}°F`))
  figcaption.appendChild(itemComponent('h', humidity, percentParser, true))

  figure.appendChild(generateImage('Current Weather icon', iconsrc, 100, 100))
  figure.appendChild(figcaption)

  return figure
}

const forecastItemComponent = ({ main: { temp }, weather: [{ description, icon }, ..._] }) => {
  const figure = document.createElement('figure')
  const figcaption = document.createElement('figcaption')

  const iconsrc = `https://openweathermap.org/img/w/${icon}.png`

  figcaption.appendChild(generateTextElement('p', `${temp.toFixed(0)}°F`))

  figure.appendChild(generateTextElement('h4', 'Tomorrow (at 3pm)'))
  figure.appendChild(generateImage(toTitleCase(description), iconsrc, 50, 50))
  figure.appendChild(figcaption)

  return figure
}

function displayCurrent({ main: { temp, humidity }, weather: [firstEvent, ..._] }) {
  const weatherInfo = document.querySelector('.weather article')
  const container = divGenerator('container')

  container.appendChild(generateTextElement('h4', 'Today'))
  container.appendChild(currentWeatherComponent(firstEvent, temp, humidity))
  container.appendChild(generateTextElement('p', toTitleCase(firstEvent.description)))

  weatherInfo.appendChild(container)
}

function displayForecast({ list }) {
  const weatherInfo = document.querySelector('.weather article')
  const container = divGenerator('container', 'forecast')

  container.appendChild(forecastItemComponent(forecastDepurer(list)))

  weatherInfo.appendChild(container)
}

apiFetch(urlBuilder(currentWeatherURL, options), displayCurrent)
apiFetch(urlBuilder(forecastURL, options), displayForecast)