import { openPopup } from "./utils.js";

// Card.js
export class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__container")
      .cloneNode(true);
  }

  _handleLike = (event) => {
    event.target.classList.toggle("cards__button-like_active");
  };

  _handleDelete = (event) => {
    event.target.closest(".cards__container").remove();
  };

  _handlePreviewImage = () => {
    const popupImage = document.querySelector(".popup-image");
    const popupImageElement = popupImage.querySelector(".popup__image-open");
    const popupTitleElement = popupImage.querySelector(".popup__image-name");

    popupImageElement.src = this._link;
    popupImageElement.alt = this._name;
    popupTitleElement.textContent = this._name;

    openPopup(popupImage);
  };

  _setEventListeners() {
    this._element.querySelector(".cards__button-like").addEventListener("click", this._handleLike);
    this._element.querySelector(".cards__delete").addEventListener("click", this._handleDelete);
    this._element.querySelector(".cards__image").addEventListener("click", this._handlePreviewImage);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".cards__container-name").textContent = this._name;
    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__image").alt = this._name;

    this._setEventListeners();
    return this._element;
  }
}

