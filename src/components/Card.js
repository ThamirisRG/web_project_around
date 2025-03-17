//Cards
export class Card {
  constructor({ name, link, _id, isLiked }, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector(".cards__container").cloneNode(true);
  }


  _handleLike = (event) => {
    event.target.classList.toggle("cards__button-like_active");
    this._isLiked = !this._isLiked;
    this._handleCardLike(this._id, this._isLiked);
  };

  _setEventListeners() {
    this._element.querySelector(".cards__button-like").addEventListener("click", this._handleLike);
    this._element.querySelector(".cards__image").addEventListener("click", () => this._handleCardClick(this._name, this._link));
    this._element.querySelector(".cards__delete").addEventListener("click", () => {
      this._handleCardDelete(this._id, this._element);
    });
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