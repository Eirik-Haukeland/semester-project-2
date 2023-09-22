import authEventSwitcher from "./authEventSwitcher.js";
import authEventSubmit from "./authEventSubmit.js";
import authGetElements from "./authGetElements.js";

export default () => {
  const {authForm} = authGetElements()

  authForm.addEventListener('submit', evt => evt.preventDefault())

  authEventSwitcher()
  authEventSubmit()
}