import Phaser from "phaser";

import { EN_US, ES_AR, DE_DE } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations} from "../services/translation";

export default class SelectLang extends Phaser.Scene {
  #language;
  #wasChangedLanguage = TODO;

  constructor() {
    super("SelectLang");
  }

  init({ language }) {
    this.language = language;
  }

  create() {
    const titleText = this.add.text(400, 140, " Select Language", {
      fontFamily: "firstFontasy",
      fontSize: "100px",
    });
    titleText.setTint(0x00ffff, 0x00ff80, 0x0000ff, 0xaa00ff);

    const ES = this.add.image(960, 450, "spain").setOrigin(0.5);

    ES.setInteractive({ useHandCursor: true });

    ES.on("pointerover", () => {});

    ES.on("pointerout", () => {});

    ES.on("pointerdown", () => {
      this.getTranslation(ES_AR);
      this.scene.launch("MainMusic");
      this.scene.start("MainMenu", { language: this.#language });
    });

    const EN = this.add.image(960, 650, "usa").setOrigin(0.5);

    EN.setInteractive({ useHandCursor: true });

    EN.on("pointerover", () => {});

    EN.on("pointerout", () => {});

    EN.on("pointerdown", async () => {
      await this.getTranslation(EN_US);
      this.scene.launch("MainMusic");
      this.scene.start("MainMenu", { language: this.#language });
    });

    const DE = this.add.image(960, 850, "german").setOrigin(0.5);

    DE.setInteractive({ useHandCursor: true });

    DE.on("pointerover", () => {});

    DE.on("pointerout", () => {});

    DE.on("pointerdown", async () => {
      await this.getTranslation(DE_DE);
      this.scene.launch("MainMusic");
      this.scene.start("MainMenu", { language: this.#language });
    });
  }

  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
    }
  }

  updateWasChangedLanguage() {
    this.#wasChangedLanguage = FETCHING;
  }

  async getTranslation(language) {
    this.language = language;

    await getTranslations(language);
  }
}
