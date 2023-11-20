import Phaser from "phaser";

export default class Intro extends Phaser.Scene {
  constructor() {
    super("Intro");
  }

  create() {
    this.cameras.main.fadeIn(800);

    const image1 = this.add.image(0, 50, "intro1").setOrigin(0, 0).setAlpha(1);
    const image2 = this.add.image(0, 50, "intro2").setOrigin(0, 0).setAlpha(0);
    const image3 = this.add.image(0, 50, "intro3").setOrigin(0, 0).setAlpha(0);

    this.tweens.add({
      targets: image1,
      alpha: 0,
      duration: 8000,
      onComplete: () => {
        image1.setVisible(false);
        image2.setAlpha(1);
        this.time.addEvent({
          delay: 2500,
          callback: () => {
            this.tweens.add({
              targets: image2,
              alpha: 0,
              duration: 2500,
              onComplete: () => {
                image2.setVisible(false);
                image3.setAlpha(1);
                this.time.addEvent({
                  delay: 2500,
                  callback: () => {
                    this.tweens.add({
                      targets: image3,
                      alpha: 0,
                      duration: 2500,
                      onComplete: () => {
                        this.scene.stop("MainMusic");
                        this.sound.stopAll();
                        this.scene.start("Level1");
                        this.scene.launch("AmbientSound");
                        this.scene.launch("UI");
                        this.scene.launch("HorroriFi");
                      },
                    });
                  },
                  loop: true,
                });
              },
            });
          },
          loop: true,
        });
      },
    });
  }
}
