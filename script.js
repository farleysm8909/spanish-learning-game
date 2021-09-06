let canvas = document.getElementById('canvas');
let cx = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 700;
let req;

let duck = new Image();
duck.src = 'duck.png';


function animate() {
    req = requestAnimationFrame(animate);
}

animate();
