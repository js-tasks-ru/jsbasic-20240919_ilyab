function hideSelf() {
  let buttonhidden = document.querySelector(".hide-self-button");
  
  buttonhidden.addEventListener("click", function (event) {
    event.currentTarget.setAttribute("hidden", true) })
}