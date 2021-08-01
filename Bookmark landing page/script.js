const accordionQuestions = document.querySelectorAll(".accordion__question");
const menuIcon = document
  .querySelector(".header__menu__icon")
  .querySelector("i");
const header = document.querySelector(".header__container");
const features = [...document.querySelectorAll(".features__list__item ")];
const featuresBlocks = [...document.querySelectorAll(".feature__block")];
const emailInput = document.querySelector("input[type=email]");
const emailFormBtn = document.querySelector(".stay__email__btn");
const label = document.querySelector("label");
emailFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  emailInput.checkValidity()
    ? document.querySelector("form").submit()
    : label.classList.add("show-warning");
});

function toggleFeature() {
  features.forEach((feature, id) => {
    if (feature != this) {
      feature.classList.remove("active");
      featuresBlocks[id].classList.remove("active");
    } else {
      this.classList.add("active");
      featuresBlocks[id].classList.add("active");
    }
  });
}
function toggleAccordionQuestion() {
  this.classList.toggle("active");
}
function toggleMenu() {
  if (!header.classList.contains("active")) {
    this.classList.replace("fa-bars", "fa-times");
    header.classList.add("active");
  } else {
    this.classList.replace("fa-times", "fa-bars");
    header.classList.remove("active");
  }
}
function closeMenu() {
  if (window.innerWidth > 990) {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
    header.classList.remove("active");
  }
}
accordionQuestions.forEach((question) =>
  question.addEventListener("click", toggleAccordionQuestion)
);

menuIcon.addEventListener("click", toggleMenu);
features.forEach((feature) => feature.addEventListener("click", toggleFeature));
window.addEventListener("resize", closeMenu);
