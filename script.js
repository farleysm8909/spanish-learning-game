let e_word = document.getElementById("word");

let e_words = ["eat", "happy", "butterfly"];
let s_words = ["comer", "feliz", "marisposa"];

let rand = Math.floor(Math.random()*e_words.length);
e_word.innerHTML = e_words[rand];
let once = false;


let canvas = document.getElementById('canvas');
let cx = canvas.getContext('2d');
canvas.width = 1100;
canvas.height = 650;
let req;

let duck = new Image();
duck.src = 'images/duck.png';
let x = 0;
let y = 0;
let w = 50;
let h = 50;
let xsp = 0;
let ysp = 0;
let pull = 5;
let keys = [];

let platforms = [];
platforms.push({x: 0, y: 150, w: 100, h: 10, color: "#aa151b"});
platforms.push({x: 150, y: 100, w: 150, h: 10, color: "#f1bf00"});
platforms.push({x: 350, y: 250, w: 100, h: 10, color: "#f1bf00"});
platforms.push({x: 300, y: 450, w: 100, h: 10, color: "#aa151b"});
platforms.push({x: 400, y: 150, w: 150, h: 10, color: "#f1bf00"});
platforms.push({x: 700, y: 150, w: 100, h: 10, color: "#aa151b"});
platforms.push({x: 750, y: 450, w: 100, h: 10, color: "#f1bf00"});
platforms.push({x: 50, y: 400, w: 100, h: 10, color: "#aa151b"});
platforms.push({x: 850, y: 550, w: 200, h: 10, color: "#f1bf00"});
platforms.push({x: 650, y: 450, w: 100, h: 10, color: "#aa151b"});
platforms.push({x: 200, y: 550, w: 100, h: 10, color: "#f1bf00"});
platforms.push({x: 900, y: 200, w: 100, h: 10, color: "#f1bf00"});
platforms.push({x: 450, y: 550, w: 150, h: 10, color: "#f1bf00"});
platforms.push({x: 600, y: 300, w: 250, h: 10, color: "#aa151b"});
platforms.push({x: 200, y: 350, w: 100, h: 10, color: "#aa151b"});

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (!keys.includes(e.key)) {
        keys.push(e.key);
    }
});

document.addEventListener("keyup", (e) => {
    let i = keys.indexOf(e.key);
    keys.splice(i, 1);
});

function move() {
    if (keys.length == 0) {
        xsp = 0;
        ysp = 0;
    } else {
        for (let i = 0; i < keys.length; i++) {
            if ((keys[i] == "ArrowUp" || keys[i] == "Space") && pull == 0) {
                y -= 150;
            }
            if (keys[i] == "ArrowLeft") {
                xsp = -5;
            } else if (keys[i] == "ArrowRight") {
                xsp = 5;
            } 
        }
    }
}

function platform() {
    pull = 5;
    platforms.forEach(function(plat) {
        cx.fillStyle = plat.color;
        cx.fillRect(plat.x, plat.y, plat.w, plat.h);
        if (y+h==plat.y && x+w >= plat.x && x <= plat.x + plat.w) {
            pull = 0;
        }
    });
}

function falling_words() {
    while (once == false) {
        s_words.forEach(function(s_word) {
            // setTimeout(function() {
                cx.font = "50px Arial";
                cx.fillText(s_word, Math.random()*canvas.width, 150);
                // make s_words fall somehow
            // }, 1000);
        });
        once = true;
    }
}

function animate() {
    req = requestAnimationFrame(animate);
    cx.clearRect(0, 0, canvas.width, canvas.height);
    cx.drawImage(duck, x, y, w, h);
    x += xsp;
    y += ysp + pull;
    move();
    platform();
    falling_words();
}

animate();
