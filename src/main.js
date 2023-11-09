import Phaser, { Game } from "phaser";
import Preload from "./scenes/Preload";
import Level1 from "./scenes/Level1";
import MainMenu from "./scenes/MainMenu";
import Help from "./scenes/Help";
import Pause from "./scenes/Pause";
import UI from "./scenes/UI";
import GameWin from "./scenes/GameWin";
import SelectLang from "./scenes/SelectLang";
import Bar from "./scenes/Bar";
import BarAnimation from "./scenes/BarAnimation";
import Dialog from "./scenes/Dialog";
import BarWinAnimation from "./scenes/BarWinAnimation";
import FirebasePlugin from "./plugins/FirebasePlugin";
import MainMusic from "./scenes/MainMusic";
import AmbientSound from "./scenes/AmbientSound";
import FinalLevel from "./scenes/FinalLevel";
import FinalLevelAnimation from "./scenes/FinalLevelAnimation";
import Intro from "./scenes/Intro";
import IntroMusic from "./scenes/IntroMusic";
import Boss1Music from "./scenes/Boss1Music";
import FinalWin from "./scenes/FinalWin";
import Credits from "./scenes/Credits";


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
  scene: [Preload, MainMusic, IntroMusic,Boss1Music, AmbientSound, SelectLang, MainMenu, Intro, Level1, BarAnimation, Bar, FinalLevel, UI, Pause, GameWin, FinalWin, BarWinAnimation, FinalLevelAnimation, Dialog, Help, Credits],
};

export default new Phaser.Game(config);
