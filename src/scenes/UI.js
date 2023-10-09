import Phaser from "phaser";
import events from "./EventCenter";
import Player from "../components/Player";
import HealthBar from "../components/HealthBar";

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

  init({playerHp = new HealthBar(this, 80, 40, 300)}){
    this.playerHP = playerHp;
  }

  create() {
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
    ).setInteractive({useHandCursor : true});

    this.weapon1.on('pointerover', ()=>{
      this.weapon1.setFontSize("25px");
    });
  
    this.weapon1.on('pointerout',()=>{
      this.weapon1.setFontSize('20px');
    });

    this.weapon1.on('pointerdown', ()=>{
      events.emit("updateWeapon",{
        weapon : "weapon1"
      });
    });    

    this.weapon2 = this.add.text(950,50,"weapon2",{
      fontSize: "20px",
      color : "#0ff"
      }
    ).setInteractive({useHandCursor : true});

    this.weapon2.on('pointerover', ()=>{
      this.weapon2.setFontSize("25px");
    });
  
    this.weapon2.on('pointerout',()=>{
      this.weapon2.setFontSize('20px');
    });

    this.weapon2.on('pointerdown', ()=>{
      events.emit("updateWeapon",{
        weapon : "weapon2"
      });
    }); 

    this.weapon3 = this.add.text(1050,50,"weapon3",{
      fontSize: "20px",
      color : "#ff0"
      }
    ).setInteractive({useHandCursor : true});

    this.weapon3.on('pointerover', ()=>{
      this.weapon3.setFontSize("25px");
    });
  
    this.weapon3.on('pointerout',()=>{
      this.weapon3.setFontSize('20px');
    });

    this.weapon3.on('pointerdown', ()=>{
      events.emit("updateWeapon",{
        weapon : "weapon3"
      });
    }); 

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
    
    const pauseButton = this.add.text(1800,950,'Pause',{
      fontSize : '30px',
      color : "#fff",
      align : 'center',
      backgroundColor : "#6e3adf"
    }).setPadding(16).setOrigin(0.5).setInteractive({useHandCursor : true});

    pauseButton.on('pointerover', ()=>{
      pauseButton.setBackgroundColor('#4e15af');
    });
  
    pauseButton.on('pointerout',()=>{
      pauseButton.setBackgroundColor('#6e3adf');
    });

    pauseButton.on('pointerdown', ()=>{
      this.scene.pause("Level1");
      this.scene.launch("Pause");
    });

    pauseButton.setScrollFactor(0);

    events.on("update", this.updateUI, this);

  }
  updateUI(data){
    this.playerHP.decrease(data.damage);
  }
}
