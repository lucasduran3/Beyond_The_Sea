import Phaser from "phaser";
import { getLanguageConfig, getTranslations } from "../services/translation";

export default class Preload extends Phaser.Scene{
    #language;
    constructor(){
        super("Preload");
    }

    preload(){
        //sprites
        this.load.spritesheet("player", "/assets/sprites/player.png",{frameWidth:192, frameHeight:192});
        this.load.spritesheet("enemy", "/assets/sprites/enemy.png",{frameWidth:192, frameHeight:192});
        this.load.image('bullet', '/assets/sprites/bullet.png');
        this.load.image('wall', '/assets/sprites/wall.png');
        this.load.image('floor', '/assets/sprites/floor.png');
        this.load.image('sofa', '/assets/sprites/sofa.png');

        //tilemaps
        this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");

        //plugins
        this.load.plugin('rexhorrifipipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexhorrifipipelineplugin.min.js', true);

    }

    create(){
        getTranslations(
            this.#language,
            () => this.scene.start('menu', { language: this.#language }),
        );

        this.scene.start("SelectLang",{language : this.#language});
    }
}