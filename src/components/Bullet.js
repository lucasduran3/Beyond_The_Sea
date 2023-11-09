import Phaser from "phaser";

export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    /* scene.add.existing(this); se utiliza para agregar el objeto de juego (en este caso, una instancia de la clase Bullet) a la escena actual de Phaser. 
        Esto es necesario para que la escena pueda administrar y renderizar el objeto de juego de manera apropiada.
        Cuando se crea un objeto de juego, como una instancia de la clase Bullet, inicialmente no se asocia automáticamente con ninguna escena. 
        Por lo tanto, debes usar scene.add.existing(this) para agregar explícitamente el objeto a la escena actual. */
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.velocityX = 0;
    this.velocityY = 0;
  }

  fire(angle, speed) {
    this.velocityX = Math.cos(angle) * speed;
    this.velocityY = Math.sin(angle) * speed;
    // @ts-ignore
    this.body.setVelocity(this.velocityX, this.velocityY);

    this.setRotation(angle - Math.PI / 2);
  }
}
