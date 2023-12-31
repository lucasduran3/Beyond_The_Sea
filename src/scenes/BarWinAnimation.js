import Phaser from "phaser";
import HorroriFi from "../components/HorroriFi";
import { getPhrase } from "../services/translation";

export default class BarWinAnimation extends Phaser.Scene {
  constructor() {
    super("BarWinAnimation");
  }

  init(data) {
    this.playerX = data.playerX;
    this.playerY = data.playerY;
    this.level = data.level;

    this.keyDoor1 = data.keyDoor1;
    this.keyDoor2 = data.keyDoor2;
    this.keyDoor3 = data.keyDoor3;
    this.keyDoor4 = data.keyDoor4;
    this.keyBar = data.keyBar;
    this.weaponsGroup = data.weaponsGroup;

    this.powers = data.powers;
    this.hasRadio = data.hasRadio;
    this.hasWeapon = data.hasWeapon;

    this.boss1Dead = data.boss1Dead;
    this.boss2Dead = data.boss2Dead;
    this.boss3Dead = data.boss3Dead;

    this.playerLifes = data.playerLifes || null;
    this.playerMana = data.playerMana || null;
    this.playerBullets = data.playerBullets || 0;
    this.playerChips = data.playerChips || 0;
    this.playerKits = data.playerKits || 0;

    this.startAnimation = data.startAnimation || false;
  }

  create() {
    this.anims.create({
      key: "moveHead",
      frames: this.anims.generateFrameNumbers("enemy2-death", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "death",
      frames: this.anims.generateFrameNumbers("enemy2-death", {
        start: 9,
        end: 18,
      }),
      frameRate: 6,
      repeat: 0,
    });

    const shootSound = this.sound.add("shootSound");
    shootSound.play();

    this.cameras.main.fadeIn(500);
    this.map = this.make.tilemap({ key: "map-mercado-bar" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const barTableL = this.map.addTilesetImage("bar-table", "bar-table");
    const decoL = this.map.addTilesetImage("deco", "deco");

    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    const barTableLayer = this.map.createLayer("bar-table", barTableL, 0, 0);
    const decoLayer = this.map.createLayer("deco", decoL, 0, 0);

    console.log(floorLayer, wallLayer, barTableLayer, decoLayer);

    this.boss = this.physics.add
      .sprite(270, 662, "enemy")
      .setAngle(90)
      .setDepth(10);

    this.boss.anims.play("moveHead", true);

    this.player = this.physics.add
      .sprite(this.playerX, this.playerY, "player")
      .setAngle(-90)
      .setDepth(10);

    this.pluginHorror = new HorroriFi(this);
    this.pluginHorror.create();

    this.cameras.main.centerOn(this.player.x, this.player.y);

    this.cameras.main.pan(270, 662, 2000);

    this.scene.setVisible(false, "UI");

    this.add.image(1920 / 2, 1080 / 2, "bg").setScrollFactor(0);

    if (this.startAnimation) {
      this.boss.anims.play("death", true);
      this.time.addEvent({
        delay: 5500,
        callback: () => {
          this.scene.start("Level1", {
            level: this.level,
            keyDoor1: this.keyDoor1,
            keyDoor2: this.keyDoor2,
            keyDoor3: this.keyDoor3,
            keyDoor4: this.keyDoor4,
            keyBar: this.keyBar,
            weaponsGroup: this.weaponsGroup,
            playerLifes: this.playerLifes,
            playerMana: this.playerMana,
            playerBullets: this.playerBullets,
            playerKits: this.playerKits,
            playerChips: this.playerChips,
            boss1Dead: this.boss1Dead,
            boss2Dead: this.boss2Dead,
            boss3Dead: this.boss3Dead,
            powers: this.powers,
            hasRadio: this.hasRadio,
            hasWeapon: this.hasWeapon,
          });
        },
      });
    } else {
      this.time.addEvent({
        delay: 2500,
        callback: () => {
          const content = [
            getPhrase("... NO! ... no puedo."),
            getPhrase(
              "No voy a dejar que una rata de laboratorio decida mi destino"
            ),
            getPhrase("Espero que estes a gusto siguiendo sus ordenes..."),
            getPhrase("...Por dentro estas mas vacío que el"),
          ];

          this.scene.launch("Dialog", {
            startOrResume: "start",
            playerX: this.playerX,
            playerY: this.playerY,
            content,
            sceneToStart: "Level1",
            sceneToStop: "BarWinAnimation",
            level: this.level,
            keyDoor1: this.keyDoor1,
            keyDoor2: this.keyDoor2,
            keyDoor3: this.keyDoor3,
            keyDoor4: this.keyDoor4,
            keyBar: this.keyBar,
            weaponsGroup: this.weaponsGroup,
            playerLifes: this.playerLifes,
            playerMana: this.playerMana,
            playerBullets: this.playerBullets,
            playerChips: this.playerChips,
            playerKits: this.playerKits,
            boss1Dead: this.boss1Dead,
            boss2Dead: this.boss2Dead,
            boss3Dead: this.boss3Dead,
            powers: this.powers,
            hasRadio: this.hasRadio,
            hasWeapon: this.hasWeapon,
          });
        },
        callbackScope: this,
        repeat: 0,
      });
    }
  }
  
}
