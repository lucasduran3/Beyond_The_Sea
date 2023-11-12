import Phaser from "phaser";

export default class Login extends Phaser.Scene {
  constructor() {
    super("Login");
  }

  create() {
    const titleText = this.add.text(750, 140, " Login", {
      fontSize: 100,
      fontFamily: "firstFontasy",
      align: "center",
    });
    titleText.setTint(0x00ffff, 0x00ff80, 0x0000ff, 0xaa00ff);

    this.add
      .image(956, 450, "anon-icon")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        // @ts-ignore
        this.firebase
          .signInAnonymously()
          .then(() => {
            //this.scene.launch("MainMusic");
            this.scene.start("SelectLang");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    this.add
      .image(956, 650, "google-icon")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        // @ts-ignore
        this.firebase
          .signInWithGoogle()
          .then(() => {
            this.scene.start("SelectLang");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

    this.add
      .image(956, 850, "git-icon")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        // @ts-ignore
        this.firebase
          .signInWithGithub()
          .then(() => {
            this.scene.start("SelectLang");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });
  }
}
