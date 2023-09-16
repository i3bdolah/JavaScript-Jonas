'use strict';

let generateNumber = Math.floor(Math.random() * 20) + 1;
let highScore = document.querySelector(".highscore");
let Score = document.querySelector(".score");
let Check = document.querySelector(".check");
let num = 5;
let numHighScore = 0;

Check.addEventListener("click",function () {
        
    let userNum = document.querySelector(".guess").value;
        if (userNum == generateNumber) {
            document.querySelector(".message").innerHTML = "Correct Number";
            document.querySelector("body").style.backgroundColor = "#60b347";
            document.querySelector(".number").innerHTML = generateNumber;
            calcHighScore();
        }

        else if (userNum > generateNumber) {
            document.querySelector(".message").innerHTML = "Go Lower..";
            calcScore();
        }

        else if (userNum < generateNumber) {
            document.querySelector(".message").innerHTML = "Go Higher..";
            calcScore();
        }
    
    
});


function calcHighScore() {
    if (numHighScore < num) {
        numHighScore = highScore.innerHTML = num;
    }

    return numHighScore;
}

function calcScore() {
    num--;
    Score.innerHTML = num;
    return num;
}

document.querySelector(".again").addEventListener("click",function() {
    num = 5;
    Score.innerHTML = num;
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".guess").value = "";
    document.querySelector(".number").innerHTML = "?";
    document.querySelector(".message").innerHTML = "Start guessing again...";
    generateNumber = Math.floor(Math.random() * 20) + 1;

    return generateNumber;
    
});