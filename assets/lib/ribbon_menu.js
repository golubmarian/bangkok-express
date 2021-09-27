import createElement from './create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">        
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    let categories = this.categories.map(item => createElement(`
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
    `));

    this.sub('inner').append(...categories);
    this.sub('item').classList.add('ribbon__item_active');
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  addEventListeners() {
    this.elem.onclick = ({target}) => {
      let button = target.closest('.ribbon__item');
      
      if (button) {
        this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        target.classList.add('ribbon__item_active');

        let id = target.dataset.id;

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: id,
          bubbles: true
        }));
      }

      if (target.closest('.ribbon__arrow_right')) {
        this.next();
      }

      if (target.closest('.ribbon__arrow_left')) {
        this.prev();
      }

      return false;
    };
  }

  next() {
    this.sub(`inner`).scrollBy(350, 0);
    this.update();
  }

  prev() {
    this.sub(`inner`).scrollBy(-350, 0);
    this.update();
  }

  update() {
    let ribbonInner = this.sub(`inner`);
    let scrollLeft = ribbonInner.scrollLeft;

    if (scrollLeft < 1) {
      this.sub(`arrow_left`).classList.remove('ribbon__arrow_visible');
    } else {
      this.sub(`arrow_left`).classList.add('ribbon__arrow_visible');
    }

    let scrollRight = ribbonInner.scrollWidth - scrollLeft - ribbonInner.clientWidth;

    if (scrollRight < 1) {
      this.sub(`arrow_right`).classList.remove('ribbon__arrow_visible');
    } else {
      this.sub(`arrow_right`).classList.add('ribbon__arrow_visible');
    }
  }
}
