const password = document.getElementById('password')
const passwordVerify = document.getElementById('password2')
const message = document.getElementById('message')

passwordVerify.addEventListener('focusout', checkSame)

function checkSame() {
  if (password.value !== passwordVerify.value) {
    message.textContent = "❗ Passwords DO NOT MATCH!";
    message.style.visibility = "show";
    passwordVerify.style.backgroundColor = "#fff0f3";
    passwordVerify.value = "";
    passwordVerify.focus();
  } else {
    message.style.display = "none";
    passwordVerify.style.backgroundColor = "#fff";
    passwordVerify.style.color = "#000";
  }
}
