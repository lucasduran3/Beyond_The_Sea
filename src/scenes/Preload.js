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
    this.load.image("bullet", "/assets/sprites/bullet.png");
    this.load.image("wall", "/assets/sprites/wall.png");
    this.load.image("floor", "/assets/sprites/floor.png");
    this.load.image("sofa", "/assets/sprites/sofa.png");
    this.load.image("door", "/assets/sprites/door.png");
    this.load.image("key", "/assets/sprites/key.png");
    this.load.image("revolver", "/assets/sprites/revolver.png");
    this.load.image("rifle", "/assets/sprites/rifle.png");
    this.load.image("bulletToCollect", "/assets/sprites/bulletToCollect.png");
    this.load.image("bar-table", "/assets/sprites/bar-table.png");
    this.load.image("arrow", "/assets/sprites/arrow.png");
    this.load.image("drawer", "/assets/sprites/drawer.png");
    this.load.image("drawerBg", "/assets/sprites/drawerBg.png");
    this.load.image("deco", "/assets/sprites/deco.png");
    this.load.image("email-icon", "/assets/sprites/email-icon.png");
    this.load.image("anon-icon", "/assets/sprites/anon-icon.png");
    this.load.image("git-icon", "/assets/sprites/git-icon.png");
    this.load.image("google-icon", "/assets/sprites/google-icon.png");
    this.load.image("radio", "/assets/sprites/radio.png");
    this.load.image("powerFreeze", "/assets/sprites/powerFreeze.png");
    this.load.image("mainMenuBg", "/assets/sprites/mainMenuBg.png");
    this.load.image("bg", "/assets/sprites/bg.png");

    //tilemaps
    this.load.tilemapTiledJSON("map-lobby", "/assets/tilemaps/lobby.json");
    this.load.tilemapTiledJSON("map-mercado", "/assets/tilemaps/mercado.json");
    this.load.tilemapTiledJSON("map-level1", "/assets/tilemaps/level1.json");
    this.load.tilemapTiledJSON(
      "map-mercado-bar",
      "/assets/tilemaps/mercado-bar.json"
    );

    //audio
    this.load.audio("ambient", "/assets/audio/ambiente.wav");
    this.load.audio("temaMenu", "/assets/audio/tema1.wav");

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

    //this.scene.start("SelectLang",{language : this.#language});
    //this.scene.launch("UI");
    this.add.text(400, 100, "Login", {
      fontSize: 48,
    });

    this.add
      .image(400, 300, "email-icon")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        const email = prompt("Email");
        const password = prompt("Password");
        // @ts-ignore
        this.firebase
          .signInWithEmail(email, password)
          .then(() => {
            this.scene.start("Level1");
          })
          .catch(() => {
            const crearUsuario = window.confirm(
              "Email no encontrado. \n ¿Desea crear un usuario?"
            );
            if (crearUsuario) {
              // @ts-ignore
              this.firebase
                .createUserWithEmail(email, password)
                .then(() => {
                  this.scene.start("Level1");
                })
                .catch((createUserError) => {
                  console.log(
                    "🚀 ~ file: Login.js:51 ~ .catch ~ error",
                    createUserError
                  );
                });
            }
          });
      });

    this.add
      .image(400, 500, "anon-icon")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        // @ts-ignore
        this.firebase
          .signInAnonymously()
          .then(() => {
            this.scene.start("MainMenu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    this.add
      .image(400, 700, "google-icon")
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
      .image(400, 900, "git-icon")
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
