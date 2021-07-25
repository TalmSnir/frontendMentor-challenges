//search box
const search = document.querySelector(".search"),
  searchTags = document.querySelector(".search__tags");
const tags = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Junior",
  "Midweight",
  "Senior",
  "Ruby",
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Sass",
  "Vue",
  "Django",
  "RoR",
  "Python",
];
let currentSearchTags = [];

const cardsContainer = document.querySelector(".cards-container");
const clearButton = document.querySelector(".btn--clear");

function setSearchTags() {
  searchTags.innerHTML = tags
    .map((tag) => {
      return `<div class='search__tag'>
              <span class='search__tag__label'>${tag}</span>
              <span class='search__tag__remove'>X</span>
            </div>`;
    })
    .join("");
  return (currentSearchTags = [...searchTags.querySelectorAll(".search__tag")]);
}

function loadInfo() {
  currentSearchTags = setSearchTags();
  setCards();

  currentSearchTags.forEach((tag) => tag.addEventListener("click", removeTag));
}
function setCards() {
  const cardsData = fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((cardData) => createCard(cardData));
    });
}

function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("card");
  const cardDescription = `
    <img src="${cardData.logo}" alt="" class="card__logo" />
    <div class="card__description">
      <div class="description__header">
        <h2 class="header__company">${cardData.company}</h2>
        ${
          cardData.new
            ? '<span class="header__tag header__tag--new"> new!</span>'
            : ""
        }
        ${
          cardData.featured
            ? '<span class="header__tag header__tag--featured">featured</span>'
            : ""
        }
      </div>`;
  const cardInfo = ` 
    <div class="description__info">
        <h1 class="info__position">${cardData.position}</h1>
        <ul class="info__details">
          <li class="details__post-date">${cardData.postedAt}</li>
          <li class="details__contract">${cardData.contract}</li>
          <li class="details__location">${cardData.location}</li>
        </ul>
      </div>
    </div>`;
  const cardFooter = `
    <div class="card__footer footer">
    ${cardData.tools
      .map((tool) => `<span class="footer__tag">${tool}</span>`)
      .join("")}
    ${cardData.languages
      .map((lang) => `<span class="footer__tag">${lang}</span>`)
      .join("")}
  
    </div>`;
  card.innerHTML += cardDescription + cardInfo + cardFooter;
  cardsContainer.appendChild(card);
}
function removeTag() {
  this.style.display = "none";
  const tagName = this.querySelector(".search__tag__label").textContent;
  removeCards(tagName);
}
function removeCards(tag) {
  cards = [...document.querySelectorAll(".card")];
  const cardsToRemove = cards.filter((card) => {
    const footerTags = [...card.querySelectorAll(".footer__tag")].map(
      (footerTag) => footerTag.textContent
    );
    return footerTags.includes(tag);
  });
  cardsToRemove.forEach((card) => (card.style.display = "none"));
}
window.addEventListener("load", loadInfo);
clearButton.addEventListener("click", loadInfo);
