
var player;
var enemy;
var EXP = [];

function preload(){
    player = new Player("ho");
    for (var i = 0; i < 25; i++){
        EXP.push(new Experience());
    }
    enemy = new Enemy ("enemy");
}


function setup() {
    // noiseDetail(24);
    createCanvas(500, 500);
}

function draw() {
    background(0);

    for (var i = 0; i < EXP.length; i++){
        EXP[i].display();
        if (player.checkHit(EXP[i]) == true){
            EXP[i].respawn();
        }
        if (enemy.checkHit(EXP[i]) == true){
            EXP[i].respawn();
        }
    }
    if (enemy.checkHit(player) == true){
        //PLAYER LOSES??
    }
    enemy.move(EXP, player);
    enemy.display();
    player.move();
    player.display();

}

