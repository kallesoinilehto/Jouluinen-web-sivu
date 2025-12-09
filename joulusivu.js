// Luodaan lumihiutaleita
function createSnow() {
    const snow = document.createElement("div");
    snow.classList.add("snowflake");
    snow.innerHTML = "❄";

    snow.style.left = Math.random() * 100 + "vw";
    snow.style.fontSize = (Math.random() * 10 + 10) + "px";
    snow.style.animationDuration = (Math.random() * 5 + 4) + "s";
    
    document.body.appendChild(snow);

    setTimeout(() => {
        snow.remove();
    }, 9000);
}

setInterval(createSnow, 150);
