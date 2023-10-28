import Phaser from "phaser";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";
import { getPhrase } from "../services/translation";

export default class BarWinAnimation extends Phaser.Scene{
    constructor(){
        super("BarWinAnimation");
    }

    init(data){
        this.playerX = data.playerX;
        this.playerY = data.playerY;
        this.level = data.level;
        this.weaponsGroup = data.weaponsGroup || {};
        this.keyDoor1 = data.keyDoor1;
        this.keyDoor2 = data.keyDoor2;
        this.keyDoor3 = data.keyDoor3;
        this.keyDoor4 = data.keyDoor4;
        this.keyBar = data.keyBar;
        this.weaponsGroup = data.weaponsGroup;
        this.playerObj = data.playerObj;
    }

    create(){
        this.cameras.main.fadeIn(500);
        this.map = this.make.tilemap({key:"map-mercado-bar"});
        const floorL = this.map.addTilesetImage("floor", "floor");
        const wallL = this.map.addTilesetImage("wall", "wall");
        const barTableL = this.map.addTilesetImage("bar-table", "bar-table");
    
        const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
        const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
        const barTableLayer = this.map.createLayer("bar-table", barTableL, 0, 0);

    
        this.boss = this.physics.add.sprite(270,662,"enemy").setAngle(90);

        this.player = this.physics.add.sprite(this.playerX,this.playerY,"player").setAngle(-90);

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
                '...\n',
                getPhrase('No...'),
                getPhrase('No lo entiendo...'),
                getPhrase('Como podes vivir asi?'),
                getPhrase('Sin saber quien sos?'),
                getPhrase('Con tu identidad a la merced de ese cerdo?'),
                getPhrase('... NO! ... no puedo.'),
                getPhrase('No voy a dejar que una rata de laboratorio decida mi destino'),
                getPhrase('...Yo si soy mi dueño.')
            ];
            
            this.scene.launch("Dialog",{
                content : content,
                sceneToStart : "Level1",
                sceneToStop : "BarWinAnimation",
                level : this.level,
                keyDoor1: this.keyDoor1,
                keyDoor2: this.keyDoor2,
                keyDoor3: this.keyDoor3,
                keyDoor4: this.keyDoor4,
                keyBar : this.keyBar,
                weaponsGroup: this.weaponsGroup,
                playerObj : this.playerObj
            });
        }, 
            callbackScope: this, 
            repeat : 0 
        });
        
        this.scene.setVisible(false, "UI");
    }

    update(){
        
    }
}