import Phaser from "phaser";

export default class HealthBar{
    constructor(scene, x, y, value){
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = value;

        this.draw();

        scene.add.existing(this.bar);
    }

    draw(){
        this.bar.clear();
        this.bar.fillStyle(0x00ff00);
        this.bar.fillRect(this.x , this.y , this.value, 20);
    }
    
    decrease(amount){
        this.value -= amount;

        if(this.value<0){
            this.value = 0;
        }

        this.draw();
    }

}