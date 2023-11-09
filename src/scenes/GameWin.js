import Phaser1 from "phaser";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";
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

    const postFxPlugin = this.plugins.get("rexhorrifipipelineplugin");
    const effect = this.cameras.main.setPostPipeline(HorrifiPostFxPipeline);

    // @ts-ignore
    const postFxPipeline = postFxPlugin.add(effect, {
      enable: true,

      // Bloom
      bloomRadius: 10,
      bloomIntensity: 0,
      bloomThreshold: 1,
      bloomTexelWidth: 0.5,

      // Chromatic abberation
      chromaticEnable: true,
      chabIntensity: 0.2,

      // Vignette
      vignetteStrength: 1,
      vignetteIntensity: 0.82,

      // Noise
      noiseEnable: true,
      noiseStrength: 0.1,
      seed: 0.63,

      // VHS
      vhsEnable: true,
      vhsStrength: 0.22,

      // Scanlines
      scanlinesEnable: false,
      scanStrength: 0.1,

      //CRT
      crtWidth: 5,
      crtHeight: 5,
    });
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
          content: content,
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

  update() {}
}
