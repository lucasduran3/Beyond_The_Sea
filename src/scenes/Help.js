import Phaser from "phaser";

import { getPhrase } from "../services/translation";

export default class Help extends Phaser.Scene{
    constructor(){
        super("Help");
    }

    create(){
        this.add.image(1920/2,1080/2,'mainMenuBg').setScrollFactor(0);
        const titleText = this.add.text(760,240,getPhrase('Ayuda'),{
            fontFamily : 'firstFontasy',
            fontSize : '100px'
        });

        this.scene.setVisible(false, "UI");

        titleText.setTint(0xffaa00);


        let colorIndex = 0;
        const colors = ["#ff0000", "#00ff00", "#ff00ff", "#8f00aa"];

        this.time.addEvent({
            delay: 1000, 
            loop: true, 
            callback: () => {
            titleText.setShadow(5, 5, colors[colorIndex], 0);
            colorIndex = (colorIndex + 1) % colors.length;
            },
        });

        const controlsButton = this.add.text(960,500, getPhrase('Controles'),{
            fontFamily: 'pixelifySans',
            fontSize : '50px',
            color : "#fff",
            align : 'center',
        }).setOrigin(0.5).setInteractive({useHandCursor : true});

        controlsButton.on('pointerover', ()=>{
            controlsButton.setShadow(5,5,"#8F00AA",1, true, true);
        });
        
        controlsButton.on('pointerout',()=>{
            controlsButton.setShadow(0);
        });

        controlsButton.on('pointerdown', ()=>{
            this.scene.start("Controls");
        });

        const powerupsButton = this.add.text(960,700, getPhrase('Habilidades especiales'),{
            fontFamily: 'pixelifySans',
            fontSize : '50px',
            color : "#fff",
            align : 'center',
        }).setOrigin(0.5).setInteractive({useHandCursor : true});

        powerupsButton.on('pointerover', ()=>{
            powerupsButton.setShadow(5,5,"#8F00AA",1, true, true);
        });
        
        powerupsButton.on('pointerout',()=>{
            powerupsButton.setShadow(0);
        });

        powerupsButton.on('pointerdown', ()=>{
            this.scene.start("PowerUp");
        });

        const backButton = this.add.text(960,900,'Back',{
            fontFamily: 'pixelifySans',
            fontSize : '50px',
            color : "#fff",
            align : 'center',
        }).setOrigin(0.5).setInteractive({useHandCursor : true});

        backButton.on('pointerover', ()=>{
            backButton.setShadow(5,5,"#8F00AA",1, true, true);
        });
        
        backButton.on('pointerout',()=>{
            backButton.setShadow(0);
        });

        backButton.on('pointerdown', ()=>{
            this.scene.start("MainMenu");
        });
    }
}