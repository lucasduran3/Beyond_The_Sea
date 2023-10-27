import Phaser from "phaser";
import events from "./EventCenter";

export default class Drawer extends Phaser.Scene{
    constructor(){
        super("Drawer")
    }

    init(data){
        this.nKits = Phaser.Math.Between(2,4);
        this.nChips = Phaser.Math.Between(1,3);
        this.nBullets = Phaser.Math.Between(37,60);
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
            events.emit('updatePlayerKits', {
                isIncrease : true,
                ammount : this.nKits
            });
            this.nKits = 0;
            this.nKitText.setText('x'+this.nKits);
        });

        this.chip.on('pointerdown',()=>{       
            events.emit('updatePlayerChips',{
                isIncrease : true,
                ammount : this.nChips
            });
            this.nChips = 0;
            this.nChipText.setText('x'+this.nChips);
        });

        this.bullet.on('pointerdown',()=>{
            this.player.incrementBullets(this.nBullets);

            events.emit("updateBullets",{
                isIncrease: true,
                ammount : this.nBullets
            });
            this.nBullets = 0;
            this.nBulletText.setText('x'+this.nBullets);
        });

        this.exitButton = this.add.text(1200,940,"Exit",{
            fontSize: "30px",
            color : "#fff"
            }
        ).setInteractive({useHandCursor : true});

        this.exitButton.on('pointerdown',()=>{
            this.scene.stop("Drawer");
            this.scene.setVisible(false);
            this.scene.resume("Level1");
        });
    }
}