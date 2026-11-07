// Footer Information

document.getElementById("currentYear").textContent =
new Date().getFullYear();

document.getElementById("lastModified").textContent =
`Last Modified: ${document.lastModified}`;


// Mobile Menu

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});


// WEATHER API

const apiKey = "YOUR_OPENWEATHER_API_KEY";

const lat = 7.3775;
const lon = 3.9470;

const currentWeatherURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getCurrentWeather() {

    try {

        const response = await fetch(currentWeatherURL);
        const data = await response.json();

        document.getElementById("temp").textContent =
        `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
        data.weather[0].description;

    } catch (error) {
        console.error(error);
    }
}

async function getForecast() {

    try {

        const response = await fetch(forecastURL);
        const data = await response.json();

        const forecastElement =
        document.getElementById("forecast");

        forecastElement.innerHTML = "";

        const forecastDays =
        data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        forecastDays.slice(0, 3).forEach(day => {

            const li = document.createElement("li");

            const date =
            new Date(day.dt_txt);

            li.textContent =
            `${date.toLocaleDateString("en-US",
            { weekday: "long" })}: ${Math.round(day.main.temp)}°C`;

            forecastElement.appendChild(li);
        });

    } catch(error) {
        console.error(error);
    }
}

getCurrentWeather();
getForecast();


// SPOTLIGHT MEMBERS

const membersURL = "data/members.json";

async function loadSpotlights() {

    try {

        const response =
        await fetch(membersURL);

        const members =
        await response.json();

        const qualifiedMembers =
        members.filter(member =>
            member.membership === "Gold" ||
            member.membership === "Silver"
        );

        const shuffled =
        qualifiedMembers.sort(() => 0.5 - Math.random());

        const selected =
        shuffled.slice(0, 3);

        const container =
        document.getElementById("spotlightContainer");

        selected.forEach(member => {

            const card =
            document.createElement("section");

            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="${member.logo}" alt="${member.name} Logo">

                <h3>${member.name}</h3>

                <p>${member.phone}</p>

                <p>${member.address}</p>

                <p>${member.membership} Member</p>

                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            `;

            container.appendChild(card);

        });

    } catch(error) {
        console.error(error);
    }
}

loadSpotlights();