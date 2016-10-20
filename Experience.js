/**
 * Created by ho on 10/19/2016.
 */

function Experience (){
    this.size = 5;

    this.x = random(500);
    this.y = random(500);

    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);

    this.display = function(){
        imageMode(CENTER);
        noStroke();
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size, this.size);

    };

    this.respawn = function(){
        this.x = random(500);
        this.y = random(500);
    }
}