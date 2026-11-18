const membersContainer = document.querySelector("#members");

async function getMembers() {
    try {

        const response = await fetch("data/members.json");

        const data = await response.json();

        displayMembers(data.members);

    } catch (error) {
        console.error(error);
    }
}

function displayMembers(members) {

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">
                Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();

document.querySelector("#grid").addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
});

document.querySelector("#list").addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
});

const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

document.querySelector("#currentYear").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;