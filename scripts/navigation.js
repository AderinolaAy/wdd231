const menuButton = document.querySelector("#menu-btn");
const navigation = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});