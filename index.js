import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";

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


const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

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

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#cards-template", (name, link) => popupImage.open(name, link));
      section.addItem(card.generateCard());
    },
  },
  ".cards"
);
section.renderItems();

const popupEditProfile = new PopupWithForm(".popup-edit", (formData) => {
  userInfo.setUserInfo(formData);
});
popupEditProfile.setEventListeners();

document.querySelector(".profile__button").addEventListener("click", () => popupEditProfile.open());

const popupAddCard = new PopupWithForm(".popup-add", (formData) => {
  const newCard = new Card(formData, "#cards-template", (name, link) => popupImage.open(name, link));
  section.addItem(newCard.generateCard());
});
popupAddCard.setEventListeners();

document.querySelector(".profile__add").addEventListener("click", () => popupAddCard.open());
