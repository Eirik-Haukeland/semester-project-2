import fetchRequester from "../tools/fetchRequester.js";
import timestamp from "../tools/timestamp.js";

export default async (id) => {
  const response = await fetchRequester(`listings/${id}?_seller=true&_bids=true`, {
    method:'GET',
    headers: {'accept': 'application/json'}
  })

  const {
    countdown,
    lessThanADay,
    timeMessage
  } = timestamp(response.endsAt);

  const displaySingleLocation = document.getElementById('single-auction-card-location')

  displaySingleLocation.innerHTML += `
    <article class="bg-gray-200">
      <div id="displaySingle-img-location">
        <img id="displaySingle-img" class="min-w-fill h-20rem object-cover" src="${
          response.media.length > 0
            ? response.media.shift()
            : '../../public/assets/no-image.svg'
        }" alt="">
        ${
          response.media.length > 1 
            ? `
              <div class="flex">
                <button id="displaySingle-img-previusImg">previus image</button>
                <span id="displaySingle-img-count">${response.media[1]}/${response.media.length()}</span>
                <button id="displaySingle-img-nextImg">next Image</button>
              </div>
              `
            : ''
        }
      </div>
      
      <div class="p-2 flex flex-col gap-5">
        <div class="flex gap-3">
          <div class="flex flex-col w-full gap-3">
            <h2 class="text-3xl text-bold">${response.title}</h2>
          
            <span 
              class="flex h-fit gap-2 items-center w-min rounded-lg p-2 bg-white" 
              id="${response.id}-countDown" 
              data-ends-at="${response.endsAt}" 
              data-countdown="${countdown}">
              <svg class="h-fit min-h-[1rem] ${lessThanADay ? 'fill-pink-900' : ''}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50"></circle>
                <polyline stroke-width="10" stroke="rgb(255,255,255)" points="50,10 50,50 65,65"></polyline>
              </svg>
              <span class="text-sm font-bold self-center whitespace-nowrap ${lessThanADay ? 'text-pink-900' : ''}">${timeMessage}</span>
            </span>
            
            <div class="flex flex-wrap gap-1">
              ${response.tags?.reduce((returnString, tag) => returnString += `<span class="bg-pink-900 text-white py-1 px-2 rounded w-min whitespace-nowrap">${tag}</span>`, '')}
            </div>
          </div>
          
          <div id="displaySingle-seller" class="w-1/3 min-w-[8rem] h-min flex flex-col bg-white rounded items-center p-2">
            ${ response.seller.avatar!== null
              ? `<img src="${response.seller?.avatar}" class="h-auto w-fill border-4 border-white rounded-full" alt="" />`
              : '<svg class="h-auto w-fill border-4 border-white rounded-full bg-pink-900 object-fill" viewBox="0 0 84 85" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.6825 76.3874C22 73.8208 22 69.8824 22 63.5C22 54.0842 28.1968 46.1158 36.7346 43.4505L37.4 42.5L37.3109 42.3727C34.1276 39.8531 32 35.493 32 31.5C32 25.4249 36.9249 20.5 43 20.5C49.0751 20.5 54 25.4249 54 31.5C54 35.493 51.8724 39.8531 48.6891 42.3727L48.6 42.5L49.2654 43.4505C57.8032 46.1158 64 54.0842 64 63.5C64 64.9562 64.0131 66.275 64.025 67.4723C64.0571 70.7115 64.0804 73.0609 63.8118 74.835C74.1822 67.8259 81 55.9591 81 42.5C81 20.9609 63.5391 3.5 42 3.5C20.4609 3.5 3 20.9609 3 42.5C3 57.0107 10.9248 69.6705 22.6825 76.3874ZM42.9552 84.4893C42.6377 84.4964 42.3193 84.5 42 84.5C18.804 84.5 0 65.696 0 42.5C0 19.304 18.804 0.5 42 0.5C65.196 0.5 84 19.304 84 42.5C84 65.3452 65.7604 83.9303 43.0493 84.4872L43 84.5L42.9552 84.4893Z" fill="white"/></svg>'
            }
            <span>${response.seller?.name}</span>
          </div>
        </div>
      
        <p>${response.description}</p>
        
        <div class="flex flex-col w-full gap-3">
          <h3 class="text-underline text-bold text-xl">Bids:</h3>
          <ul>
            ${response._count.bids > 0
                ? response.bids.reduce((returnString, bid) => returnString += `<li class="flex justify-between odd:bg-gray-300 px-5"><span>${bid.bidderName}: </span><span>${bid.amount}</span></li>`, '')
                : `<li class="flex justify-between">There is no bids on this auction</li>`
              }
          </ul>
          <form id="displaySingle-makeBid" class="flex">
            <input id="displaySingle-makeBid-amount" class="h-full w-full text-lg rounded-l-md py-1 px-2" type="number">
            <label for="displaySingle-makeBid-amount" class="sr-only">amount you bid:</label>
            <button class="bg-pink-900 text-white rounded-r-md text-bold text-lg py-1 px-2 whitespace-nowrap">Palce Bid</button>
          </form>       
        </div>
      </div>
    </article>
  `
}