import Phaser from "phaser";
import HorrifiPostFxPipeline from "phaser3-rex-plugins/plugins/horrifipipeline";

const HORRIFI_CONFIG = {
  enable: true,
  // Bloom
  bloomRadius: 10,
  bloomIntensity: 0,
  bloomThreshold: 1,
  bloomTexelWidth: 0.5,
  // Chromatic abberation
  chromaticEnable: true,
  chabIntensity: 0.2,
  // Vignette
  vignetteStrength: 1,
  vignetteIntensity: 0.82,
  // Noise
  noiseEnable: true,
  noiseStrength: 0.1,
  seed: 0.63,
  // VHS
  vhsEnable: true,
  vhsStrength: 0.22,
  // Scanlines
  scanlinesEnable: false,
  scanStrength: 0.1,
  // CRT
  crtWidth: 5,
  crtHeight: 5,
};

export default class HorroriFi extends Phaser.Scene {
  constructor(scene) {
    super("HorroriFi");
    this.scene = scene;
  }

  create() {
    const camera = this.scene?.cameras?.main;

    if (!camera) {
      return null;
    }

    // @ts-ignore
    camera.setPostPipeline(HorrifiPostFxPipeline);

    // @ts-ignore
    const postFxPipeline = camera.postPipelines?.[camera.postPipelines.length - 1] ?? null;

    if (postFxPipeline) {
      Object.assign(postFxPipeline, HORRIFI_CONFIG);
    }

    return postFxPipeline;
  }
}
