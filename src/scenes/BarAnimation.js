import Phaser from "phaser";
import HorroriFi from "../components/HorroriFi";
import { getPhrase } from "../services/translation";

export default class BarAnimation extends Phaser.Scene {
  constructor() {
    super("BarAnimation");
  }

  init(data) {
    this.keyDoor1 = data.keyDoor1;
    this.keyDoor2 = data.keyDoor2;
    this.keyDoor3 = data.keyDoor3;
    this.keyDoor4 = data.keyDoor4;
    this.boss1Dead = data.boss1Dead;
    this.boss2Dead = data.boss2Dead;
    this.boss3Dead = data.boss3Dead;

    this.weaponsGroup = data.weaponsGroup;
    this.hasRadio = data.hasRadio;
    this.hasWeapon = data.hasWeapon;

    this.powers = data.powers;
    this.playerLifes = data.playerLifes;
    this.playerMana = data.playerMana;
    this.playerBullets = data.playerBullets;
    this.playerChips = data.playerChips;
    this.playerKits = data.playerKits;
  }

  create() {
    this.cameras.main.fadeIn(500);
    this.map = this.make.tilemap({ key: "map-mercado-bar" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const barTableL = this.map.addTilesetImage("bar-table", "bar-table");
    const decoL = this.map.addTilesetImage("deco", "deco");

    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    const barTableLayer = this.map.createLayer("bar-table", barTableL, 0, 0);
    const decoLayer = this.map.createLayer("deco", decoL, 0, 0);

    console.log(floorLayer, wallLayer, barTableLayer, decoLayer);

    this.boss = this.physics.add
      .sprite(270, 662, "enemy2")
      .setAngle(90)
      .setDepth(10);

    this.player = this.physics.add
      .sprite(1348, 708, "player")
      .setAngle(-90)
      .setDepth(10);

    this.pluginHorror = new HorroriFi(this);
    this.pluginHorror.create();

    this.cameras.main.centerOn(this.player.x, this.player.y);

    this.cameras.main.pan(270, 662, 2000);

    this.time.addEvent({
      delay: 2500,
      callback: () => {
        const content = [
          getPhrase("Quien te dejo entrar?!"),
          getPhrase(
            "No permitiré que nadie arruine nuestro pequeño momento de felicidad..."
          ),
          getPhrase("Este es el único lugar donde podemos calmar el dolor..."),
        ];

        this.scene.launch("Dialog", {
          startOrResume: "start",
          content,
          sceneToStop: "BarAnimation",
          sceneToStart: "Bar",
          keyDoor1: this.keyDoor1,
          keyDoor2: this.keyDoor2,
          keyDoor3: this.keyDoor3,
          keyDoor4: this.keyDoor4,
          weaponsGroup: this.weaponsGroup,
          playerLifes: this.playerLifes,
          playerMana: this.playerMana,
          playerBullets: this.playerBullets,
          playerChips: this.playerChips,
          playerKits: this.playerKits,
          boss1Dead: this.boss1Dead,
          boss2Dead: this.boss2Dead,
          boss3Dead: this.boss3Dead,
          powers: this.powers,
          hasRadio: this.hasRadio,
          hasWeapon: this.hasWeapon,
        });
      },
      callbackScope: this,
      repeat: 0,
    });

    this.scene.setVisible(false, "UI");

    this.add.image(1920 / 2, 1080 / 2, "bg").setScrollFactor(0);
  }

}
