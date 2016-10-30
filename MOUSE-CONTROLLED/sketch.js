/**
 * Created by ho on 10/20/2016.
 */

var player;
var EXP = [];
var enemy = [];
var world;

function preload() {
    world = new World();
    player = new Player("ho", EXP, world);
    for (var i = 0; i < 10; i++) {
        EXP.push(new Experience());
    }
    for (var i = 0; i < 3; i++) {
        enemy.push(new Enemy("enemy " + i, i, EXP, enemy, player));
    }
}

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(0);
    world.displayWorld();
    translate(width / 2, height / 2);
    scale(30 / player.radius);
    translate(-player.pos.x, -player.pos.y);
    for (var i = 0; i < EXP.length; i++) {
        EXP[i].display();
    }
    for (var i = 0; i < enemy.length; i++) {
        enemy[i].display();
    }
    player.display();
    console.log(world.offsetX, world.offsetY);
}
