import Phaser from "phaser";
import Player from "../components/Player";
import Enemy from "../components/Enemy";
import events from "../scenes/EventCenter";
import { revolver, rifle } from "../components/weapons";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
    this.level = "lobby";
    this.keyDoor1 = false;
    this.keyDoor2 = false;
    this.keyDoor3 = false;
    this.keyDoor4 = false;

    this.weaponsGroup = {};

    this.nBullets;
  }

  init(data){
   this.level = data.level || "lobby";
   this.keyDoor1 = data.keyDoor1 || false;
   this.keyDoor2 = data.keyDoor2 || false;
   this.keyDoor3 = data.keyDoor3 || false;
   this.keyDoor4 = data.keyDoor4 || false;

   this.weaponsGroup = data.weaponsGroup || {};

   this.nBullets = data.nBullets || 0;
  }

  create() {
    this.collisionBetweenPlayerEnemy = false;
    this.map = this.make.tilemap({ key: "map-"+this.level });

    const floorL = this.map.addTilesetImage("floor", "floor");
    const wallL = this.map.addTilesetImage("wall", "wall");
    const doorL = this.map.addTilesetImage("door", "door");

    const floorLayer = this.map.createLayer("floor", floorL, 0, 0);
    const doorLayer = this.map.createLayer("door", doorL, 0, 0);
    const wallLayer = this.map.createLayer("wall", wallL, 0, 0);

    const objectsLayer = this.map.getObjectLayer("objects");

    this.enemysGroup = this.physics.add.group();
    objectsLayer.objects.forEach((objData)=>{
      const {x = 0, y = 0, name} = objData;
        switch(name){
          case "enemy" : {
            this.enemy = new Enemy(this, x, y, "enemy", 300, this.map);
            console.log(this.enemy);
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

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "player", this.enemyArr, this.weaponsGroup, this.nBullets);

    this.bulletsGroup = this.physics.add.group();
    objectsLayer.objects.forEach((objData)=>{
      const {x = 0, y = 0, name} = objData;
        switch(name){
          case "key-door1" : {
            this.key_door1_sprite = this.physics.add.sprite(x, y, "key");
            break;
          } case "revolver" : {
            this.revolverSprite = this.physics.add.sprite(x, y, "revolver");
            break;
          } case "rifle" : {
            this.rifleSprite = this.physics.add.sprite(x, y, "rifle");
            break;
          } case "bullet" : {
            this.bulletToCollect = this.physics.add.sprite(x,y, "bulletToCollect");
            this.bulletsGroup.add(this.bulletToCollect);
          }
        }
    });    

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
    doorLayer.setCollisionByProperty({ colision: true });
    this.physics.add.collider(wallLayer, this.player);
    this.physics.add.collider(doorLayer, this.player, ()=>{this.scene.start("Level1",{
    level : "level1", 
    player : this.player,
    keyDoor1 : this.keyDoor1,
    keyDoor2 : this.keyDoor2,
    keyDoor3 : this.keyDoor3,
    keyDoor4 : this.keyDoor4,
    weaponsGroup : this.weaponsGroup,
    nBullets : this.nBullets});
    }, 
    ()=>this.keyDoor1 == true, this);

    this.physics.add.collider(wallLayer, this.player.bullets, ()=>{
      this.player.bullets.getFirstAlive().destroy();
    }, null, this);
  
    this.keyESC= this.input.keyboard.addKey("ESC");

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
    this.physics.add.overlap(this.player, this.key_door1_sprite, ()=>{
      this.key_door1_sprite.destroy(); 
      this.keyDoor1 = true
      events.emit("update",{key1 : "Key 1"});
      }, null, this);

    this.physics.add.overlap(this.player, this.revolverSprite, ()=>{
      this.weaponsGroup['revolver'] = revolver;
      this.player.addWeapon(revolver);
      this.revolverSprite.destroy(); 
      }, null, this);

      
    this.physics.add.overlap(this.player, this.rifleSprite, ()=>{
      this.weaponsGroup['rifle'] = rifle;
      this.player.addWeapon(rifle);
      this.rifleSprite.destroy(); 
      }, null, this);

    this.physics.add.overlap(this.player, this.bulletsGroup, this.collectBullet, null, this);
  

    this.player.update(time, delta);
    
    this.enemyArr.forEach(element => {
      element.update();
    });

    if(this.keyESC.isDown){
      this.scene.pause("Level1");
      this.scene.launch("Pause");
    }

    this.scene.setVisible(true, "UI");

    this.isOver();

   console.log(this.player.nBullets);
  }

  isOver(){
    if(this.player.lifes <= 0){
      this.scene.stop("Level1");
      this.scene.start("GameOver");
    }
  }

  collectBullet(player, bullet){
    bullet.destroy();
    this.nBullets++;
    this.player.incrementBullets();
  }
}
