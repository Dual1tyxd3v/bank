'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const navContainer = document.querySelector('.nav__links');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const tabs = document.querySelectorAll('.operations__tab');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

document.querySelector('.btn--scroll-to').addEventListener('click', () => {
  document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
});

navContainer.addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.classList.contains('nav__link')) return;

  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// TABS
tabsContainer.addEventListener('click', (e) => {
  const tab = e.target.closest('.operations__tab');
  if (!tab) return;

  tabs.forEach(tabBtn => tabBtn.classList.remove('operations__tab--active'));
  tab.classList.add('operations__tab--active');

  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${tab.dataset.tab}`).classList.add('operations__content--active');
});

// NAV HOVER
const changeOpacity = function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  e.target.closest('.nav').querySelectorAll('.nav__link, img').forEach(linkItem => {
    if (e.target !== linkItem) {
      linkItem.style.opacity = this;
    }
  });
};

nav.addEventListener('mouseover', changeOpacity.bind(0.5));

nav.addEventListener('mouseout', changeOpacity.bind(1));

// NAV STICKY
const navHeight = nav.getBoundingClientRect().height;

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
};
const observerCb = (entries) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};
const observer = new IntersectionObserver(observerCb, observerOptions)
observer.observe(header);

// SECTIONS ANIMATION
const sectionObserver = new IntersectionObserver((entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// IMAGES LAZY LOADING
const imgObserver = new IntersectionObserver((entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', e => e.target.classList.remove('lazy-img'));
  observer.unobserve(entry.target);
}, { rootMargin: '100px' });

document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));

// SLIDER
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnSlideNext = document.querySelector('.slider__btn--right');
  const btnSlidePrev = document.querySelector('.slider__btn--left');
  const dotsContainer = document.querySelector('.dots');

  let currentSlideIndex = 0;
  const MAX_SLIDE_INDEX = slides.length - 1;

  const createDots = () => {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot ${currentSlideIndex === i ? 'dots__dot--active' : ''}" data-slide="${i}"></button>`)
    });
  };
  createDots();

  const changeDotActive = (slideIndex) => {
    document.querySelector('.dots__dot--active').classList.remove('dots__dot--active');
    document.querySelector(`button[data-slide="${slideIndex}"]`).classList.add('dots__dot--active');
  };

  const toOrderSlides = (currentSlide) => {
    slides.forEach((slide, i) => slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`);
    changeDotActive(currentSlide);
  };
  toOrderSlides(currentSlideIndex);

  btnSlideNext.addEventListener('click', () => {
    if (currentSlideIndex === MAX_SLIDE_INDEX) {
      currentSlideIndex = 0;
    } else {
      currentSlideIndex++;
    }
    toOrderSlides(currentSlideIndex);
  });

  btnSlidePrev.addEventListener('click', () => {
    if (currentSlideIndex === 0) {
      currentSlideIndex = MAX_SLIDE_INDEX;
    } else {
      currentSlideIndex--;
    }
    toOrderSlides(currentSlideIndex);
  });

  dotsContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('dots__dot')) return;

    currentSlideIndex = e.target.dataset.slide;
    changeDotActive(currentSlideIndex);
    toOrderSlides(currentSlideIndex);
  });
};
slider();