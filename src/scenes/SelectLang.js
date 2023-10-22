import Phaser from "phaser";

import { EN_US, ES_AR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translation";

export default class SelectLang extends Phaser.Scene{
    #textSpanish;
    #textEnglish;
    #language;
    #wasChangedLanguage = TODO;

    constructor(){
        super("SelectLang");
    }

    init({language}){
        this.language = language;   
    }

    create(){
        const titleText = this.add.text(550,140, 'SELECT LAGUAJE',{
            fontSize : '100px'
        });
        titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        const ES = this.add.text(960,400, 'ES',{
            fontSize : '50px',
            color : '#fff',
            align : "center",
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        ES.setInteractive({useHandCursor : true});

        ES.on('pointerover',()=>{
            ES.setBackgroundColor('#8d8d8d');
        });

        ES.on('pointerout', ()=>{
            ES.setBackgroundColor('#2d2d2d');
        });

        ES.on('pointerdown', ()=>{
            this.getTranslation(ES_AR);
            this.scene.start("MainMenu",{language : this.#language});
        });

        const EN = this.add.text(960,600, 'EN',{
            fontSize : '50px',
            color : '#fff',
            align : "center",
            backgroundColor : '#2d2d2d'
        }).setPadding(32).setOrigin(0.5);

        EN.setInteractive({useHandCursor : true});

        EN.on('pointerover',()=>{
            EN.setBackgroundColor('#8d8d8d');
        });

        EN.on('pointerout', ()=>{
            EN.setBackgroundColor('#2d2d2d');
        });

        EN.on('pointerdown', async ()=>{
            await this.getTranslation(EN_US);
            this.scene.start("MainMenu",{language : this.#language});
        });
    }

    update(){
        if(this.#wasChangedLanguage == FETCHED){
            this.#wasChangedLanguage = READY;
        }
    }

    updateWasChangedLanguage(){
        this.#wasChangedLanguage = FETCHING;
    }

    async getTranslation(language) {
        this.language = language;
    
        await getTranslations(language);
      }
}