import { chromatics } from "./chromatics";

export {Scale}

class Scale {
  constructor() {
  }

  scaleRotate(inputStepPattern, fromDg) { //pracuje s formatom stupnice steps [2,2,1,2,2,2,1]
    let outputScale = inputStepPattern;
    let movingParts = outputScale.splice(fromDg - 1);
    outputScale.unshift(...movingParts);
    return outputScale;
  }

  scaleSemitones(sourceOfSteps) {
    let scale = [0]; //prvy "ton"
    for (let i = 1; i < sourceOfSteps.length; i++) {
      scale.push(scale[i - 1] + sourceOfSteps[i - 1]);
    }
    return scale;
  }

  scaleIntervals(sourceOfSemitones) {
    let scale = ["1"];

    let secunda = sourceOfSemitones[1];
    let tercia = sourceOfSemitones[2];
    let quarta = sourceOfSemitones[3];
    let quinta = sourceOfSemitones[4];
    let sexta = sourceOfSemitones[5];
    let septima = sourceOfSemitones[6];

    switch(secunda) {
      case 1 : scale.push("♭2"); break;
      case 2 : scale.push("2"); break;
      case 3 : scale.push("♯2"); break;
      case 4 : scale.push("x2"); break; 
    }
    
    switch(tercia) {
      case 2 : scale.push("♭♭3"); break; 
      case 3 : scale.push("♭3"); break;
      case 4 : scale.push("3"); break;
      case 5 : scale.push("♯3"); break; 
      case 6 : scale.push("x3"); break; 
    }
    
    switch(quarta) {
      case 3 : scale.push("♭♭4"); break; 
      case 5 : scale.push("4"); break;
      case 6 : scale.push("♯4"); break;
      case 4 : scale.push("♭4"); break; 
      case 7 : scale.push("x4"); break;      
    }

    switch(quinta) {
      case 5 : scale.push("♭♭5"); break;
      case 6 : scale.push("♭5"); break;
      case 7 : scale.push("5"); break;
      case 8 : scale.push("♯5"); break;
      case 9 : scale.push("x5"); break;      
    }

    switch(sexta) {
      case 7 : scale.push("♭♭6"); break;
      case 8 : scale.push("♭6"); break;
      case 9 : scale.push("6"); break;
      case 10 : scale.push("♯6"); break;
      case 11 : scale.push("x6"); break;
    }

    switch(septima) {
      case 9 : scale.push("♭♭7"); break;
      case 10 : scale.push("♭7"); break;
      case 11 : scale.push("7"); break;
    }

    return scale;
  }

  scaleTones(sourceOfIntervals, rootToUse) {
    let scale = [rootToUse];
    for (let i = 1; scale.length < 7; i++) {
      scale.push(chromatics[rootToUse][sourceOfIntervals[i]]);
    }
    return scale;
  }

  chordNumerals(sourceOfIntervals) {
    let scale = [];
    for (let i = 0; i < sourceOfIntervals.length; i++) {
      scale[i] = sourceOfIntervals[i].replace("1","I").replace("2","II").replace("3","III").replace("4","IV").replace("5","V").replace("6","VI").replace("7","VII");
    }
    return scale;
  } 
}