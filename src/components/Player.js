import Phaser from "phaser";
import Bullet from "./Bullet";
import events from "../scenes/EventCenter";

const ROTATION_SPEED = 5 * Math.PI;

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, enemy, weapons, nBullets) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.scene = scene;

    this.target = 0;

    this.lifes = 300;
    this.enemy = enemy;
    this.bullets = this.scene.physics.add.group();
    this.nBullets = nBullets;

    this.speed = 400;
    this.velocityX = 0;
    this.velocityY = 0;

    this.weaponsGroup = weapons;
    this.activatedWeapon = null;
    
    this.anims.create({
      key:"walk",
      frames : this.anims.generateFrameNumbers("player",{start : 0, end:10}),
      frameRate : 27,
      repeat : -1
    });

    this.anims.create({
      key:"shoot",
      frames : [{key:"player", frame:11}]
    });

    this.anims.create({
      key:"none",
      frames : [{key:"player", frame:0}],
    });

    // @ts-ignore
    this.body.setCircle(45,45,70);
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
    //console.log(this.activatedWeapon);
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

    if (this.keys.W.isDown||this.keys.S.isDown||this.keys.A.isDown||this.keys.D.isDown){
      this.anims.play("walk", true);
    }else{
      this.anims.play("none", true);
    }

    // @ts-ignore
    this.body.setVelocity(this.velocityX, this.velocityY);

    this.shootAtEnemy();

    events.on("updateWeapon", this.setWeapon, this);
  }

  fireBullet(pointer){
    if(this.activatedWeapon != null && this.nBullets>0){
    this.anims.play("shoot", true);
    const speed = this.activatedWeapon.speed;
    const zeroPoint = new Phaser.Math.Vector2(
      this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY
    );
    const angle = Phaser.Math.Angle.BetweenPoints(zeroPoint, pointer);

    const bullet = new Bullet(this.scene, this.x, this.y, "bullet");
    this.bullets.add(bullet);
    bullet.fire(angle, speed);

    this.nBullets--;
    }
  }

  looseLife(amount){
    this.lifes -= amount;
    events.emit("update",{
      damage : amount
    });
  }

  shootAtEnemy(){
    if(this.enemy != null){
    this.enemy.forEach(element => {
      this.scene.physics.add.overlap(element, this.bullets, ()=>{
        element.looseLife();
        this.bullets.getFirstAlive().destroy();
      });
    }, null, this);
    } else{
      console.log("nothing");
    }

  }

  addWeapon(weapon){
    this.weaponsGroup[weapon.name] = weapon;
  }

  setWeapon(data){
    this.activatedWeapon = this.weaponsGroup[data.weapon];
  }

  incrementBullets(){
    this.nBullets++;
  }
}
