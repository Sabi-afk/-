import * as THREE from 'https://unpkg.com/three@0.166.1/build/three.module.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.z = 300;

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.body.appendChild(renderer.domElement);

// Hide old canvas
document.getElementById("sky").style.display = "none";

// Stars
const starGeometry = new THREE.BufferGeometry();

const starCount = 5000;

const positions = [];

for(let i=0;i<starCount;i++){

    positions.push(

        (Math.random()-0.5)*1200,
        (Math.random()-0.5)*1200,
        (Math.random()-0.5)*1200

    );

}

starGeometry.setAttribute(

    'position',

    new THREE.Float32BufferAttribute(
        positions,
        3
    )

);

const starMaterial = new THREE.PointsMaterial({

    color:0xffffff,

    size:2,

    transparent:true,

    opacity:.9

});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(stars);

// Resize
window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});

// Animation
function animate(){

requestAnimationFrame(animate);

stars.rotation.y +=0.0002;

stars.rotation.x +=0.00005;

renderer.render(scene,camera);

}

animate();
