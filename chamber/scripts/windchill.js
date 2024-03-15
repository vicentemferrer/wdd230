const maxTempF = 50
const minWindSpeed = 3.0

const celsiusToFahrenheit = celsius => celsius * (9 / 5) + 32
const fahrenheitToCelsius = fahrenheit => (5 / 9) * (fahrenheit - 32)
const kilometersToMiles = kilometers => kilometers / 1.609344

export function windChill(temperature, windSpeed, tempUnit = 'F', speedUnit = 'mph') {
  const temp = tempUnit === 'C' ? celsiusToFahrenheit(temperature) : temperature
  const speed = speedUnit === 'km/h' ? kilometersToMiles(windSpeed) : windSpeed

  if (temp <= maxTempF && speed > minWindSpeed) {
    const windchillIndex = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16)

    return `${Math.round(tempUnit === 'C' ? fahrenheitToCelsius(windchillIndex) : windchillIndex)}°${tempUnit}`
  }

  return 'N/A'
}

// const weatherBody = document.querySelector('#weather article')
// const temperatureContent = document.querySelector('#weather p[data-id="temperature"] span').textContent
// const windSpeedContent = document.querySelector('#weather p[data-id="wind speed"] span').textContent
// const windchillElement = document.querySelector('#weather p[data-id="wind chill"] span')

// const temperatureData = temperatureContent.trim().split('°').map((fr, i) => i === 0 ? parseFloat(fr) : fr)
// const windSpeedData = windSpeedContent.trim().split(' ').map((fr, i) => i === 0 ? parseFloat(fr) : fr)

// const args = [temperatureData[0], windSpeedData[0], temperatureData[1], windSpeedData[1]]

// windchillElement.textContent += windchillCalc(...args)