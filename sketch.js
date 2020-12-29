
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;
var monkeyScale;
var gameState; // 1 = Play, 2 = END




function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkeyScale=0.1;  
  monkey.scale=monkeyScale;
  
  
  gameState=1;

  
  //creating ground
  ground = createSprite(300,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background(255);
  if(ground.x<0){
      ground.x=ground.width/2;
  } 
  
  if(gameState===1){
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score,500,50);
  
    stroke("black");
    textSize(20);
    fill("black");
    if(frameCount%10===0){
      survivalTime=Math.round(frameCount/frameRate())
    }
  
    text("SurvivalTime: " + survivalTime, 100, 50);

    if(keyDown("space")){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    if(frameCount%80===0){
      banana=createSprite(420,Math.round(random(120,200)));
      banana.scale=0.1;
      banana.velocityX=-4;
      banana.addImage(bananaImage);
      banana.setLifetime=200;
      FoodGroup.add(banana);
    }
    
    if(frameCount%150===0){
      obstacle=createSprite(420,340,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.2
      obstacle.velocityX=-4;
      obstacle.setLifetime=200;
      obstacleGroup.add(obstacle);
    }
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      monkeyScale=monkeyScale+0.01;
      monkey.scale = monkeyScale;
    }
    
    if(monkey.isTouching(obstacleGroup)){
     
      if(monkey.scale<0.1){
        gameState=2;
      }
    
      else{
        obstacleGroup.destroyEach();
        monkeyScale=monkeyScale-0.03;
        monkey.scale = monkeyScale; 
      }
    }
    
  }
  else{//Gamestate is game over
   stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score,500,50);
  
    stroke("black");
    textSize(20);
    fill("black");
    text("Game Over " , 100, 50);
    obstacleGroup.velocityX=0;
    FoodGroup.velocityX=0;
    ground.velocityX=0;
  }

  
  
  drawSprites();
  
}






