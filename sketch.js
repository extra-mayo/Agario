/**
 * Created by ho on 10/20/2016.
 */

var world;
var player;
var EXP = [];
var enemy = [];

function preload(){
    world = new World();
    player = new Player("ho", world);
    for (var i = 0; i < 25; i++){
        EXP.push(new Experience(world, player));
    }
    for (var i = 0; i < 3; i++){
        enemy.push(new Enemy(world, player, EXP, enemy, "enemy " + i, i))
    }
}

function setup(){
    createCanvas(500, 500);
}

function draw(){
    background(0);
    world.displayWorld();

    for (var x = 0; x < enemy.length; x++){
        enemy[x].display();
    }

    for (var i = 0; i < EXP.length; i++){
        EXP[i].display();
    }
    player.display();
    console.log(world.offsetX, world.offsetY);
}