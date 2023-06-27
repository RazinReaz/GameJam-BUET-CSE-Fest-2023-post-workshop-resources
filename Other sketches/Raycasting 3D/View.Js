function distance(x1, y1, x2, y2) {
  return sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


class Ray {
  constructor(angle) {
    var theta = angle % (TWO_PI);
    if (theta < 0) {
      theta += TWO_PI;
    }

    this.rayAngle = theta;
    this.wallHitX = 0;
    this.wallHitY = 0;
    this.distance = 0;

    this.isRayFacingUp = (this.rayAngle > PI && this.rayAngle < TWO_PI);
    this.isRayFacingDown = !this.isRayFacingUp;
    this.isRayFacingRight = this.rayAngle < PI / 2 || this.rayAngle > 1.5 * PI;
    this.isRayFacingLeft = !this.isRayFacingRight;
  }



  ///Calculates the closest wall hit and sets the WallHit X ,Y values and the distance
  RayCast() {
    ///////////////////////////////////////////////////////
    ////////////////////MY CODE////////////////////////////
    ///////////////////////////////////////////////////////


    // var Xstep;
    // var Ystep;
    // ////////////////////////////////////////
    // ////// HORIZONTAL INTERSECTIONS ////////
    // ////////////////////////////////////////
    //
    // var HorWallHitX = Number.MAX_VALUE;
    // var HorWallHitY = Number.MAX_VALUE;
    // var HorWallHitDist;
    // var FoundHorizontalWallHit = false;
    //
    // //the first intersection X and Y
    // var horizontalIntersectionY = this.isRayFacingDown ?
    //   (floor(player.y / TILE_SIZE) + 1) * TILE_SIZE :
    //   (floor(player.y / TILE_SIZE) * TILE_SIZE);
    // var horizontalIntersectionX = player.x + (horizontalIntersectionY - player.y) / tan(this.rayAngle);
    //
    // //calculating the steps in which the interseptions will be incremented
    // Xstep = TILE_SIZE / tan(this.rayAngle);
    // Xstep *= (this.isRayFacingLeft && Xstep > 0) ? -1 : 1;
    // Xstep *= (this.isRayFacingRight && Xstep < 0) ? -1 : 1;
    //
    // Ystep = TILE_SIZE;
    // Ystep *= this.isRayFacingUp ? -1 : 1;
    //
    // ////////FInding the point where the ray hits a horizontal wall///////
    // while (horizontalIntersectionX > 0 && horizontalIntersectionX < screenWidth && horizontalIntersectionY > 0 & horizontalIntersectionY < screenheight) {
    //   fill("green");
    //   ellipse(horizontalIntersectionX, horizontalIntersectionY, 8)
    //   if (!grid.hasWallAt(horizontalIntersectionX, horizontalIntersectionY)) {
    //     horizontalIntersectionX += Xstep;
    //     horizontalIntersectionY += Ystep;
    //   } else {
    //     FoundHorizontalWallHit = true;
    //     HorWallHitX = horizontalIntersectionX;
    //     HorWallHitY = horizontalIntersectionY;
    //     break;
    //   }
    //
    //   HorWallHitDist = (FoundHorizontalWallHit) ?
    //     distance(player.x, player.y, HorWallHitX, HorWallHitY) :
    //     Number.MAX_VALUE;
    // }
    //
    // /////////////////////////////////////////////////
    // ////////// VERTICAL INTERSECTIONS ///////////////
    // /////////////////////////////////////////////////
    //
    // var VerWallHitX = Number.MAX_VALUE;
    // var VerWallHitY = Number.MAX_VALUE;
    // var VerWallHitDist;
    // var FoundVerticalWallHit = false;
    //
    // //the first intersection X and Y
    // var verticalIntersectionX = this.isRayFacingRight ?
    //   (floor(player.y / TILE_SIZE) + 1) * TILE_SIZE :
    //   (floor(player.y / TILE_SIZE) * TILE_SIZE);
    // var verticalIntersectionY = player.Y + (verticalIntersectionY - player.x) * tan(this.rayAngle);
    //
    // //calculating the steps in which the interseptions will be incremented
    // Ystep = TILE_SIZE / tan(this.rayAngle);
    // Ystep *= (this.isRayFacingUp && Ystep > 0) ? -1 : 1;
    // Ystep *= (this.isRayFacingDown && Ystep < 0) ? -1 : 1;
    //
    // Xstep = TILE_SIZE;
    // Xstep *= this.isRayFacingLeft ? -1 : 1;
    //
    // ////////FInding the point where the ray hits a horizontal wall///////
    // while (verticalIntersectionX > 0 && verticalIntersectionX < screenWidth && verticalIntersectionY > 0 & verticalIntersectionY < screenheight) {
    //   fill("red");
    //   ellipse(verticalIntersectionX, verticalIntersectionY, 8)
    //   if (!grid.hasWallAt(verticalIntersectionX, verticalIntersectionY)) {
    //     verticalIntersectionX += Xstep;
    //     verticalIntersectionY += Ystep;
    //   } else {
    //     FoundVerticalWallHit = true;
    //     VerWallHitX = verticalIntersectionX;
    //     VerWallHitY = verticalIntersectionY;
    //     break;
    //   }
    //
    //   VerWallHitDist = (FoundVerticalWallHit) ?
    //     distance(player.x, player.y, VerWallHitX, VerWallHitY) :
    //     Number.MAX_VALUE;
    // }
    //
    //
    // /////getting the minimum distance///////////
    // this.distance = (VerWallHitDist < HorWallHitDist) ? VerWallHitDist : HorWallHitDist;
    // this.wallHitX = (VerWallHitDist < HorWallHitDist) ? VerWallHitX : HorWallHitX;
    // this.wallHitY = (VerWallHitDist < HorWallHitDist) ? VerWallHitY : HorWallHitY;
    //
    // print(VerWallHitDist + "   Vertical")
    // print(HorWallHitDist + "   Horizontal")
    // print(this.distance + "   min distance");




    var xintercept, yintercept;
    var xstep, ystep;

    ///////////////////////////////////////////
    // HORIZONTAL RAY-GRID INTERSECTION CODE
    ///////////////////////////////////////////
    var foundHorzWallHit = false;
    var horzWallHitX = 0;
    var horzWallHitY = 0;

    // Find the y-coordinate of the closest horizontal grid intersenction
    yintercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
    yintercept += this.isRayFacingDown ? TILE_SIZE : 0;

    // Find the x-coordinate of the closest horizontal grid intersection
    xintercept = player.x + (yintercept - player.y) / Math.tan(this.rayAngle);

    // Calculate the increment xstep and ystep
    ystep = TILE_SIZE;
    ystep *= this.isRayFacingUp ? -1 : 1;

    xstep = TILE_SIZE / Math.tan(this.rayAngle);
    xstep *= (this.isRayFacingLeft && xstep > 0) ? -1 : 1;
    xstep *= (this.isRayFacingRight && xstep < 0) ? -1 : 1;

    var nextHorzTouchX = xintercept;
    var nextHorzTouchY = yintercept;

    if (this.isRayFacingUp)
      nextHorzTouchY--;

    // Increment xstep and ystep until we find a wall
    while (nextHorzTouchX >= 0 && nextHorzTouchX <= screenWidth && nextHorzTouchY >= 0 && nextHorzTouchY <= screenheight) {
      if (grid.hasWallAt(nextHorzTouchX, nextHorzTouchY)) {
        foundHorzWallHit = true;
        horzWallHitX = nextHorzTouchX;
        horzWallHitY = nextHorzTouchY;
        break;
      } else {
        nextHorzTouchX += xstep;
        nextHorzTouchY += ystep;
      }
    }

    ///////////////////////////////////////////
    /// VERTICAL RAY-GRID INTERSECTION CODE ///
    ///////////////////////////////////////////
    var foundVertWallHit = false;
    var vertWallHitX = 0;
    var vertWallHitY = 0;

    // Find the x-coordinate of the closest vertical grid intersenction
    xintercept = Math.floor(player.x / TILE_SIZE) * TILE_SIZE;
    xintercept += this.isRayFacingRight ? TILE_SIZE : 0;

    // Find the y-coordinate of the closest vertical grid intersection
    yintercept = player.y + (xintercept - player.x) * Math.tan(this.rayAngle);

    // Calculate the increment xstep and ystep
    xstep = TILE_SIZE;
    xstep *= this.isRayFacingLeft ? -1 : 1;

    ystep = TILE_SIZE * Math.tan(this.rayAngle);
    ystep *= (this.isRayFacingUp && ystep > 0) ? -1 : 1;
    ystep *= (this.isRayFacingDown && ystep < 0) ? -1 : 1;

    var nextVertTouchX = xintercept;
    var nextVertTouchY = yintercept;

    if (this.isRayFacingLeft)
      nextVertTouchX--;

    // Increment xstep and ystep until we find a wall
    while (nextVertTouchX >= 0 && nextVertTouchX <= screenWidth && nextVertTouchY >= 0 && nextVertTouchY <= screenheight) {
      if (grid.hasWallAt(nextVertTouchX, nextVertTouchY)) {
        foundVertWallHit = true;
        vertWallHitX = nextVertTouchX;
        vertWallHitY = nextVertTouchY;
        break;
      } else {
        nextVertTouchX += xstep;
        nextVertTouchY += ystep;
      }
    }

    // Calculate both horizontal and vertical distances and choose the smallest value
    var horzHitDistance = (foundHorzWallHit) ?
      distance(player.x, player.y, horzWallHitX, horzWallHitY) :
      Number.MAX_VALUE;
    var vertHitDistance = (foundVertWallHit) ?
      distance(player.x, player.y, vertWallHitX, vertWallHitY) :
      Number.MAX_VALUE;

    // only store the smallest of the distances
    this.wallHitX = (horzHitDistance < vertHitDistance) ? horzWallHitX : vertWallHitX;
    this.wallHitY = (horzHitDistance < vertHitDistance) ? horzWallHitY : vertWallHitY;
    this.distance = (horzHitDistance < vertHitDistance) ? horzHitDistance : vertHitDistance;
    this.wasHitVertical = (vertHitDistance < horzHitDistance);
  }




  render() {
    stroke("rgba(200,200,0, 0.05)");
    line(player.x * MINIMAP_SCALE_FACTOR, player.y * MINIMAP_SCALE_FACTOR,
      this.wallHitX * MINIMAP_SCALE_FACTOR, this.wallHitY * MINIMAP_SCALE_FACTOR);

    point(MINIMAP_SCALE_FACTOR * this.wallHitX, MINIMAP_SCALE_FACTOR * this.wallHitY)
  }
}