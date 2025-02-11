import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const editProfileValidator = new FormValidator(validationConfig, ".form");
editProfileValidator.enableValidation();

const formAddValidator = new FormValidator(validationConfig, ".form-add");
formAddValidator.enableValidation();

// variaveis que manipulam o popup do usuario
const popupEdit = document.querySelector(".popup-edit");
const editbutton = document.querySelector(".profile__button");

// variaveis que manipulam o popup de adicionar imagem
const buttonclose = document.querySelector(".popup__button-close-edit");
const formEditProfile = document.querySelector(".form");

// variaveis para adicionar o novo nome e descrição
const nome = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const addNome = document.querySelector(".form__input-name");
const addDescription = document.querySelector(".form__input-description");

// variaveis para adicionar a imagem
const inputTitle = document.querySelector("#title");
const inputUrl = document.querySelector("#url");
const cardsAdd = document.querySelector(".cards");
const formAddCard = document.querySelector(".form-add");


const popupImage = document.querySelector(".popup-image");
const popupButtonClose = document.querySelector(".popup__button-close");
const popupAdd = document.querySelector(".popup-add");


// evento para abrir popup de editar perfil
editbutton.addEventListener("click", () => openPopup(popupEdit));

// evento para fechar popup de editar perfil
buttonclose.addEventListener("click", () => closePopup(popupEdit));

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => {
  const newCard = new Card(card, "#cards-template");
  cardsAdd.prepend(newCard.generateCard());
});

// adicionando nome e mudando info
function addNames(event) {
  event.preventDefault();
  if (addNome.value != "" && addDescription.value != "") {
    nome.textContent = addNome.value;
    description.textContent = addDescription.value;
  }
  // fechar botao
  closePopup(popupEdit);
  addNome.value = "";
  addDescription.value = "";
}

formEditProfile.addEventListener("submit", addNames);

// abrir popup para adicionar a imagem
const buttonAdd = document.querySelector(".profile__add");
const popupAddCard = document.querySelector(".popup-add");
const buttonCloseAdd = document.querySelector(".popup__close-add");

//  abrir o popup para adicionar imagens
buttonAdd.addEventListener("click", () => openPopup(popupAddCard));

// // fechar o popup
buttonCloseAdd.addEventListener("click", () => closePopup(popupAddCard));

// adicionando imagens e tema
function addImage(event) {
  event.preventDefault();
  if (inputTitle.value != "" && inputUrl.value != "") {
    const newCard = new Card({
      name: inputTitle.value,
      link: inputUrl.value,
    }, "#cards-template");
    cardsAdd.prepend(newCard.generateCard());
    inputTitle.value = "";
    inputUrl.value = "";

    closePopup(popupAddCard);
  }
}

formAddCard.addEventListener("submit", addImage);

// fecha popup de imagem
popupButtonClose.addEventListener("click", () => closePopup(popupImage));

popupImage.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup-opened")) {
    closePopup(popupImage);
  }
});

popupEdit.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup-opened")) {
    closePopup(popupEdit);
  }
});

popupAdd.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup-opened")) {
    closePopup(popupAdd);
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup(popupImage);
    closePopup(popupEdit);
    closePopup(popupAdd);
  }
});
