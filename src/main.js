import Phaser, { Game } from "phaser";
import Preload from "./scenes/Preload";
import Level1 from "./scenes/Level1";
import MainMenu from "./scenes/MainMenu";
import LevelSelector from "./scenes/LevelSelector";
import Help from "./scenes/Help";
import Pause from "./scenes/Pause";
import UI from "./scenes/UI";
import Controls from "./scenes/Controls";
import PowerUp from "./scenes/PowerUp";
import GameOver from "./scenes/GameOver";
import Prologue from "./scenes/Prologue";
import Lobby from "./scenes/Lobby";
import GameWin from "./scenes/GameWin";


const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1280,
      height: 720,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preload, MainMenu, Help, LevelSelector,Prologue, Lobby, Level1, UI, Pause, Controls, PowerUp, GameOver, GameWin],
};

export default new Phaser.Game(config);
