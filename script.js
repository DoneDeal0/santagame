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
var laugh = new Audio ("./music/santa-laugh.mp3");
var laughLow = new Audio ("./music/santa-lowlaugh.mp3");
var goodboy = new Audio ("./music/santa-goodboy.mp3");
var merry = new Audio ("./music/santa-merry.mp3");
var bell = new Audio ("./music/santa-bell.mp3");
var pain = new Audio ("./music/santa-pain.mp3");

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

var gameoverImg = new Image();
gameoverImg.src= "./images/gameover.jpg";

var winImg = new Image();
winImg.src= "./images/win.jpg";


// CREATE LETTERS
class Letter {
    constructor (x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.caught = false; // if caught by santa, the letter will take a true value. A filter() method 
                        //created in //DRAWING ON CANVAS GAME will then remove it from letters[] and thus from the screen. 
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
      letterHit.spriteX += 128;
      if (letterHit.spriteX === 640){
        letterHit.spriteX = 0;
      }
      },1000);  
}
}


// CREATE SANTA
var santa = {
    x: 300, 
    y: canvas.height -223,
    width: 150,
    height: 150,
    spriteX: 0,
    spriteY: 450,
    image: santaImg,
    walkInterval: null,
    flashInterval: null,
    visible: true,
    draw(){
        if (this.visible) {
          ctxGame.drawImage(this.image, this.spriteX, this.spriteY, this.width, this.height, this.x, this.y, this.width, this.height)
        }
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
        // When Santa stops walking (onkeyup), then walkInterval returns to a null 
        // value. This condition thus stops startWalking();. In //COMMANDS, onekeyup trigs stopWalking().
        // Without it, santa would walk indefinitely. 
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
    },

    santaClick (){
      var count = 0;
      this.flashInterval = setInterval(function () {
        santa.visible = !santa.visible;
        count++;

        if (count === 6) {
          clearInterval(santa.flashInterval);
          santa.visible = true;
        }
      }, 150);
    }
  }    


// CREATE SNOW TOP
var snow = {
    x: 0, 
    y: canvas.height - 235,
    width: 1800,
    height: 300,
    image: snowImg,
    draw(){
      ctxGame.drawImage(this.image, this.x, this.y, this.width, this.height)},
}


//CREATE SCORE COUNTER
var score = 8;
var radius = 60;
var zoomInterval = null;
var red = "#e00d2d";
var scoreDiv = {
  flashInterval: null,
  visible: true,


  scoreZoom (){
    var radiusList = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60];
    var count = 0;
   zoomInterval = setInterval(function () {
      radius = radiusList[count]; 
      count++;

      if (count === radiusList.length) {
        clearInterval(zoomInterval);
      }
    }, 50);
  },

  scoreClick (){
    var count = 0;
    this.flashInterval = setInterval(function () {
      scoreDiv.visible = !scoreDiv.visible;
      count++;

      if (count === 6) {
        clearInterval(scoreDiv.flashInterval);
        scoreDiv.visible = true;
      }
    }, 150);
  },

draw(){
  if (this.visible){
  ctxGame.beginPath(); 
  ctxGame.arc(canvas.width - 115, 120, radius, 0, 2 * Math.PI);
  ctxGame.lineWidth = 6;
  ctxGame.stroke();
  ctxGame.font = "bold 70px monospace";
  ctxGame.fillStyle = "white";
  ctxGame.textAlign = "center";
  ctxGame.textBaseline = "middle";
  ctxGame.fillText(score, canvas.width - 115, 120);
  //change circle color depending on score
  if (score>15){
    ctxGame.strokeStyle = "#42f462"; 
  } else if (score>=10){
    ctxGame.strokeStyle = "#b5f441"; 
  } else if (score>5){
    ctxGame.strokeStyle = "white"; 
  } else {
    ctxGame.strokeStyle = red; 
  }
  //audio depending on score
  if (score<=0){
    laughLow.play();
    setTimeout(function(){
      laughLow.pause();
      laughLow.currentTime= 0;
  }, 2000);
  }
  if (score===10){
    laugh.play();
    setTimeout(function(){
      laugh.pause();
      laugh.currentTime= 0;
  }, 2000);
}
  if (score===15){
    goodboy.play();
    setTimeout(function(){
      goodboy.pause();
      goodboy.currentTime= 0;
  }, 2500);
  }
  if (score===20){
    merry.play();
    setTimeout(function(){
      merry.pause();
      merry.currentTime= 0;
  }, 2000);
  }
  ctxGame.closePath();
}}
}

//ANIMATE BACKGROUND
function back(){
    //generate snowflakes
   var maxflakes = 100; //maximum number of flakes
    var flakes = [];
    
    //add 100 flakes to flakes[] and apply them 4 random attributes: x, y, radius, density.
    for (i = 0; i< maxflakes; i++){
      flakes.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*5+2, //so each flake can't be bigger than 7px and smaller than 2px.
       d: Math.random() + 1}); // We will use this value to move flake.y. Bigger the density, quicker it reaches the ground.
    }
    
    //draw flakes on canvas
    function drawFlakes(){
      ctxSky.clearRect(0, 0, W, H);
      ctxSky.fillStyle = "white";
      ctxSky.beginPath();
      flakes.forEach(flake =>{
        ctxSky.arc(flake.x, flake.y, flake.r, 0, Math.PI*2, true); 
        ctxSky.moveTo(flake.x, flake.y); // place the flakes to it x,y coordinates.
      })
    
      ctxSky.fill(); // draw each flake according to its properties.
      moveFlakes();
    }
      var angle= 0;
     
      function moveFlakes(){
        angle += 0.01;
        for (i = 0; i < maxflakes; i++){
          var flake = flakes[i];
          flake.y += Math.pow(flake.d, 2) + 1, // Move flake.y position according to density value instead of a basic 
                                              //value such as +2px. Each flake thus has a different speed.
                                              //Math.pow(a,b) => a exponent b. Here: flake.density^2 + 1.
          flake.x += Math.sin(angle) * 2; //Move flake.x position. Math.sin returns the sinus of an angle (always 
                                          // between -1 and 1). x value is multiplied by 2 in order to give a more 
                                          // visible effect. Since angle +=0.01 on each iteration, the flake will fall like an "S".
          if(flake.y > canvas.height - 90){ //When flake reach the ground, send a new one from top.
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
    ctxGame.fillRect(0, canvas.height - 80, W, 210);//snow-bottom
    santa.draw();
    scoreDiv.draw();
    snow.draw();

    if (score<=0){
      var newWidth = canvas.height*0.64;
      ctxGame.drawImage(gameoverImg, canvas.width/2 - newWidth/2, 100, newWidth, canvas.height * 0.7);
      ctxGame.font = "bold 25px monospace";
      ctxGame.fillText("PRESS ENTER TO PLAY AGAIN", canvas.width/2, 70);
      return;
    }
    
    if (score >= 20){
      var newWidth = canvas.height*0.64;
      ctxGame.drawImage(winImg, canvas.width/2 - newWidth/2, 100, newWidth, canvas.height * 0.7);
      ctxGame.font = "bold 25px monospace";
      ctxGame.fillText("PRESS ENTER TO PLAY AGAIN", canvas.width/2, 70);
      return;
    }

   letters.forEach(oneletter =>{
       oneletter.draw();
       if (!oneletter.caught && checkCollision (santa, oneletter)){ //If the letter has a false value (set by default), and the colission is true, 
                                                                    // then its value becomes true so the score only gains 1pt. Otherwise,
                                                                    //the score would evolve during all the contact duration between santa and the letter.
         score+=1;
         oneletter.caught = true;
         letterHit.x= oneletter.x;
         letterHit.y= oneletter.y;
         letterHit.draw();    
         if (score === 10 || score === 15){
          scoreDiv.scoreZoom ();
         }
         letters.push(new Letter (Math.floor(Math.random()* W), 0, 50, 50)); // A new letter is pushed inside letters[] array so it's never empty.
         bell.play();     
           setTimeout(function(){ //After 1 second, bell.wav stops playing. Otherwise, it would be an endless loop by efault. 
           bell.pause();
           bell.currentTime= 0;
           }, 1000);
           }
      })
      letters = letters.filter (oneletter =>{
        return !oneletter.caught //Caught letters now have a true value. We return a new filtered array expurgated 
                                // from them, and use it as our new letters[] array. Therefore, as soon as a letter is caught
                                //it disappear from the screen because it doesn't belong to letters[] anymore and thus can't be drawn.
      })

    angryLetters.forEach(aletter =>{
        aletter.draw();
        if (!aletter.caught && checkCollision (santa, aletter)){
          score-=3;
          aletter.caught = true;
          santa.santaClick();
          scoreDiv.scoreClick();
          pain.play();
            setTimeout(function(){
            pain.pause();
            pain.currentTime= 0;
            }, 2000);
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


function checkCollision(a, b){
  return a.y + a.height >= b.y && 
  a.y <= b.y + b.height &&
  a.x + a.width >= b.x &&
  a.x <= b.x + b.width;
};


// SET GAME CONTROL 
document.onkeydown = function (event){
  switch (event.keyCode){
  case 13: //ENTER
    restart();
    break;
  }

  if (score>=20 || score<=0){
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


function restart(){
  score = 8; 
  santa.x = 300; 
  santa.y = canvas.height -223;
  santa.stopWalking();

  angryLetters = [
    new AngryLetter (Math.floor(Math.random()* W), 1100, 50, 50),
    new AngryLetter (Math.floor(Math.random()* W), -1800, 50, 50),
    new AngryLetter (Math.floor(Math.random()* W), -2300, 50, 50),
    ];

  letters = [
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
      ];
}
