const canvas = document.getElementById('game');
const ctx = canvas.getContext("2d");


class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}




let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount -2;
let headX = 10;
let headY = 10;
const snakePart = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;

let score = 0;

let gulpSound = "human-swallow-496-sound-effect-57174683.mp3";

function drawGame(){
   changeSnakeposition();
  let result = isGameOver();
  if (result) {
      return;
  }                                          





    clearScreen();
    



    changeAppleColisoin();
    drawApple(); 
    drawSnake();



    drawSocre();
    if (score > 2) {
        speed = 11;
    }
    if (score > 5) {
        speed = 15;
    }

    setTimeout(drawGame, 1000/ speed)
}


function isGameOver() {
    let gameOver = false;

    if (yVelocity ===0 && xVelocity ===0) {
        return false;
        
    }
    

    if (headX < 0) {
        gameOver = true;

    }
    else if (headX === tileCount) {
        gameOver = true
    }
    else if (headY < 0) {
        gameOver = true;
    }
    else if (headY === tileCount) {
        gameOver = true
    }

    for (let i = 0; i < snakePart.length; i++) {
        let part  = snakePart[i];
        if (part.x === headX && part.y === headY) {
           gameOver = true;
           break; 
        }
    }
    if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

     if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
    
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
    
        ctx.fillStyle = gradient;
    
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
        
        }
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
    
    }


    return gameOver;
}




function drawSocre() {
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana"
    ctx.fillText("Score:" + score, canvas.width-100, 20)
    
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakePart.push(new SnakePart(headX, headY));
    if (snakePart.length > tailLength) {
        snakePart.shift();
    }

    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);
}



function changeSnakeposition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function changeAppleColisoin() {
    if (appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        gulpSound++;
        score++;
    }
    
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){

    if (event.keyCode == 38){
        if (yVelocity == 1)
        return; 
        yVelocity = -1;
        xVelocity = 0;

    }


    if (event.keyCode == 40){
        if (yVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;

    }

    if (event.keyCode == 37){
        if (xVelocity == 1)
        return;
        yVelocity = 0;
        xVelocity = -1;

    }

    if (event.keyCode == 39){
        if (xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;

    }
}


drawGame();