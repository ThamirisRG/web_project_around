// index.js - Atualizando para usar a API
import { Api } from "./Api_temp.js";
import { Section } from "./components/Section.js";
import { Card } from "./components/Card.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";

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

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "413f1d08-cf28-4642-b689-db9fc69c2c85",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    section.renderItems(cards);
  })
  .catch((err) => console.log("Erro ao carregar dados iniciais:", err));

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

const section = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        "#cards-template",
        (name, link) => popupImage.open(name, link),
        (cardId, cardElement) => popupConfirmDelete.open(cardId, cardElement),
        (cardId, isLiked) => api.isLiked(cardId, isLiked)
      );
      section.addItem(card.generateCard());
    },
  },
  ".cards"
);

const popupEditProfile = new PopupWithForm(".popup-edit", (formData) => {
  const editButtonSubmit = document.querySelector(".form__button-edit");
  editButtonSubmit.textContent = "Salvando...";
  api
    .updateUserInfo({
      name: formData.name, // Certifique-se de que os campos enviados estão corretos
      about: formData.description,
    })
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => console.log("Erro ao atualizar perfil:", err))
    .finally(() => {
      editButtonSubmit.textContent = "Salvar";
    });
});
popupEditProfile.setEventListeners();

document
  .querySelector(".profile__button")
  .addEventListener("click", () => popupEditProfile.open());

const popupAddCard = new PopupWithForm(".popup-add", (formData) => {
  const addButtonSubmit = document.querySelector(".form__button-add");
  addButtonSubmit.textContent = "Criando...";
  api
    .addNewCard({
      name: formData.name, // Certifique-se de que esses nomes correspondem aos inputs
      link: formData.link,
    })
    .then((newCard) => {
      const card = new Card(
        newCard,
        "#cards-template",
        (name, link) => popupImage.open(name, link),
        (cardId, cardElement) => popupConfirmDelete.open(cardId, cardElement),
        (cardId, isLiked) => api.isLiked(cardId, isLiked)
      );
      section.addItem(card.generateCard());
      popupAddCard.close();
    })
    .catch((err) => console.log("Erro ao adicionar cartão:", err))
    .finally(() => {
      addButtonSubmit.textContent = "Criar";
    });
});
popupAddCard.setEventListeners();

document
  .querySelector(".profile__add")
  .addEventListener("click", () => popupAddCard.open());

// Criar instância do popup de confirmação de exclusão
const popupConfirmDelete = new PopupWithConfirmation(
  ".popup-confirm-delete",
  (cardId, cardElement) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        popupConfirmDelete.close();
      })
      .catch((err) => console.log("Erro ao excluir cartão:", err));
  }
);
popupConfirmDelete.setEventListeners();

// Criar instância do popup de atualização de avatar
const popupAvatar = new PopupWithForm(".popup-avatar", (formData) => {
  const avatarButtonSubmit = document.querySelector(".form__button");
  avatarButtonSubmit.textContent = "Salvando...";
  api
    .updateAvatar(formData.avatar)
    .then((userData) => {
      userInfo.setUserAvatar(userData);
      popupAvatar.close();
    })
    .catch((err) => console.log("Erro ao atualizar avatar:", err))
    .finally(() => {
      avatarButtonSubmit.textContent = "Salvar";
    });
});
popupAvatar.setEventListeners();

// Evento para abrir popup de atualização do avatar
const avatarButton = document.querySelector(".profile__image-container");
avatarButton.addEventListener("click", () => {
  popupAvatar.open();
});

// Alteração no Card para usar o popup de confirmação antes da exclusão
const section1 = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        "#cards-template",
        (name, link) => popupImage.open(name, link),
        (cardId, cardElement) => popupConfirmDelete.open(cardId, cardElement),
        (cardId, isLiked) => api.isLiked(cardId, isLiked)
      );
      section1.addItem(card.generateCard());
    },
  },
  ".cards"
);
