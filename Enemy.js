/**
 * Created by ho on 10/21/2016.
 */

function Enemy(world, player, EXP, enemy, name, id ){
    this.world = world;
    this.player = player;
    this.enemy = enemy;
    this.name = name;
    this.EXP = EXP;
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

    this.goToNearestEXPNotNear = function(player){
        var smallestX = this.EXP[0].x, smallestY = this.EXP[0].y;
        var foundNearest = true;
        for (var i = 0; i < this.EXP.length; i++){
            if (dist (this.x, this.y, this.EXP[i].x, this.EXP[i].y) < dist(this.x, this.y, smallestX, smallestY)
                &&
                dist(player.x, player.y, this.EXP[i].x, this.EXP[i].y) > (player.size +30)  ){
                smallestX = this.EXP[i].x;
                smallestY = this.EXP[i].y;
            }
        }
        //chase after the nearest this.EXP;
        if (this.x < smallestX){
            this.x += this.speed;
        }
        if (this.x > smallestX){
            this.x -= this.speed;
        }
        if (this.y < smallestY){
            this.y += this.speed;
        }
        if (this.y > smallestY){
            this.y -= this.speed;
        }
    };

    this.goToNearestEXP = function(){
        var smallestX = this.EXP[0].x, smallestY = this.EXP[0].y;
        for (var i = 0; i < this.EXP.length; i++){
            if (dist (this.x, this.y, this.EXP[i].x, this.EXP[i].y) < dist(this.x, this.y, smallestX, smallestY)){
                smallestX = this.EXP[i].x;
                smallestY = this.EXP[i].y;
            }
        }
        //chase after the nearest EXP;
        if (this.x < smallestX){
            this.x += this.speed;
        }
        if (this.x > smallestX){
            this.x -= this.speed;
        }
        if (this.y < smallestY){
            this.y += this.speed;
        }
        if (this.y > smallestY){
            this.y -= this.speed;
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

        this.movements();

    };


    this.movements = function(){
        console.log("enemy size: ", this.enemy.length);
        for (var i = 0; i < this.enemy.length; i++){
            if (this.enemy[i].id != this.id){
                if (dist(this.x, this.y, this.enemy[i].x, this.enemy[i].y) <= (this.enemy[i].size+20)){
                    if (this.size < enemy[i].size){
                        if (this.x < this.enemy[i].x) {
                            // this.previousX = this.x;
                            this.x -= this.speed;
                        }
                        if (this.x > this.enemy[i].x) {
                            // this.previousX = this.x;
                            this.x += this.speed;

                        }
                        if (this.y < this.enemy[i].y) {
                            // this.previousY = this.y;
                            this.y -= this.speed;
                        }
                        if (this.y > this.enemy[i].y) {
                            // this.previousY = this.y;
                            this.y += this.speed;
                        }
                        this.goToNearestEXPNotNear(this.enemy[i]);
                    }
                    else {
                        if (this.x < this.enemy[i].x) {
                            // this.previousX = this.x;
                            this.x += this.speed;
                        }
                        if (this.x > this.enemy[i].x) {
                            // this.previousX = this.x;
                            this.x -= this.speed;

                        }
                        if (this.y < this.enemy[i].y) {
                            // this.previousY = this.y;
                            this.y += this.speed;
                        }
                        if (this.y > this.enemy[i].y) {
                            // this.previousY = this.y;
                            this.y -= this.speed;
                        }
                    }
                }
                else {
                    this.goToNearestEXP();
                }
            }
        }

        if (dist(this.x, this.y, this.player.x, this.player.y) <= (this.player.size + 20)){
            console.log("CHECK TWO!");
            if (this.size < this.player.size){
                if (this.x < this.player.x) {
                    // this.previousX = this.x;
                    this.x -= this.speed;
                }
                if (this.x > this.player.x) {
                    // this.previousX = this.x;
                    this.x += this.speed;

                }
                if (this.y < this.player.y) {
                    // this.previousY = this.y;
                    this.y -= this.speed;
                }
                if (this.y > this.player.y) {
                    // this.previousY = this.y;
                    this.y += this.speed;
                }
                this.goToNearestEXPNotNear(player);
            }
            //this.size is bigger than player's
            else {
                if (this.x < this.player.x) {
                    // this.previousX = this.x;
                    this.x += this.speed;
                }
                if (this.x > this.player.x) {
                    // this.previousX = this.x;
                    this.x -= this.speed;

                }
                if (this.y < this.player.y) {
                    // this.previousY = this.y;
                    this.y += this.speed;
                }
                if (this.y > this.player.y) {
                    // this.previousY = this.y;
                    this.y -= this.speed;
                }
            }
        }
        else {
            this.goToNearestEXP();
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