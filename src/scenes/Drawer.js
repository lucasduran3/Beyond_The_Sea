import Phaser from "phaser";
import events from "./EventCenter";

export default class Drawer extends Phaser.Scene{
    constructor(){
        super("Drawer")
    }

    init(data){
        this.nKits = Phaser.Math.Between(1,4);
        this.nChips = Phaser.Math.Between(1,4);
        this.nBullets = Phaser.Math.Between(15,30);
        this.player = data.player;
    }

    create(){
        this.kitsGroup = this.physics.add.staticGroup();
        this.chipsGroup = this.physics.add.staticGroup();
        this.bulletsGroup = this.physics.add.staticGroup();

        this.background = this.add.sprite(950,550,'drawerBg').setScale(3);

        for(let i = 0; i<this.nKits; i++ ){
            this.kit = this.physics.add.sprite(600,225,'revolver').setInteractive({useHandCursor : true});
            this.kitsGroup.add(this.kit);
        }

        for(let i = 0; i<this.nChips; i++ ){
            this.chip = this.physics.add.sprite(600,525,'rifle').setInteractive({useHandCursor : true});
            this.chipsGroup.add(this.chip);
        }

        for(let i = 0; i<this.nBullets; i++ ){
            this.bullet = this.physics.add.sprite(600,925,'bullet').setInteractive({useHandCursor : true});
            this.bulletsGroup.add(this.bullet);
        }


        this.nKitText = this.add.text(800,225,'x'+this.nKits,{
            fontSize : '40px',
            color : "#fff"
        });

        this.nChipText = this.add.text(800,525,'x'+this.nChips,{
            fontSize : '40px',
            color : "#fff"
        });

        this.nBulletText = this.add.text(800,925,'x'+this.nBullets,{
            fontSize : '40px',
            color : "#fff"
        });

        this.kit.on('pointerdown',()=>{
            this.kitsGroup.getFirstAlive().destroy();
            this.nKits--;
            this.nKitText.setText('x'+this.nKits);
            events.emit('updateKits', {
                isIncrease : true,
            });
        });

        this.chip.on('pointerdown',()=>{
            this.chipsGroup.getFirstAlive().destroy();
            this.nChips--;
            this.nChipText.setText('x'+this.nChips);
            events.emit('updateChips',{
                isIncrease : true,
            })
        });

        this.bullet.on('pointerdown',()=>{
            this.bulletsGroup.getFirstAlive().destroy();
            this.nBullets--;
            this.nBulletText.setText('x'+this.nBullets);
            this.player.incrementBullets();
            events.emit("updateBullets",{
                isIncrease: true
            });
        });

        this.exitButton = this.add.text(1200,940,"Exit",{
            fontSize: "30px",
            color : "#fff"
            }
        ).setInteractive({useHandCursor : true});

        this.exitButton.on('pointerdown',()=>{
            this.scene.sleep("Drawer");
            this.scene.setVisible(false);
            this.scene.resume("Level1");
        });
    }
}