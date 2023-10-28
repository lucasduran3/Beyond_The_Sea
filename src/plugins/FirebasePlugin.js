import Phaser from "phaser";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDhsUWn67rsqqJxIAwGTi71T8DM3lru7FI",
  authDomain: "beyond-the-sea.firebaseapp.com",
  projectId: "beyond-the-sea",
  storageBucket: "beyond-the-sea.appspot.com",
  messagingSenderId: "376376636204",
  appId: "1:376376636204:web:463de4d3a5cc611950f289"
};

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin{
    constructor(pluginManager){

        super(pluginManager);

        this.app = initializeApp(firebaseConfig);
    }
}