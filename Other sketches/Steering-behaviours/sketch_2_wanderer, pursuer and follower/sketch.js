let CANVAS_HEIGHT = 700;
let CANVAS_WIDTH = 1000;
let NUMBER_OF_BOIDS = 100;
let wanderer;
let pursuer;
let follower;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  wanderer = new Boid(random(width), random(height), 3, 'cyan', 100, 10);
  pursuer = new Boid(random(width), random(height), 3, 'red', 100, 10);
  follower = new Boid(random(width), random(height), 5, 'white', 10, 1);
}

function draw() {
  background(51);

  let mouse = createVector(mouseX, mouseY);
  follower.arrive(mouse);
  follower.evade(pursuer);
  wanderer.wander();
  wanderer.evade(follower);
  pursuer.pursue(wanderer);

  follower.ignoreEdges();
  follower.update();
  follower.show();

  wanderer.ignoreEdges();
  wanderer.update();
  wanderer.show();

  pursuer.ignoreEdges();
  pursuer.update();
  pursuer.show();
}