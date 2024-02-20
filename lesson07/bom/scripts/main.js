const input = document.querySelector('#favchap')
const button = document.querySelector('button')
const list = document.querySelector('#list')

function setChapterList(chapters) {
  localStorage.setItem('myFavBOMList', JSON.stringify(chapters));
}

function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'))
}

function deleteChapter(chapter) {
  chaptersArray = chaptersArray.filter(chap => chap !== chapter)
  setChapterList(chaptersArray)
}

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

function displayElement(chapter) {
  const li = document.createElement('li')
  const div = document.createElement('div')
  const redirectButton = document.createElement('button')
  const deleteButton = document.createElement('button')

  li.textContent = chapter
  redirectButton.textContent = '↗'
  deleteButton.textContent = '❌'

  li.setAttribute('data-scripture', chapter)
  redirectButton.setAttribute('aria-label', `Open ${chapter}`)
  deleteButton.setAttribute('aria-label', `Remove ${chapter}`)

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
    deleteChapter(li.getAttribute('data-scripture'))
    list.removeChild(li)
    input.focus()
  })
}

let chaptersArray = getChapterList() ?? []

chaptersArray.forEach(chapter => {
  displayElement(chapter)
})

button.addEventListener('click', () => {
  if (input.value !== '' && input.value.split(' ').length >= 2) {
    displayElement(input.value.trim())
    chaptersArray.push(input.value.trim())
    setChapterList(chaptersArray)
  }

  input.focus()
  input.value = ''
})