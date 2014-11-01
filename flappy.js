// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var player;
var pipes;

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(700, 400, Phaser.AUTO, 'game', stateActions);


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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    pipes = game.add.group();
    game.stage.setBackgroundColor("#CDF3FF");
    score = 0
    //alert(score);

    game.add.text(20, 20, //coordinates
     "Vikings!", //text
        { font: "25px Arial", //font size and typeface
        fill: "#FF8533" } //text colour
         );
    //game.input.onDown.add(clickHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);

    //game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    //game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    //game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    //game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    game.add.audio("score");

    //pipeGenerator();
    game.time.events.loop(1 * Phaser.Timer.SECOND, pipeGenerator)

    var x = 100;
    var y = 300;
    player = game.add.sprite(x, y, "playerImg");
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.checkWorldBounds = true;
    player.body.velocity.y = -200;
    //player.body.velocity.x = 100;
    player.body.gravity.y = 600;



}

function add_pipe_part(x, y, pipe_part) {
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -400;

}

function pipeGenerator() {
    var pipe_offset = 800;
    var hole = Math.floor(Math.random() * 5) + 1;

    var count;

    for(var count = 0; count < hole; count++) //for-loop
    {
        add_pipe_part(pipe_offset, 50 * count, "pipe");
    }

    for(var count = hole + 4; count <= 8; count++) //for-loop
    {
        add_pipe_part(pipe_offset, 50 * count, "pipe");
    }

}


//function clickHandler (event) {
    //game.add.sprite(event.x, event.y, "playerImg");
    //game.sound.play("score");


//function spaceHandler() {
    //alert("you pressed the spacebar!");
    //score = score + 1;
    //game.sound.play("score");
    //alert(score);

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

function player_jump() {
    player.body.velocity.y = -300;
}

function game_over() {
    //alert("YOU SHALL DINE IN VALHALLA TONIGHT! GAME OVER ");
    location.reload();

}




// * This function updates the scene. It is called for every new frame.

function update() {
    game.physics.arcade
    .overlap(player, pipes, game_over);

}

