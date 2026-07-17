const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

function resize(){

    canvas.width = innerWidth;
    canvas.height = innerHeight;

}

resize();

addEventListener("resize",resize);

const stars=[];

for(let i=0;i<1500;i++){

    let size;

    const r=Math.random();

    if(r<0.92){

        size=Math.random()*1.2;

    }else if(r<0.99){

        size=1.5+Math.random()*1.8;

    }else{

        size=3+Math.random()*2;

    }

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        size:size,

        alpha:.2+Math.random()*.8,

        twinkle:Math.random()*Math.PI*2,

        speed:(Math.random()-.5)*0.01

    });

}

function draw(){

    ctx.fillStyle="#01020a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(const s of stars){

        s.x+=s.speed;

        if(s.x<0)s.x=canvas.width;

        if(s.x>canvas.width)s.x=0;

        s.twinkle+=0.02;

        const a=s.alpha+Math.sin(s.twinkle)*0.15;

        ctx.beginPath();

        ctx.arc(s.x,s.y,s.size,0,Math.PI*2);

        ctx.fillStyle=`rgba(255,255,255,${a})`;

        if(s.size>2){
    ctx.shadowBlur=12;
}else{
    ctx.shadowBlur=0;
}

        ctx.shadowColor="white";

        ctx.shadowBlur=0;

    }

    requestAnimationFrame(draw);

}

draw();
