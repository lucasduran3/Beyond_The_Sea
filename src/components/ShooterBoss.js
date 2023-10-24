import Phaser from "phaser";
import Bullet from "./Bullet";

export default class ShooterBoss extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture, target){
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        // @ts-ignore
        this.body.setCollideWorldBounds(true);

        this.target = target;

        this.bullets = this.scene.physics.add.group();

        this.lifes = 5;
    }

    create(){
        this.scene.time.addEvent({ delay: 2000, callback: this.shootBullet, callbackScope: this, loop: true })
    }

    update(){
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y) + Math.PI / 2;
        this.shootAtPlayer();

    }

    shootBullet(){
        // @ts-ignore
        const bullet = new Bullet(this.scene, this.x, this.y, "bullet");
        this.bullets.add(bullet);

        const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
        bullet.fire(angle,500); 
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

    shootAtPlayer(){
        this.scene.physics.add.overlap(this.target, this.bullets, ()=>{
            this.target.looseLife(20);
            this.bullets.getFirstAlive().destroy();
            console.log("fdf");
        }, null, this);
    }
}