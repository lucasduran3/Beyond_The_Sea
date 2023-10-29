import Phaser from "phaser";
import Bullet from "./Bullet";
import events from "../scenes/EventCenter";
import {revolver} from "./weapons";

const ROTATION_SPEED = 5 * Math.PI;

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, enemy, weapons, lifes, mana) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.scene = scene;
    this.target = 0;

    this.lifes = lifes || 300;
    this.mana = mana || 300;
    this.enemy = enemy;
    this.bullets = this.scene.physics.add.group();

    this.speed = 400;
    this.velocityX = 0;
    this.velocityY = 0;

    this.weaponsGroup = weapons;
    this.activatedWeapon = null;

    this.nBullets = 0;
    this.nChips = 0;
    this.nKits = 0;
    
    this.anims.create({
      key:"walk",
      frames : this.anims.generateFrameNumbers("player",{start : 0, end:10}),
      frameRate : 27,
      repeat : -1
    });

    this.anims.create({
      key:"walkWithGun",
      frames : this.anims.generateFrameNumbers("player2",{start : 0, end:7}),
      frameRate : 27,
      repeat : -1
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
        /*const zeroPoint = new Phaser.Math.Vector2(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY
      );
      this.target =
        Phaser.Math.Angle.BetweenPoints(zeroPoint, pointer) + Math.PI / 2;*/
        const worldPointer = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const playerPosition = new Phaser.Math.Vector2(this.x, this.y);
        const angleToPointer = Phaser.Math.Angle.BetweenPoints(playerPosition, worldPointer);

        this.target = angleToPointer + Math.PI/2;
    });
    events.on("updatePlayerChips", this.updateChips, this);
    events.on("updatePlayerKits", this.updateKits, this);
    this.keys = scene.input.keyboard.addKeys("W,A,S,D,H,E,F,ONE,TWO");
    this.isHKeyPressed = false;
    this.isEKeyPressed = false;
    this.isFKeyPressed = false;

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

    if (this.keys.W.isDown||this.keys.S.isDown||this.keys.A.isDown||this.keys.D.isDown){
      this.anims.play("walk", true);
    }else{
      this.anims.play("none", true);
    }

    // @ts-ignore
    this.body.setVelocity(this.velocityX, this.velocityY);

    this.shootAtEnemy();

    if(this.keys.ONE.isDown){
      this.setWeapon({weapon : "revolver"});
    } else if(this.keys.TWO.isDown){
      this.setWeapon({weapon : "rifle"});
    }

    if(this.keys.H.isDown && !this.isHKeyPressed){
      this.usePowerUp();
      this.isHKeyPressed = true;
    }

    if(this.keys.H.isUp){
      this.isHKeyPressed = false;
    }
    

    if(this.keys.F.isDown && !this.isFKeyPressed){
      this.incrementLife();
      this.isFKeyPressed = true
    }

    if(this.keys.F.isUp){
      this.isFKeyPressed = false;
    }

    if(this.keys.E.isDown && !this.isEKeyPressed){
      this.incrementMana();
      this.isEKeyPressed = true;
    }

    if(this.keys.E.isUp){
      this.isEKeyPressed = false;
    }
  }

  fireBullet(pointer){
    if(this.activatedWeapon != null && this.nBullets>0){

    const speed = this.activatedWeapon.speed;
    const worldPointer = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
    const playerPosition = new Phaser.Math.Vector2(this.x, this.y);
    const angle = Phaser.Math.Angle.BetweenPoints(playerPosition, worldPointer);

    const bullet = new Bullet(this.scene, this.x, this.y, "bullet");
    this.bullets.add(bullet);
    bullet.fire(angle, speed);

    this.nBullets--;
    this.scene.nBullets--;

    events.emit("updateBullets", {
      isIncrease : false
    });
    }
  }

  looseLife(ammount){
    this.lifes -= ammount;
    events.emit("updateHP",{
      isIncrease : false,
      ammount : ammount
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
    }
  }

  addWeapon(weapon){
    this.weaponsGroup[weapon.name] = weapon;
  }

  setWeapon(data){
    this.activatedWeapon = this.weaponsGroup[data.weapon];
  }

  incrementBullets(ammount){
    this.nBullets += ammount;
  }

  setNBullets(n){
    this.nBullets = n;
  }

  setNChips(n){
    this.nChips = n;
  }

  setNKits(n){
    this.nKits = n;
  }

  usePowerUp(){
    if(this.mana>20){
    this.enemy.forEach(element => {
      element.freeze();
    });
    this.mana-=20;
    events.emit('updateMana',{
      ammount : 20,
      isIncrease : false
    });
    }else{
      console.log("no hay suficiente mana");
    }
    console.log(this.mana);
  }

  incrementLife(){
    if(this.lifes<300){
      this.lifes += 20;

      events.emit('updateHP',{
        ammount : 20,
        isIncrease : true
      });

    this.updateKits({isIncrease : false});
    } else {
      console.log("vida llena");
    }
  }

  incrementMana(){
    if(this.mana<300){
      this.mana += 20;
      
      events.emit('updateMana',{
        ammount : 20,
        isIncrease : true
      });
      
      this.updateChips({isIncrease : false});
    } else{
      console.log("mana lleno");
    }
  }

  updateChips(data){
    if(data.isIncrease == true){
      this.nChips += data.ammount;
      events.emit("updateChipsUI", {isIncrease : true, ammount : data.ammount});
    }else if(data.isIncrease == false && this.nChips>0){
      this.nChips--;
      events.emit("updateChipsUI", {isIncrease : false});
    }
    console.log(this.nChips);
  }

  updateKits(data){
    console.log("hola");
    if(data.isIncrease == true){
      this.nKits += data.ammount;
      events.emit("updateKitsUI", {isIncrease : true, ammount : data.ammount});
    }else if(data.isIncrease == false && this.nKits>0){
      this.nKits--;
      events.emit("updateKitsUI", {isIncrease : false});
    }
  }
}
