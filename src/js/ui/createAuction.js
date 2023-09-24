import profileMenu from "./profileMenu.js";

const createMarkupStepOne = `
  <form id="createAuctionStepOne" class="flex flex-col gap-5 bg-gray-200 rounded-b-md p-2">
    <div class="flex flex-col-reverse">
      <input type="text" name="create-auction-Title" id="create-auction-Title" class="w-fill">
      <label for="create-auction-Title">Auction title</label>
    </div>
    <div class="flex flex-col-reverse">
      <input type="textBox" name="create-auction-Title" id="create-auction-Title" class="w-fill">
      <label for="create-auction-Title">Auction title</label>
    </div>
    <div class="flex justify-center gap-[0.5rem]">
      <button id="CreateAuction-stepOne-cansel" class="bg-pink-900 text-white self-center rounded-md text-bold text-lg w-min h-min p-2 px-3 whitespace-nowrap">Cansel</button>
      <button id="CreateAuction-stepOne-next" class="bg-pink-900 text-white self-center rounded-md text-bold text-lg w-min h-min p-2 px-3 whitespace-nowrap">Next</button>
    </div>
  </form>
`

const createMarkupStepTwo = `
  <form id="createAuctionStepTwo" class="flex flex-col gap-5 bg-gray-200 rounded-b-md p-2">
    <div class="flex flex-col-reverse">
      <input type="text" name="stuff" id="stuff" class="w-fill">
      <label for="stuff"></label>
    </div>
    <div class="flex">
      <button id="CreateAuction-stepTwo-back" class="bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Back</button>
      <button id="CreateAuction-stepTwo-next" class="bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Next</button>
    </div>
  </form>
`

const createMarkupStepThree = `
  <form id="createAuctionStepThree" class="flex flex-col gap-5  bg-gray-200 rounded-b-md p-2">
    <div class="flex flex-col-reverse">
      <input type="text" name="stuff" id="stuff" class="w-fill">
      <label for="stuff"></label>
    </div>
    <div class="flex">
      <button id="CreateAuction-stepThree-back" class="bg-pink-900 text-white self-center rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Back</button>
      <button id="CreateAuction-stepThree-post" class="bg-pink-900 text-white self-center rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Post</button>
    </div>
  </form>
`
const userMenu = document.getElementById('user-menu')
const userMenuLocation = document.getElementById('user-menu-location')


const setupStepOne = () => {
  const createAuctionStepTwo = document.getElementById('createAuctionStepTwo')
  const createAuctionStepThree = document.getElementById('createAuctionStepThree')
  const profileMenuModal = document.getElementById('profile-menu')

  if (createAuctionStepTwo !== null && createAuctionStepTwo !== undefined) {
    createAuctionStepTwo.remove()
  } else if (createAuctionStepThree !== null && createAuctionStepThree !== undefined) {
    createAuctionStepThree.remove()
  } else if (profileMenuModal !== null && profileMenuModal !== undefined) {
    profileMenuModal.remove()
  }

  userMenuLocation.innerHTML += createMarkupStepOne

  setTimeout(() => {
    const canselBtn = document.getElementById('CreateAuction-stepOne-cansel')
    const nextBtn = document.getElementById('CreateAuction-stepOne-next')

    canselBtn.addEventListener('click', () => {
      userMenu.close

      createAuctionStepOne.remove()
      profileMenu()
    })
    nextBtn.addEventListener('click', setupStepTwo)
  }, 10)

}

const setupStepTwo = () => {
  const createAuctionStepOne = document.getElementById('createAuctionStepOne')
  const createAuctionStepThree = document.getElementById('createAuctionStepThree')

  if (createAuctionStepOne !== null) {
    createAuctionStepOne.remove()
  } else if (createAuctionStepThree !== null) {
    createAuctionStepThree.remove()
  }

  userMenuLocation.innerHTML += createMarkupStepTwo

  setTimeout(() => {
    const backBtn = document.getElementById('CreateAuction-stepTwo-back')
    const nextBtn = document.getElementById('CreateAuction-stepTwo-next')

    backBtn.addEventListener('click', setupStepOne)
    nextBtn.addEventListener('click', setupStepThree)
  }, 10)

}

const setupStepThree = () => {
  const createAuctionStepOne = document.getElementById('createAuctionStepOne')
  const createAuctionStepTwo = document.getElementById('createAuctionStepTwo')

  if (createAuctionStepOne !== null) {
    createAuctionStepOne.remove()
  } else if (createAuctionStepTwo !== null) {
    createAuctionStepTwo.remove()
  }

  userMenuLocation.innerHTML += createMarkupStepThree

  setTimeout(() => {
    const backBtn = document.getElementById('CreateAuction-stepThree-back')
    const postBtn = document.getElementById('CreateAuction-stepThree-post')

    backBtn.addEventListener('click', setupStepTwo)
    postBtn.addEventListener('click', () => {
      userMenu.close

      createAuctionStepOne.remove()
      profileMenu()
    })
  }, 10)

}

export default () => setupStepOne()