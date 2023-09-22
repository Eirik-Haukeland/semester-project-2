import authGetElements from "./authGetElements.js";
import {clearErrors} from "./authErrorHandler.js";

export default () => {
  const {
    authRadios,
    authInputLegend,
    authName,
    authPicture,
    authRepeatPassword,
    authSubmitButton,
  } = authGetElements()

  console.log(authName, authPicture, authRepeatPassword)

  authRadios.forEach(radio => {

    console.log('torsk')

    radio.addEventListener('change', evt => {
      clearErrors()

      const optionName = evt.target.value

      authInputLegend.innerText = `${optionName === 'login' ? 'Login information' : 'Registration information'}`
      authSubmitButton.innerText = `${optionName === 'login' ? 'Login' : 'Register'}`

      if (optionName === 'login') {
        authName.parentElement.classList.add('hidden')
        authPicture.parentElement.classList.add('hidden')
        authRepeatPassword.parentElement.classList.add('hidden')
      } else {
        authName.parentElement.classList.remove('hidden')
        authPicture.parentElement.classList.remove('hidden')
        authRepeatPassword.parentElement.classList.remove('hidden')
      }

      evt.target.checked = true
      evt.target.parentElement.children.forEach(element => {
        if (element.tagName.lowercase() !== optionName) {
          element.checked = false
        }
      })
    })
  })
}