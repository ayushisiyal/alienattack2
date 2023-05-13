///***************ALIEN ATTACK************///

var alienshipimg, spaceimg, spaceshipimg,starimg;
var space;
var spaceship;
var aliengroup, stargroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var score=0;
var gameoverImg,gameover;
var restartImg, restart;

function preload(){
  alienshipimg=loadImage("alienspaceship.png");
  spaceimg=loadImage("glaaxy.jpg");
  spaceshipimg=loadImage("spaceship.png");
  starimg=loadImage("star.png");
  gameoverImg=loadImage("gameover.png");
  restartImg= loadImage("restart.png"); 
}/////////////////

function setup(){
  createCanvas(800,600);

  //creating background
  space= createSprite(400,300,600,500);
  space.addImage("space", spaceimg);
  

  //creating our spaceship
  spaceship= createSprite(350,530, 50,30);
  spaceship.addImage("spaceship", spaceshipimg);
  spaceship.scale=0.5;

  ///creatin gruop
  aliengroup= createGroup();
  stargroup= createGroup();

  gameover=createSprite(400,300,30,30);
  gameover.addImage("game over image", gameoverImg);
  gameover.scale=0.5;
  
  restart=createSprite(370,380,30,30);
  restart.addImage("restart image", restartImg);
  restart.scale=0.4;

}//////////////////////

function draw(){
  background("black");

  fill("yellow")
  textSize(20);
  text("Score : " +score, 130,130); 

  if(gameState === PLAY){
    gameover.visible=false;
    restart.visible=false;
    space.velocityY=1;

    //resetting bg
    if(space.y>=400){
      space.y=300;
    }

    //moving ship left right
    if(keyDown(LEFT_ARROW) && spaceship.x>50){
        spaceship.x-=8;
    }
    if(keyDown(RIGHT_ARROW) && spaceship.x < 750){
        spaceship.x+=8;
    }

    if(aliengroup.isTouching(spaceship)){
      gameState=END;
    }

    if(stargroup.isTouching(spaceship)){
      stargroup.get(0).destroy();
      score=score+5;
    }

      spawnAlienShip();
      spawnStars();
  }

  else if(gameState===END){
    space.velocityY=0;
    console.log("game end");
    stargroup.setVelocityYEach(0);
    aliengroup.setVelocityYEach(0);
    gameover.visible=true;
    restart.visible=true;
    stargroup.setLifetimeEach(-1);
    aliengroup.setLifetimeEach(-1);
  }
   
  drawSprites();
}/////////////////////


function spawnAlienShip() {
  //write code here to spawn the clouds
   if (frameCount % 200 === 0) {
     alien = createSprite(600,-10,40,10);
     alien.x = Math.round(random(100,700));
     alien.addImage(alienshipimg);
     alien.scale = 0.4;
     alien.velocityY = 4;
     alien.velocityX=Math.round(random(-1,1));
    
     //assign lifetime to the variable
    alien.lifetime = 300;
    aliengroup.add(alien);
    }
}


function spawnStars() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     star = createSprite(600,-10,40,10);
     star.x = Math.round(random(100,700));
     star.addImage(starimg);
     star.scale = 0.2;
     star.velocityY = 5;
    
     //assign lifetime to the variable
     star.lifetime =300;
      stargroup.add(star);
    }
}



























/*var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided= loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
 
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);

  trex.scale = 0.5;
  trex.debug=true;
  trex.setCollider("circle",0,0,40);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END)
    {
      ground.velocityX = 0;
      trex.changeAnimation("collided", trex_collided);
      gameOver.visible = true;
      restart.visible = true;

     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);

     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     

     
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   obstacle.debug= true;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

*/