const apiWorks = {
  method: "GET",
  headers: { "X-Api-Key": "XhYbCodqKg/D+XPymlyfCA==e2L2Vper75xdMuts" },
  contentType: "application/json",
};

const model = document.querySelector("#model");
const year = document.querySelector("#year-input");
const homeBtn = document.querySelector("#home");
const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");
const content = document.querySelector(".content-container");
let searchValue = [];
let url = "";

const namer = document.querySelector(".namer");
const NOR = document.querySelector(".result-number")

async function requestApi(url) {
  const response = await fetch(url, apiWorks);
  const data = await response.json();
  console.log(data);
  if (data.length > 0){
        content.innerHTML = `<button class="view-model" id="invis">VIEW MODEL</button>`
    showDataCards(data);
  }else{
    content.innerHTML = `    
    <main class="error">
      <h1>Unexpected Value</h1>
      <p>Please try search again</p>
    </main>`
  }
}

function filterBarResult() {
  if (model.value === "" && year.value === "" && searchBar.value === "") {
    url = `https://api.api-ninjas.com/v1/motorcycles?make=kawasaki&model=ninja&year=2018`;
    console.log("No value");
  } else {
    searchValue = searchBar.value.split(" ");
    if (model.value.length > 0 && year.value === "") {
      url = `https://api.api-ninjas.com/v1/motorcycles?make=kawasaki&model=${model.value}`;
      console.log(model.value);
    } else if (model.value.length > 0 && year.value.length > 0) {
      url = `https://api.api-ninjas.com/v1/motorcycles?make=kawasaki&model=${model.value}&year=${year.value}`;
    } else {
      if (isNaN(searchValue[1]) !== false) {
        url = `https://api.api-ninjas.com/v1/motorcycles?make=kawasaki&model=${searchValue[0]}`;
      } else {
        url = `https://api.api-ninjas.com/v1/motorcycles?make=kawasaki&model=${searchValue[0]}&year=${searchValue[1]} `;
      }

      console.log(`URL ${url}`);
    }
  }
  searchBar.value = "";
  requestApi(url);
}

function showDataCards(result) {
  content.innerHTML = `<button class="view-model" id="invis">VIEW MODEL</button>`;
  let code = "";
  NOR.textContent = `Results: ${result.length}`
  for (const entry of Object.entries(result)) {
    const [key, value] = entry;
    console.log("Keys: ", key, "Value: ", value.model);
    let CC = [];
    CC = value.displacement.split(" ");
    code = `<section class="card">
        <div class="holder">
          <img
            src="https://www.seastarsuperbikes.co.uk/wp-content/uploads/2023/01/23MY_Ninja-ZX-10R_GN1_STU-1-1500x1000.png"
            alt=""
          />
          <div class="description">
            <p class="model-name">  ${value.model + " " + value.year}</p>
            <p class="CC">Displacement: ${CC[0] + "CC "}</p>
            <p class="engine">Engine: ${value.engine}</p>
          </div>
        </div>
        <button class="view-model" onClick="viewModel()">VIEW MODEL</button>
      </section>`;
    content.innerHTML += code;
  }
}
searchBar.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    filterBarResult();
  }
});

searchBtn.addEventListener("click", () => {
  filterBarResult();
});
function returnHome(){
  console.log("clicked");
  window.open("index.html", "_self")
}

function viewModel() {
  console.log("Button Clicked");
}
