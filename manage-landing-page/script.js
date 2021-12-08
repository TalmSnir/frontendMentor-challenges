function main() {
  const menuBtn = document.querySelector('.btn--icon');
  const mobileMenu = menuBtn.nextElementSibling;
  const carouselCards = [...document.querySelectorAll('.card')];
  const carouselIndicators = [
    ...document.querySelectorAll('.carousel_indicator'),
  ];
  let cardId = 0;
  let interval;
  carouselCards[cardId].classList.add('show');
  carouselIndicators[cardId].classList.add('show');
  window.innerWidth < 1100 && carousel();
  function carousel() {
    interval = setInterval(() => {
      carouselCards.forEach((card, id) => {
        if (id !== cardId % carouselCards.length) card.classList.remove('show');
      });
      carouselIndicators.forEach((indicator, id) => {
        if (id !== cardId % carouselCards.length)
          indicator.classList.remove('show');
      });
      carouselCards[cardId % carouselCards.length].classList.add('show');
      carouselIndicators[cardId % carouselCards.length].classList.add('show');
      cardId++;
    }, 2000);
  }

  function toggleMobileMenu(e) {
    if (this == mobileMenu) {
      if (e.target === this) return;
    }
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      menuBtn.querySelector('i').classList.add('fa-times');
      const backdrop = document.createElement('div');
      backdrop.classList.add('backdrop');
      backdrop.addEventListener('click', toggleMobileMenu);
      const body = document.body;
      body.style.overflowY = 'hidden';
      body.appendChild(backdrop);
    } else {
      mobileMenu.classList.add('hidden');
      menuBtn.querySelector('i').classList.remove('fa-times');
      const backdrop = document.querySelector('.backdrop');
      backdrop.removeEventListener('click', toggleMobileMenu);
      const body = document.body;
      body.style.overflowY = '';
      body.removeChild(backdrop);
    }
  }
  function handleWindowResize() {
    const windowWidth = window.innerWidth;

    windowWidth >= 1100 &&
      !mobileMenu.classList.contains('hidden') &&
      toggleMobileMenu();
    if (windowWidth >= 1200 && interval) {
      clearInterval(interval);
      interval = null;
    }

    windowWidth <= 1200 && !interval && carousel();
  }

  menuBtn.addEventListener('click', toggleMobileMenu);
  mobileMenu.addEventListener('click', toggleMobileMenu);
  window.addEventListener('resize', handleWindowResize);
}

window.addEventListener('load', main);
