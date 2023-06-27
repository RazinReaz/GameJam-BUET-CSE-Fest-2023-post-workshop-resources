

let x = 900/2;
let y = 500/2;


let ball;

function keyPressed() {
  if(keyCode === UP_ARROW) {
    ball.acceleration.y = -1;
  }
}

function keyReleased() {
  if(keyCode === UP_ARROW) {
    ball.acceleration.y = GRAVITY;
  }
}

function setup() {
  createCanvas(900, 500);
  ball = new Ball(width/2, height/2, random(-5,5), random(-5,5) , 30);
}

function draw() {
  background(51);

  ball.render();
  ball.update();
}