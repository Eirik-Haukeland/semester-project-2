import makeCard from '../ui/makeCard.js';
import timestamp from './timestamp.js';

const addAuctions = (auctionArray, placementLocation) => {
  auctionArray.forEach((auction) => placementLocation.innerHTML += makeCard(auction));
};

export default (auctionObj) => {
  const nextPageBtn = document.getElementById('next-page-btn');
  if (nextPageBtn !== null) {
    nextPageBtn.remove();
  }

  const placementLocation = document.getElementById('resault');
  placementLocation.innerHTML = '';

  let currentPage = 1;
  addAuctions(auctionObj[currentPage], placementLocation);

  if (Object.values(auctionObj).length > currentPage) {
    const paginationAria = document.getElementById('paginationAria');
    paginationAria.innerHTML += `
      <button id="next-page-btn" class="text-white bg-pink-900 font-bold text-2xl p-2 rounded-md">
        More Auctions
      </button>
    `;

    setTimeout(() => {
      const nextPageBtn = document.getElementById('next-page-btn');

      nextPageBtn.addEventListener('click', () => {
        currentPage += 1;
        addAuctions(auctionObj[currentPage], placementLocation);

        if (Object.values(auctionObj).length === currentPage) {
          nextPageBtn.remove();
        }
      });
    }, 10);
  }

  setInterval(() => {
    const countdownSpans = document.querySelectorAll('span[data-countdown="true"]');
    countdownSpans.forEach((span, iter) => {
      const { timeMessage } = timestamp(span.dataset.endsAt);
      const timerText = countdownSpans[iter].querySelector('span');

      timerText.innerText = timeMessage;
    });
  }, 500);
};
