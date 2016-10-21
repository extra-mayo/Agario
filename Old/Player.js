/**
 * Created by ho on 10/19/2016.
 */

function Player (name, world){
    //set size via radius thing. you start off small
    this.size = 50;

    //set up name
    this.name = name;

    //link the world
    this.world = world;

    //points
    this.points = 0;

    //position : start off somewhere random in map
    this.x = 250;
    this.y = 250;
    console.log(this.x + " " + this.y);

    // randomize our color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);




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

    this.move = function (){
        //A key or LEFT
        if (keyIsDown(65)){
            // this.x -= this.speed;
            this.world.moveLeft(this.speed);
        }
        //D key or RIGHT
        if (keyIsDown(68)){
            // this.x += this.speed;
            this.world.moveRight(this.speed);
        }
        //W key or UP
        if (keyIsDown(87)){
            // this.y -= this.speed;
            this.world.moveUp(this.speed);
        }
        //S key or DOWN
        if (keyIsDown(83)){
            // this.y += this.speed;
            this.world.moveDown(this.speed);
        }

        //NO WRAP-AROUNDS!
        console.log(this.world.offsetX);
        if (this.world.offsetX > width/2){
            this.world.offSetX = width/2;
        }
        if (this.world.offsetX < 0){
            this.x = 0;
        }
        if (this.world.offsetY > height){
            this.y = height;
        }
        if (this.world.offsetY < 0){
            this.y = 0;
        }
        // this.updateSpeed();
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

    this.speed = 1;




}