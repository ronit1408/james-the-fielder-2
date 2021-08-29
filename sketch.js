var boy,boyImg,bomb,bombImg,ball,ballImg;
var bg,bgImg,gbImg,gb;
var score = 0;
var ballGroup,goldenBallGroup,bombGroup;
var gameState = "serve";
var playButton,playButtonImg,gameOverImg,gameOver,restart,restartImg,sadImg,sadB;

function preload(){
  boyImg = loadImage("boy.png");
  bgImg = loadImage("backGround.JPG");
  ballImg = loadImage("ball.png");
  bombImg = loadImage("bomb.png");
  gbImg = loadImage("goldenBall.png");
  gameOverImg = loadImage("gameover1.png");
  playButtonImg = loadImage("playbutton.png");
  restartImg = loadImage("restart.button.png");
  sadImg = loadImage("sad_boy.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  boy = createSprite(width/2,height-100, 50,50);
  boy.addImage("boy.Img",boyImg);
  boy.scale = 0.5;
  boy.setCollider("rectangle",0,0,390,500);

  sadB = createSprite(width/2+200,height-100, 50,50);
  sadB.addImage("SImg",sadImg);
  sadB.scale = 0.5;
 
  ballGroup = new Group();
  goldenBallGroup  = new Group();
  bombGroup = new Group();

  playButton = createSprite(width/2,300,100,50);
  playButton.addImage("playbImg",playButtonImg);

  gameOver = createSprite(width/2,110,100,50);
  gameOver.addImage("gameoImg",gameOverImg);

  restart = createSprite(width/2,310,100,50);
  restart.addImage("restart.button",restartImg);
  restart.scale = 0.5;

}

function draw() {
  background(bgImg);
 
  textSize(20);
  fill("red");
  text("Catches : " + score,50,30);

  if(gameState == "serve"){
    background("white");
    textSize(50);
    fill("green");
    textFont("bold");
    text("James_the_fielder",width/2-140,100);
    playButton.visible = true;
    if(mousePressedOver(playButton)){
      gameState = "play";
    }
    textSize(30);
    text("Control the player by left and right arrow key and catch the balls",width/2-290,200)
    gameOver.visible = false;
    boy.visible = false;
    restart.visible = false;
    sadB.visible = false;
  }

  if(gameState == "play"){
    if(ballGroup.isTouching(boy)){
      score += 1;
      ballGroup.destroyEach();
    }

    if(goldenBallGroup.isTouching(boy)){
      score += 100;
      goldenBallGroup.destroyEach();
    }
  
    var selectSprites = Math.round(random(1,2));
    if(frameCount % 80 === 0){
      if(selectSprites === 1){
        spawnBall();
      }
      else{
        bombs();
      } 
  
      }
      if(frameCount % 350 === 0){
        goldenBall();
      }
  
    if(keyIsDown(RIGHT_ARROW)){
      boy.x += 4;
    }
  
    if(keyIsDown(LEFT_ARROW)){
      boy.x -= 4;
    }
    gameOver.visible = false;
    playButton.visible = false;
    boy.visible = true;
    restart.visible = false;
    sadB.visible = false;

    if(bombGroup.isTouching(boy)){
      gameState = "end";
    }
  }else if(gameState == "end"){
    bombGroup.destroyEach();
    sadB.visible = true;
    gameOver.visible = true;
    restart.visible = true;
    boy.visible = false;
    if(mousePressedOver(restart)){
      gameState = "play";
      boy.x = width/2;
      score = 0;
    }
  }

  drawSprites();
}

function spawnBall(){
  ball = createSprite(random(30,700),20,20,20);
  ball.addImage("ballI",ballImg);
  ball.scale = 0.4 ;
  ball.velocityY = 5;
  ball.lifetime = 80;
  ballGroup.add(ball);
}

function bombs(){
  bomb = createSprite(random(30,700),20,20,20);
  bomb.addImage("bombI",bombImg);
  bomb.scale = 0.3;
  bomb.velocityY = 5;
  bomb.lifetime = 80;
  bombGroup.add(bomb);
}

function goldenBall(){
  gb = createSprite(random(30,700),20,20,20);
  gb.addImage("gbI",gbImg);
  gb.scale = 0.4;
  gb.velocityY = 5;
  gb.lifetime = 80;
  goldenBallGroup.add(gb);
}