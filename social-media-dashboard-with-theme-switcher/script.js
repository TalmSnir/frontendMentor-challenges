const colors = document.documentElement;

const darkLightToggle = document.querySelector("input[type=checkbox]");

function toggleDarkLight() {
  if (darkLightToggle.checked) {
    colors.style.setProperty("--clr-pageBg", darkColors.pageBg);
    colors.style.setProperty("--clr-cardBgTop", darkColors.cardBgTop);
    colors.style.setProperty("--clr-cardBgBottom", darkColors.cardBgBottom);
    colors.style.setProperty("--clr-text", darkColors.text);
    colors.style.setProperty("--clr-textSm", darkColors.textSm);
    colors.style.setProperty("--clr-toggleBg", darkColors.toggleBg);
  } else {
    colors.style.setProperty("--clr-pageBg", lightColors.pageBg);
    colors.style.setProperty("--clr-cardBgTop", lightColors.cardBgTop);
    colors.style.setProperty("--clr-cardBgBottom", lightColors.cardBgBottom);
    colors.style.setProperty("--clr-text", lightColors.text);
    colors.style.setProperty("--clr-textSm", lightColors.textSm);
    colors.style.setProperty("--clr-toggleBg", lightColors.toggleBg);
  }
}
darkLightToggle.addEventListener("change", toggleDarkLight);

// colors for dark and light mode

const lightColors = {
  pageBg: "hsl(0, 0%, 100%)",
  cardBgTop: "hsl(225, 100%, 98%)",
  cardBgBottom: "hsl(227, 47%, 96%)",
  text: "hsl(230, 17%, 14%)",
  textSm: "hsl(228, 12%, 44%)",
  toggleBg: "hsl(230, 22%, 74%)",
};

const darkColors = {
  pageBg: "hsl(230, 17%, 14%)",
  cardBgTop: "hsl(232, 19%, 30%)",
  cardBgBottom: "hsl(228, 28%, 40%)",
  text: "hsl(0, 0%, 100%)",
  textSm: "hsl(228, 34%, 66%)",
  toggleBg: "linear-gradient(to right,hsl(210, 78%, 56%), hsl(146, 68%, 55%))",
};
