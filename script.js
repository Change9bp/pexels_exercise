/*// .filter() filtra array senza modificare l'originale

let arrayNum = [52, 689, 21, 3, 65, 8, 125, 1, 5];
let newArray = arrayNum.filter((item) => item > 40);

console.log(newArray);

// .map() crea un nuovo array partendo da uno precedente

let arrayDueNum = [52, 689, 21, 3, 65, 8, 125, 1, 5];
let newArrayDue = arrayDueNum.map((item) => item * 2);

console.log(newArrayDue);

//
let miaVariabile;
fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen")
  .then((response) => response.json())
  .then((data) => console.log(data));
*/

// VARIABILI

let auth = "PHJYQsugN2nYDa9lV3hiHLo4HP5mOkfjw21gisuCfDrfOgVHqBXfmiGn";
let arrQuery = [
  "natura",
  "videogame",
  "luna",
  "castelli",
  "nuvole",
  "colori",
  "cani",
  "gatti",
];
let query = arrQuery[Math.round(Math.random() * arrQuery.length - 1)];
let boxCard1 = document.querySelector("#clm1");
let boxCard2 = document.querySelector("#clm2");
let boxCard3 = document.querySelector("#clm3");

// FETCH CHIAMATA PEXELS PER HEADER ***

function makeFetchCall(url, auth, query) {
  return fetch(url + query, {
    headers: {
      Authorization: auth,
    },
  });
}

makeFetchCall("https://api.pexels.com/v1/search?query=", auth, query)
  .then((res) => res.json())
  .then((res) => {
    console.log("primo console log", res);
    let randomValue = Math.round(Math.random() * (res.photos.length - 1));
    let headerHtml = document.querySelector("header");
    headerHtml.style.backgroundColor = res.photos[randomValue].avg_color;
    headerHtml.style.backgroundImage = `url("${res.photos[randomValue].src.landscape}")`;
  })
  .catch((err) => console.log(err));

//FUNZIONE PER POPOLARE LA HOME CON LA SELEZIONE GIORNALIERA

function makeFetchCallHome(url, auth) {
  return fetch(url, {
    headers: {
      Authorization: auth,
    },
  });
}

makeFetchCallHome("https://api.pexels.com/v1/curated", auth)
  .then((res) => res.json())
  .then((res) => {
    console.log("secondo console log", res.photos);

    //variabili

    let newArrPhoto = res.photos.map((card) => {
      return `<div class="card">
      <div class="d-flex justify-content-end">
        <button><i class="fa-regular fa-bookmark fa-xl"></i></button
        ><button><i class="fa-regular fa-heart fa-xl"></i></button>
      </div>
      <img src="${card.src.large}" class="card-img-top" alt="" />
      <div class="d-flex justify-content-between">
        <a href="${card.photographer_url}"><button><i class="fa-solid fa-user fa-xl" style="color: #ffffff;"></i></button>${card.photographer}</a>
        <button><i class="fa-solid fa-download fa-xl"></i></button>
      </div>
    </div>`;
    });

    //creo la card

    console.log(newArrPhoto);
    newArrPhoto.forEach((card) => {
      let divCol = document.createElement("div");
      divCol.classList.add("col-12");
      divCol.innerHTML = card;
      switch (true) {
        case boxCard1.childNodes.length < 5:
          boxCard1.appendChild(divCol);
          break;
        case boxCard2.childNodes.length < 5:
          boxCard2.appendChild(divCol);
          break;
        default:
          boxCard3.appendChild(divCol);
          break;
      }
    });
  })
  .catch((err) => console.log(err));

//RICERCA FOTO PER PAROLA CHIAVE, FUNZIONE SEARCH

let bottoneRicerca = document.querySelector("#searchDiv button");
let chiaveRicerca = document.querySelector("#search");

bottoneRicerca.addEventListener("click", () => {
  makeFetchCall(
    "https://api.pexels.com/v1/search?query=",
    auth,
    `${search.value}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("resolve 3", res);
      //variabili

      let newArrPhotoSearch = res.photos.map((card) => {
        return `<div class="card">
        <div class="d-flex justify-content-end">
          <button><i class="fa-regular fa-bookmark fa-xl"></i></button
          ><button><i class="fa-regular fa-heart fa-xl"></i></button>
        </div>
        <img src="${card.src.large}" class="card-img-top" alt="" />
        <div class="d-flex justify-content-between">
          <a href="${card.photographer_url}"><button><i class="fa-solid fa-user fa-xl" style="color: #ffffff;"></i></button>${card.photographer}</a>
          <button><i class="fa-solid fa-download fa-xl"></i></button>
        </div>
      </div>`;
      });

      //pulisco html
      boxCard.innerHTML = "";
      //creo la card

      console.log(newArrPhotoSearch);
      newArrPhotoSearch.forEach((card) => {
        let divCol = document.createElement("div");
        divCol.classList.add("col");
        divCol.innerHTML = card;
        switch (true) {
          case boxCard1.childNodes.length < 5:
            boxCard1.appendChild(divCol);
            break;
          case boxCard2.childNodes.length < 5:
            boxCard2.appendChild(divCol);
            break;
          default:
            boxCard3.appendChild(divCol);
            break;
        }
      });
    });
});
