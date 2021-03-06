/*Intersection observer was borrowed from https://developers.google.com/web/updates/2016/04/intersectionobserver*/

var options = {
    threshold: 1.0
}
let imagesHaveAnimated = false;
var img1 = document.querySelector('.img-1');
var img2 = document.querySelector('.img-2');
var img3 = document.querySelector('.img-3');

var io = new IntersectionObserver(
  entries => {
      entries.forEach(function(entry){
          if(entry.isIntersecting && imagesHaveAnimated==false){
              console.log(entry.target);
              /*Animation from Greensock*/
              TweenLite.from(img1, 2.5, {opacity: 0.3, x: -500});
              TweenLite.from(img2, 1.5, {opacity: 0.3, x: -500});
              TweenLite.from(img3, 2, {opacity: 0.3, x: -500});
              imagesHaveAnimated = true;
          }
      })
  },
  options
);

io.observe(document.querySelector('.text h1'));

/*End of intersection observer*/

let loader = document.querySelector(".overlay")
let modalLoader = document.querySelector(".modal-overlay");


function getAllEvents(){
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/stevents?_embed&per_page=100")
    .then(res=>res.json())
    .then(showEvents);
}

function showEvents(data){
    let eventlist = document.querySelector("#events");
    let template = document.querySelector("#eventTemplate").content;
    data.sort(function (a, b) {
      return a.acf.date - b.acf.date;
    });
    let today = (new Date()).toISOString().slice(0,10).replace(/-/g,"");

    data.forEach(function(theEvent){

        if(theEvent.acf.date>=today){
            let clone = template.cloneNode(true);
            let date = clone.querySelector(".date");
            let location = clone.querySelector(".location");
            let country = clone.querySelector(".country");
            let city = clone.querySelector(".city");
            let facebookLink = clone.querySelector('.facebook-link');
            let ticketLink = clone.querySelector('.ticket-link');
            let eventLinksBlock = clone.querySelector('.event-links');

            location.textContent = theEvent.acf.location;
            country.textContent = theEvent.acf.country;
            city.textContent = theEvent.acf.city;
            if(theEvent.acf.facebooklink){
                console.log(facebookLink);
                facebookLink.setAttribute("href", theEvent.acf.facebooklink);
            }else{
                facebookLink.classList.add("hidden-flex-1");
                //eventLinksBlock.classList.add("hidden-flex-1");
            }

            if(theEvent.acf.ticketlink){
                ticketLink.setAttribute("href", theEvent.acf.ticketlink);
            }else{
                ticketLink.classList.add("hidden-flex-1");
                //eventLinksBlock.classList.add("hidden-flex-1");
            }

            let nd=theEvent.acf.date;
            let y = nd.substring(0, 4);
            let m = nd.substring(4, 6);
            let d = nd.substring(6,8);
            let ts = new Date(y, m-1, d);

            date.textContent = d+"."+m+"."+y;

            eventlist.appendChild(clone);
        }
    });
    loader.classList.add('hidden');

};

getAllEvents();
