//
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0; //cycle through red, green and blue color spectrum - using color properties
let frame = 0;
let score = 0;
let gamespeed = 2;
let isGameover = false;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.4', '#000');
gradient.addColorStop('0.4', '#4040ff');
gradient.addColorStop('0.4', '#000');
gradient.addColorStop('0.4', '#fff');


const background = new Image();
background.src = '/images/background.jpg';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground(){
    if(BG.x1 <= -BG.width + gamespeed){
        BG.x1 = BG.width;
    } else{
        BG.x1 -= gamespeed;
    }
    if(BG.x2 <= -BG.width + gamespeed){
        BG.x2 = BG.width;
    } else{
        BG.x2 -= gamespeed;
    }
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();

    handleObstacles();
    handleParticles();

    bird.update();
    bird.draw();
    ctx.fillStyle = 'red';
    ctx.font = '90px Gerogia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollisions();
    if(handleCollisions()) return;
    requestAnimationFrame(animate);
    angle+=0.12;
    hue++;
    frame++; //increase frame count by 1 every animatation loop cycle
}

animate();

window.addEventListener('keydown', function(e){
    //console.log(e.code);
    if(e.code === 'Space') spacePressed = true;
})

window.addEventListener('keyup', function(e){
    //console.log(e.code);
    if(e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
})
window.addEventListener('keydown', function(e){
    //console.log(e.code);
    if(e.code === 'KeyS') isGameover = true;
})
window.addEventListener('keyup', function(e){
    //console.log(e.code);
    if(e.code === 'KeyS') isGameover = false;
})
const bang = new Image();
bang.src = '/images/boom.png';
function handleCollisions(){
    for (let i = 0; i < obstaclesArray.length; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
        bird.x + bird.width > obstaclesArray[i].x &&
        ((bird.y < 0 + obstaclesArray[i].top && 
        bird.y + bird.height > 0 ) || 
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
        bird.y + bird.height < canvas.height))){
            //collision detected
            ctx.drawImage(bang, bird.x, bird.y, 50, 50);
            ctx.font = "25px Georgia";
            ctx.fillStyle = 'black';
            ctx.fillText('Game Over, your score is ' + score, 160, canvas.height/2 - 10);
            return true;
        }
    }
}



