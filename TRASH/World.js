/**
 * Created by ho on 10/19/2016.
 */

function World(parameter){

    this.tileSize = parameter.tileSize;


    this.numTiles = parameter.numTiles;

    this.offsetX = 0;
    this.offsetY = 0;
    var tile = loadImage('images/tile1.png');

    // this.display = function(x, y){
    //     image(tile, x, y);
    // };
    this.displayWorld = function(){
        push();
        translate(this.offsetX, this.offsetY);
        for (var row = 0; row < 30; row ++){
            for (var col = 0; col < 30; col++){
                image(tile, col*this.tileSize, row*this.tileSize, this.tileSize, this.tileSize);
            }
        }
        pop();
    };

    this.moveRight = function(val){
        this.offsetX += val;
    }
    this.moveLeft = function(val){
        this.offsetX -= val;
    }
    this.moveUp = function(val){
        this.offsetY -= val;
    }
    this.moveDown = function(val){
        this.offsetY += val;
    }

}