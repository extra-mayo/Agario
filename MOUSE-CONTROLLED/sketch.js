
var player;
var EXP = [];
var enemy = [];
var misc;
function preload() {
    player = new Player("ho", EXP);
    for (var i = 0; i < 10; i++) {
        EXP.push(new Experience());
    }
    for (var i = 0; i < 3; i++) {
        enemy.push(new Enemy("enemy " + i, i, EXP, enemy, player));
    }
    misc = new Misc(EXP, player, enemy);
}

function setup() {
    createCanvas(1000, 720);
}

function draw() {
    background(255);

    misc.setCenter();
    misc.displayWorld();

    for (var i = 0; i < EXP.length; i++) {
        EXP[i].display();
    }
    for (var i = 0; i < enemy.length; i++) {
        enemy[i].display();
    }

    misc.displayScore();
    player.display();

}
