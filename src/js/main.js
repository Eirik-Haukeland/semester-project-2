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
  const h1 = document.querySelector('h1')

  if (!isLoggedIn && authForm === null) {
    loginRegister()

    const heroSection = `
      <section class="sm:pl-12 xl:pl-64 flex flex-col gap-32 sm:flex-row bg-gray-200 h-min text-2xl" id="hero-section" aria-labelledby="hero-title">
        <h2 hidden id="hero-title">signe up or register an account</h2>
        <div class="sm:w-2/5 py-5 gap-y-2 sm:py-0 sm:gap-y-0 grid grid-cols-2 gap-x-2 justify-items-stretch items-stretch h-full">
          <p class="col-span-2 justify-self-center self-center w-1/2 sm:w-full">Here you can  sell all your unwanted stuff, and get new stuff someone lese don’t want!</p>
          <button class="capitalize rounded bg-pink-900 text-white px-5 py-1 justify-self-end h-min sm:3/5 lg:w-1/2 min-w-min">register</button>
          <button class="capitalize rounded bg-neutral-700 text-white px-5 py-1 justify-self-start h-min sm:3/5 lg:w-1/2 min-w-min">login</button>
        </div>
        <div class="sm:w-3/5" id="hero-img"></div>
      </section>
    `
    h1.insertAdjacentHTML('afterend', heroSection)

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

  const createAuctionStepOne = document.getElementById('createAuctionStepOne')
  const createAuctionStepTwo = document.getElementById('createAuctionStepTwo')
  const createAuctionStepThree = document.getElementById('createAuctionStepThree')

  if (isLoggedIn && profileMenuDiv === null && (createAuctionStepOne === null || createAuctionStepTwo === null || createAuctionStepThree === null)) {
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
