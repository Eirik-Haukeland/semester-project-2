import search from './search.js';
import setupSearchEvent from './tools/setupSearchEvent.js';
import loginRegister from "./auth/authFromSetup.js";

setupSearchEvent('sort-by');
search();

setInterval(() => {
  const isLoggedIn = localStorage.getItem('accessToken') !== null

  if (!isLoggedIn) {
    loginRegister()
  }


}, 500)
