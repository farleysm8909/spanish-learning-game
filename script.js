let e_word = document.getElementById("word");

let e_words = ["eat", "happy", "butterfly", "family", "brother", "sister", "mother", "father", "dog", "cat", "cow", "red", "blue", "green", "yellow", "tree"];
let s_words = ["comer", "feliz", "marisposa", "familia", "hermano", "hermana", "madre", "padre", "perro", "gato", "vaca", "rojo", "azul", "verde", "amarillo", "árbol"];

let rand;

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
//platforms.push({x: 750, y: 450, w: 100, h: 10, color: "#f1bf00"});
platforms.push({x: 50, y: 400, w: 100, h: 10, color: "#aa151b"});
platforms.push({x: 850, y: 550, w: 200, h: 10, color: "#f1bf00"});
platforms.push({x: 650, y: 450, w: 200, h: 10, color: "#aa151b"});
platforms.push({x: 200, y: 550, w: 100, h: 10, color: "#f1bf00"});
platforms.push({x: 900, y: 200, w: 100, h: 10, color: "#f1bf00"});
platforms.push({x: 450, y: 550, w: 150, h: 10, color: "#f1bf00"});
platforms.push({x: 600, y: 300, w: 250, h: 10, color: "#aa151b"});
platforms.push({x: 200, y: 350, w: 100, h: 10, color: "#aa151b"});

/*** Random spanish word generation ***/
let collided = false;
let mult_choice = [];
let chosen_plats = [];

let correct_plat;
let score = 0;

let lava_y = 600;
let img_lava = new Image();
img_lava.src = "images/lava.jpg";

let img_bk = new Image();
img_bk.src = "images/wetland.jpg";

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

function generateWords() {
    rand = Math.floor(Math.random()*e_words.length);
    e_word.innerHTML = e_words[rand];
    // 3 random spanish words (index)
    let option1 = Math.floor(Math.random()*s_words.length);
    let option2 = Math.floor(Math.random()*s_words.length);
    let option3 = Math.floor(Math.random()*s_words.length);
    mult_choice.push(rand);
    mult_choice.push(option1);
    mult_choice.push(option2);
    mult_choice.push(option3);
    // remove duplicate spanish words
    mult_choice = [...new Set(mult_choice)];

    // 3 random platforms (index)
    let p1 = Math.floor(Math.random()*platforms.length);
    let p2 = Math.floor(Math.random()*platforms.length);
    let p3 = Math.floor(Math.random()*platforms.length);
    let p4 = Math.floor(Math.random()*platforms.length);
    chosen_plats.push(p1);
    chosen_plats.push(p2);
    chosen_plats.push(p3);
    chosen_plats.push(p4);
    // remove duplicate platforms
    chosen_plats = [...new Set(chosen_plats)];
    for (let i = 0; i < chosen_plats.length; i++) {
        // if chosen platform for spanish word to be generated above is the one where the player is already standing, remove it
        if (platforms[chosen_plats[i]].x < x+w && platforms[chosen_plats[i]].x+platforms[chosen_plats[i]].w > x && y < platforms[chosen_plats[i]].y && y+h > platforms[chosen_plats[i]].y-150) {
            chosen_plats.splice(i, 1);
        }
    }

    while (mult_choice.length < chosen_plats.length || chosen_plats.length == 4) {
        chosen_plats.length--;
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

function placing_words() {
    for (let i = 0; i < chosen_plats.length; i++) {
        cx.fillStyle = "#000000";
        cx.font = "40px Arial";
        cx.fillText(s_words[mult_choice[i]], platforms[chosen_plats[i]].x, platforms[chosen_plats[i]].y - 20);
        if (s_words[mult_choice[i]] == s_words[rand]) {
            correct_plat = platforms[chosen_plats[i]];
        }
    }
}

function checkCollision() {
    chosen_plats.forEach(function(plat) {
        if (x < platforms[plat].x+platforms[plat].w && x+w > platforms[plat].x && y < platforms[plat].y && y+h > platforms[plat].y-50) {
            // if collision occurred on the correct platform
            if (platforms[plat] == correct_plat) {
                score++;
            } else {
                score--;
            }
            chosen_plats.length = 0;
            mult_choice.length = 0;
            collided = true;
        }
    });
}

function printScore() {
    cx.fillStyle = "#000000";
    cx.font = "30px Arial";
    cx.fillText("Score: " + score, 0, 50);
}

function gameOver() {
    cx.fillStyle = "#000000";
    cx.font = "60px Arial";
    cx.fillText("Game Over!", 390, 50);
    if (req) {
        cancelAnimationFrame(req);
        req = undefined;
    }
}

function lava() {
    cx.drawImage(img_lava, 0, lava_y, canvas.width, canvas.height-lava_y);
    if (y+h == lava_y) {
        gameOver();
    }
}



function animate() {
    req = requestAnimationFrame(animate);
    cx.clearRect(0, 0, canvas.width, canvas.height);
    //cx.drawImage(img_bk, 0, 0, canvas.width, canvas.height-50);
    cx.drawImage(duck, x, y, w, h);
    x += xsp;
    y += ysp + pull;
    move();
    platform();
    if (collided) {
        generateWords();
        collided = false;
    }
    placing_words();
    checkCollision();
    printScore();
    lava();
    if (score <= -3) {
        gameOver();
    }
}
generateWords();
animate();
