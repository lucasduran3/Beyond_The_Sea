import Phaser from "phaser";
import HorroriFi from "./HorroriFi";
import { getPhrase } from "../services/translation";

export default class GameWin extends Phaser.Scene {
  constructor() {
    super("GameWin");
  }

  init(data) {
    this.playerX = data.playerX;
    this.playerY = data.playerY;

    this.enemyX = data.enemyX;
    this.enemyY = data.enemyY;
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
  }

  create() {
    this.cameras.main.fadeIn(500);
    this.map = this.make.tilemap({ key: "map-level-final" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const decoL = this.map.addTilesetImage("deco", "deco");

    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    const decoLayer = this.map.createLayer("deco", decoL, 0, 0);

    console.log(floorLayer, wallLayer, decoLayer);

    this.anims.create({
      key: "none",
      frames: [{ key: "enemy3", frame: 7 }],
    });

    this.anims.create({
      key: "hit",
      frames: this.anims.generateFrameNumbers("enemy3", { start: 0, end: 6 }),
      frameRate: 20,
      repeat: 1,
    });

    this.boss = this.physics.add
      .sprite(this.enemyX, this.enemyY, "enemy3")
      .setAngle(180)
      .setDepth(10);

    this.boss.anims.play("none", true);
    this.player = this.physics.add.sprite(1212, 1782, "player").setDepth(10);

    this.player = this.physics.add
      .sprite(this.playerX, this.playerY, "player")
      .setAngle(-90)
      .setDepth(10);

    this.pluginHorror = new HorroriFi(this);
    this.pluginHorror.create();

    this.cameras.main.centerOn(this.player.x, this.player.y);

    this.cameras.main.pan(this.enemyX, this.enemyY, 2000);

    this.time.addEvent({
      delay: 2500,
      callback: () => {
        const content = [
          "...\n",
          getPhrase("NO!."),
          getPhrase("Construi todo esto con mis propias manos"),
          getPhrase("Todo echado a perder por un fallo..."),
          getPhrase("Nunca serás realmente libre..."),
        ];

        this.scene.launch("Dialog", {
          content,
          isFinal: true,
          sceneToStart: "FinalWin",
          sceneToStop: "GameWin",
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
          boss3Dead: true,
          powers: this.powers,
          hasRadio: this.hasRadio,
          hasWeapon: this.hasWeapon,
        });
      },
      callbackScope: this,
      repeat: 0,
    });

    this.scene.setVisible(false, "UI");

    this.add.image(1920 / 2, 1080 / 2, "bg").setScrollFactor(0);
  }

}
