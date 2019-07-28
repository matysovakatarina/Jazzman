import { Interface } from "./interface";
import { System } from "./system";
import { Scale } from "./scale";

export { Jazzman };

class Jazzman {
  constructor() {
    this.interface = new Interface();
    this.system = new System();
    this.methods = {
      scale: new Scale(),
      // chord: new Chord()
    }
  }
}