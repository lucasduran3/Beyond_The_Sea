import Phaser from "phaser";
import events from "./EventCenter";

import { getPhrase } from "../services/translation";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  language;

  init(language) {
    this.language = language;
  }
  create() {
    this.add.image(1920/2,1100/2,'mainMenuBg');
    const titleText = this.add.text(100, 140, "Beyond\n             The\n                   Sea\n", {
      fontSize: "100px",
      fontFamily : 'firstFontasy',
    });
    titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

    const playButton = this.add
      .text(300, 500, getPhrase("Jugar"), {
        fontFamily : 'pixelifySans',
        fontSize: "50px",
        color: "#fff",
        align: "center",
       //backgroundColor: "#2d2d2d",
      })
      .setPadding(32)
      .setOrigin(0.5);

    playButton.setInteractive({ useHandCursor: true });

    playButton.on("pointerover", () => {
      //playButton.setBackgroundColor("#8d8d8d");
    });

    playButton.on("pointerout", () => {
      //playButton.setBackgroundColor("#2d2d2d");
    });

    playButton.on("pointerdown", () => {
      this.scene.launch("UI");
      this.scene.start("Level1");
    });

    const continueButton = this.add
      .text(300, 700, getPhrase("Continuar"), {
        fontFamily : 'pixelifySans',
        fontSize: "50px",
        color: "#fff",
        align: "center",
       // backgroundColor: "#2d2d2d",
      })
      .setPadding(32)
      .setOrigin(0.5);

    continueButton.setInteractive({ useHandCursor: true });

    continueButton.on("pointerover", () => {
      //continueButton.setBackgroundColor("#8d8d8d");
    });

    continueButton.on("pointerout", () => {
      //continueButton.setBackgroundColor("#2d2d2d");
    });

    continueButton.on("pointerdown", () => {
      
      // @ts-ignore
      const user = this.firebase.getUser();
      // @ts-ignore
      const data =  this.firebase.loadGameData(user.uid).then(data=>{
        console.log(data);
        this.scene.start("Level1",{
          level : data.level,
          keyDoor1: data.keyDoor1,
          keyDoor2: data.keyDoor2,
          keyDoor3: data.keyDoor3,
          keyDoor4: data.keyDoor4,
          weaponsGroup: data.weaponsGroup,
          playerLifes: data.playerLifes,
          playerMana: data.playerMana,
          playerBullets: data.playerBullets,
          playerChips: data.playerChips,
          playerKits: data.playerKits,
          boss1Dead: data.boss1Dead,
          powers: data.powers,
          hasRadio: data.hasRadio,
          hasWeapon: data.hasWeapon,
        });
        this.scene.launch("UI");

      })
      .catch(error => {
        console.error("Error en la carga de datos: ", error);
      });
    });

    const helpButton = this.add
      .text(300, 900, getPhrase("Ayuda"), {
        fontFamily : 'pixelifySans',
        fontSize: "50px",
        color: "#fff",
        align: "center",
       // backgroundColor: "#2d2d2d",
      })
      .setPadding(32)
      .setOrigin(0.5);

    helpButton.setInteractive({ useHandCursor: true });

    helpButton.on("pointerover", () => {
     // helpButton.setBackgroundColor("#8d8d8d");
    });

    helpButton.on("pointerout", () => {
     // helpButton.setBackgroundColor("#2d2d2d");
    });

    helpButton.on("pointerdown", () => {
      this.scene.start("Help");
    });
  }
}
