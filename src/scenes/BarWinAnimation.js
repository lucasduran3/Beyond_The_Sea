import Phaser from "phaser";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";
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
      frames: this.anims.generateFrameNumbers("enemy2-death",{start:0, end: 7}),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "death",
      frames: this.anims.generateFrameNumbers("enemy2-death",{start:9, end: 18}),
      frameRate: 6,
      repeat: 0,
    });

    this.cameras.main.fadeIn(500);
    this.map = this.make.tilemap({ key: "map-mercado-bar" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const barTableL = this.map.addTilesetImage("bar-table", "bar-table");

    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    const barTableLayer = this.map.createLayer("bar-table", barTableL, 0, 0);

    this.boss = this.physics.add.sprite(270, 662, "enemy").setAngle(90);

    this.boss.anims.play("moveHead", true);

    this.player = this.physics.add
      .sprite(this.playerX, this.playerY, "player")
      .setAngle(-90);

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

    this.cameras.main.pan(270, 662, 2000);



    this.scene.setVisible(false, "UI");

    this.add.image(1920/2, 1080/2, 'bg').setScrollFactor(0);

    if(this.startAnimation){
      this.boss.anims.play('death', true);
      this.time.addEvent({
        delay: 5500,
        callback: ()=>{
          this.scene.start("Level1",{
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
        }
      });
    } else {
      this.time.addEvent({
        delay: 2500,
        callback: () => {
          const content = [
            "...\n",
            getPhrase("... NO! ... no puedo."),
            getPhrase(
              "No voy a dejar que una rata de laboratorio decida mi destino"
            ),
            getPhrase("Espero que estes a gusto siguiendo sus ordenes..."),
            getPhrase("...Por dentro estas mas vacío que el")
          ];
  
          this.scene.launch("Dialog", {
            startOrResume: "start",
            playerX: this.playerX,
            playerY: this.playerY,
            content: content,
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
            hasWeapon : this.hasWeapon,
          });
        },
        callbackScope: this,
        repeat: 0,
      });
    }
  }

  update() {}
}
