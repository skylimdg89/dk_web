const dragonSprite = new Image();
dragonSprite.src = '/images/dragon.png';
class Bird{
    constructor(){
        this.x = 150;
        this.y = 200;
        this.originalWidth = 941;
        this.originalHeight = 680;
        this.vy = 0; //velocity y
        this.width = this.originalWidth/20;
        this.height = this.originalHeight/20;
        this.weight = 1;
        this.frameX = 0;
    }
    update(){ //calculate position and speed of the character for each frame of animation
        let curve = Math.sin(angle) * 15;
        console.log(`curve = ${curve}`);
        if(this.y > canvas.height - (this.height * 3) + curve){//setting the restriction so the player always stays within canvas
            this.y = canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        } else {

            //running in the loop over and over, and making the player fall down. The longer it falls, the faster it falls
            //vy is increasing for every frame and at the same time,
            //vy is added to the player's vertical position, making it move down
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if(this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if(spacePressed && this.y > this.height * 3){
            this.flap();
        }
    } 
    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(dragonSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x-20, this.y-12, this.width*1.7, this.height*1.7);
    }
    flap(){
        this.vy -= 2;
        if(this.frameX >=3){
            this.frameX = 0;
        } else if(frame%3 ===0){
            this.frameX++;
        }
    }
}

const bird = new Bird();
