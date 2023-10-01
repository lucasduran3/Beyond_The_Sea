import Phaser from "phaser";
import Bullet from "./Bullet";
import events from "../scenes/EventCenter";

const ROTATION_SPEED = 5 * Math.PI;

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, enemy) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.scene = scene;
    this.target = 0;
    this.lifes = 300;
    this.enemy = enemy;
    this.bullets = this.scene.physics.add.group();
    this.speed = 300;
    this.velocityX = 0;
    this.velocityY = 0;

    this.scene.input.on("pointerdown", (pointer) => {
      this.fireBullet(pointer);
    });

    this.scene.input.on("pointermove", (pointer) => {
      // crear un vector que este en el centro de la scene
      const zeroPoint = new Phaser.Math.Vector2(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY
      );
      this.target =
        Phaser.Math.Angle.BetweenPoints(zeroPoint, pointer) + Math.PI / 2;
    });

    this.keys = scene.input.keyboard.addKeys("W,A,S,D");

    // @ts-ignore
    this.body.setCollideWorldBounds(true);
  }

  update(time, delta) {
    this.rotation = Phaser.Math.Angle.RotateTo(
      this.rotation,
      this.target,
      ROTATION_SPEED * 0.001 * delta
    );

    if (this.keys.W.isDown) {
      this.velocityY = -this.speed;
    } else if (this.keys.S.isDown) {
      this.velocityY = this.speed;
    } else {
      this.velocityY = 0;
    }

    if (this.keys.A.isDown) {
      this.velocityX = -this.speed;
    } else if (this.keys.D.isDown) {
      this.velocityX = this.speed;
    } else {
      this.velocityX = 0;
    }

    // @ts-ignore
    this.body.setVelocity(this.velocityX, this.velocityY);
    this.scene.physics.add.collider(this.enemy, this.bullets, ()=>{
      this.enemy.looseLife();
      this.bullets.clear(true, true);  
    }, null, this);
  }

  fireBullet(pointer) {
    const speed = 500;
    const zeroPoint = new Phaser.Math.Vector2(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY
    );
    const angle = Phaser.Math.Angle.BetweenPoints(zeroPoint, pointer);
    // const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);

    const bullet = new Bullet(this.scene, this.x, this.y, "bullet");
    this.bullets.add(bullet);
    bullet.fire(angle, speed);
  }

  looseLife(amount){
    this.lifes -= amount;
    events.emit("update",{
      damage : amount
    });
  }
}
