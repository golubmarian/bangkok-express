import createElement from './create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.render();
  }

  render() {
    this.elem = document.createElement('DIV');
    this.elem.className = 'card';

    this.elem.insertAdjacentHTML('beforeend',`
    <div class="card__top">
      <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
      <span class="card__price">€${this.product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    `);    

    this.elem.addEventListener('click', this.onClick.bind(this));
  }

  onClick(e) {    
    if (e.target.closest('.card__button')){

      let event = new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true,      
      });
  
      this.elem.dispatchEvent(event);
    } 
  }
}
