import search from './search.js';
import setupSearchEvent from './tools/setupSearchEvent.js';
import loginRegister from "./ui/authFromSetup.js";
import profileMenu from "./ui/profileMenu.js";

setupSearchEvent('sort-by');
search();

setInterval(() => {
  const isLoggedIn = localStorage.getItem('accessToken') !== null
  let authForm = document.getElementById('auth-action-form')
  let profileMenuDiv = document.getElementById('profile-menu')
  const userMenu = document.getElementById('user-menu')
  const userAuctions = document.getElementById('user-auctions')

  if (!isLoggedIn && authForm === null) {
    loginRegister()
    userAuctions.hidden = true
    userAuctions.querySelector('input[type="checkbox"]').setAttribute('disabled', 'disabled')

    const heroButtons = document.querySelectorAll('#hero-section button')
    heroButtons.forEach(button => {

    profileMenuDiv?.remove()

      button.addEventListener('click', (evt) => {

        const btn = evt.target;
        let btnText = btn.innerText?.toLowerCase() || ''

        let change = new Event('change')
        if (btnText === 'login') {
          document.getElementById('auth-action-login').dispatchEvent(change)
        } else if (btnText === 'register') {
          document.getElementById('auth-action-register').dispatchEvent(change)
        }

        userMenu.showModal()
      })
    })
  }

  if (isLoggedIn && profileMenuDiv === null) {
    profileMenu()

    const heroSection = document.getElementById('hero-section')
    heroSection?.remove()

    const authMenu = document.getElementById('auth-action-form')
    authMenu?.remove()

    userAuctions.hidden = false
    userAuctions.querySelector('input[type="checkbox"]').removeAttribute('disabled')

    const profilePicture = localStorage.getItem('avatar')
    if (profilePicture !== null || profilePicture?.length === 0) {

      const menuBtn = document.querySelector('header button:has(> span.sr-only)')
      Array.from(menuBtn.children).forEach(child => {
        if (child.tagName.toLowerCase() === 'svg') {
          child.remove()

          menuBtn.innerHTML += `<img src="${profilePicture}" class="h-[85px] w-[84px] border-4 border-white rounded-full" alt="" />`
        }
      })

    }
  }


}, 500)
