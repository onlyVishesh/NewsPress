const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
let country = "in"
const countryList = [
  { name: "United Arab Emirates", code: "AE" },
  { name: "Argentina", code: "AR" },
  { name: "Austria", code: "AT" },
  { name: "Australia", code: "AU" },
  { name: "Belgium", code: "BE" },
  { name: "Bulgaria", code: "BG" },
  { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" },
  { name: "Switzerland", code: "CH" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Cuba", code: "CU" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Germany", code: "DE" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "United Kingdom", code: "GB" },
  { name: "Greece", code: "GR" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Indonesia", code: "ID" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "India", code: "IN" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "South Korea", code: "KR" },
  { name: "Lithuania", code: "LT" },
  { name: "Latvia", code: "LV" },
  { name: "Morocco", code: "MA" },
  { name: "Mexico", code: "MX" },
  { name: "Malaysia", code: "MY" },
  { name: "Nigeria", code: "NG" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Romania", code: "RO" },
  { name: "Russia", code: "RU" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Sweden", code: "SE" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Thailand", code: "TH" },
  { name: "Turkey", code: "TR" },
  { name: "Taiwan", code: "TW" },
  { name: "Ukraine", code: "UA" },
  { name: "United States", code: "US" },
  { name: "Venezuela", code: "VE" },
  { name: "South Africa", code: "ZA" },
];


function createDropdown() {
  countryList.forEach((country) => {
      document
          .querySelector(".type")
          .insertAdjacentHTML(
              "beforeend",
              `<option class="type-option" value="${country.code}">${country.name}</option>`
          );
  });
}

const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

//100 requests per day
let requestURL;

//Create cards from data
const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
    <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
    container.appendChild(card);
  }
};

//News API Call
const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
};

//Category Selection
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};


const selectCountry = () => {
  selectElement = document.querySelector('.type');
        country = selectElement.value;
        requestURL = `https://newsapi.org/v2/top-headlines?country=${country.toLowerCase()}&category=general&apiKey=${apiKey}`;
        getNews()
}
document.querySelector(".search-btn").addEventListener("click", ()=> {
  selectCountry()
      
})

//Options Buttons
const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
  createDropdown()
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};
