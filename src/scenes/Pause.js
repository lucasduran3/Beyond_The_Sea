import Phaser1 from "phaser";
import { getPhrase } from "../services/translation";

export default class Pause extends Phaser.Scene{
    constructor(){
        super("Pause");
    }

    create(){
        const titleText = this.add.text(800,240,'PAUSE',{
            fontSize : '100px'
        });

        this.scene.setVisible(false, "UI");

        titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        const resumeButton = this.add.text(960,500,getPhrase('Continuar'),{
            fontSize : '50px',
            color : "#fff",
            align : 'center',
            backgroundColor : "#2d2d2d"
        }).setPadding(32).setOrigin(0.5).setInteractive({useHandCursor : true});

        resumeButton.on('pointerover', ()=>{
            resumeButton.setBackgroundColor('#8d8d8d');
        });
        
        resumeButton.on('pointerout',()=>{
            resumeButton.setBackgroundColor('#2d2d2d');
        });

        resumeButton.on('pointerdown', ()=>{
            this.scene.stop("Pause");
            this.scene.resume("Level1");
        });

        const MenuButton = this.add.text(960,700,'Menu',{
            fontSize : '50px',
            color : "#fff",
            align : 'center',
            backgroundColor : "#2d2d2d"
        }).setPadding(32).setOrigin(0.5).setInteractive({useHandCursor : true});

        MenuButton.on('pointerover', ()=>{
            MenuButton.setBackgroundColor('#8d8d8d');
        });
        
        MenuButton.on('pointerout',()=>{
            MenuButton.setBackgroundColor('#2d2d2d');
        });

        MenuButton.on('pointerdown', ()=>{
            this.scene.stop("Level1");
            this.scene.stop("Pause");
            this.scene.start("MainMenu");
        });
    }
}