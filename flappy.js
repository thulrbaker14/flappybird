// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var player;

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/flappy_viking.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe", "assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#CDF3FF");
    score = 0
    //alert(score);

    game.add.text(20, 20, //coordinates
     "Vikings!", //text
        { font: "25px Arial", //font size and typeface
        fill: "#FF8533" } //text colour
         );

    var x = 10;
    var y = 260;
    player = game.add.sprite(x, y, "playerImg");

    game.input.onDown.add(clickHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    game.add.audio("score");

    pipeGenerator(150);
    pipeGenerator(290);
    pipeGenerator(450);
    pipeGenerator(650)

}


function pipeGenerator(x) {
    var gap = Math.floor(Math.random() * 5) + 1;

    for(var count = 0; count < gap; count++) //for-loop
    {
        game.add.sprite(x, 50 * count, "pipe");
    }

    for(var count = gap + 3; count <= 8; count++) //for-loop
    {
        game.add.sprite(x, 50 * count, "pipe");
    }

}


function clickHandler (event) {
    game.add.sprite(event.x, event.y, "playerImg");
    game.sound.play("score");
}

function spaceHandler() {
    //alert("you pressed the spacebar!");
    score = score + 1;
    game.sound.play("score");
    //alert(score);
}
function moveRight() {
    player.x+=20;
}

function moveLeft() {
    player.x-=20;
}

function moveUp() {
    player.y-=20;
}

function moveDown() {
    player.y+=20;
}

// * This function updates the scene. It is called for every new frame.

function update() {

}

