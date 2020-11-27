var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score, survivalTime;
var ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey=createSprite (80,315,20,20);
  monkey.addAnimation ("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  score = 0;
  survialTime = 0;
}


function draw() {
  
  //Background
  background (300);
 
  stroke("black");
    fill("black");
  textSize(20);
  text("Score:"+  score, 500, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survial Time: "+  survialTime, 100, 50);
  monkey.collide(ground);
  
  if(gameState === PLAY){
    monkey.changeAnimation("running", monkey_running);
    
   // survialTime = Math.ceil(frameCount/frameRate());
    survialTime = Math.round(frameCount/60);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  

  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacle();
    
    if(obstacleGroup.isTouching(monkey)){
  
        gameState = END;
      
    }
     drawSprites();
  }
    
    if (gameState === END) {
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  stroke("black");
  fill("black");
  textSize(30);
  text("Game Over", 110, 200);

   }
   
  
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 300 === 0){
    var obstacle;
    obstacle = createSprite(250,320,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }
}
