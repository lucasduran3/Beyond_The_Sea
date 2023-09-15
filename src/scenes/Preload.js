import Phaser from "phaser";

export default class Preload extends Phaser.Scene{
    constructor(){
        super("Preload");
    }

    preload(){
        this.load.image("player", "/assets/sprites/player.png");
        this.load.image('bullet', '/assets/sprites/bullet.png');
        this.load.image('wall', '/assets/sprites/wall.png');
        this.load.image('floor', '/assets/sprites/floor.png');

        this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");
    }

    create(){
        this.scene.start("MainMenu");
    }
}