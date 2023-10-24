import Phaser from "phaser";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";
import { getPhrase } from "../services/translation";

export default class BarAnimation extends Phaser.Scene{
    constructor(){
        super("BarAnimation");
    }

    init(data){
        this.keyDoor1 = data.keyDoor1;
        this.keyDoor2 = data.keyDoor2;
        this.keyDoor3 = data.keyDoor3;
        this.keyDoor4 = data.keyDoor4;
        this.weaponsGroup = data.weaponsGroup;
        this.playerLifes = data.playerLifes;
        this.playerMana = data.playerMana;
    }

    create(){
        this.cameras.main.fadeIn(500);
        this.map = this.make.tilemap({key:"map-mercado-bar"});
        const floorL = this.map.addTilesetImage("floor", "floor");
        //const wallL = this.map.addTilesetImage("wall", "wall");
        //const doorL = this.map.addTilesetImage("door", "door");
        const barTableL = this.map.addTilesetImage("bar-table", "bar-table");
    
        const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
       // const doorLayer = this.map.createLayer("door", doorL, 0, 0);
       // const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
        const barTableLayer = this.map.createLayer("bar-table", barTableL, 0, 0);

    
        this.boss = this.physics.add.sprite(270,662,"enemy").setAngle(90);

        this.player = this.physics.add.sprite(1348,708,"player").setAngle(-90);

        const postFxPlugin = this.plugins.get("rexhorrifipipelineplugin");
        const effect = this.cameras.main.setPostPipeline(HorrifiPostFxPipeline);
    
        // @ts-ignore
        const postFxPipeline = postFxPlugin.add(effect, {
          enable: true,
    
          // Bloom
          bloomRadius: 10,
          bloomIntensity: 0,
          bloomThreshold: 1,
          bloomTexelWidth: 0.5,
    
          // Chromatic abberation
          chromaticEnable: true,
          chabIntensity: 0.2,
    
          // Vignette
          vignetteStrength: 1,
          vignetteIntensity: 0.82,
    
          // Noise
          noiseEnable: true,
          noiseStrength: 0.1,
          seed: 0.63,
    
          // VHS
          vhsEnable: true,
          vhsStrength: 0.22,
    
          // Scanlines
          scanlinesEnable: false,
          scanStrength: 0.1,
    
          //CRT
          crtWidth: 5,
          crtHeight: 5,
        });
        this.cameras.main.centerOn(this.player.x, this.player.y);

        this.cameras.main.pan(270, 662, 2000);

        this.time.addEvent({ 
            delay: 2500, 
            callback: ()=>{
                
            const content = [
                getPhrase('Oh... Quien te dejo entrar?!'),
                getPhrase('No permitiré que nadie arruine nuestro pequeño momento de felicidad...'),
                getPhrase('Este es el único lugar donde podemos calmar el daño...'),
                getPhrase('Las voces en mi cabeza...'),
                getPhrase('Pero ustedes nunca tienen suficiente de nosotros!'),
                getPhrase('Muchachos, atrapen a esta mascota!')
            ];
            
            this.scene.launch("Dialog",{
                content : content,
                sceneToStop : "BarAnimation",
                sceneToStart : "Bar",
                keyDoor1: this.keyDoor1,
                keyDoor2: this.keyDoor2,
                keyDoor3: this.keyDoor3,
                keyDoor4: this.keyDoor4,
                weaponsGroup: this.weaponsGroup,
                playerLifes : this.playerLifes,
                playerMana : this.playerMana
            });
        }, 
            callbackScope: this, 
            repeat : 0 
        });
    }

    update(){
        
    }
}