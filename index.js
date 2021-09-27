import Carousel from './assets/lib/carousel.js';
import slides from './assets/lib/sliders.js';

import RibbonMenu from './assets/lib/ribbon_menu.js';
import categories from './assets/lib/categories.js';

import StepSlider from './assets/lib/step_slider.js';
import ProductsGrid from './assets/lib/product_grid.js';

import CartIcon from './assets/lib/cart_icon.js';
import Cart from './assets/lib/cart.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    
    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch('products.json');

    this.products = await response.json(); 

    this.productsGrid = new ProductsGrid(this.products);

    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => {
       let addProductId = event.detail;
       let productToAdd = this.products.find((product) => product.id === addProductId);
 
       if (productToAdd) {
         this.cart.addProduct(productToAdd);
       }
    });

    document.body.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    let noNutsControl = document.querySelector('#nuts-checkbox');
    noNutsControl.addEventListener('change', (event) => {
      this.productsGrid.updateFilter({ noNuts: event.target.checked });
    });

    let vegetarianOnlyControl = document.querySelector('#vegeterian-checkbox');
    vegetarianOnlyControl.addEventListener('change', (event) => {
      this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
    });  
  }
}
