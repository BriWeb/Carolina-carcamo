import expandSliderImage from "./assets/js/expandSliderImage.js";
import sliderMovement from "./assets/js/sliderMovement.js";
import fetchHTML from "./assets/js/fetchHTML.js";
import fetchDATA from "./assets/js/fetchDATA.js";
import expandFeatured from "./assets/js/expandFeatured.js";
import fetchFilters from "./assets/js/fetchFilters.js";

// http://www.carolinacarcamo.com.ar/api/v1/destacadas
// http://www.carolinacarcamo.com.ar/api/v1/propiedades

document.addEventListener("DOMContentLoaded", e => {

  let $header = document.querySelector("header");
  let $footer = document.querySelector("footer");
  let $slider = document.querySelector(".slider");
  let $ubication = document.querySelector(".ubication");
  let $message = document.querySelector(".message");
  let $details = document.querySelectorAll("details");
  let featureds;

  document.addEventListener("click", e => {
    if(e.target.matches(".search__title") || e.target.matches(".search__arrow")){
      $details.forEach( details => {
        if(e.target !== details.querySelector(".search__title") && e.target !== details.querySelector(".search__arrow")) {
          details.removeAttribute("open")
        }
      })
    }
    if(e.target.matches(".featured__button")){
      let $element = e.target.parentNode.parentNode;
      let id = $element.getAttribute("data-id");

      expandFeatured(featureds, id);
    }
  })

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

  fetchHTML({
    url: ('assets/elements/map.html'),
    success: (ubication) => $ubication.innerHTML = ubication
  })

  fetchHTML({
    url: ('assets/elements/form.html'),
    success: (message) => $message.innerHTML = message
  })

  fetchDATA({
    url : "assets/destacadas.json",
    headers : {
      "Content-Type" : "application/json"
    },
    failure : (error) => {
      console.log(error);

      let $section = document.querySelector(".featured-container");
      let $div = document.createElement("div");
      let $p = document.createElement("p");

      $p.textContent = "¡Ocurrió un error al cagar las propiedades destacadas!";
      $p.classList.add("error");
      $div.appendChild($p);
      $section.insertAdjacentElement("beforebegin", $div);
    },
    success : (data) => {
      featureds = data.propiedades;
      let $fragment = document.createDocumentFragment();
      let $section = document.querySelector(".featured-container");
      let $template = document.getElementById("featured-template").content;

      data.propiedades.forEach(property => {
        $template.querySelector(".featured").setAttribute("data-id", `${property.id}`);
        $template.querySelector(".featured__image").setAttribute("src", `./assets/images/${property.imagenes.imagen1}`);
        $template.querySelector(".meters").textContent = `${property.m2}m`;
        $template.querySelector(".bedroom").textContent = `${property.habs} habs.`;
        $template.querySelector(".bathroom").textContent = property.banos > 1 ? `${property.banos} Baños` : `${property.banos} Baño`;
        let $clone = document.importNode($template, true);
        $fragment.appendChild($clone);
      })

      $section.appendChild($fragment)
    }
  })



  // let filters = {
  //   op : 1,
  //   tipo : 3
  // }
  // // console.log(JSON.stringify(filters))
  // fetchFilters({
  //   url : 'http://www.carolinacarcamo.com.ar/api/v1/filtro',
  //   headers : {
  //     'Content-Type' : 'application/json'
  //   },
  //   body: JSON.stringify(filters),
  //   body: filters,
  //   method : 'POST',
  //   mode: 'no-cors'
  // })

  fetchFilters({
    url : 'http://www.carolinacarcamo.com.ar/api/v1/propiedades',
    options : {
      method : 'GET',
      mode : 'no-cors'
    }
  })
})


// function getParameterByName(name) {
//   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//   results = regex.exec(location.search);
//   return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

// window.onload = () => {
//  	let tipo = getParameterByName('tipo')
//   let operacion = getParameterByName('opera')

//   if(tipo || operacion){
//     fetch()
//   }
// }