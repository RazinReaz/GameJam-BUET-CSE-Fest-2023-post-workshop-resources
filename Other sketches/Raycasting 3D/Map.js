const TILE_SIZE = 45;
const GRID_ROWS = 11;
const GRID_COLS = 15;

const screenWidth = GRID_COLS * TILE_SIZE;
const screenheight = GRID_ROWS * TILE_SIZE;

const FieldOfView = Math.PI / 3;
const render_Slice_Width = 3;

const number_of_rays = screenWidth / render_Slice_Width;
const angle_Increment = FieldOfView / number_of_rays;


const MINIMAP_SCALE_FACTOR = 0.2;
var renderGrid = false;

var MINIMAP_WIDTH = MINIMAP_SCALE_FACTOR * TILE_SIZE * GRID_COLS;
var MINIMAP_HEIGHT = MINIMAP_SCALE_FACTOR * TILE_SIZE * GRID_ROWS

class Map {
  constructor() {
    //creating the grid
    this.grid = [
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '#', '.', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
      ['#', '#', '#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
      ['#', '.', '.', '#', '#', '.', '.', '#', '#', '#', '#', '.', '.', '.', '#'],
      ['#', '.', '.', '#', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '#'],
      ['#', '.', '.', '#', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '#'],
      ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
    ];
  }


  hasWallAt(x, y) {

    if (x < 0 || x > screenWidth || y < 0 || y > screenheight) {
      return true;
    }

    var gridIndexX = floor(x / TILE_SIZE);
    var gridIndexY = floor(y / TILE_SIZE);
    if (this.grid[gridIndexY][gridIndexX] == '#') {
      return true;
    } else {
      return false;
    }
  }

  //This function renders the grid onto the screen
  render() {
    fill(0);
    rect(0, 0, MINIMAP_WIDTH, MINIMAP_HEIGHT);
    if (renderGrid == true) {
      for (var i = 0; i < GRID_ROWS; i++) {
        for (var j = 0; j < GRID_COLS; j++) {
          var TileX = j * TILE_SIZE;
          var TileY = i * TILE_SIZE;
          var TileColor = this.grid[i][j] == '#' ? 0 : 240;
          fill(TileColor);
          noStroke();
          rect(MINIMAP_SCALE_FACTOR * TileX,
            MINIMAP_SCALE_FACTOR * TileY,
            MINIMAP_SCALE_FACTOR * TILE_SIZE,
            MINIMAP_SCALE_FACTOR * TILE_SIZE);
        }
      }


      // for (var i = 0; i < number_of_rays; i++) {
      //   var ray = rays[i];
      //   stroke(255);
      //   point(MINIMAP_SCALE_FACTOR * ray.wallHitX, MINIMAP_SCALE_FACTOR * ray.wallHitY);
    }
  }

}


var grid = new Map();