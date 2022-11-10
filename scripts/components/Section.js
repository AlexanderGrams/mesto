export class Section {
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  };

  rendererItems(){
    this.clear();

    this._items.forEach(item => {
      this._renderer(item);
    });
  };

  addItem(element){
    this._container.append(element);
  }

  clear(){
    this._container.innerHTML = ''
  }
};
