// script-sub.js

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("#bottomMenu button");

    buttons.forEach((button) => {
        button.addEventListener("mouseover", function () {
            button.classList.add("hovered");
        });

        button.addEventListener("mouseout", function () {
            button.classList.remove("hovered");
        });
    });
});
