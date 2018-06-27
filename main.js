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
  bg: "./images/subwayStation.png",
  inside:"./images/insideSub2.png"
}
var people = [];
var people2 = [];
var timer = 0;
var player1Time = 0;
var player2Time = 0;
var player1TimeLvl2 = 0;
var player2TimeLvl2 = 0;
var p2Aux = 0;
var winner = "";
document.getElementById("reset-button").style.display = "none";
var level2 = false;
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
    if(bus.x == 0 && !level2) timer = Math.floor(frames / 60)
    if(level2) timer = Math.floor(frames / 60)
    ctx.fillText(timer, this.width -100, 50 )
  }
  gameOverP1(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P1: " + player1Time + " segundos"
    var text2 = "Presiona 's' para el siguiente nivel"
    ctx.fillText(text, 150, 70 );
    ctx.fillText(text2, 150, 100 );
  }
  gameOverP2(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P2: " + player2Time + " segundos" 
    var text2 = "Presiona 's' para el siguiente nivel"
    ctx.fillText(text, 150, 70 );
    ctx.fillText(text2, 150, 100);
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

class BoardLvl2 {
  constructor(x=0,y=0,width=canvas.width, height=canvas.height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = images.inside;
    // this.image.onload = function(){
    //   this.draw();
    // }.bind(this)
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    ctx.fillStyle = "white";
    ctx.font = '50px Game';
    if(bus.x == 0 && !level2) timer = Math.floor(frames / 60)
    if(level2) timer = Math.floor(frames / 60)
    ctx.fillText(timer, this.width -100, 50 )
  }
  gameOverP1(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P1: " + player1TimeLvl2 + " segundos"
    var text2 = "P2 presiona 'r' para continuar"
    ctx.fillText(text, 150, 70 );
    ctx.fillText(text2, 150, 100 );
  }
  gameOverP2(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P1: " + player1Time + " segundos" 
    var text2 = "P1: " + player1TimeLvl2 + " segundos"
    var text3 = "P2: " + player2Time + " segundos"
    var text4 = "P2: " + player2TimeLvl2 + " segundos"
    var gameOText = "Game Over";
    ctx.fillText(gameOText, 200, 70);
    ctx.fillText(text, 700, 70 );
    ctx.fillText(text2, 700, 100)
    ctx.fillText(text3, 700, 130 );
    ctx.fillText(text4, 700, 160)
    ctx.font = "30px Game"
    if(player1Time + player1TimeLvl2 < player2Time + player2TimeLvl2) winner = "Gana P1!";
    else if (player1Time + player1TimeLvl2 > player2Time + player2TimeLvl2) winner = "Gana P2!";
    else if (player1Time + player1TimeLvl2 == player2Time + player2TimeLvl2) winner = "Empate"
    ctx.fillText(winner, 700, 200 )
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


class DoorR {
  constructor(){
    this.x = 930;
    this.y = 180;
    this.width = 200;
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
      winP1Lvl2();
      winP2Lvl2();
    }
    else return;
  }
}
class DoorL {
  constructor(){
    this.x = 0;
    this.y = 180;
    this.width = 200;
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
      winP1Lvl2();
      winP2Lvl2();
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

class Peoplelvl2 extends Characters{
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
var backgroundlvl2 = new BoardLvl2();
var background = new Board();
var bus = new Bus(canvas.width, canvas.height-390, 700,390, images.bus);
var you = !level2 ? new You(1000, 318, 60, 70, images.male) : new You(canvas.width/2-50, 318, 60, 70, images.male);
var door = new Door();
var doorR = new DoorR();
var doorL = new DoorL();

//main Functions
function update(){
  frames++;
  //console.log(frames);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  if (level2) backgroundlvl2.draw();
  if (!level2) background.draw();
  if (!level2)generatePeople();
  if (level2) generatePeopleLvl2R();
  if (level2) generatePeopleLvl2L();
  drawPeopleLvl2L();
  drawPeople();
  if (!level2) bus.draw();
  if (!level2) bus.move();
  p1GameOver();
  p2GameOver();
  p2GameOverLvl2();
  p1GameOverLvl2();
  you.draw();
  you.gravity();
  if (!level2) door.draw();
  if(level2) doorR.draw();
  if(level2) doorL.draw();
}

function start(){
  if(!interval) interval = setInterval(update, 100/60);
  document.getElementById("start-button").style.display = "none";
  document.getElementById("reset-button").style.display = "block"
}
//aux Functions
function winP1 (){
  if(p2Aux == 0 && !level2){
  clearInterval(interval);
  interval = undefined;
  player1Time = timer;
  background.gameOverP1();
  }
}
function winP2(){
  if (p2Aux == 1 && !level2){
    clearInterval(interval);
    interval = undefined;
    player2Time = timer;
    background.gameOverP2();
  }
}
function p1GameOver (){
  if (timer == 30 && p2Aux == 0 && !level2){
    clearInterval(interval);
    interval = undefined;
    player1Time = timer;
    background.gameOverP1();
  }
}
function p2GameOver(){
  if (timer == 30 && p2Aux == 1 && !level2){
    clearInterval(interval);
    interval = undefined;
    player2Time = timer;
    background.gameOverP2();
  }
}
function winP1Lvl2 (){
  if(p2Aux == 0 && level2){
  clearInterval(interval);
  interval = undefined;
  player1TimeLvl2 = timer;
  backgroundlvl2.gameOverP1();
  }
}
function winP2Lvl2(){
  if (p2Aux == 1 && level2){
    clearInterval(interval);
    interval = undefined;
    player2TimeLvl2 = timer;
    backgroundlvl2.gameOverP2();
  }
}
function p1GameOverLvl2 (){
  if (timer == 10 && p2Aux == 0 && level2){
    clearInterval(interval);
    interval = undefined;
    player1TimeLvl2 = timer;
    backgroundlvl2.gameOverP1();
  }
}
function p2GameOverLvl2(){
  if (timer == 10 && p2Aux == 1 && level2){
    clearInterval(interval);
    interval = undefined;
    player2TimeLvl2 = timer;
    backgroundlvl2.gameOverP2();
  }
}
function restartLvl2(){
  people = [];
  people2 = [];
  frames = 0;
  if(level2) you.x = canvas.width/2-50;
  if(level2) you.y = 318;
  p2Aux = 0;
  timer = 0;
  start();
}

function restartLvl2P2(){
  people = [];
  people2 = [];
  frames = 0;
  if(level2) you.x = canvas.width/2-50;
  if(level2) you.y = 318;
  p2Aux = 1;
  timer = 0;
  start();
}

function restartP2(){
  people = [];
  people2 = [];
  frames = 0;
  you.x = 1000;
  you.y = 318;
  bus.x = canvas.width;
  level2 = false;
  p2Aux = 1;
  timer = 0;
  start();
}

function reset(){
  people = [];
  people2 = [];
  frames = 0;
  you.x = 1000;
  you.y = 318;
  bus.x = canvas.width;
  level2 = false;
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

      if (people.length < 8){
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

function generatePeopleLvl2R(){
  var img = ""
  var charX = 0;
    if (frames % 50 === 0){

      var g = Math.floor(Math.random() * 2);
      if (g == 1) img = images.male;
      else img = images.female;
      var newX = Math.floor(Math.random()* 100);

      if (people.length < 20){
        var person = new People (charX + newX, 318, 60,70, img, "right");
        people.push(person);
        console.log(people.length);
      
    }
  }
}
function generatePeopleLvl2L(){
  var img = ""
  var charX = 1150;
    if (frames % 50 === 0){

      var g = Math.floor(Math.random() * 2);
      if (g == 1) img = images.male;
      else img = images.female;
      var newX = Math.floor(Math.random()* 100);

      if (people.length < 20){
        var person = new People (charX - newX, 318, 60,70, img, "left");
        people2.push(person);
        console.log(people.length);
      
    }
  }
}
function drawPeopleLvl2L() {
  people2.forEach(function(e){
    e.draw();
    e.move();
    if(you.isTouching(e)){
      you.x -=4;
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
    case 83:
      if (p2Aux == 0 && !interval && !level2){
        level2 = true;
        restartLvl2();
      } 
      if (p2Aux == 1 && !interval && !level2) {
        level2 = true;
        restartLvl2P2();
      }
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
