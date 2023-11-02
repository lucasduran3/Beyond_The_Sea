import Phaser1 from "phaser";
import { getPhrase } from "../services/translation";

export default class Pause extends Phaser.Scene{
    constructor(){
        super("Pause");
    }

    init(data){
        this.preScene = data.preScene;
    }

    create(){
        const titleText = this.add.text(760,240, getPhrase('Pausa'),{
            fontFamily: 'firstFontasy',
            fontSize : '100px',
            shadow : {offsetX: 5, offsetY: 5, color:'#0000ff', blur: 0, fill: true, stroke: true}
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


        const resumeButton = this.add.text(960,500,getPhrase('Continuar'),{
            fontFamily: 'pixelifySans',
            fontSize : '50px',
            color : "#fff",
            align : 'center',
        }).setOrigin(0.5).setInteractive({useHandCursor : true});

        resumeButton.on('pointerover', ()=>{
            resumeButton.setShadow(5,5,"#8F00AA",1, true, true);
        });
        
        resumeButton.on('pointerout',()=>{
            resumeButton.setShadow(0);
        });

        resumeButton.on('pointerdown', ()=>{
            this.scene.stop("Pause");
            this.scene.resume(this.preScene);
        });

        const helpButton = this.add.text(960,600,getPhrase('Ayuda'),{
            fontFamily: 'pixelifySans',
            fontSize : '50px',
            color : "#fff",
            align : 'center',
        }).setOrigin(0.5).setInteractive({useHandCursor : true});

        helpButton.on('pointerover', ()=>{
            helpButton.setShadow(5,5,"#8F00AA",1, true, true);
        });
        
        helpButton.on('pointerout',()=>{
            helpButton.setShadow(0);
        });

        helpButton.on('pointerdown', ()=>{
            this.scene.start("Help",{
                preScene : this.scene.key,
            });
        });

        const MenuButton = this.add.text(960,700,'Menu',{
            fontFamily: 'pixelifySans',
            fontSize : '50px',
            color : "#fff",
            align : 'center',
        }).setOrigin(0.5).setInteractive({useHandCursor : true});

        MenuButton.on('pointerover', ()=>{
            MenuButton.setShadow(5,5,"#8F00AA",1, true, true);
        });
        
        MenuButton.on('pointerout',()=>{
            MenuButton.setShadow(0);
        });

        MenuButton.on('pointerdown', ()=>{
            this.scene.stop("Level1");
            this.scene.stop("Pause");
            this.scene.start("MainMenu");
        });

        this.keyESC = this.input.keyboard.addKey("ESC");
    }
    
    update(){
    if(this.keyESC.isDown){
        this.scene.resume(this.preScene);
        this.scene.stop("Pause");
    }
}
}