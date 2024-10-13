function toggleText() {
  let buttonhidden = document.querySelector(".toggle-text-button");
  let text = document.getElementById("text");

  buttonhidden.addEventListener("click", function () {
    text.hidden = !text.hidden})
  
}
