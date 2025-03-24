// Popup.js
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") this.close();
  }

  setEventListeners() {
    const buttonClose = this._popup.querySelector(".popup__button");

    buttonClose.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup-opened")) {
        this.close();
      }
    });
  }
}
