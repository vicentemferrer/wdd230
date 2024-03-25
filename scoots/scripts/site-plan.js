const root = document.querySelector(':root')
const heading = document.querySelector('h1')
const paragraph = document.querySelector('p')
const headFont = document.querySelector('#head-font')
const paraFont = document.querySelector('#para-font')
const colorSchemaLink = document.querySelector('main > p + a')
const colors = document.querySelectorAll('.colors td')

const colorLink = colorSchemaLink.href
colorSchemaLink.textContent = colorLink

function setSchema(colorLink) {
  const [primary, secondary, accent1, accent2, accent3] = colorLink.split('/')[3].split('-')

  root.style.setProperty('--primary-color', `#${primary}`)
  root.style.setProperty('--secondary-color', `#${secondary}`)
  root.style.setProperty('--accent1-color', `#${accent1}`)
  root.style.setProperty('--accent2-color', `#${accent2}`)
  root.style.setProperty('--accent3-color', `#${accent3}`)
}

setSchema(colorLink)

function rgbToHex(rgb) {
  const rgbValues = rgb.split("(")[1].split(")")[0].split(",")
  const hexParsed = rgbValues.map((value) => {
    value = parseInt(value).toString(16)
    return value.length == 1 ? "0" + value : value
  })

  return "#" + hexParsed.join("")
}

function getPerceptualBrightness(color) {
  color = color.length === 6 ? color : color.substring(1)
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  return r * 2 + g * 3 + b;
}

function hasGoodContrast(bright1, bright2) {
  return (bright1 + .05) / (bright2 + .05) < 0.45
}

for (let i = 0; i < colors.length; i++) {
  const color = getComputedStyle(colors[i])['backgroundColor']

  const hexColor = rgbToHex(color)

  colors[i].textContent = hexColor

  if (hasGoodContrast(getPerceptualBrightness(hexColor), getPerceptualBrightness('FFFFFF'))) {
    colors[i].style.setProperty('color', 'white')
  }
}

headFont.textContent += ` ${getComputedStyle(heading)['fontFamily']}`
paraFont.textContent += ` ${getComputedStyle(paragraph)['fontFamily']}`