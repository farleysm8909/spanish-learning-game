let canvas = document.getElementById('canvas');
let cx = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 700;
let req;

let duck = new Image();
duck.src = 'images/duck.png';
let x = 0;
let y = 0;
let w = 50;
let h = 50;


function animate() {
    req = requestAnimationFrame(animate);
    cx.clearRect(0, 0, canvas.width, canvas.height);
    cx.drawImage(duck, x, y, w, h);
}

animate();
