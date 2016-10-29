/**
 * Created by ho on 10/21/2016.
 */

function Enemy(world, player, EXP, enemy, name, id ){
    this.world = world;
    this.player = player;
    this.name = name;
    this.id = id;

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

    this.goToNearestEXPNotNear = function(player, EXP){
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
        // console.log("x: " + this.x + "y: " + this.y);
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

        //Orchestrates how enemy moves
        //TODO
        //do it based on distance first, not size
        this.movementsBasedOn(player);
        for (var i = 0; i < enemy.size; i++){
            if (enemy[i].id != this.id){
                this.movementsBasedOn(enemy[i]);
                for (var x = 0; x < EXP.length; x++){
                    if (this.checkHit(EXP[i]) == true){
                        EXP[i].respawn();
                        console.log("ENEMY GOT EXP");
                    }
                }
            }
        }

    };

    //if enemy size is smaller than player's
    this.movementsBasedOn = function(player){
        if (this.size < player.size) {
            //and is within a certain dist from player, run.
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
                this.goToNearestEXPNotNear(player, EXP);
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


}