const visitsElement = document.getElementById('pageVisits')

const getPageVisits = () => Number(localStorage.getItem('visitsCount'))
const setPageVisits = (visitsCount) => {
  localStorage.setItem('visitsCount', visitsCount)
}

function displayPageVisits(visitsCount) {
  if (numVisits !== 0) {
    visitsElement.innerHTML += visitsCount;
  } else {
    visitsElement.innerHTML += `This is your first visit. 🥳 Welcome!`;
  }

  visitsCount++

  setPageVisits(visitsCount)
}

const numVisits = getPageVisits() || 0

displayPageVisits(numVisits)