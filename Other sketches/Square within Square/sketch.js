////////////////////////////////////////////////////////////
////////BEES AND BOMBS SQUARES WITHIN SQUARES///////////////
////////////////////////////////////////////////////////////




var RATE = 0;
var T = 0;
const NUMBER_OF_SQUARES = 12;
const SCREENWIDTH = 1400;
const SCREENHEIGHT = 800;
var CENTER;



class Square {
  ////later////
  //vertex is the bottom right point of the square
  constructor(vertex, center) {
    this.dist = dist(vertex.x, vertex.y, center.x, center.y);
    this.length = this.dist * sqrt(2);
    this.rotationAngle = atan((vertex.y - center.y) / (vertex.x - center.x)) * 180 / PI - 45;
    if (this.rotationAngle < 0) {
      this.rotationAngle += 180;
    }

    this.alpha = this.length;

    this.verticalDist = vertex.y - center.y;
    this.horizontalDist = vertex.x - center.x;

    this.colorHue = map(this.rotationAngle, 0, 90, 0, 360);

    this.vertex1 = createVector(vertex.x, vertex.y);
    this.vertex2 = createVector(center.x - this.verticalDist, center.y + this.horizontalDist);
    this.vertex3 = createVector(center.x - this.horizontalDist, center.y - this.verticalDist);
    this.vertex4 = createVector(center.x + this.verticalDist, center.y - this.horizontalDist);
  }

  show() {
    noFill();
    colorMode(HSB);
    stroke(this.colorHue, 100, 100);
    beginShape();
    vertex(this.vertex1.x, this.vertex1.y);
    vertex(this.vertex2.x, this.vertex2.y);
    vertex(this.vertex3.x, this.vertex3.y);
    vertex(this.vertex4.x, this.vertex4.y);
    endShape(CLOSE);
    colorMode(RGB);

    //  print(this.rotationAngle * 180 / PI - 45 + " " + this.colorHue);
  }
}


var squares = [NUMBER_OF_SQUARES];


function pushInnerSquareOf(square) {
  var x = square.vertex1.x - RATE * (square.vertex1.x - square.vertex2.x);
  var y = square.vertex1.y - RATE * (square.vertex1.y - square.vertex2.y);
  var innerVertex = createVector(x, y);

  var innerSquare = new Square(innerVertex, CENTER);
  squares.push(innerSquare);
}

function setup() {
  createCanvas(SCREENWIDTH, SCREENHEIGHT);
  CENTER = createVector(SCREENWIDTH / 2, SCREENHEIGHT / 2);
}


function update() {
  RATE += 0.002;
  if (RATE >= 1) {
    RATE -= 1;
  }
}

function draw() {
  update();
  background(51);

  squares = [];
  var vertex = createVector(SCREENWIDTH / 2 + 200, SCREENHEIGHT / 2 + 200);
  var sq = new Square(vertex, CENTER);
  squares.push(sq);

  for (var i = 0; i < NUMBER_OF_SQUARES; i++) {
    var current_square = i;
    var previous_square = current_square - 1;
    pushInnerSquareOf(squares[current_square]);
    squares[current_square].show();
  }

}