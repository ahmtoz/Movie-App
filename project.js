const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films")



// Tüm eventleri yükleme

eventListeners();

function eventListeners() {
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);

    })

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;


    if (title === ""  || director === "" || url === ""){
        //Hata

        UI.displayMessages("Tüm alanlari doldurun...","danger");

    }else{
        //Yeni Film
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm);  //Arayüze Film Ekleme
        Storage.addFilmToStorage(newFilm);  // Storage'a film ekleme
        UI.displayMessages("Film başariyla eklendi...","success");
    }

    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        
        UI.displayMessages("Silme İşlemi Başarili...","success")
    }
}

function clearAllFilms(){
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
}