let inserts = document.getElementById("infos");
let insert = document.getElementById("info");
let courgettes = document.getElementById("names");
let courgette = document.getElementById("name");
let counters = 0;
let counter = 0;

function searching() {
  input = document.getElementById("myInput").value;
  apikey(input);
}

function apikey(input) {
  let url = "http://www.omdbapi.com/?s=" + encodeURI(input) + "&apikey=1ffa6fa6";
  fetching(url);
}

function fetching(url) {
  fetch(url)
    .then((response) => (data = response.json()))
    .then((data) => {
      console.log(data.Search);
      for (let i = 0; i < data.Search.length; i++) {
        let id = data.Search[i].imdbID;
        resultById(id);
      }
    })
    .catch((error) => console.error("error:", error));
}

function resultById(id) {
  let urlbyid = "http://www.omdbapi.com/?i=" + encodeURI(id) + "&apikey=1ffa6fa6";
  fetchingById(urlbyid);
}

function fetchingById(urlbyid) {
  fetch(urlbyid)
    .then((response) => (data = response.json()))
    .then((data) => {
      console.log(data);
      let name = data.Title;
      let year = data.Released;
      let poster = data.Poster;
      let plot = data.Plot;
      results(name, year, poster);
      result(name, year, poster, plot);
    })
    .catch((error) => console.error("error:", error));
}

function results(name, year, poster) {
  inserts.innerHTML += `
  <div class="col-6 col-sm-6 col-md-3">
    <div class="card">
      <div class="card-img">
        <img src="${poster}" alt="">
      </div>
      <div class="card-body">
        <h1>${year}</h1>
        <p id="names">${name}</p>
        <button onclick="readMore(${counters++})">Read More</button>
      </div>
    </div>
  </div>`;
}

function result(name, year, poster, plot) {
  insert.innerHTML += `
  <div class="card">
    <div class="number${counter++}">
      <div class="card-img">
        <img src="${poster}" alt="">
      </div>
      <div class="card-body">
        <h1>${year}</h1>
        <p id="name">${name}</p>
        <p>${plot}</p>
        <button onclick="closer()">Close</button>
      </div>
    </div>
  </div>`;
}

function readMore() {
  let changeOpacity = document.querySelector("#number");
  changeOpacity.style.opacity = 1;
}

function closer() {
  let changeOpacity = document.querySelector("#number");
  changeOpacity.style.opacity = 0;
}
