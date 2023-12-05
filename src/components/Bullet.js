import Phaser from "phaser";

export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.velocityX = 0;
    this.velocityY = 0;
  }

  fire(angle, speed) {
    this.velocityX = Math.cos(angle) * speed;
    this.velocityY = Math.sin(angle) * speed;
    // @ts-ignore
    this.body.setVelocity(this.velocityX, this.velocityY);

    this.setRotation(angle - Math.PI / 2);
  }
}
