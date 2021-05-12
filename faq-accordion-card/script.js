const questionBlocks = document.querySelectorAll(".qa-block");
questionBlocks.forEach((question) =>
  question.addEventListener("click", toggleAnswer)
);

function toggleAnswer() {
  this.querySelector(".answer").classList.toggle("active");
  this.querySelector(".answer").classList.contains("active")
    ? this.querySelector(".arrow").style.setProperty(
        "transform",
        "rotateZ(-135deg)"
      )
    : this.querySelector(".arrow").style.setProperty(
        "transform",
        "rotateZ(45deg)"
      );
}
