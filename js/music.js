let loader = document.querySelector(".overlay");


function getAllAlbums(){
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/stalbums?_embed&per_page=100")
    .then(res=>res.json())
    .then(showAlbums);
}

function getAllCompositions(){
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/stcompositions?_embed&per_page=100")
    .then(res=>res.json())
    .then(showCompositions);
}

function showAlbums(data){

    let albumlist = document.querySelector("#albums");
    let template = document.querySelector("#albumTemplate").content;

    data.forEach(function(theAlbum){
        console.log(theAlbum);
        let clone = template.cloneNode(true);
        let img = clone.querySelector(".album-img");
        let artist = clone.querySelector(".artist");
        let title = clone.querySelector(".title");
        let itunesLink = clone.querySelector(".itunes");

        img.setAttribute("src", theAlbum._embedded["wp:featuredmedia"][0].source_url);
        artist.textContent = theAlbum.acf.artist;
        title.textContent = theAlbum.title.rendered;
		itunesLink.setAttribute("href", theAlbum.acf.itunes_link);


        albumlist.appendChild(clone);
    });
};



function showCompositions(data){
    let compositionlist = document.querySelector("#compositions");
    let template = document.querySelector("#compositionTemplate").content;

    data.forEach(function(theComposition){
        console.log('Composition: '+theComposition);
        let clone = template.cloneNode(true);
        let title = clone.querySelector(".composition-title");
        let file = clone.querySelector(".file");
        let playSound = clone.querySelector(".track");

        title.textContent = theComposition.title.rendered;
        file.setAttribute('href', theComposition.acf.file_with_sheets.url);
        playSound.setAttribute('src', theComposition.acf.music_track.url)

        let playBtn = clone.querySelector('.play');
        let track = clone.querySelector('.track');


        compositionlist.appendChild(clone);
        playBtn.addEventListener('click', function(){
            if (track.paused){
                track.play();
                playBtn.classList.remove('play-btn');
                playBtn.classList.add('pause-btn');
            }else{
                track.pause();
                playBtn.classList.add('play-btn');
                playBtn.classList.remove('pause-btn');
            }

        });

    });
    loader.classList.add('hidden');
};

getAllAlbums();

getAllCompositions();
