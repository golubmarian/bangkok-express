import createElement from './create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = { steps, value };
    this.render();
    this.onClick();
    this.dragDrog();
  }

  render() {
    this.value = this.config.value;
    this.part = this.config.steps - 1;
    this.percents = 100 * this.value / this.part;

    this.elem = createElement(`
    <div class="slider">  
      <div class="slider__thumb" style="left: ${this.percents}%;">
        <span class="slider__value">${this.value}</span>
      </div>      
      <div class="slider__progress" style="width: ${this.percents}%;"></div>      
      <div class="slider__steps"></div>
    </div>    
    `);

    for (let i = 0; i < this.config.steps; i++) {
      let span = createElement(`<span></span>`);
      if (i == this.value) span.classList.add('slider__step-active');
      this.sub('steps').append(span);      
    }
  }

  onClick() {
    this.elem.addEventListener('click', event => {
      
      let clickX = event.clientX - this.elem.getBoundingClientRect().left;
      this.value = Math.round(clickX * this.part / this.elem.offsetWidth);
      this.percents = (100 / this.part) * this.value;
      this.toggle();
      this.customEvent();     

    });
  }

  toggle() {
    this.sub('thumb').style.left = `${this.percents}%`;
    this.sub('progress').style.width = `${this.percents}%`;
    this.sub('value').innerHTML = this.value;
    this.sub('step-active').classList.remove('slider__step-active');
    this.sub('steps').children[this.value].classList.add('slider__step-active');
  }

  customEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  dragDrog() {
    this.elem.addEventListener('pointerdown', event => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');
      
      document.onpointermove = event => {
        this.percents = this.getPercents(event);
        this.value = Math.round( this.percents * this.part / 100 );
        this.toggle();
      }

      document.onpointerup = () => {
        document.onpointermove = null;
        this.percents = (100 / this.part) * this.value;
        this.toggle(); 
        this.elem.classList.remove('slider_dragging');        
        this.customEvent();
        document.onpointerup = null; 
      }
    });
  }

  getPercents(event) {
    let percents = (event.clientX - this.elem.getBoundingClientRect().left) * 100 / this.elem.offsetWidth;
    
    if (percents <=  0) { return 0; }        
    if (percents >= 100) { return 100; }

    return percents;
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }
}
