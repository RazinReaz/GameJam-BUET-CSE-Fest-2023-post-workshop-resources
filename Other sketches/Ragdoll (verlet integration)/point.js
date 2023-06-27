class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.oldx = x + random(-RAN_VELOCITY, RAN_VELOCITY);
    this.oldy = y + random(-RAN_VELOCITY, RAN_VELOCITY);
  }
}


function distance(p1, p2) {
  var dx = p1.x - p2.x,
    dy = p1.y - p2.y;

  return Math.sqrt(dx * dx + dy * dy);
}