const input = document.querySelector('#favchap')
const button = document.querySelector('button')
const list = document.querySelector('#list')

const scriptureURL = 'https://www.churchofjesuschrist.org/study/scriptures/bofm/'

function restructureBook(book) {
  const resBook = book.map(fr => (fr !== 'Nephi' && fr !== 'of') ? fr.charAt(0) : fr.slice(0, 2))
  return resBook.join('-').toLowerCase()
}

function abbreviateBook([book]) {
  const refBook = (book.length <= 5) ? book : (book === 'Helaman') ? book.slice(0, 3) : book.slice(0, 4)
  return refBook.toLowerCase()
}

function filterScripture({ book, chapter }) {
  const filtBook = (book.length > 1) ? restructureBook(book) : abbreviateBook(book)
  return [filtBook, chapter]
}

button.addEventListener('click', () => {
  if (input.value !== '' && input.value.split(' ').length >= 2) {
    const li = document.createElement('li')
    const div = document.createElement('div')
    const redirectButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    li.textContent = input.value
    redirectButton.textContent = '↗'
    deleteButton.textContent = '❌'

    li.setAttribute('data-scripture', input.value)
    redirectButton.setAttribute('aria-label', `Open ${input.value}`)
    deleteButton.setAttribute('aria-label', `Remove ${input.value}`)

    div.appendChild(redirectButton)
    div.appendChild(deleteButton)
    li.appendChild(div)
    list.appendChild(li)

    redirectButton.addEventListener('click', () => {
      const scripture = li.getAttribute('data-scripture').trim().split(' ').reduce((acc, fr, i) => {
        if ((!isNaN(parseInt(fr)) && i === 0) || isNaN(parseInt(fr))) {
          acc['book'].push(fr)
        } else {
          acc['chapter'] += fr
        }

        return acc
      }, { book: [], chapter: '' })

      const [book, chapter] = filterScripture(scripture)

      window.open(`https://www.churchofjesuschrist.org/study/scriptures/bofm/${book}/${chapter}?lang=eng`, 'about:blank')
    })

    deleteButton.addEventListener('click', () => {
      list.removeChild(li)
      input.focus()
    })
  }

  input.focus()
  input.value = ''
})