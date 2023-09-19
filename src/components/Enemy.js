import Phaser from "phaser";
import EasyStar from "easystarjs";

export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,speed,target,map){
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.speed = speed;
        this.target = target;
        this.map = map;

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

        this.easystar.setGrid(grid);
        this.easystar.setAcceptableTiles([0]);
        this.easystar.enableDiagonals();
    }

    update(){
        this.findEnemyPath();
    }

    findEnemyPath(){
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
}