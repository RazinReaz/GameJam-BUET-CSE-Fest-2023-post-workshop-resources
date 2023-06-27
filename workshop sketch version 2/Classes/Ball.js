class Ball {
    constructor(x, y, vx, vy, radius, color = 'red') {
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.acceleration = createVector(0, GRAVITY);
        this.radius = radius;
        this.mass = 10;
        this.color = color;

        this.state = {
            isAirborne: this.position.y + this.radius < window_height
        } 
    }

    render() {
        fill(this.color);
        // circle(this.position.x, this.position.y, this.radius * 2);
        image(ballImage, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
    }




    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.mult(FRICTION);
        this.checkBoundaries();
        this.update_state();
    }

    checkBoundaries() {
        if (this.position.x + this.radius >= window_width) {
            this.position.x = window_width - this.radius;
            this.velocity.x *= -1;
        }

        if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }

        if (this.position.y + this.radius > window_height) {
            this.position.y = window_height - this.radius;
            this.velocity.y *= -1;
        }

        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }
    }

    update_state() {
        this.state.isAirborne = this.position.y + this.radius < window_height;
    }
}
