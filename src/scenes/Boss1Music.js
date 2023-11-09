import Phaser from "phaser";


export default class Boss1Music extends Phaser.Scene{
    constructor(){
        super("Boss1Music");
    }
    
    init(){
        
    }

    create(){
        this.theme = this.sound.add('boss1Music');
        this.theme.play();
        this.theme.setLoop(true);
    }
}

   