import Phaser from "phaser";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";
import { getPhrase } from "../services/translation";

export default class FinalLevelAnimation extends Phaser.Scene {
  constructor() {
    super("FinalLevelAnimation");
  }

  init(data) {
    this.playerX = data.playerX;
    this.playerY = data.playerY;
    this.keyDoor1 = data.keyDoor1;
    this.keyDoor2 = data.keyDoor2;
    this.keyDoor3 = data.keyDoor3;
    this.keyDoor4 = data.keyDoor4;
    this.boss1Dead = data.boss1Dead;
    this.boss2Dead = data.boss2Dead;
    this.boss3Dead = data.boss3Dead;

    this.weaponsGroup = data.weaponsGroup;
    this.hasRadio = data.hasRadio;
    this.hasWeapon = data.hasWeapon;

    this.powers = data.powers;
    this.playerLifes = data.playerLifes;
    this.playerMana = data.playerMana;
    this.playerBullets = data.playerBullets;
    this.playerChips = data.playerChips;
    this.playerKits = data.playerKits;
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
      key: "walk",
      frames: this.anims.generateFrameNumbers("enemy3", {
        start: 8,
        end: 13,
      }),
      frameRate: 10,
      repeat: 1,
    });

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
      .sprite(1244, 144, "enemy3")
      .setAngle(180)
      .setDepth(10);

    this.boss.anims.play("none", true);
    this.player = this.physics.add.sprite(1212, 1782, "player").setDepth(10);

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

    this.cameras.main.pan(1244, 144, 2000);

    let text = [getPhrase("Que se siente ser un esclavo?"), "..."];
    this.showPopup(text);

    this.time.addEvent({
      delay: 2500,
      callback: () => {
        const content = [
          getPhrase("Que se siente ser un esclavo?"),
          getPhrase("Incapaz de cuestionar mis ordenes"),
          getPhrase("HM?"),
          getPhrase("Te he guiado hasta aca a proposito..."),
          getPhrase("No pretendia que me rescates..."),
          getPhrase("Yo soy Leon... Por si no lo recordas"),
          getPhrase("Y vos sos mi fiel sirviente."),
          getPhrase("Pero el chip de tu cerebro ha causado estragos en tu memoria"),
          getPhrase("Parece que todavia necesitas algunos retoques"),
        ];

        this.scene.launch("Dialog", {
          content: content,
          sceneToStop: "FinalLevelAnimation",
          sceneToStart: "FinalLevel",
          keyDoor1: this.keyDoor1,
          keyDoor2: this.keyDoor2,
          keyDoor3: this.keyDoor3,
          keyDoor4: this.keyDoor4,
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

    this.scene.setVisible(false, "UI");

    this.add.image(1920 / 2, 1080 / 2, "bg").setScrollFactor(0);
  }

  update() {}

  showPopup(text) {
    const radioSound = this.sound.add("radioSound");
    radioSound.play();
    let c = 1;
    let popupTextStyle = {
      font: "30px pixelifySans",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: 20,
      wordWrap: { width: 250, useAdvancedWrap: true },
    };

    // @ts-ignore
    let popupText = this.add
      // @ts-ignore
      .text(1300, 300, text[0], popupTextStyle)
      .setScrollFactor(0)
      .setDepth(5);
    let radioimg = this.add
      .image(1230, 350, "radioPopup")
      .setScrollFactor(0)
      .setDepth(5);

    popupText.setMaxLines(7);

    this.time.addEvent({
      delay: 3000,
      callback: function () {
        if (c < text.length) {
          popupText.setText(text[c]);
          c++;
        } else {
          popupText.destroy();
          radioimg.destroy();
        }
      },
      loop: true,
    });
  }
}
