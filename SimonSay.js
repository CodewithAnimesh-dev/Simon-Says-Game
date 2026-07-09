let gameseq = [];
let userseq = [];

let colors = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on keyboard or click/tap
function startGame() {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelup();
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

function gameflash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;

    h2.innerText = `Level ${level}`;

    // Choose a random button
    let randidx = Math.floor(Math.random() * 4);
    let randcolor = colors[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);

    gameseq.push(randcolor);
    console.log(gameseq);

    gameflash(randbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Tap/Click anywhere or Press any key to restart.`;

        document.querySelector("body").style.background = "red";

        setTimeout(function () {
            document.querySelector("body").style.background = "white";
        }, 150);

        reset();
    }
}

function btnpress() {
    let btn = this;

    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    console.log(userseq);

    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}