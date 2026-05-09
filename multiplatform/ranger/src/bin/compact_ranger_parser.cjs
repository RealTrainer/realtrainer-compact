class CompactAstJson  {
  constructor() {
  }
}
CompactAstJson.escape = function(value) {
  let out = "";
  const __len = value.length;
  let i = 0;
  while (i < __len) {
    const ch = value.charCodeAt(i );
    if ( ch == (92) ) {
      out = out + "\\\\";
    } else {
      if ( ch == (34) ) {
        out = out + "\\\"";
      } else {
        if ( ch == 10 ) {
          out = out + "\\n";
        } else {
          if ( ch == 13 ) {
            out = out + "\\r";
          } else {
            if ( ch == 9 ) {
              out = out + "\\t";
            } else {
              out = out + (value.substring(i, (i + 1) ));
            }
          }
        }
      }
    }
    i = i + 1;
  };
  return out;
};
CompactAstJson.quote = function(value) {
  return ("\"" + CompactAstJson.escape(value)) + "\"";
};
CompactAstJson.boolValue = function(value) {
  if ( value ) {
    return "true";
  }
  return "false";
};
CompactAstJson.field = function(name, rawValue) {
  return (CompactAstJson.quote(name) + ":") + rawValue;
};
CompactAstJson.jsonObject = function(fields) {
  return ("{" + (fields.join(","))) + "}";
};
CompactAstJson.addRawField = function(fields, name, rawValue) {
  fields.push(CompactAstJson.field(name, rawValue));
};
CompactAstJson.addStringField = function(fields, name, value) {
  fields.push(CompactAstJson.field(name, CompactAstJson.quote(value)));
};
CompactAstJson.addIntField = function(fields, name, value) {
  fields.push(CompactAstJson.field(name, ((value.toString()))));
};
CompactAstJson.addDoubleField = function(fields, name, value) {
  fields.push(CompactAstJson.field(name, ((value.toString()))));
};
CompactAstJson.addBooleanField = function(fields, name, value) {
  fields.push(CompactAstJson.field(name, CompactAstJson.boolValue(value)));
};
CompactAstJson.addOptionalStringField = function(fields, name, value) {
  if ( (typeof(value) !== "undefined" && value != null )  ) {
    CompactAstJson.addStringField(fields, name, value);
  }
};
CompactAstJson.addOptionalIntField = function(fields, name, value) {
  if ( (typeof(value) !== "undefined" && value != null )  ) {
    CompactAstJson.addIntField(fields, name, value);
  }
};
CompactAstJson.addOptionalDoubleField = function(fields, name, value) {
  if ( (typeof(value) !== "undefined" && value != null )  ) {
    CompactAstJson.addDoubleField(fields, name, value);
  }
};
CompactAstJson.addOptionalBooleanField = function(fields, name, value) {
  if ( (typeof(value) !== "undefined" && value != null )  ) {
    CompactAstJson.addBooleanField(fields, name, value);
  }
};
CompactAstJson.stringArray = function(values) {
  let items = [];
  for ( let i = 0; i < values.length; i++) {
    var item = values[i];
    items.push(CompactAstJson.quote(item));
  };
  return ("[" + (items.join(","))) + "]";
};
CompactAstJson.intArray = function(values) {
  let items = [];
  for ( let i = 0; i < values.length; i++) {
    var item = values[i];
    items.push((item.toString()));
  };
  return ("[" + (items.join(","))) + "]";
};
CompactAstJson.nodeArray = function(values) {
  let items = [];
  for ( let i = 0; i < values.length; i++) {
    var item = values[i];
    items.push(item.toJSONString());
  };
  return ("[" + (items.join(","))) + "]";
};
CompactAstJson.attemptArray = function(values) {
  let items = [];
  for ( let i = 0; i < values.length; i++) {
    var item = values[i];
    items.push(item.toJSONString());
  };
  return ("[" + (items.join(","))) + "]";
};
CompactAstJson.workoutArray = function(values) {
  let items = [];
  for ( let i = 0; i < values.length; i++) {
    var item = values[i];
    items.push(item.toJSONString());
  };
  return ("[" + (items.join(","))) + "]";
};
CompactAstJson.addStringArrayField = function(fields, name, values) {
  const raw = CompactAstJson.stringArray(values);
  CompactAstJson.addRawField(fields, name, raw);
};
CompactAstJson.addIntArrayField = function(fields, name, values) {
  const raw = CompactAstJson.intArray(values);
  CompactAstJson.addRawField(fields, name, raw);
};
CompactAstJson.addNodeArrayField = function(fields, name, values) {
  const raw = CompactAstJson.nodeArray(values);
  CompactAstJson.addRawField(fields, name, raw);
};
CompactAstJson.addAttemptArrayField = function(fields, name, values) {
  const raw = CompactAstJson.attemptArray(values);
  CompactAstJson.addRawField(fields, name, raw);
};
CompactAstJson.addWorkoutArrayField = function(fields, name, values) {
  const raw = CompactAstJson.workoutArray(values);
  CompactAstJson.addRawField(fields, name, raw);
};
CompactAstJson.addDistanceField = function(fields, name, value) {
  const raw = value.toJSONString();
  CompactAstJson.addRawField(fields, name, raw);
};
CompactAstJson.addQuantityField = function(fields, name, value) {
  const raw = value.toJSONString();
  CompactAstJson.addRawField(fields, name, raw);
};
CompactAstJson.addRepeatsField = function(fields, name, value) {
  const raw = value.toJSONString();
  CompactAstJson.addRawField(fields, name, raw);
};
CompactAstJson.addDateField = function(fields, name, value) {
  const raw = value.toJSONString();
  CompactAstJson.addRawField(fields, name, raw);
};
class AstNode  {
  constructor() {
    this.type = "";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    return CompactAstJson.jsonObject(fields);
  };
}
class DateValueNode  {
  constructor() {
    this.type = "date";     /** note: unused */
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.unknown = true;
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addIntField(fields, "year", this.year);
    CompactAstJson.addIntField(fields, "month", this.month);
    CompactAstJson.addIntField(fields, "day", this.day);
    CompactAstJson.addBooleanField(fields, "unknown", this.unknown);
    return CompactAstJson.jsonObject(fields);
  };
}
class DistanceNode  {
  constructor() {
    this.value = 0.0;
    this.unit = "";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addDoubleField(fields, "value", this.value);
    CompactAstJson.addStringField(fields, "unit", this.unit);
    CompactAstJson.addOptionalDoubleField(fields, "valueMax", this.valueMax);
    return CompactAstJson.jsonObject(fields);
  };
}
class QuantityNode  {
  constructor() {
    this.raw = "";
    this.value = 0.0;
    this.unit = "";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "raw", this.raw);
    CompactAstJson.addDoubleField(fields, "value", this.value);
    CompactAstJson.addStringField(fields, "unit", this.unit);
    CompactAstJson.addOptionalDoubleField(fields, "valueMax", this.valueMax);
    return CompactAstJson.jsonObject(fields);
  };
}
class MoveNode  extends AstNode {
  constructor() {
    super()
    this.sport = "juoksu";
    this.sets = 1;     /** note: unused */
    this.count = 1;
    this.customFields = [];     /** note: unused */
    this.splits = [];
    this.type = "move";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "sport", this.sport);
    CompactAstJson.addIntField(fields, "count", this.count);
    CompactAstJson.addOptionalIntField(fields, "countMax", this.countMax);
    if ( (typeof(this.distance) !== "undefined" && this.distance != null )  ) {
      CompactAstJson.addDistanceField(fields, "distance", this.distance);
    }
    CompactAstJson.addOptionalStringField(fields, "duration", this.duration);
    if ( (typeof(this.durationQuantity) !== "undefined" && this.durationQuantity != null )  ) {
      CompactAstJson.addQuantityField(fields, "durationQuantity", this.durationQuantity);
    }
    CompactAstJson.addOptionalStringField(fields, "intensity", this.intensity);
    if ( (typeof(this.intensityQuantity) !== "undefined" && this.intensityQuantity != null )  ) {
      CompactAstJson.addQuantityField(fields, "intensityQuantity", this.intensityQuantity);
    }
    if ( (typeof(this.hrQuantity) !== "undefined" && this.hrQuantity != null )  ) {
      CompactAstJson.addQuantityField(fields, "hrQuantity", this.hrQuantity);
    }
    CompactAstJson.addOptionalStringField(fields, "recovery", this.recovery);
    if ( (typeof(this.recoveryQuantity) !== "undefined" && this.recoveryQuantity != null )  ) {
      CompactAstJson.addQuantityField(fields, "recoveryQuantity", this.recoveryQuantity);
    }
    CompactAstJson.addOptionalStringField(fields, "note", this.note);
    CompactAstJson.addNodeArrayField(fields, "splits", this.splits);
    return CompactAstJson.jsonObject(fields);
  };
}
class SplitNode  extends AstNode {
  constructor() {
    super()
    this.raw = "";
    this.customFields = [];
    this.splits = [];
    this.type = "split";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    if ( (typeof(this.distance) !== "undefined" && this.distance != null )  ) {
      CompactAstJson.addDistanceField(fields, "distance", this.distance);
    }
    CompactAstJson.addOptionalStringField(fields, "duration", this.duration);
    CompactAstJson.addOptionalStringField(fields, "pace", this.pace);
    if ( (typeof(this.paceQuantity) !== "undefined" && this.paceQuantity != null )  ) {
      CompactAstJson.addQuantityField(fields, "paceQuantity", this.paceQuantity);
    }
    CompactAstJson.addOptionalIntField(fields, "hr", this.hr);
    CompactAstJson.addOptionalStringField(fields, "note", this.note);
    CompactAstJson.addNodeArrayField(fields, "splits", this.splits);
    return CompactAstJson.jsonObject(fields);
  };
}
class TagsNode  extends AstNode {
  constructor() {
    super()
    this.tags = [];
    this.type = "tags";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringArrayField(fields, "tags", this.tags);
    return CompactAstJson.jsonObject(fields);
  };
}
class EmojisNode  extends AstNode {
  constructor() {
    super()
    this.emojis = "";
    this.type = "emojis";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "emojis", this.emojis);
    return CompactAstJson.jsonObject(fields);
  };
}
class SummaryNode  extends AstNode {
  constructor() {
    super()
    this.text = "";
    this.type = "summary";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "text", this.text);
    return CompactAstJson.jsonObject(fields);
  };
}
class TextLineNode  extends AstNode {
  constructor() {
    super()
    this.value = "";
    this.type = "text";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "value", this.value);
    return CompactAstJson.jsonObject(fields);
  };
}
class DerivedNode  extends AstNode {
  constructor() {
    super()
    this.name = "";
    this.raw = "";
    this.type = "derived";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "name", this.name);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    CompactAstJson.addOptionalDoubleField(fields, "value", this.value);
    CompactAstJson.addOptionalStringField(fields, "unit", this.unit);
    CompactAstJson.addOptionalStringField(fields, "note", this.note);
    return CompactAstJson.jsonObject(fields);
  };
}
class ExerciseAttemptNode  {
  constructor() {
    this.raw = "";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "raw", this.raw);
    CompactAstJson.addOptionalIntField(fields, "sets", this.sets);
    CompactAstJson.addOptionalIntField(fields, "setsMax", this.setsMax);
    CompactAstJson.addOptionalIntField(fields, "reps", this.reps);
    CompactAstJson.addOptionalIntField(fields, "repsMax", this.repsMax);
    CompactAstJson.addOptionalBooleanField(fields, "repeatsUnknown", this.repeatsUnknown);
    if ( (typeof(this.distance) !== "undefined" && this.distance != null )  ) {
      CompactAstJson.addDistanceField(fields, "distance", this.distance);
    }
    CompactAstJson.addOptionalStringField(fields, "duration", this.duration);
    CompactAstJson.addOptionalStringField(fields, "durationMax", this.durationMax);
    CompactAstJson.addOptionalDoubleField(fields, "loadValue", this.loadValue);
    CompactAstJson.addOptionalStringField(fields, "loadUnit", this.loadUnit);
    return CompactAstJson.jsonObject(fields);
  };
}
class ExerciseNode  extends AstNode {
  constructor() {
    super()
    this.name = "";
    this.raw = "";
    this.repsSeries = [];
    this.attempts = [];
    this.type = "exercise";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "name", this.name);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    CompactAstJson.addOptionalStringField(fields, "spec", this.spec);
    CompactAstJson.addOptionalStringField(fields, "comment", this.comment);
    CompactAstJson.addOptionalStringField(fields, "note", this.note);
    CompactAstJson.addIntArrayField(fields, "repsSeries", this.repsSeries);
    CompactAstJson.addAttemptArrayField(fields, "attempts", this.attempts);
    return CompactAstJson.jsonObject(fields);
  };
}
class PhaseNode  extends AstNode {
  constructor() {
    super()
    this.name = "";
    this.raw = "";
    this.type = "phase";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "name", this.name);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    CompactAstJson.addOptionalIntField(fields, "number", this.number);
    CompactAstJson.addOptionalStringField(fields, "details", this.details);
    return CompactAstJson.jsonObject(fields);
  };
}
class SectionNode  extends AstNode {
  constructor() {
    super()
    this.name = "";
    this.raw = "";
    this.type = "section";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "name", this.name);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    return CompactAstJson.jsonObject(fields);
  };
}
class DurationNode  extends AstNode {
  constructor() {
    super()
    this.text = "";
    this.raw = "";
    this.type = "duration";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "text", this.text);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    if ( (typeof(this.durationQuantity) !== "undefined" && this.durationQuantity != null )  ) {
      CompactAstJson.addQuantityField(fields, "durationQuantity", this.durationQuantity);
    }
    CompactAstJson.addOptionalStringField(fields, "comment", this.comment);
    return CompactAstJson.jsonObject(fields);
  };
}
class ContactsNode  extends AstNode {
  constructor() {
    super()
    this.text = "";
    this.raw = "";
    this.type = "contacts";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "text", this.text);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    if ( (typeof(this.repeats) !== "undefined" && this.repeats != null )  ) {
      CompactAstJson.addRepeatsField(fields, "repeats", this.repeats);
    }
    CompactAstJson.addOptionalStringField(fields, "comment", this.comment);
    return CompactAstJson.jsonObject(fields);
  };
}
class IntRangeParseNode  {
  constructor() {
    this.ok = false;
    this.min = 0;
  }
}
class RepeatsNode  {
  constructor() {
    this.raw = "";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "raw", this.raw);
    CompactAstJson.addOptionalIntField(fields, "sets", this.sets);
    CompactAstJson.addOptionalIntField(fields, "setsMax", this.setsMax);
    CompactAstJson.addOptionalIntField(fields, "reps", this.reps);
    CompactAstJson.addOptionalIntField(fields, "repsMax", this.repsMax);
    return CompactAstJson.jsonObject(fields);
  };
}
class DurationRangeParseNode  {
  constructor() {
    this.ok = false;
  }
}
class FeelingNode  extends AstNode {
  constructor() {
    super()
    this.scale = "feeling";
    this.raw = "";
    this.type = "feeling";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "scale", this.scale);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    CompactAstJson.addOptionalDoubleField(fields, "value", this.value);
    CompactAstJson.addOptionalStringField(fields, "description", this.description);
    return CompactAstJson.jsonObject(fields);
  };
}
class PainNode  extends AstNode {
  constructor() {
    super()
    this.raw = "";
    this.type = "pain";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    CompactAstJson.addOptionalStringField(fields, "bodyPart", this.bodyPart);
    CompactAstJson.addOptionalDoubleField(fields, "severity", this.severity);
    CompactAstJson.addOptionalStringField(fields, "description", this.description);
    return CompactAstJson.jsonObject(fields);
  };
}
class VitalsNode  extends AstNode {
  constructor() {
    super()
    this.raw = "";
    this.type = "vitals";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    return CompactAstJson.jsonObject(fields);
  };
}
class ReminderNode  extends AstNode {
  constructor() {
    super()
    this.date = "";
    this.type = "reminder";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "date", this.date);
    CompactAstJson.addOptionalStringField(fields, "description", this.description);
    return CompactAstJson.jsonObject(fields);
  };
}
class LocationNode  extends AstNode {
  constructor() {
    super()
    this.place = "";
    this.type = "location";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "place", this.place);
    return CompactAstJson.jsonObject(fields);
  };
}
class UrlNode  extends AstNode {
  constructor() {
    super()
    this.url = "";
    this.type = "url";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "url", this.url);
    return CompactAstJson.jsonObject(fields);
  };
}
class UnknownNode  extends AstNode {
  constructor() {
    super()
    this.raw = "";
    this.type = "unknown";
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "type", this.type);
    CompactAstJson.addStringField(fields, "raw", this.raw);
    return CompactAstJson.jsonObject(fields);
  };
}
class WorkoutNode  {
  constructor() {
    this.type = "workout";     /** note: unused */
    this.title = "";
    this.content = [];
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addStringField(fields, "title", this.title);
    CompactAstJson.addNodeArrayField(fields, "content", this.content);
    if ( (typeof(this.date) !== "undefined" && this.date != null )  ) {
      CompactAstJson.addDateField(fields, "date", this.date);
    }
    return CompactAstJson.jsonObject(fields);
  };
}
class StatsNode  {
  constructor() {
    this.type = "stats";     /** note: unused */
    this.workouts = 0;     /** note: unused */
    this.exercises = 0;     /** note: unused */
    this.sets = 0;     /** note: unused */
    this.reps = 0;     /** note: unused */
  }
}
class DocumentNode  {
  constructor() {
    this.workouts = [];
    this.stats = [];     /** note: unused */
  }
  toJSONString () {
    let fields = [];
    CompactAstJson.addWorkoutArrayField(fields, "workouts", this.workouts);
    CompactAstJson.addOptionalStringField(fields, "format", this.format);
    return CompactAstJson.jsonObject(fields);
  };
}
class CompactAstParser  {
  constructor() {
  }
  startsWith (s, prefix) {
    const sLen = s.length;
    const pLen = prefix.length;
    if ( sLen < pLen ) {
      return false;
    }
    return (s.substring(0, pLen )) == prefix;
  };
  findToken (s, token) {
    const sLen = s.length;
    const tLen = token.length;
    if ( tLen == 0 ) {
      return 0;
    }
    if ( sLen < tLen ) {
      return -1;
    }
    let i = 0;
    while (i <= (sLen - tLen)) {
      if ( (s.substring(i, (i + tLen) )) == token ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  endsWith (s, suffix) {
    const sLen = s.length;
    const pLen = suffix.length;
    if ( sLen < pLen ) {
      return false;
    }
    return (s.substring((sLen - pLen), sLen )) == suffix;
  };
  parseDateFromHeader (line, hashPos) {
    const d = new DateValueNode();
    const leftPart = (line.substring(0, hashPos )).trim();
    const lLen = leftPart.length;
    if ( lLen < 2 ) {
      return d;
    }
    const firstC = leftPart.charCodeAt(0 );
    const lastC = leftPart.charCodeAt((lLen - 1) );
    if ( false == ((firstC == 91) && (lastC == 93)) ) {
      return d;
    }
    const inner = (leftPart.substring(1, (lLen - 1) )).trim();
    const parts = inner.split("-");
    if ( (parts.length) != 3 ) {
      return d;
    }
    const yOpt = isNaN( parseInt(((parts[0]).trim())) ) ? undefined : parseInt(((parts[0]).trim()));
    const mOpt = isNaN( parseInt(((parts[1]).trim())) ) ? undefined : parseInt(((parts[1]).trim()));
    const dOpt = isNaN( parseInt(((parts[2]).trim())) ) ? undefined : parseInt(((parts[2]).trim()));
    if ( typeof(yOpt) === "undefined" ) {
      return d;
    }
    if ( typeof(mOpt) === "undefined" ) {
      return d;
    }
    if ( typeof(dOpt) === "undefined" ) {
      return d;
    }
    d.year = yOpt;
    d.month = mOpt;
    d.day = dOpt;
    d.unknown = false;
    return d;
  };
  parseTitleFromHeader (line, hashPos) {
    const lineLen = line.length;
    const titlePart = (line.substring((hashPos + 2), lineLen )).trim();
    if ( (titlePart.length) > 0 ) {
      return titlePart;
    }
    return "Untitled";
  };
  parseDistanceToken (token) {
    const out = new DistanceNode();
    const t = token.trim();
    if ( (t.length) == 0 ) {
      return out;
    }
    let units = [];
    units.push("km");
    units.push("mi");
    units.push("yd");
    units.push("ft");
    units.push("m");
    for ( let i = 0; i < units.length; i++) {
      var unit = units[i];
      if ( (this).endsWith(t, unit) ) {
        const tLen = t.length;
        const uLen = unit.length;
        if ( tLen <= uLen ) {
          continue;
        }
        const numPart = (t.substring(0, (tLen - uLen) )).trim();
        const numericTok = this.isNumericToken(numPart);
        if ( numericTok == false ) {
          continue;
        }
        const numOpt = isNaN( parseFloat(numPart) ) ? undefined : parseFloat(numPart);
        if ( typeof(numOpt) === "undefined" ) {
          continue;
        }
        const d = new DistanceNode();
        d.value = numOpt;
        d.unit = unit;
        return d;
      }
    };
    return out;
  };
  parseDistanceRangeToken (token) {
    const out = new DistanceNode();
    const t = token.trim();
    if ( (t.length) == 0 ) {
      return out;
    }
    let units = [];
    units.push("km");
    units.push("mi");
    units.push("yd");
    units.push("ft");
    units.push("m");
    for ( let i = 0; i < units.length; i++) {
      var unit = units[i];
      if ( (this).endsWith(t, unit) ) {
        const tLen = t.length;
        const uLen = unit.length;
        if ( tLen <= uLen ) {
          continue;
        }
        const numPart = (t.substring(0, (tLen - uLen) )).trim();
        const dashPos = this.findToken(numPart, "-");
        if ( dashPos > 0 ) {
          const left = (numPart.substring(0, dashPos )).trim();
          const right = (numPart.substring((dashPos + 1), (numPart.length) )).trim();
          const leftOpt = isNaN( parseFloat(left) ) ? undefined : parseFloat(left);
          const rightOpt = isNaN( parseFloat(right) ) ? undefined : parseFloat(right);
          if ( ((typeof(leftOpt) !== "undefined" && leftOpt != null ) ) && ((typeof(rightOpt) !== "undefined" && rightOpt != null ) ) ) {
            out.value = leftOpt;
            out.valueMax = rightOpt;
            out.unit = unit;
            return out;
          }
        }
        const singleOpt = isNaN( parseFloat(numPart) ) ? undefined : parseFloat(numPart);
        if ( (typeof(singleOpt) !== "undefined" && singleOpt != null )  ) {
          out.value = singleOpt;
          out.unit = unit;
          return out;
        }
      }
    };
    return out;
  };
  isNumericToken (s) {
    const t = s.trim();
    if ( (t.length) == 0 ) {
      return false;
    }
    let i = 0;
    while (i < (t.length)) {
      const ch = t.charCodeAt(i );
      let ok = false;
      if ( (ch >= (48)) && (ch <= (57)) ) {
        ok = true;
      }
      if ( (ch == (46)) || (ch == (45)) ) {
        ok = true;
      }
      if ( ok == false ) {
        return false;
      }
      i = i + 1;
    };
    return true;
  };
  isAsciiLetter (ch) {
    if ( (ch >= (65)) && (ch <= (90)) ) {
      return true;
    }
    if ( (ch >= (97)) && (ch <= (122)) ) {
      return true;
    }
    return false;
  };
  isSportToken (token) {
    const t = token.trim();
    if ( (t.length) == 0 ) {
      return false;
    }
    const first = t.charCodeAt(0 );
    if ( false == ((first >= 65) && (first <= 90)) ) {
      return false;
    }
    let i = 0;
    while (i < (t.length)) {
      const ch = t.charCodeAt(i );
      let ok = false;
      if ( this.isAsciiLetter(ch) ) {
        ok = true;
      }
      if ( (ch == (45)) || (ch == (95)) ) {
        ok = true;
      }
      if ( ok == false ) {
        return false;
      }
      i = i + 1;
    };
    return true;
  };
  isReservedTagToken (token) {
    if ( token == "Format" ) {
      return true;
    }
    if ( token == "Tags" ) {
      return true;
    }
    if ( token == "Emojis" ) {
      return true;
    }
    if ( token == "Summary" ) {
      return true;
    }
    if ( token == "Text" ) {
      return true;
    }
    if ( token == "Derived" ) {
      return true;
    }
    if ( token == "Exercise" ) {
      return true;
    }
    if ( token == "Phase" ) {
      return true;
    }
    if ( token == "Section" ) {
      return true;
    }
    if ( token == "Time" ) {
      return true;
    }
    if ( token == "Duration" ) {
      return true;
    }
    if ( token == "Contacts" ) {
      return true;
    }
    if ( token == "Lift" ) {
      return true;
    }
    if ( token == "Endurance" ) {
      return true;
    }
    if ( token == "Reminder" ) {
      return true;
    }
    if ( token == "Feeling" ) {
      return true;
    }
    if ( token == "Feelings" ) {
      return true;
    }
    if ( token == "Pain" ) {
      return true;
    }
    if ( token == "Vitals" ) {
      return true;
    }
    if ( token == "Location" ) {
      return true;
    }
    if ( token == "URL" ) {
      return true;
    }
    return false;
  };
  isKnownSportToken (token) {
    if ( token == "Run" ) {
      return true;
    }
    if ( token == "Swim" ) {
      return true;
    }
    if ( token == "Bike" ) {
      return true;
    }
    if ( token == "Cycle" ) {
      return true;
    }
    if ( token == "Ski" ) {
      return true;
    }
    if ( token == "Skijump" ) {
      return true;
    }
    if ( token == "Row" ) {
      return true;
    }
    if ( token == "Walk" ) {
      return true;
    }
    if ( token == "Hike" ) {
      return true;
    }
    return false;
  };
  hasDigit (s) {
    let i = 0;
    while (i < (s.length)) {
      const ch = s.charCodeAt(i );
      if ( (ch >= (48)) && (ch <= (57)) ) {
        return true;
      }
      i = i + 1;
    };
    return false;
  };
  hasDynamicSportSignal (line, sportToken) {
    const parts = line.split("|");
    const head = (parts[0]).trim();
    const sportLen = sportToken.length;
    if ( (head.length) <= sportLen ) {
      return false;
    }
    const rest = (head.substring(sportLen, (head.length) )).trim();
    if ( (rest.length) == 0 ) {
      return false;
    }
    const tokens = rest.split(" ");
    for ( let i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      const t = tok.trim();
      if ( (t.length) == 0 ) {
        continue;
      }
      const dNode = this.parseDistanceToken(t);
      if ( (dNode.unit.length) > 0 ) {
        return true;
      }
      const dur = this.parseDurationToken(t);
      if ( (dur.length) > 0 ) {
        return true;
      }
      if ( this.hasDigit(t) ) {
        return true;
      }
    };
    return false;
  };
  detectSportToken (line) {
    const lineLen = line.length;
    if ( lineLen == 0 ) {
      return "";
    }
    const spacePos = this.findToken(line, " ");
    const pipePos = this.findToken(line, "|");
    let endPos = lineLen;
    if ( spacePos >= 0 ) {
      endPos = spacePos;
    }
    if ( pipePos >= 0 ) {
      if ( (spacePos < 0) || (pipePos < endPos) ) {
        endPos = pipePos;
      }
    }
    const token = (line.substring(0, endPos )).trim();
    const sportLike = this.isSportToken(token);
    if ( sportLike == false ) {
      return "";
    }
    if ( this.isReservedTagToken(token) ) {
      return "";
    }
    if ( this.isKnownSportToken(token) ) {
      return token;
    }
    if ( this.hasDynamicSportSignal(line, token) ) {
      return token;
    }
    return "";
  };
  parseDurationToken (token) {
    const t = token.trim();
    if ( (t.length) < 2 ) {
      return "";
    }
    const colonPos = this.findToken(t, ":");
    if ( colonPos > 0 ) {
      const parts = t.split(":");
      if ( (parts.length) == 2 ) {
        const minPart = (parts[0]).trim();
        const secPart = (parts[1]).trim();
        const minOk = this.isNumericToken(minPart);
        const secOk = this.isNumericToken(secPart);
        if ( minOk && secOk ) {
          return t;
        }
      }
    }
    const aposPos = this.findToken(t, "'");
    if ( aposPos > 0 ) {
      const tLen = t.length;
      const minPart_1 = (t.substring(0, aposPos )).trim();
      const secPartRaw = (t.substring((aposPos + 1), tLen )).trim();
      let secPart_1 = secPartRaw;
      if ( (this).endsWith(secPart_1, "\"") ) {
        const sLen = secPart_1.length;
        if ( sLen > 1 ) {
          secPart_1 = (secPart_1.substring(0, (sLen - 1) )).trim();
        }
      }
      const minOk_1 = this.isNumericToken(minPart_1);
      const secOk_1 = this.isNumericToken(secPart_1);
      if ( minOk_1 && secOk_1 ) {
        return t;
      }
    }
    const minPos = this.findToken(t, "min");
    if ( minPos > 0 ) {
      if ( (this).endsWith(t, "s") ) {
        const tLen_1 = t.length;
        if ( tLen_1 > (minPos + 4) ) {
          const minPart_2 = (t.substring(0, minPos )).trim();
          const secPart_2 = (t.substring((minPos + 3), (tLen_1 - 1) )).trim();
          const minOk_2 = this.isNumericToken(minPart_2);
          const secOk_2 = this.isNumericToken(secPart_2);
          if ( minOk_2 && secOk_2 ) {
            return t;
          }
        }
      }
    }
    let units = [];
    units.push("min");
    units.push("sec");
    units.push("h");
    units.push("s");
    for ( let i = 0; i < units.length; i++) {
      var unit = units[i];
      if ( (this).endsWith(t, unit) ) {
        const tLen_2 = t.length;
        const uLen = unit.length;
        if ( tLen_2 <= uLen ) {
          continue;
        }
        const numPart = (t.substring(0, (tLen_2 - uLen) )).trim();
        const numericTok = this.isNumericToken(numPart);
        if ( numericTok ) {
          return t;
        }
      }
    };
    return "";
  };
  parseDurationRangeToken (token) {
    const out = new DurationRangeParseNode();
    const t = token.trim();
    if ( (t.length) == 0 ) {
      return out;
    }
    const single = this.parseDurationToken(t);
    if ( (single.length) > 0 ) {
      out.ok = true;
      out.min = single;
      return out;
    }
    const dashPos = this.findToken(t, "-");
    if ( dashPos > 0 ) {
      const left = (t.substring(0, dashPos )).trim();
      const right = (t.substring((dashPos + 1), (t.length) )).trim();
      if ( (left.length) == 0 ) {
        return out;
      }
      if ( (right.length) == 0 ) {
        return out;
      }
      const leftDur = this.parseDurationToken(left);
      const rightDur = this.parseDurationToken(right);
      if ( ((leftDur.length) > 0) && ((rightDur.length) > 0) ) {
        out.ok = true;
        out.min = leftDur;
        out.max = rightDur;
      }
    }
    return out;
  };
  parseDurationQuantity (token) {
    const out = new QuantityNode();
    out.raw = token.trim();
    const t = out.raw;
    if ( (t.length) == 0 ) {
      return out;
    }
    const minPos = this.findToken(t, "min");
    if ( minPos > 0 ) {
      if ( (this).endsWith(t, "s") ) {
        const tLen = t.length;
        if ( tLen > (minPos + 4) ) {
          const minPart = (t.substring(0, minPos )).trim();
          const secPart = (t.substring((minPos + 3), (tLen - 1) )).trim();
          const minOpt = isNaN( parseFloat(minPart) ) ? undefined : parseFloat(minPart);
          const secOpt = isNaN( parseFloat(secPart) ) ? undefined : parseFloat(secPart);
          if ( ((typeof(minOpt) !== "undefined" && minOpt != null ) ) && ((typeof(secOpt) !== "undefined" && secOpt != null ) ) ) {
            out.value = ((minOpt) * 60.0) + (secOpt);
            out.unit = "s";
            return out;
          }
        }
      }
    }
    const clockSecs = this.parseClockSeconds(t);
    if ( clockSecs > 0.0 ) {
      out.value = clockSecs;
      out.unit = "s";
      return out;
    }
    let units = [];
    units.push("min");
    units.push("sec");
    units.push("h");
    units.push("s");
    for ( let i = 0; i < units.length; i++) {
      var unit = units[i];
      if ( (this).endsWith(t, unit) ) {
        const tLen_1 = t.length;
        const uLen = unit.length;
        if ( tLen_1 <= uLen ) {
          continue;
        }
        const numPart = (t.substring(0, (tLen_1 - uLen) )).trim();
        const dashPos = this.findToken(numPart, "-");
        if ( dashPos > 0 ) {
          const left = (numPart.substring(0, dashPos )).trim();
          const right = (numPart.substring((dashPos + 1), (numPart.length) )).trim();
          const leftOpt = isNaN( parseFloat(left) ) ? undefined : parseFloat(left);
          const rightOpt = isNaN( parseFloat(right) ) ? undefined : parseFloat(right);
          if ( ((typeof(leftOpt) !== "undefined" && leftOpt != null ) ) && ((typeof(rightOpt) !== "undefined" && rightOpt != null ) ) ) {
            out.value = leftOpt;
            out.valueMax = rightOpt;
            out.unit = unit;
            return out;
          }
        }
        const singleOpt = isNaN( parseFloat(numPart) ) ? undefined : parseFloat(numPart);
        if ( (typeof(singleOpt) !== "undefined" && singleOpt != null )  ) {
          out.value = singleOpt;
          out.unit = unit;
          return out;
        }
      }
    };
    return out;
  };
  parseSuffixedQuantity (token, unit) {
    const out = new QuantityNode();
    out.raw = token.trim();
    const t = out.raw;
    if ( (t.length) == 0 ) {
      return out;
    }
    const hasUnit = (this).endsWith(t, unit);
    if ( hasUnit == false ) {
      return out;
    }
    const tLen = t.length;
    const uLen = unit.length;
    if ( tLen <= uLen ) {
      return out;
    }
    const numPart = (t.substring(0, (tLen - uLen) )).trim();
    const dashPos = this.findToken(numPart, "-");
    if ( dashPos > 0 ) {
      const left = (numPart.substring(0, dashPos )).trim();
      const right = (numPart.substring((dashPos + 1), (numPart.length) )).trim();
      const leftOpt = isNaN( parseFloat(left) ) ? undefined : parseFloat(left);
      const rightOpt = isNaN( parseFloat(right) ) ? undefined : parseFloat(right);
      if ( ((typeof(leftOpt) !== "undefined" && leftOpt != null ) ) && ((typeof(rightOpt) !== "undefined" && rightOpt != null ) ) ) {
        out.value = leftOpt;
        out.valueMax = rightOpt;
        out.unit = unit;
        return out;
      }
    }
    const oneOpt = isNaN( parseFloat(numPart) ) ? undefined : parseFloat(numPart);
    if ( (typeof(oneOpt) !== "undefined" && oneOpt != null )  ) {
      out.value = oneOpt;
      out.unit = unit;
    }
    return out;
  };
  parseClockSeconds (token) {
    const t = token.trim();
    if ( (t.length) == 0 ) {
      return -1.0;
    }
    const colonPos = this.findToken(t, ":");
    if ( colonPos > 0 ) {
      const parts = t.split(":");
      if ( (parts.length) == 2 ) {
        const minOpt = isNaN( parseFloat(((parts[0]).trim())) ) ? undefined : parseFloat(((parts[0]).trim()));
        const secOpt = isNaN( parseFloat(((parts[1]).trim())) ) ? undefined : parseFloat(((parts[1]).trim()));
        if ( ((typeof(minOpt) !== "undefined" && minOpt != null ) ) && ((typeof(secOpt) !== "undefined" && secOpt != null ) ) ) {
          return ((minOpt) * 60.0) + (secOpt);
        }
      }
    }
    const aposPos = this.findToken(t, "'");
    if ( aposPos > 0 ) {
      const tLen = t.length;
      const minPart = (t.substring(0, aposPos )).trim();
      const secPartRaw = (t.substring((aposPos + 1), tLen )).trim();
      let secPart = secPartRaw;
      if ( (this).endsWith(secPart, "\"") ) {
        const sLen = secPart.length;
        if ( sLen > 1 ) {
          secPart = (secPart.substring(0, (sLen - 1) )).trim();
        }
      }
      const minOpt_1 = isNaN( parseFloat(minPart) ) ? undefined : parseFloat(minPart);
      const secOpt_1 = isNaN( parseFloat(secPart) ) ? undefined : parseFloat(secPart);
      if ( ((typeof(minOpt_1) !== "undefined" && minOpt_1 != null ) ) && ((typeof(secOpt_1) !== "undefined" && secOpt_1 != null ) ) ) {
        return ((minOpt_1) * 60.0) + (secOpt_1);
      }
    }
    return -1.0;
  };
  inferDurationFromPace (paceToken, distance) {
    if ( typeof(distance) === "undefined" ) {
      return "";
    }
    const t = paceToken.trim();
    if ( (t.length) == 0 ) {
      return "";
    }
    const slashPos = this.findToken(t, "/");
    if ( slashPos <= 0 ) {
      return "";
    }
    const paceTime = (t.substring(0, slashPos )).trim();
    const perPart = (t.substring((slashPos + 1), (t.length) )).trim();
    if ( (paceTime.length) == 0 ) {
      return "";
    }
    if ( (perPart.length) == 0 ) {
      return "";
    }
    const paceSecs = this.parseClockSeconds(paceTime);
    if ( paceSecs <= 0.0 ) {
      return "";
    }
    let per;
    if ( perPart == "km" ) {
      const oneKm = new DistanceNode();
      oneKm.value = 1.0;
      oneKm.unit = "km";
      per = oneKm;
    } else {
      const perDist = this.parseDistanceToken(perPart);
      if ( (perDist.unit.length) > 0 ) {
        per = perDist;
      }
    }
    if ( typeof(per) === "undefined" ) {
      return "";
    }
    const d = distance;
    const p = per;
    if ( d.unit != p.unit ) {
      return "";
    }
    if ( p.value <= 0.0 ) {
      return "";
    }
    const ratio = d.value / p.value;
    if ( ratio <= 0.0 ) {
      return "";
    }
    const outSecs = paceSecs * ratio;
    if ( outSecs <= 0.0 ) {
      return "";
    }
    return ("" + outSecs) + "s";
  };
  parsePaceQuantity (paceToken) {
    const out = new QuantityNode();
    out.raw = paceToken.trim();
    const t = out.raw;
    if ( (t.length) == 0 ) {
      return out;
    }
    const slashPos = this.findToken(t, "/");
    if ( slashPos <= 0 ) {
      return out;
    }
    const paceTime = (t.substring(0, slashPos )).trim();
    const perPart = (t.substring((slashPos + 1), (t.length) )).trim();
    if ( (paceTime.length) == 0 ) {
      return out;
    }
    if ( (perPart.length) == 0 ) {
      return out;
    }
    const paceSecs = this.parseClockSeconds(paceTime);
    if ( paceSecs <= 0.0 ) {
      return out;
    }
    if ( perPart == "100m" ) {
      out.value = paceSecs;
      out.unit = "s/100m";
      return out;
    }
    let isKm = false;
    if ( perPart == "km" ) {
      isKm = true;
    }
    if ( isKm ) {
      out.value = 3600.0 / paceSecs;
      out.unit = "km/h";
      return out;
    }
    const perDist = this.parseDistanceToken(perPart);
    if ( (perDist.unit.length) > 0 ) {
      if ( perDist.unit == "m" ) {
        if ( perDist.value > 0.0 ) {
          out.value = paceSecs * (100.0 / perDist.value);
          out.unit = "s/100m";
          return out;
        }
      }
    }
    return out;
  };
  parseRepeatDistance (token, node) {
    const t = token.trim();
    if ( (t.length) == 0 ) {
      return false;
    }
    const xPos = this.findToken(t, "x");
    if ( xPos <= 0 ) {
      return false;
    }
    const left = (t.substring(0, xPos )).trim();
    const right = (t.substring((xPos + 1), (t.length) )).trim();
    if ( (left.length) == 0 ) {
      return false;
    }
    if ( (right.length) == 0 ) {
      return false;
    }
    const countOpt = isNaN( parseInt(left) ) ? undefined : parseInt(left);
    if ( typeof(countOpt) === "undefined" ) {
      return false;
    }
    const dNode = this.parseDistanceToken(right);
    if ( (dNode.unit.length) == 0 ) {
      return false;
    }
    node.count = countOpt;
    node.distance = dNode;
    return true;
  };
  parseIntOrRange (token) {
    const out = new IntRangeParseNode();
    const t = token.trim();
    if ( (t.length) == 0 ) {
      return out;
    }
    const dashPos = this.findToken(t, "-");
    if ( dashPos > 0 ) {
      const left = (t.substring(0, dashPos )).trim();
      const right = (t.substring((dashPos + 1), (t.length) )).trim();
      if ( (left.length) == 0 ) {
        return out;
      }
      if ( (right.length) == 0 ) {
        return out;
      }
      const minOpt = isNaN( parseInt(left) ) ? undefined : parseInt(left);
      const maxOpt = isNaN( parseInt(right) ) ? undefined : parseInt(right);
      if ( ((typeof(minOpt) !== "undefined" && minOpt != null ) ) && ((typeof(maxOpt) !== "undefined" && maxOpt != null ) ) ) {
        out.ok = true;
        out.min = minOpt;
        out.max = maxOpt;
      }
      return out;
    }
    const oneOpt = isNaN( parseInt(t) ) ? undefined : parseInt(t);
    if ( (typeof(oneOpt) !== "undefined" && oneOpt != null )  ) {
      out.ok = true;
      out.min = oneOpt;
    }
    return out;
  };
  parseRepeatsToken (token) {
    const out = new RepeatsNode();
    out.raw = token.trim();
    const t = token.trim();
    if ( (t.length) == 0 ) {
      return out;
    }
    const xPos = this.findToken(t, "x");
    if ( xPos > 0 ) {
      const left = (t.substring(0, xPos )).trim();
      const right = (t.substring((xPos + 1), (t.length) )).trim();
      const setParsed = this.parseIntOrRange(left);
      const repParsed = this.parseIntOrRange(right);
      if ( setParsed.ok && repParsed.ok ) {
        out.sets = setParsed.min;
        if ( (typeof(setParsed.max) !== "undefined" && setParsed.max != null )  ) {
          out.setsMax = setParsed.max;
        }
        out.reps = repParsed.min;
        if ( (typeof(repParsed.max) !== "undefined" && repParsed.max != null )  ) {
          out.repsMax = repParsed.max;
        }
      }
      return out;
    }
    const repOnly = this.parseIntOrRange(t);
    if ( repOnly.ok ) {
      out.reps = repOnly.min;
      if ( (typeof(repOnly.max) !== "undefined" && repOnly.max != null )  ) {
        out.repsMax = repOnly.max;
      }
    }
    return out;
  };
  parseMoveQuantities (segment, node, preferRecovery) {
    const seg = segment.trim();
    if ( (seg.length) == 0 ) {
      return;
    }
    const tokens = seg.split(" ");
    let sawSlash = false;
    for ( let i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      const t = tok.trim();
      if ( (t.length) == 0 ) {
        continue;
      }
      if ( t == "/" ) {
        sawSlash = true;
        continue;
      }
      const parsedRepDist = this.parseRepeatDistance(t, node);
      if ( parsedRepDist ) {
        continue;
      }
      const dNode = this.parseDistanceToken(t);
      if ( (dNode.unit.length) > 0 ) {
        if ( typeof(node.distance) === "undefined" ) {
          node.distance = dNode;
        }
        continue;
      }
      const dur = this.parseDurationToken(t);
      if ( (dur.length) > 0 ) {
        if ( preferRecovery || sawSlash ) {
          if ( typeof(node.recovery) === "undefined" ) {
            node.recovery = dur;
            const q = this.parseDurationQuantity(dur);
            if ( (q.unit.length) > 0 ) {
              node.recoveryQuantity = q;
            }
          }
        } else {
          if ( typeof(node.duration) === "undefined" ) {
            node.duration = dur;
            const q_1 = this.parseDurationQuantity(dur);
            if ( (q_1.unit.length) > 0 ) {
              node.durationQuantity = q_1;
            }
          }
        }
        sawSlash = false;
        continue;
      }
      const hrQ = this.parseSuffixedQuantity(t, "bpm");
      if ( (hrQ.unit.length) > 0 ) {
        if ( typeof(node.hrQuantity) === "undefined" ) {
          node.hrQuantity = hrQ;
        }
        continue;
      }
      const intensityQ = this.parseSuffixedQuantity(t, "%");
      if ( (intensityQ.unit.length) > 0 ) {
        if ( typeof(node.intensityQuantity) === "undefined" ) {
          node.intensityQuantity = intensityQ;
        }
        if ( typeof(node.intensity) === "undefined" ) {
          node.intensity = t;
        }
        continue;
      }
      const zPrefix = (this).startsWith(t, "Z");
      if ( zPrefix ) {
        if ( typeof(node.intensity) === "undefined" ) {
          node.intensity = t;
        }
        continue;
      }
    };
  };
  parseMoveHeadQuantities (segment, node) {
    const seg = segment.trim();
    if ( (seg.length) == 0 ) {
      return;
    }
    const tokens = seg.split(" ");
    let sawSlash = false;
    let sawDuration = false;
    for ( let i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      const t = tok.trim();
      if ( (t.length) == 0 ) {
        continue;
      }
      if ( t == "/" ) {
        sawSlash = true;
        continue;
      }
      const parsedRepDist = this.parseRepeatDistance(t, node);
      if ( parsedRepDist ) {
        continue;
      }
      const dNode = this.parseDistanceToken(t);
      if ( (dNode.unit.length) > 0 ) {
        if ( typeof(node.distance) === "undefined" ) {
          node.distance = dNode;
        }
        continue;
      }
      const dur = this.parseDurationToken(t);
      if ( (dur.length) > 0 ) {
        if ( sawDuration == false ) {
          if ( typeof(node.duration) === "undefined" ) {
            node.duration = dur;
            const q = this.parseDurationQuantity(dur);
            if ( (q.unit.length) > 0 ) {
              node.durationQuantity = q;
            }
          }
          sawDuration = true;
        } else {
          if ( sawSlash ) {
            if ( typeof(node.recovery) === "undefined" ) {
              node.recovery = dur;
              const q2 = this.parseDurationQuantity(dur);
              if ( (q2.unit.length) > 0 ) {
                node.recoveryQuantity = q2;
              }
            }
          }
        }
        sawSlash = false;
        continue;
      }
      const hrQ = this.parseSuffixedQuantity(t, "bpm");
      if ( (hrQ.unit.length) > 0 ) {
        if ( typeof(node.hrQuantity) === "undefined" ) {
          node.hrQuantity = hrQ;
        }
        continue;
      }
      const intensityQ = this.parseSuffixedQuantity(t, "%");
      if ( (intensityQ.unit.length) > 0 ) {
        if ( typeof(node.intensityQuantity) === "undefined" ) {
          node.intensityQuantity = intensityQ;
        }
        if ( typeof(node.intensity) === "undefined" ) {
          node.intensity = t;
        }
        continue;
      }
      const zPrefix = (this).startsWith(t, "Z");
      if ( zPrefix ) {
        if ( typeof(node.intensity) === "undefined" ) {
          node.intensity = t;
        }
        continue;
      }
    };
  };
  parseSplitNode (line) {
    const n = new SplitNode();
    n.raw = line;
    const parts = line.split("|");
    const head = (parts[0]).trim();
    const tokens = head.split(" ");
    for ( let i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      const t = tok.trim();
      if ( (t.length) == 0 ) {
        continue;
      }
      if ( (this).startsWith(t, "[[") ) {
        n.customFields.push(t);
        continue;
      }
      const dNode = this.parseDistanceToken(t);
      if ( (dNode.unit.length) > 0 ) {
        if ( typeof(n.distance) === "undefined" ) {
          n.distance = dNode;
        }
        continue;
      }
      const bpmPos = this.findToken(t, "bpm");
      if ( bpmPos > 0 ) {
        const hrPart = (t.substring(0, bpmPos )).trim();
        const hrOpt = isNaN( parseInt(hrPart) ) ? undefined : parseInt(hrPart);
        if ( (typeof(hrOpt) !== "undefined" && hrOpt != null )  ) {
          n.hr = hrOpt;
          continue;
        }
      }
      const pace100Pos = this.findToken(t, "/100m");
      const paceKmPos = this.findToken(t, "/km");
      if ( (pace100Pos > 0) || (paceKmPos > 0) ) {
        n.pace = t;
        const paceQ = this.parsePaceQuantity(t);
        if ( (paceQ.unit.length) > 0 ) {
          n.paceQuantity = paceQ;
        }
        if ( typeof(n.duration) === "undefined" ) {
          const inferred = this.inferDurationFromPace(t, n.distance);
          if ( (inferred.length) > 0 ) {
            n.duration = inferred;
          }
        }
        continue;
      }
      const dur = this.parseDurationToken(t);
      if ( (dur.length) > 0 ) {
        if ( typeof(n.duration) === "undefined" ) {
          n.duration = dur;
        }
        continue;
      }
    };
    if ( typeof(n.pace) === "undefined" ) {
      const headP100 = this.findToken(head, "/100m");
      const headPkm = this.findToken(head, "/km");
      if ( (headP100 > 0) || (headPkm > 0) ) {
        n.pace = head;
        const paceQ2 = this.parsePaceQuantity(head);
        if ( (paceQ2.unit.length) > 0 ) {
          n.paceQuantity = paceQ2;
        }
      }
    }
    if ( typeof(n.hr) === "undefined" ) {
      const bpmAllPos = this.findToken(head, "bpm");
      if ( bpmAllPos > 0 ) {
        let start = bpmAllPos - 1;
        while (start >= 0) {
          const ch = head.charCodeAt(start );
          if ( (ch >= (48)) && (ch <= (57)) ) {
            start = start - 1;
          } else {
            start = start + 1;
            break;
          }
        };
        if ( start < 0 ) {
          start = 0;
        }
        const hrPart_1 = (head.substring(start, bpmAllPos )).trim();
        if ( (hrPart_1.length) > 0 ) {
          const hrOpt_1 = isNaN( parseInt(hrPart_1) ) ? undefined : parseInt(hrPart_1);
          if ( (typeof(hrOpt_1) !== "undefined" && hrOpt_1 != null )  ) {
            n.hr = hrOpt_1;
          }
        }
      }
    }
    if ( (parts.length) > 1 ) {
      parts.splice(0, 1).pop();
      const noteTxt = (parts.join("|")).trim();
      if ( (noteTxt.length) > 0 ) {
        n.note = noteTxt;
      }
    }
    return n;
  };
  childDepth (line) {
    const __len = line.length;
    if ( __len == 0 ) {
      return 0;
    }
    let i = 0;
    while (i < __len) {
      const ch = line.charCodeAt(i );
      if ( ch == (32) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    let depth = 0;
    while (i < __len) {
      const ch_1 = line.charCodeAt(i );
      if ( ch_1 == (62) ) {
        depth = depth + 1;
        i = i + 1;
        while (i < __len) {
          const sp = line.charCodeAt(i );
          if ( sp == (32) ) {
            i = i + 1;
          } else {
            break;
          }
        };
      } else {
        break;
      }
    };
    return depth;
  };
  stripChildPrefix (line) {
    const __len = line.length;
    let i = 0;
    while (i < __len) {
      const ch = line.charCodeAt(i );
      if ( (ch == (32)) || (ch == (62)) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    return (line.substring(i, __len )).trim();
  };
  parseTagsNode (line) {
    const t = new TagsNode();
    const rest = (line.substring(4, (line.length) )).trim();
    const parts = rest.split(",");
    for ( let i = 0; i < parts.length; i++) {
      var one = parts[i];
      const v = one.trim();
      if ( (v.length) > 0 ) {
        t.tags.push(v);
      }
    };
    return t;
  };
  parseEmojisNode (line) {
    const n = new EmojisNode();
    n.emojis = (line.substring(6, (line.length) )).trim();
    return n;
  };
  parseSummaryNode (line) {
    const n = new SummaryNode();
    n.text = (line.substring(7, (line.length) )).trim();
    return n;
  };
  parseTextNode (line) {
    const n = new TextLineNode();
    n.value = (line.substring(4, (line.length) )).trim();
    return n;
  };
  parseDerivedNode (line) {
    const n = new DerivedNode();
    n.raw = line;
    const rest = (line.substring(7, (line.length) )).trim();
    const tokens = rest.split(" ");
    if ( (tokens.length) > 0 ) {
      n.name = (tokens[0]).trim();
    }
    if ( (tokens.length) > 1 ) {
      const valueUnit = (tokens[1]).trim();
      const vuParts = valueUnit.split("|");
      if ( (vuParts.length) > 0 ) {
        const numOpt = isNaN( parseFloat(((vuParts[0]).trim())) ) ? undefined : parseFloat(((vuParts[0]).trim()));
        if ( (typeof(numOpt) !== "undefined" && numOpt != null )  ) {
          n.value = numOpt;
        }
      }
      if ( (vuParts.length) > 1 ) {
        n.unit = (vuParts[1]).trim();
      }
    }
    if ( (tokens.length) > 2 ) {
      tokens.splice(0, 1).pop();
      tokens.splice(0, 1).pop();
      const note = (tokens.join(" ")).trim();
      if ( (note.length) > 0 ) {
        n.note = note;
      }
    }
    return n;
  };
  parseExerciseAttemptToken (token) {
    const out = new ExerciseAttemptNode();
    out.raw = token.trim();
    const t = out.raw;
    if ( (t.length) == 0 ) {
      return out;
    }
    const atPos = this.findToken(t, "@");
    let left = t;
    let right = "";
    if ( atPos >= 0 ) {
      left = (t.substring(0, atPos )).trim();
      right = (t.substring((atPos + 1), (t.length) )).trim();
    }
    if ( (left.length) > 0 ) {
      const leftParts = left.split("x");
      if ( (leftParts.length) > 1 ) {
        const setPart = (leftParts[0]).trim();
        const setRange = this.parseIntOrRange(setPart);
        if ( setRange.ok ) {
          out.sets = setRange.min;
          if ( (typeof(setRange.max) !== "undefined" && setRange.max != null )  ) {
            out.setsMax = setRange.max;
          }
        }
        const repPart = (leftParts[1]).trim();
        const repDuration = this.parseDurationRangeToken(repPart);
        if ( repDuration.ok ) {
          out.duration = repDuration.min;
          if ( (typeof(repDuration.max) !== "undefined" && repDuration.max != null )  ) {
            out.durationMax = repDuration.max;
          }
        } else {
          const repRange = this.parseIntOrRange(repPart);
          if ( repRange.ok ) {
            out.reps = repRange.min;
            if ( (typeof(repRange.max) !== "undefined" && repRange.max != null )  ) {
              out.repsMax = repRange.max;
            }
          } else {
            if ( repPart == "?" ) {
              out.repeatsUnknown = true;
            } else {
              const repLen = repPart.length;
              let repSplitPos = repLen;
              let j = 0;
              while (j < repLen) {
                const repCh = repPart.charCodeAt(j );
                let repIsNum = false;
                if ( (repCh >= (48)) && (repCh <= (57)) ) {
                  repIsNum = true;
                }
                if ( (repCh == (46)) || (repCh == (45)) ) {
                  repIsNum = true;
                }
                if ( repIsNum == false ) {
                  repSplitPos = j;
                  j = repLen;
                } else {
                  j = j + 1;
                }
              };
              const repValuePart = (repPart.substring(0, repSplitPos )).trim();
              const repUnitPart = (repPart.substring(repSplitPos, repLen )).trim();
              if ( ((repValuePart.length) > 0) && ((repUnitPart.length) > 0) ) {
                const repLoadOpt = isNaN( parseFloat(repValuePart) ) ? undefined : parseFloat(repValuePart);
                if ( (typeof(repLoadOpt) !== "undefined" && repLoadOpt != null )  ) {
                  out.loadValue = repLoadOpt;
                  out.loadUnit = repUnitPart;
                }
              }
            }
          }
        }
        if ( (leftParts.length) > 2 ) {
          const distPart = (leftParts[2]).trim();
          const dRange = this.parseDistanceRangeToken(distPart);
          if ( (dRange.unit.length) > 0 ) {
            out.distance = dRange;
          }
        }
      } else {
        const leftDuration = this.parseDurationRangeToken(left);
        if ( leftDuration.ok ) {
          out.duration = leftDuration.min;
          if ( (typeof(leftDuration.max) !== "undefined" && leftDuration.max != null )  ) {
            out.durationMax = leftDuration.max;
          }
        } else {
          const repRange_1 = this.parseIntOrRange(left);
          if ( repRange_1.ok ) {
            out.reps = repRange_1.min;
            if ( (typeof(repRange_1.max) !== "undefined" && repRange_1.max != null )  ) {
              out.repsMax = repRange_1.max;
            }
          } else {
            if ( left == "?" ) {
              out.repeatsUnknown = true;
            }
          }
        }
      }
    }
    if ( (right.length) > 0 ) {
      const rLen = right.length;
      let splitPos = rLen;
      let i = 0;
      while (i < rLen) {
        const ch = right.charCodeAt(i );
        let isNum = false;
        if ( (ch >= (48)) && (ch <= (57)) ) {
          isNum = true;
        }
        if ( (ch == (46)) || (ch == (45)) ) {
          isNum = true;
        }
        if ( isNum == false ) {
          splitPos = i;
          i = rLen;
        } else {
          i = i + 1;
        }
      };
      const valuePart = (right.substring(0, splitPos )).trim();
      const unitPart = (right.substring(splitPos, rLen )).trim();
      if ( (valuePart.length) > 0 ) {
        const valueOpt = isNaN( parseFloat(valuePart) ) ? undefined : parseFloat(valuePart);
        if ( (typeof(valueOpt) !== "undefined" && valueOpt != null )  ) {
          out.loadValue = valueOpt;
        }
      }
      if ( (unitPart.length) > 0 ) {
        out.loadUnit = unitPart;
      }
      if ( typeof(out.loadValue) === "undefined" ) {
        if ( (right.length) > 0 ) {
          out.loadUnit = right;
        }
      }
    }
    return out;
  };
  parseExerciseNode (line, prefixLen) {
    const n = new ExerciseNode();
    n.raw = line;
    const rest = (line.substring(prefixLen, (line.length) )).trim();
    const parts = rest.split("|");
    if ( (parts.length) > 0 ) {
      n.name = (parts[0]).trim();
    }
    if ( (parts.length) > 1 ) {
      const specTxt = (parts[1]).trim();
      if ( (specTxt.length) > 0 ) {
        n.spec = specTxt;
      }
      if ( (parts.length) > 2 ) {
        parts.splice(0, 1).pop();
        parts.splice(0, 1).pop();
        const commentTxt = (parts.join("|")).trim();
        if ( (commentTxt.length) > 0 ) {
          n.comment = commentTxt;
        }
      }
      let composedNote = "";
      if ( (typeof(n.spec) !== "undefined" && n.spec != null )  ) {
        composedNote = n.spec;
      }
      if ( (typeof(n.comment) !== "undefined" && n.comment != null )  ) {
        if ( (composedNote.length) > 0 ) {
          composedNote = (composedNote + " | ") + (n.comment);
        } else {
          composedNote = n.comment;
        }
      }
      if ( (composedNote.length) > 0 ) {
        n.note = composedNote;
      }
      if ( (typeof(n.spec) !== "undefined" && n.spec != null )  ) {
        const specForSeries = n.spec;
        const maybeSeriesParts = specForSeries.split(",");
        if ( (maybeSeriesParts.length) > 1 ) {
          let okSeries = true;
          for ( let i = 0; i < maybeSeriesParts.length; i++) {
            var one = maybeSeriesParts[i];
            const token = one.trim();
            if ( (token.length) == 0 ) {
              okSeries = false;
              continue;
            }
            let repToken = token;
            const atPos = this.findToken(token, "@");
            if ( atPos > 0 ) {
              repToken = (token.substring(0, atPos )).trim();
            }
            const xPos = this.findToken(repToken, "x");
            if ( xPos > 0 ) {
              repToken = (repToken.substring((xPos + 1), (repToken.length) )).trim();
            }
            const numOpt = isNaN( parseInt(repToken) ) ? undefined : parseInt(repToken);
            if ( typeof(numOpt) === "undefined" ) {
              okSeries = false;
              continue;
            }
            n.repsSeries.push(numOpt);
          };
          if ( okSeries == false ) {
            n.repsSeries.length = 0;
          }
        }
        const attemptParts = specForSeries.split(",");
        for ( let i_1 = 0; i_1 < attemptParts.length; i_1++) {
          var one_1 = attemptParts[i_1];
          const tok = one_1.trim();
          if ( (tok.length) == 0 ) {
            continue;
          }
          n.attempts.push(this.parseExerciseAttemptToken(tok));
        };
      }
    }
    return n;
  };
  parsePhaseNode (line) {
    const n = new PhaseNode();
    n.raw = line;
    const rest = (line.substring(5, (line.length) )).trim();
    const parts = rest.split("|");
    if ( (parts.length) > 0 ) {
      n.name = (parts[0]).trim();
    }
    if ( (parts.length) > 1 ) {
      parts.splice(0, 1).pop();
      const details = (parts.join("|")).trim();
      if ( (details.length) > 0 ) {
        n.details = details;
      }
    }
    return n;
  };
  parseSectionNode (line) {
    const n = new SectionNode();
    n.raw = line;
    n.name = (line.substring(8, (line.length) )).trim();
    return n;
  };
  parseDurationNode (line, prefixLen) {
    const n = new DurationNode();
    n.raw = line;
    n.text = (line.substring(prefixLen, (line.length) )).trim();
    const parts = n.text.split("|");
    if ( (parts.length) > 0 ) {
      const head = (parts[0]).trim();
      let q = this.parseDurationQuantity(head);
      if ( (q.unit.length) == 0 ) {
        const compactHead = (head.split(" ")).join("");
        q = this.parseDurationQuantity(compactHead);
      }
      if ( (q.unit.length) > 0 ) {
        n.durationQuantity = q;
      }
      if ( (parts.length) > 1 ) {
        parts.splice(0, 1).pop();
        const commentTxt = (parts.join("|")).trim();
        if ( (commentTxt.length) > 0 ) {
          n.comment = commentTxt;
        }
      }
    }
    return n;
  };
  parseContactsNode (line) {
    const n = new ContactsNode();
    n.raw = line;
    n.text = (line.substring(9, (line.length) )).trim();
    const parts = n.text.split("|");
    if ( (parts.length) > 0 ) {
      const head = (parts[0]).trim();
      const rep = this.parseRepeatsToken(head);
      if ( ((typeof(rep.reps) !== "undefined" && rep.reps != null ) ) || ((typeof(rep.sets) !== "undefined" && rep.sets != null ) ) ) {
        n.repeats = rep;
      }
      if ( (parts.length) > 1 ) {
        parts.splice(0, 1).pop();
        const commentTxt = (parts.join("|")).trim();
        if ( (commentTxt.length) > 0 ) {
          n.comment = commentTxt;
        }
      }
    }
    return n;
  };
  parseFeelingNode (line) {
    const n = new FeelingNode();
    n.raw = line;
    const rest = (line.substring(7, (line.length) )).trim();
    const parts = rest.split("|");
    if ( (parts.length) > 0 ) {
      const valuePart = (parts[0]).trim();
      if ( (this).startsWith(valuePart, "RPE:") ) {
        n.scale = "rpe";
        const rpeOpt = isNaN( parseFloat(((valuePart.substring(4, (valuePart.length) )).trim())) ) ? undefined : parseFloat(((valuePart.substring(4, (valuePart.length) )).trim()));
        if ( (typeof(rpeOpt) !== "undefined" && rpeOpt != null )  ) {
          n.value = rpeOpt;
        }
      } else {
        const slashPos = this.findToken(valuePart, "/");
        if ( slashPos > 0 ) {
          const left = (valuePart.substring(0, slashPos )).trim();
          const valOpt = isNaN( parseFloat(left) ) ? undefined : parseFloat(left);
          if ( (typeof(valOpt) !== "undefined" && valOpt != null )  ) {
            n.value = valOpt;
          }
        } else {
          if ( (valuePart.length) > 0 ) {
            const valOpt_1 = isNaN( parseFloat(valuePart) ) ? undefined : parseFloat(valuePart);
            if ( (typeof(valOpt_1) !== "undefined" && valOpt_1 != null )  ) {
              n.value = valOpt_1;
            }
          }
        }
      }
    }
    if ( (parts.length) > 1 ) {
      parts.splice(0, 1).pop();
      const desc = (parts.join("|")).trim();
      if ( (desc.length) > 0 ) {
        n.description = desc;
      }
    }
    return n;
  };
  parsePainNode (line) {
    const n = new PainNode();
    n.raw = line;
    const rest = (line.substring(4, (line.length) )).trim();
    const parts = rest.split("|");
    if ( (parts.length) > 0 ) {
      const body = (parts[0]).trim();
      if ( (body.length) > 0 ) {
        n.bodyPart = body;
      }
    }
    if ( (parts.length) > 1 ) {
      const sevAndDesc = (parts[1]).trim();
      const slashPos = this.findToken(sevAndDesc, "/");
      if ( slashPos > 0 ) {
        const sevStr = (sevAndDesc.substring(0, slashPos )).trim();
        const sevOpt = isNaN( parseFloat(sevStr) ) ? undefined : parseFloat(sevStr);
        if ( (typeof(sevOpt) !== "undefined" && sevOpt != null )  ) {
          n.severity = sevOpt;
        }
      }
      if ( (parts.length) > 2 ) {
        parts.splice(0, 1).pop();
        parts.splice(0, 1).pop();
        const desc = (parts.join("|")).trim();
        if ( (desc.length) > 0 ) {
          n.description = desc;
        }
      }
    }
    return n;
  };
  parseVitalsNode (line) {
    const n = new VitalsNode();
    n.raw = line;
    return n;
  };
  parseReminderNode (line) {
    const n = new ReminderNode();
    const rest = (line.substring(8, (line.length) )).trim();
    const parts = rest.split("|");
    if ( (parts.length) > 0 ) {
      n.date = (parts[0]).trim();
    }
    if ( (parts.length) > 1 ) {
      parts.splice(0, 1).pop();
      const desc = (parts.join("|")).trim();
      if ( (desc.length) > 0 ) {
        n.description = desc;
      }
    }
    return n;
  };
  parseLocationNode (line) {
    const n = new LocationNode();
    n.place = (line.substring(8, (line.length) )).trim();
    return n;
  };
  parseUrlNode (line) {
    const n = new UrlNode();
    n.url = (line.substring(3, (line.length) )).trim();
    return n;
  };
  parseSportNode (line, sportToken) {
    const node = new MoveNode();
    node.sport = sportToken;
    const parts = line.split("|");
    const head = (parts[0]).trim();
    let headRest = "";
    const sportLen = sportToken.length;
    if ( (head.length) > sportLen ) {
      headRest = (head.substring(sportLen, (head.length) )).trim();
    }
    this.parseMoveHeadQuantities(headRest, node);
    if ( (parts.length) > 1 ) {
      let i = 1;
      while (i < (parts.length)) {
        const seg = (parts[i]).trim();
        let preferRecovery = true;
        if ( i == 1 ) {
          preferRecovery = false;
        }
        this.parseMoveQuantities(seg, node, preferRecovery);
        i = i + 1;
      };
      parts.splice(0, 1).pop();
      const noteTxt = (parts.join("|")).trim();
      if ( (noteTxt.length) > 0 ) {
        node.note = noteTxt;
      }
    }
    return node;
  };
  createWorkout (title, date, hasDate, doc) {
    const w = new WorkoutNode();
    w.title = title;
    if ( hasDate ) {
      w.date = date;
    }
    doc.workouts.push(w);
    return w;
  };
  ensureCurrent (current, doc) {
    if ( (typeof(current) !== "undefined" && current != null )  ) {
      return current;
    }
    const emptyDate = new DateValueNode();
    return this.createWorkout("Untitled", emptyDate, false, doc);
  };
  parse (input) {
    const doc = new DocumentNode();
    const lines = input.split("\n");
    let current;
    let currentMove;
    let currentSplit;
    for ( let i = 0; i < lines.length; i++) {
      var rawLine = lines[i];
      const line = rawLine.trim();
      if ( (line.length) == 0 ) {
        continue;
      }
      const depth = this.childDepth(line);
      if ( depth > 0 ) {
        const payload = this.stripChildPrefix(line);
        if ( (payload.length) == 0 ) {
          continue;
        }
        if ( depth == 1 ) {
          if ( (typeof(currentMove) !== "undefined" && currentMove != null )  ) {
            const s = this.parseSplitNode(payload);
            const m = currentMove;
            m.splits.push(s);
            currentSplit = s;
            continue;
          }
        }
        if ( depth > 1 ) {
          if ( (typeof(currentSplit) !== "undefined" && currentSplit != null )  ) {
            const s2 = this.parseSplitNode(payload);
            const ps = currentSplit;
            ps.splits.push(s2);
            currentSplit = s2;
            continue;
          }
        }
        const wChild = this.ensureCurrent(current, doc);
        const unkChild = new UnknownNode();
        unkChild.raw = line;
        wChild.content.push(unkChild);
        current = wChild;
        continue;
      }
      if ( (this).startsWith(line, "Format ") ) {
        doc.format = (line.substring(7, (line.length) )).trim();
        continue;
      }
      if ( (this).startsWith(line, "##") ) {
        let title = (line.substring(2, (line.length) )).trim();
        if ( (title.length) == 0 ) {
          title = "Untitled";
        }
        const emptyDate = new DateValueNode();
        current = this.createWorkout(title, emptyDate, false, doc);
        continue;
      }
      const hashPos = this.findToken(line, "##");
      if ( hashPos >= 0 ) {
        const date = this.parseDateFromHeader(line, hashPos);
        const title_1 = this.parseTitleFromHeader(line, hashPos);
        let hasDate = false;
        if ( date.unknown == false ) {
          hasDate = true;
        }
        current = this.createWorkout(title_1, date, hasDate, doc);
        continue;
      }
      if ( (this).startsWith(line, "Tags ") ) {
        const w = this.ensureCurrent(current, doc);
        w.content.push(this.parseTagsNode(line));
        current = w;
        continue;
      }
      if ( (this).startsWith(line, "Emojis ") ) {
        const w_1 = this.ensureCurrent(current, doc);
        w_1.content.push(this.parseEmojisNode(line));
        current = w_1;
        continue;
      }
      if ( (this).startsWith(line, "Summary ") ) {
        const w_2 = this.ensureCurrent(current, doc);
        w_2.content.push(this.parseSummaryNode(line));
        current = w_2;
        continue;
      }
      if ( (this).startsWith(line, "Text ") ) {
        const w_3 = this.ensureCurrent(current, doc);
        w_3.content.push(this.parseTextNode(line));
        current = w_3;
        continue;
      }
      if ( (this).startsWith(line, "Derived ") ) {
        const w_4 = this.ensureCurrent(current, doc);
        w_4.content.push(this.parseDerivedNode(line));
        current = w_4;
        continue;
      }
      if ( (this).startsWith(line, "Exercise ") ) {
        const w_5 = this.ensureCurrent(current, doc);
        w_5.content.push(this.parseExerciseNode(line, 8));
        current = w_5;
        continue;
      }
      if ( (this).startsWith(line, "Phase") ) {
        const w_6 = this.ensureCurrent(current, doc);
        w_6.content.push(this.parsePhaseNode(line));
        current = w_6;
        continue;
      }
      if ( (this).startsWith(line, "Section ") ) {
        const w_7 = this.ensureCurrent(current, doc);
        w_7.content.push(this.parseSectionNode(line));
        current = w_7;
        continue;
      }
      if ( (this).startsWith(line, "Time ") ) {
        const w_8 = this.ensureCurrent(current, doc);
        w_8.content.push(this.parseDurationNode(line, 5));
        current = w_8;
        continue;
      }
      if ( (this).startsWith(line, "Duration ") ) {
        const w_9 = this.ensureCurrent(current, doc);
        w_9.content.push(this.parseDurationNode(line, 9));
        current = w_9;
        continue;
      }
      if ( (this).startsWith(line, "Contacts ") ) {
        const w_10 = this.ensureCurrent(current, doc);
        w_10.content.push(this.parseContactsNode(line));
        current = w_10;
        continue;
      }
      if ( (this).startsWith(line, "Lift ") ) {
        const w_11 = this.ensureCurrent(current, doc);
        w_11.content.push(this.parseExerciseNode(line, 4));
        current = w_11;
        continue;
      }
      if ( (this).startsWith(line, "Reminder ") ) {
        const w_12 = this.ensureCurrent(current, doc);
        w_12.content.push(this.parseReminderNode(line));
        current = w_12;
        continue;
      }
      if ( (this).startsWith(line, "Feeling") ) {
        const w_13 = this.ensureCurrent(current, doc);
        w_13.content.push(this.parseFeelingNode(line));
        current = w_13;
        continue;
      }
      if ( (this).startsWith(line, "Pain ") ) {
        const w_14 = this.ensureCurrent(current, doc);
        w_14.content.push(this.parsePainNode(line));
        current = w_14;
        continue;
      }
      if ( (this).startsWith(line, "Vitals ") ) {
        const w_15 = this.ensureCurrent(current, doc);
        w_15.content.push(this.parseVitalsNode(line));
        current = w_15;
        continue;
      }
      if ( (this).startsWith(line, "Location ") ) {
        const w_16 = this.ensureCurrent(current, doc);
        w_16.content.push(this.parseLocationNode(line));
        current = w_16;
        continue;
      }
      if ( (this).startsWith(line, "URL ") ) {
        const w_17 = this.ensureCurrent(current, doc);
        w_17.content.push(this.parseUrlNode(line));
        current = w_17;
        continue;
      }
      const sportToken = this.detectSportToken(line);
      if ( (sportToken.length) > 0 ) {
        const w_18 = this.ensureCurrent(current, doc);
        const moveNode = this.parseSportNode(line, sportToken);
        w_18.content.push(moveNode);
        current = w_18;
        currentMove = moveNode;
        continue;
      }
      const w_19 = this.ensureCurrent(current, doc);
      const unk = new UnknownNode();
      unk.raw = line;
      w_19.content.push(unk);
      current = w_19;
    };
    return doc;
  };
}
CompactAstParser.parseText = function(input) {
  const parser = new CompactAstParser();
  return parser.parse(input);
};
module.exports.CompactAstJson = CompactAstJson;
module.exports.AstNode = AstNode;
module.exports.DateValueNode = DateValueNode;
module.exports.DistanceNode = DistanceNode;
module.exports.QuantityNode = QuantityNode;
module.exports.MoveNode = MoveNode;
module.exports.SplitNode = SplitNode;
module.exports.TagsNode = TagsNode;
module.exports.EmojisNode = EmojisNode;
module.exports.SummaryNode = SummaryNode;
module.exports.TextLineNode = TextLineNode;
module.exports.DerivedNode = DerivedNode;
module.exports.ExerciseAttemptNode = ExerciseAttemptNode;
module.exports.ExerciseNode = ExerciseNode;
module.exports.PhaseNode = PhaseNode;
module.exports.SectionNode = SectionNode;
module.exports.DurationNode = DurationNode;
module.exports.ContactsNode = ContactsNode;
module.exports.IntRangeParseNode = IntRangeParseNode;
module.exports.RepeatsNode = RepeatsNode;
module.exports.DurationRangeParseNode = DurationRangeParseNode;
module.exports.FeelingNode = FeelingNode;
module.exports.PainNode = PainNode;
module.exports.VitalsNode = VitalsNode;
module.exports.ReminderNode = ReminderNode;
module.exports.LocationNode = LocationNode;
module.exports.UrlNode = UrlNode;
module.exports.UnknownNode = UnknownNode;
module.exports.WorkoutNode = WorkoutNode;
module.exports.StatsNode = StatsNode;
module.exports.DocumentNode = DocumentNode;
module.exports.CompactAstParser = CompactAstParser;
