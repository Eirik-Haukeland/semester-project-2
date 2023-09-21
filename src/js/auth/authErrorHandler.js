import authGetElements from "./authGetElements.js";

export default (errorList) => {
  const {
    authName,
    authNameErrors,
    authEmail,
    authEmailErrors,
    authPicture,
    authPictureErrors,
    authPassword,
    authPasswordErrors,
  } = authGetElements()

  errorList.errors.forEach(error => {
    switch (error.path) {
      case 'name':
        authName.classList.add('Error');
        authNameErrors.innerText = `${error.message}`
        break;
      case 'email':
        authEmail.classList.add('Error');
        authEmailErrors.innerText = `${error.message}`
        break;
      case 'avatar':
        authPicture.classList.add('Error');
        authPictureErrors.innerText = `${error.message}`
        break;
      case 'password':
        authPassword.classList.add('Error');
        authPasswordErrors.innerText = `${error.message}`
    }
  })
}