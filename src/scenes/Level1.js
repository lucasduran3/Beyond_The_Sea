import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";
import ShooterBoss from "../components/ShooterBoss";
import events from "./EventCenter";
import HorroriFi from "../components/HorroriFi";
import { getPhrase } from "../services/translation";
import CollisionManager from "../components/CollisionManager";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
    this.level = "lobby";
    this.keyDoor1 = false;
    this.keyDoor2 = false;
    this.keyDoor3 = false;
    this.keyDoor4 = false;
    this.keyBar = false;

    this.boss1Dead = false;
    this.boss2Dead = false;
    this.boss3Dead = false;

    this.weaponsGroup = {};
    this.hasWeapon = false;

    this.powers = [];

    this.playerLifes = null;
    this.playerMana = null;

    this.hasRadio = false;
    this.firebase = undefined;
  }

  init(data) {
    this.level = data.level || "lobby";
    this.keyDoor1 = data.keyDoor1 || false;
    this.keyDoor2 = data.keyDoor2 || false;
    this.keyDoor3 = data.keyDoor3 || false;
    this.keyDoor4 = data.keyDoor4 || false;
    this.keyBar = data.keyBar || false;
    this.boss1Dead = data.boss1Dead || false;

    this.weaponsGroup = data.weaponsGroup || {};
    this.powers = data.powers || [];
    this.hasRadio = data.hasRadio || false;
    this.hasWeapon = data.hasWeapon || false;

    this.playerLifes = data.playerLifes || null;
    this.playerMana = data.playerMana || null;
    this.playerBullets = data.playerBullets || 0;
    this.playerChips = data.playerChips || 0;
    this.playerKits = data.playerKits || 0;
  }

  create() {
    this.cameras.main.fadeIn(500);

    // TILEMAP
    this.map = this.make.tilemap({ key: `map-${  this.level}` });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const doorLvl1L = this.map.addTilesetImage("door", "door");
    const doorLvl2L = this.map.addTilesetImage("door", "door");
    const doorLvl3L = this.map.addTilesetImage("door", "door");
    const doorLobbyL = this.map.addTilesetImage("door", "door");
    const barDoorL = this.map.addTilesetImage("door", "door");
    const decoL = this.map.addTilesetImage("deco", "deco");

    console.log(doorLvl2L, doorLvl3L);

    // @ts-ignore
    this.doorLvl1Layer = this.map.createLayer("door-lvl1", doorLvl1L, 0, 0);
    this.floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    this.doorLvl2Layer = this.map.createLayer("door-lvl2", doorLvl1L, 0, 0);
    this.doorLvl3Layer = this.map.createLayer("door-lvl3", doorLvl1L, 0, 0);
    this.barDoorLayer = this.map.createLayer("bar-door", barDoorL, 0, 0);
    this.doorLobbyLayer = this.map.createLayer("door-lobby", doorLobbyL, 0, 0);
    this.decoLayer = this.map.createLayer("deco", decoL, 0, 0);
    this.wallLayer = this.map.createLayer("wall", wallL, 0, 0);

    const objectsLayer = this.map.getObjectLayer("objects");

    this.enemysGroup = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "enemy": {
          this.enemy = new Enemy(this, x, y, "enemy", 300, this.map, 1);
          this.enemysGroup.add(this.enemy);
          break;
        }
        case "shooter-enemy": {
          this.shooterEnemy = new ShooterBoss(this, x, y, "enemy2");
          this.shooterEnemy.create();
          this.enemysGroup.add(this.shooterEnemy);
          break;
        }
        default: console.log("");
      }
    });

    const spawnPoint = this.map.findObject(
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

    this.physics.world.enable(this.player);


    this.player.setNBullets(this.playerBullets);
    this.player.setNChips(this.playerChips || 0);
    this.player.setNKits(this.playerKits || 0);
    this.player.hasWeapon = this.hasWeapon;

    this.bulletsGroup = this.physics.add.group();

    this.keysGroup = this.physics.add.group();

    this.enemyArr.forEach((element) => {
      // @ts-ignore
      element.setTarget(this.player);
    });

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

    this.keyESC = this.input.keyboard.addKey("ESC");

    this.pluginHorror = new HorroriFi(this);
    this.pluginHorror.create();

    /* ---FIREBASE----*/
    // @ts-ignore
    if (
      this.boss1Dead ||
      this.keyDoor2 ||
      (this.boss2Dead && this.level === "lobby")
    ) {
      const user = this.firebase.getUser();

      this.firebase.saveGameData(user.uid, {
        level: this.level,
        keyDoor1: this.keyDoor1,
        keyDoor2: this.keyDoor2,
        keyDoor3: this.keyDoor3,
        keyDoor4: this.keyDoor4,
        weaponsGroup: this.weaponsGroup,
        playerLifes: this.playerLifes,
        playerMana: this.playerMana,
        playerBullets: this.player.nBullets,
        playerChips: this.player.nChips,
        playerKits: this.player.nKits,
        boss1Dead: this.boss1Dead,
        boss2Dead: this.boss2Dead,
        boss3Dead: this.boss3Dead,
        powers: this.powers,
        hasRadio: this.hasRadio,
        hasWeapon: true,
      });
    }

    /* ----TRANSPARENT BACKGROUND----*/
    this.add.image(1920 / 2, 1080 / 2, "bg").setScrollFactor(0);

    /* ------OBJECTS-----*/
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "key-door1": {
          if (!this.keyDoor1) {
            this.key_door1_sprite = this.physics.add.sprite(x, y, "key");
            this.keysGroup.add(this.key_door1_sprite);
          }
          break;
        }
        case "key-lvl3": {
          if (!this.keyDoor3) {
            this.key_door3_sprite = this.physics.add.sprite(x, y, "key3");
            this.keysGroup.add(this.key_door3_sprite);
          }
          break;
        }
        case "key-bar": {
          if (!this.keyBar) {
            this.keyBarSprite = this.physics.add.sprite(x, y, "key2");
            this.keysGroup.add(this.keyBarSprite);
          }
          break;
        }
        case "revolver": {
          if (!this.hasWeapon) {
            this.revolverSprite = this.physics.add.sprite(x, y, "revolver");
          }
          break;
        }
        case "bullet": {
          this.bulletToCollect = this.physics.add.sprite(x, y, "bullet2");
          this.bulletsGroup.add(this.bulletToCollect);
          break;
        }
        case "radio": {
          if (!this.hasRadio) {
            this.radio = this.physics.add.sprite(x, y, "radio");
          }
          break;
        }
        case "radio2": {
          this.radio2 = this.physics.add.sprite(x, y, "radio");
          break;
        }
        case "msj1": {
          this.msj1 = this.physics.add.sprite(x, y, "msj1").setScale(5);
          break;
        }
        case "msj2": {
          this.msj2 = this.physics.add.sprite(x, y, "msj1").setScale(5);
          break;
        }
        case "powerFreeze": {
          this.powerFreeze = this.physics.add.sprite(x, y, "powerFreeze");
          break;
        }
        case "drawer": {
          this.drawer = this.physics.add.sprite(x, y, "drawer");
          break;
        }
        default: console.log("");
      }
    });

    this.objectsGroup = this.physics.add.group();

    this.physics.add.overlap(
      this.player,
      this.bulletsGroup,
      this.collectBullet,
      null,
      this
    );

    this.physics.add.overlap(
      this.objectsGroup,
      this.player,
      this.collectObject,
      null,
      this
    );



    /* ----RADIO---MESSAGES----*/
    if (this.level === "mercado") {
      const text = [
        getPhrase("En donde estás?"),
        getPhrase("Ah, en el 'mercado'"),
        getPhrase("Debo advertirte..."),
        getPhrase(
          "Al fondo hay un bar que a sido ocupado por unos tipos, hace semanas..."
        ),
        getPhrase("... y no han salido desde entonces"),
        getPhrase("Seguramente ya se murieron de hambre..."),
        getPhrase("eso espero..."),
        getPhrase("Hechale un vistazo al lugar, quizas encontras la llave"),
      ];
      this.showPopup(text);
    }

    if (this.level === "hospital") {
      const text = [
        getPhrase(
          "El hospital es el ultimo lugar donde queres estar en este momento"
        ),
        getPhrase("Asi que junta la llave y sali de ahí cuanto antes."),
      ];
      this.showPopup(text);
    }

    this.physics.add.overlap(
      this.player,
      this.msj1,
      () => {
        this.msj1.destroy();
        const text = [
          getPhrase("No sabes nada sobre este lugar no?..."),
          getPhrase(
            "... Nanotecnologia, biotecnologia, implantes cerebrales..."
          ),
          getPhrase(
            "Esta era una sociedad secreta, dedicada a la investigación cientifica"
          ),
          getPhrase("Pero las cosas se descontrolaron un poco..."),
          getPhrase("Lo peor es que nadie sabe de este lugar..."),
          getPhrase(
            "Y todos los que han entrado hasta hora no han salido... que yo sepa..."
          ),
        ];
        this.showPopup(text);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.msj2,
      () => {
        this.msj2.destroy();
        const text = [
          getPhrase("Un cientifico respetado en el pasado..."),
          getPhrase(
            "Trajo consigo a un equipo de investigacion, y voluntarios..."
          ),
          getPhrase(
            "que ofrecieron su cuerpo y mente para que experimentasen con ellos"
          ),
          getPhrase(
            "Les fue prometido un techo, un hogar, y una vida respetable..."
          ),
          getPhrase(
            "La mayoria de los chips que les fueron implantados eran defectuosos,"
          ),
          getPhrase(
            "generando en ellos graves trastornos, comportamientos violentos y autodestructivos..."
          ),
        ];
        this.showPopup(text);
      },
      null,
      this
    );

    /* ----TWEENS-----*/
    this.bulletsGroup.getChildren().forEach((element) => {
      this.tweenObjects(element);
    });

    this.keysGroup.getChildren().forEach((element) => {
      this.tweenObjects(element);
    });

    this.tweenObjects(this.revolverSprite);
    this.tweenObjects(this.radio);
    if (this.powerFreeze != null) this.tweenObjects(this.powerFreeze);

    this.collisionManager = new CollisionManager(this);
    this.collisionManager.setupColliders();
    this.collisionManager.setupOverlaps();
  }

  update(time, delta) {
    this.playerLifes = this.player.lifes;
    this.playerMana = this.player.mana;

    this.player.update(time, delta);

    this.enemyArr.forEach((element) => {
      element.update();
    });

    if (this.keyESC.isDown) {
      this.scene.pause("Level1");
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
        level: this.level,
        keyDoor1: this.keyDoor1,
        keyDoor2: this.keyDoor2,
        keyDoor3: this.keyDoor3,
        keyDoor4: this.keyDoor4,
        keyBar: this.keyBar,
        weaponsGroup: this.player.weaponsGroup,
        playerLifes: 300,
        playerMana: this.player.mana,
        playerBullets: this.playerBullets,
        playerChips: null,
        playerKits: null,
        boss1Dead: this.boss1Dead,
        boss2Dead: this.boss2Dead,
        boss3Dead: this.boss3Dead,
        powers: this.powers,
        hasRadio: this.hasRadio,
        hasWeapon: this.player.hasWeapon,
      });

      events.emit("resetUI", { bullets: this.playerBullets });
    }
  }

  // @ts-ignore
  collectBullet(player, bullet) {
    const bulletSound = this.sound.add("bulletSound");
    bulletSound.play();
    bullet.destroy();
    this.player.incrementBullets();
  }

  enemyDropObjects(x, y) {
    const n = Phaser.Math.Between(1, 3);
    let newX = x;
    let newY = y;

    for (let i = 0; i < n; i+=1) {
      const randomObject = Phaser.Math.RND.pick(["kit", "chip"]);

      this.objectsGroup.create(newX, newY, randomObject);
      newX += 30;
      newY += 10;
    }

    this.objectsGroup.getChildren().forEach((element) => {
      this.tweenObjects(element);
    });
  }

  tweenObjects(target) {
    // @ts-ignore
    this.tweens.add({
      targets: target,
      scale: 1.2,
      yoyo: true,
      duration: 500,
      repeat: -1,
    });
  }

  // @ts-ignore
  collectObject(player, shape) {
    const objectName = shape.texture.key;
    if (objectName ==="kit") {
      this.player.incrementKits();
    } else if (objectName === "chip") {
      this.player.incrementChips();
    }

    shape.destroy();
  }

  showPopup(text) {
    const radioSound = this.sound.add("radioSound");
    radioSound.play();
    let c = 1;
    const popupTextStyle = {
      font: "30px pixelifySans",
      fill: "#ffffff",
      backgroundColor: "#000000",
      padding: 20,
      wordWrap: { width: 250, useAdvancedWrap: true },
    };

    // @ts-ignore
    const popupText = this.add
      // @ts-ignore
      .text(1300, 300, text[0], popupTextStyle)
      .setScrollFactor(0)
      .setDepth(5);
    const radioimg = this.add
      .image(1230, 350, "radioPopup")
      .setScrollFactor(0)
      .setDepth(5);

    popupText.setMaxLines(7);

    this.time.addEvent({
      delay: 3000,
      callback () {
        if (c < text.length) {
          popupText.setText(text[c]);
          c+=1;
        } else {
          popupText.destroy();
          radioimg.destroy();
        }
      },
      loop: true,
    });
  }
}
