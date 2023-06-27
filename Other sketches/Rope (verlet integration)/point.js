class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.oldx = x;
    this.oldy = y;

    this.isPinned = false;
    this.pinX = 0;
    this.pinY = 0;
  }

  pin_to(x, y) {
    this.isPinned = true;
    this.pinX = x;
    this.pinY = y;
  }
}

// class Constraint {
//   constructor(p0, p1, len) {
//     this.point0 = new Point(p0);
//     this.point1 = new Point(p1);
//     this.length = len;
//   }
// }

function distance(p1, p2) {
  var dx = p1.x - p2.x,
    dy = p1.y - p2.y;

  return Math.sqrt(dx * dx + dy * dy);
}