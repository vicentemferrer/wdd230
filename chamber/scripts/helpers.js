const toTitleCase = text => text.split(' ').filter(word => word !== '').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')

const urlBuilder = (base, options) => `${base}?${Object.entries(options).map(option => option.join('=')).join('&')}`

const diffCalc = date => {
  const msToDays = 24 * 60 * 60 * 1000
  return (Date.now() - date) / msToDays
}

const getWeekday = index => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return weekdays[index]
}

const divGenerator = (...classList) => {
  const div = document.createElement('div')

  classList.forEach(classItem => {
    div.classList.add(classItem)
  })

  return div
}

export { toTitleCase, urlBuilder, diffCalc, getWeekday, divGenerator }