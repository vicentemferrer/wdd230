const copyrightSpan = document.querySelector('footer p span')
const lastModifiedElement = document.querySelector('#lastModified')

copyrightSpan.textContent += new Date().getFullYear()
lastModifiedElement.textContent = `Last modified: ${document.lastModified}`