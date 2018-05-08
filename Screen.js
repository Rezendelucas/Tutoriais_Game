function Screen() {
  
}

Screen.prototype.renderScreen = function(ctx,largura, altura){
	ctx.fillStyle = "Black";
	ctx.fillRect(0,0,largura,altura);
	this.renderTitle(ctx,largura,altura);
	this.renderButtons(ctx);
}

Screen.prototype.renderTitle = function(ctx,largura,altura){
	ctx.font = "40px Arial"    
	ctx.fillStyle = "White";
	ctx.fillText("Dark Room",largura/2 - 100,300);
	ctx.font = "12px Arial" 
	ctx.fillText("Press Start",largura/2 - 20,400);

}

Screen.prototype.renderButtons = function(ctx){

}