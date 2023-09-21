import makeTag from '../ui/makeTag.js';
import setupSearchEvent from './setupSearchEvent.js';

export default (tagSet) => {
  const exsistingTags = document.querySelectorAll('input[name="tagOption"], input[name="tagOption"] + label');
  exsistingTags.forEach((tagBtn) => tagBtn.remove());

  const searchTagsContainer = document.getElementById('search-tags-container');

  tagSet.forEach((tag) => searchTagsContainer.innerHTML += makeTag(tag));

  searchTagsContainer.innerHTML += `
    <input 
      type="radio" 
      name="tagOption" 
      id="tagOption-close" 
      class="sr-only" 
      value=""
    >
    <label 
      For="tagOption-close" 
      class="hidden order-first border-pink-900 border-2 p-2 bg-black text-white font-bold rounded-md"
    >
      All Auctions
    </label>
  `;
  // we need to wait a little for the dom to update
  setTimeout(() => {
    setupSearchEvent('tagOption');
  }, 10);
};
