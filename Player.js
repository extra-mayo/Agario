/**
 * Created by ho on 10/19/2016.
 */

function Player (name){
    //set size via radius thing. you start off small
    this.size = 50;

    //set up name
    this.name = name;

    //position : start off somewhere random in map
    this.x = random(0, 500);
    this.y = random(0, 500);
    console.log(this.x + " " + this.y);

    // randomize our color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);




    this.display = function(){
        imageMode(CENTER);
        noStroke();
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size, this.size);
        fill(0);
        textAlign(CENTER);
        text(this.name, this.x, this.y);
    };

    this.move = function (){
        //A key or LEFT
        if (keyIsDown(65)){
            this.x -= this.speed;
        }
        //D key or RIGHT
        if (keyIsDown(68)){
            this.x += this.speed;
        }
        //W key or UP
        if (keyIsDown(87)){
            this.y -= this.speed;
        }
        //S key or DOWN
        if (keyIsDown(83)){
            this.y += this.speed;
        }

        //NO WRAP-AROUNDS!
        if (this.x > width){
            this.x = width;
        }
        if (this.x < 0){
            this.x = 0;
        }
        if (this.y > height){
            this.y = height;
        }
        if (this.y < 0){
            this.y = 0;
        }
        this.updateSpeed();
    };

    this.checkHit = function(other){
        if (dist(this.x, this.y, other.x, other.y) < (this.size/2)){
            if (this.size < other.size){
                return false;
            }
            else {
                //OTHER IS DELETED
                this.size++;
                return true;
            }
        }
    };

    this.speed = 5;

    this.updateSpeed = function(){
        //BASED ON SIZE!
    }


}