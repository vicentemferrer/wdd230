const url = `https://api.openweathermap.org/data/2.5/weather`

const options = {
  lat: 49.75057516180425,
  lon: 6.6350371775521015,
  units: 'imperial',
  appid: '0e34dfa26862e0a73a00a6bbb75e8b79'
}

const toTitleCase = text => text.split(' ').filter(word => word !== '').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

const urlBuilder = (base, options) => `${base}?${Object.entries(options).map(option => option.join('=')).join('&')}`

const weatherComponent = ({ description, icon }) => {
  const figure = document.createElement('figure')
  const img = document.createElement('img')
  const figcaption = document.createElement('figcaption')

  const iconsrc = `https://openweathermap.org/img/w/${icon}.png`

  img.setAttribute('src', iconsrc)
  img.setAttribute('alt', 'Forecast icon')

  figcaption.textContent = `${toTitleCase(description)}`

  figure.appendChild(img)
  figure.appendChild(figcaption)

  return figure
}

function displayResults({ main: { temp }, weather }) {
  const currentTemp = document.getElementById('current-temp')
  const main = document.querySelector('main')

  currentTemp.innerHTML = `${temp.toFixed(0)}&deg;F`

  weather.forEach(event => {
    const component = weatherComponent(event)

    main.appendChild(component)
  })
}

async function apiFetch(url) {
  const response = await fetch(url)

  try {
    if (!response.ok) throw Error(await response.text())

    const data = await response.json()

    displayResults(data)

  } catch (error) {
    console.error(error)
  }
}

apiFetch(urlBuilder(url, options))