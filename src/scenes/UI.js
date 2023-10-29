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
    this.nBullets = 0;
    this.nKits = 0;
    this.nChips = 0;
    this.nBullets = 0;
  }

  init(){
    
  }

  create() {
    
    console.log(this.nKits);
    this.playerHP = new HealthBar(this, 80, 40, 300, '0x00ff00');
   
    this.playerMana = new HealthBar(this, 80, 90, 300, '0x00a0ff');

    this.kitsUI = this.add.text(80,140,'KITS'+this.nKits,{
      fontSize : "30px",
      color : "#fff"
    }).setInteractive({useHandCursor : true});

    this.chipsUI = this.add.text(80,190,'CHIPS'+this.nChips,{
      fontSize : "30px",
      color : "#fff"
    }).setInteractive({useHandCursor : true});

    this.coins = this.add.text(1600,50,"Coins:",{
      fontSize: "40px",
      color : "#fff"
      }
    );

    this.key1 = this.add.text(1600,200,"",{
      fontSize: "30px",
      color : "#fff"
      }
    );

    this.keyBar = this.add.text(1800,200,"",{
      fontSize: "30px",
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

    this.rifle = this.add.text(950,50,"rifle",{
      fontSize: "20px",
      color : "#0ff"
      }
    ).setInteractive({useHandCursor : true}); 

    this.power1 = this.add.text(850,100,"power1",{
      fontSize: "20px",
      color : "#fff"
      }
    ).setInteractive({useHandCursor : true});

    this.power1.on('pointerover', ()=>{
      this.power1.setFontSize("25px");
    });

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

    events.on("updateKeys", this.updateKeys, this);

    events.on("updateMana", this.updateMana, this);

    events.on("updateHP", this.updateHP, this);

    events.on("updateKitsUI", this.updateKitsUI, this);

    events.on("updateChipsUI", this.updateChipsUI, this);

    events.on("updateBullets", this.updateBullets, this);

    events.on("resetUI", this.resetUI, this);

  }

  update(){
  }

  updateKeys(data){

    this.key1.setText(data.key1||"");

    this.keyBar.setText(data.keyBar||"");
  }

  updateHP(data){
    if(data.isIncrease == true && this.playerHP.value != 300 && this.nKits>0){
      this.playerHP.increment(data.ammount||0);
    }else if(data.isIncrease == false){
      this.playerHP.decrease(data.ammount||0);
    }
  }

  updateMana(data){
    if(data.isIncrease == true && this.playerMana.value != 300 && this.nChips>0){
      this.playerMana.increment(data.ammount||0);
    }else if(data.isIncrease == false){
      this.playerMana.decrease(data.ammount||0);
    }
  }

  updateKitsUI(data){
    if(data.isIncrease == true){
      this.nKits+=data.ammount;
      this.kitsUI.setText('KITS: ' + this.nKits);
    }else if(data.isIncrease == false && this.nKits>0){
      this.nKits--;
      this.kitsUI.setText('KITS: ' + this.nKits);
    }
  }

  updateChipsUI(data){
    console.log(this.nChips);
    if(data.isIncrease == true){
      this.nChips+=data.ammount;
      this.chipsUI.setText('CHIPS: ' + this.nChips);
    }else if(data.isIncrease == false && this.nChips>0){
      this.nChips--;
      this.chipsUI.setText('CHIPS: ' + this.nChips);
    }
  }

  updateBullets(data){
    if(data.isIncrease == true){
      this.nBullets+=data.ammount;
      this.bullets.setText('Bullets: ' + this.nBullets);
    }else if(data.isIncrease == false && this.nBullets>0){
      this.nBullets--;
      this.bullets.setText('Bullets: ' + this.nBullets);
    }
  }

  resetUI(){
    this.nKits = 0;
    this.nChips = 0;

    this.nBullets = 0;

    this.kitsUI.setText('KITS'+this.nKits);
    this.chipsUI.setText('CHIPS'+this.nChips);

    this.playerHP.increment(300);
    this.bullets.setText('Bullets: '+ this.nBullets);
  }
}
