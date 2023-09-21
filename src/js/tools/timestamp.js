export default (endsAt) => {
  const milliSeconds = new Date(endsAt) - Date.now();
  const months = Math.floor(milliSeconds / (1000 * 60 * 60 * 24 * 12));
  const days = Math.floor((milliSeconds % (1000 * 60 * 60 * 24 * 12)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliSeconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliSeconds % (1000 * 60)) / (1000));

  let timeMessage = `${months} months`;
  const lessThanAMonth = months < 1;
  const lessThanADay = lessThanAMonth && days < 1;
  const auctionCountDown = lessThanADay && (hours > 0 || minutes > 0 || seconds > 0);

  if (lessThanAMonth && !lessThanADay) {
    timeMessage = `${days} days`;
  } else if (auctionCountDown) {
    timeMessage = `${hours}:${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`;
  } else if (lessThanADay) {
    timeMessage = 'Closed';
  }

  return {
    countdown: auctionCountDown,
    lessThanADay,
    timeMessage,
  };
};
