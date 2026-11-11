const apiKey = "YOUR_API_KEY";

const lat = 9.0765;
const lon = 7.3986;

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {

    try {

        const response = await fetch(weatherURL);
        const data = await response.json();

        document.querySelector("#current-weather").innerHTML = `
            <p><strong>${Math.round(data.main.temp)}°F</strong></p>
            <p>${data.weather[0].description}</p>
        `;

    }
    catch(error){
        console.log(error);
    }
}

async function getForecast() {

    try {

        const response = await fetch(forecastURL);
        const data = await response.json();

        const forecast = document.querySelector("#forecast");

        forecast.innerHTML = "";

        const threeDays = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        ).slice(0,3);

        threeDays.forEach(day => {

            const date = new Date(day.dt_txt);

            forecast.innerHTML += `
                <p>
                ${date.toLocaleDateString()}
                : ${Math.round(day.main.temp)}°F
                </p>
            `;
        });

    }
    catch(error){
        console.log(error);
    }
}

async function getSpotlights(){

    const response =
        await fetch("data/members.json");

    const data = await response.json();

    const qualified = data.members.filter(member =>
        member.membership >= 2
    );

    qualified.sort(() => Math.random() - 0.5);

    const selected = qualified.slice(0,3);

    const container =
        document.querySelector("#spotlight-container");

    selected.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img src="images/${member.image}"
                 alt="${member.name}">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>
              Membership:
              ${member.membership === 3
              ? "Gold"
              : "Silver"}
            </p>

            <a href="${member.website}"
               target="_blank">
               Visit Website
            </a>
        `;

        container.appendChild(card);
    });
}

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;

getWeather();
getForecast();
getSpotlights();