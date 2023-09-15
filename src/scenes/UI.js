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
    super("UI");
  }

  create() {
    this.life = this.add.text(80,50,"Life:",{
        fontSize: "40px",
        color : "#fff"
      }
    );

    this.mana = this.add.text(80,100,"Mana:",{
      fontSize: "40px",
      color : "#fff"
      }
    );

    this.coins = this.add.text(1600,50,"Coins:",{
      fontSize: "40px",
      color : "#fff"
      }
    );

    this.bullets = this.add.text(80,950,"Bullets:",{
      fontSize: "40px",
      color : "#fff"
      }
    );

    this.weapon1 = this.add.text(850,50,"weapon1",{
      fontSize: "20px",
      color : "#0f0"
      }
    );

    this.weapon2 = this.add.text(950,50,"weapon2",{
      fontSize: "20px",
      color : "#0ff"
      }
    );

    this.weapon3 = this.add.text(1050,50,"weapon3",{
      fontSize: "20px",
      color : "#ff0"
      }
    );

    this.power1 = this.add.text(850,100,"power1",{
      fontSize: "20px",
      color : "#fff"
      }
    );

    this.power2 = this.add.text(950,100,"power2",{
      fontSize: "20px",
      color : "#fff"
      }
    );

    this.power3 = this.add.text(1050,100,"power3",{
      fontSize: "20px",
      color : "#fff"
      }
    );

  }

  setText(){

}
}
