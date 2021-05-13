import fetchHTML from "./fetchHTML.js";

export default function expandFeatured (featureds, id) {
  featureds.forEach( featured => {
    if(featured.id == id) {
      let $featuredExpanded = document.querySelector(".featured-expanded");
      $featuredExpanded.querySelector(".featured-expanded__value").textContent = featured.valor;

      $featuredExpanded.querySelector(".featured-expanded__name").textContent = featured.nombre;
      $featuredExpanded.querySelector(".featured-expanded__image").setAttribute("src", `./assets/images/${featured.imagenes.imagen1}`);
      $featuredExpanded.querySelector(".featured-expanded__image").setAttribute("alt", `Imagen de la propiedad destacada número ${featured.id}`);
      $featuredExpanded.querySelector(".featured-expanded__description").textContent = featured.descripcion;
      $featuredExpanded.querySelector(".featured-expanded__meters").textContent = featured.m2;
      $featuredExpanded.querySelector(".featured-expanded__environments").textContent = featured.ambs;
      $featuredExpanded.querySelector(".featured-expanded__bedrooms").textContent = featured.habs;
      $featuredExpanded.querySelector(".featured-expanded__bathrooms").textContent = featured.banos;
      $featuredExpanded.querySelector(".featured-expanded__map-container").innerHTML = featured.ubicacion;
      
      $featuredExpanded.querySelector(".featured-expanded__map-container iframe").removeAttribute("width");
      $featuredExpanded.querySelector(".featured-expanded__map-container iframe").removeAttribute("height");
      $featuredExpanded.querySelector(".featured-expanded__map-container iframe").removeAttribute("style");
      $featuredExpanded.querySelector(".featured-expanded__map-container iframe").classList.add("featured-expanded__map");

      fetchHTML({
        url : "assets/elements/form.html",
        success: (form) => {
           let $featuredForm = document.querySelector(".featured-expanded__form");
           $featuredForm.innerHTML = form;
        }
      })


      let $div = $featuredExpanded.querySelector(".featured-expanded__benefits");
      let $fragmet = document.createDocumentFragment();
      
      if(featured.garage) {
        let $p = document.createElement("p");
        $p.textContent = "Cochera"
        $fragmet.appendChild($p);
      }
      if(featured.patio) {
        let $p = document.createElement("p");
        $p.textContent = "Patio"
        $fragmet.appendChild($p);
      }
      if(featured.mascotas){
        let $p = document.createElement("p");
        $p.textContent = "Apto mascotas"
        $fragmet.appendChild($p);
      }
      if(featured.arbolada){
        let $p = document.createElement("p");
        $p.textContent = "Arbolada"
        $fragmet.appendChild($p);
      }
      if(featured.piscina){
        let $p = document.createElement("p");
        $p.textContent = "Piscina"
        $fragmet.appendChild($p);
      }

      if($fragmet) {
        $div.appendChild($fragmet);
        document.querySelector(".featured-expanded__details").appendChild($div)
      }

      document.querySelector("body").style = "overflow:hidden";
      $featuredExpanded.style = "display: flex";

      document.addEventListener("click", e => {
        if(e.target.matches(".featured-expanded__close")){
          $featuredExpanded.style = "display: none";
          $div.innerHTML = "";
          document.querySelector("body").style = "overflow:auto";
        }
      })
    }
  })
}