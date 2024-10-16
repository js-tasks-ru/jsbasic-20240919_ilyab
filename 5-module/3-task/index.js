function initCarousel() {
  let switchTool = document.querySelector(".carousel__inner");
  let arrowright = document.querySelector(".carousel__arrow_right");
  let arrowleft = document.querySelector(".carousel__arrow_left");
  let totalWidth = switchTool.offsetWidth;
  let Offset = 0;
  let OffsetWidth = -(totalWidth * 3);

  arrowleft.style.display = "none";

  arrowright.addEventListener("click", function (event) {
    Offset -= totalWidth;
    switchTool.style.transform = `translateX(${Offset}px)`;
    if (event) {
      arrowleft.style.display = "";
    }
    if (Offset <= OffsetWidth) {
      arrowright.style.display = "none";
    }
    console.log(Offset);
  });

  arrowleft.addEventListener("click", function (event) {
    Offset += totalWidth;
    switchTool.style.transform = `translateX(${Offset}px)`;
    if (event) {
      arrowright.style.display = "";
    }
    if (Offset === 0) {
      arrowleft.style.display = "none";
    }
    console.log(Offset) });
}
