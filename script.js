const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

// ---------- Touch / Mouse ----------

const pointer = {
    x: -9999,
    y: -9999
};

function updatePointer(x, y) {
    pointer.x = x;
    pointer.y = y;
}

window.addEventListener("mousemove", e => {
    updatePointer(e.clientX, e.clientY);
});

window.addEventListener("touchmove", e => {
    updatePointer(
        e.touches[0].clientX,
        e.touches[0].clientY
    );
});

window.addEventListener("touchstart", e => {
    updatePointer(
        e.touches[0].clientX,
        e.touches[0].clientY
    );
});

// ---------- Stars ----------

const stars = [];

for (let i = 0; i < 1800; i++) {

    stars.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        radius: Math.random() * 1.4 + 0.2,

        opacity: Math.random(),

        speed: (Math.random() - 0.5) * 0.03,

        pulse: Math.random() * Math.PI * 2,

        special: Math.random() < 0.015

    });

}

function animate() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for (const star of stars) {

        star.x += star.speed;

        if(star.x < 0)
            star.x = canvas.width;

        if(star.x > canvas.width)
            star.x = 0;

        star.pulse += 0.02;

        let size = star.radius;

        let alpha = star.opacity;

        const dx = pointer.x - star.x;
        const dy = pointer.y - star.y;

        const dist = Math.sqrt(dx*dx + dy*dy);

        if(dist < 120){

            const effect = 1 - dist/120;

            size += effect * 2.5;

            alpha = 1;

        }

        if(star.special){

            size += Math.sin(star.pulse)*0.35;

        }

        ctx.beginPath();

        ctx.arc(star.x, star.y, size, 0, Math.PI*2);

        ctx.shadowBlur = size * 12;

        ctx.shadowColor = "white";

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;

        ctx.fill();

    }

    ctx.shadowBlur = 0;

    requestAnimationFrame(animate);

}

animate();
