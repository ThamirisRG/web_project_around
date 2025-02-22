export class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector(".cards__container").cloneNode(true);
  }


  _handleLike = (event) => {
    event.target.classList.toggle("cards__button-like_active");
  };

  _setEventListeners() {
    this._element.querySelector(".cards__button-like").addEventListener("click", this._handleLike);
    this._element.querySelector(".cards__image").addEventListener("click", () => this._handleCardClick(this._name, this._link));
    this._element.querySelector(".cards__delete").addEventListener("click", () => this._element.remove());
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
