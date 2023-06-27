let CANVAS_HEIGHT = 700;
let CANVAS_WIDTH = 1000;
let NUMBER_OF_BOIDS = 50;
let boids = [];

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(51);
  for (var i = 0; i < NUMBER_OF_BOIDS; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(51);
  for (var i = 0; i < boids.length; i++) {
    let boid = boids[i];
    boid.flockWith(boids);
    boid.ignoreEdges();
    boid.update();
    boid.show();
  }
}