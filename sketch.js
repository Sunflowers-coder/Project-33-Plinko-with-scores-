const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var particle;
var divisions = []; 
var plinkos = [];

var divisionHeight=300;
var score = 0;
var count = 5;

var gameState = "START";


function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <= width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <= width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <= width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <= width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    
}
 


function draw() {
  background("black");
  Engine.update(engine);

  textSize(35);
  fill("255");
  text("Score : "+score,15,40);
  text("Turns left : "+count,598,34);
  text("500",10,536);
  text("500",90,536);
  text("500",170,536);
  text("500",250,536);
  text("100",330,536);
  text("100",410,536);
  text("100",490,536);
  text("200",570,536);
  text("200",650,536);
  text("200",730,536);

 console.log(mouseX+","+mouseY);

 ground.display();
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   if(particle != null) {
      particle.display();

    if (particle.body.position.y > 700 && particle.body.position.x > 0 && particle.body.position.x < 800) {
        if (particle.body.position.x < 322) {
          score = score+500;                               
       }

        if(particle.body.position.x < 562 && particle.body.position.x > 301 ) {
          score = score + 100;

       }
        if (particle.body.position.x < 900 && particle.body.position.x > 562 ) {
           score = score + 200;

       } 
       particle = null;

        if (count < 1) {
          gameState = "END";
       }

  }
}

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

if(gameState === "END"){
    background("black");
    fill("white");
    textSize(60);
    text("Game Over",250,350);
    textSize(50)
    text("Your score was : "+ score,180,420)
    textSize(50);
    text("Press Space Key to play again!",60,500)
  }
}

//Allows the user to play the game again when the space key is pressed 
function keyPressed(){
  if(keyCode === 32 && gameState === "END"){
  score = 0;
  count = 5;
  gameState = "START";
  }
}

//Creates a particle when user clicks on the screen and decreases the turns 
function mousePressed() {
  if(gameState !== "END") {
    count = count-1;
    particle = new Particle(mouseX, 10, 10, 10);
    }
}