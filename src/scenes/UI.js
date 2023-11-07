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

  create() {
    
    console.log(this.nKits);
    this.playerHP = new HealthBar(this, 80, 40, 300, '0x00ff00');
   
    this.playerMana = new HealthBar(this, 80, 90, 300, '0x00a0ff');

    this.kitsImage = this.add.image(100,200,"kitUI");
    this.kitsUI = this.add.text(130,190,': '+this.nKits,{
      fontFamily: 'pixelifySans',
      fontSize : "30px",
      color : "#fff"
    }).setInteractive({useHandCursor : true});

    this.chipImage = this.add.image(100,300,"chipUI");
    this.chipsUI = this.add.text(130,290,': '+this.nChips,{
      fontFamily: 'pixelifySans',
      fontSize : "30px",
      color : "#fff"
    }).setInteractive({useHandCursor : true});

    this.key1 = this.add.text(1600,200,"",{
      fontSize: "30px",
      color : "#fff"
      }
    );

    this.key3 = this.add.text(1900,200,"",{
      fontSize: "30px",
      color: "#fff"
      }
    );

    this.keyBar = this.add.text(1800,200,"",{
      fontSize: "30px",
      color : "#fff"
      }
    );

    this.bulletImg = this.add.image(90,950, "bulletToCollect").setAngle(-90);
    this.bullets = this.add.text(130,950,"x",{
      fontFamily: 'pixelifySans',
      fontSize: "40px",
      color : "#fff"
      }
    );

    this.revolver = this.add.image(850,100,"revolverUI").setAlpha(0.3);   

    this.power1 = this.add.image(1050,100,"powerFreezeUI").setAlpha(0.3);

    const pauseButton = this.add.image(1800,950,'pauseButton').setInteractive({useHandCursor: true});

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

    events.on("updateUI", this.updateUI, this);

    events.on("updateWeapon", this.updateWeapon, this);

    events.on("updatePower", this.updatePower, this);

  }

  update(){}

  updateUI(data){
    this.nBullets = data.nBullets;
    this.nChips = data.nChips;
    this.nKits = data.nKits;
    this.bullets.setText('x' + this.nBullets);
    this.chipsUI.setText(': '+this.nChips);
    this.kitsUI.setText(': '+this.nKits);
  }

  updateKeys(data){

    this.key1.setText(data.key1||"");

    this.key3.setText(data.key2||"");

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
      this.kitsUI.setText(': ' + this.nKits);
    }else if(data.isIncrease == false && this.nKits>0){
      this.nKits--;
      this.kitsUI.setText(': ' + this.nKits);
    }
  }

  updateChipsUI(data){
    console.log(this.nChips);
    if(data.isIncrease == true){
      this.nChips+=data.ammount;
      this.chipsUI.setText(': ' + this.nChips);
    }else if(data.isIncrease == false && this.nChips>0){
      this.nChips--;
      this.chipsUI.setText(': ' + this.nChips);
    }
  }

  updateBullets(data){
    if(data.isIncrease == true){
      this.nBullets+=data.ammount;
      this.bullets.setText('x' + this.nBullets);
    }else if(data.isIncrease == false && this.nBullets>0){
      this.nBullets--;
      this.bullets.setText('x' + this.nBullets);
    }
  }

  updateWeapon(){
    this.revolver.setAlpha(1)
  }

  updatePower(){
    this.power1.setAlpha(1);
  }

  resetUI(data){
    this.nKits = 0;
    this.nChips = 0;

    this.nBullets = data.bullets;

    this.kitsUI.setText(': '+this.nKits);
    this.chipsUI.setText(': '+this.nChips);

    this.playerHP.increment(300);
    this.bullets.setText('x' + this.nBullets);
  }
}
