const cards = document.querySelectorAll(".card");
const nextArrow = document.querySelector(".next-arrow");
const prevArrow = document.querySelector(".prev-arrow");

nextArrow.addEventListener("click", nextCard);
prevArrow.addEventListener("click", prevCard);
let i = 0;

function nextCard() {
  let current = i;
  current == cards.length - 1 ? (i = 0) : ++i;
  cards[current].style.display = "none";
  cards[i].style.display = "flex";
}

function prevCard() {
  let current = i;
  current == 0 ? (i = cards.length - 1) : --i;
  cards[current].style.display = "none";
  cards[i].style.display = "flex";
}
