const copyrightSpan = document.querySelector('.project span[data-id="year"]')
const lastModifiedElement = document.querySelector('#lastModified')

copyrightSpan.innerHTML += new Date().getFullYear()
lastModifiedElement.textContent = `Last modified: ${document.lastModified}`