'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// Smooth scroll (Learn More btn)
const scrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

scrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1Coords.left + window.pageXOffset,
    top: s1Coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // modern way
  // section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation (nav smooth scrolling) Using DELEGATION

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // e.preventDefault()
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause, this prevents the error message that came when we click on the root parent (in the closest).
  if (!clicked) return;

  // Activate TAP
  tabs.forEach(el => el.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Passing Arguments to Event Handlers (menu fade animation)

const nav = document.querySelector('nav');
// const navLinks = document.querySelectorAll('.nav__links');

function hoverHandler(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// Passing arguments via BIND method into Handler
nav.addEventListener('mouseover', hoverHandler.bind(0.5));
nav.addEventListener('mouseout', hoverHandler.bind(1));

// Sticky Navigaton : Bad way

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   console.log(initialCoords.top, window.scrollY);
//   if (initialCoords.top <= scrollY) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky Navigaton : Good way (Intersection Observer API)
const header = document.querySelector('.header');
const navHeigt = nav.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeigt}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  // Guard clause. cuz there's one intersection keeps appears every time.
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgs = document.querySelectorAll('.features__img');

function lazyLoading(entries, observer) {
  const [entry] = entries;

  // Guard clause. cuz there's one intersection keeps appears every time.
  if (!entry.isIntersecting) return;

  // Replacing src with data-src
  entry.target.src = entry.target.dataset.src;

  // cuz we don't want our visitors to see the low pixeld image before it loads
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}
const loadingObs = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0.4,
});

imgs.forEach(img => loadingObs.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
// Dots
const dotsContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlides = slides.length;

// createDots function
const createDots = function () {
  slides.forEach((_, i) =>
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  );
};
createDots();

const activateDot = function () {
  allDots.forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  allDots[curSlide].classList.add('dots__dot--active');
};

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // syncing the current slide with current activated dot
    const slide = e.target.dataset.slide;
    curSlide = slide;
    goToSlide(slide);
  }
});

// Selecting dots after creation
const allDots = document.querySelectorAll('.dots__dot');

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    // 0: 0%, 100%, 200%, 300%
    // 1: -100%, 0%, 100%, 200%
    // 2: -200%, -100%, 0%, 100%
    // 3: -300%, -200%, -100%, 0%
    slider.style.overflow = 'hidden';
  });
  slides[slide].style.overflow = 'visible';
  // allDots[slide].classList.add('dots__dot--active');
  activateDot();
};

goToSlide(curSlide);

function nextSlide() {
  if (curSlide >= maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot();
}

function prevSlide() {
  if (curSlide <= 0) {
    curSlide = maxSlides - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot();
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// Keyboard Events
document.addEventListener('keydown', function (e) {
  e.preventDefault();
  // console.log(e.key);
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// Lectures
/////////////////////////////////////////////////////

// // Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');

// console.log(allSections);

// console.log(document.getElementById('section--1'));
// console.log(document.getElementsByTagName('button'));
// console.log(document.getElementsByClassName('btn'));

// // Insert and Create

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookie for improved functionality and analytics.'
// message.innerHTML =
//   'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message); // prepend = add the element as the first child of header element
// header.append(message); // append = add the element as the last child of header element

// // header.append(message.cloneNode(true));

// // header.before(message); Before the header Element
// // header.after(message); After the header Element

// // Delete Element
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function (e) {
//     e.preventDefault();
//     message.remove();
//   });

// // Styles, Attributes and Classes

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.padding = '10px'; // It's added in inline style

// console.log(message.style.height); // We can check only inline style...
// console.log(message.style.width); // We can check only inline style...

// console.log(getComputedStyle(message)); // Here we can get all the styles !!
// console.log(getComputedStyle(message).color); // Here we can get all the styles !!
// console.log(getComputedStyle(message).height); // Here we can get all the styles !!

// // Change Css Variables
// document.documentElement.style.setProperty('--color-primary', 'white');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src); // Reads just the standard properties such : src, alt, class, id . Not Designer, MadeBy!
// // logo.src = '';
// console.log(logo.alt);

// console.log(logo.src); // The absolute Road
// console.log(logo.getAttribute('src')); // The relative Road

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // The absolute Road
// console.log(link.getAttribute('href')); // The relative Road

// // Data Attributes
// console.log(logo.dataset);
// console.log(logo.dataset.versionNumber);

// // Classes

// // Because Here you can add multiple classes

// logo.classList.add('c', 'v');
// logo.classList.remove('c', 'b');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // Don't USE
// logo.className = 'abdullah';

/////////////////////////////////////////////////////

// Smooth Scrolling

// const scrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// scrollTo.addEventListener('click', function (e) {
//   const s1Coords = section1.getBoundingClientRect();
//   window.scrollTo({
//     left: s1Coords.left + window.pageXOffset,
//     top: s1Coords.top + window.pageYOffset,
//     behavior: 'smooth',
//   });

//   // modern way
//   // section1.scrollIntoView({ behavior: 'smooth' });
// });

/////////////////////////////////////////////////////

// const h1 = document.querySelector('h1');

// function mouseHover(e) {
//   alert('addEventListener : Great!');

//   // Will Delete after the first time
//   h1.removeEventListener('mouseenter', mouseHover);
// }

// // is Better
// h1.addEventListener('mouseenter', mouseHover);

// // Or

// // Any changes will Override the first one

// // h1.onmouseenter = function (e) {
// //   alert('addEventListener : Great!');
// // };

/////////////////////////////////////////////////////

// // Event propagation in practice

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('.nav__link', e.target);

//   // Stop Propagation !
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('.nav__links', e.target);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('.nav', e.target);
// });

/////////////////////////////////////////////////////

// DOM Traverseing

// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log('________downwards_______');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';

// // Going upwards: parents
// console.log('________upwards_______');
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.backgroundColor = 'white';
// h1.closest('h1').style.backgroundColor = 'orangered';

// // Going sideways: siblings
// console.log('________sideways_______');
// console.log(h1.previousElementSibling); // Null, because h1 is ythe first element.
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling); // Not really important!
// console.log(h1.nextSibling); // Not really important!

// // How to get all the siblings of an element?
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.classList.add('hidden');
// });

/////////////////////////////////////////////////////
