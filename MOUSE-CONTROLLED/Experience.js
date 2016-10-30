/**
 * Created by ho on 10/29/2016.
 */
function Experience() {
    this.pos = createVector(random(500), random(500));
    this.radius = 20;
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);

    this.display = function () {
        imageMode(CENTER);
        noStroke();
        fill(this.r, this.g, this.b);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);

    };

    this.respawn = function () {
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
        this.pos = createVector(random(500), random(500));
    }


}