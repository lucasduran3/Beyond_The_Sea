import Phaser from "phaser";
import { EN_US, ES_AR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getPhrase } from "../services/translation";
import keys from "../enums/key";

export default class MainMenu extends Phaser.Scene{
    constructor(){
        super("MainMenu");
    }

    create(){
        const titleText = this.add.text(550,140, 'BEYOND THE SEA',{
            fontSize : '100px'
        });
        titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        const playButton = this.add.text(960,400, 'Jugar',{
            fontSize : '50px',
            color : '#fff',
            align : "center",
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        playButton.setInteractive({useHandCursor : true});

        playButton.on('pointerover',()=>{
            playButton.setBackgroundColor('#8d8d8d');
        });

        playButton.on('pointerout', ()=>{
            playButton.setBackgroundColor('#2d2d2d');
        });

        playButton.on('pointerdown', ()=>{
            this.scene.start("Level1");
        });

        const LevelButton = this.add.text(960,600, getPhrase('Select Level'),{
            fontSize : '50px',
            color : '#fff',
            align : "center",
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        LevelButton.setInteractive({useHandCursor : true});

        LevelButton.on('pointerover',()=>{
            LevelButton.setBackgroundColor('#8d8d8d');
        });

        LevelButton.on('pointerout', ()=>{
            LevelButton.setBackgroundColor('#2d2d2d');
        });

        LevelButton.on('pointerdown', ()=>{
            this.scene.start("LevelSelector");
        });

        const helpButton = this.add.text(960,800, 'Help',{
            fontSize : '50px',
            color : '#fff',
            align : "center",
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        helpButton.setInteractive({useHandCursor : true});

        helpButton.on('pointerover',()=>{
            helpButton.setBackgroundColor('#8d8d8d');
        });

        helpButton.on('pointerout', ()=>{
            helpButton.setBackgroundColor('#2d2d2d');
        });

        helpButton.on('pointerdown', ()=>{
            this.scene.start("Help");
        })
    }
}