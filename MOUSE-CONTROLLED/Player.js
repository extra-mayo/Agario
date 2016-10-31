/**
 * Created by ho on 10/29/2016.
 */

function Player(name, EXP) {
    this.pos = createVector(250, 250);
    this.radius = 30;
    this.name = name;

    // randomize our color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.display = function () {

        fill(255);
        imageMode(CENTER);
        smooth();
        strokeCap(ROUND);
        strokeWeight(5);
        stroke(this.r - 20, this.g - 20, this.b - 20);
        fill(this.r, this.g, this.b);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        noStroke();
        fill(0);
        textAlign(CENTER);
        text(this.name, this.pos.x, this.pos.y);
        this.move();

    };

    this.move = function () {

        var mousePos = createVector(mouseX - width / 2, mouseY - height / 2);
        mousePos.setMag(3);
        this.pos.add(mousePos);


        if (this.pos.x > width) {
            this.pos.x = width;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.y > height) {
            this.pos.y = height;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }

        for (var i = 0; i < EXP.length; i++) {
            if (this.checkHit(EXP[i]) == 1) {
                EXP[i].respawn();
            }
        }
        for (var i = 0; i < enemy.length; i++) {
            if (this.checkHit(enemy[i]) == 1) {
                enemy[i].respawn();
            }
            else if (this.checkHit(enemy[i]) == -1) {
                //TODO
                //PLAYER LOSES
                console.log("YOU LOSE!");
            }
        }

    };

    //check hit values:
    //1 = successfuly eat
    //0 = not within proximity
    //-1 = dead

    this.checkHit = function (other) {
        var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < (this.radius / 2)) {
            if (this.radius > other.radius) {
                var newArea = PI * this.radius * this.radius + PI * other.radius + other.radius;
                this.radius = sqrt(newArea / PI) + 1;
                console.log(this.radius);
                return 1;
            }
            else {
                return -1;
            }
        }
        else {
            return 0;
        }
    };


}