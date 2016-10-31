
var player;
var EXP = [];
var enemy = [];
var misc;
var menuScreen;

var gameStatus = 0;
function preload() {
    menuScreen = loadImage('../images/MenuBackground.png');
}

function menuInput() {
    document.getElementById("menu").style.display = "none";
    var name = document.getElementById("name").value;
    var EXPCount = document.getElementById("expCount").value;
    var enemyCount = document.getElementById("enemyCount").value;

    player = new Player(name, EXP);
    for (var i = 0; i < EXPCount; i++) {
        EXP.push(new Experience());
    }
    for (var i = 0; i < enemyCount; i++) {
        enemy.push(new Enemy("enemy " + i, i, EXP, enemy, player, gameStatus));
    }
    misc = new Misc(EXP, player, enemy);
    gameStatus = 1;
}

function setup() {
    createCanvas(1000, 720);
    imageMode(CENTER);
    image(menuScreen, width / 2, height / 2, 1280, 720);
}

function draw() {

    //0 - Game hasn't started
    //1 - Game started
    //2 - Game ends
    if (gameStatus == 1) {
        background(0);
        misc.setCenter();
        misc.displayWorld();
        for (var i = 0; i < EXP.length; i++) {
            EXP[i].display();
        }
        for (var i = 0; i < enemy.length; i++) {
            enemy[i].display();
            if (enemy[i].gameStatus == 2) {
                gameStatus = 2;
            }
        }
        misc.displayScore();
        player.display();
        if (player.gameStatus == 2) {
            gameStatus = 2;
        }
    }
    else if (gameStatus == 2) {
        scale(1);
        fill(255)
        rect(250, 250, 100, 100);
        textAlign(CENTER);
        fill(0);
        textSize(16);
        textLeading(5);
        text("you died.", 300, 300);
    }

}
