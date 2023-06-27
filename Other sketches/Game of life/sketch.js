const MACHINE = block_switch_engine;

const GRID_COLUMNS = 240;
const GRID_ROWS = 150;
const CELL_LENGTH = 10;

const BOARD_WIDTH = GRID_COLUMNS * CELL_LENGTH;
const BOARD_HEIGHT = GRID_ROWS * CELL_LENGTH;

//To control how the game behaves
const minNeighbour = 2;
const maxNeighbour = 3;
const reproductionNeighbour = 3;

let MODE = {
  EDIT: 0,
  PLAY: 1,
}

var currentMode = MODE.PLAY;

let ErrorCode = {
  Success: 0,
  Machine_Too_Big: 1,
}

function mousePressed() {
  if (mouseButton === CENTER) {
    if (currentMode === MODE.EDIT)
      currentMode = MODE.PLAY;
    else if (currentMode === MODE.PLAY)
      currentMode = MODE.EDIT;
  }
}

function keyPressed() {
  if ((key == 'r' || key == 'R') && currentMode === MODE.EDIT) {
    createNewGrid();
  }
  if (key == 'm' || key == 'M') {
    if (currentMode === MODE.EDIT)
      currentMode = MODE.PLAY;
    else if (currentMode === MODE.PLAY)
      currentMode = MODE.EDIT;
  }
}

//Show current mode on top
function showStateText() {
  let state;
  if (currentMode == MODE.EDIT)
    state = "EDIT MODE";
  else if (currentMode == MODE.PLAY)
    state = "PLAY MODE";
  noStroke();
  fill(51);
  textAlign(CENTER, TOP);
  textFont('Product Sans');
  textSize(18);
  text(state, width / 2, 10);
}

//Draws the lines of the cells. Useful for debug purposes
function drawCells() {
  strokeWeight(1);
  stroke(234);
  for (let x = 0; x <= BOARD_WIDTH; x += CELL_LENGTH)
    line(x, 0, x, BOARD_HEIGHT);
  for (let y = 0; y <= BOARD_HEIGHT; y += CELL_LENGTH)
    line(0, y, BOARD_WIDTH, y);
}

let grid = [];

//fill a 2D array with 0
function initialize2DArray(arr, rows, cols) {
  for (let row = 0; row < rows; row++) {
    arr.push(new Array(cols).fill(0));
  }
}

//Creates a fresh grid with all dead cells
function createNewGrid() {
  grid = [];
  initialize2DArray(grid, GRID_ROWS, GRID_COLUMNS);
}

//One line functions

let isAlive = (cell) => cell === 1;
let drawAliveCell = (i, j) => rect(j * CELL_LENGTH, i * CELL_LENGTH, CELL_LENGTH);
let getRow = (mouse_Y) => floor(mouse_Y / CELL_LENGTH);
let getCol = (mouse_X) => floor(mouse_X / CELL_LENGTH);
let aliven = (grid, i, j) => grid[i][j] = 1;
let deaden = (grid, i, j) => grid[i][j] = 0;
let within = (x, xmin, xmax) => x >= xmin && x <= xmax;

//Looks at the grid array and draws on the canvas accordingly
function drawGrid() {
  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLUMNS; j++) {
      if (isAlive(grid[i][j])) {
        drawAliveCell(i, j);
      }
    }
  }
}

function editModeMouseInteractions() {
  console.log("EDIT MODE");
  if (mouseIsPressed) {
    if (mouseButton === LEFT && within(mouseX, 0, BOARD_WIDTH) && within(mouseY, 0, BOARD_HEIGHT)) {
      aliven(grid, getRow(mouseY), getCol(mouseX));
    }
    if (mouseButton === RIGHT && within(mouseX, 0, BOARD_WIDTH) && within(mouseY, 0, BOARD_HEIGHT)) {
      deaden(grid, getRow(mouseY), getCol(mouseX));
    }
  }
}

function playModeInterations() {
  console.log("PLAY MODE");
  updateGrid();
}

//Function to update the grid in each frame.
function updateGrid() {
  let next = [];
  initialize2DArray(next, GRID_ROWS, GRID_COLUMNS);

  for (let i = 0; i < GRID_ROWS; i++) {
    for (let j = 0; j < GRID_COLUMNS; j++) {
      //count the number of alive neighbours of current grid
      let neighbourCount = countAliveNeighbours(grid, i, j);
      if (isAlive(grid[i][j]) && (neighbourCount < minNeighbour || neighbourCount > maxNeighbour)) {
        deaden(next, i, j);
      }
      else if (!isAlive(grid, i, j) && neighbourCount == reproductionNeighbour) {
        aliven(next, i, j);
      }
      else {
        next[i][j] = grid[i][j];
      }
    }
  }
  grid = next;
}

//returns the number of alive neighbours of grid[i][j]
function countAliveNeighbours(grid, y, x) {
  let neighbourCount = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let nx = (x + j + GRID_COLUMNS) % GRID_COLUMNS;
      let ny = (y + i + GRID_ROWS) % GRID_ROWS;
      neighbourCount += grid[ny][nx];
    }
  }
  //subtract the original cell to keep only the neighbour count
  neighbourCount -= grid[y][x];
  return neighbourCount;
}



function inputMachine(machine, inserti = 0, insertj = 0) {
  let machineWidth = machine[0].length;
  let machineHeight = machine.length;
  if ((inserti + machineHeight - 1) * CELL_LENGTH > BOARD_HEIGHT || (insertj + machineWidth - 1) * CELL_LENGTH > BOARD_WIDTH)
    return ErrorCode.Machine_Too_Big;

  for (let i = 0; i < machineHeight; i++) {
    for (let j = 0; j < machineWidth; j++) {
      if (machine[i][j] == '#' || machine[i][j] == 1) grid[inserti + i][insertj + j] = 1;
      else if (machine[i][j] == ' ' || machine[i][j] == 0) grid[inserti + i][insertj + j] = 0;
    }
  }
  return ErrorCode.Success;
}

//TODO
//spaceships and oscillator arrays
//embed the arrays
//optimize update grid
//text instructions 
//limit frame rate?

function setup() {
  createCanvas(BOARD_WIDTH, BOARD_HEIGHT);
  createNewGrid();
  //for (let x = 0; x < 10; x++)
    inputMachine(MACHINE, 30, 30);
}

function draw() {
  background(51);
  //drawCells();
  drawGrid();

  //currentmode will change in keypressed function (When M is pressed)
  if (currentMode == MODE.EDIT) {
    editModeMouseInteractions();
  }
  if (currentMode == MODE.PLAY) {
    playModeInterations();
  }
}