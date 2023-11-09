import Phaser from "phaser";

export default class IntroMusic extends Phaser.Scene {
  constructor() {
    super("IntroMusic");
  }

  create() {
    if (this.scene.isActive) {
      const theme = this.sound.add("introMusic");
      theme.play();
      theme.setLoop(true);
    }
  }
}
