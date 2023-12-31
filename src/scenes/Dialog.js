import Phaser from "phaser";

export default class Dialog extends Phaser.Scene {
  constructor() {
    super("Dialog");
  }
  init(data) {
    this.content = data.content;
    this.sceneToStop = data.sceneToStop;
    this.sceneToStart = data.sceneToStart;
    this.isFinal = data.isFinal || false;

    this.level = data.level;
    this.powers = data.powers;
    this.weaponsGroup = data.weaponsGroup || {};
    this.keyDoor1 = data.keyDoor1;
    this.keyDoor2 = data.keyDoor2;
    this.keyDoor3 = data.keyDoor3;
    this.keyDoor4 = data.keyDoor4;
    this.keyBar = data.keyBar;
    this.boss1Dead = data.boss1Dead;
    this.boss2Dead = data.boss2Dead;
    this.boss3Dead = data.boss3Dead;

    this.weaponsGroup = data.weaponsGroup;
    this.playerLifes = data.playerLifes;
    this.playerMana = data.playerMana;
    this.playerBullets = data.playerBullets;
    this.playerChips = data.playerChips;
    this.playerKits = data.playerKits;

    this.hasRadio = data.hasRadio;
    this.hasWeapon = data.hasWeapon;
    this.playerX = data.playerX;
    this.playerY = data.playerY;
  }

  create() {
    this.c = 0;
    this.r = this.add.rectangle(0, 1000, 5000, 650, 0x000).setScrollFactor(0);

    this.text = this.add
      .text(300, 750, "", {
        fontFamily: "pixelifySans",
        fontSize: "30px",
        color: "#fff",
        align: "left",
      })
      .setScrollFactor(0);

    this.writeText();
    const arrow = this.add
      .image(1520, 900, "arrow")
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });
    arrow.on("pointerdown", () => {
      this.writeText();
    });
  }

  writeText() {
    this.text.setText(this.content[this.c]);
    if (this.c < this.content.length) {
      this.c++;
    } else {
      this.scene.stop("Dialog");
      if (this.sceneToStop == "BarWinAnimation") {
        this.scene.launch("BarWinAnimation", {
          startAnimation: true,
          playerX: this.playerX,
          playerY: this.playerY,
          level: this.level,
          keyDoor1: this.keyDoor1,
          keyDoor2: this.keyDoor2,
          keyDoor3: this.keyDoor3,
          keyDoor4: this.keyDoor4,
          keyBar: this.keyBar,
          weaponsGroup: this.weaponsGroup,
          playerLifes: this.playerLifes,
          playerMana: this.playerMana,
          playerBullets: this.playerBullets,
          playerKits: this.playerKits,
          playerChips: this.playerChips,
          boss1Dead: this.boss1Dead,
          boss2Dead: this.boss2Dead,
          boss3Dead: this.boss3Dead,
          powers: this.powers,
          hasRadio: this.hasRadio,
          hasWeapon: this.hasWeapon,
        });
      } else {
        this.scene.stop(this.sceneToStop);
        this.scene.start(this.sceneToStart, {
          level: this.level,
          keyDoor1: this.keyDoor1,
          keyDoor2: this.keyDoor2,
          keyDoor3: this.keyDoor3,
          keyDoor4: this.keyDoor4,
          keyBar: this.keyBar,
          weaponsGroup: this.weaponsGroup,
          playerLifes: this.playerLifes,
          playerMana: this.playerMana,
          playerBullets: this.playerBullets,
          playerKits: this.playerKits,
          playerChips: this.playerChips,
          boss1Dead: this.boss1Dead,
          boss2Dead: this.boss2Dead,
          boss3Dead: this.boss3Dead,
          powers: this.powers,
          hasRadio: this.hasRadio,
          hasWeapon: this.hasWeapon,
        });

        if(this.isFinal){
          this.sound.stopAll();
          this.scene.launch("MainMusic");
        }
      }
    }
  }
}
