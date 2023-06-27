const WIDTH = 1500;
const HEIGHT = 700;
const density = 70;
const multiplier = 0.002;

let points = []


function renderPoints(points) {
  //points must be an array of vectors.
  for (let i = 0; i < points.length; i++) {
    ellipse(points[i].x, points[i].y, 2);
  }
}

function crossedBoundary(x,y){
  return x<0 || x>width || y<0 || y>height;
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  //creating the points in the 2d space as vectors
  var space = width / density;
  for (let x = space; x < width; x += space) {
    for (let y = space; y < height - space; y += space) {
      points.push(createVector(x, y));
    }
  }
  //will implement random color each time window is refreshed
  colorMode(HSB)
  hue = random(255);
  saturation = 200;
  brightness = 255;
  fill(hue, saturation, brightness,10);
  colorMode(RGB);
}

function draw() {
  //background has alpha value for the trails
  //updating the position of the points
  background(14,10);
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];

    //if points crossed the boundary
    if(crossedBoundary(pt.x, pt.y)){
      points[i] = createVector(random(width), random(height));
    }
    //adding noiseAngle to the points
    let noiseValue = noise(pt.x * multiplier, pt.y * multiplier);
    let angle = map(noiseValue, 0, 1, 0, 2 * PI);
    let delVector = createVector(cos(angle), sin(angle));
    pt.add(delVector);
  }
  
  noStroke();
  renderPoints(points);
}
