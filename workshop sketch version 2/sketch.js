const window_width = 700;
const window_height = 500;

let radius = 20;
let x = window_width / 2;
let y = window_height - radius;

let ball;

function keyPressed() {
  if (keyCode === UP_ARROW && ball.state.isAirborne === false) {
    ball.acceleration.y = -JUMP_FORCE/ball.mass;
  } 
  if (keyCode === LEFT_ARROW) {
    ball.acceleration.x = -1;
  }
  if (keyCode === RIGHT_ARROW) {
    ball.acceleration.x = 1;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    ball.acceleration.y = GRAVITY;
  }

  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    ball.acceleration.x = 0;
  }
}


function setup() {
  createCanvas(window_width, window_height);
  ball = new Ball(x, y, 0, 0, radius, 'yellow');
}

function draw() {
  background(51);
  ball.render();
  ball.update();
}

function preload() {
  ballImage = loadImage('Assets/Images/ball.png');
  collisionSound = loadSound('Assets/Audios/collision.wav');
}
