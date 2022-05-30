var Zombie_attack;
var Zombie_run;
var police,policeAnimation;
var obstacle1,obstacle2,obstacle3;
var police_run;
var cloudImage;
var groundImage;
var restartImg;
var gameOverImg;
var jumpSound;
var dieSound;
var gameState=PLAY;
var PLAY=1;
var END=0;






function preload(){
    Zombie_attack = loadAnimation("assets/Attack1.png","assets/Attack3.png","assets/Attack5.png");
    police_run = loadAnimation("assets/police1.png","assets/police2.png","assets/police3.png")
    
  
  groundImage = loadImage("assets/ground2.png");
  
  
  obstacle1 = loadAnimation("assets/Run1.png","assets/Run3.png","assets/Run5.png");
  obstacle2 = loadAnimation("assets/Attack1.png","assets/Attack3.png","assets/Attack5.png");
  obstacle3 = loadAnimation("assets/Run1.png","assets/Run3.png","assets/Run5.png");
 
  
   restartImg = loadImage("assets/restart.png")
  gameOverImg = loadImage("assets/gameOver.png")
  
  jumpSound = loadSound("assets/jump.mp3")
  dieSound = loadSound("assets/die.mp3")
  checkPointSound = loadSound("assets/checkPoint.mp3")
}



function setup() {

    createCanvas(600, 200);
  
    zombie = createSprite(50,180,20,50);
    zombie.addAnimation("running", Zombie_run);
    //police.addAnimation("collided" ,police_collided);
    //police.scale = 0.5;
    
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
    
    //police.setCollider("rectangle",0,0,400,police.height);
   //police.debug = true
    
    score = 0;
    
 
}

function draw() {
    background(180);
    //displaying score
    text("Score: "+ score, 500,50);
    
    console.log("this is ",gameState)
    
    
    if(gameState === PLAY){
      gameOver.visible = false
      restart.visible = false
      //move the ground
      ground.velocityX = -(4+3*score/100)
      //scoring
      score = score + Math.round(frameCount/150);
      
      if (score>0 && score%500===0){
        checkPointSound.play()
      }
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      //jump when the space key is pressed
      if(keyDown("space")&& police.y >= 100) {
          police.velocityY = -12;
          jumpSound.play()
      }
      
      //add gravity
      trex.velocityY = trex.velocityY + 0.8
    
      //spawn the clouds
      spawnClouds();
    
      //spawn obstacles on the ground
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(police)){
          //gameState = END;
          //dieSound.play()
          police.velocityY= -15
          jumpSound.play()
      }
    }
     else if (gameState === END) {
       console.log("hey")
        gameOver.visible = true;
        restart.visible = true;
       
        ground.velocityX = 0;
        police.velocityY = 0
       
        //change the police animation
        police.changeAnimation("collided", police_collided);
       
        //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
       
       obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);
     }
    
   
    //stop trex from falling down
    police.collide(invisibleGround);
 
}