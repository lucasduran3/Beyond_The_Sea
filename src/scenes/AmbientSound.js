import Phaser from "phaser";

export default class AmbientSound extends Phaser.Scene{
    constructor(){
        super("AmbientSound");
    }

    create(){
    this.ambientSound = this.sound.add("ambient");

    this.ambientSound.play();
    this.ambientSound.setLoop(true);
    }
}