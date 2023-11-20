import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";
import events from "./EventCenter";
import HorroriFi from "./HorroriFi";

export default class FinalLevel extends Phaser.Scene {
  constructor() {
    super("FinalLevel");
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
    this.map = this.make.tilemap({ key: "map-level-final" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const decoL = this.map.addTilesetImage("deco", "deco");

    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    console.log(floorLayer);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    const decoLayer = this.map.createLayer("deco", decoL, 0, 0);

    const objectsLayer = this.map.getObjectLayer("objects");

    this.enemysGroup = this.physics.add.group();

    let spawnPoint = this.map.findObject(
      "objects",
      (obj) => obj.name === "boss"
    );

    this.boss = new Enemy(
      this,
      spawnPoint.x,
      spawnPoint.y,
      "enemy3",
      400,
      this.map,
      4,
      100
    ).setDepth(10);

    this.enemysGroup.add(this.boss);
    this.enemyArr = this.enemysGroup.getChildren();

    spawnPoint = this.map.findObject("objects", (obj) => obj.name === "player");

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

    this.pluginHorror = new HorroriFi(this);
    this.pluginHorror.create();

    this.keyESC = this.input.keyboard.addKey("ESC");

    /* ---TRANSPARENT BACKGROUND-----*/
    this.add.image(1920 / 2, 1080 / 2, "bg").setScrollFactor(0);

    /* --OBJECTS--*/
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "drawer": {
          this.drawer = this.physics.add.sprite(x, y, "drawer");
          break;
        }

        case "bullet": {
          this.bulletToCollect = this.physics.add.sprite(x, y, "bullet2");
          this.bulletsGroup.add(this.bulletToCollect);
          break;
        }
        default: console.log("");
      }
    });

    this.physics.add.overlap(
      this.player,
      this.bulletsGroup,
      this.collectBullet,
      null,
      this
    );

    wallLayer.setCollisionByProperty({ colision: true });
    decoLayer.setCollisionByProperty({ colision: true });
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.boss, wallLayer);
    this.physics.add.collider(this.player, decoLayer);
    this.physics.add.collider(this.boss, decoLayer);
  }

  update(time, delta) {
    this.player.update(time, delta);
    this.boss.update();

    this.winLevel();

    if (this.keyESC.isDown) {
      this.scene.pause("FinalLevel");
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
        level: "lobby",
        keyDoor1: this.keyDoor1,
        keyDoor2: this.keyDoor2,
        keyDoor3: this.keyDoor3,
        keyDoor4: this.keyDoor4,
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

      events.emit("resetUI", { bullets: this.playerBullets });
    }
  }

  winLevel() {
    if (this.boss.lifes <= 0) {
      this.boss1Dead = true;
      this.boss2Dead = true;
      this.scene.stop("Level1");
      this.scene.stop("FinalLevel");
      this.scene.start("GameWin", {
        playerX: this.player.x,
        playerY: this.player.y,
        enemyX: this.boss.x,
        enemyY: this.boss.y,
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

  collectBullet(player, bullet) {
    bullet.destroy();
    this.player.incrementBullets();
  }

/* eslint-disable class-methods-use-this */
  enemyDropObjects() {
  }
/* eslint-enable class-methods-use-this */
}
