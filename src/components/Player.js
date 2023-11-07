import Phaser from "phaser";
import Bullet from "./Bullet";
import events from "../scenes/EventCenter";
import { revolver } from "./weapons";

const ROTATION_SPEED = 5 * Math.PI;

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, enemy, weapons, powers, lifes, mana) {
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

    this.hasWeapon = false;

    this.powers = powers;

    this.nBullets = 0;
    this.nChips = 0;
    this.nKits = 0;

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 10 }),
      frameRate: 27,
      repeat: -1,
    });

    this.anims.create({
      key: "walkWithGun",
      frames: this.anims.generateFrameNumbers("player2", { start: 0, end: 7 }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "noneWithGun",
      frames: [{ key: "player2", frame: 0 }],
      frameRate: 27,
      repeat: -1,
    });

    this.anims.create({
      key: "none",
      frames: [{ key: "player", frame: 0 }],
    });

    // @ts-ignore
    this.body.setCircle(45, 45, 70);

    this.scene.input.on("pointerdown", (pointer) => {
      this.fireBullet(pointer);
    });

    this.scene.input.on("pointermove", (pointer) => {
      const worldPointer = this.scene.cameras.main.getWorldPoint(
        pointer.x,
        pointer.y
      );
      const playerPosition = new Phaser.Math.Vector2(this.x, this.y);
      const angleToPointer = Phaser.Math.Angle.BetweenPoints(
        playerPosition,
        worldPointer
      );

      this.target = angleToPointer + Math.PI / 2;
    });

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

    if (
      this.keys.W.isDown ||
      this.keys.S.isDown ||
      this.keys.A.isDown ||
      this.keys.D.isDown
    ) {
      if (this.hasWeapon) {
        this.anims.play("walkWithGun", true);
      } else {
        this.anims.play("walk", true);
      }
    } else {
      if (this.hasWeapon) {
        this.anims.play("noneWithGun", true);
      } else {
        this.anims.play("none", true);
      }
    }

    // @ts-ignore
    this.body.setVelocity(this.velocityX, this.velocityY);

    this.shootAtEnemy();

    if (this.keys.ONE.isDown) {
      this.setWeapon({ weapon: "revolver" });
    } 

    if (this.keys.TWO.isDown && !this.isTWOKeyPressed) {
      this.usePowerUp("freeze");
      this.isTWOKeyPressed = true;
    }

    if (this.keys.TWO.isUp) {
      this.isTWOKeyPressed = false;
    }

    if (this.keys.F.isDown && !this.isFKeyPressed) {
      this.incrementLife();
      this.isFKeyPressed = true;
    }

    if (this.keys.F.isUp) {
      this.isFKeyPressed = false;
    }

    if (this.keys.E.isDown && !this.isEKeyPressed) {
      this.incrementMana();
      this.isEKeyPressed = true;
    }

    if (this.keys.E.isUp) {
      this.isEKeyPressed = false;
    }
  }

  fireBullet(pointer) {
    if (this.activatedWeapon != null && this.nBullets > 0) {
      const speed = this.activatedWeapon.speed;
      const worldPointer = this.scene.cameras.main.getWorldPoint(
        pointer.x,
        pointer.y
      );
      const playerPosition = new Phaser.Math.Vector2(this.x, this.y);
      const angle = Phaser.Math.Angle.BetweenPoints(
        playerPosition,
        worldPointer
      );

      const bullet = new Bullet(this.scene, this.x-10, this.y+10, "bullet");
      this.bullets.add(bullet);
      bullet.fire(angle, speed);

      this.nBullets--;
      this.scene.nBullets--;

      events.emit("updateBullets", {
        isIncrease: false,
      });
    }
  }

  looseLife(ammount) {
    this.lifes -= ammount;
    events.emit("updateHP", {
      isIncrease: false,
      ammount: ammount,
    });
  }

  shootAtEnemy() {
    if (this.enemy != null) {
      console.log("pierde");
      this.enemy.forEach(
        (element) => {
          this.scene.physics.add.overlap(element, this.bullets, () => {
            element.looseLife();
            this.bullets.getFirstAlive().destroy();
          });
        },
        null,
        this
      );
    }
  }

  addWeapon(weapon) {
    this.weaponsGroup[weapon.name] = weapon;
    this.hasWeapon = true;
    events.emit("updateWeapon");
  }

  setWeapon(data) {
    this.activatedWeapon = this.weaponsGroup[data.weapon];
  }

  addPower(powerName) {
    this.powers.push(powerName);
    events.emit("updatePower");
  }

  incrementBullets() {
    const ammount = Phaser.Math.Between(25, 40);
    this.nBullets += ammount;

    events.emit("updateBullets", {
      isIncrease: true,
      ammount: ammount,
    });
  }

  setNBullets(n) {
    this.nBullets = n;
  }

  setNChips(n) {
    this.nChips = n;
  }

  setNKits(n) {
    this.nKits = n;
  }

  usePowerUp(powerName) {
    if (this.mana > 20 && this.powers.find((element) => element == "freeze")) {
      this.enemy.forEach((element) => {

        const playerPosition = new Phaser.Math.Vector2(this.x, this.y);
        const enemyPosition = new Phaser.Math.Vector2(element.x, element.y);
        const angle = Phaser.Math.Angle.BetweenPoints(
          playerPosition,
          enemyPosition
        );

        //En vez de crear una bala se debe crear otro sprite.
        if(Phaser.Math.Distance.Between(this.x, this.y, element.x, element.y) <= 600){
          element.freeze();
        }

      });
    
      this.mana -= 20;
      events.emit("updateMana", {
        ammount: 20,
        isIncrease: false,
      });
    } else {
      console.log("mana no encontraodo o power vacio");
    }
  }

  incrementLife() {
    if (this.lifes < 300 && this.nKits > 0) {
      this.lifes += 20;

      events.emit("updateHP", {
        ammount: 20,
        isIncrease: true,
      });

      this.nKits--;

      events.emit("updateKitsUI", {
        isIncrease: false,
      });
    } else {
    }
  }

  incrementMana() {
    if (this.mana < 300 && this.nChips > 0) {
      this.mana += 20;
      this.nChips--;

      events.emit("updateMana", {
        ammount: 20,
        isIncrease: true,
      });

      events.emit("updateChipsUI", {
        isIncrease: false,
      });
    } else {
    }
  }

  incrementChips() {
    this.nChips++;
    events.emit("updateChipsUI", {
      isIncrease: true,
      ammount: 1,
    });
  }

  incrementKits() {
    this.nKits++;
    events.emit("updateKitsUI", {
      isIncrease: true,
      ammount: 1,
    });
  }

  decreaseChips() {
    this.nKits--;
    events.emit("updateKitsUI", {
      isIncrease: false,
    });
  }

  decreaseKits() {
    this.nChips--;
    events.emit("updateChipsUI", {
      isIncrease: false,
    });
  }

  validateHasWeapon(value){
    this.hasWeapon = value;
  }
}
