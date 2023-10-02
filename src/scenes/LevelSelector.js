import Phaser from "phaser";

export default class LevelSelector extends Phaser.Scene{
    constructor(){
        super("LevelSelector");
    }

    create(){
        const titleText = this.add.text(550,140, 'SELECT LEVEL',{
            fontSize : '100px'
        });
        titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        const prologueButton = this.add.text(960,300, 'Prologue',{
            fontSize : '50px',
            color : '#fff',
            align : 'center',
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        prologueButton.setInteractive({useHandCursor : true});

        prologueButton.on('pointerover',()=>{
            prologueButton.setBackgroundColor('#8d8d8d');
        });

        prologueButton.on('pointerout',()=>{
            prologueButton.setBackgroundColor('#2d2d2d');
        });

        prologueButton.on('pointerdown',()=>{
            this.scene.start("Prologue");
        });

        const lobbyButton = this.add.text(960,500, 'Lobby',{
            fontSize : '50px',
            color : '#fff',
            align : 'center',
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        lobbyButton.setInteractive({useHandCursor : true});

        lobbyButton.on('pointerover',()=>{
            lobbyButton.setBackgroundColor('#8d8d8d');
        });

        lobbyButton.on('pointerout',()=>{
            lobbyButton.setBackgroundColor('#2d2d2d');
        });

        lobbyButton.on('pointerdown',()=>{
            this.scene.start("Lobby");
        });

        const level1Button = this.add.text(960,700, 'Level 1',{
            fontSize : '50px',
            color : '#fff',
            align : 'center',
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        level1Button.setInteractive({useHandCursor : true});

        level1Button.on('pointerover',()=>{
            level1Button.setBackgroundColor('#8d8d8d');
        });

        level1Button.on('pointerout',()=>{
            level1Button.setBackgroundColor('#2d2d2d');
        });

        level1Button.on('pointerdown',()=>{
            this.scene.start("Level1");
        });

        const backButton = this.add.text(960,900, 'Back',{
            fontSize : '50px',
            color : '#fff',
            align : 'center',
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        backButton.setInteractive({useHandCursor : true});

        backButton.on('pointerover',()=>{
            backButton.setBackgroundColor('#8d8d8d');
        });

        backButton.on('pointerout',()=>{
            backButton.setBackgroundColor('#2d2d2d');
        });

        backButton.on('pointerdown',()=>{
            this.scene.start("MainMenu");
        });

    }
}