// Section.js
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    if (!Array.isArray(items)) {
      console.error("Erro: 'items' não é um array!", items);
      return;
    }
    items.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}