var options = {
    threshold: 1.0
}
let imagesHaveAnimated = false;
var img1 = document.querySelector('.img-1');
var img2 = document.querySelector('.img-2');
var img3 = document.querySelector('.img-3');
  //          TweenLite.set(img1, {opacity:0})
var io = new IntersectionObserver(
  entries => {
      entries.forEach(function(entry){
          if(entry.isIntersecting && imagesHaveAnimated==false){
              console.log(entry.target);
              TweenLite.from(img1, 2.5, {opacity: 0.3, x: -500});
              TweenLite.from(img2, 1.5, {opacity: 0.3, x: -500});
              TweenLite.from(img3, 2, {opacity: 0.3, x: -500});
              imagesHaveAnimated = true;
          }
      })
      //console.log(entries)
      /*if(entries[0].isIntersecting){

            TweenLite.from(img1, 1, {opacity: 0.3, x: -500});
        }*/
  },
  options
);
// Start observing an element
io.observe(document.querySelector('.text h1'));
//io.observe(document.querySelector('.img-2'));
//io.observe(document.querySelector('.img-3'));

let loader = document.querySelector(".overlay")
let modalLoader = document.querySelector(".modal-overlay");


function getAllEvents(){
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/stevents?_embed&per_page=100")
    .then(res=>res.json())
    .then(showEvents);
}

/*function getSingleEventById(myId){
    console.log(myId);
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/stevents/"+myId+"/?_embed")
    .then(res=>res.json())
    .then(showSingleEvent);
};

function showSingleEvent(json){

    let nd=json.acf.date;
    let y = nd.substring(0, 4);
    let m = nd.substring(4, 6);
    let d = nd.substring(6,8);
    let ts = new Date(y, m-1, d);

    document.querySelector(".single-event h1").textContent=json.title.rendered;
    document.querySelector(".single-event img").setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
    document.querySelector(".single-event .date").textContent= d+"."+m;
    document.querySelector(".single-event .time").textContent=json.acf.time;

    document.querySelector(".single-event .location").textContent=json.acf.location;
    document.querySelector(".single-event .city").innerHTML=json.acf.city;
    document.querySelector(".single-event .country").innerHTML=json.acf.country;

    document.querySelector(".single-event .description").innerHTML=json.content.rendered;



};*/

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
            //let eventLink = clone.querySelector(".event-link");
            let facebookLink = clone.querySelector('.facebook-link');
            let ticketLink = clone.querySelector('.ticket-link');

            //let startingTime = clone.querySelector(".starting-time");
            //let doorsOpen = clone.querySelector(".doors-open span");
            //let title = clone.querySelector("h1");
            //let description = clone.querySelector(".description");
            //let smallDescription = clone.querySelector(".small-description");
            //let price = clone.querySelector(".price span");
            //let facebookLink = clone.querySelector(".facebook-link");
            //let ticketLink = clone.querySelector(".ticket-link");
            //let img = clone.querySelector("img");
            //let link = clone.querySelector("a.read-more");
            //let price = clone.querySelector(".price");

            //title.textContent = theEvent.title.rendered;
            //description.innerHTML = theEvent.content.rendered;
            //price.textContent = theEvent.acf.price;
            //console.log(theEvent._embedded["wp:featuredmedia"][0].media_details.sizes);
            //img.setAttribute("src", theEvent._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);

            //startingTime.textContent = theEvent.acf.starting_time;
            //smallDescription.innerHTML = theEvent.acf.small_description;
            //doorsOpen.textContent = theEvent.acf.doors_open;
            location.textContent = theEvent.acf.location;
            country.textContent = theEvent.acf.country;
            city.textContent = theEvent.acf.city;
            if(theEvent.acf.facebooklink){
                facebookLink.setAttribute("href", theEvent.acf.facebooklink);
            }else{
                facebookLink.classList.add("hidden-flex-1");
            }

            if(theEvent.acf.ticketlink){
                ticketLink.setAttribute("href", theEvent.acf.ticketlink);
            }else{
                ticketLink.classList.add("hidden-flex-1");
            }



            //facebookLink.setAttribute("href", theEvent.acf.facebook_link);
            //ticketLink.setAttribute("href", theEvent.acf.link_to_buy_a_ticket);
            //price.textContent = theEvent.acf.price;
            //eventLink.setAttribute("href", "stevent.html?id="+theEvent.id);


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

