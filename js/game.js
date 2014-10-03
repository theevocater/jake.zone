var game = new Phaser.Game(1024, 348, Phaser.AUTO, '', { preload: preload,
                           create: create, update: update });
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

  jake = game.add.sprite(0, 0, 'jake', 'jakeFront');

  game.physics.arcade.enable(jake);

  jake.body.bounce.y = 0.2;
  jake.body.gravity.y = 300;
  jake.body.collideWorldBounds = true;

  jake.animations.add('walkLeft', [ 'jakeLeftSide', 'jakeLeftSideStep']);
  jake.animations.add('walkRight', [ 'jakeRightSide', 'jakeRightSideStep']);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(jake, platforms);
  //  Reset the jakes velocity (movement)
  jake.body.velocity.x = 0;

  if (cursors.left.isDown) {
    //  Move to the left
    jake.body.velocity.x = -150;

    jake.animations.play('walkLeft', 15);
  }
  else if (cursors.right.isDown) {
    //  Move to the right
    jake.body.velocity.x = 150;

    jake.animations.play('walkRight', 15);
  }
  else if (cursors.down.isDown) {
    jake.animations.stop();
    jake.frameName = 'jakeBack';
  }
  else {
    //  Stand still
    jake.animations.stop();

    jake.frameName = 'jakeFront';
  }

  //  Allows jake to jump if they are touching the ground.
  if (cursors.up.isDown && jake.body.touching.down) {
    jake.body.velocity.y = -350;
  }

}
