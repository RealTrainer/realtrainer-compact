// Compact Format Parser (.pegjs)
// Parsii kompaktia formaattia verbose-prefikseillä
//
// Esimerkki:
//   [2025-12-31#w001] ## Kestovoima
//   Phase1 Alkuverryttely|1km
//   Exercise hauiskääntö|3x20@12kg
//   Pyramid takakyykky|20x50,20x60,20x70kg
//   Time 10m|Loppuhölkkä
//
// Päivämääräformaatit:
//   [2025-12-31]       - päivä (ISO)
//   [2025-12-31#w001]  - päivä + tietokanta-ID
//   [#w001]            - vain tietokanta-ID
//   [W52/2025]         - viikko
//   [2025-12]          - kuukausi
//   [2025]             - vuosi
//   [2025-12-01..31]   - väli
//   [4W:2025-12-31]    - N viikkoa päättyen

Document = entries:(DocEntry)* _ { 
  return { 
    workouts: entries.filter(e => e && e.type === 'workout'),
    stats: entries.filter(e => e && e.type === 'stats')
  }; 
}

DocEntry = StatEntry / Workout / SectionHeader / HorizontalRule / DocEmptyLine

// Dokumenttitason otsikko (# tai ##) - ei harjoitus, ohitetaan
SectionHeader = _ "#"+ _ title:RestOfLine { return null; }

// Tyhjä rivi dokumenttitasolla (vähintään yksi rivinvaihto)
DocEmptyLine = [ \t]* [\n\r]+ { return null; }

// Stat-line aikavälin kanssa: [period] stats
StatEntry = _ "[" period:Period "]" _ stats:StatLine {
  return { type: 'stats', period, ...stats };
}

StatLine = workouts:StatNum "W" __ exercises:StatNum "E" __ sets:StatNum "S" __ reps:StatNum "R" 
           weight:(__ w:Weight { return w; })? 
           minutes:(__ m:StatNum "m" { return m; })?
           contacts:(__ c:StatNum "C" { return c; })? _ NL {
  return { workouts, exercises, sets, reps, weight: weight || null, minutes: minutes || null, contacts: contacts || null };
}
StatNum = n:Float { return n; } / n:Int { return n; }
Weight = n:Float "t" { return n * 1000; } / n:Int "t" { return n * 1000; } / n:Int "kg" { return n; }
// Float supports both dot (.) and comma (,) as decimal separator (Finnish notation)
// Used where comma is not a list separator
Float = whole:[0-9]+ [.,] frac:[0-9]+ { return parseFloat(whole.join('') + '.' + frac.join('')); }
// FloatDot only supports dot - used in pyramid where comma separates sets
FloatDot = whole:[0-9]+ "." frac:[0-9]+ { return parseFloat(whole.join('') + '.' + frac.join('')); }

// Harjoitus mahdollisella päivämäärällä ja/tai ID:llä
// Formaatit: [pvm#id], [pvm], [#id]
// Otsikko ## on valinnainen - harjoitus voi alkaa suoraan L0-rivillä
// Tukee myös:
//   - [pvm] omalla rivillä ennen ## Otsikko
//   - ## [pvm] Otsikko (päivämäärä otsikon sisällä)
Workout = 
  // Perinteinen muoto: [meta] ## Otsikko (tai ## [meta] Otsikko)
  _ meta:("[" m:WorkoutMeta "]" _ { return m; })? "##" _ titleMeta:TitleWithOptionalDate content:ContentLine* { 
    const finalMeta = meta || titleMeta.meta;
    return { 
      type: 'workout',
      id: finalMeta?.id || null,
      date: finalMeta?.date || null,
      title: titleMeta.title.trim(), 
      content: content.filter(x => x) 
    }; 
  }
  // [meta] omalla rivillä, sitten ## Otsikko
  / _ meta:("[" m:WorkoutMeta "]" _ { return m; }) NL "##" _ title:RestOfLine content:ContentLine* { 
    return { 
      type: 'workout',
      id: meta?.id || null,
      date: meta?.date || null,
      title: title.trim(), 
      content: content.filter(x => x) 
    }; 
  }
  // Ilman otsikkoa: alkaa suoraan content-rivillä (L, E, R, P, I jne.)
  // Meta-blokin jälkeen voi olla rivinvaihto tai content samalla rivillä
  / _ meta:("[" m:WorkoutMeta "]" _ { return m; })? NL? &ContentLine content:ContentLine+ { 
    return { 
      type: 'workout',
      id: meta?.id || null,
      date: meta?.date || null,
      title: null, 
      content: content.filter(x => x) 
    }; 
  }

// Otsikko voi sisältää [pvm] alusta: ## [2026-01-24] Välipala
TitleWithOptionalDate = 
  "[" m:WorkoutMeta "]" _ title:RestOfLine { return { meta: m, title: title.trim() }; }
  / title:RestOfLine { return { meta: null, title: title.trim() }; }

// [pvm#id], [pvm#?], [pvm], [#id], [#?]
WorkoutMeta = 
  date:Period "#?" { return { date, id: null }; }
  / date:Period "#" id:Identifier { return { date, id }; }
  / "#?" { return { date: null, id: null }; }
  / "#" id:Identifier { return { date: null, id }; }
  / date:Period { return { date, id: null }; }

Identifier = chars:[a-zA-Z0-9_-]+ { return chars.join(''); }

ContentLine = !("##" / "[") line:Line { return line; }
// Pyramid and Circuit before Phase (all can start with P when using verbose prefixes)
Line = Text / Tags / Emojis / Summary / Sport / Pyramid / Circuit / Phase / Food / Drinking / Expense / Reminder / Location / Url / BodyMeasurement / SleepEntry / Health / Section / Exercise / Interval / Run / Duration / Contacts / Max / Best / Feeling / Pain / Vitals / Derived / Custom / GenericMeta / StandaloneSplit / Comment / HorizontalRule / EmptyLine / UnknownLine

// UnknownLine - catch-all for lines that don't match any pattern
// This prevents one malformed line from breaking the entire document
UnknownLine = text:$[^\n\r]+ NL { return { type: 'unknown', raw: text.trim() }; }

// Text - Free-form text/comment line
// Format: Text This is a comment
// Used for notes, descriptions, and general text content
Text = "Text" _ value:RestOfLine {
  return { type: 'text', value: value.trim() };
}

// Tags - AI-generated searchable tags for the workout
// Format: T tag1, tag2, tag3 (tags can contain spaces, e.g., "dynaaminen venyttely")
// Alias: Tags
TagsPrefix = "Tags"
Tags = TagsPrefix _ tags:TagList NL {
  return { type: 'tags', tags };
}

// Emojis - Visual indicators for the entry (shown in calendar)
// Format: Emojis 🏃💪🥗 (1-5 emojis representing the content)
Emojis = "Emojis" _ emojis:EmojiList NL {
  return { type: 'emojis', emojis };
}
EmojiList = chars:[^\n\r]+ { 
  // Extract emoji characters (Unicode ranges for emoji)
  const text = chars.join('').trim();
  // Match emoji characters using a simple approach
  const emojis = [...text].filter(c => c.charCodeAt(0) > 127);
  return emojis.join('');
}

// Summary - Short description for calendar view (max ~100 chars)
// Format: Summary Voimaharjoitus: kyykky, penkki, mave
// Alias: S (but Section also uses S, so prefer "Summary")
Summary = "Summary" _ text:RestOfLine {
  return { type: 'summary', text: text.trim() };
}

TagList = first:Tag rest:(_ "," _ t:Tag { return t; })* {
  return [first, ...rest];
}

// Tag voi sisältää välilyöntejä ja sulkeita (esim. "Polven kuntoutus (Isometriset)"), mutta ei pilkkua
Tag = chars:[a-zA-ZäöåÄÖÅ0-9_() -]+ { return chars.join('').trim(); }
EmptyLine = [ \t]* [\n\r]+ { return null; }

// Vaakaviiva (sekä doc-tasolla että workout-sisällössä)
HorizontalRule = _ "-"+ _ NL { return null; }
Period = RollingWeeks / DateRange / Week / YearMonth / Year / DateTime / Date / UnknownDate

// Unknown/placeholder date: ????-??-??
UnknownDate = "????-??-??" { 
  return { type: 'date', year: null, month: null, day: null, unknown: true }; 
}

// DateTime with optional timezone: 2026-01-06T06:58 or 2026-01-06T06:58+02
DateTime = y:Year4 "-" m:Month "-" d:Day "T" h:Hour ":" min:Minute tz:Timezone? { 
  return { type: 'datetime', year: y, month: m, day: d, hour: h, minute: min, timezone: tz || null }; 
}

Hour = d1:[0-2] d2:[0-9] { return parseInt(d1+d2, 10); }
Minute = d1:[0-5] d2:[0-9] { return parseInt(d1+d2, 10); }
Timezone = sign:[+-] d1:[0-9] d2:[0-9]? { return sign + d1 + (d2 || ''); }

Date = y:Year4 "-" m:Month "-" d:Day { 
  return { type: 'date', year: y, month: m, day: d }; 
}

Week = "W" w:WeekNum "/" y:Year4 { 
  return { type: 'week', year: y, week: w }; 
}

YearMonth = y:Year4 "-" m:Month !("-" Day) { 
  return { type: 'month', year: y, month: m }; 
}

Year = y:Year4 !("-" Month) { 
  return { type: 'year', year: y }; 
}

DateRange = y1:Year4 "-" m1:Month "-" d1:Day ".." d2:Day {
  return { type: 'range', year: y1, month: m1, startDay: d1, endDay: d2 };
} / y1:Year4 "-" m1:Month "-" d1:Day ".." y2:Year4 "-" m2:Month "-" d2:Day {
  return { type: 'range', startYear: y1, startMonth: m1, startDay: d1, endYear: y2, endMonth: m2, endDay: d2 };
}

RollingWeeks = n:Int "W:" y:Year4 "-" m:Month "-" d:Day {
  return { type: 'rolling', weeks: n, endYear: y, endMonth: m, endDay: d };
}

Year4 = d1:[0-9] d2:[0-9] d3:[0-9] d4:[0-9] { return parseInt(d1+d2+d3+d4, 10); }
Month = d1:[0-1] d2:[0-9] { return parseInt(d1+d2, 10); }
Day = d1:[0-3] d2:[0-9] { return parseInt(d1+d2, 10); }
WeekNum = d1:[0-5] d2:[0-9] { return parseInt(d1+d2, 10); }

// Phase - Harjoituksen vaihe - alias: P
// Phase1 Alkuverryttely|1km - numero + nimi + mahdollinen details
// Phase6|VOIMAKESTÄVYYS     - numero + putki + nimi (ei erillistä nimeä ennen putkea)
// Phase1 Alkuverryttely     - numero + nimi (ei putkea)
// Phase Voima/nop.kest.|    - ilman numeroa (number = null)
PhasePrefix = "Phase"
Phase = 
  PhasePrefix num:Int _ name:NamePart "|" details:RestOfLine { 
    return { type: 'phase', number: num, name: name.trim(), details: details.trim() || null }; 
  }
  / PhasePrefix num:Int "|" name:RestOfLine { 
    return { type: 'phase', number: num, name: name.trim(), details: null }; 
  }
  / PhasePrefix num:Int _ name:NamePart _ NL { 
    return { type: 'phase', number: num, name: name.trim(), details: null }; 
  }
  / PhasePrefix _ name:NamePart "|" details:RestOfLine { 
    return { type: 'phase', number: null, name: name.trim(), details: details.trim() || null }; 
  }
  / PhasePrefix _ name:NamePart _ NL { 
    return { type: 'phase', number: null, name: name.trim(), details: null }; 
  }

// Section Hypyt 70% 3m
// Section Hypyt 70% 3min
// Also supports segment notation for swim intervals:
// Section 0-100m 70% (distance range with intensity)
SectionPrefix = "Section"
SectionDurationUnit = "min" / "m"
Section = 
  // Segment notation: S 0-100m 70% (swimming intervals)
  SectionPrefix _ start:Int "-" end:Int unit:("m" / "km") _ intensity:Int "%" _ NL {
    return { type: 'section', name: start + '-' + end + unit, intensity: intensity, duration: null, segment: { start, end, unit } };
  }
  // Standard section with intensity and duration: S name intensity% duration
  / SectionPrefix _ name:SectionNameNoNum _ intensity:Int "%" _ duration:Int? SectionDurationUnit? _ NL {
    return { type: 'section', name: name, intensity: intensity, duration: duration || null };
  }
  // Numbered section: Section 1, Section 2 or S 1, S 2
  / SectionPrefix _ num:Int _ NL {
    return { type: 'section', name: 'Section ' + num, intensity: null, duration: null };
  }
  // Section with name only: S Drillit (no intensity or duration)
  / SectionPrefix _ name:SectionName _ NL {
    return { type: 'section', name: name, intensity: null, duration: null };
  }

// SectionName without numbers at end (to allow matching intensity after)
SectionNameNoNum = chars:[A-ZÄÖÅa-zäöå\-/()+',& ]+ { return chars.join('').trim(); }

// SectionName: Allows spaces and multiple words, letters and special chars
SectionName = chars:[A-ZÄÖÅa-zäöå0-9\-/()+',& ]+ { return chars.join('').trim(); }

// L - Laji/Sport/Discipline (tilamuutos)
// L0 = harjoitustyyppi (flätit kategoriat, ei kattokategorioita kuten "yleisurheilu")
// L1 = tarkenne (valinnainen, tarkentaa L0:aa)
// L2 = lisätarkenne (valinnainen, harvoin tarvitaan)
// Toimii "tilana" joka pysyy voimassa seuraavilla riveillä
//
// L0 vaihtoehdot (harjoitustyyppi):
//   juoksu, hypyt, loikat, heitot, aidat, uinti, voimaharjoittelu, kuntopiiri,
//   koordinaatio, alkuverryttely, loppuverryttely, venyttely, pyöräily,
//   vesijuoksu, yhdistelmä, lihaskunto, keskivartalo, peli
//
// L1 vaihtoehdot (tarkentaa L0:aa):
//   Juoksu: vedot, ylämäkivedot, alamäkivedot, tasavedot, intervallit,
//           vauhtikestävyys, peruskestävyys, tempo, kiihdytykset
//   Loikat: vuoroloikat, kinkkaloikat, kolmiloikat, porrasloikat, tasamaalla, ylämäessä
//   Hypyt: pituus, korkeus, seiväs
//   Uinti: vapaauinti, selkäuinti, rintauinti, perhosuinti, sekauinti, tekniikka, kiihdytykset, vedot
//   Voimaharjoittelu: kestovoima, perusvoima, nopeusvoima, maksimivoima, pikavoima, lajivoima, yläkroppa, alakroppa
//   Koordinaatio: polvennostot, pakarajuoksu, aitakävely, askellus
//
// L2 vaihtoehdot (lisätarkenne, harvoin tarvitaan):
//   Uinti/tekniikka: sculling, potkut, käännökset, startti
//   Loikat: ponnistus, alastulo
//   Vapaamuotoinen tarkenne tarvittaessa

// Level (Sport/discipline)
LevelPrefix = "Level"
Sport = LevelPrefix level:SportLevel _ name:SportNameByLevel _ NL {
  return { type: 'sport', level, name };
}
SportLevel = "0" { return 0; } / "1" { return 1; } / "2" { return 2; } / "3" { return 3; }

// L0 - Harjoitustyypit (flätit kategoriat)
SportL0 = 
  "juoksu"i / "hypyt"i / "loikat"i / "heitot"i / "aidat"i /
  "uinti"i / "voimaharjoittelu"i / "kuntopiiri"i / 
  "koordinaatio"i / "alkuverryttely"i / "loppuverryttely"i /
  "venyttely"i / "pyöräily"i / "vesijuoksu"i / 
  "yhdistelmä"i / "lihaskunto"i / "keskivartalo"i / "peli"i

// L1 - Tarkenteet (valinnainen, kontekstista riippuva)
SportL1 = 
  // Juoksu
  "vedot"i / "ylämäkivedot"i / "alamäkivedot"i / "tasavedot"i /
  "intervallit"i / "vauhtikestävyys"i / "peruskestävyys"i / 
  "tempo"i / "kiihdytykset"i /
  // Loikat
  "vuoroloikat"i / "kinkkaloikat"i / "kolmiloikat"i / 
  "porrasloikat"i / "tasamaalla"i / "ylämäessä"i /
  // Hypyt
  "pituus"i / "korkeus"i / "seiväs"i /
  // Uinti
  "vapaauinti"i / "selkäuinti"i / "rintauinti"i / "perhosuinti"i / 
  "sekauinti"i / "tekniikka"i /
  // Voimaharjoittelu
  "kestovoima"i / "perusvoima"i / "nopeusvoima"i / 
  "maksimivoima"i / "pikavoima"i / "lajivoima"i /
  "yläkroppa"i / "alakroppa"i /
  // Koordinaatio
  "polvennostot"i / "pakarajuoksu"i / "aitakävely"i / "askellus"i

// L2 - Lisätarkenteet (valinnainen, harvoin käytetty)
SportL2 =
  // Uintitekniikka
  "sculling"i / "potkut"i / "käännökset"i / "startti"i /
  // Loikat
  "ponnistus"i / "alastulo"i

// Validointi: tunnistetut nimet tai fallback vapaamuotoiselle
// SportNameFree first to allow longer matches like "rintauinti (breaststroke)"
SportNameByLevel = 
  name:SportNameFree { return name; }

SportNameFree = chars:[A-ZÄÖÅa-zäöå0-9\-/()._ ]+ { return chars.join('').trim(); }

// Exercise with optional recovery (for circuit training: 20s work / 10s rest)
ExercisePrefix = "Exercise"
Exercise = 
  // Multi-set format with note: Exercise name|1x4@50kg,2x2@60kg | note
  // Converts to pyramid type
  ExercisePrefix _ name:NamePart "|" sets:CommaSetList note:PipeNote? _ NL {
    return { type: 'pyramid', name, sets: sets, note: note || null };
  }
  // Distance exercise with recovery before weight: E name|3x40m/2min@2x32kg
  / ExercisePrefix _ name:NamePart "|" sets:Int "x" dist:Int unit:DistanceUnit recovery:ExerciseRecovery weight:ExerciseWeight note:PipeNote? desc:ExerciseDesc? customFields:CustomFields? _ NL {
    return {
      type: 'exercise',
      name,
      sets,
      reps: null,
      repsMax: null,
      distance: dist,
      unit,
      weight,
      recovery,
      note: note || null,
      description: desc || null,
      customFields: customFields || null,
    };
  }
  // Format with recovery before weight: E name|spec/recovery@weight [[custom:val]] (LLM-generated)
  / ExercisePrefix _ name:NamePart "|" spec:ExerciseSpecBase recovery:ExerciseRecovery weight:ExerciseWeight desc:ExerciseDesc customFields:CustomFields note:PipeNote? _ NL {
    return { type: 'exercise', name, ...spec, weight, recovery, note: note || null, description: desc || null, customFields: customFields || null };
  }
  // Format with recovery before weight + description before note: E name|spec/recovery@weight (desc) | note
  / ExercisePrefix _ name:NamePart "|" spec:ExerciseSpecBase recovery:ExerciseRecovery weight:ExerciseWeight desc:ExerciseDesc note:PipeNote? customFields:CustomFields? _ NL {
    return { type: 'exercise', name, ...spec, weight, recovery, note: note || null, description: desc || null, customFields: customFields || null };
  }
  / ExercisePrefix _ name:NamePart "|" spec:ExerciseSpecBase recovery:ExerciseRecovery weight:ExerciseWeight note:PipeNote? desc:ExerciseDesc? customFields:CustomFields? _ NL {
    return { type: 'exercise', name, ...spec, weight, recovery, note: note || null, description: desc || null, customFields: customFields || null };
  }
  // Standard format with CustomFields BEFORE note: E name|spec [[custom:val]] |note
  / ExercisePrefix _ name:NamePart "|" spec:ExerciseSpec recovery:ExerciseRecovery? customFields:CustomFields note:PipeNote? _ NL {
    return { type: 'exercise', name, ...spec, recovery: recovery || null, note: note || null, description: null, customFields: customFields || null };
  }
  // Standard format: E name|spec [[custom:val]]
  / ExercisePrefix _ name:NamePart "|" spec:ExerciseSpec recovery:ExerciseRecovery? note:PipeNote? desc:ExerciseDesc? customFields:CustomFields? _ NL {
    return { type: 'exercise', name, ...spec, recovery: recovery || null, note: note || null, description: desc || null, customFields: customFields || null };
  }
  // Tolerant format: structured exercise with extra pipe segments
  / ExercisePrefix _ name:NamePart "|" spec:ExerciseSpec recovery:ExerciseRecovery? extraSegments:ExtraPipeSegments customFields:CustomFields? _ NL {
    const mergedNote = extraSegments.length > 0 ? extraSegments.join(' | ') : null;
    return { type: 'exercise', name, ...spec, recovery: recovery || null, note: mergedNote, description: null, customFields: customFields || null };
  }
  // Tolerant recovery-before-weight format with extra pipe segments
  / ExercisePrefix _ name:NamePart "|" spec:ExerciseSpecBase recovery:ExerciseRecovery weight:ExerciseWeight extraSegments:ExtraPipeSegments customFields:CustomFields? _ NL {
    const mergedNote = extraSegments.length > 0 ? extraSegments.join(' | ') : null;
    return { type: 'exercise', name, ...spec, weight, recovery, note: mergedNote, description: null, customFields: customFields || null };
  }
  // Tolerant text format with multiple pipe segments
  / ExercisePrefix _ name:NamePart "|" first:$[^|\n\r\[]+ extraSegments:ExtraPipeSegments customFields:CustomFields? _ NL {
    const mergedDescription = [first.trim(), ...extraSegments].filter(Boolean).join(' | ');
    return { type: 'exercise', name, sets: null, reps: null, unit: null, weight: null, recovery: null, note: null, description: mergedDescription || null, customFields: customFields || null };
  }
  // Text-only after pipe: E name|description [[custom:val]]
  / ExercisePrefix _ name:NamePart "|" desc:$[^|\n\r\[]+ customFields:CustomFields? _ NL {
    return { type: 'exercise', name, sets: null, reps: null, unit: null, weight: null, recovery: null, note: null, description: desc.trim() || null, customFields: customFields || null };
  }
  // Exercise with description in parentheses: E Koulupaini (1p matolta ajosta, 2p nostosta)
  / ExercisePrefix _ name:NamePartNoNumbers _ "(" desc:ParenContent ")" customFields:CustomFields? _ NL {
    return { type: 'exercise', name: name.trim(), sets: null, reps: null, unit: null, weight: null, recovery: null, note: null, description: desc, customFields: customFields || null };
  }
  // No spec: E name [[custom:val]] (just exercise name, no sets/reps)
  / ExercisePrefix _ name:NamePartNoNumbers customFields:CustomFields? _ NL {
    return { type: 'exercise', name, sets: null, reps: null, unit: null, weight: null, recovery: null, note: null, description: null, customFields: customFields || null };
  }

// Comma-separated set list: 1x4@50kg,2x2@60kg or 4x50kg, 2x2x60kg (with optional space)
// Supports multiple formats:
// - 1x4@50kg = 1 set of 4 reps @ 50kg (with @)
// - 4x50kg = 4 reps @ 50kg (without @, implicit 1 set)
// - 2x2x60kg = 2 sets of 2 reps @ 60kg (no @)
CommaSetList = first:CommaSetItem rest:("," _? item:CommaSetItem { return item; })+ {
  return [first, ...rest];
}

// Single set item in comma list - multiple formats supported
// Returns { sets, reps, weight } to preserve set count information
CommaSetItem = 
  // Format: 2x2x60kg (sets × reps × weight, no @)
  _? sets:Int "x" reps:Int "x" weight:Number unit:WeightUnit {
    return { sets: sets, reps: reps, weight: { value: weight, unit } };
  }
  // Format: 1x4@50kg (sets × reps @ weight)
  / _? sets:Int "x" reps:Int "@" weight:Number unit:WeightUnit {
    return { sets: sets, reps: reps, weight: { value: weight, unit } };
  }
  // Format: 4x50kg (reps × weight, implicit 1 set, no @)
  / _? reps:Int "x" weight:Number unit:WeightUnit {
    return { sets: 1, reps: reps, weight: { value: weight, unit } };
  }

// Weight in comma set: @50kg or @60kg (legacy, kept for compatibility)
CommaSetWeight = "@" v:Number unit:WeightUnit { return { value: v, unit }; }

// Content inside parentheses (can contain commas, letters, numbers, spaces)
ParenContent = chars:[A-ZÄÖÅa-zäöå0-9\-/,.'#: ]+ { return chars.join('').trim(); }

// Exercise name without numbers at the end (to avoid matching "E 3x10" as name)
// Note: Parentheses NOT included here so that "E Name (desc)" rule can match
NamePartNoNumbers = chars:[A-ZÄÖÅa-zäöå\-/+,.'#: ]+ { return chars.join('').trim(); }

// Exercise name allowing parentheses (for cases where the entire name is captured)
NamePartNoNumbersWithParen = chars:[A-ZÄÖÅa-zäöå\-/()+,.'#: ]+ { return chars.join('').trim(); }

// ExerciseSpecBase: Specs without weight (for when weight comes after recovery)
ExerciseSpecBase = 
  // 2-3x15-20 - sarjaväli x toistoväli
  setsMin:Int "-" setsMax:Int "x" repsMin:Int "-" repsMax:Int unit:TimeUnit? perSide:PerSideModifier? {
    const result = { sets: setsMin, setsMax, reps: repsMin, repsMax, unit: unit || null, weight: null };
    if (perSide) result.repsRight = repsMin;
    return result;
  }
  // 2-3x10 tai 2-3x30s - sarjaväli + toistot
  / setsMin:Int "-" setsMax:Int "x" reps:Int unit:TimeUnit? perSide:PerSideModifier? {
    const result = { sets: setsMin, setsMax, reps, repsMax: null, unit: unit || null, weight: null };
    if (perSide) result.repsRight = reps;
    return result;
  }
  // 3x10 tai 3x30s - sarjat x toistot (with optional /suunta, /puoli, etc.)
  / sets:Int "x" reps:Int unit:TimeUnit? perSide:PerSideModifier? {
    const result = { sets, reps, repsMax: null, unit: unit || null, weight: null };
    if (perSide) result.repsRight = reps;
    return result;
  }
  // 3x40m - sets x distance (for carries / loaded walks when recovery comes before weight)
  / sets:Int "x" dist:Int unit:DistanceUnit {
    return { sets, reps: null, repsMax: null, distance: dist, unit, weight: null };
  }

// Per-side modifier: /suunta, /puoli, /jalka, /käsi, /per side, /side, /leg, /arm
PerSideModifier = "/" ("suunta" / "puoli" / "jalka" / "käsi" / "per side" / "side" / "leg" / "arm" / "per leg" / "per arm" / "each") {
  return true;
}

// Recovery time for exercises (circuit training): /10s, /5-10s, /2min
ExerciseRecovery = 
  "/" min:Number "-" max:Number ("sec" / "s") { return { value: min, max: max, unit: 'sec' }; }
  / "/" v:Number ("sec" / "s") { return { value: v, max: null, unit: 'sec' }; }
  / "/" min:Number "-" max:Number ("min" / "m") { return { value: min, max: max, unit: 'min' }; }
  / "/" v:Number ("min" / "m") { return { value: v, max: null, unit: 'min' }; }
  // Recovery without unit - assume seconds (e.g., /15 = 15 sec)
  / "/" v:Number { return { value: v, max: null, unit: null }; }

// Note after pipe: |per jalka, |vasen käsi (allow optional space before pipe)
PipeNote = _ "|" _ text:$[^|\n\r\[]+ { return text.trim(); }

// Extra pipe-separated segments for tolerant parsing, e.g. |60s|90s or trailing |
ExtraPipeSegments = segments:(_ "|" _ text:$[^|\n\r\[]* { return text.trim(); })+ { return segments.filter(Boolean); }

// Custom fields at end of exercise line: [[Leveys:2]] [[Liikelaajuus:90°]]
// Multiple fields possible: E nimi|spec [[Leveys:2]] [[Tempo:3010]]
CustomFields = fields:CustomField+ { return fields; }

// Custom field with value: [[Tempo:3010]] or boolean flag: [[käsiräpylät]]
CustomField = _ "[[" name:CustomFieldName value:(":" v:CustomFieldValue { return v; })? "]]" {
  // If no value, treat as boolean true
  if (value === null) {
    return { name: name.trim(), value: true, unit: null };
  }
  return { name: name.trim(), value: value.value, unit: value.unit };
}

// Custom field name: free text until ':' or ']]' (allows commas and natural language)
CustomFieldName = chars:[^:\]\n\r]+ { return chars.join(''); }

// Custom field value: number with optional unit (e.g., 90° or 3010 or 2.5cm)
// OR text value (e.g., "Viistomyötäote", "40mm pyörivät kahvat")
CustomFieldValue = 
  // Number with optional unit: 90°, 3010, 2.5cm
  v:Number unit:$[^|\]\n\r]* { return { value: v, unit: unit.trim() || null }; }
  // Text value: Viistomyötäote, Vastavasaraote
  / text:$[^|\]\n\r]+ { return { value: text.trim(), unit: null }; }

// Optional description after exercise spec (separated by space)
ExerciseDesc = " "+ text:$[^\n\r\[]+ {
  const trimmed = text.trim();
  if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

// Measured duration item: 23s or 23s+28s (bilateral)
MeasuredDurationItem = 
  // Bilateral: 23s+28s
  left:Int unit1:TimeUnit "+" right:Int unit2:TimeUnit {
    return { left, right, unit: unit1 };
  }
  // Bilateral with single unit: 23+28s
  / left:Int "+" right:Int unit:TimeUnit {
    return { left, right, unit };
  }
  // Single: 23s
  / value:Int unit:TimeUnit {
    return { left: value, right: null, unit };
  }

// Comma-separated measured durations: 23s, 34s, 28s or 23s+28s, 30s+32s
// Also supports single duration with trailing comma: 41s, (to distinguish from planned "41s")
// Also supports AI output with leading set count: 3x45s,45s,0s
MeasuredDurationList = 
  // AI output: Nx followed by measured list (e.g., 3x45s,45s,0s)
  sets:Int "x" first:MeasuredDurationItem rest:("," _? item:MeasuredDurationItem { return item; })+ {
    return [first, ...rest];
  }
  // Multiple durations
  / first:MeasuredDurationItem rest:("," _? item:MeasuredDurationItem { return item; })+ {
    return [first, ...rest];
  }
  // Single duration with trailing comma: 41s, (serialized by buildCompactFromResult)
  / duration:MeasuredDurationItem "," {
    return [duration];
  }

ExerciseSpec = 
  // MEASURED DURATIONS: pilkkueroteltu aikalista (23s, 34s, 28s tai 23s+28s, 30s+32s)
  // Pitää olla ennen muita sääntöjä koska parseri yrittää järjestyksessä
  durations:MeasuredDurationList {
    // Check if bilateral (any item has right value)
    const isBilateral = durations.some(d => d.right !== null);
    return { 
      specType: 'measured',
      measuredDurations: durations,
      sets: durations.length,
      reps: null,
      repsMax: null,
      unit: durations[0].unit,
      weight: null,
      isBilateral
    };
  }
  // BILATERAALI AIKA ensin (ennen multisettiä) koska se on spesifisempi: 30s+30s, 30+30s
  // 30s+30s - bilateraali aika (30s per puoli, esim. venytykset)
  / repsL:Int unit1:TimeUnit "+" repsR:Int unit2:TimeUnit {
    return { sets: 1, reps: repsL, repsRight: repsR, repsMax: null, unit: unit1, weight: null };
  }
  // 30+30s - bilateraali aika yhdellä yksiköllä (30+30s per puoli)
  / repsL:Int "+" repsR:Int unit:TimeUnit {
    return { sets: 1, reps: repsL, repsRight: repsR, repsMax: null, unit, weight: null };
  }
  // BILATERAL with weight: 4x6+6@20kg (sets x reps+reps @ weight)
  // This MUST be before multiset to prevent 4x6+6 being parsed as multiset
  / sets:Int "x" repsL:Int "+" repsR:Int weight:ExerciseWeight {
    return { sets, reps: repsL, repsRight: repsR, repsMax: null, unit: null, weight };
  }
  // MULTISET: 3x3+3+2-4@25kg - monisarja (requires at least 3 parts: 3x3+3+2)
  // Pattern: SxR+R+R... (at least 2 plus signs)
  / first:MultiSetFirst second:("+" p:MultiSetPart { return p; }) rest:("+" p:MultiSetPart { return p; })+ weight:ExerciseWeight {
    return { 
      specType: 'multiset',
      parts: [first, second, ...rest], 
      weight,
      sets: null, reps: null, repsMax: null, unit: null
    };
  }
  // MULTISET ilman painoa: 3x3+3+2-4 (at least 2 plus signs)
  / first:MultiSetFirst second:("+" p:MultiSetPart { return p; }) rest:("+" p:MultiSetPart { return p; })+ {
    return { 
      specType: 'multiset',
      parts: [first, second, ...rest], 
      weight: null,
      sets: null, reps: null, repsMax: null, unit: null
    };
  }
  // 3x12x60s@bodyweight - kierrokset x liikkeet x aika @ paino (kuntopiiri)
  / rounds:Int "x" reps:RepCount "x" duration:Int unit:TimeUnit weight:ExerciseWeight {
    return { rounds, sets: 1, reps, repsMax: null, duration, unit, weight };
  }
  // 3x12x60s - kierrokset x liikkeet x aika (ei painoa)
  / rounds:Int "x" reps:RepCount "x" duration:Int unit:TimeUnit {
    return { rounds, sets: 1, reps, repsMax: null, duration, unit, weight: null };
  }
  // 3x40m - sarjat x matka (esim. farmers walk recovery-before-weight -polussa)
  / sets:Int "x" dist:Int unit:DistanceUnit {
    return { sets, reps: null, repsMax: null, distance: dist, unit, weight: null };
  }
  // 3x8@60kg - sarjat x toistot @ paino
  / sets:Int "x" reps:RepCount weight:ExerciseWeight {
    return { sets, reps, repsMax: null, unit: null, weight };
  }
  // 3x60s@bodyweight - sarjat x aika @ paino (esim. kuntopiiri)
  / sets:Int "x" reps:RepCount unit:TimeUnit weight:ExerciseWeight {
    return { sets, reps, repsMax: null, unit, weight };
  }
  // 3x40m@2x70kg - sarjat x matka @ paino (esim. farmers walk 40m per sarja)
  / sets:Int "x" dist:Int unit:DistanceUnit weight:ExerciseWeight {
    return { sets, reps: null, repsMax: null, distance: dist, unit, weight };
  }
  // 8x60kg, 10x5.4kg - toistot x paino (ilman @-merkkiä, tukee desimaaleja)
  / reps:Int "x" weight:Number unit:WeightUnit {
    return { sets: 1, reps, repsMax: null, unit: null, weight: { value: weight, unit } };
  }
  // 3x15-20@bw - sarjat x toistoväli @ paino (esim. kuntopiiri)
  / sets:Int "x" repsMin:Int "-" repsMax:Int weight:ExerciseWeight {
    return { sets, reps: repsMin, repsMax, unit: null, weight };
  }
  // 3x30-60s@bw - sarjat x toistoväli + aikayksikkö + paino (esim. lankku)
  / sets:Int "x" repsMin:Int "-" repsMax:Int unit:TimeUnit weight:ExerciseWeight {
    return { sets, reps: repsMin, repsMax, unit, weight };
  }
  // 4x2x6@20kg - kierrokset x sarjat x toistot @ paino (esim. Visan liike)
  / rounds:Int "x" sets:Int "x" reps:Int weight:ExerciseWeight {
    return { rounds, sets, reps, repsMax: null, unit: null, weight, count: null };
  }
  // 2x3x20-30m@bw - sarjat x toistot x matkaväli + yksikkö + paino (loikat)
  // HUOM: Pitää olla ennen 3x4x5 sääntöä!
  / sets:Int "x" reps:Int "x" distMin:Int "-" distMax:Int unit:DistanceUnit weight:ExerciseWeight {
    return { sets, reps, repsMax: null, distanceMin: distMin, distanceMax: distMax, unit, weight };
  }
  // 2x3x20-30m - sarjat x toistot x matkaväli (loikat, ilman painoa)
  / sets:Int "x" reps:Int "x" distMin:Int "-" distMax:Int unit:DistanceUnit {
    return { sets, reps, repsMax: null, distanceMin: distMin, distanceMax: distMax, unit, weight: null };
  }
  // 3x4x5 - sarjat x toistot x lukumäärä (esim. 3x4x5 aitaa)
  / sets:Int "x" reps:Int "x" count:Int {
    return { sets, reps, repsMax: null, unit: null, weight: null, count };
  }
  // 3x30s+30s - sarjat x bilateraali aika molemmin puolin (esim. 3x30s vasen + 30s oikea)
  / sets:Int "x" repsL:Int unit1:TimeUnit "+" repsR:Int unit2:TimeUnit {
    return { sets, reps: repsL, repsRight: repsR, repsMax: null, unit: unit1, weight: null };
  }
  // 3x20+20m - sarjat x bilateraali matka/aika (esim. karioka 20m+20m)
  / sets:Int "x" repsL:Int "+" repsR:Int unit:TimeUnit {
    return { sets, reps: repsL, repsRight: repsR, repsMax: null, unit, weight: null };
  }
  // 2x10+10 - sarjat x bilateraali toistot ilman painoa
  / sets:Int "x" repsL:Int "+" repsR:Int {
    return { sets, reps: repsL, repsRight: repsR, repsMax: null, unit: null, weight: null };
  }
  // 3x200-500 - sarjat x toistoväli (ei painoa)
  / sets:Int "x" repsMin:Int "-" repsMax:Int unit:TimeUnit? perSide:PerSideModifier? {
    const result = { sets, reps: repsMin, repsMax, unit: unit || null, weight: null };
    if (perSide) result.repsRight = repsMin;
    return result;
  }
  // 1xRM@bw tai 8x60@60kg - sarjat x toistot @ paino
  / sets:Int "x" reps:RepCount weight:ExerciseWeight {
    return { sets, reps, repsMax: null, unit: null, weight };
  }
  // 8x60 tai 8x60s - sarjat x toistot (ei painoa), tukee myös 3x? ja /suunta
  / sets:Int "x" reps:RepCount unit:TimeUnit? perSide:PerSideModifier? {
    const result = { sets, reps, repsMax: null, unit: unit || null, weight: null };
    if (perSide) result.repsRight = reps;
    return result;
  }
  // 15+15@2kg - bilateraali toistot + paino (15 per puoli)
  / repsL:Int "+" repsR:Int weight:ExerciseWeight {
    return { sets: 1, reps: repsL, repsRight: repsR, repsMax: null, unit: null, weight };
  }
  // 15+15 - bilateraali toistot ilman painoa (HUOM: aika-bilateraalit ovat alussa!)
  / repsL:Int "+" repsR:Int {
    return { sets: 1, reps: repsL, repsRight: repsR, repsMax: null, unit: null, weight: null };
  }
  // 30s-60s - aika-alue (duration range), esim. venytykset
  / repsMin:Int unit1:TimeUnit "-" repsMax:Int unit2:TimeUnit {
    return { sets: 1, reps: repsMin, repsMax, unit: unit1, weight: null };
  }
  // 60s@bodyweight - aika @ paino (ei sarjoja)
  / reps:RepCount unit:TimeUnit weight:ExerciseWeight {
    return { sets: 1, reps, repsMax: null, unit, weight };
  }
  // 8@60kg - toistot @ paino
  / reps:RepCount weight:ExerciseWeight {
    return { sets: 1, reps, repsMax: null, unit: null, weight };
  }
  // 3-4x@bw - sarjaväli + paino ilman toistoja
  / setsMin:Int "-" setsMax:Int "x" weight:ExerciseWeight {
    return { sets: setsMin, setsMax, reps: null, repsMax: null, unit: null, weight };
  }
  // 2-3x3-4x20-30m@bw - sarjaväli x toistoväli x matkaväli + yksikkö + paino (loikkaharjoitukset)
  / setsMin:Int "-" setsMax:Int "x" repsMin:Int "-" repsMax:Int "x" distMin:Int "-" distMax:Int unit:DistanceUnit weight:ExerciseWeight {
    return { sets: setsMin, setsMax, reps: repsMin, repsMax, distanceMin: distMin, distanceMax: distMax, unit, weight };
  }
  // 2-3x3-4x20-30m - sarjaväli x toistoväli x matkaväli (loikkaharjoitukset, ilman painoa)
  / setsMin:Int "-" setsMax:Int "x" repsMin:Int "-" repsMax:Int "x" distMin:Int "-" distMax:Int unit:DistanceUnit {
    return { sets: setsMin, setsMax, reps: repsMin, repsMax, distanceMin: distMin, distanceMax: distMax, unit, weight: null };
  }
  // 2-3x15-20@bw - sarjaväli x toistoväli + paino
  / setsMin:Int "-" setsMax:Int "x" repsMin:Int "-" repsMax:Int unit:TimeUnit? weight:ExerciseWeight {
    return { sets: setsMin, setsMax, reps: repsMin, repsMax, unit: unit || null, weight };
  }
  // 2-3x15-20 - sarjaväli x toistoväli (esim. 2-3x15-20) - HUOM: pitää olla ennen 3-4x
  / setsMin:Int "-" setsMax:Int "x" repsMin:Int "-" repsMax:Int unit:TimeUnit? {
    return { sets: setsMin, setsMax, reps: repsMin, repsMax, unit: unit || null, weight: null };
  }
  // 2-3x?@bw - sarjaväli + tuntematon toistomäärä + paino
  / setsMin:Int "-" setsMax:Int "x" "?" weight:ExerciseWeight {
    return { sets: setsMin, setsMax, reps: null, repsMax: null, unit: null, weight };
  }
  // 2-3x? - sarjaväli + tuntematon toistomäärä
  / setsMin:Int "-" setsMax:Int "x" "?" {
    return { sets: setsMin, setsMax, reps: null, repsMax: null, unit: null, weight: null };
  }
  // 3-4x20+20@bw - sarjaväli x bilateraali + paino
  / setsMin:Int "-" setsMax:Int "x" repsL:Int "+" repsR:Int weight:ExerciseWeight {
    return { sets: setsMin, setsMax, reps: repsL, repsRight: repsR, repsMax: null, unit: null, weight };
  }
  // 3-4x20+20 - sarjaväli x bilateraali ilman painoa
  / setsMin:Int "-" setsMax:Int "x" repsL:Int "+" repsR:Int {
    return { sets: setsMin, setsMax, reps: repsL, repsRight: repsR, repsMax: null, unit: null, weight: null };
  }
  // 2-3x10@bw tai 2-3x30s@bw - sarjaväli + toistot + paino
  / setsMin:Int "-" setsMax:Int "x" reps:Int unit:TimeUnit? weight:ExerciseWeight {
    return { sets: setsMin, setsMax, reps, repsMax: null, unit: unit || null, weight };
  }
  // 2-3x10 tai 2-3x30s - sarjaväli + toistot
  / setsMin:Int "-" setsMax:Int "x" reps:Int unit:TimeUnit? {
    return { sets: setsMin, setsMax, reps, repsMax: null, unit: unit || null, weight: null };
  }
  // 3-4x - sarjaväli ilman toistoja (esim. 3-4 sarjaa) - HUOM: ennen 30-80 sääntöä!
  / setsMin:Int "-" setsMax:Int "x" {
    return { sets: setsMin, setsMax, reps: null, repsMax: null, unit: null, weight: null };
  }
  // 10-15@bodyweight - toistoväli + paino (esim. yhden jalan kyykky)
  / repsMin:Int "-" repsMax:Int weight:ExerciseWeight {
    return { sets: 1, reps: repsMin, repsMax, unit: null, weight };
  }
  // 10-25s@bw - toistoväli + aikayksikkö + paino (esim. hyppelyt aika-alueella)
  / repsMin:Int "-" repsMax:Int unit:TimeUnit weight:ExerciseWeight {
    return { sets: 1, reps: repsMin, repsMax, unit, weight };
  }
  // 30-60s - toistoväli + aikayksikkö lopussa (esim. venytykset)
  / repsMin:Int "-" repsMax:Int unit:TimeUnit {
    return { sets: 1, reps: repsMin, repsMax, unit, weight: null };
  }
  // 30-80 - pelkkä toistoväli (ei sarjoja, ei painoa)
  / repsMin:Int "-" repsMax:Int {
    return { sets: 1, reps: repsMin, repsMax, unit: null, weight: null };
  }
  // 3x@2kg - sarjat + paino ilman toistoja
  / sets:Int "x" weight:ExerciseWeight {
    return { sets, reps: null, repsMax: null, unit: null, weight };
  }
  // 3x - pelkät sarjat ilman toistoja (implisiittinen 1 toisto)
  / sets:Int "x" {
    return { sets, reps: null, repsMax: null, unit: null, weight: null };
  }
  // @bw - pelkkä paino ilman sarjoja ja toistoja (esim. lämmittely)
  / weight:ExerciseWeight {
    return { sets: 1, reps: null, repsMax: null, unit: null, weight };
  }
  // 8 tai 8s - pelkät toistot
  / reps:RepCount unit:TimeUnit? {
    return { sets: 1, reps, repsMax: null, unit: unit || null, weight: null };
  }

// Toistomäärä voi olla numero, ? (tuntematon), Max (maksimi), tai RM-merkintä (1RM, RM1, 3RM, RM3 jne.)
RepCount = "?" { return null; } / "Max"i { return 'max'; } / rm:RMNotation { return rm; } / n:Int { return n; }

// MultiSet ENSIMMÄINEN osa: vaatii SxR muodon (erottaa bilateraalisesta)
// Näin 3x3+3+2-4 tunnistetaan multisetiksi mutta 30+30s ei
MultiSetFirst = 
  // SxR1-R2: sarjat x toistoväli (esim. 2x5-8) - PITÄÄ OLLA ENNEN SxR!
  sets:Int "x" repsMin:Int "-" repsMax:Int { return { sets, reps: repsMin, repsMax }; }
  // SxR: sarjat x toistot (esim. 3x3)
  / sets:Int "x" reps:Int { return { sets, reps, repsMax: null }; }

// MultiSet JÄLKIosat: 3x3 (sarjat x toistot), 3 (1 sarja x 3 toistoa), tai 2-4 (1 sarja x 2-4 toistoa)
// Käytetään multiset-formaatissa: 3x3+3+2-4@25kg
MultiSetPart = 
  // SxR1-R2: sarjat x toistoväli (esim. 2x2-4) - PITÄÄ OLLA ENNEN SxR!
  sets:Int "x" repsMin:Int "-" repsMax:Int { return { sets, reps: repsMin, repsMax }; }
  // SxR: sarjat x toistot (esim. 3x3)
  / sets:Int "x" reps:Int { return { sets, reps, repsMax: null }; }
  // R1-R2: 1 sarja x toistoväli (esim. 2-4)
  / repsMin:Int "-" repsMax:Int { return { sets: 1, reps: repsMin, repsMax }; }
  // R: 1 sarja x toistot (esim. 3)
  / reps:Int { return { sets: 1, reps, repsMax: null }; }

// RM (Rep Max) merkintä: 1RM, RM1, 3RM, RM3, tai pelkkä RM (= 1RM)
RMNotation = 
  n:Int "RM"i { return { rm: n }; }
  / "RM"i n:Int { return { rm: n }; }
  / "RM"i { return { rm: 1 }; }

ExerciseWeight = 
  "@" ("bodyweight"i / "bw"i / "oma paino"i / "kehonpaino"i) { return { value: 0, unit: 'bodyweight' }; }
  / "@" ("stång"i / "tanko"i / "tangolla"i / "bar"i) { return { value: 20, unit: 'bar' }; }
  / "@" template:Template { return { template }; }
  // Percent range of 1RM: @60-80%1RM, @60-80%RM, @60-80%
  / "@" vMin:Number "-" vMax:Number "%" ("1RM"i / "RM"i)? { return { percent: vMin, percentMax: vMax, of: '1RM' }; }
  // Percent of 1RM: @70%1RM, @70%RM, @70%
  / "@" v:Number "%" ("1RM"i / "RM"i)? { return { percent: v, of: '1RM' }; }
  // Weight range: @5-10kg, @100-150lb
  / "@" vMin:Number "-" vMax:Number u:WeightUnit { return { value: vMin, valueMax: vMax, unit: u }; }
  // Multiple weights: @2x32kg, @2x70lb (2 times weight, e.g. farmer's walk)
  / "@" count:Int "x" v:Number u:WeightUnit { return { value: v, unit: u, count }; }
  / "@" v:Number u:WeightUnit { return { value: v, unit: u }; }
  // Text intensity: @easy, @hard - yleinen tekstimuotoinen intensiteetti
  / "@" text:IntensityText { return { text }; }

// Weight units: metric (kg) and imperial (lb)
WeightUnit = "kg" / "lb"

// Time unit: only s and min - "m" is reserved for meters to avoid LLM confusion
// NOTE: !"t" prevents matching "steps" as "s" + "teps"
TimeUnit = "s" !"t" { return "s"; } / "min"

// Distance unit for exercises: meters or kilometers (for exercises like farmers walk)
// NOTE: "m" !"in" prevents matching "min" (minutes) as "m" (meters)
DistanceUnit = "km" / "m" !"in" { return "m"; }

// Pyramid with weights: Pyramid penkki|10x40,8x50,6x60kg
// Pyramid with sets x reps x weight: Pyramid kyykky|3x5x80,2x2x85kg (3 sets of 5 reps @ 80kg, 2 sets of 2 reps @ 85kg)
// Pyramid with reps only: Pyramid naruhyppely|10,20,30,40,30,20,10
// Optional note: Pyramid penkki|10x40,8x50,6x60kg|kommentti
PyramidPrefix = "Pyramid"
Pyramid = 
  // Tolerant salvage for run-like shorthand produced with Pyramid prefix: Pyramid 3x4|60m
  PyramidPrefix _ sets:Int "x" count:Int "|" dist:RunDistanceRange unit:RunUnit note:PipeNote? _ NL {
    return { type: 'move', sport: 'juoksu', sets, count, countMax: null, distance: { ...dist, unit }, steps: null, intensity: null, recovery: null, note: note || null, description: 'salvaged from Pyramid shorthand', customFields: null, splits: null };
  }
  // Tolerant salvage for run-like shorthand produced with Pyramid prefix: Pyramid 3x4x60m
  / PyramidPrefix _ sets:Int "x" count:Int "x" dist:RunDistanceRange unit:RunUnit note:PipeNote? _ NL {
    return { type: 'move', sport: 'juoksu', sets, count, countMax: null, distance: { ...dist, unit }, steps: null, intensity: null, recovery: null, note: note || null, description: 'salvaged from Pyramid shorthand', customFields: null, splits: null };
  }
  / PyramidPrefix _ name:NamePart "|" sets:PyramidSetsWeighted unit:Unit? note:PipeNote? _ NL {
    // Unify weight format: { value: X, unit: "kg" } - same as Exercise
    // Unit can come from end (unit) or from each set (s.unit)
    const finalUnit = unit || sets.find(s => s.unit)?.unit || 'kg';
    
    // Expand sets that have setCount (setsxrepsxweight format)
    const expandedSets = [];
    for (const s of sets) {
      const setCount = s.setCount || 1;
      for (let i = 0; i < setCount; i++) {
        const pyramidSet = {
          reps: s.reps, 
          weight: { value: s.weight, unit: s.unit || finalUnit }
        };
        if (s.repsRight !== undefined && s.repsRight !== null) {
          pyramidSet.repsRight = s.repsRight;
        }
        expandedSets.push(pyramidSet);
      }
    }
    return { type: 'pyramid', name, sets: expandedSets, note: note || null };
  }
  / PyramidPrefix _ name:NamePart "|" sets:PyramidSetsReps note:PipeNote? _ NL {
    return { type: 'pyramid', name, sets: sets.map(reps => ({ reps, weight: null })), note: note || null };
  }

// Weighted sets: supports both repsxweight (10x40) and setsxrepsxweight (3x5x40)
// Examples: 10x40,8x50,6x60 OR 3x5x80,2x2x85kg
PyramidSetsWeighted = first:PSWeighted rest:("," s:PSWeighted { return s; })* { return [first, ...rest]; }

// PSWeighted matches either:
// - setsxrepsxweight: 3x5x80kg (3 sets of 5 reps @ 80kg) 
// - repsxweight: 10x40kg (10 reps @ 40kg)
PSWeighted = 
  // setsxbilateral-repsxweight: 2x20+20x80kg
  sets:Int "x" rL:Int "+" rR:Int "x" w:NumberDot u:Unit? { return { setCount: sets, reps: rL, repsRight: rR, weight: w, unit: u || null }; }
  // setsxbilateral-reps@weight: 2x20+20@80kg
  / sets:Int "x" rL:Int "+" rR:Int "@" w:NumberDot u:Unit? { return { setCount: sets, reps: rL, repsRight: rR, weight: w, unit: u || null }; }
  // bilateral-repsxweight: 20+20x45kg
  / rL:Int "+" rR:Int "x" w:NumberDot u:Unit? { return { setCount: 1, reps: rL, repsRight: rR, weight: w, unit: u || null }; }
  // bilateral-reps@weight: 20+20@45kg
  / rL:Int "+" rR:Int "@" w:NumberDot u:Unit? { return { setCount: 1, reps: rL, repsRight: rR, weight: w, unit: u || null }; }
  // First try setsxrepsxweight format: 3x5x80kg
  / sets:Int "x" r:Int "x" w:NumberDot u:Unit? { return { setCount: sets, reps: r, weight: w, unit: u || null }; }
  // Then try repsxweight format: 10x40kg
  / r:Int "x" w:NumberDot u:Unit? { return { setCount: 1, reps: r, weight: w, unit: u || null }; }

// Reps only: 10,20,30,40,30,20,10 or 10-20-30-40-30-20-10
PyramidSetsReps = 
  first:Int rest:([-,] r:Int { return r; })* { return [first, ...rest]; }

// Circuit/Superset - multiple exercises performed in rotation
// Circuit|3 rounds (or just Circuit|3)
// Circuit|? = AMRAP (As Many Rounds As Possible)
// > Exercise1 spec
// > Exercise2 spec
// Optional recovery between rounds: Circuit|3/2min
CircuitPrefix = "Circuit" / "Superset"

// Rounds can be a number or ? (AMRAP)
CircuitRounds = "?" { return null; } / n:Int { return n; }

Circuit = 
  // Full format: Circuit|3/2min (rounds + round rest) + exercises
  // Circuit|? for AMRAP (rounds = null)
  variant:CircuitPrefix "|" rounds:CircuitRounds roundRest:CircuitRoundRest? note:PipeNote? _ NL exercises:CircuitItemBlock {
    return { 
      type: 'circuit', 
      variant: variant.toLowerCase(), 
      rounds, 
      exercises, 
      roundRest: roundRest || null,
      note: note || null
    };
  }

// Optional round rest: /2min, /60s
CircuitRoundRest = 
  "/" v:Int unit:("min" / "m" / "s") { 
    return { value: v, unit: unit === 'm' ? 'min' : unit }; 
  }

// Circuit item block: one or more circuit item lines
CircuitItemBlock = items:CircuitItemLine+ { return items; }

// Circuit item line: > prefix followed by exercise specification
// > Penkkipunnerrus 8@80kg
// > Etunojapunnerrus 5
// > Hauiskääntö 10@12kg/30s
// Uses NamePartNoNumbers to stop name capture before numbers (spec)
CircuitItemLine = ">" _ name:NamePartNoNumbers spec:CircuitItemSpec? recovery:ExerciseRecovery? customFields:CustomFields? note:PipeNote? _ NL {
  return { 
    name: name.trim(),
    sets: spec?.sets || null,
    reps: spec?.reps || null,
    repsRight: spec?.repsRight || null,
    unit: spec?.unit || null,
    weight: spec?.weight || null,
    recovery: recovery || null,
    customFields: customFields || null,
    note: note || null
  };
}

// Circuit item spec - simplified exercise spec for circuit items
// Supports: 8@80kg, 10, 3x8@60kg, 30s, 10+10@5kg
CircuitItemSpec = 
  // Full spec: 3x8@60kg
  _ sets:Int "x" reps:Int weight:ExerciseWeight {
    return { sets, reps, unit: null, weight };
  }
  // Reps with weight: 8@80kg
  / _ reps:Int weight:ExerciseWeight {
    return { sets: 1, reps, unit: null, weight };
  }
  // Bilateral with weight: 10+10@5kg
  / _ repsL:Int "+" repsR:Int weight:ExerciseWeight {
    return { sets: 1, reps: repsL, repsRight: repsR, unit: null, weight };
  }
  // Sets x reps: 3x10
  / _ sets:Int "x" reps:Int unit:TimeUnit? {
    return { sets, reps, unit: unit || null, weight: null };
  }
  // Bilateral: 10+10
  / _ repsL:Int "+" repsR:Int {
    return { sets: 1, reps: repsL, repsRight: repsR, unit: null, weight: null };
  }
  // Duration: 30s, 60s
  / _ reps:Int unit:TimeUnit {
    return { sets: 1, reps, unit, weight: null };
  }
  // Reps only: 8, 10
  / _ reps:Int {
    return { sets: 1, reps, unit: null, weight: null };
  }

// Number can be float or int (comma allowed for Finnish notation)
Number = Float / Int
// NumberDot only uses dot for decimal - for contexts where comma is a separator
NumberDot = FloatDot / Int

// Interval 4x400m@80-90%/2-3m (recovery range)
// Interval 5x200m@50%/2min (single recovery)
// Interval 6x3min@Ylämäki/2m palautus (text intensity + note)
// Interval 5x1km@Z4/3min (zone intensity)
IntervalPrefix = "Interval"

// Text-based intensity (e.g., "Ylämäki", "Z4", "helppo")
IntervalTextIntensity = chars:[A-Za-zÀ-ÖØ-öø-ÿ0-9]+ { return chars.join(''); }

Interval = 
  // Numeric intensity range with recovery range: 4x400m@80-90%/2-3min
  IntervalPrefix _ count:Int "x" dist:Int unit:Unit "@" min:Int "-" max:Int "%" "/" rmin:Int "-" rmax:Int runit:("min" / "m") _ NL {
    return { type: 'interval', count, distance: {value:dist,unit}, intensity: {min,max}, recovery: {value:rmin, valueMax:rmax, unit:runit} };
  }
  // Numeric intensity with recovery range: 5x200m@50%/2-3min
  / IntervalPrefix _ count:Int "x" dist:Int unit:Unit "@" iVal:Int "%" "/" rmin:Int "-" rmax:Int runit:("min" / "m") _ NL {
    return { type: 'interval', count, distance: {value:dist,unit}, intensity: {min:iVal,max:iVal}, recovery: {value:rmin, valueMax:rmax, unit:runit} };
  }
  // Numeric intensity range with single recovery: 4x400m@80-90%/2m
  / IntervalPrefix _ count:Int "x" dist:Int unit:Unit "@" min:Int "-" max:Int "%" "/" rmin:Int runit:("min" / "m")? _ NL {
    return { type: 'interval', count, distance: {value:dist,unit}, intensity: {min,max}, recovery: {value:rmin, unit: runit || 'min'} };
  }
  // Numeric intensity with single recovery: 5x200m@50%/2m
  / IntervalPrefix _ count:Int "x" dist:Int unit:Unit "@" iVal:Int "%" "/" rmin:Int runit:("min" / "m")? _ NL {
    return { type: 'interval', count, distance: {value:dist,unit}, intensity: {min:iVal,max:iVal}, recovery: {value:rmin, unit: runit || 'min'} };
  }
  // Text intensity with recovery and optional note: 6x3min@Ylämäki/2m palautus
  / IntervalPrefix _ count:Int "x" dist:Int unit:Unit "@" intensityText:IntervalTextIntensity "/" rmin:Int runit:("min" / "m")? note:(_ [^\n]+)? _ NL {
    const noteText = note ? note[1].join('').trim() : null;
    return { type: 'interval', count, distance: {value:dist,unit}, intensityText, intensity: null, recovery: {value:rmin, unit: runit || 'min'}, note: noteText };
  }
  // Text intensity without recovery: 6x200m@Ylämäki
  / IntervalPrefix _ count:Int "x" dist:Int unit:Unit "@" intensityText:IntervalTextIntensity note:(_ [^\n]+)? _ NL {
    const noteText = note ? note[1].join('').trim() : null;
    return { type: 'interval', count, distance: {value:dist,unit}, intensityText, intensity: null, recovery: null, note: noteText };
  }

// Run/Move with optional range count (2-4x), optional unknown distance (?), text intensity
// Aliases: Run, R, Move, M - Move is preferred for non-running activities like swimming
// Extended: supports sets notation like 2x4x200m (2 sets of 4 reps of 200m)
// afterText allows text after recovery like "Run 3x200m@95%/2min hölkkä"
// Steps support: 30min 8228steps, 3.5km 8228steps, 30min 3.5km 8228steps
// Sport override: Move "vapaauinti" 100m | lämmittely (sport in quotes)
// Custom fields: Move "vapaauinti" 200m [[käsiräpylät]] | tekniikka
// Splits: child entries prefixed with > (not counted in statistics)
RunPrefix = "Move" / "Run"
Run = RunPrefix _ sport:SportName? spec:RunSpec intensity:RunIntensity? recovery:RunRecovery? afterText:RunAfterText? customFields:CustomFields? note:PipeNote? desc:RunDesc? _ NL splits:SplitBlock? {
  // afterText voi sisältää recovery-tekstin jos se on tekstimuotoinen (esim. "hölkkä")
  if (afterText && recovery === null) {
    recovery = { value: null, max: null, unit: null, text: afterText };
  } else if (afterText && recovery) {
    recovery.text = afterText;
  }
  return { type: 'move', sport: sport || 'juoksu', ...spec, intensity, recovery, note: note || null, description: desc || null, customFields: customFields || null, splits: splits || null };
}

// Split block: one or more split lines (child entries of a Move)
SplitBlock = splits:SplitLine+ { return splits; }

// Split line: > prefix indicates a child split (not counted in statistics)
// Format: > 150m | note  OR  > Split 150m | note  OR  > 150m 3'39"/100m | note
// Supports nesting: > > for deeper nested splits
// Supports pace: 3'39"/100m or 3:39/100m, HR: 124bpm, custom fields: [[käsiräpylät]]
SplitLine = ">" _ "Split"? _ spec:SplitSpec hr:SplitHR? intensity:RunIntensity? customFields:CustomFields? note:PipeNote? _ NL nestedSplits:NestedSplitBlock? {
  return { 
    type: 'split', 
    distance: spec.distance || null, 
    duration: spec.duration || null,
    pace: spec.pace || null,
    intensity: intensity || null,
    hr: hr || null,
    customFields: customFields || null,
    note: note || null,
    splits: nestedSplits || null
  };
}

// Nested split block (2 levels deep: > >)
NestedSplitBlock = splits:NestedSplitLine+ { return splits; }
NestedSplitLine = ">" _ ">" _ "Split"? _ spec:SplitSpec hr:SplitHR? intensity:RunIntensity? customFields:CustomFields? note:PipeNote? _ NL {
  return { 
    type: 'split', 
    distance: spec.distance || null, 
    duration: spec.duration || null,
    pace: spec.pace || null,
    intensity: intensity || null,
    hr: hr || null,
    customFields: customFields || null,
    note: note || null,
    splits: null
  };
}

// Split specification: distance and/or duration and/or pace
// Examples: 150m, 5min, 150m 3'39"/100m, 3:39/100m, 150m 27min
SplitSpec = 
  // Distance + pace: 150m 3'39"/100m
  dist:SplitDistance pace:SplitPace { return { distance: dist, duration: null, pace }; }
  // Distance + duration: 150m 27min
  / dist:SplitDistance dur:SplitDuration { return { distance: dist, duration: dur, pace: null }; }
  // Distance only: 150m, 1km
  / dist:SplitDistance { return { distance: dist, duration: null, pace: null }; }
  // Pace only: 3'39"/100m
  / pace:SplitPace { return { distance: null, duration: null, pace }; }
  // Duration only: 5min
  / dur:SplitDuration { return { distance: null, duration: dur, pace: null }; }
  // Empty (just intensity or note) - use empty string match
  / "" { return { distance: null, duration: null, pace: null }; }

SplitDistance = value:Number unit:DistRunUnit _ { return { value, unit }; }
SplitDuration =
  // Numeric duration with explicit unit: 5min, 30s
  value:Number unit:TimeRunUnit _ { return { value, unit }; }
  // Tick-quote duration: 8'11"
  / min:Int "'" sec:Int "\"" _ { return { value: (min * 60) + sec, unit: 's' }; }
  // Clock duration: 06:58
  / pace:PaceTime _ { return { value: (pace.minutes * 60) + pace.seconds, unit: 's' }; }

// Pace for splits: 3'39"/100m (tick-quote format) or 3:39/100m (colon format)
// Returns { minutes, seconds, perDistance: { value, unit } }
SplitPace =
  // Tick-quote format: 3'39"/100m or 3'39"/km
  min:Int "'" sec:Int "\"" "/" dist:Number unit:DistRunUnit _ {
    return { minutes: min, seconds: sec, perDistance: { value: dist, unit } };
  }
  // Tick-quote with /km or /mi: 3'39"/km
  / min:Int "'" sec:Int "\"" paceUnit:PaceUnit _ {
    return { minutes: min, seconds: sec, perDistance: { value: 1, unit: paceUnit } };
  }
  // Colon format: 3:39/100m
  / pace:PaceTime "/" dist:Number unit:DistRunUnit _ {
    return { minutes: pace.minutes, seconds: pace.seconds, perDistance: { value: dist, unit } };
  }
  // Colon format with pace unit: 3:39/km
  / pace:PaceTime paceUnit:PaceUnit _ {
    return { minutes: pace.minutes, seconds: pace.seconds, perDistance: { value: 1, unit: paceUnit } };
  }

// Heart rate for splits: 124bpm, @124bpm, @ 124bpm
SplitHR = _ "@"? _ hr:Int "bpm"i _ { return hr; }

// Standalone split: appears as content element (not attached to a Move)
// Used when splits come after a Section or other non-Move content
StandaloneSplit = ">" _ "Split"? _ dur:SplitDuration customFields:CustomFields? note:PipeNote? _ NL {
  return {
    type: 'split',
    distance: null,
    duration: dur,
    pace: null,
    intensity: null,
    hr: null,
    customFields: customFields || null,
    note: note || null,
    splits: null
  };
}
 / ">" _ "Split"? _ spec:SplitSpec hr:SplitHR? intensity:RunIntensity? customFields:CustomFields? note:PipeNote? _ NL {
  return { 
    type: 'split', 
    distance: spec.distance || null, 
    duration: spec.duration || null,
    pace: spec.pace || null,
    intensity: intensity || null,
    hr: hr || null,
    customFields: customFields || null,
    note: note || null,
    splits: null
  };
}

// Sport name in quotes: "vapaauinti", "rintauinti", "selkäuinti", "pyöräily", "hiihto"
SportName = '"' name:$[^"]+ '"' _ { return name; }

// Optional text after recovery (before [[ or | or end of line) - stops before custom fields
RunAfterText = " "+ text:$[^|\n\r\[]+ { return text.trim(); }


// Run specification: 2x4x200m (sets x count x dist) or 4x200m (count x dist) or just 200m (single)
// Also supports count-only format: 3x6 (3 sets of 6 reps, no distance/unit)
// Steps: 8228steps
Steps = n:Int "steps" { return n; }

// Time + distance units for combined format
TimeRunUnit = "min" / "h" / "s" !"t"
DistRunUnit = "km" / "mi" / "m"

RunSpec = 
  // Full range format: 2-3x3-4x20-30m (setRange x countRange x distRange)
  setsMin:Int "-" setsMax:Int "x" countMin:Int "-" countMax:Int "x" dist:RunDistanceRange unit:RunUnit steps:(_ s:Steps { return s; })? {
    return { sets: setsMin, setsMax, count: countMin, countMax, distance: { ...dist, unit }, steps: steps || null };
  }
  // Standard: sets x count x dist (e.g., 2x4x200m)
  / sets:Int "x" count:Int "x" dist:RunDistanceRange unit:RunUnit steps:(_ s:Steps { return s; })? {
    return { sets, count, countMax: null, distance: { ...dist, unit }, steps: steps || null };
  }
  // Sets x count x unknown: 2x10x? (sets x reps x unknown distance)
  / sets:Int "x" count:Int "x" "?" {
    return { sets, count, countMax: null, distance: { value: null, unit: null }, steps: null };
  }
  // Time range: 1x40-60min (single rep with time range)
  / count:RunCount "x" timeMin:Number "-" timeMax:Number unit:TimeRunUnit {
    return { sets: 1, ...count, distance: { value: timeMin, valueMax: timeMax, unit }, steps: null };
  }
  // Unknown distance with unit: 1x?km
  / count:RunCount "x" "?" unit:RunUnit {
    return { sets: 1, ...count, distance: { value: null, unit }, steps: null };
  }
  // Unknown distance without unit: 10x?
  / count:RunCount "x" "?" {
    return { sets: 1, ...count, distance: { value: null, unit: null }, steps: null };
  }
  // Distance with decimal: 2x1.5km (must come before count-only to properly match floats)
  / count:RunCount "x" dist:RunDistanceRange unit:RunUnit steps:(_ s:Steps { return s; })? {
    return { sets: 1, ...count, distance: { ...dist, unit }, steps: steps || null };
  }
  // Count only without distance: 3x6 (for rep-based runs like drills) - must check no decimal follows
  / count:RunCount "x" reps:Int ![.] !RunUnit {
    return { sets: 1, ...count, reps, distance: { value: null, unit: null }, steps: null };
  }
  // Custom unit with space: 2x altaanmitta (count x space customUnit)
  / count:RunCount "x" _ unit:CustomUnit {
    return { sets: 1, ...count, distance: { value: count.count, valueMax: count.countMax, unit }, steps: null };
  }
  // Time + distance + steps: 30min 3.5km 8228steps
  / time:Number timeUnit:TimeRunUnit _ dist:Number distUnit:DistRunUnit steps:(_ s:Steps { return s; })? {
    return { sets: 1, count: 1, countMax: null, duration: { value: time, unit: timeUnit }, distance: { value: dist, valueMax: null, unit: distUnit }, steps: steps || null };
  }
  // Distance + quoted duration: 9km 41'34"
  / dist:RunDistanceRange unit:DistRunUnit _ min:Int "'" sec:Int "\"" {
    return {
      sets: 1,
      count: 1,
      countMax: null,
      duration: { value: min + (sec / 60), unit: 'min' },
      distance: { ...dist, unit },
      steps: null,
    };
  }
  // Distance + minute-second duration without space: 9km 41min34s
  / dist:RunDistanceRange unit:DistRunUnit _ min:Number "min" sec:Number "s" {
    return {
      sets: 1,
      count: 1,
      countMax: null,
      duration: { value: min + (sec / 60), unit: 'min' },
      distance: { ...dist, unit },
      steps: null,
    };
  }
  // Distance + minute-second duration: 9km 41min 34s
  / dist:RunDistanceRange unit:DistRunUnit _ min:Number "min" _ sec:Number "s" {
    return {
      sets: 1,
      count: 1,
      countMax: null,
      duration: { value: min + (sec / 60), unit: 'min' },
      distance: { ...dist, unit },
      steps: null,
    };
  }
  // Distance + minute duration: 9km 41min
  / dist:RunDistanceRange unit:DistRunUnit _ time:Number timeUnit:TimeRunUnit {
    return {
      sets: 1,
      count: 1,
      countMax: null,
      duration: { value: time, unit: timeUnit },
      distance: { ...dist, unit },
      steps: null,
    };
  }
  // Time + steps: 30min 8228steps
  / time:Number timeUnit:TimeRunUnit steps:(_ s:Steps { return s; }) {
    return { sets: 1, count: 1, countMax: null, duration: { value: time, unit: timeUnit }, distance: { value: null, unit: null }, steps };
  }
  // Time only: 45min (no distance, no steps)
  / time:Number timeUnit:TimeRunUnit {
    return { sets: 1, count: 1, countMax: null, duration: { value: time, unit: timeUnit }, distance: { value: null, unit: null }, steps: null };
  }
  // Distance + steps: 3.5km 8228steps
  / dist:RunDistanceRange unit:DistRunUnit steps:(_ s:Steps { return s; }) {
    return { sets: 1, count: 1, countMax: null, distance: { ...dist, unit }, steps };
  }
  // Bilateral distance with unit: 20+20m or 20m+20m (LLM format)
  / distL:Number unit1:RunUnit? "+" distR:Number unit:RunUnit {
    return { sets: 1, count: 1, countMax: null, distance: { value: distL, valueMax: null, unit }, distanceRight: distR, steps: null };
  }
  // Bilateral count without unit: 10+10 (reps)
  / countL:Int "+" countR:Int !RunUnit {
    return { sets: 1, count: countL, countMax: null, countRight: countR, distance: { value: null, unit: null }, steps: null };
  }
  // Single distance without count: 50m (implies 1x50m)
  / dist:RunDistanceRange unit:RunUnit {
    return { sets: 1, count: 1, countMax: null, distance: { ...dist, unit }, steps: null };
  }
  // Empty spec (just intensity, e.g., "Run @161-178bpm")
  / &"@" {
    return { sets: 1, count: 1, countMax: null, distance: { value: null, unit: null }, steps: null };
  }
  // Empty spec with note only (e.g., "Move \"uinti\" | Lv")
  / &"|" {
    return { sets: 1, count: 1, countMax: null, distance: { value: null, unit: null }, steps: null };
  }
  // Completely empty spec (e.g., "Move \"uinti\"" at end of line)
  / &NL {
    return { sets: 1, count: 1, countMax: null, distance: { value: null, unit: null }, steps: null };
  }

// Count can be single (4), range (2-4), or unknown (?)
RunCount = 
  min:Int "-" max:Int { return { count: min, countMax: max }; }
  / n:Int { return { count: n, countMax: null }; }
  / "?" { return { count: null, countMax: null }; }

// Distance can be number (incl. decimal), range (20-40), or ? for unknown
RunDistanceRange = 
  min:Number "-" max:Number { return { value: min, valueMax: max }; }
  / n:Number { return { value: n, valueMax: null }; }
  / "?" { return { value: null, valueMax: null }; }

// Distance/time units for runs: min must come before mi, mi before m
// CustomUnit allows LLM-generated non-standard units like "altaanmitta"
RunUnit = "min" / "km" / "mi" / "yd" / "ft" / "m" / "s" !"t" / CustomUnit
CustomUnit = u:$([a-zäöåA-ZÄÖÅ]+) { return u; }

// Intensity: @80%, @80-90%, @?, @{{pace:hint}} (template),
// @120-150bpm (HR), @<150bpm, @>120bpm,
// @Z1-Z3 (HR zones), @I-IV (swim zones), @3:50-3:40/km (pace), or @text
// @bw (bodyweight for resisted runs), @80%@bw (intensity + bodyweight)
// Optional space before @ is allowed
RunIntensity = 
  _ "@" min:Int "-" max:Int "%" "@bw"i { return { min, max, bodyweight: true }; }
  / _ "@" v:Int "%" "@bw"i { return { min: v, max: v, bodyweight: true }; }
  / _ "@" "bw"i { return { text: 'bw', bodyweight: true }; }
  // Pace with explicit per-distance: @3:11/100m, @3'11"/100m
  / _ "@" minMin:Int "'" minSec:Int "\"" "-" maxMin:Int "'" maxSec:Int "\"" "/" dist:Number unit:DistRunUnit {
    return {
      paceMin: { minutes: minMin, seconds: minSec, fraction: 0 },
      paceMax: { minutes: maxMin, seconds: maxSec, fraction: 0 },
      paceUnit: unit,
      pacePerDistance: { value: dist, unit },
    };
  }
  / _ "@" min:Int "'" sec:Int "\"" "/" dist:Number unit:DistRunUnit {
    return {
      paceMin: { minutes: min, seconds: sec, fraction: 0 },
      paceMax: { minutes: min, seconds: sec, fraction: 0 },
      paceUnit: unit,
      pacePerDistance: { value: dist, unit },
    };
  }
  / _ "@" min:PaceTime "-" max:PaceTime "/" dist:Number unit:DistRunUnit {
    return {
      paceMin: min,
      paceMax: max,
      paceUnit: unit,
      pacePerDistance: { value: dist, unit },
    };
  }
  / _ "@" pace:PaceTime "/" dist:Number unit:DistRunUnit {
    return {
      paceMin: pace,
      paceMax: pace,
      paceUnit: unit,
      pacePerDistance: { value: dist, unit },
    };
  }
  / _ "@" minMin:Int "'" minSec:Int "\"" "-" maxMin:Int "'" maxSec:Int "\"" paceUnit:PaceUnit {
    return {
      paceMin: { minutes: minMin, seconds: minSec, fraction: 0 },
      paceMax: { minutes: maxMin, seconds: maxSec, fraction: 0 },
      paceUnit,
    };
  }
  / _ "@" min:Int "'" sec:Int "\"" paceUnit:PaceUnit {
    return {
      paceMin: { minutes: min, seconds: sec, fraction: 0 },
      paceMax: { minutes: min, seconds: sec, fraction: 0 },
      paceUnit,
    };
  }
  / _ "@" min:PaceTime "-" max:PaceTime paceUnit:PaceUnit { return { paceMin: min, paceMax: max, paceUnit }; }
  / _ "@" pace:PaceTime paceUnit:PaceUnit { return { paceMin: pace, paceMax: pace, paceUnit }; }
  / _ "@" hr:HRIntensity { return { hr }; }
  / _ "@" hrZone:HRZoneRange { return { hrZone }; }
  / _ "@" "max"i { return { min: 100, max: 100, text: 'max' }; }
  / _ "@" min:Int "-" max:Int "%" { return { min, max }; }
  / _ "@" v:Int "%" { return { min: v, max: v }; }
  / _ "@?" { return { unknown: true }; }
  / _ "@" template:Template { return { template }; }
  / _ "@" zone:SwimZoneRange { return { zone }; }
  / _ "@" text:IntensityText { return { text }; }

// Template placeholder: {{PegjsRule:hint}} for values to be filled in later
// Uses actual PEG.js rule names as type for validation/autocomplete
// Examples:
//   @{{PaceTime:nelkun tavoitevauhti}} - expects 3:50 format
//   @{{Int:max reps}} - expects integer
//   E liike|3x8@{{Number:80% max}} - expects decimal number
Template = "{{" type:TemplateType ":" hint:TemplateHint "}}" { 
  return { type, hint }; 
}
// Template types use PEG.js rule names
TemplateType = 
  "PaceTime"     // 3:50 format (minutes:seconds)
  / "Int"        // Integer (e.g., reps, sets)
  / "Number"     // Decimal number (e.g., weight)
  / "HRZone"     // Z1-Z5
  / "SwimZone"   // I-V
  / "Distance"   // 400m, 5km
  / "?"          // Unknown/any
TemplateHint = chars:[^}]+ { return chars.join('').trim(); }

// Heart rate intensity: 120-150bpm, <150bpm, >120bpm, <=150bpm, >=120bpm, =140bpm, 140bpm
// Comparison operators: lt (<), gt (>), lte (<=), gte (>=), eq (=)
HRIntensity = 
  "<=" max:Int "bpm"i { return { max, comparison: 'lte' }; }
  / ">=" min:Int "bpm"i { return { min, comparison: 'gte' }; }
  / "<" max:Int "bpm"i { return { max, comparison: 'lt' }; }
  / ">" min:Int "bpm"i { return { min, comparison: 'gt' }; }
  / "=" value:Int "bpm"i { return { value, comparison: 'eq' }; }
  / min:Int "-" max:Int "bpm"i { return { min, max }; }
  / value:Int "bpm"i { return { value }; }

// Heart rate zones: Z1, Z2, Z3, Z4, Z5 or Zone1-Zone5, ranges like Z2-Z3
HRZoneRange = 
  min:HRZone "-" max:HRZone { return { min, max }; }
  / zone:HRZone { return { min: zone, max: zone }; }
HRZone = 
  "Zone"i n:[1-5] { return parseInt(n, 10); }
  / "Z"i n:[1-5] { return parseInt(n, 10); }

// Pace time: 3:50 or 3:50.5
PaceTime = min:Int ":" sec:Int frac:("." f:Int { return f; })? { 
  return { minutes: min, seconds: sec, fraction: frac || 0 }; 
}
// Pace unit: /km or /mi (per kilometer or per mile)
PaceUnit = "/" u:("km" / "mi") { return u; }

// Swimming intensity zones: I, II, III, IV, V and ranges like I-II, II-IV, or combos like IV+I
SwimZoneRange = 
  first:SwimZone "+" second:SwimZone { return { combo: [first, second] }; }
  / min:SwimZone "-" max:SwimZone { return { min, max }; }
  / zone:SwimZone { return { min: zone, max: zone }; }
SwimZone = "V" / "IV" / "III" / "II" / "I"

// Text intensity: anything until / or | or end of line
IntensityText = chars:[^/|\n\r]+ { return chars.join('').trim(); }

RunRecovery = 
  // Dual recovery notation: /2m/4m (map to range when units match)
  _ "/" first:Number firstUnit:("min" / "m" / "sec" / "sek"i / "s") "/" second:Number secondUnit:("min" / "m" / "sec" / "sek"i / "s") {
    const normalizeUnit = (u) => (u === 's' || String(u).toLowerCase() === 'sek' ? 'sec' : u);
    const u1 = normalizeUnit(firstUnit);
    const u2 = normalizeUnit(secondUnit);

    if (u1 === u2) {
      return { value: first, max: second, unit: u1 };
    }

    return { value: first, max: null, unit: u1, text: `/${second}${u2}` };
  }
  // Dual minute-mark notation: /2'/5'
  / _ "/" first:Number tick1:MinuteMark "/" second:Number tick2:MinuteMark {
    return { value: first, max: second, unit: 'min' };
  }
  // Range: /10-15min or /10-15s (with optional space before /)
  / _ "/" min:Number "-" max:Number "min" { return { value: min, max: max, unit: 'min' }; }
  / _ "/" min:Number "-" max:Number ("sec" / "sek"i / "s") { return { value: min, max: max, unit: 'sec' }; }
  / _ "/" min:Number "-" max:Number "m" { return { value: min, max: max, unit: 'm' }; }
  / _ "/" min:Number "-" max:Number tick:MinuteMark { return { value: min, max: max, unit: 'min' }; }
  // Single value: /2min (minutes), /90s (seconds), /100m (meters for walk recovery)
  / _ "/" v:Number "min" { return { value: v, max: null, unit: 'min' }; }
  / _ "/" v:Number ("sec" / "sek"i / "s") { return { value: v, max: null, unit: 'sec' }; }
  / _ "/" v:Number "m" { return { value: v, max: null, unit: 'm' }; }
  / _ "/" v:Number tick:MinuteMark { return { value: v, max: null, unit: 'min' }; }
  // Swimming notation: T:20s, t:20s, L:1min (tauko/lepo)
  / _ [TtLl] ":" _ v:Number "s" { return { value: v, max: null, unit: 'sec' }; }
  / _ [TtLl] ":" _ v:Number _ "s" { return { value: v, max: null, unit: 'sec' }; }
  / _ [TtLl] ":" _ v:Number "min" { return { value: v, max: null, unit: 'min' }; }
  / _ [TtLl] ":" _ v:Number _ "min" { return { value: v, max: null, unit: 'min' }; }
  // Any text recovery: /kävely, /hölkkä, /lepo, etc.
  / _ "/" text:RecoveryText { return { value: null, max: null, unit: null, text: text }; }
  / _ "/" { return { value: null, max: null, unit: null }; }
RecoveryText = chars:[^|@\n\r]+ { return chars.join('').trim(); }
MinuteMark = "'" / "`" / "´"
RunDesc = _ "|" _ text:[^\n\r]* { return text.join('').trim(); }

// Duration/Time - kesto
// Time 10min|desc        - perusmuoto
// Time 20min|desc        - yksikkö kiinni numerossa
// Time 10 min|desc       - välilyönti yksikön edessä
// Time 1.5km|desc        - desimaaliluku
// Time 30-60min|desc     - aikaväli
// Time ?min | desc       - unknown duration
TimePrefix = "Time"
Duration = 
  // Quoted duration: Time 11'54" | Dynaamiset venyttelyt
  TimePrefix _ min:Int MinuteMark sec:Int "\"" _ "|" _ desc:RestOfLine {
    return { type: 'duration', duration: { value: min + (sec / 60), unit: 'min' }, description: desc.trim() };
  }
  // Quoted duration without description
  / TimePrefix _ min:Int MinuteMark sec:Int "\"" _ NL {
    return { type: 'duration', duration: { value: min + (sec / 60), unit: 'min' }, description: null };
  }
  // Clock-like time of day: Time 18.00 | Kuntosali
  / TimePrefix _ hour:$([0-9]+) (":" / ".") minute:$([0-9]+) _ "|" _ desc:RestOfLine {
    return { type: 'duration', duration: null, timeOfDay: { hour: parseInt(hour, 10), minute: parseInt(minute, 10) }, description: desc.trim() };
  }
  // Clock-like time of day without description
  / TimePrefix _ hour:$([0-9]+) (":" / ".") minute:$([0-9]+) _ NL {
    return { type: 'duration', duration: null, timeOfDay: { hour: parseInt(hour, 10), minute: parseInt(minute, 10) }, description: null };
  }
  // With pipe and description
  / TimePrefix _ value:DurationValue unit:DurationUnit _ "|" _ desc:RestOfLine {
    return { type: 'duration', duration: { value, unit }, description: desc.trim() };
  }
  // Without pipe (just time)
  / TimePrefix _ value:DurationValue unit:DurationUnit _ NL {
    return { type: 'duration', duration: { value, unit }, description: null };
  }

DurationValue = 
  "?" { return null; }
  / min:Number "-" max:Number { return { min, max }; }
  / n:Number { return n; }

// Duration units: min for time, m/km for distance, h for hours, s for seconds
// Note: "m" always means meters, "min" always means minutes
// Optional whitespace before unit allows both "20min" and "20 min"
DurationUnit = _? u:("min" / "km" / "m" / "h" / "s") { return u; }

// Contacts 200|loikat (total contacts)
// Contacts 5x10|konkka oikealla (sets x reps per set)
// Contacts 30-80|heittopaino (count range)
ContactsPrefix = "Contacts"
Contacts = 
  ContactsPrefix _ sets:Int "x" reps:Int _ "|" _ name:RestOfLine {
    return { type: 'contacts', count: sets * reps, sets, reps, name: name.trim() };
  }
  / ContactsPrefix _ sets:Int "x" reps:Int _ note:PipeNote? _ NL {
    return { type: 'contacts', count: sets * reps, sets, reps, name: note || null };
  }
  // Count range: C 30-80|name
  / ContactsPrefix _ countMin:Int "-" countMax:Int _ "|" _ name:RestOfLine {
    return { type: 'contacts', count: countMin, countMax, sets: null, reps: null, name: name.trim() };
  }
  / ContactsPrefix _ count:Int _ "|" _ name:RestOfLine {
    return { type: 'contacts', count, sets: null, reps: null, name: name.trim() };
  }
  / ContactsPrefix _ "?" _ "|" _ name:RestOfLine {
    return { type: 'contacts', count: null, sets: null, reps: null, name: name.trim() };
  }
  / ContactsPrefix _ name:RestOfLine {
    return { type: 'contacts', count: null, sets: null, reps: null, name: name.trim() };
  }

Comment = "#" _ text:RestOfLine { return { type: 'text', value: text.trim() }; }

// Max - Maksimi / RM (Rep Max)
// Max kyykky|1RM:150kg
// Max penkki|eRM:142kg@5x120kg
// Max kyykky|3RM:135kg PR
Max = "Max" _ name:NamePart "|" rmType:RMType ":" weight:Int unit:Unit pr:(_ "PR" { return true; })? calc:("@" r:Int "x" w:Int u:Unit { return { reps: r, weight: w, unit: u }; })? _ NL {
  return { 
    type: 'max', 
    name, 
    reps: rmType.reps, 
    weight, 
    unit, 
    estimated: rmType.estimated, 
    pr: pr || false,
    calculation: calc || null 
  };
}
RMType = 
  "eRM" { return { estimated: true, reps: 1 }; }
  / reps:Int "RM" { return { estimated: false, reps }; }

// Best - Ennätys (muu kuin nostot)
// Best kuulanheitto 4kg|12.5m
// Best 100m|11.2s
// Best cooper|2850m
// Best lankku|3:45
Best = "Best" _ name:BestName "|" result:BestResult pr:(_ "PR" { return true; })? _ NL {
  return { type: 'best', name, result, pr: pr || false };
}
BestName = chars:[A-ZÄÖÅa-zäöå0-9\-/() ]+ { return chars.join('').trim(); }
BestResult = 
  time:TimeResult { return { value: time, unit: 'time' }; }
  / value:Float unit:("m" / "km" / "s" / "min") { return { value, unit }; }
  / value:Int unit:("m" / "km" / "s" / "min")? { return { value, unit: unit || 'count' }; }
TimeResult = mins:Int ":" secs:Int { return mins * 60 + secs; }

// Feeling / Fiilis
// Feeling 8/10|hyvä energia
// Feeling RPE:7
// Feeling 9/10
// Feeling                - tyhjä (placeholder)
// Feeling ?/10           - tuntematon
// Feeling |kommentti     - pelkkä kommentti
Feeling = "Feeling" _ score:FeelingScore? desc:("|" d:RestOfLine { return d.trim(); })? NL? {
  return { type: 'feeling', ...(score || { scale: 'feeling', value: null }), description: desc || null };
}
FeelingScore = 
  "RPE:" rpe:Int { return { scale: 'rpe', value: rpe }; }
  / "?" "/" max:Int { return { scale: 'feeling', value: null, max }; }
  / value:Int "/10" { return { scale: 'feeling', value }; }

// Pain - Kipu / Loukkaantuminen
// Pain polvi|2/10 lievä jäykkyys
// Pain -|palautunut
Pain = "Pain" _ body:PainBody "|" severity:PainSeverity? desc:RestOfLine {
  return { type: 'pain', bodyPart: body, severity: severity || null, description: desc.trim() };
}
PainBody = "-" { return null; } / chars:[A-ZÄÖÅa-zäöå\-]+ { return chars.join(''); }
PainSeverity = value:Int "/10" _ { return value; }

// Vitals - Mittaukset
// Vitals weight:85.2kg
// Vitals sleep:7.5h
// Vitals rhr:52
// Vitals                 - tyhjä (placeholder)
Vitals = 
  "Vitals" _ key:VitalKey ":" value:VitalValue unit:VitalUnit? _ NL {
    return { type: 'vitals', key, value, unit: unit || null };
  }
  / "Vitals" _ NL {
    return { type: 'vitals', key: null, value: null, unit: null };
  }
VitalKey = "weight" / "sleep" / "rhr" / "hrv" / "temp" / "bf" / chars:[a-z]+ { return chars.join(''); }
VitalValue = Float / Int
// Vital units: includes imperial lb for weight
VitalUnit = "kg" / "lb" / "h" / "%" / "bpm" / "°C" / "ms"

// Custom - Käyttäjän omat seurantakohteet koko harjoitukselle
// Format: Custom Treenipaino 85
//         Custom Leveys 4
//         Custom Liikelaajuus 90|°
// Numeraalinen arvo jota voi seurata ajassa
//
// Derived - Johdetut suureet feature-vektoreista tai laskennasta
// Format: Derived <name> <value>|<unit> basis:<entity|day> confidence:<1-100>% source:<src> goodness:<1-5> | note
// Esim:
//   Derived strength.neural_stress 72|score basis:entity confidence:88% source:"exercise+load" goodness:4
//   Derived endurance.zone2_minutes 95|min basis:day confidence:74 source:hr+pace goodness:5 | pitkä pk-päivä
DerivedPrefix = "Derived"
Derived = DerivedPrefix __ name:DerivedNamePart __ value:Number unit:DerivedLineUnit? basis:DerivedBasis? confidence:DerivedConfidence? source:DerivedSource? goodness:DerivedGoodness? note:PipeNote? _ NL {
  return {
    type: 'derived',
    name: name.trim(),
    value,
    unit: unit || null,
    basis: basis || null,
    confidence: confidence || null,
    source: source || null,
    goodness: goodness || null,
    note: note || null,
  };
}

DerivedLineUnit = "|" unit:$[^\n\r| \t]+ { return unit.trim(); }

DerivedBasis = __ "basis:" basis:("entity"i / "day"i) {
  return basis.toLowerCase();
}

DerivedConfidence = __ "confidence:" value:Int "%"? {
  if (value < 1 || value > 100) {
    error('Derived confidence must be between 1 and 100');
  }
  return value;
}

DerivedSource = __ "source:" source:DerivedSourceValue {
  return source;
}

DerivedSourceValue =
  "\"" chars:[^"\n\r]+ "\"" { return chars.join('').trim(); }
  / chars:[A-ZÄÖÅa-zäöå0-9_.,:;+*\-/()#]+ { return chars.join('').trim(); }

DerivedGoodness = __ "goodness:" value:Int {
  if (value < 1 || value > 5) {
    error('Derived goodness must be between 1 and 5');
  }
  return value;
}

DerivedNamePart = first:DerivedWord rest:(" " w:DerivedWord { return " " + w; })* {
  return first + rest.join('');
}
DerivedWord = first:[A-ZÄÖÅa-zäöå] rest:[A-ZÄÖÅa-zäöå0-9_\-/,.'#:.]* { return first + rest.join(''); }

CustomPrefix = "Custom"
Custom = CustomPrefix __ name:CustomNamePart __ value:Number "-" valueMax:Number unit:CustomLineUnit? note:PipeNote? _ NL {
  return { type: 'custom', name: name.trim(), value, valueMax, unit: unit || null, note: note || null };
}
  / CustomPrefix __ name:CustomNamePart __ value:Number unit:CustomLineUnit? note:PipeNote? _ NL {
  return { type: 'custom', name: name.trim(), value, unit: unit || null, note: note || null };
}
  // Legacy/fallback form: Custom 10000kpl | Askeleet
  / CustomPrefix __ value:Number unit:CustomInlineUnit _ "|" _ name:RestOfLine {
    return { type: 'custom', name: name.trim(), value, unit: unit || null, note: null };
  }

// Custom nimi: sanat jotka eivät ala numerolla, erotettu välilyönnillä
// "Treenipaino" tai "Body Weight" tai "RM1" - mutta ei "85"
CustomNamePart = first:CustomWord rest:(" " w:CustomWord { return " " + w; })* { 
  return first + rest.join(''); 
}
// Custom word: starts with letter, can contain letters, numbers, hyphens, etc.
CustomWord = first:[A-ZÄÖÅa-zäöå] rest:[A-ZÄÖÅa-zäöå0-9\-/,.'#:]* { return first + rest.join(''); }

// Custom yksikkö voi olla piipun jälkeen: Custom Liikelaajuus 90|°
CustomLineUnit = "|" unit:$[^\n\r|]+ { return unit.trim(); }

// Yksikkö heti arvon perässä: 10000kpl
CustomInlineUnit = unit:$[A-ZÄÖÅa-zäöå%°/_-]+ { return unit.trim(); }

// > - Geneerinen meta
// > custom_field:arvo
// > goal:kyykky 160kg
GenericMeta = ">" _ key:MetaKey ":" value:RestOfLine {
  return { type: 'meta', key, value: value.trim() };
}
MetaKey = chars:[a-z_]+ { return chars.join(''); }

// ==============================================================================
// PLAN_LIFE: Life tracking entries (nutrition, expenses, reminders, health)
// ==============================================================================

// Food - Ravintomerkintä (joustava rakenne)
// Food 450kcal 30g/prot | kaurapuuro, maitorahka, banaani
// Food 130kcal 0.1g/prot 5g/fiber | tummaa leipää
// Food 200kcal 40g/carb 500mg/sodium | urheilujuoma
// Food 100mg/caffeine 5g/creatine | lisäravinteet
// Food | aamupala (pelkkä kuvaus)
Food = "Food" _ nutrients:Nutrient* desc:PipeNoteWithBrackets? _ NL {
  // Muunna lista objektiksi, tunnista perusmakrot
  const result = { 
    type: 'food',
    calories: null, 
    protein: null, 
    carbs: null, 
    fat: null, 
    nutrients: [],
    description: desc || null
  };
  for (const n of nutrients) {
    if (n.name === 'kcal') result.calories = n.value;
    else if (n.name === 'prot' || n.name === 'protein') result.protein = n.value;
    else if (n.name === 'carb' || n.name === 'carbs') result.carbs = n.value;
    else if (n.name === 'fat') result.fat = n.value;
    else result.nutrients.push(n);
  }
  return result;
}

// Ravintoaine: 450kcal, 30g/prot, 500mg/sodium, 100µg/d-vitamin
// Tuetut yksiköt: g, mg, µg/ug/mcg, ml, IU
Nutrient = 
  // Kalorit: 450kcal
  value:Number "kcal" _ { return { name: 'kcal', value, unit: 'kcal' }; }
  // Muu ravintoaine: 30g/prot, 500mg/sodium, 100IU/d-vitamin
  / value:Number unit:NutrientUnit "/" name:NutrientName _ { return { name, value, unit }; }

NutrientUnit = "mg" / "mcg" / "µg" / "ug" / "g" / "ml" / "IU"
NutrientName = chars:[a-zA-Z0-9\-]+ { return chars.join('').toLowerCase(); }

// Drinking - Nestemerkintä (käyttää samaa joustavaa Nutrient-rakennetta)
// Drinking 0.5l | vesi
// Drinking 0.6l kahvi | aamukahvi
// Drinking 2dl maito | iltapala
// Drinking 3dl 120kcal 8g/prot maito | proteiinijuoma
// Drinking 0.5l 200mg/caffeine energiajuoma | pre-workout
Drinking = "Drinking" _ volume:DrinkVolume? _ nutrients:Nutrient* liquid:DrinkLiquid? desc:PipeNoteWithBrackets? _ NL {
  // Muunna ravintoaineet, tunnista kalorit ja proteiini
  let calories = null;
  let protein = null;
  const otherNutrients = [];
  for (const n of nutrients) {
    if (n.name === 'kcal') calories = n.value;
    else if (n.name === 'prot' || n.name === 'protein') protein = n.value;
    else otherNutrients.push(n);
  }
  return { 
    type: 'drinking', 
    volume: volume?.value || null,
    volumeUnit: volume?.unit || null,
    calories,
    protein,
    nutrients: otherNutrients.length > 0 ? otherNutrients : null,
    liquid: liquid || null,
    description: desc || null
  };
}

DrinkVolume = value:Number unit:("l" / "dl" / "ml") { return { value, unit }; }

// DrinkLiquid - vapaamuotoinen nestetyyppi (vesi, kahvi, tee, maito jne.)
// Sallii minkä tahansa tekstin ennen pipe-merkkiä
DrinkLiquid = _ liquid:$[A-ZÄÖÅa-zäöå0-9\- ]+ { return liquid.trim(); }

// PipeNote variant for food/drinking descriptions where optional timestamp
// suffixes are common, e.g. "| Iso Latte [20:00]"
PipeNoteWithBrackets = _ "|" _ text:$[^|\n\r]+ { return text.trim(); }

// Expense - Kulumerkintä
// Expense 4.50EUR | Bussilippu
// Expense entry pirkkahalli 5.00USD
// Expense 80EUR | Fysioterapiakäynti
// Expense 100EUR ALV24% 19.35EUR | Konsultointi (with VAT amount)
// Expense 50EUR ALV10% | Ruoka (VAT without amount)
Expense = "Expense" _ typeName:ExpenseNamedEntry _ amount:ExpenseAmount _ vat:ExpenseVAT? _ desc:PipeNote? _ NL {
  return {
    type: 'expense',
    expenseType: { type: 'entry', name: typeName },
    amount: amount.value,
    currency: amount.currency,
    vatPercent: vat?.percent || null,
    vatAmount: vat?.amount || null,
    description: desc || null
  };
}
 / "Expense" _ expenseType:ExpenseType? _ amount:ExpenseAmount _ vat:ExpenseVAT? _ desc:PipeNote? _ NL {
  return { 
    type: 'expense',
    expenseType: expenseType || 'general',
    amount: amount.value,
    currency: amount.currency,
    vatPercent: vat?.percent || null,
    vatAmount: vat?.amount || null,
    description: desc || null
  };
}

ExpenseNamedEntry = "entry" _ name:$[A-ZÄÖÅa-zäöå \-]+ _ { return name.trim(); }

ExpenseType = "entry" _ name:ExpenseTypeName { return { type: 'entry', name }; }
            / "transport" { return { type: 'transport' }; }
            / "membership" { return { type: 'membership' }; }
            / "equipment" { return { type: 'equipment' }; }
            / "coaching" { return { type: 'coaching' }; }
            / "health" { return { type: 'health' }; }

ExpenseTypeName = chars:[A-ZÄÖÅa-zäöå0-9 \-]+ { return chars.join('').trim(); }

ExpenseAmount = value:Number currency:Currency { return { value, currency }; }
ExpenseVAT = "ALV" percent:Number "%" _ vatAmount:ExpenseVATAmount? { 
  return { percent, amount: vatAmount || null }; 
}
ExpenseVATAmount = value:Number currency:Currency { return value; }
Currency = "EUR" / "USD" / "GBP" / "SEK" / "NOK" / "DKK" / "€" / "$" / "£"

// Reminder - Muistutusmerkintä
// Reminder 2026-01-15 | Ilmoittautuminen päättyy
// Reminder 2026-01-01
Reminder = "Reminder" _ date:ReminderDate desc:PipeNote? _ NL {
  return { type: 'reminder', date, description: desc || null };
}

ReminderDate = y:Year4 "-" m:Month "-" d:Day { 
  return { year: y, month: m, day: d }; 
}

// Location - Sijaintimerkintä
// Location Tampere, Pirkkahalli
// Location Helsinki
Location = "Location" _ place:RestOfLine {
  return { type: 'location', place: place.trim() };
}

// URL - Linkkimerkintä
// URL https://kisa.fi/ilmo
// URL http://example.com
Url = "URL" _ url:RestOfLine {
  return { type: 'url', url: url.trim() };
}

// BodyMeasurement - Kehon mittaukset
// Weight 85.2kg
// BodyFat 12.5%
// Waist 82cm
BodyMeasurement = 
  "Weight" _ value:Number unit:("kg" / "lb") _ NL {
    return { type: 'measurement', measureType: 'weight', value, unit };
  }
  / "BodyFat" _ value:Number "%" _ NL {
    return { type: 'measurement', measureType: 'bodyFat', value, unit: '%' };
  }
  / "Waist" _ value:Number unit:("cm" / "in") _ NL {
    return { type: 'measurement', measureType: 'waist', value, unit };
  }
  / "Hip" _ value:Number unit:("cm" / "in") _ NL {
    return { type: 'measurement', measureType: 'hip', value, unit };
  }

// SleepEntry - Unimerkintä
// Sleep 7.5h quality:good
// Sleep 8h
// Sleep 6.5h quality:poor hrv:45 rhr:52
SleepEntry = "Sleep" _ duration:SleepDuration quality:SleepQuality? hrv:SleepHRV? rhr:SleepRHR? _ NL {
  return { 
    type: 'sleep', 
    duration: duration,
    quality: quality || null,
    hrv: hrv || null,
    rhr: rhr || null
  };
}

SleepDuration = value:Number "h" { return value; }
SleepQuality = _ "quality:" q:("excellent" / "good" / "fair" / "poor") { return q; }
SleepHRV = _ "hrv:" value:Int { return value; }
SleepRHR = _ "rhr:" value:Int { return value; }

// Health - Terveysmerkintä
// Health physio | Olkapään mobilisaatio
// Health injury | Polven kipu
// Health medication | Ibuprofeeni 400mg
Health = "Health" _ healthType:HealthType desc:PipeNote? _ NL {
  return { type: 'health', healthType, description: desc || null };
}

HealthType = "physio" / "injury" / "pain" / "medication" / "supplement" / "appointment" / "checkup"

// ==============================================================================

// Primitives
// NamePart: Exercise name that allows pipes INSIDE parentheses but not outside
// e.g., "Nopeus: (1-0 | 5-0 | 5) Hauiskääntö" should work
NamePart = parts:(NamePartWithParen / NamePartPlain)+ { 
  return parts.join('').trim(); 
}

// Content inside parentheses - can contain pipes
NamePartWithParen = "(" content:$[^)\n\r]* ")" { return "(" + content + ")"; }

// Plain name content - no pipes allowed (they're delimiters)
NamePartPlain = chars:[A-ZÄÖÅa-zäöå0-9\-/+,.'#:& ]+ { return chars.join(''); }

Word = chars:[A-ZÄÖÅa-zäöå0-9\-/()'#]+ { return chars.join(''); }

// Unit types (for Pyramid and other generic contexts)
// Note: WeightUnit and DistanceUnit are defined separately for type safety
Unit = "bodyweight" / "min" / "kg" / "lb" / "%" / "km" / "mi" / "yd" / "ft" / "m" / "s"
Int = digits:[0-9]+ { return parseInt(digits.join(''), 10); }
RestOfLine = chars:[^\n\r]* NL { return chars.join(''); }
NL = "\n" / "\r\n" / "\r" / !.
_ = [ \t]*
__ = [ \t]+
_NL = [ \t\n\r]*
