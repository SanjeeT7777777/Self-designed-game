/*
This game is about shooting ememy with gun ; if you kill him  you will win and if he kills you u will lose . the health of ememy is 200 and yours is 500 , so its easy at first level , 
playing character : player (you)
press UP_ARROW to move up
RIGHT_ARROW to move right
LEFT_ARROW to move left
DOWN_ARROW to go down &
Spacebar to release bullets

non-playing character : e1
controled by AI
it would automatically release bullets if would com in contact with you
*/
var ground;
var player;
var  bgImage;
var health;
var restart ; 
var PLAY = 1;
var END = 0;
var RESTART = 2;
var gameState = PLAY;
var bullets
var gameover;

var helathe1 ;

var youwon;
var e1;
var bulletgroupenemies ;
var bulletgroupplayer ;

function preload (){
bgImage = loadImage("S1.jpg");
playerImage = loadImage("sprite_0.png");
playerImageflip = loadImage("player.png");

enemyImage = loadImage("enemy.png");
enemyImageflip = loadImage("enemy1.png");

bulletImage = loadImage("bullet.png");

GameoverImage = loadImage("Gameover.jpg") ;

RestartImage = loadImage("restart.png");

wonImage = loadImage ("download.jpg")
}

function setup(){
    var canvas = createCanvas(1200,800);
     player = createSprite (200,600,60,60);
     player.addImage(playerImage);

   gameover = createSprite(600,400,20,20);
gameover.addImage(GameoverImage); 
gameover.scale = 0.7

youwon = createSprite(600,400,20,20);
youwon.addImage(wonImage);
youwon.visible = false;

e1= createSprite(285 , 575 , 50 , 50 );
     e1.addImage(enemyImage);
     e1.setCollider("rectangle",0,0,500,100);
    //e1.debug = true;
    e1.velocityX = 10;
e1.velocityY = 10;  

 restart = createSprite(1100,200,1,1);
 restart.addImage(RestartImage);
 restart.scale = 0.2
 restart.visible   = false;

bulletgroupenemies = new Group();
bulletgroupplayer = new Group ();
edges = createEdgeSprites();
    
     health = 500;
    healthe1= 200;

}

function draw(){
    background(bgImage);

if (gameState = PLAY){

youwon.visible = false;
gameover.visible = false;
e1.bounceOff(edges);
       player.bounceOff(edges);

if(bulletgroupplayer.isTouching(e1)){
    healthe1 = healthe1 - 20
}

//if(keyDown("space")){
  //  createbullets();
//}
if((keyDown("space")) && (player.x > e1.x)){
    createbulletsflip();
}
if((keyDown("space")) &&  (player.x < e1.x)){
    createbullets();
}

if(keyDown(UP_ARROW)){
            player.y = player.y-10;
}

if(keyDown(DOWN_ARROW)){
            player.y = player.y+10;
}

if(keyDown(LEFT_ARROW)){
           player.x = player.x-10;
            player.addImage(playerImageflip);
            //createbulletsflip();
      
}

if(keyDown(RIGHT_ARROW) ){
           player.x = player.x+10;
           player.addImage(playerImage);
        //createbullets();
}

if(bulletgroupenemies.isTouching(player)){
    health = health - 10 ; 
}

if(health < 0  ){
    player.visible = false;
    player.x =20;//added
    player.y = 60;//added

gameover.visible = true;
    gameState = END;
}

if(healthe1 < 0 ){
    e1.visible = false;
    gameState = END;

youwon.visible = true;
}
enemies();
}
  if (gameState === END){
      e1.x= 285; //added
      e1.y = 575; //added
    restart.visible = true;
    health = health;
    healthe1 = healthe1 ;

if (bulletgroupenemies.isTouching(player)){
        health = health + 10; 
    }

bullets.visible = false;
    if(mousePressedOver(restart)  ){
    gameState = RESTART;
    //restart.visible = false ; 

    
}
}



if(gameState === RESTART ){
   //e1.x = 285;
   // e1.y= 575;

    player.x = 20;
    player.y = 60;

   player.visible = true;
   e1.visible = true;

     restart.visible = false ; 

    health = 500;
    healthe1= 200;
    gameState = PLAY;
}




console.log(gameState)


    drawSprites();

//if(health < 0 && gameState === END){
   // textSize(26);
   // fill("red");
   // textFont("Georgia");
   // text("DEATH",580,400);
   // text("GAMEOVER",580, 450);
//}
//if(healthe1 < 0 && gameState === END){
   // textSize(26);
   // fill("red");
   // textFont("Georgia");
    //text("YOU WON",580,400);
   
//}

    textSize(28);
    textFont("Georgia");
    fill("red");
    text("HEALTH:"+health,1000,50)

    textSize(28);
    textFont("Georgia");
    fill("red");
    text("HEALTHe1:"+healthe1,50,50)
    
}

function createbullets () {
     bullets = createSprite(player.x,player.y,10,20);
    bullets.addImage(bulletImage);
    // bullets.debug = true;
      bullets.setCollider("rectangle",0,0,10,20);
    bullets.velocityX = 20;
    bullets.lifetime = 150;
    bulletgroupplayer.add(bullets);
}
function createbulletsflip () {
     bullets = createSprite(player.x , player.y,10,20);
     bullets.addImage(bulletImage);
     // bullets.debug = true;
      bullets.setCollider("rectangle",0,0,10,20);
    bullets.velocityX = -20;
    bullets.lifetime = 150;
    bulletgroupplayer.add (bullets)
}
function createbulletsfore1 (pos) {
     bullets = createSprite(pos.x,pos.y,10,20);
     bullets.addImage(bulletImage);
    // bullets.debug = true;
      bullets.setCollider("rectangle",0,0,10,20);
    bullets.velocityX = 20;
    bullets.lifetime = 150;
    bulletgroupenemies.add (bullets)
}
function createbulletsfore1flip (pos) {
      bullets = createSprite(pos.x,pos.y,10,20);
     bullets.addImage(bulletImage);
      //bullets.debug = true;
      bullets.setCollider("rectangle",0,0,10,20);
    bullets.velocityX = -20;
    bullets.lifetime = 150;
    bulletgroupenemies.add (bullets)
}



function enemies (){
     
    

    
    if (e1.isTouching(player) && player.x < e1.x ){
        e1.x = 285;
        e1.y = 575;
        e1.addImage(enemyImageflip);
        createbulletsfore1flip(e1);
    }
    if (e1.isTouching(player) && player.x > e1.x ){
        e1.x = 285;
        e1.y = 575;
        e1.addImage(enemyImage);
        createbulletsfore1(e1);
    }
    

     

}