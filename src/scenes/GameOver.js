import Phaser1 from "phaser";

export default class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }

    create(){
        const titleText = this.add.text(700,240,'GAME OVER',{
            fontSize : '100px'
        });

        this.scene.setVisible(false, "UI");

        titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        const restartButton = this.add.text(960,500,'Restart',{
            fontSize : '50px',
            color : "#fff",
            align : 'center',
            backgroundColor : "#2d2d2d"
        }).setPadding(32).setOrigin(0.5).setInteractive({useHandCursor : true});

        restartButton.on('pointerover', ()=>{
            restartButton.setBackgroundColor('#8d8d8d');
        });
        
        restartButton.on('pointerout',()=>{
            restartButton.setBackgroundColor('#2d2d2d');
        });

        restartButton.on('pointerdown', ()=>{
            this.scene.stop("Pause");
            this.scene.start("Level1");
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