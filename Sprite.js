function Sprite(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.g = 0;
  this.gx;
  this.gy;
  this.isGround = false;
  this.isfalling = true;
  this.isJump = false;
  this.SIZE = 16;
  this.layer = 1;
  this.pose = 0;
  this.frame = 0;
  this.poses = [
    {row: 11, col:1, frames:8, v: 4},//direita[0]
    {row: 10, col:1, frames:8, v: 4},//baixo[1]
    {row: 9, col:1, frames:8, v: 4}, //esquerda[2]
    {row: 8, col:1, frames:8, v: 4}, //cima[3]
    {row: 11, col:0, frames:1, v: 4},//parado direita[4]
    {row: 10, col:0, frames:1, v: 4},//parado baixo[5]
    {row: 9, col:0, frames:1, v: 4}, //parado esquerda[6]
    {row: 8, col:0, frames:1, v: 4}, //parado cima[7]
  ];
  this.images = null;
  this.imgKey = "pc";
  this.offset = -5;
  this.debug = true;
}



Sprite.prototype.drawCicle = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(0, 0, this.SIZE/2, 0, 2*Math.PI);
  ctx.fill();
  ctx.closePath;
  ctx.restore();
};

Sprite.prototype.drawRect = function (ctx) {
  ctx.fillStyle = "gray";
  ctx.fillRect(this.x, this.y, this.width,this.height);
  if(debug){
        ctx.strokeStyle = "Red";
        ctx.font="18px Verdana";
        ctx.fillStyle = "red";
        ctx.fillText("xy",this.x , this.y); 
        ctx.strokeRect(this.x, this.y, 2,2);
        ctx.fillText("box",this.x + this.width/2 , this.y); 
        ctx.strokeRect(this.x, this.y, this.width,this.height);
        ctx.fillText("centro",this.x + this.width/2 -30, this.y + this.height/2); 
        ctx.strokeRect(this.x + this.width/2, this.y + this.height/2,5,5);
    }
};

Sprite.prototype.drawPose = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  this.images.drawFrame(ctx,
    this.imgKey,
    this.poses[this.pose].row,
    Math.floor(this.frame),
    -32,-56, 64
  );
  ctx.restore();
};

Sprite.prototype.localizacao = function(map){
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);
}

Sprite.prototype.mover = function (dt) {

  //movimenta eixo x y
  this.vx = this.vx + this.ax*dt;
  this.x = this.x + this.vx*dt;
  this.vy = this.vy + (this.ay + this.g)*dt;
  this.y = this.y + this.vy*dt;

  this.atualizaFrameAnimacoa(dt);
};

Sprite.prototype.atualizaFrameAnimacoa = function(dt){
  // atualiza frame de animação
  this.frame += this.poses[this.pose].v*dt;
  if(this.frame>this.poses[this.pose].frames-1){
    this.frame = 0;
  }
};

Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x + this.width/2 < alvo.x - alvo.width/2)   return false;  // colisão pela esquerda
  if(this.x - this.width/2 > alvo.x + alvo.width/2)   return false;  // colisão pela direita
  if(this.y + this.height/2 < alvo.y - alvo.height/2)  return false;  //  colisão por cima
  if(this.y - this.height/2 > alvo.y + alvo.height/2)  return false;  // colisão por baixo
  return true;
};