import search from './search.js';
import setupSearchEvent from './tools/setupSearchEvent.js';
import loginRegister from "./auth/authFromSetup.js";

setupSearchEvent('sort-by');
search();

setInterval(() => {
  const isLoggedIn = localStorage.getItem('accessToken') !== null
  const authForm = document.getElementById('auth-action-form')
  const userMenu = document.getElementById('user-menu')

  if (!isLoggedIn && authForm === null) {
    loginRegister()
    const heroButtons = document.querySelectorAll('#hero-section button, header button')
    heroButtons.forEach(button => {
      console.log(button, button.innerText)

      button.addEventListener('click', (evt) => {
        const btn = evt.target;
        const btnText = btn.innerText.toLowerCase()

        if (btnText === 'login') {
          document.getElementById('auth-action-login').checked = true
        }
        if (btnText === 'register') {
          document.getElementById('auth-action-register').checked = true
        }

        userMenu.showModal()
      })
    })
  }

  if (isLoggedIn) {
  }


}, 500)
