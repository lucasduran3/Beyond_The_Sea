import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";
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

    this.enemysGroup = this.physics.add.group();
    objectsLayer.objects.forEach((objData)=>{
      const {x = 0, y = 0, name} = objData;
        switch(name){
          case "enemy" : {
            this.enemy = new Enemy(this, x, y, "enemy", 300, this.map);
            this.enemysGroup.add(this.enemy);
            break;
          }
        }
    });

    let spawnPoint = this.map.findObject(
      "objects",
      (obj) => obj.name === "player"
    );

    this.enemyArr = this.enemysGroup.getChildren();

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "player", this.enemyArr);

    this.enemy.setTarget(this.player);

    this.enemyArr.forEach(element => {
      // @ts-ignore
      element.setTarget(this.player);
    });

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
    this.physics.add.collider(wallLayer, this.player.bullets, ()=>{
      this.player.bullets.getFirstAlive().destroy();
    }, null, this);

    this.keyESC= this.input.keyboard.addKey("ESC");

    
    this.scene.launch("UI");

    //horrifi plugin
    const postFxPlugin = this.plugins.get('rexhorrifipipelineplugin');
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
    
    this.enemyArr.forEach(element => {
      element.update();
    });

    if(this.keyESC.isDown){
      this.scene.pause("Level1");
      this.scene.launch("Pause");
    }
    this.scene.setVisible(true, "UI");

    this.isWin();
    this.isOver();
  }

  isWin(){
    const enemysAlives = this.enemysGroup.getMatching('active', true).length;

    if(enemysAlives<=0){
      this.scene.stop("Level1");
      this.scene.start("GameWin");
    }
  }

  isOver(){
    if(this.player.lifes <= 0){
      this.scene.stop("Level1");
      this.scene.start("GameOver");
    }
  }
}
