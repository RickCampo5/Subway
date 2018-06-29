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
  maleflip: "./images/Maleflip.png",
  femaleflip: "./images/FemaleFlip.png",
  bus: "./images/sub3.jpg",
  bg: "./images/subwayStation.png",
  inside:"./images/insideSub3.jpg",
  dova: "./images/Dova.png",
  dovaflip: "./images/Dovaflip.png",
  bubble: "./images/pixil-frame-0.png"
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
document.getElementById("resOnePlayer").style.display = "none";
document.getElementById("letterF").style.display = "none";
var level2 = false;
var one = false;
var music = new Audio("./Music/Visager_-_04_-_Factory_Time.mp3");
var fus = new Audio("./Music/Fus_Ro.mp3");
var skyrim = new Audio("./Music/Skyrim.mp3");
var turu = new Audio("./Music/tono.mp3")
var llegando = new Audio("./Music/Metro_Train_Stops_01_Sound_Effect_Mp3_89.mp3");
var jump = new Audio("./Music/Jump.wav")
var win = new Audio("./Music/win.wav")
var lose = new Audio("./Music/Lose.wav")
var steps = new Audio("./Music/steps.wav")
steps.volume = 1;
var victory = new Audio("./Music/277441__xtrgamr__tones-of-victory.wav");
var pushes = false;
var turnInDova = false;
var activateListeners = false;
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
  gameOverP1(great){
    ctx.fillStyle = "white";
    ctx.font = '40px Game';
    var text = great + " P1: " + player1Time + " segundos" 
    var text2 = "Presiona 's' para el siguiente nivel"
    ctx.fillText(text, 50, 70 );
    ctx.fillText(text2, 50, 130 );
  }
  gameOverP2(great){
    ctx.fillStyle = "white";
    ctx.font = '40px Game';
    var text = great + " P2: " + player2Time + " segundos" 
    var text2 = "Presiona 's' para el siguiente nivel"
    ctx.fillText(text, 50, 70 );
    ctx.fillText(text2, 50, 130);
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
  gameOverOne(){
    ctx.fillStyle = "white";
    ctx.font = '40px Game';
    var text = "Level 1: " + player1Time + " segundos" 
    var text2 = "Level 2: " + player1TimeLvl2 + " segundos"
    var gameOText = "Game Over";
    ctx.fillText(gameOText, 50, 150);
    ctx.fillText(text, 500, 100 );
    ctx.fillText(text2, 500, 160)
  }
  gameOverP1(great){
    ctx.fillStyle = "white";
    ctx.font = '40px Game';
    var text = great + " P1: " + player1TimeLvl2 + " segundos"
    var text2 = "P2 presiona 'r' para continuar"
    ctx.fillText(text, 150, 70 );
    ctx.fillText(text2, 150, 130 );
  }
  gameOverP2(){
    ctx.fillStyle = "white";
    ctx.font = '40px Game';
    var text = "P1: " + player1Time + " segundos" 
    var text2 = "P1: " + player1TimeLvl2 + " segundos"
    var text3 = "P2: " + player2Time + " segundos"
    var text4 = "P2: " + player2TimeLvl2 + " segundos"
    var gameOText = "Game Over";
    ctx.fillText(gameOText, 200, 150);
    ctx.fillText(text, 700, 100 );
    ctx.fillText(text2, 700, 160)
    ctx.fillText(text3, 700, 220 );
    ctx.fillText(text4, 700, 280)
    ctx.font = "70px Game"
    if(player1Time + player1TimeLvl2 < player2Time + player2TimeLvl2){
      victory.play();
       winner = "Gana P1!";
    }
    else if (player1Time + player1TimeLvl2 > player2Time + player2TimeLvl2){
      victory.play();
       winner = "Gana P2!";
    }
    else if (player1Time + player1TimeLvl2 == player2Time + player2TimeLvl2){
      victory.play();
      winner = "Empate"
    }
    ctx.fillText(winner, 150, 210 )
  }
}


class Bus extends Characters {
  constructor(x,y,width,height,img){
    super(x,y,width,height,img);
  }
  move(){  
  if(this.x > 0){
    this.x -=5;
    llegando.play(); 
    llegando.volume = 1;
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
      llegando.pause();
      llegando.currentTime = 0;
      win.play();
    }
    if(this.isTouching(dova)){
      winP1();
      llegando.pause();
      llegando.currentTime = 0;
      win.play();
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
      turu.pause();
      turu.currentTime = 0;
      victory.play();
      // if(p2Aux)music.pause();
    }
    if(this.isTouching(dova)){
      turu.pause();
      turu.currentTime = 0;
      winP1Lvl2();
      victory.play();
    }
    else return;
  }
}
// class DoorL {
//   constructor(){
//     this.x = 0;
//     this.y = 180;
//     this.width = 200;
//     this.height = 200;
//   }
//   isTouching(item){
//     return  (this.x < item.x + item.width) &&
//             (this.x + this.width > item.x) &&
//             (this.y < item.y + item.height) &&
//             (this.y + this.height > item.y);
//   }
//   draw(){
//     ctx.fillStyle = "rgba(225,225,225,0.0)"
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//     if(this.isTouching(you)){
//       winP1Lvl2();
//       winP2Lvl2();
//       turu.pause();
//       victory.play();
//      if(p2Aux) music.pause();
//     }
//     if (this.isTouching(dova)){
//       winP1Lvl2();
//       turu.pause();
//       victory.play();
//     }
//     else return;
//   }
// }

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
    if(this.direction == "right") this.x += 2;
  }
}

class You extends Characters{
  constructor(x,y,width,height,img){
    super(x,y,width,height,img);
    this.bubbles = [];
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

class Dova extends Characters{
  constructor(x,y,width,height,img){
    super(x,y,width,height,img)
  }
  isTouching(item){
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }
  fusRoDah(){
    pushes = true;
  }
}

class Bubble {
  constructor(){
    this.width = 100;
    this.height = 100;
    this.x = you.x;
    this.y = you.y - 40;
    this.image = new Image();
    this.image.src = images.bubble;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
  }

}

//instances
var backgroundlvl2 = new BoardLvl2();
var background = new Board();
var bus = new Bus(canvas.width, canvas.height-390, 700,390, images.bus);
var you = !level2 ? new You(1000, 318, 60, 70, images.male) : new You(canvas.width/2-50, 318, 60, 70, images.male);
var door = new Door();
var doorR = new DoorR();
// var doorL = new DoorL();
var dova = new Dova(1000,300,100,100,images.dova);

//main Functions
function update(){
  frames++;
  //console.log(frames);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  if (level2) backgroundlvl2.draw();
  if (!level2) background.draw();
  if (!level2)generatePeople();
  // if (level2) generatePeopleLvl2R();
  if (level2) generatePeopleLvl2L();
  if(level2) drawPeopleLvl2L();
  // if(level2) drawPeopleLvl2R();
  if(!level2) drawPeople();
  if (!level2) bus.draw();
  if (!level2) bus.move();
  p1GameOver();
  p2GameOver();
  p2GameOverLvl2();
  p1GameOverLvl2();
  if(!turnInDova) you.draw();
  if(!turnInDova) you.gravity();
  if (!level2) door.draw();
  if(level2) doorR.draw();
  // if(level2) doorL.draw();
  if(turnInDova) dova.draw();
}

function start(){
  if(!interval) interval = setInterval(update, 100/60);
  document.getElementById("start-button").style.display = "none";
  document.getElementById("reset-button").style.display = "block"
  if(!turnInDova) music.play();
  music.volume = 0.2;
}
//aux Functions
function dovakhiin(){
  turnInDova = true;
  people = [];
  people2 = [];
  frames = 0;
  you.x = canvas.width;
  you.y = 318;
  dova.x = 1000;
  dova.y = 300;
  bus.x = canvas.width;
  door.x = 310;
  level2 = false;
  p2Aux = 0;
  timer = 0;
  player1Time = 0;
  player1TimeLvl2 = 0;
  player2TimeLvl2 = 0;
  player2Time = 0;
  one = true;
  pushes = false;
  start();
}
function winP1 (){
  if(p2Aux == 0 && !level2){
  clearInterval(interval);
  interval = undefined;
  player1Time = timer;
  var great = "Felicidades!"
  background.gameOverP1(great);
  }
}
function winP2(){
  if (p2Aux == 1 && !level2){
    clearInterval(interval);
    interval = undefined;
    player2Time = timer;
    var great = "Felicidades!"
    background.gameOverP2(great);
  }
}
function p1GameOver (){
  if (timer == 30 && p2Aux == 0 && !level2){
    bus.x-=5
    door.x-=5
    llegando.pause();
    llegando.currentTime = 0;
    lose.play();
    lose.volume = 1;
    if(!turnInDova)generateBubble();
    if (bus.x === -canvas.width){
    clearInterval(interval);
    interval = undefined;
    player1Time = timer;
    var great = "No lo lograste!"
    background.gameOverP1(great);
    }
  }
}
function p2GameOver(){
  if (timer == 30 && p2Aux == 1 && !level2){
    bus.x-=5;
    door.x-=5;
    llegando.pause();
    llegando.currentTime = 0;
    lose.play();
    lose.volume = 1;
    if(!turnInDova)generateBubble();
    if (bus.x === -canvas.width){
    clearInterval(interval);
    interval = undefined;
    player2Time = timer;
    var great = "No lo lograste!"
    background.gameOverP2(great);
    }
  }
}
function winP1Lvl2 (){
  if(p2Aux == 0 && level2){
  clearInterval(interval);
  interval = undefined;
  player1TimeLvl2 = timer;
  var great = "Felicidades!"
  if (!one)backgroundlvl2.gameOverP1(great);
  else backgroundlvl2.gameOverOne();
  }
}
function winP2Lvl2(){
  if (p2Aux == 1 && level2){
    clearInterval(interval);
    interval = undefined;
    player2TimeLvl2 = timer;
    var great = "Felicidades!"
    backgroundlvl2.gameOverP2(great);
  }
}
function p1GameOverLvl2 (){
  if (timer == 30 && p2Aux == 0 && level2){
    lose.play();
    lose.volume = 1;
    clearInterval(interval);
    interval = undefined;
    player1TimeLvl2 = timer;
    var great = "No lo lograste!"
    if(!one)backgroundlvl2.gameOverP1(great);
    if(one) backgroundlvl2.gameOverOne(great);
  }
}
function p2GameOverLvl2(){
  if (timer == 30 && p2Aux == 1 && level2){
    lose.volume = 1;
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
  if(level2) you.x = 100;
  if(level2) you.y = 318;
  if(level2 && turnInDova) dova.x = 100;
  if(level2 && turnInDova) dova.y = 300;
  pushes = false;
  p2Aux = 0;
  timer = 0;
  start();
}

function restartLvl2P2(){
  people = [];
  people2 = [];
  frames = 0;
  if(level2) you.x = 100;
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
  door.x = 310;
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
  door.x = 310;
  level2 = false;
  p2Aux = 0;
  timer = 0;
  player1Time = 0;
  player2Time = 0;
  one = false;
  turnInDova = false;
  pushes = false;
  document.getElementById("letterF").style.display = "none"
  start();
}

function resetOne(){
  people = [];
  people2 = [];
  frames = 0;
  you.x = 1000;
  you.y = 318;
  bus.x = canvas.width;
  door.x = 310;
  level2 = false;
  p2Aux = 0;
  timer = 0;
  player1Time = 0;
  player2Time = 0;
  one = true;
  pushes = false;
  turnInDova = false;
  dova.x = canvas.width;
  start();
}

function generateBubble(){
  var bubble = new Bubble(you);
  drawBubbles(bubble);
//   you.bubbles.push(bubble);
}
function drawBubbles(bubble){
  //you.bubbles.forEach(function(e){
    bubble.draw();
  //})
}

function generatePeople(){
  var img = ""
  var charX = 350;
  if (bus.x == 0){
    if (frames % 50 === 0){

      var g = Math.floor(Math.random() * 2);
      if (g == 1) img = images.male;
      else img = images.female;
      var newX = Math.floor(Math.random()* 350);

      if (people.length < 15){
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
    if(pushes) e.x-=10;
    if(you.isTouching(e)){
      you.x +=2;
      generateBubble();
    }
    if(dova.isTouching(e)){
      dova.x +=2;
    }
  })
}

// function generatePeopleLvl2R(){
//   var img = ""
//   var charX = 0;
//     if (frames % 50 === 0){

//       var g = Math.floor(Math.random() * 2);
//       if (g == 1) img = images.male;
//       else img = images.female;
//       var newX = Math.floor(Math.random()* 100);

//       if (people.length < 20){
//         var person = new People (charX + newX, 318, 60,70, img, "right");
//         people.push(person);
//         console.log(people.length);
      
//     }
//   }
// }
function generatePeopleLvl2L(){
  var img = ""
  var charX = 1150;
    if (frames % 50 === 0){

      var g = Math.floor(Math.random() * 2);
      if (g == 1) img = images.maleflip;
      else img = images.femaleflip;
      var newX = Math.floor(Math.random()* 100);

      if (people.length < 50){
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
    if(pushes) e.x+=10;
    if(you.isTouching(e)){
      you.x -=2;
      generateBubble();
    }
    if(dova.isTouching(e)){
      dova.x -=2;
    }
  })
}
// function drawPeopleLvl2R(){
//   people.forEach(function(e){
//     e.draw();
//     e.move();
//     if(pushes) e.x -=50;
//     if(you.isTouching(e)){
//       you.x +=2;
//       generateBubble();
//     }
//     if(dova.isTouching(e)){
//       dova.x += 2;
//     }
//   })
// }

function onePlayer(){
  one = true
  document.getElementById("onePlayer").style.display = "none";
  document.getElementById("resOnePlayer").style.display = "block"
  document.getElementById("letterF").style.display = "none";
  resetOne();
  start();
  activateListeners = true;
}


//listeners
document.getElementById("start-button")
    .addEventListener("click",start);

document.getElementById("reset-button")
    .addEventListener("click",reset);

document.getElementById("onePlayer")
    .addEventListener("click",onePlayer);

document.getElementById("resOnePlayer")
    .addEventListener("click",resetOne);

addEventListener("keydown", function(e){
  switch(e.keyCode){
    case 82: //r
      if (interval || p2Aux == 1 || one) return
      else restartP2();
      break;
    case 83: //s
      if (p2Aux == 0 && !interval && !level2){
        level2 = true;
        turu.play();
        restartLvl2();
      } 
      if (p2Aux == 1 && !interval && !level2) {
        level2 = true;
        restartLvl2P2();
      }
      break;
    case 39: //derecha
      you.x+=30;
      if(interval) dova.image.src = images.dovaflip
      if(turnInDova)dova.x+=30;
      if(interval)you.image.src = images.male;
      steps.play();
      break;
    case 37: //izquierda
      you.x-=30;
      if(turnInDova)dova.x-=30;
     if(interval) you.image.src = images.maleflip;
     if(interval) dova.image.src = images.dova;
      steps.play();
      break;
    case 38:
    if(!turnInDova) jump.play();
    if(you.y<248) return;
    else you.y-=80;
      break;
    case 80:
      dovakhiin();
      skyrim.play();
      music.pause();
      music.currentTime = 0;
      document.getElementById("letterF").style.display = "block"
      break;
    case 70:
    if(turnInDova){
      dova.fusRoDah();
      fus.play();
    }
    break;
    }
  })