import Phaser from "phaser";

export default class FinalWin extends Phaser.Scene{
    constructor(){
        super("FinalWin");
    }

    create(){
    this.cameras.main.fadeIn(800);

    this.scene.launch("MainMusic");

    this.add.image(1920 / 2, 1100 / 2, "mainMenuBg");
    const titleText = this.add.text(
      780,
      350,
      " Fin",
      {
        fontSize: "140px",
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

    this.time.addEvent({
        delay: 6000,
        callback: ()=>{this.scene.start("MainMenu")},
        callbackScope: this,
        repeat: 0
    });
    }
    
}