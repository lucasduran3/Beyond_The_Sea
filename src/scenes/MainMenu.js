import Phaser from "phaser";

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
    const titleText = this.add.text(550, 140, "BEYOND THE SEA", {
      fontSize: "100px",
    });
    titleText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

    const playButton = this.add
      .text(960, 500, getPhrase("Jugar"), {
        fontSize: "50px",
        color: "#fff",
        align: "center",
        backgroundColor: "#2d2d2d",
      })
      .setPadding(32)
      .setOrigin(0.5);

    playButton.setInteractive({ useHandCursor: true });

    playButton.on("pointerover", () => {
      playButton.setBackgroundColor("#8d8d8d");
    });

    playButton.on("pointerout", () => {
      playButton.setBackgroundColor("#2d2d2d");
    });

    playButton.on("pointerdown", () => {
      this.scene.start("Level1");
      this.scene.launch("UI");
    });

    const continueButton = this.add
      .text(960, 700, getPhrase("Continuar"), {
        fontSize: "50px",
        color: "#fff",
        align: "center",
        backgroundColor: "#2d2d2d",
      })
      .setPadding(32)
      .setOrigin(0.5);

    continueButton.setInteractive({ useHandCursor: true });

    continueButton.on("pointerover", () => {
      continueButton.setBackgroundColor("#8d8d8d");
    });

    continueButton.on("pointerout", () => {
      continueButton.setBackgroundColor("#2d2d2d");
    });

    continueButton.on("pointerdown", () => {
      this.scene.launch("UI");
      this.scene.start("Level1");
    });

    const helpButton = this.add
      .text(960, 900, getPhrase("Ayuda"), {
        fontSize: "50px",
        color: "#fff",
        align: "center",
        backgroundColor: "#2d2d2d",
      })
      .setPadding(32)
      .setOrigin(0.5);

    helpButton.setInteractive({ useHandCursor: true });

    helpButton.on("pointerover", () => {
      helpButton.setBackgroundColor("#8d8d8d");
    });

    helpButton.on("pointerout", () => {
      helpButton.setBackgroundColor("#2d2d2d");
    });

    helpButton.on("pointerdown", () => {
      this.scene.start("Help");
    });
  }
}
