var game = new Phaser.Game(256, 256, Phaser.AUTO, '', { preload: preload, create: create });
function preload() {
  game.load.atlasJSONHash('jake', 'sprites/SpriteSheetWithStep.png', 'sprites/SpriteSheetWithStep.json');
}
function create() {
  // This sprite is using a texture atlas for all of its animation data
  game.add.sprite(0, 0, 'jake', 'jakeFront');
  var jakeWalkLeft = game.add.sprite(0, 64, 'jake');
  jakeWalkLeft.animations.add('walkLeft', [ 'jakeLeftSide', 'jakeLeftSideStep']);
  jakeWalkLeft.animations.play('walkLeft', 4, true);
  game.add.sprite(0, 128, 'jake', 'jakeBack');
  var jakeWalkRight = game.add.sprite(0, 192, 'jake');
  jakeWalkRight.animations.add('walkRight', [ 'jakeRightSide', 'jakeRightSideStep']);
  jakeWalkRight.animations.play('walkRight', 4, true);
}
