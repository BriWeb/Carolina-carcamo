import expandSliderImage from "./assets/js/expandSliderImage.js";
import sliderMovement from "./assets/js/sliderMovement.js";
import fetchHTML from "./assets/js/fetchHTML.js";

document.addEventListener("DOMContentLoaded", e => {

  let $header = document.querySelector("header");
  let $footer = document.querySelector("footer");
  let $slider = document.querySelector(".slider");

  fetchHTML({
    url: 'assets/elements/header.html',
    success: (header) => {
      $header.innerHTML = header;
      let classActive = $header.getAttribute("data-header");
      let $linkActive = document.querySelector(`.nav__link[class='nav__link ${classActive}']`);
      $linkActive.classList.add("nav__link--is-active");
    }
  });

  fetchHTML({
    url: 'assets/elements/footer.html',
    success: (footer) => $footer.innerHTML = footer
  });

  fetchHTML({
    url: ('assets/elements/slider.html'),
    success: (slider) => {
      $slider.innerHTML = slider
      sliderMovement(".slider__img");
      expandSliderImage(".slider__img");
    }  
  })

})