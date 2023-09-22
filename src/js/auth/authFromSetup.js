import authEventSetup from "./authEventSetup.js";

export default () => {
  const dialogElement = document.getElementById('user-menu-location')

  dialogElement.innerHTML += `
    <form id="auth-action-form" class="bg-gray-200 flex flex-col gap-1 rounded-b-md p-1 px-2">
      <fieldset class="col-start-4 flex self-center content-center w-min self-start [500px]:justify-self-end overflow-clip max-[500px]:col-span-4">
        <legend class="sr-only">register or login</legend>
        <input type="radio" checked name="auth-action-radio" id="auth-action-register" class="peer/auth-action-register sr-only" value="register">
        <label for="auth-action-register" class="peer-checked/auth-action-register:bg-pink-900 peer-checked/auth-action-register:text-white p-2 bg-gray-200 whitespace-nowrap font-bold rounded-l-md border-2 border-pink-900">register</label>
        <input type="radio" name="auth-action-radio" id="auth-action-login" class="peer/auth-action-login sr-only" value="login">
        <label for="auth-action-login" class="peer-checked/auth-action-login:bg-pink-900 peer-checked/auth-action-login:text-white p-2 bg-gray-200 whitespace-nowrap font-bold rounded-r-md border-2 border-pink-900">login</label>
      </fieldset>
      <fieldset class="flex flex-col justify-content-center content-center">
        <legend id="auth-action-input-legend" class="sr-only">Registration information</legend>
        <div class="flex flex-col-reverse">
          <span hidden id="auth-action-name-errors" data-error-message="true" class="text-pink-900 text-bold"></span>
          <input type="text" name="auth-action-name" id="auth-action-name" class="border-2 px-0.5 border-gray-500 rounded-sm">
          <label for="auth-action-name" class="whitespace-nowrap font-bold">Name</label>
        </div>
        <div class="flex flex-col-reverse">
          <span hidden id="auth-action-email-errors" data-error-message="true" class="text-pink-900 text-bold"></span>
          <input type="text" name="auth-action-email" id="auth-action-email" class="border-2 px-0.5 border-gray-500 rounded-sm">
          <label for="auth-action-email" class="whitespace-nowrap font-bold">Email</label>
        </div>
        <div class="flex flex-col-reverse">
          <span hidden id="auth-action-picture-errors" data-error-message="true" class="text-pink-900 text-bold"></span>
          <input type="text" name="auth-action-picture" id="auth-action-picture" class="border-2 px-0.5 border-gray-500 rounded-sm">
          <label for="auth-action-picture" class="whitespace-nowrap font-bold">Link to profile picure</label>
        </div>
        <div class="flex flex-col-reverse">
          <span hidden id="auth-action-password-errors" data-error-message="true" class="text-pink-900 text-bold"></span>
          <input type="text" name="auth-action-password" id="auth-action-password" class="border-2 px-0.5 border-gray-500 rounded-sm">
          <label for="auth-action-password" class="whitespace-nowrap font-bold">Password</label>
        </div>
        <div class="flex flex-col-reverse">
          <span hidden id="auth-action-repeat-password-errors" data-error-message="true" class="text-pink-900 text-bold"></span>
          <input type="text" name="auth-action-repeat-password" id="auth-action-repeat-password" class="border-2 px-0.5 border-gray-500 rounded-sm">
          <label for="auth-action-repeat-password" class="whitespace-nowrap font-bold">Repeat Password</label>
        </div>
      </fieldset>
      <button id="auth-action-button" class="self-center bg-pink-900 text-white rounded-md text-bold text-lg w-min h-min p-2 px-3 mt-2">Register</button>
    </form>
  `

  setTimeout(() => {
    authEventSetup()
  }, 10)
}

