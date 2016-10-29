/**
 * Created by ho on 10/21/2016.
 */

function Enemy(world, player, EXP, name){
    this.world = world;
    this.player = player;
    this.name = name;

    this.x = random(0, 500);
    this.y = random(0, 500);

    this.speed = 1;

    // randomize our color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.size = random(6, 20);

    this.xNoiseOffset = random(0, 2000);
    this.yNoiseOffset = random(2000, 4000);


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

    this.previousX = this.x;
    this.previousY = this.y;
    this.secondPreviousX = this.previousX;
    this.secondPreviousY = this.previousY;

    this.checkBlocked = function (){
        if (this.x == this.secondPreviousX && this.y == this.secondPreviousY){
            return true;
        }
        return false;
    };

    this.goToNearestEXPNotNearPlayer = function(EXP){
        var smallestX = EXP[0].x, smallestY = EXP[0].y;
        var foundNearest = true;
        for (var i = 0; i < EXP.length; i++){
            if (dist (this.x, this.y, EXP[i].x, EXP[i].y) < dist(this.x, this.y, smallestX, smallestY)
                &&
                dist(player.x, player.y, EXP[i].x, EXP[i].y) > (player.size +30)  ){
                smallestX = EXP[i].x;
                smallestY = EXP[i].y;
            }
        }
        //chase after the nearest EXP;
        if (this.x < smallestX){
            this.x += 1;
        }
        if (this.x > smallestX){
            this.x -= 1;
        }
        if (this.y < smallestY){
            this.y += 1;
        }
        if (this.y > smallestY){
            this.y -= 1;
        }
    };

    this.goToNearestEXP = function(EXP){
        var smallestX = EXP[0].x, smallestY = EXP[0].y;
        for (var i = 0; i < EXP.length; i++){
            if (dist (this.x, this.y, EXP[i].x, EXP[i].y) < dist(this.x, this.y, smallestX, smallestY)){
                smallestX = EXP[i].x;
                smallestY = EXP[i].y;
            }
        }
        //chase after the nearest EXP;
        if (this.x < smallestX){
            this.x += 1;
        }
        if (this.x > smallestX){
            this.x -= 1;
        }
        if (this.y < smallestY){
            this.y += 1;
        }
        if (this.y > smallestY){
            this.y -= 1;
        }
    };


    this.move = function() {
        console.log("x: " + this.x + "y: " + this.y);
        //update its position so that when user moves,
        //the enemy stays in the same spot
        //RIGHT
        if (keyIsDown(68)) {
            if (this.world.offsetX > -250) {
                this.x -= this.player.speed;
            }
        }
        //LEFT
        if (keyIsDown(65)) {
            if (this.world.offsetX < 250) {
                this.x += this.player.speed;
            }
        }
        //UP
        if (keyIsDown(87)) {
            if (this.world.offsetY < 250) {
                this.y += this.player.speed;
            }
        }
        //DOWN
        if (keyIsDown(83)) {
            if (this.world.offsetY > -250) {
                this.y -= this.player.speed;
            }
        }


        //define new boundaries, NO WRAP AROUNDS!
        if (this.x < (0 + this.world.offsetX)) {
            this.x = (0 + this.world.offsetX);
        }
        if (this.x > (width + this.world.offsetX)) {
            this.x = (width + this.world.offsetX);
        }
        if (this.y < (0 + this.world.offsetY)) {
            this.y = (0 + this.world.offsetY);
        }
        if (this.y > (height + this.world.offsetY)) {
            this.y = (height + this.world.offsetY);
        }
        this.goToNearestEXP(EXP);

    };

    this.checkHit = function(other){
        if (dist(this.x, this.y, other.x, other.y) < (this.size/2)){
            if (this.size < other.size){
                return false;
            }
            else {
                //OTHER IS DELETED
                this.size += other.size;
                // this.points++;
                return true;
            }
        }
    };


}