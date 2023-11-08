import Phaser from "phaser";

import { getPhrase } from "../services/translation";

export default class Help extends Phaser.Scene {
  constructor() {
    super("Help");
  }

  init(data) {
    this.preScene = data.preScene;
  }

  create() {
    this.cameras.main.fadeIn(600);
    this.add.image(1920 / 2, 1080 / 2, "mainMenuBg").setScrollFactor(0);

    const titleText = this.add.text(30, 100, getPhrase(" Ayuda"), {
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
      .text(220, 300, getPhrase("Desplazamiento"), {
        fontFamily: "pixelifySans",
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);
    const disImage = this.add.image(220, 500, "keys").setScale(1.2);
    const instruction1 = this.add
      .text(200, 650, getPhrase("Usa estas teclas para desplazarte"), {
        fontFamily: "pixelifySans",
        fontSize: "30px",
        fontStyle: "italic",
        color: "#fff",
        align: "left",
        wordWrap: { width: 250, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    const shooting = this.add
      .text(620, 300, getPhrase("Disparar"), {
        fontFamily: "pixelifySans",
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);
    const shootImage = this.add.image(620, 470, "mouse");
    const instruction2 = this.add
      .text(620, 650, getPhrase("Click izquierdo del mouse para disparar"), {
        fontFamily: "pixelifySans",
        fontSize: "30px",
        fontStyle: "italic",
        color: "#fff",
        align: "left",
        wordWrap: { width: 250, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    const powers = this.add
      .text(1020, 300, getPhrase("Usar arma/poderes"), {
        fontFamily: "pixelifySans",
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);
    const powersImage = this.add.image(1020, 470, "numbers").setScale(2);
    const instruction3 = this.add
      .text(
        1020,
        650,
        getPhrase("Usa 1 para seleccionar el arma y 2 para activar el poder"),
        {
          fontFamily: "pixelifySans",
          fontSize: "30px",
          fontStyle: "italic",
          color: "#fff",
          align: "left",
          wordWrap: { width: 250, useAdvancedWrap: true },
        }
      )
      .setOrigin(0.5);

    const moreManaLife = this.add
      .text(1620, 300, getPhrase("Aumentar vida / mana"), {
        fontFamily: "pixelifySans",
        fontSize: "40px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5);
    const moreManaImage = this.add.image(1620, 470, "keys2").setScale(2);
    const instruction4 = this.add
      .text(
        1620,
        650,
        getPhrase("Usa E para aumentar el mana, y F para aumentar la vida"),
        {
          fontFamily: "pixelifySans",
          fontSize: "30px",
          fontStyle: "italic",
          color: "#fff",
          align: "left",
          wordWrap: { width: 250, useAdvancedWrap: true },
        }
      )
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
      this.scene.start(this.preScene);
    });
  }
}
