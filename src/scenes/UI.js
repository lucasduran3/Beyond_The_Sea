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

  init(){
   
  }

  create() {
    this.playerHP = new HealthBar(this, 80, 40, 300);
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

    this.key1 = this.add.text(1600,200,"",{
      fontSize: "40px",
      color : "#fff"
      }
    );

    this.bullets = this.add.text(80,950,"Bullets:",{
      fontSize: "40px",
      color : "#fff"
      }
    );

    this.revolver = this.add.text(850,50,"revolver",{
      fontSize: "20px",
      color : "#0f0"
      }
    ).setInteractive({useHandCursor : true});

    this.revolver.on('pointerover', ()=>{
      this.revolver.setFontSize("25px");
    });
  
    this.revolver.on('pointerout',()=>{
      this.revolver.setFontSize('20px');
    });

    this.revolver.on('pointerdown', ()=>{
      events.emit("updateWeapon",{
        weapon : "revolver"
      });
    });    

    this.rifle = this.add.text(950,50,"rifle",{
      fontSize: "20px",
      color : "#0ff"
      }
    ).setInteractive({useHandCursor : true});

    this.rifle.on('pointerover', ()=>{
      this.rifle.setFontSize("25px");
    });
  
    this.rifle.on('pointerout',()=>{
      this.rifle.setFontSize('20px');
    });

    this.rifle.on('pointerdown', ()=>{
      events.emit("updateWeapon",{
        weapon : "rifle"
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

    this.playerHP.decrease(data.damage||0);

    console.log(data.damage);
    this.key1.setText(data.key1);
  }
}
