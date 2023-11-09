import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "../services/translation";

export default class Preload extends Phaser.Scene {
  #language;
  constructor() {
    super("Preload");
  }

  preload() {
    //sprites
    this.load.spritesheet("player", "/assets/sprites/player.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet("player2", "/assets/sprites/player2.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet("enemy", "/assets/sprites/enemy.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet("enemy2", "/assets/sprites/enemy2.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet("enemy2-death", "/assets/sprites/enemy2-death.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet("enemy3", "/assets/sprites/enemy3.png", {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.image("bullet", "/assets/sprites/bullet.png");
    this.load.image("bullet2", "/assets/sprites/bullet2.png");
    this.load.image("wall", "/assets/sprites/wall.png");
    this.load.image("floor", "/assets/sprites/floor.png");
    this.load.image("sofa", "/assets/sprites/sofa.png");
    this.load.image("door", "/assets/sprites/door.png");
    this.load.image("key", "/assets/sprites/key.png");
    this.load.image("key2", "/assets/sprites/key2.png");
    this.load.image("key3", "/assets/sprites/key3.png");
    this.load.image("key4", "/assets/sprites/key4.png");
    this.load.image("revolver", "/assets/sprites/revolver.png");
    this.load.image("bulletToCollect", "/assets/sprites/bulletToCollect.png");
    this.load.image("bar-table", "/assets/sprites/bar-table.png");
    this.load.image("arrow", "/assets/sprites/arrow.png");
    this.load.image("drawer", "/assets/sprites/drawer.png");
    this.load.image("drawerBg", "/assets/sprites/drawerBg.png");
    this.load.image("deco", "/assets/sprites/deco.png");
    this.load.image("anon-icon", "/assets/sprites/anon-icon.jpeg");
    this.load.image("git-icon", "/assets/sprites/git-icon.jpeg");
    this.load.image("google-icon", "/assets/sprites/google-icon.jpeg");
    this.load.image("radio", "/assets/sprites/radio.png");
    this.load.image("powerFreeze", "/assets/sprites/powerFreeze.png");
    this.load.image("mainMenuBg", "/assets/sprites/mainMenuBg.png");
    this.load.image("bg", "/assets/sprites/bg.png");
    this.load.image("keys", "/assets/sprites/keys.png");
    this.load.image("mouse", "/assets/sprites/mouse.png");
    this.load.image("numbers", "/assets/sprites/numbers.png");
    this.load.image("keys2", "/assets/sprites/keys2.png");
    this.load.image("intro1", "/assets/sprites/intro1.png");
    this.load.image("intro2", "/assets/sprites/intro2.png");
    this.load.image("intro3", "/assets/sprites/intro3.png");
    this.load.image("kit", "/assets/sprites/kit.png");
    this.load.image("chip", "/assets/sprites/chip.png");
    this.load.image("kitUI", "/assets/sprites/kitUI.png");
    this.load.image("chipUI", "/assets/sprites/chipUI.png");
    this.load.image("revolverUI", "/assets/sprites/revolverUI.png");
    this.load.image("powerFreezeUI", "/assets/sprites/powerFreezeUI.png");
    this.load.image("pauseButton", "/assets/sprites/pauseButton.png");
    this.load.image("pauseButton", "/assets/sprites/pauseButton.png");
    this.load.image("spain", "/assets/sprites/spain.png");
    this.load.image("usa", "/assets/sprites/usa.png");
    this.load.image("german", "/assets/sprites/german.png");
    this.load.image("radioPopup", "/assets/sprites/radioPopup.png");
    this.load.image("msj1", "/assets/sprites/msj1.png");

    //tilemaps
    this.load.tilemapTiledJSON("map-lobby", "/assets/tilemaps/lobby.json");
    this.load.tilemapTiledJSON("map-mercado", "/assets/tilemaps/mercado.json");
    this.load.tilemapTiledJSON("map-level1", "/assets/tilemaps/level1.json");
    this.load.tilemapTiledJSON(
      "map-mercado-bar",
      "/assets/tilemaps/mercado-bar.json"
    );
    this.load.tilemapTiledJSON(
      "map-hospital",
      "/assets/tilemaps/hospital.json"
    );
    this.load.tilemapTiledJSON(
      "map-level-final",
      "/assets/tilemaps/level-final.json"
    );

    //audio
    this.load.audio("ambient", "/assets/audio/ambiente.wav");
    this.load.audio("temaMenu", "/assets/audio/tema1.wav");
    this.load.audio("shootSound", "/assets/audio/shootSound.wav");
    this.load.audio("freezeSound", "/assets/audio/freezeSound.wav");
    this.load.audio("rechargeSound", "/assets/audio/rechargeSound.wav");
    this.load.audio("radioSound", "/assets/audio/radioSound.wav");
    this.load.audio("keySound", "/assets/audio/keySound.wav");
    this.load.audio("powerSound", "/assets/audio/powerSound.wav");
    this.load.audio("bulletSound", "/assets/audio/bulletSound.wav");
    this.load.audio("boss1Music", "/assets/audio/boss1Music.wav");
    this.load.audio("boss2Music", "/assets/audio/boss2Music.wav");
    this.load.audio("levelMusic", "/assets/audio/temalvl.wav");

    //fonts
    //this.load.script('');

    //plugins
    this.load.plugin(
      "rexhorrifipipelineplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhorrifipipelineplugin.min.js",
      true
    );
  }

  create() {
    getTranslations(this.#language, () =>
      this.scene.start("menu", { language: this.#language })
    );

    const titleText = this.add.text(750, 140, " Login", {
      fontSize: 100,
      fontFamily: "firstFontasy",
      align: "center",
    });
    titleText.setTint(0x00ffff, 0x00ff80, 0x0000ff, 0xaa00ff);

    this.add
      .image(956, 450, "anon-icon")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        // @ts-ignore
        this.firebase
          .signInAnonymously()
          .then(() => {
            //this.scene.launch("MainMusic");
            this.scene.start("SelectLang");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    this.add
      .image(956, 650, "google-icon")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        // @ts-ignore
        this.firebase
          .signInWithGoogle()
          .then(() => {
            this.scene.start("SelectLang");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    this.add
      .image(956, 850, "git-icon")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        // @ts-ignore
        this.firebase
          .signInWithGithub()
          .then(() => {
            this.scene.start("SelectLang");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });
  }
}
