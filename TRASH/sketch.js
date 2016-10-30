
var player;
var enemy = [];
var EXP = [];
var world;
var worldParameters = {
    tileSize: 50,
    numTiles: 49,
};

function preload(){
    world = new World(worldParameters);
    player = new Player("ho", world);
    for (var i = 0; i < 25; i++){
        EXP.push(new Experience(world));
    }
    for (var x = 0; x < 5; x++){
        enemy.push(new Enemy("enemy " + x));
    }
}


function setup() {
    // noiseDetail(24);
    createCanvas(500, 500);
}

function draw() {
    background(0);
    world.displayWorld();
    for (var x = 0; x < enemy.length; x++){
        enemy[x].move(EXP, player, enemy);
        enemy[x].display();
        if (enemy[x].checkHit(player) == true){
            //PLAYER LOSES??
        }
        for (var i = 0; i < EXP.length; i++){
            EXP[i].display();
            if (player.checkHit(EXP[i]) == true){
                EXP[i].respawn();
            }
            if (enemy[x].checkHit(EXP[i]) == true){
                EXP[i].respawn();
            }
        }
    }


    player.move();
    player.display();

}

