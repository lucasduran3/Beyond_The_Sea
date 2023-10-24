import Phaser from "phaser";

import { getPhrase } from "../services/translation";

export default class Help extends Phaser.Scene{
    constructor(){
        super("Help");
    }

    create(){
        const titleText = this.add.text(850,240,getPhrase('Ayuda'),{
            fontSize : '100px'
        });

        titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        const controlsButton = this.add.text(960,500, getPhrase('Controles'),{
            fontSize : '50px',
            color : "#fff",
            align : 'center',
            backgroundColor : "#2d2d2d"
        }).setPadding(32).setOrigin(0.5).setInteractive({useHandCursor : true});

        controlsButton.on('pointerover', ()=>{
            controlsButton.setBackgroundColor('#8d8d8d');
        });
        
        controlsButton.on('pointerout',()=>{
            controlsButton.setBackgroundColor('#2d2d2d');
        });

        controlsButton.on('pointerdown', ()=>{
            this.scene.start("Controls");
        });

        const powerupsButton = this.add.text(960,700, getPhrase('Habilidades especiales'),{
            fontSize : '50px',
            color : "#fff",
            align : 'center',
            backgroundColor : "#2d2d2d"
        }).setPadding(32).setOrigin(0.5).setInteractive({useHandCursor : true});

        powerupsButton.on('pointerover', ()=>{
            powerupsButton.setBackgroundColor('#8d8d8d');
        });
        
        powerupsButton.on('pointerout',()=>{
            powerupsButton.setBackgroundColor('#2d2d2d');
        });

        powerupsButton.on('pointerdown', ()=>{
            this.scene.start("PowerUp");
        });

        const backButton = this.add.text(960,900,'Back',{
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
            this.scene.start("MainMenu");
        });
    }
}