const baseURL = "https://vicentemferrer.github.io/wdd230/"
const linksURL = "https://vicentemferrer.github.io/wdd230/data/links.json"

async function getLinks(url) {
  const response = await fetch(url)
  const data = await response.json()

  return data
}

console.log(await getLinks(linksURL))