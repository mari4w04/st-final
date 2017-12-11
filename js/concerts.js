let loader = document.querySelector(".overlay")

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

    data.forEach(function(theEvent){
        console.log(theEvent);
        let clone = template.cloneNode(true);
        let date = clone.querySelector(".date");
        let location = clone.querySelector(".location");
        let country = clone.querySelector(".country");
        let city = clone.querySelector(".city");
        //let eventLink = clone.querySelector(".event-link");
        let facebookLink = clone.querySelector('.facebook-link');

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
    });
    loader.classList.add('hidden');
};

getAllEvents();
