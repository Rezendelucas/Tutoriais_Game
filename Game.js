
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
var newCam;
var newScreenMenu;
var loadlvl;
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

  loadlvl = new LoadLeveis();
  loadlvl.getLevel();

  newCam = {x:0, y:0, width:canvas.width, height: canvas.height};

  //
  setScreen(MENU);
  newCam = {x:0, y:0, width:canvas.width, height: canvas.height};
  newLevel = new Level(10,13,128);//linhas , colunas , tamnho da cell
  newLevel.currente_level = loadlvl.getLevel();
  newPlayer = new Sprite(128*5,320,80,160);
  requestAnimationFrame(loop);
}
  ////////////////////////////////Game//////////////////////////////////

function loop(){
  requestAnimationFrame(loop);

    if(screen == GAME){
      if(!gamePaused){
          preLoop();
          update();
          render();
          posLoop();     
        }
      }else if(screen == MENU){
          newScreenMenu = new Screen();
          newScreenMenu.renderScreen(ctx,canvas.width,canvas.height);
      }
}




    function update(){
      newPlayer.mover(dt);
      updateCam();
    }

    function render(){
      ctx.save();
      ctx.translate(-newCam.x,-newCam.y);
      newLevel.drawGrid(ctx,imgLoad);
      newPlayer.drawRect(ctx);
      ctx.restore();
    }
    



////////////--------------Funçoes-----------------///////////////

function preLoop(){
    atual = new Date(); 
    dt = (atual-anterior)/1000;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = "red";
    ctx.strokeRect(0,0,canvas.width, canvas.height);
}

function posLoop(){
    anterior = atual;
}

function updateCam(){
  newCam.x = newPlayer.x - (newCam.width * 0.5); //left
  limitCam();

}

function limitCam(){
  if(newCam.x < 0){
      newCam.x = 0;
    }
    if(newCam.x + newCam.width > (10 * 128)){
      newCam.x = (10 * 128) - newCam.width;
    }
    if(newCam.y < 0){
      newCam.y = 0;
    }
    if(newCam.y + newCam.height > (13 * 128)){
      newCam.y = (13 * 128) - newCam.height;
    }
}

function setScreen(screen){
  this.screen = screen;
}

addEventListener("keydown", function(e){
        switch (e.keyCode) {
          case 13://enter
            setScreen(GAME);
            this.loop();
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