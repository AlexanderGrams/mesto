export class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  };

  renderItems(elem){
    if(elem) {
      this._renderer(elem);
    }else {
      this._items.forEach(item => {
        this._renderer(item);
      });
    }
  };

  addItem(element){
    this._container.prepend(element);
  }
};
