export class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = containerSelector;
  };

  renderItems(elem){
    elem.forEach(item => {
      this._renderer(item);
    });
  };

  addInitialItem(element){
    this._container.append(element);
  }

  addItem(element){
    this._container.prepend(element);
  }
};
