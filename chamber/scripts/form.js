import { itemComponent, apiFetch } from "./helpers.js"

const membershipsURL = 'https://vicentemferrer.github.io/wdd230/chamber/data/memberships.json'

const dateInput = document.getElementById('date')
const membershipTypes = document.querySelectorAll('input[type=radio]')
const membershipArticle = document.querySelector('#membershipInfo article')

let memberships

const membershipSelector = (key) => memberships[key.toLowerCase()]

function printDetail(key, articleElement) {
  articleElement.innerHTML = ''

  const membership = membershipSelector(key)

  Object.entries(membership).forEach(([key, content]) => {
    const propName = (key === 'membership') ? 'level' : (key === 'fee') ? 'annual fee / monthly fee' : 'benefits'
    const propContent = (key === 'fee') ? `$${content.toFixed(2)} / $${(content / 12).toFixed(2)}` : content

    const propElement = itemComponent(propName, propContent, (content) => content.reduce((acc, entry, i, arr) => acc + `<li>${entry}</li>${i === arr.length - 1 ? '</ul>' : ''}`, '<ul>'), Array.isArray(propContent))

    articleElement.appendChild(propElement)
  })
}

dateInput.value = Date.now()

membershipTypes.forEach(type => type.addEventListener('input', (event) => printDetail(event.target.value, membershipArticle)))

apiFetch(membershipsURL, (data) => {
  memberships = data
})