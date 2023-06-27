var rays = [];


class Player {
  constructor() {
    this.x = screenWidth / 2;
    this.y = screenheight / 2;
    this.radius = 10;
    this.turnDirection = 0;
    this.moveDirection = 0;
    this.rotationAngle = Math.PI / 2;
    this.moveSpeed = 3;
    this.turnSpeed = 1.5 * (Math.PI / 180);
  }

  //updates the position and direction of the player
  update() {
    this.rotationAngle += this.turnDirection * this.turnSpeed;

    var moveSteps = this.moveDirection * this.moveSpeed;
    var nextPlayerX = this.x + moveSteps * cos(this.rotationAngle);
    var nextPlayerY = this.y + moveSteps * sin(this.rotationAngle);

    if (!grid.hasWallAt(nextPlayerX, nextPlayerY)) {
      this.x = nextPlayerX;
      this.y = nextPlayerY;
    } else if (!grid.hasWallAt(nextPlayerX, this.y)) {
      this.x = nextPlayerX;
    } else if (!grid.hasWallAt(this.x, nextPlayerY)) {
      this.y = nextPlayerY;
    }
  }

  //Renders the player onto the screen
  render() {
    fill("red");
    noStroke();
    ellipse(MINIMAP_SCALE_FACTOR * this.x,
      MINIMAP_SCALE_FACTOR * this.y,
      MINIMAP_SCALE_FACTOR * this.radius);

    //This direction the player is facing is shown with a triangle
    //Do this using rotate() next
    triangle(
      (this.x + (this.radius * 1.3) * cos(this.rotationAngle)) * MINIMAP_SCALE_FACTOR,
      (this.y + (this.radius * 1.3) * sin(this.rotationAngle)) * MINIMAP_SCALE_FACTOR,
      (this.x + this.radius * sin(this.rotationAngle) / 2) * MINIMAP_SCALE_FACTOR,
      (this.y - this.radius * cos(this.rotationAngle) / 2) * MINIMAP_SCALE_FACTOR,
      (this.x - this.radius * sin(this.rotationAngle) / 2) * MINIMAP_SCALE_FACTOR,
      (this.y + this.radius * cos(this.rotationAngle) / 2) * MINIMAP_SCALE_FACTOR
    );
  }

  castAllRays() {
    rays = [];
    var rayAngle = this.rotationAngle - FieldOfView / 2;

    for (var i = 0; i < number_of_rays; i++) {
      var ray = new Ray(rayAngle);
      ray.RayCast();
      rays.push(ray);

      rayAngle += angle_Increment;
    }
  }

  render3DView() {
    for (var i = 0; i < number_of_rays; i++) {
      var ray = rays[i];
      //cos(angle is to correct the fishbowl effect)
      var wallDistance = ray.distance * cos(ray.rayAngle - this.rotationAngle);

      var distanceProjectionPlane = (screenWidth / 2) / tan(FieldOfView / 2);

      var render_Slice_height = (TILE_SIZE / wallDistance) * distanceProjectionPlane;

      var alpha = 170 / (wallDistance * 4);

      // render a rectangle with the calculated wall height
      fill("rgba(255, 255, 255, " + alpha + ")");
      noStroke();
      rect(
        i * render_Slice_Width,
        (screenheight / 2) - (render_Slice_height / 2),
        render_Slice_Width,
        render_Slice_height);
    }
  }
}


var player = new Player();