var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var catcher;
var form, player, game,salaam,updated=false,visibles=[];

var annie,asmo,jan,gd,mya,shigans,pindex,i;

function preload(){
  annieImg = loadImage("images/annie.png");
  asmoImg = loadImage("images/asmo.png");
  janImg = loadImage("images/jan.png");
  gdImg = loadImage("images/gd.png");
  myaImg = loadImage("images/mya.png");
  hpImg = loadImage("images/hp.png");
  muttaImg = loadImage("images/mutta.png");
  akImg = loadImage("images/akku.png");
  saimaImg = loadImage("images/saima.png");
  ladduImg = loadImage("images/laddu.png");
  ajiImg = loadImage("images/aji.png");
  kichuImg = loadImage("images/kicha.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  Player.getPlayerInfo();
  annie = createSprite(100,200);
  asmo = createSprite(400,200);
  jan = createSprite(700,200);
  gd = createSprite(900,200);
  mya = createSprite(200,200);
  hp = createSprite(200,200);
  mutta = createSprite(200,200);
  ak = createSprite(200,200);
  saima = createSprite(200,200);
  laddu = createSprite(200,200);
  aji = createSprite(200,200);
  kichu = createSprite(200,200);
  
  // annie.visible=false;
  // asmo.visible=false;

  annie.addImage("annie",annieImg);
  asmo.addImage("asmo",asmoImg);
  jan.addImage("jan",janImg);
  gd.addImage("gd",gdImg);
  mya.addImage("mya",myaImg);
  hp.addImage("hp",hpImg);
  mutta.addImage("mutta",muttaImg);
  ak.addImage("ak",akImg);
  saima.addImage("saima",saimaImg);
  laddu.addImage("laddu",ladduImg);
  aji.addImage("aji",ajiImg);
  kichu.addImage("kichu",kichuImg);

  shigans = [annie,asmo,jan,gd,mya,hp,mutta,ak,saima,laddu,aji,kichu,];
  lockBox=[false,false,false,false,false,false,false,false,false,false,false,false];
  visibles=[];
  game = new Game();
  // game.getState();
  game.start();
  Player.getCatcher();
}


function draw(){
  if(gameState >0){
    clear();
    game.play();
  }

}
