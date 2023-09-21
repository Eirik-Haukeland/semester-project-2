export default (tag) => `
  <input 
    type="radio" 
    name="tagOption" 
    id="tagOption-${tag}" 
    class="sr-only" 
    value="${tag}"
  >
  <label 
    For="tagOption-${tag}" 
    class="border-pink-900 border-2 p-2 bg-gray-200 font-bold rounded-md"
  >
    ${tag}
  </label>
`;
