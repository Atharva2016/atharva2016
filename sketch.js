var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
 

  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  gameOverImage = loadImage("gameOver.png");

  restartImage = loadImage("restart.png");

  checkpointsound = loadSound("checkpoint.mp3");

  diesound = loadSound("die.mp3");

  jumpsound = loadSound("jump.mp3");

  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  //adding the game over image.
  gameOver = createSprite(180,80,150,180); 
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5
  gameOver.visible = false
  
  restart = createSprite(180,110,150,180);
  restart.addImage(restartImage);
  restart.scale=0.5
  restart.visible = false

  
  


  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
  //trex.debug = true;
  trex.setCollider("rectangle",0,0,100,100);
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);

  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    if(score > 0 && score%100===0){
      checkpointsound.play()
    }
    //move the ground
    ground.velocityX = -4;
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -13;
      jumpsound.play ()
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(mouseDown("mouse")&& restartImage == ctrl+R == true){
      ctrl+R == true;
  }

    
     //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();

    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    diesound.play()


    }
  }
  else if(gameState == END){
    //stop the ground
    trex.changeAnimation("collided", trex_collided);
    ground.velocityX = 0;
    gameOver.visible = true
    restart.visible = true
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);


    
  
  }
  

  
  trex.collide(invisibleGround);
  
 
  if (mousePressedOver(restart)){
reset()
  }  
  drawSprites();

}
function reset(){
gameState=PLAY

  score=0;
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("running", trex_running);

}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(650,165,10,40);
   obstacle.velocityX = -(6+score/100);

   
    // //generate random obstacles
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
   
   //adding obstacles to the group
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
    cloud.velocityX = -(3+score/100);;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
}

