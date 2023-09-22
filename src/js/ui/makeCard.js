import timestamp from "../tools/timestamp.js";

export default (item) => {
  const {
    countdown,
    lessThanADay,
    timeMessage
  } = timestamp(item.endsAt);

  return `
    <div class="bg-gray-200 max-sm:h-[25vw] sm:h-80 sm:w-64 grid max-sm:grid-cols-2 gap-1 sm:grid-cols-1 sm:grid-rows-6 rounded-md overflow-hidden border-2 border-pink-900" data-id="${item.id}">
      <img class="w-full h-[25vw] sm:h-full row-span-2 sm:row-span-4 max-sm:border-r sm:border-b border-pink-900 object-cover" src="${
        (item?.media.length !== 0)
         ? item.media.shift() 
         : '../../public/assets/no-image.svg'
      }" alt="">        
    <h3 class="mx-4 text-2xl line-clamp-2 ">${item.title}</h3>
    <span 
      class="mx-4 mb-4 flex h-[35px] self-end gap-2 w-min rounded-lg p-2 bg-white" 
      id="${item.id}-countDown" 
      data-ends-at="${item.endsAt}" 
      data-countdown="${countdown}">
      <svg class="h-full ${lessThanADay ? 'fill-pink-900' : ''}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50"></circle>
        <polyline stroke-width="10" stroke="rgb(255,255,255)" points="50,10 50,50 65,65"></polyline>
      </svg>
      <span class="text-sm font-bold self-center whitespace-nowrap ${lessThanADay ? 'text-pink-900' : ''}">${timeMessage}</span>
    </span>
  </div>`;
}