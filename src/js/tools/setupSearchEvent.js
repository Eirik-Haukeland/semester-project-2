import search from '../search.js';

export default (elementName) => {
  const elements = document.querySelectorAll(`input[name="${elementName}"]`);

  elements.forEach((e) => {
    e.addEventListener('change', search);
  });
};
