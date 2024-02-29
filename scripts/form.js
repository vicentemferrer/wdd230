const root = document.querySelector(':root')
const message = document.getElementById('message')
const password = document.getElementById('password')
const passwordVerify = document.getElementById('password2')
const range = document.getElementById('rating')

const setMessage = (options) => {
  message.textContent = options?.msg ?? ''
  message.style.display = options?.display
}

const highlightCheck = (options) => {
  passwordVerify.style.backgroundColor = options?.backgroundColor

  if (options?.type === 'error') {
    passwordVerify.value = ''
    passwordVerify.focus()
  }
}

const matchPasswords = () => password.value === passwordVerify.value

function checkSame() {
  const msgOptions = {}
  const passOptions = {}

  if (!matchPasswords()) {
    msgOptions['msg'] = '❗ Passwords DO NOT MATCH!'
    msgOptions['display'] = 'block'
    passOptions['type'] = 'error'
    passOptions['backgroundColor'] = '#fff0f3'
  } else {
    msgOptions['display'] = 'none'
    passOptions['backgroundColor'] = '#fff'
  }

  setMessage(msgOptions)
  highlightCheck(passOptions)
}

function handleRangeChange() {
  const val = range.value
  const percentage = val * 10 - 4

  root.style.setProperty('--gradient-fill', `${percentage}%`)
}

range.addEventListener('input', handleRangeChange)
passwordVerify.addEventListener('focusout', checkSame)