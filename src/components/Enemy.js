import Phaser from "phaser";
import EasyStar from "easystarjs";

export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,speed,map){
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.scene = scene;
        this.speed = speed;
        this.target;
        this.map = map;
        this.damage = 1;
        this.lifes = 10;
        this.c = 0;
        this.isMoving = true;
        this.isAttacking = false;
        this.isDead = false;
        
        // @ts-ignore
        this.body.setCircle(45,45,55);

        // @ts-ignore
        this.body.setCollideWorldBounds(true);

        this.easystar = new EasyStar.js();
        const grid = [];
        for(let y = 0; y<this.map.height; y++){
            const row = [];
            for(let x = 0; x<this.map.width; x++){
                const tile = this.map.getTileAt(x,y);
                row.push(tile && tile.properties.colision == true ? 1 : 0);
            }
            grid.push(row);
        }

        console.log(grid);
        this.easystar.setGrid(grid);
        this.easystar.setAcceptableTiles([0]);
        this.easystar.enableDiagonals();

        this.anims.create({
            key:"walk",
            frames : this.anims.generateFrameNumbers("enemy",{start : 14, end:25}),
            frameRate : 20,
            repeat : 1
          });
      
          this.anims.create({
            key:"none",
            frames : [{key:"enemy", frame:0}],
          });

          this.anims.create({
            key:"hit",
            frames : this.anims.generateFrameNumbers("enemy",{start : 0, end:10}),
            frameRate : 40,
            repeat : 1
          });
    }

    update(){

        if( Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= 800 && this.isMoving){
        this.findEnemyPath(this.isMoving); 
        
        } else {
            this.anims.play("walk", false);
            // @ts-ignore
            this.body.setVelocity(0);
        }

       this.enemyDeath();

       this.scene.physics.add.collider(this.body, this.target);    

       if(Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 100 && this.active == true){
        this.attack();
        this.anims.play("hit", true);  
       } else {
        this.isAttacking = false;
        this.anims.play("walk",true);  
       }


    }

    setTarget(target){
        this.target = target;
    }

    findEnemyPath(isMoving){
        const playerTile = this.map.worldToTileXY(this.target.x, this.target.y);
        const enemyTile = this.map.worldToTileXY(this.x, this.y);

        this.easystar.findPath(
            enemyTile.x,
            enemyTile.y,
            playerTile.x,
            playerTile.y,
            (path) =>{
                if(path && path.length > 1){
                    const nextTile = path[1];
                    const targetX = nextTile.x * this.map.tileWidth + this.map.tileWidth / 2;
                    const targetY = nextTile.y * this.map.tileHeight + this.map.tileHeight / 2;
                      const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
                        this.setRotation(angle + Math.PI / 2);
                    
                        // @ts-ignore
                        this.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);
                }
            }
        );
        this.easystar.calculate();  
    }

    attack(){
        this.isAttacking = true;
        this.target.looseLife(this.damage);
    }

    looseLife(){
        this.lifes--;
        this.scene.time.addEvent({
            delay: 100,
            callback: ()=>{this.clearTint()},
            callbackScope: this
        });
        this.setTint(0xff0000);
    }

    enemyDeath(){
        if(this.lifes<=0 && this.isDead == false){
            // @ts-ignore
            this.body.destroy();
            this.setVisible(false);
            this.active = false;

            this.scene.enemyDropObjects(this.x, this.y);

            this.isDead = true;

            this.scene.kills++;
        }
    }

    freeze(){
        // @ts-ignore
        this.body.stop();

        this.setTint(0x00cdff);
        // @ts-ignore
        this.body.setVelocity(0);
        this.isMoving = false;

        this.scene.time.addEvent({
            delay: 2500, 
            callback: () => {
                this.setTint();
                this.isMoving = true;
            },
            callbackScope: this
        });
    }
}