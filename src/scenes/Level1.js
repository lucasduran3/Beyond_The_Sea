import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    const objectsLayer = this.map.getObjectLayer("objects");

    console.log(floorLayer);
    console.log(objectsLayer);

    const spawnPoint = this.map.findObject(
      "objects",
      (obj) => obj.name === "player"
    );

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "player");

    this.enemy = new Enemy(this, 1500, 800, "player", 200, this.player, this.map);

    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    wallLayer.setCollisionByProperty({ colision: true });
    this.physics.add.collider(wallLayer, this.player);
  }

  update(time, delta) {
    this.player.update(time, delta);
    this.enemy.update();
  }
}
