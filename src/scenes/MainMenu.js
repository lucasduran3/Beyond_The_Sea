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
    this.cameras.main.fadeIn(800);

    this.add.image(1920 / 2, 1100 / 2, "mainMenuBg");
    const titleText = this.add.text(
      100,
      100,
      " Beyond\n       The\n         Sea\n",
      {
        fontSize: "125px",
        fontFamily: "firstFontasy",
        shadow: {
          offsetX: 5,
          offsetY: 5,
          color: "#FF4589",
          blur: 0,
          fill: true,
          stroke: true,
        },
      }
    );
    titleText.setTint(0xdda000, 0xffff00, 0x0000ff, 0xffffa0);

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

    const playButton = this.add
      .text(300, 600, getPhrase("Jugar"), {
        fontFamily: "pixelifySans",
        fontSize: "50px",
        color: "#fff",
        align: "center",
      })
      .setPadding(32)
      .setOrigin(0.5);

    playButton.setInteractive({ useHandCursor: true });

    playButton.on("pointerover", () => {
      playButton.setShadow(5, 5, "#328a61", 1, true, true);
    });

    playButton.on("pointerout", () => {
      playButton.setShadow();
    });

    playButton.on("pointerdown", () => {
      //this.scene.start("Intro");
      this.scene.stop("MainMusic");
      this.sound.stopAll();
      this.scene.launch("AmbientSound");
      this.scene.start("Level1");
      this.scene.launch("UI");
    });

    const continueButton = this.add
      .text(300, 750, getPhrase("Continuar"), {
        fontFamily: "pixelifySans",
        fontSize: "50px",
        color: "#fff",
        align: "center",
      })
      .setPadding(32)
      .setOrigin(0.5);

    continueButton.setInteractive({ useHandCursor: true });

    continueButton.on("pointerover", () => {
      continueButton.setShadow(5, 5, "#328a61", 1, true, true);
    });

    continueButton.on("pointerout", () => {
      continueButton.setShadow();
    });

    continueButton.on("pointerdown", () => {
      this.scene.stop("MainMusic");

      // @ts-ignore
      const user = this.firebase.getUser();
      // @ts-ignore
      const data = this.firebase
        .loadGameData(user.uid)
        .then((data) => {
          console.log(data);
          this.scene.start("Level1", {
            level: data.level,
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
          this.scene.launch("AmbientSound");
        })
        .catch((error) => {
          console.error("Error en la carga de datos: ", error);
        });
    });

    const helpButton = this.add
      .text(300, 900, getPhrase("Ayuda"), {
        fontFamily: "pixelifySans",
        fontSize: "50px",
        color: "#fff",
        align: "center",
      })
      .setPadding(32)
      .setOrigin(0.5);

    helpButton.setInteractive({ useHandCursor: true });

    helpButton.on("pointerover", () => {
      helpButton.setShadow(5, 5, "#328a61", 1, true, true);
    });

    helpButton.on("pointerout", () => {
      helpButton.setShadow();
    });

    helpButton.on("pointerdown", () => {
      this.scene.start("Help", {
        preScene: this.scene.key,
      });
    });
  }
}
