const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const stars = [];

const STAR_COUNT = 900;

for (let i = 0; i < STAR_COUNT; i++) {

    let size;

    const r = Math.random();

    if (r < 0.90) {

        size = Math.random() * 1.2 + 0.3;

    } else if (r < 0.98) {

        size = Math.random() * 2 + 1.5;

    } else {

        size = Math.random() * 3 + 3;

    }

    stars.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        size,

        alpha: 0.3 + Math.random() * 0.7,

        twinkle: Math.random() * Math.PI * 2,

        driftX: (Math.random() - 0.5) * 0.03,

        driftY: (Math.random() - 0.5) * 0.03

    });

}

function animate() {

    ctx.fillStyle = "#02040b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {

        star.x += star.driftX;
        star.y += star.driftY;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;

        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.twinkle += 0.015;

        const brightness =
            star.alpha +
            Math.sin(star.twinkle) * 0.12;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        if (star.size > 2.5) {

            ctx.shadowBlur = 15;
            ctx.shadowColor = "white";

        } else {

            ctx.shadowBlur = 0;

        }

        ctx.fillStyle = `rgba(255,255,255,${brightness})`;

        ctx.fill();

    }

    requestAnimationFrame(animate);

}

animate();
