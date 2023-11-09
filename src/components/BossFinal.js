import Phaser from "phaser";
import Enemy from "./Enemy";

export default class BossFinal extends Enemy {
  constructor(scene, x, y, texture, speed, map) {
    super(scene, x, y, texture, speed, map);
  }
}
