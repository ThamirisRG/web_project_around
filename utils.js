// utils.js
export function openPopup(popup) {
  popup.classList.add("popup-opened");
  document.addEventListener("keydown", closePopupOnEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup-opened");
  document.removeEventListener("keydown", closePopupOnEscape);
}

function closePopupOnEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup-opened");
    if (openedPopup) closePopup(openedPopup);
  }
}
