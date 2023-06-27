const SCREENHEIGHT = 600;
const SCREENWIDTH = 600;
var X_CENTER = SCREENWIDTH / 2;
var Y_CENTER = SCREENHEIGHT / 2;
const ROPELETERADIUS = 2;
const NUM_OF_ROPELETS = 35;
const ROPELETLENGTH = 5;
const BOUNCEREDUCTION = 0.9;
const FRICTION = 0.995;
const GRAVITY = 0.01;

let g = GRAVITY;

var points = [];
var constraints = [];

function keyPressed() {
  if (key == 'g' || key == 'G') {
    if (g != 0) {
      g = 0;
    } else {
      g = GRAVITY;
    };
  }
}


function setup() {
  createCanvas(SCREENWIDTH, SCREENHEIGHT);

  for (var i = 0; i < NUM_OF_ROPELETS; i++) {
    points.push(new Point(X_CENTER, 100 + i * ROPELETLENGTH));
  }



  for (var i = 0; i < NUM_OF_ROPELETS - 1; i++) {
    constraints.push({
      p0: points[i],
      p1: points[i + 1],
      length: ROPELETLENGTH
    });
  }


  background(51);
}

function updatePoints() {
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    var vx = (p.x - p.oldx) * FRICTION;
    var vy = (p.y - p.oldy) * FRICTION;

    p.oldx = p.x;
    p.oldy = p.y;
    p.x += vx;
    p.y += vy;
    p.y += g;


    if (p.x > SCREENWIDTH) {
      p.x = SCREENWIDTH
      p.oldx = p.x + vx * BOUNCEREDUCTION;
    } else if (p.x < 0) {
      p.x = 0;
      p.oldx = p.x + vx * BOUNCEREDUCTION;
    }
    if (p.y > SCREENHEIGHT) {
      p.y = SCREENHEIGHT;
      p.oldy = p.y + vy * BOUNCEREDUCTION;
    } else if (p.y < 0) {
      p.y = 0;
      p.oldy = p.y + vy * BOUNCEREDUCTION;
    }


    if (p.isPinned) {
      p.x = p.pinX;
      p.y = p.pinY;
    }

    //print(p.pinX, "  ", p.pinY);
  }
}

function updateConstraint() {
  for (var i = 0; i < constraints.length; i++) {
    var c = constraints[i],
      dx = c.p1.x - c.p0.x,
      dy = c.p1.y - c.p0.y,
      dist = Math.sqrt(dx * dx + dy * dy),
      difference = c.length - dist,
      percent = (difference / dist) / 2,

      offsetx = dx * percent,
      offsety = dy * percent;

    c.p0.x -= offsetx;
    c.p0.y -= offsety;
    c.p1.x += offsetx;
    c.p1.y += offsety;
  }
}

function renderConstraints() {
  stroke(255);
  for (var i = 0; i < constraints.length; i++) {
    var c = constraints[i];
    strokeWeight(2 * ROPELETERADIUS);
    line(c.p0.x, c.p0.y, c.p1.x, c.p1.y);
  }
}


function renderPoints() {
  strokeWeight(1);
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    fill(255);
    ellipse(p.x, p.y, ROPELETERADIUS);
  }
}

function draw() {
  background(51);

  for (var i = 0; i < 5; i++) {
    points[0].pin_to(mouseX, mouseY);
    updatePoints();
    updateConstraint();
  }
  renderConstraints();
  renderPoints();
}