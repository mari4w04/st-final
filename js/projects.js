let loader = document.querySelector(".overlay")
let modalLoader = document.querySelector(".modal-overlay");

modalLoader.classList.add('hidden');

function getAllProjects(){
    fetch("http://marijabelautdinova.com/wp/wp-json/wp/v2/stprojects?_embed&per_page=100")
    .then(res=>res.json())
    .then(showProjects);
}

let product_link = "http://marijabelautdinova.com/wp/wp-json/wp/v2/stprojects/";

function showProjects(data){
    let projectlist = document.querySelector("#projects");
    let template = document.querySelector("#projectTemplate").content;
    let modal = document.querySelector('.modal');
    let closeBtn = document.querySelector('.close-btn');
    data.sort(function (a, b) {
      return a.acf.order_number - b.acf.order_number;
    });

    closeBtn.addEventListener('click', function(){
        modal.classList.add('hidden');
    });
    data.forEach(function(theProject){
        console.log(theProject);
        let clone = template.cloneNode(true);
        let img = clone.querySelector(".project-img");
        let title = clone.querySelector(".project-title");
        img.setAttribute("style", "background-image: url("+theProject._embedded["wp:featuredmedia"][0].source_url+")");
        title.textContent = theProject.title.rendered;

        function showDetails(data){

            let name = modal.querySelector('.modal-content h1');
            let description = modal.querySelector('.modal-content .description');
            console.log(data);
            name.textContent = data.title.rendered;
            description.innerHTML=data.content.rendered;

            modal.classList.remove('hidden');
            modalLoader.classList.add('hidden');
            };

        let projectButton = clone.querySelector('.project-button');

        projectButton.addEventListener('click', function(e){
            modalLoader.classList.remove('hidden');
            e.preventDefault();
            console.log('click');
            console.log(theProject.id);
            let link = product_link + theProject.id;
            console.log(link);
            fetch(link).then(function(response){
                return response.json()
            }).then(function(productJson){
               showDetails(productJson);
            });
        });

        projectlist.appendChild(clone);
    });

    loader.classList.add('hidden');
};

getAllProjects();
