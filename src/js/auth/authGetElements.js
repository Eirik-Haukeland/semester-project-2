export default () => {
  const authForm = document.getElementById('auth-action-form')
  const authRadios = authForm.querySelector('input[name="auth-action-radio"]')
  const authName = document.getElementById('auth-action-name')
  const authNameErrors = document.getElementById('auth-action-name-errors')
  const authEmail = document.getElementById('auth-action-email')
  const authEmailErrors = document.getElementById('auth-action-email-errors')
  const authPicture = document.getElementById('auth-action-picture')
  const authPictureErrors = document.getElementById('auth-action-picture-errors')
  const authPassword = document.getElementById('auth-action-password')
  const authPasswordErrors = document.getElementById('auth-action-password-errors')
  const authInputLegend = document.getElementById('auth-action-input-legend')
  const authRepeatPassword = document.getElementById('auth-action-repeat-password')
  const authRepeatPasswordErrors = document.getElementById('auth-action-repeat-password-errors')
  const authSubmitButton = document.getElementById('auth-action-button')
  const errorMessages = authForm.querySelectorAll('span[data-error-message="true"]')
  const selectedRadio = authForm.querySelector('input[name="auth-action-radio"]:checked')

  return {
    authForm,
    authName,
    authNameErrors,
    authEmail,
    authEmailErrors,
    authPicture,
    authPictureErrors,
    authPassword,
    authPasswordErrors,
    authRadios,
    authInputLegend,
    authRepeatPassword,
    authRepeatPasswordErrors,
    authSubmitButton,
    errorMessages,
    selectedRadio
  }
}