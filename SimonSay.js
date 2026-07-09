let gameseq = [];
let userseq = [];

let colors = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start Game
function startGame() {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelup();
    }
}

// Start with keyboard
document.addEventListener("keypress", startGame);

// Start with click/tap anywhere EXCEPT the game buttons
document.body.addEventListener("click", function (event) {
    if (!event.target.classList.contains("btn")) {
        startGame();
    }
});

// Flash selected by game
function gameflash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash selected by user
function userflash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Next Level
function levelup() {
    userseq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random() * 4);
    let randcolor = colors[randidx];
    let randbtn = document.querySelector(`#${randcolor}`);

    gameseq.push(randcolor);
    console.log("Game Sequence:", gameseq);

    gameflash(randbtn);
}

// Check Answer
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Tap/Click anywhere (except the colored buttons) or Press any key to restart.`;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// User Button Press
function btnpress() {
    if (!started) return;

    let btn = this;

    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    console.log("User Sequence:", userseq);

    checkAns(userseq.length - 1);
}

// Add click event to all buttons
let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

// Reset Game
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}