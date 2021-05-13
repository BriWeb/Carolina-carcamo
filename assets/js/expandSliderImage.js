export default function expandSliderImage(selector) {
  document.addEventListener("click", e => {
    let $expandSlider = document.querySelector(".slider-expanded");

    if(e.target.matches(selector)){
      let $image = document.querySelector(".slider-expanded__image");

      $image.setAttribute("src", e.target.src);
      $image.setAttribute("alt", e.target.alt);

      $expandSlider.classList.remove("none");
      document.querySelector("body").style = "overflow:hidden";
    }

    if(e.target.matches(".slider-expanded__close")){
      $expandSlider.classList.add("none");
      document.querySelector("body").style = "overflow:auto";
    }
  })
}