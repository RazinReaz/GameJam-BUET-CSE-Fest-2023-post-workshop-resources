class Boid {
    constructor(x = width / 2, y = height / 2, maxSpeed = 5, color = 'white', mass = 10, density = 1) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 2));
        this.acceleration = createVector();

        this.maxSpeed = maxSpeed;
        this.maxForce = 0.5;
        this.perceptionRadius = 100;
        this.wanderAngle = 0;
        this.currentMarker = 0;

        this.mass = mass;
        this.density = density;
        this.radius = 3 * Math.sqrt(this.mass / this.density);

        this.color = color;
    }

    ignoreEdges() {
        if (this.position.x > CANVAS_WIDTH) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = CANVAS_WIDTH;
        }
        if (this.position.y > CANVAS_HEIGHT) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = CANVAS_HEIGHT
        }
    }
    drawVector(start, vector, R = 255, G = 255, B = 255) {
        stroke(R, G, B);
        strokeWeight(1);
        line(start.x, start.y, start.x + vector.x, start.y + vector.y);
    }


    arriveAcceleration(target) {
        let vicinity = 100;
        let threshold = 0.1;
        let desire = p5.Vector.sub(target, this.position);

        let d = desire.mag();
        let speed = this.maxSpeed;
        let factor = (d < vicinity) ? d / vicinity : 1;
        if (d < threshold) factor = 0;
        desire.setMag(speed * factor);
        let followForce = p5.Vector.sub(desire, this.velocity);
        return followForce.div(this.mass);
    }

    arrive(target) {
        this.acceleration.add(this.arriveAcceleration(target))
    }

    seekAcceleration(target) {
        //target is a vector instance
        let desire = p5.Vector.sub(target, this.position);
        desire.setMag(this.maxSpeed);
        let seekForce = p5.Vector.sub(desire, this.velocity);
        return seekForce.div(this.mass);
    }

    seek(target) {
        //target is a p5 vector instance
        this.acceleration.add(this.seekAcceleration(target))
    }

    fleeAcceleration(monster) {
        //monster is a p5 vector instance
        let vicinity = 200;
        let repulse = p5.Vector.sub(this.position, monster);
        let d = repulse.mag();
        let speed = this.maxSpeed;
        let factor = (d < vicinity) ? (d / vicinity) : 1;
        repulse.setMag(speed * 0.1 / factor);
        let fleeForce = p5.Vector.sub(repulse, this.velocity);
        return fleeForce.div(this.mass);
    }

    flee(monster) {
        //monster is a p5 vector instance
        this.acceleration.add(this.fleeAcceleration(monster))
    }



    wanderAcceleration() {
        //Change these const variables to change the wandering behaviours
        const CIRCLE_RADIUS = 10;
        const CIRCLE_DISTANCE = 50;
        const ANGLE_CHANGE = PI / 10;

        let toCenter = this.velocity.copy();
        toCenter.setMag(CIRCLE_DISTANCE);
        let nudgeVector = p5.Vector.fromAngle(this.wanderAngle, CIRCLE_RADIUS);
        this.wanderAngle += ANGLE_CHANGE * (Math.random() - 0.5);
        let wanderForce = p5.Vector.add(toCenter, nudgeVector);
        return wanderForce.div(this.mass);
    }

    wander() {
        this.acceleration.add(this.wanderAcceleration())
    }

    pursueAcceleration(target) {
        //Target is an object of boid instance
        let distanceFromTarget = dist(this.position.x, this.position.y, target.position.x, target.position.y);
        let predictionTime = distanceFromTarget / this.maxSpeed;

        // s = s0 + vt
        let predictedChange = p5.Vector.mult(target.velocity, predictionTime);
        let predictedPosition = p5.Vector.add(target.position, predictedChange);

        return this.seekAcceleration(predictedPosition);
    }

    pursue(target) {
        //Target is an object of boid instance
        this.acceleration.add(this.pursueAcceleration(target))
    }

    evadeAcceleration(enemy) {
        //enemy is an object of boid instance
        let distanceFromEnemy = dist(this.position.x, this.position.y, enemy.position.x, enemy.position.y);
        let predictionTime = distanceFromEnemy / this.maxSpeed;

        // s = s0 + vt
        let predictedChange = p5.Vector.mult(enemy.velocity, predictionTime);
        let predictedPosition = p5.Vector.add(enemy.position, predictedChange);

        return this.fleeAcceleration(predictedPosition);
    }
    evade(enemy) {
        this.acceleration.add(this.evadeAcceleration(enemy));
    }

    align(boids) {
        let total = 0;
        let alignment = createVector();
        for (var i = 0; i < boids.length; i++) {
            let boid = boids[i];
            if (boid == this) {
                continue;
            }
            let distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (distance <= this.perceptionRadius) {
                alignment.add(boid.velocity);
                total++;
            }
        }
        if (total != 0) {
            alignment.div(total);
            alignment.setMag(this.maxSpeed);
            alignment.sub(this.velocity);
            alignment.limit(this.maxForce);
            alignment.div(this.mass);
        }
        return alignment;
    }

    cohere(boids) {
        let total = 0;
        let cohesion = createVector();
        for (var i = 0; i < boids.length; i++) {
            let boid = boids[i];
            if (boid == this) {
                continue;
            }

            let distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (distance <= this.perceptionRadius) {
                cohesion.add(boid.position);
                total++;
            }
        }
        if (total > 0) {
            cohesion.div(total);
            cohesion.sub(this.position); //cohesion is now the desired vector
            cohesion.setMag(this.maxSpeed);
            cohesion.sub(this.velocity); //cohesion is now the steering vector
            cohesion.limit(this.maxForce);
            cohesion.div(this.mass);
        }
        return cohesion;
    }

    seperate(boids) {
        let total = 0;
        let seperation = createVector();
        for (var i = 0; i < boids.length; i++) {
            let boid = boids[i];
            if (boid == this) {
                continue;
            }
            let distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (distance < this.perceptionRadius) {
                let repulse = p5.Vector.sub(this.position, boid.position).div(distance * distance);
                seperation.add(repulse);
                total++;
            }
        }

        if (total > 0) {
            seperation.div(total);
            seperation.setMag(this.maxSpeed);
            seperation.sub(this.velocity);
            seperation.limit(this.maxForce);
            seperation.div(this.mass);
        }
        return seperation;
    }

    flockWith(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohere(boids);
        let seperation = this.seperate(boids);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);
    }

    followPath(path) {
        //path is a Path object
        let n = path.markers.length;

        let targetMarker = path.markers[this.currentMarker];
        let d = p5.Vector.sub(targetMarker.position, this.position).mag(); //distance from boid to target
        if (d < targetMarker.radius) this.currentMarker = (this.currentMarker + 1) % n;

        let target = targetMarker.position;
        this.seek(target);
    }


    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        noStroke();
        push();
        {
            fill(this.color);
            translate(this.position.x, this.position.y);
            let angle = this.velocity.heading();
            rotate(angle);
            triangle(-this.radius, this.radius / 2, -this.radius, -this.radius / 2, this.radius, 0);
        }
        pop();
    }
}