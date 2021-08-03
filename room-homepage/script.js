const header = document.querySelector(".header__container"),
  menuIcon = document.querySelector(".header__icon"),
  imageSlider = document.querySelector(".image-slider__slide"),
  sliderImages = [...imageSlider.querySelectorAll(".slide__image picture")],
  sliderTexts = [
    ...imageSlider.querySelectorAll(".slide__text .text-container"),
  ],
  prevBtn = imageSlider.querySelector(".btn--prev"),
  nextBtn = imageSlider.querySelector(".btn--next");
let id = 0;

//Functions

function toggleMenu() {
  header.classList.toggle("show-menu");
  menuIcon.blur();

  const body = document.querySelector("body");
  if (header.classList.contains("show-menu")) {
    let bodyOverlay = document.createElement("div");
    bodyOverlay.classList.add("body-overlay");
    body.appendChild(bodyOverlay);
  } else {
    bodyOverlay = body.querySelector(".body-overlay");
    body.removeChild(bodyOverlay);
  }
}
function largeMenuDisplay() {
  if (window.innerWidth >= 900) {
    header.classList.remove("show-menu");
    const overlay = document.querySelector(".body-overlay");
    overlay ? overlay.remove() : "";
  }
}
function toggleImages() {
  sliderImages.forEach((img) => img.classList.remove("show-content"));
  sliderImages[id].classList.add("show-content");
  sliderTexts.forEach((text) => text.classList.remove("show-content"));
  sliderTexts[id].classList.add("show-content");
}

function nextImage() {
  id === sliderImages.length - 1 ? (id = 0) : id++;
  toggleImages();
}

function prevImage() {
  id === 0 ? (id = sliderImages.length - 1) : id--;
  toggleImages();
}

//Event listeners
menuIcon.addEventListener("click", toggleMenu);
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
window.addEventListener("resize", largeMenuDisplay);
