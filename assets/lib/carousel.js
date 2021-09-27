import createElement from './create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.reder();
    this.slidesAmount = this.slides.length;
    this.translate = 0;
    this.i = 0;
  }

  reder() {
    this.elem = document.createElement('DIV');
    this.elem.className = 'carousel';

    this.elem.insertAdjacentHTML('afterbegin', `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none;">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `);

    let carouselInner = document.createElement('DIV');
    carouselInner.className = 'carousel__inner';
    this.elem.append(carouselInner);

    this.slides.forEach(item => {
      carouselInner.insertAdjacentHTML('beforeend',`
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
    });
    
    this.elem.addEventListener('click', this.initCarousel.bind(this));
    this.elem.addEventListener('click', this.onClick.bind(this));
  }

  // initCarousel() {
  //   console.log(this);
  //   let elem = document.querySelector('.container');
  //   let carouselInnerElem = elem.querySelector('.carousel__inner');
  //   let carouselArrowRight = elem.querySelector('.carousel__arrow_right');
  //   let carouselArrowLeft = elem.querySelector('.carousel__arrow_left');

  //   update.call(this);

  //   elem.onclick = ({target}) => {
  //     if (target.closest('.carousel__arrow_right')) {
  //       next.call(this);
  //     }

  //     if (target.closest('.carousel__arrow_left')) {
  //       prev.call(this);
  //     }
  //   };

  //   function next() {
  //     this.currentSlideNumber++;
  //     update.call(this);
  //   }

  //   function prev() {
  //     this.currentSlideNumber--;
  //     update.call(this);
  //   }

  //   function update() {
  //     let offset = -carouselInnerElem.offsetWidth * this.currentSlideNumber;
  //     carouselInnerElem.style.transform = `translateX(${offset}px)`;

  //     if (this.currentSlideNumber == this.slidesAmount - 1) {
  //       carouselArrowRight.style.display = 'none';
  //     } else {
  //       carouselArrowRight.style.display = '';
  //     }

  //     if (this.currentSlideNumber == 0) {
  //       carouselArrowLeft.style.display = 'none';
  //     } else {
  //       carouselArrowLeft.style.display = '';
  //     }
  //   } 

  // }

  onClick(ev) {    
    if (ev.target.closest('.carousel__button')){
          
      let ev2 = new CustomEvent('product-add', {
        detail: ev.target.closest('.carousel__slide').dataset.id,
        bubbles: true,      
      });
  
      this.elem.dispatchEvent(ev2);
    } 
  }

  initCarousel(ev) {
    let carouselInner = document.querySelector('.carousel__inner');
    let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
    let carouselArrowRight = document.querySelector('.carousel__arrow_right');
    let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
    
    if (!ev.target.closest('.carousel__arrow')) {
      return;
    } else {      
      let whatArrow = ev.target.closest('.carousel__arrow_right') ? 'right' : 'left';
      toSlide.call(this, whatArrow);
    }
  
    function toSlide(whatArrow) {
      switch (whatArrow) {
        case 'right':
          carouselInner.style.transform = `translateX(${this.translate -= slideWidth}px)`;
          arrowSwitch.call(this, [this.i += 1]);
          break;
        case 'left':
          carouselInner.style.transform = `translateX(${this.translate += slideWidth}px)`;
          arrowSwitch.call(this, [this.i -= 1]);        
          break;
      }    
    }

    function arrowSwitch() {    
      switch (this.i) {
        case 0:
          carouselArrowLeft.style.display = 'none';
          break;
        case this.slidesAmount - 1:
          carouselArrowRight.style.display = 'none';
          break;
        default:
          carouselArrowLeft.style.display = '';
          carouselArrowRight.style.display = '';
      }
    }
  }
}