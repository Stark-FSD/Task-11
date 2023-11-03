console.log("File Linked")

const countryInfoContainer = document.getElementById("country-info");

function createCountryCard(country) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.innerText = country.name;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const capital = document.createElement("p");
    capital.innerText = `Capital: ${country.capital}`;

    const latlng = document.createElement("p");
    latlng.innerText = `Lat/Lng: ${country.latlng.join(', ')}`;

    const flag = document.createElement("img");
    flag.setAttribute("src", country.flag);
    flag.setAttribute("alt", `${country.name}'s Flag`);

    const region = document.createElement("p");
    region.innerText = `Region: ${country.region}`;

    const countryCodes = document.createElement("p");
    countryCodes.innerText = `Country Codes: ${country.alpha2Code}, ${country.alpha3Code}`;

    const weatherButton = document.createElement("button");
    weatherButton.classList.add("btn", "btn-primary");
    weatherButton.innerText = "Click for Weather";
    weatherButton.addEventListener("click", () => {
        getWeatherInfo(country.capital, country.name);
    });

    cardBody.appendChild(capital);
    cardBody.appendChild(latlng);
    cardBody.appendChild(flag);
    cardBody.appendChild(region);
    cardBody.appendChild(countryCodes);
    cardBody.appendChild(weatherButton);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    countryInfoContainer.appendChild(card);
}

function getCountryInfo() {
    fetch("https://restcountries.com/v2/all")
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                createCountryCard(country);
            });
        })
        .catch(error => console.error("Error fetching country data: ", error));
}

function getWeatherInfo(city, country) {

    const apiKey = "e78105dae5f4144d2bd5382eb0902353";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            alert(`Weather in ${city}, ${country}: ${data.weather[0].description}`);
        })
        .catch(error => console.error("Error fetching weather data: ", error));
}

getCountryInfo();
