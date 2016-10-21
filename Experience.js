/**
 * Created by ho on 10/21/2016.
 */
/**
 * Created by ho on 10/20/2016.
 */

//Create player constructor
function Experience (world, player){

    this.world = world;
    this.player = player;

    this.size = 8;

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
        this.updatePosition();
    };

    this.respawn = function(){
        this.x = random(this.world.offsetX, this.world.offsetX + 500);
        this.y = random(this.world.offsetY, this.world.offsetY + 500);
    };

    this.updatePosition = function(){
        //RIGHT
        if (keyIsDown(65)){
            if (this.world.offsetX != 250) {
                this.x += this.player.speed;
            }
        }
        //LEFT
        if (keyIsDown(68)){
            if (this.world.offsetX != -250){
                this.x -= this.player.speed;
            }
        }
        //DOWN
        if (keyIsDown(87)){
            if (this.world.offsetY != 250){
               this.y += this.player.speed;
            }
        }
        //UP
        if (keyIsDown(83)){
            if (this.world.offsetY != -250){
                this.y -= this.player.speed;
            }
        }
    }

}