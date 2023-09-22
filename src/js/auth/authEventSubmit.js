import fetchRequester from "../tools/fetchRequester.js";
import authErrorHandler, {clearErrors} from "./authErrorHandler.js";
import authGetElements from "./authGetElements.js";

export default () => {
  const {
    authName,
    authNameErrors,
    authEmail,
    authEmailErrors,
    authPicture,
    authPictureErrors,
    authPassword,
    authPasswordErrors,
    authRepeatPassword,
    authRepeatPasswordErrors,
    authSubmitButton,
    authRadios
  } = authGetElements()

   authSubmitButton.addEventListener('click', async () => {
    let selectedRadioValue

     authRadios.forEach(radio => {

       if (radio.checked) {
         selectedRadioValue = radio.value
       }

     })

    clearErrors()

    let errorInInput = false
    const emailPattern = /^([a-z0-9_\.\+-]+)@(stud.noroff.no)|(noroff.no)/
    if (!emailPattern.test(authEmail.value)) {
      authEmailErrors.innerText = 'The email must be a valid stud.noroff.no or noroff.no email address.'
      authEmailErrors.hidden = false
      errorInInput = true
    }

    const passwordPattern = /^.{8,}$/
    if (!passwordPattern.test(authPassword.value)) {
      authPasswordErrors.innerText = 'The password must be at least 8 characters.'
      authPasswordErrors.hidden = false
      errorInInput = true
    }

    const requestBody = {
      email: authEmail.value,
      password: authPassword.value
    }

    if (selectedRadioValue === 'register') {
      const namePattern = /^[a-zA-Z0-9_]+$/
      if (!namePattern.test(authName.value)) {
        authNameErrors.innerText = 'The name value must not contain punctuation symbols apart from underscore (_).'
        authNameErrors.hidden = false
        errorInInput = true
      }

      const pictureUrlPattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if (!pictureUrlPattern.test(authPicture.value) && authPicture.value.length !== 0) {
        authPictureErrors.innerText = 'The profile picture must be a public url linking to picture or empty'
        authPictureErrors.hidden = false
        errorInInput = true
      }

      if (authRepeatPassword.value !== authPassword.value) {
        authRepeatPasswordErrors.innerText = 'Both password fields must be the the same.'
        authRepeatPasswordErrors.hidden = false

        if (authPasswordErrors.hidden === true) {
          authPasswordErrors.innerText = 'Both password fields must be the the same.'
          authPasswordErrors.hidden = false
        }

        errorInInput = true
      }

      requestBody.name = authName.value
      requestBody.avatar = authPicture.value
    }

    if (errorInInput) {
      return
    }

    let response = await fetchRequester(`auth/${selectedRadioValue}`, requestBody)

    console.log(response)

    if (response.errors !== undefined) {
      authErrorHandler(response)
    }

    if (selectedRadioValue === 'register') {
      response = await fetchRequester(`auth/login`, {
        email: authEmail.value,
        password: authPassword.value
      })

      if (response.errors !== undefined) {
        authErrorHandler(response)
      }
    }

    Object.keys(response).forEach(key => {
      if (response[key].length > 0 || typeof response[key] === "number") {
        localStorage.setItem(`${key}`, response[key])
      }
    })

     if (localStorage.getItem('accessToken') !== null) {
       const userMenu = document.getElementById('user-menu')
       userMenu.close()
     }
  })
}