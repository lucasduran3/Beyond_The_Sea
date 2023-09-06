import Phaser from "phaser";
import Bullet from "./Bullet";

export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.mouseX = 0;
        this.mouseY = 0;
        this.speed = 300;
        this.velocityX = 0;
        this.velocityY = 0;

        scene.input.on('pointerdown', pointer =>{
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
            this.fireBullet();
        });

        scene.input.on('pointermove', pointer =>{
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        });

        this.keys = scene.input.keyboard.addKeys('W,A,S,D');

        // @ts-ignore
        this.body.setCollideWorldBounds(true);

    }

    update(){
        const angle = Phaser.Math.Angle.Between(
            this.mouseX,
            this.mouseY,
            this.x,
            this.y
        );

        this.setRotation(angle - Math.PI /2);

        if (this.keys.W.isDown) {
            this.velocityY = -this.speed;
        } else if (this.keys.S.isDown) {
            this.velocityY = this.speed;
        } else {
            this.velocityY = 0;
        }

        if (this.keys.A.isDown) {
            this.velocityX = -this.speed;
        } else if (this.keys.D.isDown) {
            this.velocityX = this.speed;
        } else {
            this.velocityX = 0;
        }

        // @ts-ignore
        this.body.setVelocity(this.velocityX, this.velocityY);
    }
    
    fireBullet(){
        const speed = 500;
        const angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            this.mouseX,
            this.mouseY
        );

        const bullet = new Bullet(this.scene, this.x, this.y, 'bullet');
        bullet.fire(angle,speed);
    }
}