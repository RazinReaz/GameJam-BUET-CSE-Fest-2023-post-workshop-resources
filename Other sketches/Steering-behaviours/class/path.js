class Marker {
    constructor(x, y, r = 20) {
        this.position = createVector(x, y);
        this.radius = r;
    }

    show() {
        push();
        {
            stroke(201);
            ellipse(this.position.x, this.position.y, 5);
            fill(145, 145, 145, 145);
            ellipse(this.position.x, this.position.y, 2*this.radius);
        }
        pop();
    }
}

class Path {
    //path is just an array of marker objects
    constructor(points) {
        this.markers = [];

        for (let point of points) {
            let marker = new Marker(point.x, point.y);

            this.markers.push(marker);
        }
    }

    //show function
    show() {
        for (let i = 0; i < this.markers.length; i++) {
            //console.log(this.markers[i]);
            this.markers[i].show();
        }
        push();
        {
            noFill();
            stroke(241);
            strokeWeight(3);
            beginShape();
            curveVertex(this.markers[0].position.x, this.markers[0].position.y);
            for (let i = 0; i < this.markers.length; i++) {
                let vertex = this.markers[i];
                curveVertex(vertex.position.x, vertex.position.y);
            }
            curveVertex(this.markers[0].position.x, this.markers[0].position.y);
            curveVertex(this.markers[0].position.x, this.markers[0].position.y);
            endShape();
        }
        pop();
    }

    updateShape(mouseX, mouseY, movedX, movedY) {
        for (let marker of this.markers) {
            let x = marker.position.x;
            let y = marker.position.y;

            let d = dist(x, y, mouseX, mouseY);
            if (d <= marker.radius) {
                marker.position.x += movedX;
                marker.position.y += movedY;
            }
        }
    }

    updateMarker(mouseX, mouseY) {
        for (let marker of this.markers) {
            let x = marker.position.x;
            let y = marker.position.y;

            let d = dist(x, y, mouseX, mouseY);
            if (d <= marker.radius) {
                let new_d = dist(x, y, mouseX+movedX, mouseY+movedY);
                let dr = Math.sqrt(movedX**2 + movedY**2);
                if(new_d > d) marker.radius += dr;
                else marker.radius -= dr;
            }
        }
    }
}