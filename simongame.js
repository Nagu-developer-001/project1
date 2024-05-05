let gameSequence = [];
let userSequence = [];
let highestScore = 0;
const btns = ["yellow","red","green","purple"];
let started = false;
let level = 0;
let currentHighScore = 0;
let h2 = document.querySelector('h2');

document.addEventListener('keypress',function(event){
    if(event.key=='Enter'){
        if(started == false){
            console.log('game started');
            started = true;
            levelUp();
        }
    }
});
let span = document.querySelector('span');
//This block of code it describes that - by level uping by one and it helps to select a random color then it calls flashGame 
function levelUp(){
    userSequence = [];
    
    level++;
    if (level ===10) {
        flashAllColors();
    }
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSequence.push(randColor);
    console.log('Game Sequence');
    console.log(gameSequence);
    currentHighScore = level;
    printingHighScore(currentHighScore);
   // console.log(randColor);
   // console.log(`.${randColor}`)
    let randBtn = document.querySelector(`.${randColor}`);
    //console.log(randBtn);
    flashGame(randBtn);
}
function printingHighScore(score){
    if(score>highestScore){
        highestScore = score;
    }
    span.innerHTML =`<H2>Highest Score: ${highestScore}</H2>`;
}
// This block of code is used to flash the sequence for user;
function flashGame(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },300);
}
//HERE this block of code describes what really happen when you click on colors button After that involks checkAns() to compare flash that is made happn by  user and system
function flashUser(){
    
    let btn = this;
    btn.classList.add('lightgreen');
    setTimeout(function(){
    btn.classList.remove('lightgreen');
    },350);
    let userColor = btn.getAttribute('id');
    userSequence.push(userColor);
//    highestScore.push(level);   
    console.log('User Sequence');
    console.log(userSequence);
    checkAns(userSequence.length-1);
}
// function highestScore(level){
//     if(level>level-1){
//         span.innerText = `Height Score : ${level}`;
//     }
// }
// This block of code - and compares userSequence and gameSequence and it helps to level up by 1,otherwise it executes a beep and error and excutes reset function;
function checkAns(idx){
    
    if(userSequence[idx] === gameSequence[idx]){
        if(userSequence.length == gameSequence.length){
            levelUp();
            let audio1 = new Audio("mixkit-censorship-beep-1082 (1).wav");
            audio1.play();
        }
    }
    else{
        h2.innerHTML = `Game is Over! Score is <b>${level}</b> <br>Again press Enter to start game`;
        let audio = new Audio("beep-03.mp3");
        audio.play();
       // span.innerText = `Highest Score : ${highestScore.length+1}`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white";
        },250);

        reset();
    }
}
//below this code of block describes colors that is clicked by user by using event listener , and involking flashuser mathod
let numberOfBtn = document.querySelectorAll('.btn');
for(btn of numberOfBtn)
{
    btn.addEventListener('click',flashUser);
}
//function reset all things that are happen before it involk's it reset everything in page
function reset(){
    started = false;
    level = 0;
    gameSequence = [];
    userSequence = [];
    //document.querySelector('body').style.backgroundColor = "darkblue";
}
// Function to flash all colors
function flashAllColors() {
    const delay = 500; // milliseconds
    document.querySelector('body').style.backgroundColor = "green";
    setTimeout(function()
    {
        document.querySelector('body').style.backgroundColor = "darkblue";
    },2000);
let audio2 =new Audio("buzzer-or-wrong-answer-20582 (1).mp3");
audio2.play();
let h3 = document.createElement('h3');
h3.innerHTML = `<b>Congratulations</b> You reached level ${level}`;document.querySelector('body').append(h3);
setTimeout(function()
{
        h3.remove();
},2000);
    // Flashing by calling flashColor method - that flashes every color each color 
    btns.forEach((color, index) => 
    {
setTimeout(() => 
{
        flashColor(color);
      }, index * delay);
    });
}

  // Function to flash all each color when it involkeed
function flashColor(color) 
{
const button = document.getElementById(color);
button.classList.add('flash');
setTimeout(() => 
    {
        button.classList.remove('flash');
    }, 500);
}

// adding continoues color to heading that is simon says game
let h1 = document.querySelector('h1');
function changeColor(color){
    return new Promise((resolve,reject)=>{
                    let networkSpeed = Math.floor(Math.random() * 5)+1
        if(networkSpeed < 0){
                    reject('The Network speed is very slow');
        }
        setTimeout(()=>{
                    h1.style.color = color;
                    //console.log(`color has been changed to ${color}`);
                    resolve('color changed');
        },1000)
    })
}

async function demo(){
    
    try{
            await changeColor('red');
            await changeColor('green');
            await changeColor('pink');
            await changeColor('darkblue');
            await changeColor('orange');
            await changeColor('yellow');
    }
    catch(err){
            console.log(err);
    }  
    demo();   
}
demo();