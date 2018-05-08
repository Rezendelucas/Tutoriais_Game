
//Recursos de Funcionamento
var canvas;
var ctx;
var MENU = 1;
var GAME = 2;
var screen;
var gamePaused = false;

//Recursos do game
var imgLoad;
var audLoad;
var loadLeveis;
var newLevel;
var newScreenMenu;


function init(){
  //Configurando ambiente
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 800;
  canvas.height = 600;
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
  newLevel = new Level(10,13);
  game();
}
  ////////////////////////////////Game//////////////////////////////////

function game(){

  if(screen == GAME){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    newLevel.currente_level = loadLeveis.getLevel();
    function loop(){
        window.requestAnimationFrame(loop,canvas);
        if(!gamePaused){
            update();
        }
        render();
    }

    function update(){

    }

    function render(){
      newLevel.drawGrid(ctx,imgLoad);
    }


    loop();

  }else if(screen == MENU){

    newScreenMenu = new Screen();
    newScreenMenu.renderScreen(ctx,canvas.width,canvas.height);

  }
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
            break;
          case 38:
            break;
          case 39:
            break;
          default:
        }
});
addEventListener("keyup", function(e){
        switch (e.keyCode) {
          case 37:
            break;
          case 38:
            break;
          case 39:
            break;
          case 40:
            break;  
          default:
        }
});