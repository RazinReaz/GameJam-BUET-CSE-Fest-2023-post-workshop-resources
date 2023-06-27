const GRAVITY = 0.18;

class Ball {
    // position
    // velocity
    // radius
    // color

    constructor(x, y, vx, vy, radius, color = 'red'){
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.acceleration = createVector(0, GRAVITY);
        this.radius = radius;
        this.color = color;
    }


    render() {
        fill(this.color);
        circle(this.position.x, this.position.y, 2*this.radius);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.mult(0.99);
        this.position.add(this.velocity);
        this.checkEdges();
    }

    checkEdges() {
        if (this.position.x + this.radius >= width) {
            this.position.x = width - this.radius;
            this.velocity.x *= -1;
        }
        if (this.position.x - this.radius <= 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }
        if (this.position.y + this.radius >= height) {
            this.position.y = height - this.radius;
            this.velocity.y *= -1;
        }
        if (this.position.y - this.radius <= 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }
    }
}