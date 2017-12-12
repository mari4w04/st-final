/*Intersection observer was borrowed from https://developers.google.com/web/updates/2016/04/intersectionobserver*/
var options = {
    threshold: 1.0
}
let imagesHaveAnimated = false;
var img4 = document.querySelector('.img-4');
var img5 = document.querySelector('.img-5');
var img6 = document.querySelector('.img-6');
var img7 = document.querySelector('.img-7');
  //          TweenLite.set(img1, {opacity:0})
var io = new IntersectionObserver(
  entries => {
      entries.forEach(function(entry){
          if(entry.isIntersecting && imagesHaveAnimated==false){
              console.log(entry.target);
              /*Animation from Greensock*/
              TweenLite.from(img4, 1, {opacity: 0.3, x: 500});
              TweenLite.from(img5, 1.5, {opacity: 0.3, x: 500});
              TweenLite.from(img6, 1.8, {opacity: 0.3, x: 500});
              TweenLite.from(img7, 2.1, {opacity: 0.3, x: 500});
              imagesHaveAnimated = true;
          }
      })
  },
  options
);

io.observe(document.querySelector('.text h1'));
/* End of intersection observer */
