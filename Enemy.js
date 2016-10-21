/**
 * Created by ho on 10/21/2016.
 */

function Enemy(world, player, EXP){
    this.world = world;
    this.player = player;

    this.x = random(0, 500);
    this.y = random(0, 500);

    // randomize our color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.size = random(6, 20);

    this.display = function(){
        imageMode(CENTER);
        smooth();
        strokeCap(ROUND);
        strokeWeight(5);
        stroke(this.r-20, this.g-20, this.b-20);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size, this.size);
        noStroke();
        fill(0);
        textAlign(CENTER);
        text(this.name, this.x, this.y);
    };


}