function windChill(temperature, windSpeed) {
  if (temperature <= 50 && windSpeed > 3.0) {
    const windchillIndex = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16)

    return `${windchillIndex}`
  }

  return 'N/A'
}