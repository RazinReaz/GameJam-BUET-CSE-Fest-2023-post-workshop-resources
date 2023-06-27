const SCREENHEIGHT = 600;
const SCREENWIDTH = 600;
var X_CENTER = SCREENWIDTH / 2;
var Y_CENTER = SCREENHEIGHT / 2;

const HEADRADIUS = 20;
const JOINTRADIUS = 3;

const BOUNCEREDUCTION = 0.9;
const FRICTION = 0.995;
const GRAVITY = 0.02;
const RAN_VELOCITY = 10;


var points = [];
var constraints = [];
var g = GRAVITY;

function keyPressed() {
  if (key == 'g' || key == 'G') {
    if (g != 0) {
      g = 0;
    } else {
      g = GRAVITY;
    };
  }
}

function attach(from, to, stiff, vis) {
  constraints.push({
    p0: from,
    p1: to,
    length: distance(from, to),
    stiffness: stiff,
    visible: vis
  })
}

function setup() {
  createCanvas(SCREENWIDTH, SCREENHEIGHT);
  background(255);

  //Head
  var Head = new Point(X_CENTER, 100 + 5);
  points.push(Head);
  //Shoulder
  var Shoulder = new Point(X_CENTER, 100 + 15);
  points.push(Shoulder);
  //left hand
  var Left_elb = new Point(X_CENTER - 30, 100 + 30);
  var Left_arm = new Point(X_CENTER - 60, 100 + 30);
  points.push(Left_elb);
  points.push(Left_arm);

  //right hand
  var Right_elb = new Point(X_CENTER + 30, 100 + 30);
  var Right_arm = new Point(X_CENTER + 60, 100 + 30);
  points.push(Right_elb);
  points.push(Right_arm);

  //body
  var Hip = new Point(X_CENTER, 100 + 70);
  points.push(Hip);

  //left leg
  var Left_knee = new Point(X_CENTER - 40, 100 + 100);
  var Left_foot = new Point(X_CENTER - 80, 100 + 130);
  points.push(Left_knee);
  points.push(Left_foot);

  //right leg
  var Right_knee = new Point(X_CENTER + 40, 100 + 100);
  var Right_foot = new Point(X_CENTER + 80, 100 + 130);
  points.push(Right_knee);
  points.push(Right_foot);


  attach(Head, Shoulder, 1, true);
  attach(Shoulder, Left_elb, 1, true);
  attach(Left_elb, Left_arm, 1, true);
  attach(Shoulder, Right_elb, 1, true);
  attach(Right_elb, Right_arm, 1, true);
  attach(Shoulder, Hip, 1, true);
  attach(Hip, Left_knee, 1, true);
  attach(Left_knee, Left_foot, 1, true);
  attach(Hip, Right_knee, 1, true);
  attach(Right_knee, Right_foot, 1, true);

  attach(Shoulder, Left_foot, 0.02, false);
  attach(Shoulder, Right_foot, 0.02, false);
  attach(Head, Hip, .8, false);



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
    //print(p.x, "  ", p.y);
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

    c.p0.x -= offsetx * c.stiffness;
    c.p0.y -= offsety * c.stiffness;
    c.p1.x += offsetx * c.stiffness;
    c.p1.y += offsety * c.stiffness;
  }
}

function renderConstraints() {
  stroke(0);
  for (var i = 0; i < constraints.length; i++) {
    var c = constraints[i];
    if (c.visible == true)
      line(c.p0.x, c.p0.y, c.p1.x, c.p1.y);
  }
}


function renderPoints() {
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    if (i == 0) {
      fill(0);
      ellipse(p.x, p.y, HEADRADIUS);
    }
    fill(100);
    ellipse(p.x, p.y, JOINTRADIUS);
  }
}

function draw() {
  background(255);
  for (var i = 0; i < 2; i++) {
    updatePoints();
    updateConstraint();
  }
  renderConstraints();
  renderPoints();
}