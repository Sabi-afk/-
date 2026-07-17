const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

});

const stars = [];

for(let i=0;i<1500;i++){

stars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*1.7,

opacity:Math.random(),

speed:(Math.random()-0.5)*0.05

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let star of stars){

star.opacity += (Math.random()-0.5)*0.02;

if(star.opacity<0.2) star.opacity=0.2;
if(star.opacity>1) star.opacity=1;

star.x += star.speed;

if(star.x<0) star.x=canvas.width;
if(star.x>canvas.width) star.x=0;

ctx.beginPath();

ctx.arc(star.x,star.y,star.size,0,Math.PI*2);

ctx.fillStyle=`rgba(255,255,255,${star.opacity})`;

ctx.fill();

}

requestAnimationFrame(animate);

}

animate();
