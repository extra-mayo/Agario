/**
 * Created by ho on 10/20/2016.
 */

//Create player constructor
function Player (name, world){
    this.name = name;
    this.world = world;

    //center the player
    this.x = 250;
    this.y = 250;

    //Player's position based on world
    this.xWorldPos = 250;
    this.yWorldPos = 250;

    //size of player
    this.size = 10;

    // randomize our color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.speed = 10;

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
        this.move();
    };

    this.move = function(){
        console.log("new positoin: " + this.xWorldPos + " " + this.yWorldPos );
        //LEFT
        if (keyIsDown(65)){
            this.xWorldPos -= this.speed;
            if (this.xWorldPos < 0){
                this.xWorldPos = 0;
            }
            this.world.moveRight(this.speed);
        }
        //RIGHT
        if (keyIsDown(68)){
            this.xWorldPos += this.speed;
            if (this.xWorldPos > width){
                this.xWorldPos = width;
            }
            this.world.moveLeft(this.speed);
        }
        //UP
        if (keyIsDown(87)){
            this.yWorldPos -= this.speed;
            if (this.yWorldPos < 0){
                this.yWorldPos = 0;
            }
            this.world.moveUp(this.speed);
        }
        //DOWN
        if (keyIsDown(83)){
            this.yWorldPos += this.speed;
            if (this.yWorldPos > height){
                this.yWorldPos = height;
            }
            this.world.moveDown(this.speed);
        }
    };
    this.checkHit = function(other){
        if (dist(this.x, this.y, other.x, other.y) < (this.size/2)){
            if (this.size < other.size){
                return false;
            }
            else {
                //OTHER IS DELETED
                this.size++;
                this.points++;
                return true;
            }
        }
    };

}