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


    //tilemaps
    this.load.tilemapTiledJSON("map-lobby", "/assets/tilemaps/lobby.json");
    this.load.tilemapTiledJSON("map-mercado", "/assets/tilemaps/mercado.json");
    this.load.tilemapTiledJSON("map-level1", "/assets/tilemaps/level1.json");
    this.load.tilemapTiledJSON("map-mercado-bar", "/assets/tilemaps/mercado-bar.json");

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
    this.scene.start("SelectLang");
  }
}
