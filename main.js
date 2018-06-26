var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//test
//ctx.fillRect(0,0,50,50);

//constants
var frames= 0;
var interval;
var images = {
  male: "./images/Male.png",
  female: "./images/Female.png",
  bus: "./images/sub3.jpg",
  bg: "./images/subwayStation.png" 
}
var people = [];
var timer = 0;
var player1Time = 0;
var player2Time = 0;
var p2Aux = 0;
var winner = "";

//class
class Board {
  constructor(x=0,y=0,width=canvas.width, height=canvas.height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = images.bg;
    this.image.onload = function(){
      this.draw();
    }.bind(this)
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    ctx.fillStyle = "white";
    ctx.font = '50px Game';
    if(bus.x == 0) timer = Math.floor(frames / 60)
    ctx.fillText(timer, this.width -100, 50 )
  }
  winP1(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P1: " + player1Time + " segundos"
    var text2 = "P2 presiona 'r' para continuar"
    ctx.fillText(text, 150, 70 );
    ctx.fillText(text2, 150, 100 );
  }
  gameOverP1(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P1 No pudiste mijo"
    var text2 = "P2 presiona 'r' para continuar"
    ctx.fillText(text, 150, 70 );
    ctx.fillText(text2, 150, 100 );
  }
  gameOverP2(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P1: " + player1Time + " segundos" 
    var text2 = "P2: " + player2Time + " segundos"
    var gameOText = "Game Over";
    ctx.fillText(gameOText, 200, 70);
    ctx.fillText(text, 700, 70 );
    ctx.fillText(text2, 700, 100)
    ctx.font = "30px Game"
    if(player1Time < player2Time) winner = "Gana P1!";
    else if (player1Time > player2Time) winner = "Gana P2!";
    else if (player1Time == player2Time) winner = "Empate"
    ctx.fillText(winner, 700, 200 )
  }
}
class Characters {
  constructor(x=0,y=0,width=50,height=50,img){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = img;
    this.image.onload = function(){
      this.draw();
    }.bind(this)
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
  }
}


class Bus extends Characters {
  constructor(x,y,width,height,img){
    super(x,y,width,height,img);
  }
  move(){  
  if(this.x > 0){
    this.x -=5; 
    } else return;  
  }
}

class Door {
  constructor(){
    this.x = 310;
    this.y = 180;
    this.width = 100;
    this.height = 200;
  }
  isTouching(item){
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }
  draw(){
    ctx.fillStyle = "rgba(225,225,225,0.0)"
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if(this.isTouching(you)){
      winP1();
      winP2();
    }
    else return;
  }
}

class People extends Characters {
  constructor(x,y,width,height,img, direct){
    super(x,y,width,height,img);
    this.direction = direct;
  }
  isTouching(item){
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }
  move(){
    if (this.direction == "left") this.x -=2;
    else this.x += 1;
  }
}

class You extends Characters{
  constructor(x,y,width,height,img){
    super(x,y,width,height,img);
  }
  isTouching(item){
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }
  gravity(){
    if (this.y != 318){
      this.y += 1;
    }
  }
}

//instances
var background = new Board();
var bus = new Bus(canvas.width, canvas.height-390, 700,390, images.bus);
var you = new You(1000, 318, 60, 70, images.male);
var door = new Door();

//main Functions
function update(){
  frames++;
  //console.log(frames);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  background.draw();
  generatePeople();
  drawPeople();
  bus.draw();
  bus.move();
  p1GameOver();
  p2GameOver();
  you.draw();
  you.gravity();
  door.draw();
}

function start(){
  if(!interval) interval = setInterval(update, 100/60);
}
//aux Functions
function winP1 (){
  if(p2Aux == 0){
  clearInterval(interval);
  interval = undefined;
  player1Time = timer;
  background.winP1();
  }
}
function winP2(){
  if (p2Aux == 1){
    clearInterval(interval);
    interval = undefined;
    player2Time = timer;
    background.gameOverP2();
  }
}
function p1GameOver (){
  if (timer == 30 && p2Aux == 0){
    clearInterval(interval);
    interval = undefined;
    player1Time = timer;
    background.gameOverP1();
  }
}
function p2GameOver(){
  if (timer == 30 && p2Aux == 1){
    clearInterval(interval);
    interval = undefined;
    player2Time = timer;
    background.gameOverP2();
  }
}
function restartP2(){
  people = [];
  frames = 0;
  you.x = 1000;
  you.y = 318;
  bus.x = canvas.width;
  p2Aux = 1;
  timer = 0;
  start();
}

function reset(){
  people = [];
  frames = 0;
  you.x = 1000;
  you.y = 318;
  bus.x = canvas.width;
  p2Aux = 0;
  timer = 0;
  player1Time = 0;
  player2Time = 0;
  start();
}

function generatePeople(){
  var img = ""
  var charX = 350;
  if (bus.x == 0){
    if (frames % 100 === 0){

      var g = Math.floor(Math.random() * 2);
      if (g == 1) img = images.male;
      else img = images.female;
      var newX = Math.floor(Math.random()* 350);

      if (people.length < 5){
        var person = new People (charX + newX, 318, 60,70, img, "right");
        people.push(person);
        console.log(people.length);
      }  
    }
  }
}

function drawPeople () {
  people.forEach(function(e){
    e.draw();
    e.move();
    if(you.isTouching(e)){
      you.x +=2;
    }
  })
}

//listeners
document.getElementById("start-button")
    .addEventListener("click",start);

document.getElementById("reset-button")
    .addEventListener("click",reset);

addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 82:
      if (interval || p2Aux == 1) return
      else restartP2();
      break;
    case 39:
      you.x+=30;
      break;
    case 37:
      you.x-=30;
      break;
    case 38:
    if(you.y<248) return;
    else you.y-=80;
      break;
    case 38 && 37:
      you.y-=50;
      you.x -= 30;
      break;
  }
})
