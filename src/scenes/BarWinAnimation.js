import Phaser from "phaser";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";

export default class BarWinAnimation extends Phaser.Scene{
    constructor(){
        super("BarWinAnimation");
    }

    init(data){
        this.playerX = data.playerX;
        this.playerY = data.playerY;
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
                'Phaser is a fast, free, and fun open source HTML5 game framework\n',
                'that offers WebGL and DynamicText rendering across desktop and mobile web browsers.\n',
                'Games can be compiled to iOS, Android and native apps by using 3rd party tools.\n',
                'You can use JavaScript or TypeScript for development.'
            ];
            
            this.scene.launch("Dialog",{
                content : content,
                sceneToStart : "Level1",
                sceneToStop : "BarWinAnimation"
            });
        }, 
            callbackScope: this, 
            repeat : 0 
        });
    }

    update(){
        
    }
}