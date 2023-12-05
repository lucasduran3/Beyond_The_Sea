import Phaser from "phaser";
import Bullet from "./Bullet";

export default class ShooterBoss extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.world.enable(this);

    // @ts-ignore
    this.body.setCollideWorldBounds(true);

    this.target = null;

    this.bullets = this.scene.physics.add.group();

    this.lifes = 15;

    this.isDead = false;
  }

  create() {
    this.scene.time.addEvent({
      delay: 2000,
      callback: this.shootBullet,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.rotation =
      Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y) +
      Math.PI / 2;

    this.shootAtPlayer();
    this.enemyDeath();
  }

  shootBullet() {
    // @ts-ignore
    if (
      Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.target.x,
        this.target.y
      ) < 2000
    && this.active) {
      const bullet = new Bullet(this.scene, this.x, this.y, "bullet");
      this.bullets.add(bullet);

      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.target.x,
        this.target.y
      );
      bullet.fire(angle, 500);
    }
  }

  looseLife() {
    this.lifes-=1;
    this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.clearTint();
      },
      callbackScope: this,
    });
    this.setTint(0xff0000);
  }

  shootAtPlayer() {
    this.scene.physics.add.overlap(
      this.target,
      this.bullets,
      () => {
        this.target.looseLife(20);
        this.bullets.getFirstAlive().destroy();
      },
      null,
      this
    );
  }

  freeze() {
    // @ts-ignore
    this.body.stop();
    // @ts-ignore
    this.body.setVelocity(0);
    this.isMoving = false;

    this.scene.time.addEvent({
      delay: 2500,
      callback: () => {
        this.isMoving = true;
      },
      callbackScope: this,
    });
  }

  setTarget(target) {
    this.target = target;
  }

  enemyDeath() {
    if (this.lifes <= 0 && this.isDead === false) {
      // @ts-ignore
      this.body.destroy();
      this.setVisible(false);
      this.active = false;
      this.isDead = true;
    }
  }
}
