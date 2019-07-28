export {DegreeLine}

class DegreeLine {
  constructor() {
    this.scale = {
      steps: [],
      semitones: [],
      intervals: [],
      tones: [],
      chordNumerals: [],
    };
    this.chord = {
      fifth: {
        intervals: [],
        tones: [],
        steps: [],
        distances: [],
        structure: [],
        tag: "",
      },
      sixth: {
        intervals: [],
        tones: [],
        steps: [],
        distances: [],
        structure: [],
        tag: "",
      },
      seventh: {
        intervals: [],
        tones: [],
        steps: [],
        distances: [],
        structure: [],
        tag: "",
      },
      sus4: {
        intervals: [],
        tones: [],
        steps: [],
        distances: [],
        structure: [],
        tag: "",
      },
      "7sus4": {
        intervals: [],
        tones: [],
        steps: [],
        distances: [],
        structure: [],
        tag: "",
      },
    };
  }   
}