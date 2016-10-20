/**
 * Created by ho on 10/19/2016.
 */

function Enemy (name){
    this.size = random(6, 20);

    this.name = name;

    this.x = random(0, 500);
    this.y = random(0, 500);

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


    this.xNoiseOffset = random(0, 2000);
    this.yNoiseOffset = random(2000, 4000);

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

    //if blocked, use perlin noise??

    this.move = function(EXP, player, Enemy) {
        console.log(this.x, this.secondPreviousX, this.y, this.secondPreviousY);
        this.secondPreviousX = this.previousX;
        this.secondPreviousY = this.previousY;
        this.previousX = this.x;
        this.previousY = this.y;
        //NO WRAP-AROUNDS!
        if (this.x > width) {
            // this.previousX = this.x;
            this.x = width;
        }
        if (this.x < 0) {
            // this.previousX = this.x;
            this.x = 0;
        }
        if (this.y > height) {
            // this.previousY = this.y;
            this.y = height;
        }
        if (this.y < 0) {
            // this.previousY = this.y;
            this.y = 0;
        }

        //if enemy size is less than player's size
        //never go to player's direction when near
        if (this.size < player.size) {
            if (dist(this.x, this.y, player.x, player.y) <= (player.size + 10)) {
                if (this.x < player.x) {
                    // this.previousX = this.x;
                    this.x -= 1;
                }
                if (this.x > player.x) {
                    // this.previousX = this.x;
                    this.x += 1;

                }
                if (this.y < player.y) {
                    // this.previousY = this.y;
                    this.y -= 1;
                }
                if (this.y > player.x) {
                    // this.previousY = this.y;
                    this.y += 1;
                }
                if (this.checkBlocked() == true){
                    console.log("blocked! ", this.x, this.y);
                    var xMove = map(noise(this.xNoiseOffset), 0, 1, -1, 1);
                    var yMove = map(noise(this.yNoiseOffset), 0, 1, -1, 1);
                    this.x += xMove;
                    this.y += yMove;
                    this.xNoiseOffset += 0.01;
                    this.yNoiseOffset += 0.01;

                    //if you are trapped BOTTOM LEFT
                    // if (this.x < 250 && this.y < 250) {
                    //     this.x -=1;
                    //     this.y +=1;
                    // }
                }
            }
            else {
                this.goToNearestEXPNotNearPlayer(EXP);
            }
        }
        //if enemy size is larger than player's size
        else if (this.size > player.size) {
            //and it's within a certain dist from player
            //chase after it
            if (dist(this.x, this.y, player.x, player.x) > (player.size + 10) ){
                if (this.x < player.x) {
                    // this.previousX = this.x;
                    this.x += 1;
                }
                if (this.x > player.x) {
                    // this.previousX = this.x;
                    this.x -= 1;
                }
                if (this.y < player.y) {
                    // this.previousY = this.y;
                    this.y += 1;
                }
                if (this.y > player.x) {
                    // this.previousY = this.y;
                    this.y -= 1;
                }
            }
            //if it's not within dist
            //get nearest EXP
            else {
                this.goToNearestEXP(EXP);
            }

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
                // this.points++;
                return true;
            }
        }
    };

    this.respawn = function(){
        this.x = random(500);
        this.y = random(500);
        this.size = random(6, 20);
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
    };



}