import Phaser from "phaser";

// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
// import events from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.atlas(
      "match3",
      "assets/atlas/match3.png",
      "assets/atlas/match3.json"
    );
  }

  create() {
    this.add.image(400, 300, "sky");

    const emitter = this.add.particles(0, 0, "match3", {
      frame: ["Match3_Icon_30", "Match3_Icon_29"],
      lifespan: 4000,
      speed: { min: 200, max: 350 },
      scale: { start: 0.4, end: 0 },
      rotate: { start: 0, end: 360 },
      gravityY: 200,
      emitting: false,
    });

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.emitParticleAt(logo.x, logo.y, 4);
  }
}
