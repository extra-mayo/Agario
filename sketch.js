/**
 * Created by ho on 10/20/2016.
 */

var world;
var player;
var EXP = [];

function preload(){
    world = new World();
    player = new Player("ho", world);
    for (var i = 0; i < 25; i++){
        EXP.push(new Experience(world, player));
    }
}

function setup(){
    createCanvas(500, 500);
}

function draw(){
    background(0);
    world.displayWorld();
    for (var i = 0; i < EXP.length; i++){
        EXP[i].display();
        if (player.checkHit(EXP[i]) == true){
            EXP[i].respawn();
        }
    }
    player.display();
    console.log(world.offsetX, world.offsetY);
}