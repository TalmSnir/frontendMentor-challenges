/*=============================================
=            navigation toggle            =
=============================================*/
const menuIcon = document.querySelector(".nav__icon"),
  nav = document.querySelector(".nav__menu");

menuIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!nav.classList.contains("active")) {
    nav.classList.add("active");
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    nav.classList.remove("active");
    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-times");
  }
}
