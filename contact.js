import fetchHTML from "./assets/js/fetchHTML.js"
import expandSliderImage from "./assets/js/expandSliderImage.js";
import sliderMovement from "./assets/js/sliderMovement.js";

document.addEventListener("DOMContentLoaded", e => {

  let $header = document.querySelector("header");
  let $footer = document.querySelector("footer");
  let $slider = document.querySelector(".slider");
  let $ubication = document.querySelector(".ubication");
  let $message = document.querySelector(".message");

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
    url : "assets/elements/slider.html",
    success: (slider) => {
      $slider.innerHTML = slider;
      sliderMovement(".slider__img");
      expandSliderImage(".slider__img")
    }
  })

  fetchHTML({
    url: 'assets/elements/footer.html',
    success: (footer) => $footer.innerHTML = footer
  });

  fetchHTML({
    url: ('assets/elements/map.html'),
    success: (ubication) => $ubication.innerHTML = ubication
  })

  fetchHTML({
    url: ('assets/elements/form.html'),
    success: (message) => $message.innerHTML = message
  })

})