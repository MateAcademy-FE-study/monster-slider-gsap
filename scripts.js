(function(){
  // init
  ybSlider();

  ////////////////

  function ybSlider() {
    let slider = document.querySelector('.js-yb-slider'); /* NODE obj OR NULL */
    if (!slider) return;

    // variables
    let slides = slider.querySelectorAll('.yb-slider__item');
    let currentSlide = slides[0];
    let currentSlideIndex = getNodeIndex(currentSlide);
    let prev_btn = slider.querySelector('.js-yb-prev');
    let next_btn = slider.querySelector('.js-yb-next');
    let tl = new TimelineMax({ onComplete: sliderChanged });

    // Slider Classes
    let sliderClass = '.yb-slider';
    let slidePicture = sliderClass + '__img';
    let slideHeader = sliderClass + '__header';
    let animatedElements = [slidePicture, slideHeader];

    // events
    prev_btn.addEventListener('click', prevSlide);
    next_btn.addEventListener('click', goToNextSlide);

    // invocations
    init();


    //////////////////////


    // set first slide as active
    function init() {
      animatedElements.forEach(function (item) {
        currentSlide.querySelector(item).classList.add('active');
      });
    }

    function sliderChanged() {
      // let event = new Event("yb-slider::changed");
      // document.dispatchEvent(event);
      console.log('COMPLETE');
    }

    function prevSlide() {
      console.log('prev', this);
    }

    function goToNextSlide() {
      let nextSlide;
      if (currentSlideIndex === slides.length - 1) {
        nextSlide = slides[0];
      } else {
        nextSlide = slides[currentSlideIndex + 1];
      }

      tl
        .to(currentSlide.querySelector(slidePicture), 0.5, {x: '-100%', opacity: '0'})
        .to(currentSlide.querySelector(slideHeader), 0.5, {y: '-100%', opacity: '0' }, '-=0.5')
        .fromTo(nextSlide.querySelector(slidePicture), 0.5, {x:'100%'}, {x: '0%', opacity: '1', 'visibility': 'visible'}, '-=0.3')
        .fromTo(nextSlide.querySelector(slideHeader), 0.5, {y:'100%'}, {y: '0%', opacity: 1, 'visibility': 'visible'}, '-=0.3')
    }

  }

  // helpers
  function getNodeIndex(el) {
    return Array.prototype.indexOf.call(el.parentNode.children, el);
  }

})();