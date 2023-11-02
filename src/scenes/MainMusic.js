import Phaser from "phaser";

export default class MainMusic extends Phaser.Scene{
    constructor(){
        super("MainMusic");
    }

    create(){
        
        if(this.scene.isActive){
        const theme = this.sound.add('temaMenu');
        theme.play();
        theme.setLoop(true);
        }
    }
}