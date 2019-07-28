import _ from "lodash";

import { DegreeLine } from "./degreeLine";
import { scalePatterns, chordPatterns } from "./patterns";
import { chordSpecies } from "./structure";
import {fixedScaleLength} from "./interface";

export {System}

class System {
  constructor() { //rootnote, fromDegree, scaleType z jazzman.interface
    this.degrees = []; //metoda fillDegreeLines sem napusuje jednotlive stupne obsahujuce danu stupnicu aj akord
    this.chordSpecies = Object.values(chordSpecies); //ostane arr s hodnotami
    this.fillDegreeLines();
  }

  fillDegreeLines() { //len vytvori prazdne struktury pri inicializacii
    for (let i = 0; i < fixedScaleLength; i++) {
      this.degrees[i] = new DegreeLine();
    }
  }

  updateSystem(rn, fd, st, scaleMethods) { //spusta sa na konci interface.clickButton()
    if (rn && fd && st) {
      this.updateScales(rn, fd, st, scaleMethods);
      this.updateChords();
    } else { //ked neboli definovane, vyhazovalo to error
      return;
    }
  }

  updateScales(rn, fd, st, scaleMethods) {
    //vytvaranie stupnic na prvom stupni...
    this.degrees[0].scale.steps = scaleMethods.scaleRotate([...scalePatterns[st]], fd); //input step pattern, from degree
    this.degrees[0].scale.semitones = scaleMethods.scaleSemitones([...this.degrees[0].scale.steps]); 
    this.degrees[0].scale.intervals = scaleMethods.scaleIntervals([...this.degrees[0].scale.semitones]); 
    this.degrees[0].scale.tones = scaleMethods.scaleTones([...this.degrees[0].scale.intervals], rn); 
    this.degrees[0].scale.chordNumerals = scaleMethods.chordNumerals([...this.degrees[0].scale.intervals]); 
    // console.log(this.degrees[0].scale.intervals, this.degrees[0].scale.tones);

    //...a na ostatnych stupnoch
    for (let i = 1; i < fixedScaleLength; i++) {
      this.degrees[i].scale.steps = scaleMethods.scaleRotate([...this.degrees[i - 1].scale.steps], 2); //input step pattern, from degree
      this.degrees[i].scale.semitones = scaleMethods.scaleSemitones([...this.degrees[i].scale.steps]); 
      this.degrees[i].scale.intervals = scaleMethods.scaleIntervals([...this.degrees[i].scale.semitones]); 
      this.degrees[i].scale.tones = scaleMethods.scaleRotate([...this.degrees[i - 1].scale.tones], 2); 
      this.degrees[i].scale.chordNumerals = scaleMethods.scaleRotate([...this.degrees[i - 1].scale.chordNumerals], 2); 
    
      //aktualizacia rootNote a fromDegree pred dalsou iteraciou
      rn = this.degrees[0].scale.tones[i];
      fd == fixedScaleLength ? fd = 1 : fd++;
      // console.log(this.degrees[i].scale.intervals, this.degrees[i].scale.tones);
    }
  }

  updateChords() {
    for (let i = 0; i < fixedScaleLength; i++) {
      //intervals
      this.degrees[i].chord.fifth.intervals = ["1"];
      this.degrees[i].chord.fifth.intervals.push(this.degrees[i].scale.intervals[2], this.degrees[i].scale.intervals[4]);
      this.degrees[i].chord.sus4.intervals = ["1"];
      this.degrees[i].chord.sus4.intervals.push(this.degrees[i].scale.intervals[3], this.degrees[i].scale.intervals[4]);
      this.degrees[i].chord.sixth.intervals = ["1"];
      this.degrees[i].chord.sixth.intervals.push(this.degrees[i].scale.intervals[2], this.degrees[i].scale.intervals[4], this.degrees[i].scale.intervals[5]);
      this.degrees[i].chord.seventh.intervals = ["1"];
      this.degrees[i].chord.seventh.intervals.push(this.degrees[i].scale.intervals[2], this.degrees[i].scale.intervals[4], this.degrees[i].scale.intervals[6]);
      this.degrees[i].chord[chordSpecies.SUS47].intervals = ["1"];
      this.degrees[i].chord[chordSpecies.SUS47].intervals.push(this.degrees[i].scale.intervals[3], this.degrees[i].scale.intervals[4], this.degrees[i].scale.intervals[6]);
    
      //semitones
      this.degrees[i].chord.fifth.semitones = [];
      this.degrees[i].chord.fifth.semitones.push(this.degrees[i].scale.semitones[2], this.degrees[i].scale.semitones[4]);
      this.degrees[i].chord.sus4.semitones = [];
      this.degrees[i].chord.sus4.semitones.push(this.degrees[i].scale.semitones[3], this.degrees[i].scale.semitones[4]);
      this.degrees[i].chord.sixth.semitones = [];
      this.degrees[i].chord.sixth.semitones.push(this.degrees[i].scale.semitones[2], this.degrees[i].scale.semitones[4], this.degrees[i].scale.semitones[5]);
      this.degrees[i].chord.seventh.semitones = [];
      this.degrees[i].chord.seventh.semitones.push(this.degrees[i].scale.semitones[2], this.degrees[i].scale.semitones[4], this.degrees[i].scale.semitones[6]);
      this.degrees[i].chord[chordSpecies.SUS47].semitones = [];
      this.degrees[i].chord[chordSpecies.SUS47].semitones.push(this.degrees[i].scale.semitones[3], this.degrees[i].scale.semitones[4], this.degrees[i].scale.semitones[6]);
    
      //distances
      this.degrees[i].chord.fifth.distances = [this.degrees[i].scale.semitones[2]];
      this.degrees[i].chord.fifth.distances.push(this.degrees[i].scale.semitones[4] - this.degrees[i].scale.semitones[2]);
      this.degrees[i].chord.fifth.distances.push(12 - this.degrees[i].scale.semitones[4]);
      this.degrees[i].chord.sus4.distances = [this.degrees[i].scale.semitones[3]];
      this.degrees[i].chord.sus4.distances.push(this.degrees[i].scale.semitones[4] - this.degrees[i].scale.semitones[3]);
      this.degrees[i].chord.sus4.distances.push(12 - this.degrees[i].scale.semitones[4]);
      this.degrees[i].chord.sixth.distances = [this.degrees[i].scale.semitones[2]];
      this.degrees[i].chord.sixth.distances.push(this.degrees[i].scale.semitones[4] - this.degrees[i].scale.semitones[2]);
      this.degrees[i].chord.sixth.distances.push(this.degrees[i].scale.semitones[5] - this.degrees[i].scale.semitones[4]);
      this.degrees[i].chord.sixth.distances.push(12 - this.degrees[i].scale.semitones[5]);
      this.degrees[i].chord.seventh.distances = [this.degrees[i].scale.semitones[2]];
      this.degrees[i].chord.seventh.distances.push(this.degrees[i].scale.semitones[4] - this.degrees[i].scale.semitones[2]);
      this.degrees[i].chord.seventh.distances.push(this.degrees[i].scale.semitones[6] - this.degrees[i].scale.semitones[4]);
      this.degrees[i].chord.seventh.distances.push(12 - this.degrees[i].scale.semitones[6]);
      this.degrees[i].chord[chordSpecies.SUS47].distances = [this.degrees[i].scale.semitones[3]];
      this.degrees[i].chord[chordSpecies.SUS47].distances.push(this.degrees[i].scale.semitones[4] - this.degrees[i].scale.semitones[3]);
      this.degrees[i].chord[chordSpecies.SUS47].distances.push(this.degrees[i].scale.semitones[6] - this.degrees[i].scale.semitones[4]);
      this.degrees[i].chord[chordSpecies.SUS47].distances.push(12 - this.degrees[i].scale.semitones[6]);

      //structure
      for (let j = 0; j < this.chordSpecies.length; j++) {
        this.degrees[i].chord[this.chordSpecies[j]].structure = this.degrees[i].chord[this.chordSpecies[j]].distances.map(el => {
          switch(el) {
            case 1 : return "ii";
            case 2 : return "II";
            case 3 : return "m";
            case 4 : return "v";
            case 5 : return "4";
            case 6 : return "T";
            case 7 : return "q";
          }
        });
      }

      //tones 
      this.degrees[i].chord.fifth.tones = [this.degrees[i].scale.tones[0]];
      this.degrees[i].chord.fifth.tones.push(this.degrees[i].scale.tones[2], this.degrees[i].scale.tones[4]);
      this.degrees[i].chord.sus4.tones = [this.degrees[i].scale.tones[0]];
      this.degrees[i].chord.sus4.tones.push(this.degrees[i].scale.tones[3], this.degrees[i].scale.tones[4]);
      this.degrees[i].chord.sixth.tones = [this.degrees[i].scale.tones[0]];
      this.degrees[i].chord.sixth.tones.push(this.degrees[i].scale.tones[2], this.degrees[i].scale.tones[4], this.degrees[i].scale.tones[5]);
      this.degrees[i].chord.seventh.tones = [this.degrees[i].scale.tones[0]];
      this.degrees[i].chord.seventh.tones.push(this.degrees[i].scale.tones[2], this.degrees[i].scale.tones[4], this.degrees[i].scale.tones[6]);
      this.degrees[i].chord[chordSpecies.SUS47].tones = [this.degrees[i].scale.tones[0]];
      this.degrees[i].chord[chordSpecies.SUS47].tones.push(this.degrees[i].scale.tones[3], this.degrees[i].scale.tones[4], this.degrees[i].scale.tones[6]);
    
      //tags
      for (let j = 0; j < this.chordSpecies.length; j++) {
        chordPatterns.map(chrdPat => {
          //ak najde v chordPatterns taky vzorec intervalov, co je zhodny s prave skumanym akrodom, 
          //priradi mu odtial prislusny tag.
          if (_.isEqual([...chrdPat.pattern], [...this.degrees[i].chord[this.chordSpecies[j]].intervals])) {
            this.degrees[i].chord[this.chordSpecies[j]].tag = chrdPat.tag;
            delete this.degrees[i].chord[this.chordSpecies[j]].altTag; //preventivne vymazanie - bez neho to v niektorych pripadoch akordov pridavalo altTag tam, kde nemal byt, a tym padom zobrazovalo nespravne akordove znacky.
            if (chrdPat.altTag) {
              this.degrees[i].chord[this.chordSpecies[j]].altTag = chrdPat.altTag;
            }
          }
        });
      }
    }
  }
}