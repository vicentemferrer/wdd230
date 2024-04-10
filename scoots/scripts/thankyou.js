const whoAsk = localStorage.getItem('location')

async function setCard(whoAsk) {
  const gratitude = document.getElementById('thanks')

  const h2 = document.createElement('h2')
  const p = document.createElement('p')

  switch (whoAsk) {
    case 'reservations':
      h2.textContent = 'Thank you for rent with us!'
      p.textContent = 'Let\'s have more adventures together!'
      break

    case 'contact':
      h2.textContent = 'Thank you for reach out your request!'
      p.textContent = 'We will contact you soonly.'
      break
  }

  gratitude.appendChild(h2)
  gratitude.appendChild(p)
}

setCard(whoAsk)