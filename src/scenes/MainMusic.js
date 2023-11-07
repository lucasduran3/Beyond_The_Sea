import Phaser from "phaser";
import events from "./EventCenter";


export default class MainMusic extends Phaser.Scene{
    constructor(){
        super("MainMusic");
    }
    
    init(){
        
    }

    create(){
        this.theme = this.sound.add('temaMenu');
        this.theme.play();
        this.theme.setLoop(true);


    }
}

   