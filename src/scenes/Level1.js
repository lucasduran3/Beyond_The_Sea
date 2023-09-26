import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";
import events from "./EventCenter";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
    
  }

  create() {
    this.collisionBetweenPlayerEnemy = false;
    this.map = this.make.tilemap({ key: "map" });
    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);
    const objectsLayer = this.map.getObjectLayer("objects");

    console.log(floorLayer);
    console.log(objectsLayer);

    const spawnPoint = this.map.findObject(
      "objects",
      (obj) => obj.name === "player"
    );

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "player");

    this.enemy = new Enemy(this, 1500, 800, "player", 200, this.player, this.map);

    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    wallLayer.setCollisionByProperty({ colision: true });
    this.physics.add.collider(wallLayer, this.player);


    this.keyESC= this.input.keyboard.addKey("ESC");

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

    this.scene.launch("UI");

    //horrifi plugin
    const postFxPlugin = this.plugins.get('rexhorrifipipelineplugin');
    console.log(postFxPlugin);
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
        chromaticEnable : true,
        chabIntensity: 0.1,

        // Vignette
        vignetteStrength: 1,
        vignetteIntensity: 0.7,

        // Noise
        noiseEnable : true,
        noiseStrength: 0.05,
        seed: 0.63,

        // VHS
        vhsEnable : true,
        vhsStrength: 0.22,

        // Scanlines
        scanlinesEnable : false,
        scanStrength: 0.1,

        //CRT
        crtWidth: 5,
        crtHeight: 5,
    });
  }

  update(time, delta) {
    this.player.update(time, delta);
    this.enemy.update();

    if(this.keyESC.isDown){
      this.scene.pause("Level1");
      this.scene.launch("Pause");
    }
    this.scene.setVisible(true, "UI");

    this.physics.add.collider(this.player, this.enemy, this.change, null, this);
  }
  change(){
    this.collisionBetweenPlayerEnemy = true;
    this.player.looseLife;
  }
}
