import Phaser from "phaser";

import { getPhrase } from "../services/translation";

export default class Credits extends Phaser.Scene {
  constructor() {
    super("Credits");
  }

  init() {

  }

  create() {
    this.cameras.main.fadeIn(600);
    this.add.image(1920 / 2, 1080 / 2, "mainMenuBg").setScrollFactor(0);

    const titleText = this.add.text(30, 100, getPhrase(" Creditos"), {
      fontFamily: "firstFontasy",
      fontSize: "120px",
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

    const displacement = this.add
      .text(520, 340, getPhrase("Diseño:  Elias Coria"), {
        fontFamily: "pixelifySans",
        fontSize: "50px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    const shooting = this.add
      .text(550, 550, getPhrase("Arte: Maximo Gonzáles"), {
        fontFamily: "pixelifySans",
        fontSize: "50px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);


    const powers = this.add
      .text(700, 750, getPhrase("Programación - música: Lucas Durán"), {
        fontFamily: "pixelifySans",
        fontSize: "50px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);

    const backButton = this.add
      .text(180, 950, getPhrase
        ("Back"), {
        fontFamily: "pixelifySans",
        fontSize: "50px",
        color: "#ffaa00",
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    backButton.on("pointerover", () => {
      backButton.setShadow(5, 5, "#8800cc", 1, true, true);
    });

    backButton.on("pointerout", () => {
      backButton.setShadow(0);
    });

    backButton.on("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
