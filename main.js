var elList = document.querySelector(".list");
var elForm = document.querySelector(".js-form");
var elInput = document.querySelector(".js-input");
var elSelect = document.querySelector(".js-select");

function movesOur(movie) {
    elList.innerHTML = null;
    for (const film of movie) {
        function getTime(time) {        
            var hour = Math.floor(time / 60)
            var minut = Math.floor(time % 60)      
            return `${hour} hrs ${minut} min`
        };
        
        var elItem = document.createElement("li");
        elItem.classList.add("item");
        var elImg = document.createElement("img");
        elImg.classList.add("care_img");
        var elTitle = document.createElement("h3");
        elTitle.classList.add("title");
        var elRating = document.createElement("span");
        elRating.classList.add("card_span");
        var elYear = document.createElement("time");
        elYear.classList.add("card_year");
        var elTime = document.createElement("time");
        elTime.classList.add("card_time");
        var genreText = document.createElement("p");
        genreText.classList.add("genre_text");
        var elLink = document.createElement("a");
        elLink.classList.add("card_link");
        
        elImg.setAttribute("src", `https://i3.ytimg.com/vi/${film.ytid}/maxresdefault.jpg`);
        elTitle.textContent = film.Title;
        elRating.textContent = film.imdb_rating;
        elYear.textContent = film.movie_year;
        elTime.textContent =  getTime(film.runtime);
        genreText.textContent = film.Categories.split("|").join(" , ");
        elLink.textContent = "More info";
        
        elItem.append(elImg,elTitle,elRating,elYear,elTime,genreText,elLink);
        elList.appendChild(elItem);
        
        //    console.log(elItem);
        
    }
    
};


function selectArr() {
    var optionArr = []
    movies.forEach(itemes => {
        itemes.Categories.split("|").forEach(function (cate){
            if(!optionArr.includes(cate)){
                optionArr.push(cate)
            }
        })
    })
    
    optionArr.forEach(ganre => {
        var elOption = document.createElement("option");
        elOption.textContent = ganre;
        elOption.value = ganre
        elSelect.appendChild(elOption);
    })
}

selectArr()


elForm.addEventListener("submit", function (evt) {
    evt.preventDefault(); 
    
    var inputValue = elInput.value;
    var selectVal = elSelect.value;
    var newRegex = new RegExp(inputValue , "gi")
    
    var resultArr = movies.filter(item => {
        return item.Title.match(newRegex) && (item.Categories.includes(selectVal) || selectVal ==("all") );
    });
    console.log(selectVal);
    
    
    if(resultArr.length > 0) {
        movesOur(resultArr);
    }else {
        elList.textContent = "Not found 404"
        elList.style.color = "#fff";
        elList.style.fontWeight = "900"
        elList.style.fontSize = "80px";
    }    
    
    
});
movesOur(movies);



