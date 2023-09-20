import Phaser from "phaser";

export default class Preload extends Phaser.Scene{
    constructor(){
        super("Preload");
    }

    preload(){
        //sprites
        this.load.image("player", "/assets/sprites/player.png");
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
        this.scene.start("Level1");
    }
}