// SET CANVAS
var canvas = document.querySelector("#sky");
var ctx = canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width= W;
canvas.height = H;



//LOAD IMAGES RESSOURCES
var santaImg = new Image ();
santaImg.src = "./images/santa.png";

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
    ctx.drawImage(letterImg, this.x, this.y, this.width, this.height);
    }
}

var letters = [
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
new Letter (letterX, 0, 50, 50),
]


var letterX = function(){
return Math.floor(Math.random()* W)
};

// CREATE SANTA
var santa = {
    x: 300, 
    y: 550,
    width: 150,
    height: 150,
    image: santaImg,
    draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)},
}

// CREATE SNOW TOP
var snow = {
    x: 0, 
    y: 555,
    width: 1800,
    height: 300,
    image: snowImg,
    draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)},
}


// CREATE BACKGROUND ANIMATION
    //code 

//CREATE SCORE COUNTER
var score = 8;
var scoreDiv = {
draw(){
ctx.beginPath(); 
ctx.arc(1500, 120, 60, 0, 2 * Math.PI);
ctx.strokeStyle = "white";
ctx.lineWidth = 6;
ctx.stroke();
ctx.closePath();
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
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "white";
      ctx.beginPath();
      for(var i = 0; i < maxflakes; i++){
        var flake = flakes[i];
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI*2, true);    
      }
      
      ctx.fill();
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
          if(flake.y > H){
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


// DRAWING GAME
function drawEverything(){
    ctx.fillStyle ="#102a54";//background
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle= "#F7F4FA";
    ctx.fillRect(0, 710, W, 210);//snow-bottom
    santa.draw();
    scoreDiv.draw();
    snow.draw();
    letters.forEach(oneletter =>{
        oneletter.draw();
})
};

// DRAWING LOOP
function drawingLoop(){
    ctx.clearRect(0, 0, W, H);
    drawEverything();
    requestAnimationFrame(function (){
        drawingLoop(); 
    })
};

drawingLoop();
back();


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