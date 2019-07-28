export const chordSpecies = {
  FIFTH: "fifth",
  SEVENTH: "seventh",
  SIXTH: "sixth",
  SUS4: "sus4",
  SUS47: "7sus4" 
}

//ak ma objekt propertu subDivs, appenduju sa mu div childy
//ak ma objekt propertu buttons, appenduju sa mu button childy
//div so subdivmi ma strukturu {id, subDivs}
//div s buttonmi ma strukturu {id, buttons}
//button ma strukturu {id, title, html, ...}
//BUTTONY:
  //value - info, ktore odosle a priradi sa do property, ktoru ma button ulozenu v class
export const structure = [
  {id: "menu", subDivs: [
    {id: "task_select", class:"task_buttons", buttons: [ //if hasownprop subdivs => appendDivs(subDivs) else appendButtons
        {id: "task_scale", title: "stupnica", html: "stupnica", value:"scale", class: "task"},
        {id: "task_chord", title: "akord", html: "akord", value:"chord", class: "task"},
        {id: "task_system", title: "mód", html: "mód", value:"system", class: "task"}
    ]},
  ]},

  {id: "rootNote_div", subDivs: [
    {id: "flats", class:"rootNote_buttons", buttons: [
      { id: "c♭", title: "C♭", html: "C♭", value:"c♭", class:"rootNote" },
      { id: "d♭", title: "D♭", html: "D♭", value:"d♭", class:"rootNote" },
      { id: "e♭", title: "E♭", html: "E♭", value:"e♭", class:"rootNote" },
      { id: "f♭", title: "F♭", html: "F♭", value:"f♭", class:"rootNote" },
      { id: "g♭", title: "G♭", html: "G♭", value:"g♭", class:"rootNote" },
      { id: "a♭", title: "A♭", html: "A♭", value:"a♭", class:"rootNote" },
      { id: "b♭", title: "B♭", html: "B♭", value:"b♭", class:"rootNote" }
    ]},
    {id: "naturals", class:"rootNote_buttons", buttons: [
      { id: "c", title: "C", html: "C", value:"c", class:"rootNote" },
      { id: "d", title: "D", html: "D", value:"d", class:"rootNote" },
      { id: "e", title: "E", html: "E", value:"e", class:"rootNote" },
      { id: "f", title: "F", html: "F", value:"f", class:"rootNote" },
      { id: "g", title: "G", html: "G", value:"g", class:"rootNote" },
      { id: "a", title: "A", html: "A", value:"a", class:"rootNote" },
      { id: "b", title: "B", html: "B", value:"b", class:"rootNote" }
    ]},
    {id: "sharps", class:"rootNote_buttons", buttons: [
      { id: "c♯", title: "C♯", html: "C♯", value:"c♯", class:"rootNote" },
      { id: "d♯", title: "D♯", html: "D♯", value:"d♯", class:"rootNote" },
      { id: "e♯", title: "E♯", html: "E♯", value:"e♯", class:"rootNote" },
      { id: "f♯", title: "F♯", html: "F♯", value:"f♯", class:"rootNote" },
      { id: "g♯", title: "G♯", html: "G♯", value:"g♯", class:"rootNote" },
      { id: "a♯", title: "A♯", html: "A♯", value:"a♯", class:"rootNote" },
      { id: "b♯", title: "B♯", html: "B♯", value:"b♯", class:"rootNote" }
    ]}
  ]},

  {id: "scaleType_div", subDivs: [
    {id: "diatonic", class:"scaleType_buttons", buttons: [
      { id: "io", title: "iónska (durová)", html: "IO", value:"di1", class: "scaleType" },
      { id: "do", title: "dórska", html: "DO", value:"di2", class: "scaleType" },
      { id: "fr", title: "frygická", html: "FR", value:"di3", class: "scaleType" },
      { id: "ly", title: "lydická", html: "LY", value:"di4", class: "scaleType" },
      { id: "mx", title: "mixolydická", html: "MX", value:"di5", class: "scaleType" },
      { id: "ae", title: "aiolská (prirodzená molová)", html: "AE", value:"di6", class: "scaleType" },
      { id: "lc", title: "lokrická", html: "LC", value:"di7", class: "scaleType" }
    ]},
    {id: "jazzy", class:"scaleType_buttons", buttons: [
      { id: "hi", title: "mixolydická 9 ♭13 (5.mm)", html: "MX 9 ♭13", value:"mm5", class: "scaleType" },
      { id: "jw", title: "mixolydická ♭9 ♭13 (5.hm)", html: "MX ♭9 ♭13", value:"hm5", class: "scaleType" },
      { id: "lyb7", title: "lydická ♭7 (4.mm, podhalanská)", html: "LY ♭7", value:"mm4", class: "scaleType" },
      { id: "other", title: "iné stupnice a ich stupne", html: "iné", value:"", class: "scaleType" }
    ]},
    {id: "classical", class:"scaleType_degreed_buttons other_scales", buttons: [
      { id: "hd", title: "harmonická durová", html: "HD", value:"hd1", class: "scaleType_degreed" },
      { id: "hm", title: "harmonická molová", html: "HM", value:"hm1", class: "scaleType_degreed" },
      { id: "md", title: "melodická durová", html: "MD", value:"md1", class: "scaleType_degreed" },
      { id: "mm", title: "melodická molová", html: "MM", value:"mm1", class: "scaleType_degreed" },
    ]},  

    {id: "setDegree", class:"result_container other_scales", buttons: [//subdivy do result_system sa vytvaraju s for v interface.js
      { id: "setDegree_1", title: "na 1. stupni", html: "1.", class: "setDegree", value:"1" },
      { id: "setDegree_2", title: "na 2. stupni", html: "2.", class: "setDegree", value:"2" },
      { id: "setDegree_3", title: "na 3. stupni", html: "3.", class: "setDegree", value:"3" },
      { id: "setDegree_4", title: "na 4. stupni", html: "4.", class: "setDegree", value:"4" },
      { id: "setDegree_5", title: "na 5. stupni", html: "5.", class: "setDegree", value:"5" },
      { id: "setDegree_6", title: "na 6. stupni", html: "6.", class: "setDegree", value:"6" },
      { id: "setDegree_7", title: "na 7. stupni", html: "7.", class: "setDegree", value:"7" },
    ]}
  ]},

  {id: "chordType_div", subDivs: [
    {id: "5_chords", class:"chordType_buttons", buttons: [
      { id: "dur", title: "durový", html: "dur", value:"dur", class: "chordType", refScale: "di1", species: chordSpecies.FIFTH  },
      { id: "mol", title: "molový", html: "mol", value:"mol", class: "chordType", refScale: "di6", species: chordSpecies.FIFTH },
      { id: "aug", title: "zväčšený / +", html: "aug", value:"aug", class: "chordType", refScale: "hd6", species: chordSpecies.FIFTH },
      { id: "dim", title: "zmenšený / °", html: "dim", value:"dim", class: "chordType", refScale: "di7", species: chordSpecies.FIFTH },
      { id: "sus4", title: "sus4", html: "sus4", value:"sus4", class: "chordType", refScale: "di1", species: chordSpecies.SUS4 }
    ]},
    {id: "7_chords", class:"chordType_buttons", buttons: [
      { id: "mol7", title: "mol 7", html: "-7", value:"mol7", class: "chordType", refScale: "di6", type:"seventh", species: chordSpecies.SEVENTH },
      { id: "maj7", title: "maj 7", html: "Δ", value:"maj7", class: "chordType", refScale: "di1", species: chordSpecies.SEVENTH },
      { id: "dom", title: "dominanta", html: "7", value:"dom", class: "chordType", refScale: "di5", species: chordSpecies.SEVENTH },
      { id: "half", title: "polozmenšený", html: "Ø", value:"half", class: "chordType", refScale: "di7", species: chordSpecies.SEVENTH },
      { id: "o7", title: "celozmenšený", html: "°7", value:"o7", class: "chordType", refScale: "hm7", species: chordSpecies.SEVENTH },
      { id: "molmaj7", title: "mol maj 7", html: "-Δ", value:"molmaj7", class: "chordType", refScale: "mm1", species: chordSpecies.SEVENTH},
      { id: "7sus4", title: "7sus4", html: "7sus4", value:"7sus4", class: "chordType", refScale: "di5", species: chordSpecies.SUS47 }
    ]},
    {id: "6_chords", class:"chordType_buttons", buttons: [
      { id: "6", title: "6", html: "6", value:"6", class: "chordType", refScale: "di1", species: chordSpecies.SIXTH },
      { id: "mol6", title: "mol 6", html: "-6", value:"mol6", class: "chordType", refScale: "di2", species: chordSpecies.SIXTH },
      { id: "b6", title: "♭6", html: "♭6", value:"b6", class: "chordType", refScale: "mm5", species: chordSpecies.SIXTH },
      { id: "molb6", title: "mol ♭6", html: "-♭6", value:"molb6", class: "chordType", refScale: "hm1", species: chordSpecies.SIXTH }
    ]}
  ]},

  {id: "results_div", subDivs: [
    {id: "result_scale", class:"result_container"},
    {id: "result_chord", class:"result_container"},
    {id: "result_system", class:"result_container", subDivs: [
      //jednotlive divy#result_system_ sa vytvaraju osobitne v metode interface.appendResultDivs (lebo kazdy ma inu vnutornu strukturu)
      {id: "result_system_chordTypes", class:"result_container", buttons: [//subdivy do result_system sa vytvaraju s for v interface.js
        { id: "fifth", title: "vytvor kvintakordy", html: "kvintakordy", class: "chordSpecies_in_system", species: chordSpecies.FIFTH },
        { id: "seventh", title: "vytvor septakordy", html: "septakordy", class: "chordSpecies_in_system", species: chordSpecies.SEVENTH },
        { id: "sixth", title: "vytvor sextakordy", html: "sextakordy", class: "chordSpecies_in_system", species: chordSpecies.SIXTH },
      ]},
      {id: "result_system_scaleFormat", class:"result_container", buttons: [//subdivy do result_system sa vytvaraju s for v interface.js
        { id: "tones", title: "zobraz konkrétne tóny", html: "tóny", class: "scaleFormat_in_system", value:"tones" },
        { id: "intervals", title: "zobraz intervalovú stupnicu", html: "intervaly", class: "scaleFormat_in_system", value:"intervals" },
        { id: "semitones", title: "zobraz poltónové kroky od základného tónu", html: "poltóny", class: "scaleFormat_in_system", value:"semitones" },
        { id: "steps", title: "zobraz krokovú stupnicu", html: "kroky", class: "scaleFormat_in_system", value:"steps" },
      ]},
    ]}, 
  ]},
];

