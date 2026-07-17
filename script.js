const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

// ---------- Resize ----------
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ---------- Stars ----------
const STAR_COUNT = 700;
const stars = [];

for (let i = 0; i < STAR_COUNT; i++) {

    stars.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        radius: Math.random() * 2 + 0.3,

        alpha: 0.3 + Math.random() * 0.7,

        twinkle: Math.random() * Math.PI * 2,

        dx: (Math.random() - 0.5) * 0.03,

        dy: (Math.random() - 0.5) * 0.03

    });

}

// ---------- Animation ----------
function animate() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#02030a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for (const s of stars) {

        s.x += s.dx;
        s.y += s.dy;

        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;

        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        s.twinkle += 0.015;

        const alpha = s.alpha + Math.sin(s.twinkle) * 0.15;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);

        if (s.radius > 1.8) {

            ctx.shadowBlur = 8;
            ctx.shadowColor = "white";

        } else {

            ctx.shadowBlur = 0;

        }

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();

    }

    requestAnimationFrame(animate);

}

animate();
