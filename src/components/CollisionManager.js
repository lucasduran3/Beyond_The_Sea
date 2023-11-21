import Phaser from "phaser";
import events from "../scenes/EventCenter";
import { getPhrase } from "../services/translation";
import { revolver } from "./weapons";

export default class CollisionManager{
  constructor(scene) {
    this.scene = scene;

    console.log(Phaser);

    this.scene.wallLayer.setCollisionByProperty({ colision: true });
    this.scene.decoLayer.setCollisionByProperty({colision: true});
    this.scene.doorLvl1Layer.setCollisionByProperty({colision: true});
    this.scene.doorLvl2Layer.setCollisionByProperty({colision: true});
    this.scene.doorLvl3Layer.setCollisionByProperty({colision: true});
    this.scene.doorLobbyLayer.setCollisionByProperty({colision: true});
    this.scene.barDoorLayer.setCollisionByProperty({colision: true});
  }
  
  setupColliders() {
    this.scene.physics.add.collider(this.scene.wallLayer, this.scene.player);
    this.scene.physics.add.collider(
      this.scene.wallLayer,
      this.scene.enemysGroup
    );
    this.scene.physics.add.collider(this.scene.decoLayer, this.scene.player);
    this.scene.physics.add.collider(
      this.scene.decoLayer,
      this.scene.enemysGroup
    );

    this.scene.physics.add.collider(
      this.scene.doorLvl1Layer,
      this.scene.player,
      () => {
        this.scene.scene.start("Level1", {
          level: "mercado",
          keyDoor1: this.scene.keyDoor1,
          keyDoor2: this.scene.keyDoor2,
          keyDoor3: this.scene.keyDoor3,
          keyDoor4: this.scene.keyDoor4,
          keyBar: this.scene.keyBar,
          weaponsGroup: this.scene.weaponsGroup,
          playerLifes: this.scene.playerLifes,
          playerMana: this.scene.playerMana,
          playerBullets: this.scene.player.nBullets,
          playerChips: this.scene.player.nChips,
          playerKits: this.scene.player.nKits,
          boss1Dead: this.scene.boss1Dead,
          boos2Dead: this.scene.boss2Dead,
          boss3Dead: this.scene.boss3Dead,
          powers: this.scene.powers,
          hasRadio: this.scene.hasRadio,
          hasWeapon: this.scene.player.hasWeapon,
        });
      },
      () => this.scene.keyDoor1 === true && this.scene.boss1Dead === false
    );

    this.scene.physics.add.collider(
      this.scene.doorLvl2Layer,
      this.scene.player,
      () => {
        this.scene.scene.start("Level1", {
          level: "hospital",
          keyDoor1: this.scene.keyDoor1,
          keyDoor2: this.scene.keyDoor2,
          keyDoor3: this.scene.keyDoor3,
          keyDoor4: this.scene.keyDoor4,
          weaponsGroup: this.scene.weaponsGroup,
          playerLifes: this.scene.playerLifes,
          playerMana: this.scene.playerMana,
          playerBullets: this.scene.player.nBullets,
          playerChips: this.scene.player.nChips,
          playerKits: this.scene.player.nKits,
          boss1Dead: this.scene.boss1Dead,
          boss2Dead: this.scene.boss2Dead,
          boss3Dead: this.scene.boss3Dead,
          powers: this.scene.powers,
          hasRadio: this.scene.hasRadio,
          hasWeapon: this.scene.player.hasWeapon,
        });
      },
      () => this.scene.keyDoor2 === true && this.scene.keyDoor3 === false
    );

    this.scene.physics.add.collider(
      this.scene.doorLvl3Layer,
      this.scene.player,
      () => {
        this.scene.scene.start("FinalLevelAnimation", {
          level: "level-final",
          keyDoor1: this.scene.keyDoor1,
          keyDoor2: this.scene.keyDoor2,
          keyDoor3: this.scene.keyDoor3,
          keyDoor4: this.scene.keyDoor4,
          weaponsGroup: this.scene.weaponsGroup,
          playerLifes: this.scene.playerLifes,
          playerMana: this.scene.playerMana,
          playerBullets: this.scene.player.nBullets,
          playerChips: this.scene.player.nChips,
          playerKits: this.scene.player.nKits,
          boss1Dead: this.scene.boss1Dead,
          boss2Dead: this.scene.boss2Dead,
          boss3Dead: this.scene.boss3Dead,
          powers: this.scene.powers,
          hasRadio: this.scene.hasRadio,
          hasWeapon: this.scene.player.hasWeapon,
        });
      },
      () => this.scene.keyDoor3 === true && this.scene.boss3Dead === false
    );

    this.scene.physics.add.collider(
      this.scene.barDoorLayer,
      this.scene.player,
      () => {
        this.scene.scene.start("BarAnimation", {
          keyDoor1: this.scene.keyDoor1,
          keyDoor2: this.scene.keyDoor2,
          keyDoor3: this.scene.keyDoor3,
          keyDoor4: this.scene.keyDoor4,
          keyBar: this.scene.keyBar,
          weaponsGroup: this.scene.player.weaponsGroup,
          playerLifes: this.scene.playerLifes,
          playerMana: this.scene.playerMana,
          playerBullets: this.scene.player.nBullets,
          playerChips: this.scene.player.nChips,
          playerKits: this.scene.player.nKits,
          boss1Dead: this.scene.boss1Dead,
          boss2Dead: this.scene.boss2Dead,
          boss3Dead: this.scene.boss3Dead,
          powers: this.scene.player.powers,
          hasRadio: this.scene.hasRadio,
          hasWeapon: this.scene.player.hasWeapon,
        });
      },
      () => this.scene.keyBar === true,
      this
    );

    this.scene.physics.add.collider(
      this.scene.doorLobbyLayer,
      this.scene.player,
      () => {
        this.scene.scene.start("Level1", {
          level: "lobby",
          keyDoor1: this.scene.keyDoor1,
          keyDoor2: this.scene.keyDoor2,
          keyDoor3: this.scene.keyDoor3,
          keyDoor4: this.scene.keyDoor4,
          keyBar: this.scene.keyBar,
          weaponsGroup: this.scene.player.weaponsGroup,
          playerLifes: this.scene.playerLifes,
          playerMana: this.scene.playerMana,
          playerBullets: this.scene.player.nBullets,
          playerChips: this.scene.player.nChips,
          playerKits: this.scene.player.nKits,
          boss1Dead: this.scene.boss1Dead,
          boss2Dead: this.scene.boss2Dead,
          boss3Dead: this.scene.boss3Dead,
          powers: this.scene.player.powers,
          hasRadio: this.scene.hasRadio,
          hasWeapon: this.scene.player.hasWeapon,
        });
      },
      () => this.scene.keyDoor3 === true,
      this
    );

    this.scene.physics.add.collider(
      this.scene.wallLayer,
      this.scene.player.bullets,
      () => {
        this.scene.player.bullets.getFirstAlive().destroy();
      },
      null,
      this.scene
    );

    this.scene.physics.add.collider(
      this.scene.doorLvl1Layer,
      this.scene.player,
      () => {
        const text = [getPhrase("Necesitas una llave para abrir esta puerta")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyDoor1 === false,
      this
    );

    this.scene.physics.add.collider(
      this.scene.doorLvl2Layer,
      this.scene.player,
      () => {
        const text = [getPhrase("Necesitas una llave para abrir esta puerta")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyDoor2 === false,
      this
    );

    this.scene.physics.add.collider(
      this.scene.doorLvl3Layer,
      this.scene.player,
      () => {
        const text = [getPhrase("Necesitas una llave para abrir esta puerta")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyDoor3 === false,
      this
    );

    this.scene.physics.add.collider(
      this.scene.barDoorLayer,
      this.scene.player,
      () => {
        const text = [getPhrase("Necesitas una llave para abrir esta puerta")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyBar === false,
      this
    );

    /* ------NO KEY MESSAGES------*/
    this.scene.physics.add.collider(
      this.scene.doorLvl1Layer,
      this.scene.player,
      () => {
        const text = [getPhrase("Necesitas una llave para abrir esta puerta")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyDoor1 === false && this.scene.hasRadio === true,
      this
    );

    this.scene.physics.add.collider(
      this.scene.doorLvl2Layer,
      this.scene.player,
      () => {
        const text = [getPhrase("Necesitas una llave para abrir esta puerta")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyDoor2 === false,
      this
    );

    this.scene.physics.add.collider(
      this.scene.doorLvl3Layer,
      this.scene.player,
      () => {
        const text = [getPhrase("Necesitas una llave para abrir esta puerta")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyDoor3 === false,
      this
    );

    this.scene.physics.add.collider(
      this.scene.barDoorLayer,
      this.scene.player,
      () => {
        const text = [getPhrase("Necesitas una llave para abrir esta puerta")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyBar === false,
      this
    );

    this.scene.physics.add.collider(
      this.scene.doorLobbyLayer,
      this.scene.player,
      () => {
        const text = [getPhrase("Sigue buscando...Necesitas una llave")];
        this.scene.showPopup(text);
      },
      () => this.scene.keyBar === false,
      this
    );
  }

  setupOverlaps() {
    this.scene.physics.add.overlap(
      this.scene.objectsGroup,
      this.scene.player,
      this.scene.collectObject,
      null,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.key_door1_sprite,
      () => {
        const keySound = this.scene.sound.add("keySound");
        keySound.play();
        this.scene.key_door1_sprite.destroy();
        this.scene.keyDoor1 = true;
        events.emit("updateKey1");
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.key_door3_sprite,
      () => {
        const keySound = this.scene.sound.add("keySound");
        keySound.play();
        this.scene.key_door3_sprite.destroy();
        this.scene.keyDoor3 = true;
        events.emit("updateKey4");
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.keyBarSprite,
      () => {
        const keySound = this.scene.sound.add("keySound");
        keySound.play();
        this.scene.keyBarSprite.destroy();
        this.scene.keyBar = true;
        events.emit("updateKeyBar");
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.revolverSprite,
      () => {
        this.scene.weaponsGroup.revolver = revolver;
        this.scene.player.addWeapon(revolver);
        this.scene.revolverSprite.destroy();
        const rechargeSound = this.scene.sound.add("rechargeSound");
        rechargeSound.play();
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.radio,
      () => {
        this.scene.radio.destroy();
        this.scene.hasRadio = true;
        const text = [
          getPhrase("Hola?...Hay alguien ahi?"),
          getPhrase(
            "No sé como llegaste a este lugar, pero necesito tu ayuda."
          ),
          getPhrase("Estoy encerrado,"),
          getPhrase(
            "Necesito que consigas una llave para acceder a la zona en donde estoy"
          ),
          getPhrase("Cuid-..."),
        ];
        this.scene.showPopup(text);
      },
      () => this.scene.hasRadio === false,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.radio2,
      () => {
        this.scene.radio2.destroy();
        const text = [
          getPhrase("No dejes que entre en tu cabeza"),
          getPhrase("El responsable de este infierno es Leon."),
          "AHG..",
        ];
        this.scene.showPopup(text);
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.powerFreeze,
      () => {
        const powerSound = this.scene.sound.add("powerSound");
        powerSound.play();
        this.scene.player.addPower("freeze");
        this.scene.powers.push("freeze");
        this.scene.powerFreeze.destroy();
      }
    );
  }
}
