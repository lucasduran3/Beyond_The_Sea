import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";
import events from "../scenes/EventCenter";
import { revolver} from "../components/weapons";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";

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

    //TILEMAP
    this.map = this.make.tilemap({ key: "map-" + this.level });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const doorLvl1L = this.map.addTilesetImage("door", "door");
    const doorLvl2L = this.map.addTilesetImage("door", "door");
    const doorLvl3L = this.map.addTilesetImage("door", "door");
    const doorLvl4L = this.map.addTilesetImage("door", "door");
    const barDoorL = this.map.addTilesetImage("door", "door");
    const decoL = this.map.addTilesetImage("deco", "deco");

    // @ts-ignore
    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const doorLvl1Layer = this.map.createLayer("door-lvl1", doorLvl1L, 0, 0);
    const doorLvl2Layer = this.map.createLayer("door-lvl1", doorLvl1L, 0, 0);
    const doorLvl3Layer = this.map.createLayer("door-lvl1", doorLvl1L, 0, 0);
    const doorLvl4Layer = this.map.createLayer("door-lvl1", doorLvl1L, 0, 0);
    const barDoorLayer = this.map.createLayer("bar-door", barDoorL, 0, 0);
    const decoLayer = this.map.createLayer("deco", decoL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);

    const objectsLayer = this.map.getObjectLayer("objects");

    this.enemysGroup = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "enemy": {
          this.enemy = new Enemy(this, x, y, "enemy", 300, this.map);
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
    );

    this.player.setNBullets(this.playerBullets);
    this.player.setNChips(this.playerChips || 0);
    this.player.setNKits(this.playerKits || 0);
    this.player.hasWeapon = this.hasWeapon;

    this.bulletsGroup = this.physics.add.group();

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "key-door1": {
          if (!this.keyDoor1) {
            this.key_door1_sprite = this.physics.add.sprite(x, y, "key");
          }
          break;
        }
        case "key-bar": {
          if (!this.keyBar) {
            this.keyBarSprite = this.physics.add.sprite(x, y, "key");
          }
          break;
        }
        case "revolver": {
          this.revolverSprite = this.physics.add.sprite(x, y, "revolver");
          break;
        }
        case "bullet": {
          this.bulletToCollect = this.physics.add.sprite(
            x,
            y,
            "bulletToCollect"
          );
          this.bulletsGroup.add(this.bulletToCollect);
          break;
        }
        case "radio": {
          if (!this.hasRadio) {
            this.radio = this.physics.add.sprite(x, y, "radio").setScale(0.5);
          }
          break;
        }
        case "msj1": {
          this.msj1 = this.physics.add.sprite(x,y,"msj1").setVisible(false);
          break;
        }
        case "msj2": {
          this.msj2 = this.physics.add.sprite(x,y,"msj1").setVisible(false);
          break;
        }
        case "powerFreeze": {
          this.powerFreeze = this.physics.add.sprite(x, y, "powerFreeze");
          break;
        }
      }
    });

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

    //horrifi plugin
    const postFxPlugin = this.plugins.get("rexhorrifipipelineplugin");
    const effect = this.cameras.main.setPostPipeline(HorrifiPostFxPipeline);

    // @ts-ignore
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

    /*----TWEENS-----*/
    // @ts-ignore
    const revolverTween = this.tweens.add({
      targets: this.revolverSprite,
      scale: 1.2,
      yoyo: true,
      duration: 500,
      repeat: -1,
    });
    
    this.objectsGroup = this.physics.add.group();

    /*---COLLIDES - OVERLAPS---*/
    this.physics.add.overlap(
      this.objectsGroup,
      this.player,
      this.collectObject,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.key_door1_sprite,
      () => {
        this.key_door1_sprite.destroy();
        this.keyDoor1 = true;
        events.emit("updateKeys", { key1: "Key 1" });
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.keyBarSprite,
      () => {
        this.keyBarSprite.destroy();
        this.keyBar = true;
        events.emit("updateKeys", { keyBar: "Key Bar" });
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.revolverSprite,
      () => {
        this.weaponsGroup["revolver"] = revolver;
        this.player.addWeapon(revolver);
        this.revolverSprite.destroy();
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.bulletsGroup,
      this.collectBullet,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.radio,
      () => {
        this.radio.destroy();
        this.hasRadio = true;
        let text = [
          "Hola?...Hay alguien ahi?",
          "No sé como llegaste a este lugar, pero necesito tu ayuda.",
          "Estoy atrapado en una de las instalaciones de este lugar,",
          "Si algunos de esos tipos me ve... no dudaran en matarme",
          "Ya no son humanos...",
          "Necesito que consegas una llave para acceder a la zona en donde estoy",
          "Tené cuidado..."
        ];
        this.showPopup(text);
      },
      () => this.hasRadio == false,
      this
    );

    wallLayer.setCollisionByProperty({ colision: true });
    doorLvl1Layer.setCollisionByProperty({ colision: true });
    doorLvl2Layer.setCollisionByProperty({ colision: true });
    doorLvl3Layer.setCollisionByProperty({ colision: true });
    doorLvl4Layer.setCollisionByProperty({ colision: true });
    barDoorLayer.setCollisionByProperty({ colision: true });
    decoLayer.setCollisionByProperty({ colision: true });

    this.physics.add.collider(wallLayer, this.player);
    this.physics.add.collider(wallLayer, this.enemysGroup);
    this.physics.add.collider(decoLayer, this.player);
    this.physics.add.collider(decoLayer, this.enemysGroup);

    this.physics.add.collider(
      doorLvl1Layer,
      this.player,
      () => {
        this.scene.start("Level1", {
          level: "mercado",
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
          boos2Dead : this.boss2Dead,
          boss3Dead : this.boss3Dead,
          powers: this.powers,
          hasRadio: this.hasRadio,
          hasWeapon: this.player.hasWeapon,
        });
      },
      () => this.keyDoor1 == true && this.boss1Dead == false
    );

    this.physics.add.collider(
      doorLvl2Layer,
      this.player,
      () => {
        this.scene.start("Level1", {
          level: "hospital",
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
          hasWeapon: this.player.hasWeapon,
        });
      },
      () => this.keyDoor2 == true && this.boss2Dead == false
    );

    this.physics.add.collider(
      doorLvl3Layer,
      this.player,
      () => {
        this.scene.start("Level1", {
          level: "level-final",
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
          hasWeapon: this.player.hasWeapon,
        });
      },
      () => this.keyDoor3 == true && this.boss3Dead == false
    );

    this.physics.add.collider(
      doorLvl1Layer,
      this.player,
      () => {
        const text = ["Necesitas una llave para abrir esta puerta"];
        this.showPopup(text);
      },
      () => this.keyDoor1 == false,
      this
    );

    this.physics.add.collider(
      barDoorLayer,
      this.player,
      () => {
        this.scene.start("BarAnimation", {
          keyDoor1: this.keyDoor1,
          keyDoor2: this.keyDoor2,
          keyDoor3: this.keyDoor3,
          keyDoor4: this.keyDoor4,
          keyBar: this.keyBar,
          weaponsGroup: this.player.weaponsGroup,
          playerLifes: this.playerLifes,
          playerMana: this.playerMana,
          playerBullets: this.player.nBullets,
          playerChips: this.player.nChips,
          playerKits: this.player.nKits,
          boss1Dead: this.boss1Dead,
          powers: this.player.powers,
          hasRadio: this.hasRadio,
          hasWeapon : this.player.hasWeapon,
        });
      },
      () => this.keyBar == true,
      this
    );

    this.physics.add.collider(
      wallLayer,
      this.player.bullets,
      () => {
        this.player.bullets.getFirstAlive().destroy();
      },
      null,
      this
    );

    this.physics.add.overlap(this.player, this.powerFreeze, () => {
      this.player.addPower("freeze");
      this.powers.push("freeze");
      this.powerFreeze.destroy();
    });

    /*---FIREBASE----*/
    // @ts-ignore
    if (this.boss1Dead && this.level == "lobby") {
      const user = this.firebase.getUser();
      
      this.firebase.saveGameData(user.uid, {
        level : this.level,
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
        powers: this.powers,
        hasRadio: this.hasRadio,
        hasWeapon: true,
      });
    }

    /*----RADIO---MESSAGES----*/ 
    if(this.level === 'mercado'){
      let text = ["En donde estás?", "Ah, en el 'mercado'", "Debo advertirte...",
      "Al fondo hay un bar que a sido ocupado por unos tipos, hace semanas...", "... y no han salido desde entonces", 
      "Seguramente ya se murieron de hambre...",
      "eso espero...",
      "Hechale un vistazo al lugar, quizas encontras la llave"];
      this.showPopup(text);   
    }

    this.physics.add.overlap(
      this.player, 
      this.msj1, 
      ()=>{
        let text = ["No sabes nada sobre este lugar no?...", "... Nanotecnologia, biotecnologia, implantes cerebrales...", 
        "Esta era una sociedad secreta, dedicada a la investigación cientifica",
        "Pero las cosas se descontrolaron un poco...", "Lo peor es que nadie sabe de este lugar...", 
        "Y todos los que han entrado hasta hora no han salido... que yo sepa..."];
        this.showPopup(text);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.msj2,
      ()=>{
        let text =["El cerebro detrás de todo esto es Leon Goldstein", "Un cientifico respetado en el pasado...",
        "Trajo consigo un monton de cientificos, y voluntarios que ofrecieron su cuerpo y mente para que experimentasen con ellos...",
        "Les fue prometido un techo, un hogar, y una vida respetable...",
        "Pero al final eran vistos como objetos...",
        "La mayoria de los chips que les fueron implantados eran defectuosos,",
        "generando en ellos graves trastornos, comportamientos violentos y autodestructivos..."];
        this.showPopup(text);
      },
        null,
        this
      );

    this.add.image(1920/2, 1080/2, 'bg').setScrollFactor(0);
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
        playerBullets: null,
        playerChips: null,
        playerKits: null,
        boss1Dead: this.boss1Dead,
        powers: this.powers,
        hasRadio: this.hasRadio,
        hasWeapon: this.player.hasWeapon,
      });

      events.emit("resetUI");
    }
  }

  // @ts-ignore
  collectBullet(player, bullet) {
    bullet.destroy();
    this.player.incrementBullets();
  }

  enemyDropObjects(x, y) {
    const n = Phaser.Math.Between(1, 3);

    for (let i = 0; i < n; i++) {
      let randomObject = Phaser.Math.RND.pick(["revolver", "rifle"]);

      this.objectsGroup.create(x, y, randomObject);
      x += 30;
      y += 10;
    }

    this.objectsGroup.getChildren().forEach((element) => {
      this.tweenObjects(element);
    });
  }

  tweenObjects(target) {
    // @ts-ignore
    const tween = this.tweens.add({
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
    if (objectName == "revolver") {
      this.player.incrementKits();
    } else if (objectName == "rifle") {
      this.player.incrementChips();
    }

    shape.destroy();
  }

  showPopup(text) {
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
      .setScrollFactor(0);
    let radioimg = this.add.image(1230, 350, "radio").setScrollFactor(0);

    popupText.setMaxLines(7);

    this.time.addEvent({
      delay: 4000,
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
