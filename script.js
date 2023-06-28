'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const navContainer = document.querySelector('.nav__links');

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
  document.querySelector('.section').scrollIntoView({behavior: 'smooth'});
});

navContainer.addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.classList.contains('nav__link')) return;

  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({behavior: 'smooth'});
});

// TABS
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const tabs = document.querySelectorAll('.operations__tab');

tabsContainer.addEventListener('click', (e) => {
  const tab = e.target.closest('.operations__tab');
  if (!tab) return;

  tabs.forEach(tabBtn => tabBtn.classList.remove('operations__tab--active'));
  tab.classList.add('operations__tab--active');

  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${tab.dataset.tab}`).classList.add('operations__content--active');
});