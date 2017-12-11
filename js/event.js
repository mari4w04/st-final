function getSingleEventById(myId){
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/stevents/"+myId+"/?_embed")
    .then(res=>res.json())
    .then(  showSingleEvent  );
};


function showSingleEvent( jEvent ){

    console.log(jEvent)
    let nd= jEvent.acf.date;
    let y = nd.substring(0, 4);
    let m = nd.substring(4, 6);
    let d = nd.substring(6,8);
    let ts = new Date(y, m-1, d);

    document.querySelector(".single-event h1").textContent=jEvent.title.rendered;
    document.querySelector(".single-event img").setAttribute("src", jEvent._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
    document.querySelector(".single-event .date").textContent= d+"."+m;
    document.querySelector(".single-event .time").textContent=jEvent.acf.time;
    document.querySelector(".single-event .location").textContent=jEvent.acf.location;
    document.querySelector(".single-event .city").innerHTML=jEvent.acf.city;
    document.querySelector(".single-event .country").innerHTML=jEvent.acf.country;
    document.querySelector(".single-event .description").innerHTML=jEvent.content.rendered;



};


var eventId = getUrlVars()["id"];
getSingleEventById(eventId)







function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
}
