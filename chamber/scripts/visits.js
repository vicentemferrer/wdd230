const messageElement = document.getElementById('message')

const getLastVisit = () => JSON.parse(localStorage.getItem('lastVisit'))
const storeLastVisit = date => {
  localStorage.setItem('lastVisit', JSON.stringify(date))
}

const setMessage = dateDiff => (dateDiff === 0) ? 'Welcome! Let us know if you have any questions.' : (dateDiff < 1) ? 'Back so soon! Awesome!' : `You last visited ${dateDiff.toFixed(0)} days ago.`
const diffCalc = date => {
  const msToDays = 24 * 60 * 60 * 1000
  const lastVisit = getLastVisit() || Date.now()
  return (lastVisit - date) / msToDays
}

function displayMessage(date) {
  const message = setMessage(diffCalc(date))

  messageElement.textContent = message
  storeLastVisit(date)
}

const today = Date.now()

displayMessage(today)