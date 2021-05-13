export default function sliderMovement (selector) {
  let index = 0;

  let $images = document.querySelectorAll(selector);

  const directions = () => {
    $images.forEach(img => {
      img.classList.add("none")
    })
    $images[index].classList.remove("none");
  }

  directions();

  document.addEventListener("click", e => {
    if(e.target.matches(".slider__forward")){
      if(index === 5) index = 0;
      else index ++;
      directions();
    }
    if(e.target.matches(".slider__backward")){
      if(index === 0) index = 5;
      else index --;
      directions();
    }
  })

}