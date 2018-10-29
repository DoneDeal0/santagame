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


//LOAD IMAGES RESSOURCES
var laugh = new Audio ("./music/santa-ohoh.mp3");
//pour la lancer sur evenement laugh.play();



//LOAD IMAGES RESSOURCES
var santaImg = new Image ();
santaImg.src = ["./images/santa.png"];

var snowImg = new Image ();
snowImg.src = "./images/snow.png";

var letterImg = new Image ();
letterImg.src = "./images/letter.png";

// CREATE LETTERS
class Letter {
    constructor (x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    }
    draw(){
        if (score>0){
        this.y +=1;
      }
      if(this.y > H){
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


// CREATE SANTA
var santa = {
    x: 300, 
    y: 550,
    width: 150,
    height: 150,
    image: santaImg,
    draw(){
      //for (i=0; i<santaImg.length; i++){
        ctxGame.drawImage(this.image, this.x, this.y, this.width, this.height)}
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
  ctxGame.strokeStyle = "white";
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


//CHECK COLISION
//function checkCollision(){
 //if(letter.y = 555){
  // score-= 1;}}

//code if santa x/y = letter x/x
//score +=1
//if letter.y === snow.y 
//score-=1
//if score === 20 ==> display "you win + merryChristmas.wav"
//if score === 0 ==> display "game + low pitched hohoho.wav"
// change circle color depending on score




// DRAWING ON CANVAS GAME
function drawEverything(){
    ctxGame.fillStyle ="#102a54";//background
    ctxGame.fillRect(0, 0, W, H);
    ctxGame.fillStyle= "#F7F4FA";
    ctxGame.fillRect(0, 710, W, 210);//snow-bottom
    santa.draw();
    scoreDiv.draw();
    snow.draw();

   letters.forEach(oneletter =>{
       oneletter.draw();
       if (checkCollision (santa, oneletter)){
         score+=1;
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

    switch (event.keyCode){
        case 37: //<=
        santa.x -= 20;
        break;

        case 39: //=>
        santa.x += 20;
        break;
    }
};