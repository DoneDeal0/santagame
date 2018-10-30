// SET CANVAS SKY
var canvas = document.querySelector("#sky");
var ctxSky = canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width= W;
canvas.height = H;

// SET CANVAS GAME
var canvas = document.querySelector("#game");
var ctxGame = canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width= W;
canvas.height = H;


//LOAD AUDIO RESSOURCES
var laugh = new Audio ("./music/santa-laugh.wav");
var laughLow = new Audio ("./music/santa-lowlaugh.wav");
var goodboy = new Audio ("./music/santa-goodboy.wav");
var merry = new Audio ("./music/santa-merry.wav");
var bell = new Audio ("./music/santa-bell.wav");


//LOAD IMAGES RESSOURCES
var santaImg = new Image ();
santaImg.src = "./images/santasprite.jpg";

var santaReverse = new Image();
santaReverse.src = "./images/santaspriteReverse.png";

var snowImg = new Image ();
snowImg.src = "./images/snow.png";

var letterImg = new Image ();
letterImg.src = "./images/letter.png";

var angryLetterImg = new Image ();
angryLetterImg.src = "./images/angryletter.png";

var letterCatch = new Image ();
letterCatch.src = "./images/spritecatch.png";

// CREATE LETTERS
class Letter {
    constructor (x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.caught = false;
    }
    draw(){
        if (score>0){
        this.y +=1;
      }

      if(this.y > H && this.caught=== false){
        this.y = -500;
        score-=1;
      }
      ctxGame.drawImage(letterImg, this.x, this.y, this.width, this.height);
    }
}

var letters = [
new Letter (Math.floor(Math.random()* W), 0, 50, 50),
new Letter (Math.floor(Math.random()* W), -200, 50, 50),
new Letter (Math.floor(Math.random()* W), -400, 50, 50),
new Letter (Math.floor(Math.random()* W), -600, 50, 50),
new Letter (Math.floor(Math.random()* W), -900, 50, 50),
new Letter (Math.floor(Math.random()* W), -1100, 50, 50),
new Letter (Math.floor(Math.random()* W), -1300, 50, 50),
new Letter (Math.floor(Math.random()* W), -1500, 50, 50),
new Letter (Math.floor(Math.random()* W), -1700, 50, 50),
new Letter (Math.floor(Math.random()* W), -1900, 50, 50),
]

//CREATE EXPLOSION SPRITE
var letterHit = {
  x: 500,
  y: 500,
  width: 150,
  height: 150,
  spriteX: 0,
  spriteY: 103,
  image: letterCatch,
  draw() {
    ctxGame.drawImage(letterCatch, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height)
    setInterval(function () {
      letterCatch.spriteX += 128;
      if (letterCatch.spriteX === 640){
        letterCatch.spriteX = 0;
      }
      //if (letterCatch.spriteX === 640) {
        //return;}
      },1000);  
}
}

// CREATE ANGRY LETTERS
class AngryLetter {
  constructor (x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.caught = false;
  }
  draw(){
      if (score>0){
      this.y +=1;
    }

    if(this.y > H && this.caught=== false){
      this.y = -500;
    }
    ctxGame.drawImage(angryLetterImg, this.x, this.y, this.width, this.height);
  }
}

var angryLetters = [
new AngryLetter (Math.floor(Math.random()* W), 1100, 50, 50),
new AngryLetter (Math.floor(Math.random()* W), -1800, 50, 50),
new AngryLetter (Math.floor(Math.random()* W), -2300, 50, 50),
]


// CREATE SANTA
var santa = {
    x: 300, 
    y: 575,
    width: 150,
    height: 150,
    spriteX: 0,
    spriteY: 450,
    image: santaImg,
    walkInterval: null,
    draw(){
        ctxGame.drawImage(this.image, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height)
    },
    stopWalking() {
      clearInterval(this.walkInterval);
      this.walkInterval = null;
      this.spriteX = 0;
      this.spriteY = 450;
    },

    startWalking() {
      if (this.walkInterval) {
        return;
      }

      this.walkInterval = setInterval(function () {
        santa.spriteX += 150;
        if (santa.spriteX === 600) {
          santa.spriteX = 0;
          santa.spriteY += 150;
          if (santa.spriteY === 600) {
            santa.spriteY = 0;
          }
        }
      }, 75);
    }
  }    


// CREATE SNOW TOP
var snow = {
    x: 0, 
    y: 555,
    width: 1800,
    height: 300,
    image: snowImg,
    draw(){
      ctxGame.drawImage(this.image, this.x, this.y, this.width, this.height)},
}


//CREATE SCORE COUNTER
var score = 8;
var scoreDiv = {
draw(){
  ctxGame.beginPath(); 
  ctxGame.arc(1500, 120, 60, 0, 2 * Math.PI);
  //change circle color depending on score
  if (score>15){
    ctxGame.strokeStyle = "#42f462"; 
  } else if (score>=10){
    ctxGame.strokeStyle = "#b5f441"; 
  } else if (score>5){
    ctxGame.strokeStyle = "white"; 
  } else {
    ctxGame.strokeStyle = "#e00d2d"; 
  }
  //audio depending on score
  if (score===0){
    laughLow.play();
    setTimeout(function(){
      laughLow.pause();
      laughLow.currentTime= 0;
  }, 1000);
  }
  if (score===10){
    laugh.play();
    setTimeout(function(){
      laugh.pause();
      laugh.currentTime= 0;
  }, 1000);
}
  if (score===15){
    goodboy.play();
    setTimeout(function(){
      goodboy.pause();
      goodboy.currentTime= 0;
  }, 1000);
  }
  if (score===20){
    merry.play();
    setTimeout(function(){
      merry.pause();
      merry.currentTime= 0;
  }, 1000);
  }
  // end of styling
  ctxGame.lineWidth = 6;
  ctxGame.stroke();
  ctxGame.font = "bold 70px monospace";
  ctxGame.fillStyle = "white";
  ctxGame.textAlign = "center";
  ctxGame.textBaseline = "middle";
  ctxGame.fillText(score, 1497, 120);
  ctxGame.closePath();
}
}


//ANIMATE
function back(){
    //generate snowflakes
   var maxflakes = 100; //maxflakes
    var flakes = [];
    
    //create flakes and apply attributes
    for (var i = 0; i< maxflakes; i++){
      flakes.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*5+2, 
       d: Math.random() + 1});
    }
    
    //draw flakes on canvas
    function drawFlakes(){
      ctxSky.clearRect(0, 0, W, H);
      ctxSky.fillStyle = "white";
      ctxSky.beginPath();
      for(var i = 0; i < maxflakes; i++){
        var flake = flakes[i];
        ctxSky.moveTo(flake.x, flake.y);
        ctxSky.arc(flake.x, flake.y, flake.r, 0, Math.PI*2, true);    
      }
      
      ctxSky.fill();
      moveFlakes();
    }
      var angle= 0;
     
      function moveFlakes(){
        angle += 0.01;
        for (var i = 0; i < maxflakes; i++){
          var flake = flakes[i];
          //Update flake x,y.
          flake.y += Math.pow(flake.d, 2) + 1,
            //math.sin va créer un effet sinusoidal dans les coordonnées de l'angle, afin de donner une chute plus réaliste.
          flake.x += Math.sin(angle) * 2;
          //when flake disspaears, send a new one from top
          if(flake.y > 700){
            flakes[i] = {
              x: Math.random()*W,
              y: 0,
              r: flake.r,
              d: flake.d};
          }
        }
      }     
        setInterval(drawFlakes, 25);
  }


// DRAWING ON CANVAS GAME
function drawEverything(){
    ctxGame.fillStyle ="#102a54";//background
    ctxGame.fillRect(0, 0, W, H);
    ctxGame.fillStyle= "#F7F4FA";
    ctxGame.fillRect(0, 710, W, 210);//snow-bottom
    santa.draw();
    scoreDiv.draw();
    snow.draw();
    //letterHit.draw();

   letters.forEach(oneletter =>{
       oneletter.draw();
       if (!oneletter.caught && checkCollision (santa, oneletter)){
         score+=1;
         oneletter.caught = true;
         bell.play();
    setTimeout(function(){
      bell.pause();
      bell.currentTime= 0;
  }, 1000);
       }
      })

    angryLetters.forEach(aletter =>{
        aletter.draw();
        if (!aletter.caught && checkCollision (santa, aletter)){
          score-=3;
          aletter.caught = true;
        }
       })
};

// DRAWING LOOP
function drawingLoop(){
    ctxGame.clearRect(0, 0, W, H);
    drawEverything();
    requestAnimationFrame(function (){
        drawingLoop(); 
    })
};

drawingLoop();
back();


function checkCollision(rectA, rectB){
  return rectA.y + rectA.height >= rectB.y && 
  rectA.y <= rectB.y + rectB.height &&
  rectA.x + rectA.width >= rectB.x &&
  rectA.x <= rectB.x + rectB.width;
};


// SET GAME CONTROL 
document.onkeydown = function (event){
    if(score === 20 || score === 0){
        return;
    }

    santa.startWalking();

    switch (event.keyCode){
        case 37: //<=
        santa.image = santaReverse;
        santa.x -= 20;
        break;

        case 39: //=>
        santa.image = santaImg;
        santa.x += 20;
        break;
    }
};


document.onkeyup = function (){
  santa.stopWalking();
};
