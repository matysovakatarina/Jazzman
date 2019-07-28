import { chordSpecies } from "./structure";

export let chordPatterns = [
  { type: "dur",  tag: "&nbsp", altTag: "&nbsp", pattern: ["1", "3", "5"], species: chordSpecies.FIFTH },
  { type: "mol",  tag: "m", altTag: "&nbsp", pattern: ["1", "♭3", "5"], species: chordSpecies.FIFTH },
  { type: "sus4",  tag: "<sup>sus4</sup>", pattern: ["1", "4", "5"], species: chordSpecies.FIFTH },
  { type: "sus4",  tag: "<sup>sus4</sup>", pattern: ["1", "♯3", "5"], species: chordSpecies.FIFTH },
  { type: "dim",  tag: "<sup>dim</sup>", altTag: "°", pattern: ["1", "♭3", "♭5"], species: chordSpecies.FIFTH },
  { type: "aug",  tag: "<sup>aug</sup>", altTag: "<sup>+</sup>", pattern: ["1", "3", "♯5"], species: chordSpecies.FIFTH },
  { type: "b5",  tag: "<sup>(♭5)</sup>", pattern: ["1", "3", "♭5"], species: chordSpecies.FIFTH },
  { type: "sus2",  tag: "<sup>sus2</sup>", pattern: ["1", "♭♭3", "5"], species: chordSpecies.FIFTH },
  { type: "susb2b5",  tag: "<sup>sus2(♭5)</sup>", pattern: ["1", "♭♭3", "♭5"], species: chordSpecies.FIFTH },
  { type: "molaug",  tag: "m<sup>aug</sup>", altTag: "<sup>+</sup>", pattern: ["1", "♭3", "♯5"], species: chordSpecies.FIFTH },

  { type: "6",  tag: "<sup>6</sup>", pattern: ["1", "3", "5", "6"], species: chordSpecies.SIXTH },
  { type: "b6",  tag: "<sup>(♭6)</sup>", pattern: ["1", "3", "5", "♭6"], species: chordSpecies.SIXTH },
  { type: "mol6",  tag: "<sup>-6</sup>", altTag: "<sup>6</sup>", pattern: ["1", "♭3", "5", "6"], species: chordSpecies.SIXTH },
  { type: "molb6",  tag: "<sup>-♭6</sup>", altTag: "<sup>(♭6)</sup>", pattern: ["1", "♭3", "5", "♭6"], species: chordSpecies.SIXTH },
  { type: "dimb6",  tag: "°<sup>♭6</sup>", pattern: ["1", "♭3", "♭5", "♭6"], species: chordSpecies.SIXTH },
  { type: "dim6",  tag: "°<sup>6</sup>", pattern: ["1", "♭3", "♭5", "6"], species: chordSpecies.SIXTH },
  { type: "aug6",  tag: "<sup>+6</sup>", pattern: ["1", "3", "♯5", "6"], species: chordSpecies.SIXTH },
  { type: "♯6",  tag: "<sup>(♯6)</sup>", pattern: ["1", "3", "5", "♯6"], species: chordSpecies.SIXTH },
  { type: "6♭5",  tag: "<sup>6♭5</sup>", pattern: ["1", "3", "♭5", "6"], species: chordSpecies.SIXTH },
  { type: "♭6♭5",  tag: "<sup>(♭6)♭5</sup>", pattern: ["1", "3", "♭5", "♭6"], species: chordSpecies.SIXTH },
  { type: "b6sus2b5",  tag: "<sup>(♭6)sus2(♭5)</sup>", pattern: ["1", "♭♭3", "♭5", "♭6"], species: chordSpecies.SIXTH },

  { type: "maj7",  tag: "<sup>Δ</sup>", pattern: ["1", "3", "5", "7"], species: chordSpecies.SEVENTH },
  { type: "dom",  tag: "<sup>7</sup>", pattern: ["1", "3", "5", "♭7"], species: chordSpecies.SEVENTH },
  { type: "molmaj7",  tag: "<sup>-Δ</sup>", altTag: "<sup>Δ</sup>", pattern: ["1", "♭3", "5", "7"], species: chordSpecies.SEVENTH },
  { type: "mol7",  tag: "<sup>-7</sup>", altTag: "<sup>7</sup>", pattern: ["1", "♭3", "5", "♭7"], species: chordSpecies.SEVENTH },
  { type: "7sus4", tag: "<sup>7sus4</sup>", pattern: ["1", "4", "5", "♭7"], species: chordSpecies.SEVENTH },
  { type: "half",  tag: "<sup>ø</sup>", pattern: ["1", "♭3", "♭5", "♭7"], species: chordSpecies.SEVENTH }, //Ø
  { type: "o7",  tag: "<sup>o7</sup>", pattern: ["1", "♭3", "♭5", "♭♭7"], species: chordSpecies.SEVENTH },
  { type: "augmaj7",  tag: "<sup>+Δ</sup>", pattern: ["1", "3", "♯5", "7"], species: chordSpecies.SEVENTH },
  { type: "aug7",  tag: "<sup>+7</sup>", pattern: ["1", "3", "♯5", "♭7"], species: chordSpecies.SEVENTH },
  { type: "molaug7",  tag: "<sup>+-7</sup>", altTag: "<sup>+7</sup>", pattern: ["1", "♭3", "♯5", "♭7"], species: chordSpecies.SEVENTH },
  { type: "7♭5",  tag: "<sup>7♭5</sup>", pattern: ["1", "3", "♭5", "♭7"], species: chordSpecies.SEVENTH },
  { type: "dimmaj7",  tag: "<sup>°Δ</sup>", pattern: ["1", "♭3", "♭5", "7"], species: chordSpecies.SEVENTH }, //Ø
  { type: "mol6",  tag: "<sup>-6</sup>", altTag: "<sup>6</sup>", pattern: ["1", "♭3", "5", "♭♭7"], species: chordSpecies.SEVENTH },
  { type: "6sus2b5",  tag: "<sup>6sus2(♭5)</sup>", pattern: ["1", "♭♭3", "♭5", "♭♭7"], species: chordSpecies.SEVENTH },
  { type: "maj7sus4",  tag: "<sup>Δsus4</sup>", pattern: ["1", "♯3", "5", "7"], species: chordSpecies.SEVENTH },
];

export const scalePatterns = {
  di: [2, 2, 1, 2, 2, 2, 1],
  mm: [2, 1, 2, 2, 2, 2, 1], 
  md: [2, 2, 1, 2, 1, 2, 2], // == 5mm
  hm: [2, 1, 2, 2, 1, 3, 1],
  hd: [2, 2, 1, 2, 1, 3, 1],
};
