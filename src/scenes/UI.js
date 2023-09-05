import Phaser from "phaser";
import events from "./EventCenter";

// Manejador de eventos centralizados para comunicacion de componentes

// Importacion
// import events from './EventCenter'

// Emisor de mensaje de difusion
// Recibe el nombre del mensaje y los valores de parametro
// events.emit('health-changed', this.health)

// Receptor de mensaje, por ejemplo escena de UI
// Recibe el nombre del mensaje y una funcion callback a ejecutar
// events.on('health-changed', this.handleHealthChanged, this)

export default class UI extends Phaser.Scene {
  constructor() {
    super("ui");
  }

  create() {
    this.colliderCount = 0;
    // add text with count collider and date
    this.text = this.add.text(10, 10, `Collider count: ${this.colliderCount}`, {
      font: "16px Courier",
      fill: "#00ff00",
    });

    // add listener to the event
    events.on("collider-event", this.colliderEvent, this);
  }

  colliderEvent(data) {
    console.log("collider-event", data);

    // update text
    this.colliderCount += 1;
    this.text.setText(
      `Collider count: ${this.colliderCount} / Last: ${data.fecha}`
    );
  }
}
