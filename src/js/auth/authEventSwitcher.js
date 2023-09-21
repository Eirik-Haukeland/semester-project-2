import authGetElements from "./authGetElements.js";

export default () => {
  const {
    authRadios,
    authInputLegend,
    authName,
    authPicture,
    authRepeatPassword,
    authSubmitButton,
  } = authGetElements()

  authRadios.forEach(radio => {
    radio.addEventListener('change', evt => {
      const optionName = evt.target.value

      authInputLegend.innerText = `${optionName === 'login' ? 'Login information' : 'Registration information'}`
      authName.parentElement.hidden = optionName === 'login'
      authPicture.parentElement.hidden = optionName === 'login'
      authRepeatPassword.parentElement.hidden = optionName === 'login'
      authSubmitButton.innerText = `${optionName === 'login' ? 'Login' : 'Register'}`
    })
  })
}