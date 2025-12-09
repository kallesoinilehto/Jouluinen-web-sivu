// Kevyt hiutaleanimaatio (valinnainen)
function createSnow() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = 2 + Math.random() * 3 + "s";
    snowflake.style.opacity = Math.random();

    document.body.appendChild(snowflake);

    setTimeout(() => snowflake.remove(), 5000);
}

setInterval(createSnow, 150);
