var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//var path = require('path');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img_champ = new Image();
img_champ.src = ('/images/mario.png');

var champ = {
	x : 10,
	y : 200,
	width: 50,
	height: 50,
	draw(){
		ctx.fillStyle = 'green';
		//ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_champ, this.x, this.y);
	}
}
champ.draw();

var img_barrier = new Image();
//img1.src = path.join(__dirname + '/../public/images/goomba.png')
img_barrier.src = ('/images/goomba.png');

class Barrier {
	constructor(){
		this.x = 500;
		this.y = 200;
		this.width = 50;
		this.height = 50;
	}
	draw(){
		ctx.fillStyle = 'red';
		//ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img_barrier, this.x, this.y);
	}
}

var barrier = new Barrier();
barrier.draw()

var timer = 0;
var barrier_array = [];
var jumpTimer = 0;
var animation;

function execPerFrame(){
	animation = requestAnimationFrame(execPerFrame);
	timer++;
	ctx.clearRect(0,0, canvas.width, canvas.height);

	if(timer % 200 === 0){
		var barrier = new Barrier();
		barrier_array.push(barrier);
	}

	barrier_array.forEach((a, i, o)=>{
		if (a.x < 0){
			o.splice(i, 1);
		}
		a.x--;

        collisionCheck(champ, a);

		a.draw();
	});
	if(isJump == true){
		champ.y--;
		jumpTimer++;
	}
	if(isJump == false){
		if(champ.y < 200){
			champ.y++;
		}
	}
	if(jumpTimer > 100){
		isJump = false;
		jumpTimer = 0;
	}

	champ.draw()
}
execPerFrame();

function collisionCheck (champ, barrier){
   var x_diff = barrier.x - (champ.x + champ.width) 
   var y_diff = barrier.y - (champ.y + champ.height);
   if(x_diff < 0 && y_diff < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
   }
}


var isJump = false;
document.addEventListener('keydown', function(e){
	if(e.code === 'Space'){
		isJump = true;
		
	}
})
