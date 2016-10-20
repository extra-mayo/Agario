
var player;
var EXP = [];

function preload(){
    player = new Player("ho");
    for (var i = 0; i < 25; i++){
        EXP.push(new Experience());
    }
}


function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(0);

    for (var i = 0; i < EXP.length; i++){
        EXP[i].display();
        if (player.checkHit(EXP[i]) == true){
            EXP[i].respawn();
        }
    }
    player.move();
    player.display();

}

