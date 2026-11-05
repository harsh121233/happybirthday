const secretPassword = ["mumma", "Mumma", "mummy", "Mummy"];

function unlock() {
    const enteredPassword = document.getElementById("passwordInput").value;

    if (secretPassword.includes(enteredPassword)) {
        document.querySelector(".lockscreen").style.display = "none";
        document.querySelector(".maincontent").style.display = "block";
        const music = document.getElementById("backgroundMusic");
        music.play().catch((error) => {
            console.error("Background music could not be played:", error);
        });
    } else {
        document.getElementById("msg").innerText = "Ohh 😧 itna bhi yaad nahi💔";
    }
}

document.getElementById("unlock").addEventListener("click", unlock);

const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.addEventListener("timeupdate", () => {
    sessionStorage.setItem("backgroundMusicTime", String(backgroundMusic.currentTime));
});

document.getElementById("hidebox").addEventListener("click", function (event) {
    const button = event.currentTarget;
    const message = document.getElementById("hiddenMessage");

    message.hidden = !message.hidden;
    button.setAttribute("aria-expanded", String(!message.hidden));
});

document.getElementById("see").addEventListener("click", function () {
    sessionStorage.setItem("backgroundMusicTime", String(backgroundMusic.currentTime));
    window.location.href = "image.html";
});

document.getElementById("rainHearts").addEventListener("click", function () {
    const symbols = ["♡", "♥", "♡", "✧", "✦", "☆", "✩"];
    const colors = ["#f28db2", "#e987ad", "#c89bea", "#f4a6c4", "#d77da8"];
    const particleCount = 55;
    let created = 0;

    function releaseParticle() {
        const particle = document.createElement("span");
        const duration = 3 + Math.random() * 2;

        particle.className = "rain-particle";
        particle.setAttribute("aria-hidden", "true");
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.setProperty("--rain-x", `${Math.random() * 96}vw`);
        particle.style.setProperty("--rain-y", `${Math.random() * 88}vh`);
        particle.style.setProperty("--rain-size", `${1 + Math.random() * 1.5}rem`);
        particle.style.setProperty("--rain-duration", `${duration}s`);
        particle.style.setProperty("--rain-color", colors[Math.floor(Math.random() * colors.length)]);
        particle.style.setProperty("--rain-drift", `${Math.random() * 90 - 45}px`);
        particle.style.setProperty("--rain-fall", `${20 + Math.random() * 45}px`);
        particle.style.setProperty("--rain-spin", `${Math.random() * 50 - 25}deg`);
        particle.addEventListener("animationend", () => particle.remove(), { once: true });

        document.body.appendChild(particle);

        created++;
        if (created < particleCount) {
            window.setTimeout(releaseParticle, 2 + Math.random());
        }
    }

    releaseParticle();
});