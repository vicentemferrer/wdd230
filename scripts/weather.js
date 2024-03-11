const url = `https://api.openweathermap.org/data/2.5/weather`

const options = {
  lat: -41.871803,
  lon: -73.808186,
  units: 'imperial',
  appid: '0e34dfa26862e0a73a00a6bbb75e8b79'
}

const toTitleCase = text => text.split(' ').filter(word => word !== '').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

const urlBuilder = (base, options) => `${base}?${Object.entries(options).map(option => option.join('=')).join('&')}`

const weatherComponent = ({ description, icon }, temp) => {
  const figure = document.createElement('figure')
  const img = document.createElement('img')
  const figcaption = document.createElement('figcaption')
  const tempP = document.createElement('p')
  const descriptionP = document.createElement('p')

  const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`

  img.setAttribute('src', iconsrc)
  img.setAttribute('alt', 'Forecast icon')
  img.setAttribute('loading', 'lazy')

  tempP.innerHTML = `${temp.toFixed(0)}&deg;F`
  descriptionP.textContent = `${toTitleCase(description)}`

  tempP.setAttribute('class', 'temp')

  figcaption.appendChild(tempP)
  figcaption.appendChild(descriptionP)

  figure.appendChild(img)
  figure.appendChild(figcaption)

  return figure
}

function displayResults({ main: { temp }, weather: [firstEvent, ..._] }) {
  const currentTemp = document.getElementById('weather')

  currentTemp.appendChild(weatherComponent(firstEvent, temp))
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

async function getCoords(options) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        options.lat = latitude
        options.lon = longitude
      },
      error => {
        console.error('Error getting geolocation:', error.message)
      }
    )
  } else {
    console.error('Your browser does not support geolocation.')
  }

  return options
}

getCoords(options).then(options => apiFetch(urlBuilder(url, options)))