/**
 * Created by ho on 10/21/2016.
 */

function Enemy(world, player, EXP){
    this.world = world;
    this.player = player;

    this.x = random(0, 500);
    this.y = random(0, 500);

    this.xWorldPos = this.x;
    this.yWorldPos = this.y;

    this.speed = 1;

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
        this.move();
    };

    this.move = function(){
        //update its position so that when user moves,
        //the enemy stays in the same spot
        //RIGHT
        if (keyIsDown(68)){
            if (this.world.offsetX > -250) {
                this.x -= this.player.speed;
            }
        }
        //LEFT
        if (keyIsDown(65)){
            if (this.world.offsetX < 250){
                this.x += this.player.speed;
            }
        }
        //UP
        if (keyIsDown(87)){
            if (this.world.offsetY < 250){
                this.y += this.player.speed;
            }
        }
        //DOWN
        if (keyIsDown(83)){
            if (this.world.offsetY > -250){
                this.y -= this.player.speed;
            }
        }


        //define new boundaries, NO WRAP AROUNDS!
        if (this.x < (0 - this.world.offsetX)){
            this.x = (0 - this.world.offsetX);
        }
        if (this.x > (width - this.world.offsetX)){
            this.x = (width - this.world.offsetX);
        }
        if (this.y < (0 - this.world.offsetY)){
            this.y = (0 - this.world.offsetY);
        }
        if (this.y < (height - this.world.offsetY)){
            this.y = height - this.world.offsetY;
        }


        //Control how the enemy moves here
        //if enemy size is smaller than player size
        if (this.size < player.size){
            //and enemy is within a certain distance from player, run.
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
            }


        }



    }


}