import createAuction from "./createAuction.js";
import fetchRequester from "../tools/fetchRequester.js";

export default () => {

  const addLogoutBtn = document.getElementById('logout-btn') === null
  if (addLogoutBtn) {
    const userMenuButtons = document.getElementById('user-menu-buttons')
    userMenuButtons.innerHTML += `<button id="logout-btn" class="text-bold text-xl p-2 bg-gray-200 mr-2 rounded-md">Logout</button>`
  }

  const profilePicture = localStorage.getItem('avatar')
  const userMenuLocation = document.getElementById('user-menu-location')

  const profileMenu = `
    <div id="profile-menu" class="bg-gray-200 flex flex-col gap-5 rounded-b-md p-2">
      <div id="profile-picture" class="relative">
        ${ profilePicture !== null
    ? `<img src="${profilePicture}" class="h-auto w-fill border-4 border-white rounded-full" alt="" />`
    : '<svg class="h-auto w-fill border-4 border-white rounded-full bg-pink-900 object-fill" viewBox="0 0 84 85" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.6825 76.3874C22 73.8208 22 69.8824 22 63.5C22 54.0842 28.1968 46.1158 36.7346 43.4505L37.4 42.5L37.3109 42.3727C34.1276 39.8531 32 35.493 32 31.5C32 25.4249 36.9249 20.5 43 20.5C49.0751 20.5 54 25.4249 54 31.5C54 35.493 51.8724 39.8531 48.6891 42.3727L48.6 42.5L49.2654 43.4505C57.8032 46.1158 64 54.0842 64 63.5C64 64.9562 64.0131 66.275 64.025 67.4723C64.0571 70.7115 64.0804 73.0609 63.8118 74.835C74.1822 67.8259 81 55.9591 81 42.5C81 20.9609 63.5391 3.5 42 3.5C20.4609 3.5 3 20.9609 3 42.5C3 57.0107 10.9248 69.6705 22.6825 76.3874ZM42.9552 84.4893C42.6377 84.4964 42.3193 84.5 42 84.5C18.804 84.5 0 65.696 0 42.5C0 19.304 18.804 0.5 42 0.5C65.196 0.5 84 19.304 84 42.5C84 65.3452 65.7604 83.9303 43.0493 84.4872L43 84.5L42.9552 84.4893Z" fill="white"/></svg>'
  }
        <button id="profile-picture-change" class="border-4 border-white bg-pink-900 text-white rounded-lg text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-wrap absolute bottom-0 right-0">Change Avatar</button>
      </div>
      <form id="profile-picture-change-form" class="flex flex-col-reverse hidden">
        <span id="profile-picture-change-error" hidden class="text-red"></span>
        <div class="flex w-full">
          <input required type="text" id="profile-picture-change-url" name="profile-picture-change-url" class="h-full w-full text-lg rounded-l-md py-1 px-2">
          <button type="submit" class="bg-pink-900 text-white rounded-r-md text-bold text-lg py-1 px-2 whitespace-nowrap">Change</button>
        </div>
        <label for="profile-picture-change-url" class="text-bold">Url to profile picture</label>
      </form>
     
      <div class="flex flex-col gap-2 items-center">
        <span class="text-bold text-xl">${localStorage.getItem('name')}</span>
        <span class="text-lg">${localStorage.getItem('email')}</span>
        <span id="profile-menu-credits">${localStorage.getItem('credits')} credits</span>
      </div>
     
      <button id="makeAuctionItem" class="self-center bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Auction an Item</button>
    </div>
  `

  userMenuLocation.innerHTML += profileMenu

  setTimeout(() => {
    const logoutMenu = document.getElementById('logout-btn')
    logoutMenu.addEventListener("click", (evt) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('credits')
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      localStorage.removeItem('avatar')

      const userMenu = document.getElementById('user-menu')
      userMenu.close()

      const profileMenu = document.getElementById('profile-menu')
      profileMenu.remove()

      evt.target.remove()
    })

    const makeAuctionItem = document.getElementById('makeAuctionItem')
    makeAuctionItem.addEventListener('click', createAuction)

    const changePictureBtn = document.getElementById('profile-picture-change')
    const changePictureForm = document.getElementById('profile-picture-change-form')

    changePictureBtn.addEventListener('click', () => changePictureForm.classList.toggle('hidden'))

    changePictureForm.addEventListener('submit', async (evt) => {
      evt.preventDefault()

      const authPicture = evt.target['profile-picture-change-url']
      const authPictureErrors = document.getElementById('profile-picture-change-error')

      const pictureUrlPattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (!pictureUrlPattern.test(authPicture.value) && authPicture.value.trim().length !== 0) {
        authPictureErrors.innerText = 'The profile picture must be a public url linking to picture or empty'
        authPictureErrors.hidden = false
        return
      } else {
        authPictureErrors.innerText = ''
        authPictureErrors.hidden = true
      }

      const response = await fetchRequester(`profiles/${localStorage.getItem('name')}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({avatar: authPicture.value})
      })

      localStorage.setItem('avatar', response.avatar)
    })
  }, 10)
}
