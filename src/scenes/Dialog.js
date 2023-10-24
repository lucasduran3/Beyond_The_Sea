import Phaser from "phaser";

export default class Dialog extends Phaser.Scene{
    constructor(){
        super("Dialog");

    }
    init(data){
        this.content = data.content;
        this.sceneToStop = data.sceneToStop;
        this.sceneToStart = data.sceneToStart;
        console.log(this.content);
    }

    create(){
        this.c = 0;
        this.r = this.add.rectangle(0,1000,5000,650,0x000).setScrollFactor(0);

        this.text = this.add.text(300,750,"",{
            fontSize : "30px",
            color : "#fff",
            align : "left"
        }).setScrollFactor(0);

        this.writeText();
        const arrow = this.add.image(1520,900, 'arrow').setScrollFactor(0).setInteractive({useHandCursor : true});
        arrow.on('pointerdown', ()=>{
            this.writeText();
        });
        
    }

    writeText(){
        this.text.setText(this.content[this.c]);
        if(this.c<this.content.length){
            this.c++;
        } else {
            this.scene.stop("Dialog");
            this.scene.stop(this.sceneToStop);
            this.scene.start(this.sceneToStart); 
            this.scene.launch("UI");
        }
    }

}