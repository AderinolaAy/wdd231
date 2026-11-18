// =========================
// MOBILE NAVIGATION
// =========================

const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector("#navigation");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// =========================
// FOOTER INFORMATION
// =========================

document.querySelector("#year").textContent =
    new Date().getFullYear();

document.querySelector("#modified").textContent =
    `Last Modified: ${document.lastModified}`;


// =========================
// WEATHER API
// =========================

// Replace with your own OpenWeatherMap API Key
const apiKey = "YOUR_API_KEY";

// Ibadan Coordinates
const lat = 7.3775;
const lon = 3.9470;

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;


// Get Current Weather
async function getCurrentWeather() {
    try {
        const response = await fetch(currentWeatherURL);

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();

        displayCurrentWeather(data);

    } catch (error) {
        console.error("Weather Error:", error);
    }
}

function displayCurrentWeather(data) {

    const weather = document.querySelector("#weather");

    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    weather.innerHTML = `
        <img 
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description}">
        
        <p><strong>${Math.round(data.main.temp)}°C</strong></p>

        <p>${description}</p>
    `;
}


// Get Forecast
async function getForecast() {

    try {

        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {
        console.error("Forecast Error:", error);
    }
}

function displayForecast(data) {

    const forecastContainer =
        document.querySelector("#forecast");

    forecastContainer.innerHTML = "";

    const dailyForecasts = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecasts.slice(0, 3).forEach(day => {

        const date = new Date(day.dt_txt);

        const forecastCard = document.createElement("p");

        forecastCard.textContent =
            `${date.toLocaleDateString("en-US",
                { weekday: "long" })}: 
             ${Math.round(day.main.temp)}°C`;

        forecastContainer.appendChild(forecastCard);

    });
}

getCurrentWeather();
getForecast();


// =========================
// BUSINESS SPOTLIGHTS
// =========================

async function getSpotlights() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();

        let qualifiedMembers =
            data.members.filter(member =>
                member.membership >= 2
            );

        shuffleArray(qualifiedMembers);

        const randomMembers =
            qualifiedMembers.slice(0, 3);

        displaySpotlights(randomMembers);

    } catch (error) {

        console.error(
            "Spotlight Fetch Error:",
            error
        );
    }
}

function displaySpotlights(members) {

    const spotlightContainer =
        document.querySelector("#spotlights");

    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        const membershipLevel =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";

        card.innerHTML = `
            <img
                src="${member.image}"
                alt="${member.name} Logo">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
                <a href="${member.website}"
                   target="_blank">
                   Visit Website
                </a>
            </p>

            <p><strong>${membershipLevel}</strong></p>
        `;

        spotlightContainer.appendChild(card);
    });
}


// =========================
// RANDOMIZER
// =========================

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [array[i], array[j]] =
            [array[j], array[i]];
    }

    return array;
}

getSpotlights();