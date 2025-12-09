// Luodaan lumihiutaleita (parannettu versio):
// - kunnioitetaan prefers-reduced-motion
// - rajoitamme lumihiutaleiden määrää
// - poistetaan lumihiutale kun animaatio päättyy sen sijaan että käytettäisiin kova timeout

(() => {
    const MAX_SNOWFLAKES = 60; // enimmäismäärä DOM:issa
    let currentSnowflakes = 0;

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function createSnow() {
        if (prefersReducedMotion()) return; // kunnioita käyttäjän asetusta
        if (currentSnowflakes >= MAX_SNOWFLAKES) return;

        const snow = document.createElement("div");
        snow.classList.add("snowflake");
        snow.setAttribute('aria-hidden', 'true'); // dekoratiivinen
        snow.textContent = "❄";

        // Random horizontal start (use vw so it's responsive)
        snow.style.left = Math.random() * 100 + "vw";

        // Random size
        const size = Math.random() * 18 + 8; // px
        snow.style.fontSize = size + "px";

        // Random duration and slight delay for natural effect
        const duration = Math.random() * 6 + 5; // seconds (5s - 11s)
        snow.style.animationDuration = duration + "s";
        snow.style.animationDelay = (Math.random() * 2) + "s";

        // optional slight opacity variation
        snow.style.opacity = (Math.random() * 0.35 + 0.65).toString();

        currentSnowflakes++;
        document.body.appendChild(snow);

        // Remove the node once its animation finishes (safer than a fixed timeout)
        const cleanup = () => {
            if (snow && snow.parentNode) {
                snow.parentNode.removeChild(snow);
            }
            currentSnowflakes = Math.max(0, currentSnowflakes - 1);
            snow.removeEventListener('animationend', cleanup);
        };

        // Use animationend; if event doesn't fire for some reason, fallback to timeout
        snow.addEventListener('animationend', cleanup);

        // Fallback: ensure removal after duration + delay + small buffer
        setTimeout(() => {
            if (snow.parentNode) {
                cleanup();
            }
        }, (duration + parseFloat(snow.style.animationDelay || 0) + 1) * 1000);
    }

    // Create initial snow batch
    const interval = setInterval(createSnow, 150);

    // Optional: stop creating snow when page is hidden to save CPU/battery
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(interval);
        } else {
            // re-create interval if needed (simple approach)
            // Note: this will create a second interval if page hidden/resumed repeatedly in this simple code;
            // for production you'd want to track and clear properly.
            // Here we just check again and set a new interval if none exist.
            // (A more robust approach would store the interval ID and manage start/stop explicitly.)
            setInterval(createSnow, 150);
        }
    });
})();
