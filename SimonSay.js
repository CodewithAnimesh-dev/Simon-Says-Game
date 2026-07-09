let gameseq= [];//step-1
let userseq= [];//step-1
let colors= ["red","yellow","green","purple"];//step-2
let started= false;//step-1
let level=0;//step-1
let h2=document.querySelector("h2");//step-2
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelup();//step-2
    }
});//step-1
function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}//step-2

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq= [];
    level++;
    h2.innerText=`level ${level}`;
    // game will choose any random btn
    let randidx=Math.floor(Math.random()*3);
    let randcolor=colors[randidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    //console.log(randidx);
    //console.log(randcolor);
    //console.log(randbtn);

    gameseq.push(randcolor);
    gameflash(randbtn);
}//step-2

function checkAns(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    }else{
        h2.innerHTML=`Game Over!  Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.background="red";
        setTimeout(function(){
            document.querySelector("body").style.background="white";
        },150);
        reset();
    }
}

function btnpress(){
    let btn= this;
    userflash(btn);

    usercolor=btn.getAttribute("id");
    userseq.push(usercolor);

    checkAns(userseq.length-1);
}
let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}