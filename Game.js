
//Recursos de Funcionamento
var canvas;
var ctx;
var atual = new Date();
var anterior = new Date();
var dt = 1/60;
var MENU = 1;
var GAME = 2;
var screen;
var gamePaused = false;

//Recursos do game
var imgLoad;
var audLoad;
var newScreenMenu;
var loadLeveis;
var newLevel;
var newPlayer;



function init(){
  //Configurando ambiente
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 1080;
  canvas.height = 720;
  ctx = canvas.getContext("2d");

  //inicializando recursos
  imgLoad = new ImageLoader();
  imgLoad.load("background","Assets/Wall_Rock.png");
  imgLoad.load("ground","Assets/Ground_Rock.png");
  imgLoad.load("ground2","Assets/Ground_Rock2.png");
  imgLoad.load("up_ground","Assets/Up_Rock.png");
  imgLoad.load("rock","Assets/Rock.png");

  loadLeveis = new LoadLeveis();
  loadLeveis.getLevel();

  //
  setScreen(MENU);
  newCam = {x:0, y:0, width:canvas.width, height: canvas.height};
  newLevel = new Level(10,13);
  newLevel.currente_level = loadLeveis.getLevel();
  newPlayer = new Sprite(50,158,80,160);
  requestAnimationFrame(loop);
}
  ////////////////////////////////Game//////////////////////////////////

function loop(){
  requestAnimationFrame(loop);

    if(screen == GAME){
      if(!gamePaused){
          preLoop();

          ctx.save();
          ctx.translate(Math.floor(canvas.width/2-newPlayer.x),Math.floor(canvas.height/2-newPlayer.y));
          newPlayer.mover(dt);
          newLevel.drawGrid(ctx,imgLoad);
          newPlayer.drawRect(ctx);  

          posLoop();     
          ctx.restore();
        }
      }else if(screen == MENU){
          newScreenMenu = new Screen();
          newScreenMenu.renderScreen(ctx,canvas.width,canvas.height);
      }
}




    function update(){
      newPlayer.mover(newLevel,dt);
      //updateCam();
    }

    function render(){
      ctx.save();
      ctx.translate(Math.floor(canvas.width/2-newPlayer.x),Math.floor(canvas.height/2-newPlayer.y));
    
      newLevel.drawGrid(ctx,imgLoad);
      newPlayer.drawRect(ctx);
     
     ctx.restore();
    }
    



////////////--------------Funçoes-----------------///////////////

function preLoop(){
    atual = new Date(); 
    dt = (atual-anterior)/1000;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = "green";
    ctx.strokeRect(0,0,canvas.width, canvas.height);
}

function posLoop(){
    anterior = atual;
}

function updateCam(){
  newCam.x = newPlayer.x - 10;
  //newCam.y = newPlayer.y; 
}

function setScreen(screen){
  this.screen = screen;
}

addEventListener("keydown", function(e){
        switch (e.keyCode) {
          case 13://enter
            setScreen(GAME);
            this.game();
            break;
          case 32:
            break;
          case 40:
            break;  
          case 37:
            newPlayer.vx = -80;
            break;
          case 38:
            break;
          case 39:
            newPlayer.vx = 80;
            break;
          default:
        }
});
addEventListener("keyup", function(e){
        switch (e.keyCode) {
          case 37:
            newPlayer.vx = 0;
            break;
          case 38:
            break;
          case 39:
            newPlayer.vx = 0;
            break;
          case 40:
            break;  
          default:
        }
});