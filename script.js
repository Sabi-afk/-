const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const mouse = {
    x: -1000,
    y: -1000
};

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

const stars = [];

for (let i = 0; i < 1800; i++) {

    stars.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        size: Math.random() * 1.8 + 0.3,

        opacity: Math.random(),

        drift: (Math.random() - 0.5) * 0.04,

        special: Math.random() < 0.01,

        pulse: Math.random() * Math.PI * 2

    });

}

function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let s of stars){

        s.x += s.drift;

        if(s.x < 0) s.x = canvas.width;
        if(s.x > canvas.width) s.x = 0;

        s.opacity += (Math.random()-0.5)*0.01;

        s.opacity = Math.max(.2,Math.min(1,s.opacity));

        let size = s.size;

        let glow = s.opacity;

        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;

        const dist = Math.sqrt(dx*dx + dy*dy);

        if(dist < 120){

            const t = 1 - dist/120;

            size += t*3;
            glow = 1;

        }

        if(s.special){

            s.pulse += 0.04;

            size += Math.sin(s.pulse)*0.5;

        }

        ctx.beginPath();

        ctx.arc(s.x,s.y,size,0,Math.PI*2);

        ctx.shadowBlur = size*10;
        ctx.shadowColor = "white";

        ctx.fillStyle = `rgba(255,255,255,${glow})`;

        ctx.fill();

    }

    ctx.shadowBlur = 0;

    requestAnimationFrame(draw);

}

draw();
