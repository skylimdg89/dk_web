const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
let positionX = 100;
let positionY = 100;
let spacePressed = false;
let kPressed = false;
let jPressed = false;
let hPressed = false;
let lPressed = false;

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    character.update();
    character.draw();
    requestAnimationFrame(animate);
}

class Character{
    constructor(){
        this.x = 150;
        this.y = 200;
        this.width = 20;
        this.height = 20;
        this.vy = 0;
        this.weight = 1;
    }
    update(){
       if(kPressed){
        this.moveUp();  
       }
       if(jPressed){
        this.moveDown();
       }
       if(hPressed){
        this.moveLeft();
       }
       if(lPressed){
        this.moveRight();
       }
    }
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    moveLeft(){
        this.x-=3;
    }
    moveRight(){
        this.x+=3;
    }
    moveUp(){
        this.y-=3;
    }
    moveDown(){
        this.y+=3;
    }
}

const character = new Character();
animate();

window.addEventListener('keydown', function(e){
    console.log(e.code);
    if(e.code === 'Space'){
        spacePressed = true;
    }
    //testing for character
    if(e.code === 'KeyK'){
        kPressed = true;
    }
    if(e.code === 'KeyJ'){
        jPressed = true;
    }
    if(e.code === 'KeyH'){
        hPressed = true;
    }
    if(e.code === 'KeyL'){
        lPressed = true;
    }
    //testing for character
})
window.addEventListener('keyup', function(e){
    //console.log(e.code);
    if(e.code === 'Space'){
        spacePressed = false;
    }
    //testing for character
    if(e.code === 'KeyK'){
        kPressed = false;
    }
    if(e.code === 'KeyJ'){
        jPressed = false;
    }
    if(e.code === 'KeyH'){
        hPressed = false;
    }
    if(e.code === 'KeyL'){
        lPressed = false;
    }
    //testing for character
})

const mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
    console.log(`mouse x = ${mouse.x} mouse y = ${mouse.y}`);
});

canvas.addEventListener('click', function(){
    console.log(`mouse x = ${mouse.x} mouse y = ${mouse.y}`);
})


