
var trex ,trex_running;
var ground,groundimg
var invisibleground
var cloudimage
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score=0
var obstaclesgroup
var cloudsgroup
var PLAY=1
var END=0
var gamestate=PLAY
var trex_collided
var restart,restartImage,gameoverimage,gameover
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimg=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")

trex_collided=loadAnimation("trex_collided.png")
restartimage=loadImage("restart.png")
gameoverimage=loadImage("gameOver.png")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex=createSprite(50,160,20,50)
 trex.addAnimation("running",trex_running)
 trex.scale=0.5
 trex.debug=true
 trex.setCollider("circle",0,0,40)
 ground=createSprite(200,180,400,20)
 ground.addImage("ground",groundimg)
 ground.velocityX=-2
 ground.x=ground.width/2

 invisibleground=createSprite(200,200,400,10)
 invisibleground.visible=false
 obstaclesgroup=new Group()
 cloudsgroup=new Group()
 restart=createSprite(300,140)
 restart.addImage(restartImage)
 gameover=createSprite(300,100)
 gameover.addImage(gameoverimage)
}

function draw(){
  background(180)
  text("score: "+score,500,50)

if(gamestate===PLAY){
  score=score+Math.round(frameCount/60)
  if(keyDown("space")&& trex.y>=80){
    trex.velocityY=-10
  }
  trex.velocityY+=0.5
  if(ground.x<0){
    ground.x=ground.width/2
  }
  spawnClouds()
  spawnObstacles()
  if(obstaclesgroup.isTouching(trex)){
    gamestate=END
  }
}
else if(gamestate===END){
ground.velocityX=0
obstaclesgroup.setVelocityXEach(0)
cloudsgroup.setVelocityXEach(0)
obstaclesgroup.setLifetimeEach(-1)
cloudsgroup.setLifetimeEach(-1)
trex.changeAnimation("collided",trex_collided)
}
  trex.collide(invisibleground)
  //ground.x=ground.width/2 is for reseting the ground to the center, ground.width / 2 means that as soon as the ground started going out of the screen it will reset itself back to 200
  //console.log(trex.y)
  //console.log(frameCount)
  console.log("hello"+"world")
drawSprites ()
}
function spawnObstacles(){
  if(frameCount % 60==0){

    var obstacle=createSprite (600,165,10,40)
    obstacle.velocityX=-5
  var rand=Math.round(random(1,6))
  switch(rand){
    case 1:obstacle.addImage(obstacle1)
    break
case 2:obstacle.addImage(obstacle2)
break
case 3:obstacle.addImage(obstacle3)
break
case 4:obstacle.addImage(obstacle4)
break
case 5:obstacle.addImage(obstacle5)
break
case 6:obstacle.addImage(obstacle6)
break
default:break
  }
  obstacle.scale=0.5
  obstacle.lifetime-300
  obstaclesgroup.add(obstacle)
  }
}
function spawnClouds(){
  if(frameCount % 60===0) {

  var cloud=createSprite (600,100,40,10)
    cloud.velocityX=-3
    cloud.addImage(cloudimage)
    cloud.y=Math.round(random(10,60))
      cloud.scale=0.5
      console.log(trex.depth)
      console.log(cloud.depth)
      trex.depth=cloud.depth
      trex.depth=trex.depth+1 
      cloud.lifetime=200
      cloudsgroup.add(cloud)
}
}