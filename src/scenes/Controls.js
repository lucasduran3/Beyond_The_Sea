import Phaser from "phaser";
import { getPhrase } from "../services/translation";

export default class Controls extends Phaser.Scene{
    constructor(){
        super("Controls");
    }

    create(){
        const titleText = this.add.text(750,240,getPhrase('Controles'),{
            fontSize : '100px'
        });

        titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        const backButton = this.add.text(960,500,'Back',{
            fontSize : '50px',
            color : "#fff",
            align : 'center',
            backgroundColor : "#2d2d2d"
        }).setPadding(32).setOrigin(0.5).setInteractive({useHandCursor : true});

        backButton.on('pointerover', ()=>{
            backButton.setBackgroundColor('#8d8d8d');
        });
        
        backButton.on('pointerout',()=>{
            backButton.setBackgroundColor('#2d2d2d');
        });

        backButton.on('pointerdown', ()=>{
            this.scene.start("Help");
        });
    }
}