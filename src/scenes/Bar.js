import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";
import events from "../scenes/EventCenter";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";
import ShooterBoss from "../components/ShooterBoss";

export default class Bar extends Phaser.Scene {
  constructor() {
    super("Bar");
  }

  init(data) {
    this.weaponsGroup = data.weaponsGroup || {};
    this.keyDoor1 = data.keyDoor1;
    this.keyDoor2 = data.keyDoor2;
    this.keyDoor3 = data.keyDoor3;
    this.keyDoor4 = data.keyDoor4;
    this.keyBar = data.keyBar;
    this.weaponsGroup = data.weaponsGroup;
    this.powers = data.powers;

    this.boss1Dead = data.boss1Dead;
    this.boss2Dead = data.boss2Dead;
    this.boss3Dead = data.boss3Dead;
    this.hasRadio = data.hasRadio;
    this.hasWeapon = data.hasWeapon;

    this.playerLifes = data.playerLifes || null;
    this.playerMana = data.playerMana || null;
    this.playerBullets = data.playerBullets || 0;
    this.playerChips = data.playerChips || 0;
    this.playerKits = data.playerKits || 0;
  }

  create() {
    this.scene.setVisible(true, "UI");
    this.cameras.main.fadeIn(200);
    this.map = this.make.tilemap({ key: "map-mercado-bar" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const barTableL = this.map.addTilesetImage("bar-table", "bar-table");
    const decoL = this.map.addTilesetImage("deco", "deco");

    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    const barTableLayer = this.map.createLayer("bar-table", barTableL, 0, 0);
    const decoLayer = this.map.createLayer("deco", decoL, 0, 0);

    const objectsLayer = this.map.getObjectLayer("objects");

    this.enemysGroup = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "enemy": {
          this.enemy = new Enemy(this, x, y, "enemy", 300, this.map, 2);
          console.log(this.enemy);
          this.enemysGroup.add(this.enemy);
          break;
        }
      }
    });

    let spawnPoint = this.map.findObject(
      "objects",
      (obj) => obj.name === "player"
    );

    this.enemyArr = this.enemysGroup.getChildren();

    this.player = new Player(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "player",
      this.enemyArr,
      this.weaponsGroup,
      this.powers,
      this.playerLifes,
      this.playerMana
    ).setDepth(10);

    this.player.setNBullets(this.playerBullets);
    this.player.setNChips(this.playerChips);
    this.player.setNKits(this.playerKits);
    this.player.hasWeapon = this.hasWeapon;

    spawnPoint = this.map.findObject("objects", (obj) => obj.name === "boss");

    this.boss = new ShooterBoss(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "enemy2",
    ).setDepth(10);
    this.enemysGroup.add(this.boss);

    this.boss.create();
    this.boss.setTarget(this.player);

    this.bulletsGroup = this.physics.add.group();

    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

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

    barTableLayer.setCollisionByProperty({ colision: true });
    decoLayer.setCollisionByProperty({ colision: true });

    this.physics.add.collider(this.player, barTableLayer);
    this.physics.add.collider(this.player, decoLayer);

    this.time.addEvent({
      delay: 2000,
      callback: this.spawnEnemy,
      callbackScope: this,
      repeat: 7,
    });

    wallLayer.setCollisionByProperty({ colision: true });
    this.physics.add.collider(wallLayer, this.player);

    this.keyESC = this.input.keyboard.addKey("ESC");

    /*---TRANSPARENT BACKGROUND-----*/
    this.add.image(1920 / 2, 1080 / 2, "bg").setScrollFactor(0);
  }

  update(time, delta) {
    this.player.update(time, delta);
    this.boss.update();

    this.enemyArr.forEach((element) => {
      element.update();
    });

    this.winLevel();

    if (this.keyESC.isDown) {
      this.scene.pause("Bar");
      this.scene.launch("Pause", {
        preScene: this.scene.key,
      });
    }

    this.scene.setVisible(true, "UI");

    this.isOver();
  }

  isOver() {
    if (this.player.lifes <= 0) {
      this.scene.start("Level1", {
        level: "mercado",
        keyDoor1: this.keyDoor1,
        keyDoor2: this.keyDoor2,
        keyDoor3: this.keyDoor3,
        keyDoor4: this.keyDoor4,
        keyBar : true,
        weaponsGroup: this.player.weaponsGroup,
        playerLifes: 300,
        playerMana: this.player.mana,
        playerBullets: this.playerBullets,
        playerChips: null,
        playerKits: null,
        boss1Dead: this.boss1Dead,
        boss2Dead: this.boss2Dead,
        boss3Dead: this.boss3Dead,
        hasRadio: this.hasRadio,
        powers: this.powers,
        hasWeapon: this.hasWeapon,
      });

      events.emit("resetUI",{bullets: this.playerBullets});
    }
  }

  winLevel() {
    if (this.boss.lifes <= 0) {
      events.emit("updateKey3");
      this.boss1Dead = true;
      this.scene.stop("Bar");
      this.scene.start("BarWinAnimation", {
        playerX: this.player.x,
        playerY: this.player.y,
        level: "lobby",
        keyDoor1: this.keyDoor1,
        keyDoor2: true,
        keyDoor3: this.keyDoor3,
        keyDoor4: this.keyDoor4,
        keyBar: this.keyBar,
        weaponsGroup: this.weaponsGroup,
        playerLifes: this.playerLifes,
        playerMana: this.playerMana,
        playerBullets: this.player.nBullets,
        playerChips: this.player.nChips,
        playerKits: this.player.nKits,
        boss1Dead: true,
        boss2Dead: this.boss2Dead,
        boss3Dead: this.boss3Dead,
        powers: this.powers,
        hasRadio: this.hasRadio,
        hasWeapon: this.hasWeapon,
      });
    }
  }

  spawnEnemy() {
    this.enemy = new Enemy(this, 600, 100, "enemy", 300, this.map,1,5);
    this.enemy.setTarget(this.player);
    this.enemysGroup.add(this.enemy);

    this.enemy = new Enemy(this, 600, 1080, "enemy", 300, this.map,1,5);
    this.enemy.setTarget(this.player);
    this.enemysGroup.add(this.enemy);
  }

  enemyDropObjects() {}
}
