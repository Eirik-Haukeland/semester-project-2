import profileMenu from "./profileMenu.js";
import fetchRequester from "../tools/fetchRequester.js";

const createMarkupStepOne= (listing) =>  `
  <form id="createAuctionStepOne" class="flex flex-col gap-5 bg-gray-200 rounded-b-md p-2">
    <div class="flex justify-center gap-5 mt-3">
      <div class="rounded-full border-4 border-pink-900 bg-pink-900 w-[2rem] h-[2rem]"></div>
      <div class="rounded-full border-4 border-pink-900 w-[2rem] h-[2rem]"></div>
      <div class="rounded-full border-4 border-pink-900 w-[2rem] h-[2rem]"></div>
    </div>
    
    <div class="flex flex-col-reverse gap-1">
      <input type="text" required name="create-auction-title" id="create-auction-title" class="w-fill text-bold text-lg rounded-md py-1 px-2" value="${listing?.title || ''}">
      <label for="create-auction-title">Auction title</label>
    </div>
    
    <label class="flex flex-col gap-1">
      <span>Auction Description</span>
      <textarea rows="10" id="create-auction-description" class="text-bold text-lg w-fill rounded-md py-1 px-2">${listing?.description || ''}</textarea>  
    </label>
    
    <div class="flex justify-center gap-1">
      <button type="button" id="CreateAuction-stepOne-cansel" class="bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Cansel</button>
      <button type="submit" id="CreateAuction-stepOne-next" class="bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Next</button>
    </div>
  </form>
`


const createMarkupStepTwo = (listing) =>  `
  <form id="createAuctionStepTwo" class="flex flex-col gap-5 bg-gray-200 rounded-b-md p-2">
    <div class="flex justify-center gap-5 mt-3">
      <div class="rounded-full border-4 border-pink-900 bg-pink-900 w-[2rem] h-[2rem]"></div>
      <div class="rounded-full border-4 border-pink-900 bg-pink-900 w-[2rem] h-[2rem]"></div>
      <div class="rounded-full border-4 border-pink-900 w-[2rem] h-[2rem]"></div>
    </div>
  
    <div class="flex flex-col-reverse">
      <span id="create-auction-img-error" hidden></span>
      <div class="flex">
        <input type="text" name="create-auction-img-url" id="create-auction-img-url" class="h-full w-full text-lg rounded-l-md py-1 px-2">
        <button id="create-auction-img-btn" type="submit" class="bg-pink-900 text-white rounded-r-md text-bold text-lg py-1 px-2 whitespace-nowrap">Add</button>
      </div>
      <label for="create-auction-img-url" >Url to image</label>
    </div>
    <ul id="create-auction-img-list">
      ${listing?.media?.map((url) => `<li class="odd:bg-gray-300 text-lg text-bold">${url}</li>`).join('') || ''}
    </ul>
    <div class="flex justify-center gap-[0.5rem]">
      <button type="button" id="CreateAuction-stepTwo-back" class="bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Back</button>
      <button type="button" id="CreateAuction-stepTwo-next" class="bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Next</button>
    </div>
  </form>
`

const createMarkupStepThree = (listing) => `
  <form id="createAuctionStepThree" class="flex flex-col gap-5  bg-gray-200 rounded-b-md p-2">
    <div class="flex justify-center gap-5 mt-3">
      <div class="rounded-full border-4 border-pink-900 bg-pink-900 w-[2rem] h-[2rem]"></div>
      <div class="rounded-full border-4 border-pink-900 bg-pink-900 w-[2rem] h-[2rem]"></div>
      <div class="rounded-full border-4 border-pink-900 bg-pink-900 w-[2rem] h-[2rem]"></div>
    </div>
    <div class="flex flex-col-reverse">
      <input type="datetime-local" required name="create-auction-EndDate" id="create-auction-EndDate" min="${new Date().toISOString().slice(0,16)}" class="text-bold text-lg w-fill rounded-md py-1 px-2">
      <label for="create-auction-EndDate" class="text-bold ">End date for your auction</label>
    </div>
    <div class="flex flex-col-reverse">
      <span id="create-auction-tag-error" hidden></span>
      <div class="flex">
        <input type="text" name="create-auction-tag-url" id="create-auction-tag-field" class="h-full w-full text-lg rounded-l-md py-1 px-2">
        <button id="create-auction-tag-btn" type="button" class="bg-pink-900 text-white rounded-r-md text-bold text-lg py-1 px-2 whitespace-nowrap">Add</button>
      </div>
      <label for="create-auction-tag-url" class="text-bold">Tags</label>
    </div>
    <ul id="create-auction-tag-list">
      ${listing?.tags?.map((tag) => `<li class="odd:bg-gray-300 text-lg text-bold">${tag}</li>`).join('') || ''}
    </ul>
    <div class="flex justify-center gap-[0.5rem]">
      <button type="button" id="CreateAuction-stepThree-back" class="bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Back</button>
      <button type="submit" id="CreateAuction-stepThree-post" class="bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2 whitespace-nowrap">Post</button>
    </div>
  </form>
`
const userMenu = document.getElementById('user-menu')
const userMenuLocation = document.getElementById('user-menu-location')


const setupStepOne = (listing) => {
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

  userMenuLocation.innerHTML += createMarkupStepOne(listing)

  setTimeout(() => {
    const form = document.getElementById('createAuctionStepOne')
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()

      setupStepTwo({
        ...listing,
        title: form['create-auction-title'].value,
        description: form['create-auction-description'].value,
      })
    })

    const canselBtn = document.getElementById('CreateAuction-stepOne-cansel')
    canselBtn.addEventListener('click', () => {
      userMenu.close

      const createAuctionStepOne = document.getElementById('createAuctionStepOne')
      createAuctionStepOne.remove()
      profileMenu()
    })
  })

}

const setupStepTwo = (listing) => {
  const createAuctionStepOne = document.getElementById('createAuctionStepOne')
  const createAuctionStepThree = document.getElementById('createAuctionStepThree')

  if (createAuctionStepOne !== null) {
    createAuctionStepOne.remove()
  } else if (createAuctionStepThree !== null) {
    createAuctionStepThree.remove()
  }

  userMenuLocation.innerHTML += createMarkupStepTwo(listing)

  setTimeout(() => {
    const imgList = document.getElementById('create-auction-img-list')
    const form = document.getElementById('createAuctionStepTwo')

    form.addEventListener('submit', (evt) => {
      evt.preventDefault()

      const urlField = document.getElementById('create-auction-img-url')
      const urlList = document.getElementById('create-auction-img-list');
      const urlError = document.getElementById('create-auction-img-error')

      urlError.innerText = ''
      urlError.hidden = true

      const pictureUrlPattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (!pictureUrlPattern.test(urlField.value) && urlField.value.length !== 0) {
        urlError.innerText = 'The profile picture must be a public url linking to picture or empty'
        urlError.hidden = false
        return
      }

      if (urlField.value.length !== 0){
        urlList.innerHTML += `<li class="odd:bg-gray-300">${urlField.value}</li>`
      }

      urlField.value = ''
    })

    const backBtn = document.getElementById('CreateAuction-stepTwo-back')
    const nextBtn = document.getElementById('CreateAuction-stepTwo-next')
    const imgBtn = document.getElementById('create-auction-img-btn')

    backBtn.addEventListener('click', () => {
      console.log(imgList)

      setupStepOne({
        ...listing,
        media: Array.from(imgList.children).map(li => li.innerText)
      })
    })

    nextBtn.addEventListener('click', () => {
      setupStepThree({
        ...listing,
        media: Array.from(imgList.children).map(li => li.innerText)
      })
    })

    imgBtn.addEventListener('click', () => {
      const urlField = document.getElementById('create-auction-img-url')
      const urlList = document.getElementById('create-auction-img-list');
      const urlError = document.getElementById('create-auction-img-error')

      urlError.innerText = ''
      urlError.hidden = true

      const pictureUrlPattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (!pictureUrlPattern.test(urlField.value) && urlField.value.length !== 0) {
        urlError.innerText = 'The profile picture must be a public url linking to picture or empty'
        urlError.hidden = false
        return
      }

      if (urlField.value.length !== 0){
        urlList.innerHTML += `<li class="odd:bg-gray-300">${urlField.value}</li>`
      }

      urlField.value = ''
    })
  })

}

const setupStepThree = (listing) => {
  const createAuctionStepTwo = document.getElementById('createAuctionStepTwo')

  if (createAuctionStepTwo !== null) {
    createAuctionStepTwo.remove()
  }

  userMenuLocation.innerHTML += createMarkupStepThree(listing)

  setTimeout(() => {
    const tagError = document.getElementById('create-auction-tag-error')

    tagError.innerText = ''
    tagError.hidden = true

    let form = document.getElementById('createAuctionStepThree')

    form.addEventListener('submit', async (evt) => {
      evt.preventDefault()

      const response = await fetchRequester('listings', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          ...listing,
          endsAt: document.getElementById('create-auction-EndDate').value,
          tags: Array.from(document.getElementById('create-auction-tag-list').children).map(li => li.innerText)
        })
      })

      userMenu.close()

      form.remove()
      profileMenu()
    })

    const tagField = document.getElementById('create-auction-tag-field')
    tagField.addEventListener('keypress', (evt) => {
      if (evt.key === 'Enter') {

        evt.preventDefault()

        addTag()
      }
    })


    const backBtn = document.getElementById('CreateAuction-stepThree-back')
    const tagBtn = document.getElementById('create-auction-tag-btn')

    backBtn.addEventListener('click', () => setupStepTwo({
      ...listing,
      endsAt: document.getElementById('create-auction-EndDate').value,
      tags: Array.from(document.getElementById('create-auction-tag-list').children).map(li => li.innerText)
    }))
    tagBtn.addEventListener('click', () => {
      addTag()
    })
  })

}

const addTag = () => {
  const tagField = document.getElementById('create-auction-tag-field')
  const tagList = document.getElementById('create-auction-tag-list');
  const tagError = document.getElementById('create-auction-tag-error')

  tagError.innerText = ''
  tagError.hidden = true

  if (tagField.value?.trim().length === 0) {
    tagError.innerText = 'Tag can not be empty'
    tagError.hidden = false
  }

  if (tagField.value?.trim().length > 0)
    tagList.innerHTML += `<li class="odd:bg-gray-300">${tagField.value}</li>`
    tagField.value = ''
  }

export default () => setupStepOne()