import $ from "jquery";
import { structure, chordSpecies } from "./structure";
import { jazzman } from "./index";
export { Interface };

//tento program je stavany na 7-tonove stupnice
export const fixedScaleLength = 7;

class Interface {
  constructor() {
    this.task = undefined;
    this.rootNote = undefined;
    this.fromDegree = undefined;
    this.scaleType = undefined;
    this.chord = {
      fromDegree: undefined,
      scaleType: undefined,
      chordSpecies: undefined
    };
    this.lastScaleTag = undefined; //pouzite pri tagovani nadpisu stupnice pri preklikavani medzi rootNotes

    $("body").append(`<div id="global_div"></div>`);
    this.appendDivs(structure, "global_div");

    //vsetky ich teraz schovame, vykreslovat sa budu po kliknuti na prislusny button
    $("#rootNote_div").addClass("d-none");
    $("#scaleType_div").addClass("d-none");
    $("#chordType_div").addClass("d-none");
    $("#result_scale").addClass("d-none");
    $("#result_system").addClass("d-none");
    $("#result_chord").addClass("d-none");
    $("#classical").addClass("d-none");
    $("#setDegree").addClass("d-none");

    //zobrazenie niektorych konkretnych buttonov ako active sluzi na oznacenie default nastavenia
    $("#fifth").addClass("active");
    $("#tones").addClass("active");
    $("#setDegree_1").addClass("active");

    $('#rootNote_div, #scaleType_div, #chordType_div').addClass('spacing_on_top');

    this.appendResultDivs();
  }

  appendDivs(structure, targetElement) {
    for (let i in structure) {
      let div = structure[i];
      $("#" + targetElement).append('<div id="' + div.id + '"></div>');

      //button containery maju class o tom, aky typ buttonov obsahuju (task/rootnote/scaletype/chordtype)
      if (div.hasOwnProperty("class")) {
        $("#" + div.id).addClass(div.class);
      }

      //vytvorenie subdivov (button containery)
      if (div.hasOwnProperty("subDivs")) {
        this.appendDivs(div.subDivs, div.id);
      }

      //vytvaranie buttonov
      if (div.hasOwnProperty("buttons")) {
        this.appendButtons(div.buttons, div.id);
        $("#" + div.id).addClass("row");
      }
    }
  } //konci append divs

  appendButtons(structure, targetElement) {
    for (let i in structure) {
      let button = structure[i];
      $("#" + targetElement).append('<button id="' + button.id + '"></button>');
      $("#" + button.id).prop("title", button.title);
      $("#" + button.id).html(button.html);
      $("#" + button.id).addClass("btn");
      $("#" + button.id).addClass("btn-outline-secondary");
      $("#" + button.id).addClass("col");
      $("#" + button.id).addClass(button.class);
      if (button.hasOwnProperty("refScale")) {
        //len buttony s akordami
        $("#" + button.id).prop("name", button.refScale); //davam to ako name, lebo data-refScale mi nebralo
      }
      $("#" + button.id).click(() => {
        this.clickButton(button);
      });
    } //konci for
  } //konci appendButtons

  appendResultDivs() {
    //result AKORDY
    $("#result_chord").append(
      '<div id="result_chord_tones" class="row"></div>'
    );
    $("#result_chord").append(
      '<div id="result_chord_intervals" class="row"></div>'
    );
    $("#result_chord").append(
      '<div id="result_chord_structure" class="row"  data-toggle="tooltip" data-placement="bottom" data-html="true"></div>'
    ); //to data_html je kvoli tooltipu, aby respektovalo prikaz </br>
    $("#result_chord_tones").append(
      '<span id="chord_name" class="col-3 title"></span>'
    );
    $("#result_chord_intervals").append(
      '<span id="chord_label_intervals" class="col-3"></span>'
    );
    $("#result_chord_structure").append(
      '<span id="chord_label_structure" class="col-3 small_chars"></span>'
    );
    $("#result_chord_structure").tooltip({
      title: `ŠTRUKTÚRA AKORDU </br> (posledný krok je </br> vzdialenosť k oktáve): </br>
      ii - malá sekunda </br> II - veľká sekunda </br> m - malá tercia </br> v - veľká tercia </br> 4 - čistá kvarta </br> T - tritonus`
    });

    for (let j = 0; j < 4; j++) {
      $("#result_chord_tones").append(
        '<span id="chord_tone_' + j + '" class="col-2">ggg</span>'
      );
      $("#result_chord_intervals").append(
        '<span id="chord_interval_' +
          j +
          '" class="col-2 small_chars">ggg</span>'
      );
      $("#result_chord_structure").append(
        '<span id="chord_structure_' +
          j +
          '" class="col-2 small_chars text_right">ggg</span>'
      );
    }
    $("#result_chord_tones").append(
      '<span id="empty_span1" class="col-1"></span>'
    );
    $("#result_chord_interval").append(
      '<span id="empty_span2" class="col-1"></span>'
    );
    $("#result_chord_structure").append(
      '<span id="empty_span3" class="col-1"></span>'
    );

    //result STUPNICA
    $("#result_scale").append('<div id="scale_name" class="title"></div>');
    $("#result_scale").append('<div id="scale_tones" class="row"></div>');
    $("#result_scale").append('<div id="scale_intervals" class="row"></div>');
    $("#result_scale").append(
      '<div id="scale_steps" class="row text_right"></div>'
    );
    $("#result_scale").append('<div id="scale_semitones" class="row"></div>');
    for (let j = 0; j < fixedScaleLength; j++) {
      $("#scale_tones").append(
        '<span id="scale_tone_' + j + '" class="col">ggg</span>'
      );
      $("#scale_intervals").append(
        '<span id="scale_intervals_' + j + '" class="col">ggg</span>'
      );
      $("#scale_semitones").append(
        '<span id="scale_semitones_' +
          j +
          '" class="col small_chars">ggg</span>'
      );
      $("#scale_steps").append(
        '<span id="scale_steps_' + j + '" class="col small_chars">ggg</span>'
      );
    }

    //result SYSTEM
    $("#result_system").append('<div id="system_name" class="title"></div>');
    for (let j = 0; j < fixedScaleLength; j++) {
      $("#result_system").append(
        '<div id="system_line_' + j + '" class="row"></div>'
      );
      $("#system_line_" + j).append(
        '<span id="sl_' + j + '_order" class="col-1"></span>'
      );
      $("#system_line_" + j).append(
        '<span id="sl_' +
          j +
          '_chord" class="col-4" data-toggle="tooltip" data-placement="left" data-html="true"></span>'
      );
      for (let k = 0; k < fixedScaleLength; k++) {
        $("#system_line_" + j).append(
          '<span id="sl_' +
            j +
            "_tone_" +
            k +
            '" class="col-1 large_chars"></span>'
        );
      }
    }
    //presunutie buttonov na prepnutie typu akordu/stupnice na spodok div#result_system
    $("#result_system_chordTypes").appendTo($("#result_system"));
    $("#result_system_scaleFormat").appendTo($("#result_system"));
  } //konci appendResultDivs

  updateAssignment(button) {
    if (button.class == "scaleType_degreed") {
      //scaleType_degreed ma pracovat s propertou scaleType, nie vytvarat vlastnu scaleType_degreed
      this["scaleType"] = button.value;
      this.scaleType = button.value.charAt(0) + button.value.charAt(1);

      if (this.fromDegree == undefined || this.lastScaleWasDegreed != true) {
        //iba pri prvotnom spusteni alebo pri prekliku z non-degreed na degreed chcem pouzit konkretny fromDegree 1,
        //preklik z non-degreed na degreed totiz automaticky pouzil fromDegree z tej starej non_degreed stupnice (napr MX->HD spustilo 5.HD namiesto 1.HD)
        this.fromDegree = parseInt(button.value.charAt(2));
      }
    } else {
      this[button.class] = button.value;
    }

    if (button.class == "scaleType") {
      this.scaleType = button.value.charAt(0) + button.value.charAt(1);
      this.fromDegree = parseInt(button.value.charAt(2));
    }

    if (button.class == "chordType") {
      //this.CHORD.atd, lebo task "chord" ma osobitne ulozene vstupne parametre (kvoli prekliku medzi taskami, aby neovplyvnoval zadania scale/system)
      this.task = "chord";
      this.chord.scaleType =
        button.refScale.charAt(0) + button.refScale.charAt(1);
      this.chord.fromDegree = parseInt(button.refScale.charAt(2));
      this.chord.chordSpecies = button.species;
    }

    //vyber typu akordu pre system
    if (button.class == "chordSpecies_in_system") {
      this.chordSpecies = button.species;
    }

    //vyber formatu stupnice pre system
    if (button.class == "scaleFormat_in_system") {
      this.scaleFormat = button.value;
    }

    //zmena fromDegree pre scaleDegreed
    if (button.class == "setDegree") {
      this.fromDegree = parseInt(button.value);
    }
  }

  clickButton(button) { //obsluhuje vykreslovanie/schovavanie elementov a vola updateAssignment()
    //vyber stupnica/akord/tonina
    if (button.class == "task") {
      this.updateAssignment(button);
      $("#rootNote_div").removeClass("d-none");

      //ak uz ale je vybraty root note (tzn menime aktualne zadanie medzi stupnicou/akordom/systemom)
      if (this.rootNote != undefined) {
        if (this.task == "scale" || this.task == "system") {
          $("#scaleType_div").removeClass("d-none");
          $("#chordType_div").addClass("d-none");
        } else if (this.task == "chord") {
          $("#scaleType_div").addClass("d-none");
          $("#chordType_div").removeClass("d-none");
          //ak este nie je vykliknuty typ akrodu, treba zachovat sucasny otvoreny result_div
          if (this.chord.scaleType == undefined) {
            $("#result_scale").addClass("d-none");
            $("#result_system").addClass("d-none");
          }
        }
      }
    }

    //vyber rootNote
    if (button.class == "rootNote") {
      this.updateAssignment(button);
      if (this.task == "scale" || this.task == "system") {
        $("#scaleType_div").removeClass("d-none");
        $("#chordType_div").addClass("d-none");
      }
      //prepnutie rootnotu v pripade, ze mame prave zobrazenu toninu v intervalovom formate - prepne to na tonovy format
      if (this.task == "system" && this.scaleFormat == "intervals") {
        this.scaleFormat = "tones";
        $(".scaleFormat_in_system").removeClass("active");
        $("#tones").addClass("active");
      }
      if (this.task == "chord") {
        $("#scaleType_div").addClass("d-none");
        $("#chordType_div").removeClass("d-none");
      }
    }

    //vyber scaleType
    if (button.class == "scaleType" && button.id != "other") {
      this.updateAssignment(button);

      $("#task_scale").removeClass("active");
      $("#task_chord").removeClass("active");
      $("#task_system").removeClass("active");
      $(".other_scales").addClass("d-none");

      if (this.task === "scale") {
        $("#task_scale").addClass("active");
      }
      if (this.task == "system") {
        $("#task_system").addClass("active");
      }

      $(".scaleType_degreed").removeClass("active");
    }

    //vyber scaleType z menu "iné"
    if (button.class == "scaleType_degreed") {
      this.updateAssignment(button);

      $(".scaleType").removeClass("active");
      $(".scaleType_degreed").removeClass("active");

      $("#task_scale").removeClass("active");
      $("#task_chord").removeClass("active");
      $("#task_system").removeClass("active");

      $("#setDegree").removeClass("d-none");
      $(".setDegree").removeClass("active");
      $("#other").addClass("active");
      $("#setDegree_" + this.fromDegree).addClass("active");

      if (this.task == "scale") {
        $("#task_scale").addClass("active");
      }

      if (this.task == "system") {
        $("#task_system").addClass("active");
      }
    }

    //specialny pripad - btn "iné". jeho uloha je spristupnit specialne stupnice (scaledType_degreed)
    if (button.id == "other") {
      $("#classical").removeClass("d-none"); //ten classical obsahuje buttony s .scaleType_degreed
    }

    //pripady, ked netreba nic vykreslovat/schovavat a staci volat updateAssignment()
    if (
      button.class == "chordSpecies_in_system" ||
      button.class == "scaleFormat_in_system" ||
      button.class == "setDegree" ||
      button.class == "chordType"
    ) {
      this.updateAssignment(button);
    }

    //prekreslovanie buttonov z active na "non-active"
    $("." + button.class).removeClass("active");
    $("#" + button.id).addClass("active");

    //ak su vyklikane vsetky potrebne parametre, vypocita to novy system
    if (
      this.rootNote &&
      ((this.fromDegree && this.scaleType) ||
        (this.chord.fromDegree && this.chord.scaleType))
    ) {
      if (this.task == "chord") {
        //zadanie "chord" ma svoje vlastne scaletype a from degree, aby sa nemiesalo do zadania scale a system
        jazzman.system.updateSystem(
          this.rootNote,
          this.chord.fromDegree,
          this.chord.scaleType,
          jazzman.methods.scale
        );
      } else {
        jazzman.system.updateSystem(
          this.rootNote,
          this.fromDegree,
          this.scaleType,
          jazzman.methods.scale
        );
      }
    }

    //spustame showResult()
    if (
      (button.class == "scaleType" || button.class == "scaleType_degreed") &&
      button.id != "other"
    ) {
      this.showResult(button.title, button);
    } else {
      //lastScaleTag je pre pripade, ze sa preklikavame na stupnicu/mod z akordu - zapamata si to poslednu vyklikanu stupnicu a tu pouzije
      this.showResult(this.lastScaleTag, button);
    }
  } //konci clickButton

  showResult(scaleTag, button) {
    //najprv zobrazi spravny div#result/result_system a potom don vypise vysledok
    //najprv schovame vsetky result_divy, zobrazenie toho spravneho je strcene do prislusnej casti
    $("#result_scale").addClass("d-none");
    $("#result_system").addClass("d-none");
    $("#result_chord").addClass("d-none");

    if (this.task == "scale" && this.scaleType != undefined) {
      $("#result_scale").removeClass("d-none");

      //jednotlive tony poumiestnuje do prislusnych elementov
      for (let i = 0; i < fixedScaleLength; i++) {
        $("#scale_tone_" + i).html(
          "<b>" + jazzman.system.degrees[0].scale.tones[i] + "</b>"
        );
        $("#scale_intervals_" + i).html(
          jazzman.system.degrees[0].scale.intervals[i]
        );
        $("#scale_semitones_" + i).html(
          jazzman.system.degrees[0].scale.semitones[i]
        );
        $("#scale_steps_" + i).html(jazzman.system.degrees[0].scale.steps[i]);
      }

      //nadpis - prepiasnie oboch naraz predchadza problemom so zobrazenim pri zmene tasku
      this.scaleTitle("#scale_name", scaleTag, button);
      this.scaleTitle("#system_name", scaleTag, button);
    } //konci this.task == "scale"

    if (this.task == "chord" && this.chord.scaleType != undefined) {
      $("#result_chord").removeClass("d-none");

      //akordova znacka
      $("#chord_name").html(
        "<b>" +
          jazzman.system.degrees[0].scale.tones[0].toUpperCase().replace("X", "x") +
          jazzman.system.degrees[0].chord[this.chord.chordSpecies].tag +
          "</b>"
      );

      //akordicke tony
      for (let i = 0; i < 4; i++) {
        $("#chord_tone_" + i).html(
          jazzman.system.degrees[0].chord[this.chord.chordSpecies].tones[i]
        );
        $("#chord_interval_" + i).html(
          jazzman.system.degrees[0].chord[this.chord.chordSpecies].intervals[i]
        );
        $("#chord_structure_" + i).html(
          jazzman.system.degrees[0].chord[this.chord.chordSpecies].structure[i]
        );
      }
      //schovanie 4.tonu v pripade, ze ho v akorde nemame.
      if (
        this.chord.chordSpecies == chordSpecies.FIFTH ||
        this.chord.chordSpecies == chordSpecies.SUS4
      ) {
        $("#chord_tone_3").html("");
        $("#chord_interval_3").html("");
        $("#chord_structure_3").html("");
      }

      //nadpis pre scale a system je aj tu, v casti chord, aby tie nadpisy reagovali na zmenu rootNote
      this.scaleTitle("#system_name", scaleTag, button);
      this.scaleTitle("#scale_name", scaleTag, button);
      
    } //konci this.task == "chord"

    if (this.task == "system" && this.scaleType != undefined) {
      if (this.chordSpecies == undefined) {
        this.chordSpecies = chordSpecies.FIFTH;
      }
      if (this.scaleFormat == undefined) {
        this.scaleFormat = "tones";
      }
      $("#result_system").removeClass("d-none");

      //riadky
      for (let i = 0; i < fixedScaleLength; i++) {
        $("#sl_" + i + "_order").html(i + 1 + ".:");

        //akordova znacka
        if (jazzman.system.degrees[i].chord[this.chordSpecies].tag) {
          //ak existuje prislusny tag, znamena, ze mame taky typ akordu v systeme a mozeme ho teda pouzit
          if (this.scaleFormat != "intervals") {
            //ak nechcem zobrazovat intervalove stupnice, zobrazuje absolutne tony
            $("#sl_" + i + "_chord").html(
              "<b>" +
                jazzman.system.degrees[i].scale.tones[0].toUpperCase().replace("X", "x") +
                jazzman.system.degrees[i].chord[this.chordSpecies].tag +
                "</b>"
            );
          } else {
            //ak chceme intervalove stupnice
            let tagToUse = "tag";
            if (
              jazzman.system.degrees[i].chord[this.chordSpecies].hasOwnProperty(
                "altTag"
              )
            ) {
              //ak dany akord ma v systeme zadany svoj altTag, tento sa pouzije
              tagToUse = "altTag";
            } else {
              //a ak nema, pouzije sa (primarny) tag
              tagToUse = "tag";
            }
            
            if (jazzman.system.degrees[i].scale.intervals[2] == "3") {
              //durove akordy -> uppercase
              $("#sl_" + i + "_chord").html(
                "<b>" +
                  jazzman.system.degrees[i].scale.chordNumerals[0] +
                  jazzman.system.degrees[i].chord[this.chordSpecies][tagToUse] +
                  "</b>"
              );
            } else {
              //molove akordy a bb3 -> lowercase
              $("#sl_" + i + "_chord").html(
                "<b>" +
                  jazzman.system.degrees[
                    i
                  ].scale.chordNumerals[0].toLowerCase() +
                  jazzman.system.degrees[i].chord[this.chordSpecies][tagToUse] +
                  "</b>"
              );
            }
          }
        } else { //prislusny tag neexistuje, tzn nevieme taky akord oznacit
          //nechaj toto pre pripad pridavania noveho typu stupnice, kde mozu vzniknut zatial nepouzite typy akordov
          $("#sl_" + i + "_chord").html(
            "<b>" +
              jazzman.system.degrees[i].scale.tones[0].toUpperCase().replace("X", "x") +
              "???</b>"
          );
        }

        //tooltip nad akordovou znackou
        $("#sl_" + i + "_chord").tooltip("dispose"); //zmaze stary obsah tootltipu po kliknuti na inu scaleType
        let tooltipContent = `${jazzman.system.degrees[i].chord[
          this.chordSpecies
        ].tones.join(" ⋅ ")} 
          </br> ${jazzman.system.degrees[i].chord[
            this.chordSpecies
          ].intervals.join(" ⋅ ")} 
          </br> ${jazzman.system.degrees[i].chord[
            this.chordSpecies
          ].structure.join(" ⋅ ")}`;
        $("#sl_" + i + "_chord").tooltip({ title: tooltipContent });

        //jednotlive tony v kazdom riadku
        for (let j = 0; j < fixedScaleLength; j++) {
          $("#sl_" + i + "_tone_" + j).html(
            jazzman.system.degrees[i].scale[this.scaleFormat][j]
          );
        }
      } //koncia riadky

      //nadpis - prepiasnie oboch naraz predchadza problemom so zobrazenim pri zmene tasku
      this.scaleTitle("#system_name", scaleTag, button);
      this.scaleTitle("#scale_name", scaleTag, button);
    } //konci this.task=="system"
    // console.log(this);
  } //konci showResult

  scaleTitle(targetHtml, scaleTag, button) {
    this.lastScaleTag = scaleTag; //ulozime si tento scaleTag pre pripad preklikavania medzi rootNotes (rootNote odosiela inu informaciu v "button.title", takze to treba obist)

    if (button.class == "rootNote") {
      //menime rootNote
      if (this.lastScaleWasDegreed != true) {
        //posledna stupnica bola bud non-degreed, alebo klikame prvu po spusteni
        return $(targetHtml).html(this.rootNote.toUpperCase() + " " + scaleTag);
      } else {
        //posledna stupnica bola degreed
        return $(targetHtml).html(
          document
            .getElementById(targetHtml.slice(1)) //odstranenie # zo stringu
            .innerHTML.replace(/^\S+/, this.rootNote.toUpperCase()) //vymiena sa rootNote za novy
        );
      }
    }
    
    else if (button.class == "scaleType") {
      //menime scaleType spomedzi non-degreed
      this.lastScaleWasDegreed = false;
      return $(targetHtml).html(this.rootNote.toUpperCase() + " " + scaleTag);
    }

    else if (button.class == "scaleType_degreed") {
      //ak menime typ specialnej stupnice
      this.lastScaleWasDegreed = true;
      if (this.fromDegree == "1") {
        //a chceme ju od 1. stupna, da len nevysklonovany nazov bez cisla stupna
        return $(targetHtml).html(
          this.rootNote.toUpperCase() + " " + scaleTag //scaleTag je button.title odoslany z clickButton()
        );
      } else {
        //ostatne cisla stupnov napise a nazov vysklonuje
        return $(targetHtml).html(
          this.rootNote.toUpperCase() +
            " " +
            "na " +
            this.fromDegree +
            ". stupni " +
            scaleTag.replace(/[aá]\s|[aá]$/g, "ej ").replace(/[aá]"/, 'ej"')
        );
      }
    } 
    
    else if (button.class == "setDegree") {
      //vyberame iny stupen
      this.lastScaleWasDegreed = true;
      if (this.fromDegree == "1") {
        //a ten stupen je 1, pouzije to nevysklonovanu verziu title a nebude ani pisat, ze je to prvy stupen
        return $(targetHtml).html(
          this.rootNote.toUpperCase() + " " + scaleTag //scaleTag je button.title odoslany z clickButton()
        );
      } else {
        //ak je to iny stupen, tak ho napise a nazov stupnice vysklonuje
        return $(targetHtml).html(
          this.rootNote.toUpperCase() +
            " " +
            button.title +
            " " +
            scaleTag.replace(/[aá]\s|[aá]$/g, "ej ").replace(/[aá]"/, 'ej"')
        );
      }
    } 
  } //konci scaleTitle
}
