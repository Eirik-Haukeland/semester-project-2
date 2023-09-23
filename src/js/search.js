import fetchRequester from "./tools/fetchRequester.js";
import populateTags from "./tools/populateTags.js";
import populateAuctions from "./tools/populateAuctions.js";

export default async () => {
  const yourAuctions = document.getElementById('search-your-auctions');
  const userAuctions = yourAuctions.checked ? `profiles/${yourAuctions.value}/` : '';

  const sort = document.querySelector('input[name="sort-by"]:checked')
  const searchSort = `&sort=${sort.value === 'endsAt' ? 'endsAt&sortOrder=asc' : 'created'}`;

  const tag = document.querySelector('input[name="tagOption"]:checked') || '';
  const searchTag = tag.value !== undefined ? `&_tag=${tag.value}` : '';

  const data = await fetchRequester(`${userAuctions}listings?_bids=true${searchSort}${searchTag}`);

  let count = -1
  // only change tags when not searching with a tag
  let tagSet = new Set()

  let auctionsObj = {}

  data.forEach(item => {
    let date = new Date()
    date.setDate(date.getDate() - 2)

    if (new Date(item.endsAt) < date || item?.title.length === 0) {
      return
    } else {
      count++
    }

    if (item.tags.length >= 1) {
      item.tags.forEach(tag => {
        if (tag.trim() !== '') {
          tagSet.add(tag)
        }
      })
    }

    const pageCountNumb = Math.floor(count / 10) + 1
    auctionsObj[pageCountNumb] = (auctionsObj[pageCountNumb] !== undefined)
      ? [...auctionsObj[pageCountNumb], item]
      : [item]
  })

  if (searchTag === '') {
    populateTags(tagSet)
  } else {
    console.log(searchTag)
  }
  populateAuctions(auctionsObj)
}
