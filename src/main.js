import Phaser, { Game } from "phaser";
import Preload from "./scenes/Preload";
import Level1 from "./scenes/Level1";
import MainMenu from "./scenes/MainMenu";
import Help from "./scenes/Help";
import Pause from "./scenes/Pause";
import UI from "./scenes/UI";
import Controls from "./scenes/Controls";
import PowerUp from "./scenes/PowerUp";
import GameOver from "./scenes/GameOver";
import GameWin from "./scenes/GameWin";
import SelectLang from "./scenes/SelectLang";
import Bar from "./scenes/Bar";
import BarAnimation from "./scenes/BarAnimation";
import Dialog from "./scenes/Dialog";
import BarWinAnimation from "./scenes/BarWinAnimation";
import FirebasePlugin from "./plugins/FirebasePlugin";


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
  plugins: {
    global : [
      {
        key : "FirebasePlugin",
        plugin : FirebasePlugin,
        start : true,
        mapping : "firebase"
      },
    ],
  },
  scene: [Preload, SelectLang, MainMenu, Help, Level1, BarAnimation, Bar, UI, Pause, Controls, PowerUp, GameOver, GameWin, BarWinAnimation, Dialog],
};

export default new Phaser.Game(config);
