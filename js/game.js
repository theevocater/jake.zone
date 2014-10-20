var game = new Phaser.Game(1024, 348, Phaser.AUTO, 'gameDiv', { preload: preload,
                           create: create, update: update, render: render });
function preload() {
  game.load.atlasJSONHash('jake', 'sprites/SpriteSheetWithStep.png', 'sprites/SpriteSheetWithStep.json');
  game.load.atlasJSONHash('tiles', 'sprites/TileSheet.png', 'sprites/TileSheet.json');
}

var jake;
var platforms;
var cursors;

function create() {
  // This sprite is using a texture atlas for all of its animation data
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  // Here we create the ground.
  var ground = game.add.tileSprite(0, game.world.height - 64, game.world.width, 64, 'tiles');
  console.log(ground);
  game.physics.arcade.enable(ground);
  ground.body.immovable = true;
  platforms.add(ground);

  jake = game.add.sprite(0, game.world.height - 64 - ground.height, 'jake', 'jakeFront');

  game.physics.arcade.enable(jake);

  jake.body.bounce.y = 0.2;
  jake.body.gravity.y = 300;
  jake.body.collideWorldBounds = true;

  jake.animations.add('walkLeft', [ 'jakeLeftSide', 'jakeLeftSideStep']);
  jake.animations.add('walkRight', [ 'jakeRightSide', 'jakeRightSideStep']);

  //cursors = game.input.keyboard.createCursorKeys();
  doWalk();
}

function update() {
  game.physics.arcade.collide(jake, platforms);
  ////  Reset the jakes velocity (movement)
  //jake.body.velocity.x = 0;
  ////console.log(jake.body.x + " " + jake.body.y);

  //if (cursors.left.isDown) {
    ////  Move to the left
    //jake.body.velocity.x = -150;

    //jake.animations.play('walkLeft', 15);
  //}
  //else if (cursors.right.isDown) {
    ////  Move to the right
    //jake.body.velocity.x = 150;

    //jake.animations.play('walkRight', 15);
  //}
  //else if (cursors.down.isDown) {
    //jake.animations.stop();
    //jake.frameName = 'jakeBack';
  //}
  //else {
    ////  Stand still
    //jake.animations.stop();

    //jake.frameName = 'jakeFront';
  //}

  ////  Allows jake to jump if they are touching the ground.
  //if (cursors.up.isDown && jake.body.touching.down) {
    //jake.body.velocity.y = -350;
  //}

}

function render() {
  //game.debug.spriteBounds(jake);

}

function doWalk() {

  // sometimes just stand there
  if (Math.random() < .2) {
    jake.animations.stop();
    jake.facing = -1;
    jake.frameName = 'jakeFront';
    game.time.events.add(Phaser.Timer.SECOND * Math.random() * 4, doWalk, this);
    return;
  }

  var walk = game.add.tween(jake)

  var newX = Math.random() * 5 * jake.width + 32;
  var time = newX / 64 * 500;
  var possible = 0;

  if (Math.random() > .5)
    possible = jake.x - newX;
  else
    possible = jake.x + newX;

  if (possible < 0)
    possible = jake.x + newX;
  else if (possible > game.world.width - jake.width*2)
    possible = jake.x - newX;

    newX = possible

  if (jake.x - newX> 0) {
    jake.animations.play('walkLeft', 4, true);
    jake.facing = 0;
  }
  else {
    jake.animations.play('walkRight', 4, true);
    jake.facing = 1;
  }

  walk.to({ x: newX}, time, Phaser.Easing.Linear.None);
  //walk.onComplete.addOnce(stopAnimation, this);
  walk.onComplete.addOnce(doWalk, this);
  walk.start();
}

//function stopAnimation() {
    //jake.animations.stop();
//}
