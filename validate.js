function addErrorMessage(input, errorMessage, config) {
  const errorMessageElement = input.nextElementSibling;
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(config.showErrorMessage);
  input.classList.add(config.inputInvalidErrorMessage);
}

function removeErrorMessage(input, errorMessage, config) {
  const errorMessageElement = input.nextElementSibling;
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.remove(config.showErrorMessage);
  input.classList.remove(config.inputInvalidErrorMessage);
}
function enableButton(item, config) {
  const button = document.querySelector(config.popupSaveButton);
  button.removeAttribute("disabled");
}
function disableButton(item, config) {
  const button = document.querySelector(config.popupSaveButton);
  button.setAttribute("disabled", true);
}

function checkIsValid(event, config) {
  const input = event.target;
  const isValid = input.validity.valid;
  const errorMessage = input.validationMessage;

  if (!isValid) {
    addErrorMessage(input, errorMessage, config);
    disableButton(input.id, config);
  } else {
    removeErrorMessage(input, errorMessage, config);
    enableButton(input.id, config);
  }
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formElement));

  for (const form of forms) {
    const inputs = Array.from(form.querySelectorAll(config.inputElement));
    for (const input of inputs) {
      input.addEventListener("input", (event) => checkIsValid(event, config));
    }
  }
}

enableValidation({
  formElement: "form",
  inputElement: "input",
  showErrorMessage: "error__message_show_error",
  inputInvalidErrorMessage: "invalid-input",
  popupSaveButton: ".form__button",
  formAddButton: "#create-button",
});function addErrorMessage(input, errorMessage, config) {
  const errorMessageElement = input.nextElementSibling;
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(config.showErrorMessage);
  input.classList.add(config.inputInvalidErrorMessage);
}

function removeErrorMessage(input, errorMessage, config) {
  const errorMessageElement = input.nextElementSibling;
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.remove(config.showErrorMessage);
  input.classList.remove(config.inputInvalidErrorMessage);
}
function enableButton(item, config) {
  const button = document.querySelector(config.popupSaveButton);
  button.removeAttribute("disabled");
}
function disableButton(item, config) {
  const button = document.querySelector(config.popupSaveButton);
  button.setAttribute("disabled", true);
}

function checkIsValid(event, config) {
  const input = event.target;
  const isValid = input.validity.valid;
  const errorMessage = input.validationMessage;

  if (!isValid) {
    addErrorMessage(input, errorMessage, config);
    disableButton(input.id, config);
  } else {
    removeErrorMessage(input, errorMessage, config);
    enableButton(input.id, config);
  }
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formElement));

  for (const form of forms) {
    const inputs = Array.from(form.querySelectorAll(config.inputElement));
    for (const input of inputs) {
      input.addEventListener("input", (event) => checkIsValid(event, config));
    }
  }
}

enableValidation({
  formElement: "form",
  inputElement: "input",
  showErrorMessage: "error__message_show_error",
  inputInvalidErrorMessage: "invalid-input",
  popupSaveButton: ".form__button",
  formAddButton: "#create-button",
});