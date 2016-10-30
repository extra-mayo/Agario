/**
 * Created by ho on 10/20/2016.
 */

//The world will just be a graphpaper-esque

function World(){
    this.tileSize = 50;
    var tile = loadImage('images/tile1.png');
    this.offsetX = 0;
    this.offsetY = 0;
    this.numTiles = 50;

    this.displayWorld = function(){
        push();
        translate(this.offsetX, this.offsetY);
        //Player will be able to move around in 10 by 10
        //But there will be 30 rows and columns.
        //Why?
        //When player reaches top, we still want canvas to display tile images in lieu of displaying default background.
        //do -15, 20
        for (var row = 0; row < 11; row ++){
            for (var col = 0; col < 11; col++){
                image(tile, col*this.tileSize, row*this.tileSize, this.tileSize, this.tileSize);
            }
        }
        pop();
    };


    //move map based on player's position
    this.moveRight = function(val){
        this.offsetX += val;
        if (this.offsetX > 250){
            this.offsetX = 250;
        }
    };
    this.moveLeft = function(val){
        this.offsetX -= val;
        if (this.offsetX < -250){
            this.offsetX = -250;
        }
    };
    this.moveUp = function(val){
        this.offsetY += val;
        if (this.offsetY > 250 ){
            this.offsetY = 250;
        }
    };
    this.moveDown = function(val){
        this.offsetY -= val;
        if (this.offsetY < -250 ){
            this.offsetY = -250;
        }
    };


}