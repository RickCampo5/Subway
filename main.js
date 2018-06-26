var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//test
//ctx.fillRect(0,0,50,50);

//constants
var charX = (canvas.width/2) + 50;
var charX2 = (canvas.width/2) + 60;
var frames= 0;
var interval;
var images = {
  male: "./images/Male.png",
  female: "./images/Female.png",
  bus: "./images/sub3.jpg",
  bg: "./images/subwayStation.png" 
}
var males = [];
var females = [];
var timer = 0;
var player1Points = 0;
var player2Points = 0;
var p2Aux = 0;
var winner = "";
//var exp = Math.pow(frames, 10);
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
    timer = Math.floor(frames / 60)
    ctx.fillText(timer, this.width -100, 50 )
  }
  gameOverP1(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P1:" + player1Points + " points in " + timer + " seconds P2 press SpaceBar to continue"
    ctx.fillText(text, 200, 70 );
  }
  gameOverP2(){
    ctx.fillStyle = "white";
    ctx.font = '20px Game';
    var text = "P1:" + player1Points + " points in " + timer + "seconds"
    var text2 = "P2:" + player2Points + " points in " + timer + "seconds"
    var gameOText = "Game Over";
    ctx.fillText(gameOText, 200, 70)
    ctx.fillText(text, 700, 70 );
    ctx.fillText(text2, 700, 100)
    if(player1Points > player2Points) winner = "P1 Won!";
    else winner = "P2 Won!";
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


class Male extends Characters {
  constructor(x,y,width,height,img){
    super(x,y,width,height,img);
  }
  isTouching(item){
    return  (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
  }

}
//instances
var background = new Board();
var bus = new Bus(canvas.width, canvas.height-390, 700,390, images.bus);

//main Functions
function update(){
  frames++;
  //console.log(frames);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  background.draw();
  generatePeople();
  drawMales();
  bus.draw();
  bus.move();
  p1GameOver();
  p2GameOver();
}

function start(){
  interval = setInterval(update, 100/60);
}
//aux Functions
function p1GameOver (){
  if (timer == 30 && p2Aux == 0){
    clearInterval(interval);
    interval = undefined;
    background.gameOverP1();
  }
}
function p2GameOver(){
  if (timer == 30 && p2Aux == 1){
    clearInterval(interval);
    interval = undefined;
    background.gameOverP2();
  }
}
function restartP2(){
  males = [];
  frames = 0;
  charX = (canvas.width/2) + 50;
  charX2 = (canvas.width/2) + 60;
  bus.x = canvas.width;
  p2Aux = 1;
  start();
}
function generatePeople(){
  var img = ""
  
  if (frames % 100 === 0){

    var g = Math.floor(Math.random() * 2)
    if (g == 1) img = images.male;
    else img = images.female;

    if (males.length < 10){
      var male = new Male (charX+=40, 318, 60,70, img);
      males.push(male);
      console.log(males.length);
    } 
    
    if (males.length > 9 && males.length < 20){
      var male = new Male (charX2+=40, 290, 60,70, img);
      males.push(male);
      console.log(males.length);
    } 
  }
}

function drawMales () {
  males.forEach(function(e){
    e.draw();
  })
}

//listeners
start();

addEventListener("drag", function(e){
      males.forEach(function(element){
      element.x = e.clientX - element.x;
  })
})

addEventListener("keydown", function(e){
  if (e.keyCode === 32){
    if (interval) return
    else restartP2();
  }
})
