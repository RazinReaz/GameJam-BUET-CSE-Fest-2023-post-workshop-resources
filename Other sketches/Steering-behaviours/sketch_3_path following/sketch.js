let CANVAS_HEIGHT = 700;
let CANVAS_WIDTH = 1000;
let NUMBER_OF_BOIDS = 100;
let racer;
let path;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  racer = new Boid(random(width), random(height), 4, 'cyan', 10, 1);
  let points = [
    { x: 80, y: 150 },
    { x: 200, y: 100 },
    { x: 450, y: 380 },
    { x: 380, y: 550 },
    { x: 300, y: 500 }];

  path = new Path(points);
}

function draw() {
  background(51);
  path.show();

  if (mouseIsPressed && mouseButton === LEFT) path.updateShape(mouseX, mouseY, movedX, movedY);
  if (mouseIsPressed && mouseButton === RIGHT) path.updateMarker(mouseX, mouseY, movedX, movedY);
  
  racer.followPath(path);
  racer.update();
  racer.show();
}