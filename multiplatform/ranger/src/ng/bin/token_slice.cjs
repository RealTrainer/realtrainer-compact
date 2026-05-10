class DateTimeValue  {
  constructor() {
    this.kind = "datetime";
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.hasTime = false;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["year"] = this.year;
      res["month"] = this.month;
      res["day"] = this.day;
      res["hasTime"] = this.hasTime;
      res["hour"] = this.hour;
      res["minute"] = this.minute;
      res["second"] = this.second;
      if ( (typeof(this.timezone) !== "undefined" && this.timezone != null )  ) {
        res["timezone"] = this.timezone;
      }
    } catch(e) {
    }
    return res;
  };
}
DateTimeValue.fromDictionary = function(dict) {
  const obj = new DateTimeValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["year"]) ) ? undefined : parseInt(dict ["year"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.year = v_1;
    }
    const v_2 = isNaN( parseInt(dict ["month"]) ) ? undefined : parseInt(dict ["month"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.month = v_2;
    }
    const v_3 = isNaN( parseInt(dict ["day"]) ) ? undefined : parseInt(dict ["day"]) 
    ;
    if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
      obj.day = v_3;
    }
    const v_4 = typeof(dict ["hasTime"]) === "undefined" ? undefined :(dict ["hasTime"]) ;
    if ( (typeof(v_4) !== "undefined" && v_4 != null )  ) {
      obj.hasTime = v_4;
    }
    const v_5 = isNaN( parseInt(dict ["hour"]) ) ? undefined : parseInt(dict ["hour"]) 
    ;
    if ( (typeof(v_5) !== "undefined" && v_5 != null )  ) {
      obj.hour = v_5;
    }
    const v_6 = isNaN( parseInt(dict ["minute"]) ) ? undefined : parseInt(dict ["minute"]) 
    ;
    if ( (typeof(v_6) !== "undefined" && v_6 != null )  ) {
      obj.minute = v_6;
    }
    const v_7 = isNaN( parseInt(dict ["second"]) ) ? undefined : parseInt(dict ["second"]) 
    ;
    if ( (typeof(v_7) !== "undefined" && v_7 != null )  ) {
      obj.second = v_7;
    }
    const v_8 = (typeof (dict ["timezone"]) != "string" ) ? undefined : dict ["timezone"] 
    ;
    if ( (typeof(v_8) !== "undefined" && v_8 != null )  ) {
      obj.timezone = v_8;
    }
  } catch(e) {
  }
  return obj;
};
class DistanceValue  {
  constructor() {
    this.kind = "distance";
    this.value = 0;
    this.unit = "m";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
}
DistanceValue.fromDictionary = function(dict) {
  const obj = new DistanceValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.value = v_1;
    }
    const v_2 = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.unit = v_2;
    }
  } catch(e) {
  }
  return obj;
};
class PercentageValue  {
  constructor() {
    this.kind = "percentage";
    this.value = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
    } catch(e) {
    }
    return res;
  };
}
PercentageValue.fromDictionary = function(dict) {
  const obj = new PercentageValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.value = v_1;
    }
  } catch(e) {
  }
  return obj;
};
class RecoveryTimeValue  {
  constructor() {
    this.kind = "recovery-time";
    this.value = 0;
    this.unit = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
}
RecoveryTimeValue.fromDictionary = function(dict) {
  const obj = new RecoveryTimeValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.value = v_1;
    }
    const v_2 = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.unit = v_2;
    }
  } catch(e) {
  }
  return obj;
};
class WeightValue  {
  constructor() {
    this.kind = "weight";
    this.value = 0;
    this.unit = "kg";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
}
WeightValue.fromDictionary = function(dict) {
  const obj = new WeightValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.value = v_1;
    }
    const v_2 = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.unit = v_2;
    }
  } catch(e) {
  }
  return obj;
};
class NumRangeValue  {
  constructor() {
    this.kind = "num-range";
    this.minValue = 0;
    this.maxValue = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["minValue"] = this.minValue;
      res["maxValue"] = this.maxValue;
    } catch(e) {
    }
    return res;
  };
}
NumRangeValue.fromDictionary = function(dict) {
  const obj = new NumRangeValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["minValue"]) ) ? undefined : parseInt(dict ["minValue"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.minValue = v_1;
    }
    const v_2 = isNaN( parseInt(dict ["maxValue"]) ) ? undefined : parseInt(dict ["maxValue"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.maxValue = v_2;
    }
  } catch(e) {
  }
  return obj;
};
class PercentageRangeValue  {
  constructor() {
    this.kind = "percentage-range";
    this.minValue = 0;
    this.maxValue = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["minValue"] = this.minValue;
      res["maxValue"] = this.maxValue;
    } catch(e) {
    }
    return res;
  };
}
PercentageRangeValue.fromDictionary = function(dict) {
  const obj = new PercentageRangeValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["minValue"]) ) ? undefined : parseInt(dict ["minValue"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.minValue = v_1;
    }
    const v_2 = isNaN( parseInt(dict ["maxValue"]) ) ? undefined : parseInt(dict ["maxValue"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.maxValue = v_2;
    }
  } catch(e) {
  }
  return obj;
};
class RepeatBlockValue  {
  constructor() {
    this.kind = "repeat-block";
    this.count = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["count"] = this.count;
    } catch(e) {
    }
    return res;
  };
}
RepeatBlockValue.fromDictionary = function(dict) {
  const obj = new RepeatBlockValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["count"]) ) ? undefined : parseInt(dict ["count"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.count = v_1;
    }
  } catch(e) {
  }
  return obj;
};
class SetRepRangeLoadValue  {
  constructor() {
    this.kind = "set-rep-range-load";
    this.count = 1;
    this.setsMin = 0;
    this.setsMax = 0;
    this.repsMin = 0;
    this.repsMax = 0;
    this.mode = "";
    this.load = 0;
    this.unit = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["count"] = this.count;
      res["setsMin"] = this.setsMin;
      res["setsMax"] = this.setsMax;
      res["repsMin"] = this.repsMin;
      res["repsMax"] = this.repsMax;
      res["mode"] = this.mode;
      res["load"] = this.load;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
}
SetRepRangeLoadValue.fromDictionary = function(dict) {
  const obj = new SetRepRangeLoadValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["count"]) ) ? undefined : parseInt(dict ["count"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.count = v_1;
    }
    const v_2 = isNaN( parseInt(dict ["setsMin"]) ) ? undefined : parseInt(dict ["setsMin"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.setsMin = v_2;
    }
    const v_3 = isNaN( parseInt(dict ["setsMax"]) ) ? undefined : parseInt(dict ["setsMax"]) 
    ;
    if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
      obj.setsMax = v_3;
    }
    const v_4 = isNaN( parseInt(dict ["repsMin"]) ) ? undefined : parseInt(dict ["repsMin"]) 
    ;
    if ( (typeof(v_4) !== "undefined" && v_4 != null )  ) {
      obj.repsMin = v_4;
    }
    const v_5 = isNaN( parseInt(dict ["repsMax"]) ) ? undefined : parseInt(dict ["repsMax"]) 
    ;
    if ( (typeof(v_5) !== "undefined" && v_5 != null )  ) {
      obj.repsMax = v_5;
    }
    const v_6 = (typeof (dict ["mode"]) != "string" ) ? undefined : dict ["mode"] 
    ;
    if ( (typeof(v_6) !== "undefined" && v_6 != null )  ) {
      obj.mode = v_6;
    }
    const v_7 = isNaN( parseInt(dict ["load"]) ) ? undefined : parseInt(dict ["load"]) 
    ;
    if ( (typeof(v_7) !== "undefined" && v_7 != null )  ) {
      obj.load = v_7;
    }
    const v_8 = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
    ;
    if ( (typeof(v_8) !== "undefined" && v_8 != null )  ) {
      obj.unit = v_8;
    }
  } catch(e) {
  }
  return obj;
};
class ZoneValue  {
  constructor() {
    this.kind = "zone";
    this.zone = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["zone"] = this.zone;
    } catch(e) {
    }
    return res;
  };
}
ZoneValue.fromDictionary = function(dict) {
  const obj = new ZoneValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["zone"]) ) ? undefined : parseInt(dict ["zone"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.zone = v_1;
    }
  } catch(e) {
  }
  return obj;
};
class PositiveIntegerValue  {
  constructor() {
    this.kind = "positive-integer";
    this.value = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
    } catch(e) {
    }
    return res;
  };
}
PositiveIntegerValue.fromDictionary = function(dict) {
  const obj = new PositiveIntegerValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.value = v_1;
    }
  } catch(e) {
  }
  return obj;
};
class DetailsLevelValue  {
  constructor() {
    this.kind = "details-level";
    this.level = 0;
    this.marker = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["level"] = this.level;
      res["marker"] = this.marker;
    } catch(e) {
    }
    return res;
  };
}
DetailsLevelValue.fromDictionary = function(dict) {
  const obj = new DetailsLevelValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["level"]) ) ? undefined : parseInt(dict ["level"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.level = v_1;
    }
    const v_2 = (typeof (dict ["marker"]) != "string" ) ? undefined : dict ["marker"] 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.marker = v_2;
    }
  } catch(e) {
  }
  return obj;
};
class RecoveryValue  {
  constructor() {
    this.kind = "recovery";
    this.label = "Recovery";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["label"] = this.label;
    } catch(e) {
    }
    return res;
  };
}
RecoveryValue.fromDictionary = function(dict) {
  const obj = new RecoveryValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = (typeof (dict ["label"]) != "string" ) ? undefined : dict ["label"] 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.label = v_1;
    }
  } catch(e) {
  }
  return obj;
};
class TimeValueValue  {
  constructor() {
    this.kind = "time-value";
    this.minutes = 0;
    this.seconds = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["minutes"] = this.minutes;
      res["seconds"] = this.seconds;
    } catch(e) {
    }
    return res;
  };
}
TimeValueValue.fromDictionary = function(dict) {
  const obj = new TimeValueValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["minutes"]) ) ? undefined : parseInt(dict ["minutes"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.minutes = v_1;
    }
    const v_2 = isNaN( parseInt(dict ["seconds"]) ) ? undefined : parseInt(dict ["seconds"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.seconds = v_2;
    }
  } catch(e) {
  }
  return obj;
};
class LeftRightValue  {
  constructor() {
    this.kind = "left-right";
    this.side = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["side"] = this.side;
    } catch(e) {
    }
    return res;
  };
}
LeftRightValue.fromDictionary = function(dict) {
  const obj = new LeftRightValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = (typeof (dict ["side"]) != "string" ) ? undefined : dict ["side"] 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.side = v_1;
    }
  } catch(e) {
  }
  return obj;
};
class FeelingValue  {
  constructor() {
    this.kind = "feeling";
    this.score = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["score"] = this.score;
    } catch(e) {
    }
    return res;
  };
}
FeelingValue.fromDictionary = function(dict) {
  const obj = new FeelingValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["score"]) ) ? undefined : parseInt(dict ["score"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.score = v_1;
    }
  } catch(e) {
  }
  return obj;
};
class EffortValue  {
  constructor() {
    this.kind = "effort";
    this.score = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["score"] = this.score;
    } catch(e) {
    }
    return res;
  };
}
EffortValue.fromDictionary = function(dict) {
  const obj = new EffortValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["score"]) ) ? undefined : parseInt(dict ["score"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.score = v_1;
    }
  } catch(e) {
  }
  return obj;
};
class BodyMetricValue  {
  constructor() {
    this.kind = "body-metric";
    this.metric = "";
    this.primaryValue = 0.0;
    this.secondaryValue = 0;
    this.unit = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["metric"] = this.metric;
      res["primaryValue"] = this.primaryValue;
      res["secondaryValue"] = this.secondaryValue;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
}
BodyMetricValue.fromDictionary = function(dict) {
  const obj = new BodyMetricValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = (typeof (dict ["metric"]) != "string" ) ? undefined : dict ["metric"] 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.metric = v_1;
    }
    const v_2 = isNaN( parseFloat(dict ["primaryValue"]) ) ? undefined : parseFloat(dict ["primaryValue"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.primaryValue = v_2;
    }
    const v_3 = isNaN( parseInt(dict ["secondaryValue"]) ) ? undefined : parseInt(dict ["secondaryValue"]) 
    ;
    if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
      obj.secondaryValue = v_3;
    }
    const v_4 = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
    ;
    if ( (typeof(v_4) !== "undefined" && v_4 != null )  ) {
      obj.unit = v_4;
    }
  } catch(e) {
  }
  return obj;
};
class CircuitValue  {
  constructor() {
    this.kind = "circuit";
    this.rounds = 0;
    this.restValue = 0;
    this.restUnit = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["rounds"] = this.rounds;
      res["restValue"] = this.restValue;
      res["restUnit"] = this.restUnit;
    } catch(e) {
    }
    return res;
  };
}
CircuitValue.fromDictionary = function(dict) {
  const obj = new CircuitValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = isNaN( parseInt(dict ["rounds"]) ) ? undefined : parseInt(dict ["rounds"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.rounds = v_1;
    }
    const v_2 = isNaN( parseInt(dict ["restValue"]) ) ? undefined : parseInt(dict ["restValue"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.restValue = v_2;
    }
    const v_3 = (typeof (dict ["restUnit"]) != "string" ) ? undefined : dict ["restUnit"] 
    ;
    if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
      obj.restUnit = v_3;
    }
  } catch(e) {
  }
  return obj;
};
class ContextEntryValue  {
  constructor() {
    this.kind = "context-entry";
    this.content = "";
    this.name = "";
    this.value = "";
    this.hasNumeric = false;
    this.numericValue = 0.0;
    this.unit = "";
    this.basis = "";
    this.source = "";
    this.hasConfidence = false;
    this.confidence = 0.0;
    this.hasGoodness = false;
    this.goodness = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["content"] = this.content;
      res["name"] = this.name;
      res["value"] = this.value;
      res["hasNumeric"] = this.hasNumeric;
      res["numericValue"] = this.numericValue;
      res["unit"] = this.unit;
      res["basis"] = this.basis;
      res["source"] = this.source;
      res["hasConfidence"] = this.hasConfidence;
      res["confidence"] = this.confidence;
      res["hasGoodness"] = this.hasGoodness;
      res["goodness"] = this.goodness;
    } catch(e) {
    }
    return res;
  };
}
ContextEntryValue.fromDictionary = function(dict) {
  const obj = new ContextEntryValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const v_1 = (typeof (dict ["content"]) != "string" ) ? undefined : dict ["content"] 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.content = v_1;
    }
    const v_2 = (typeof (dict ["name"]) != "string" ) ? undefined : dict ["name"] 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.name = v_2;
    }
    const v_3 = (typeof (dict ["value"]) != "string" ) ? undefined : dict ["value"] 
    ;
    if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
      obj.value = v_3;
    }
    const v_4 = typeof(dict ["hasNumeric"]) === "undefined" ? undefined :(dict ["hasNumeric"]) ;
    if ( (typeof(v_4) !== "undefined" && v_4 != null )  ) {
      obj.hasNumeric = v_4;
    }
    const v_5 = isNaN( parseFloat(dict ["numericValue"]) ) ? undefined : parseFloat(dict ["numericValue"]) 
    ;
    if ( (typeof(v_5) !== "undefined" && v_5 != null )  ) {
      obj.numericValue = v_5;
    }
    const v_6 = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
    ;
    if ( (typeof(v_6) !== "undefined" && v_6 != null )  ) {
      obj.unit = v_6;
    }
    const v_7 = (typeof (dict ["basis"]) != "string" ) ? undefined : dict ["basis"] 
    ;
    if ( (typeof(v_7) !== "undefined" && v_7 != null )  ) {
      obj.basis = v_7;
    }
    const v_8 = (typeof (dict ["source"]) != "string" ) ? undefined : dict ["source"] 
    ;
    if ( (typeof(v_8) !== "undefined" && v_8 != null )  ) {
      obj.source = v_8;
    }
    const v_9 = typeof(dict ["hasConfidence"]) === "undefined" ? undefined :(dict ["hasConfidence"]) ;
    if ( (typeof(v_9) !== "undefined" && v_9 != null )  ) {
      obj.hasConfidence = v_9;
    }
    const v_10 = isNaN( parseFloat(dict ["confidence"]) ) ? undefined : parseFloat(dict ["confidence"]) 
    ;
    if ( (typeof(v_10) !== "undefined" && v_10 != null )  ) {
      obj.confidence = v_10;
    }
    const v_11 = typeof(dict ["hasGoodness"]) === "undefined" ? undefined :(dict ["hasGoodness"]) ;
    if ( (typeof(v_11) !== "undefined" && v_11 != null )  ) {
      obj.hasGoodness = v_11;
    }
    const v_12 = isNaN( parseInt(dict ["goodness"]) ) ? undefined : parseInt(dict ["goodness"]) 
    ;
    if ( (typeof(v_12) !== "undefined" && v_12 != null )  ) {
      obj.goodness = v_12;
    }
  } catch(e) {
  }
  return obj;
};
class SliceParsedValue  {
  constructor() {
    this.kind = "";
  }
  hasDateTime () {
    return (typeof(this.dateTime) !== "undefined" && this.dateTime != null ) ;
  };
  getDateTime () {
    if ( (typeof(this.dateTime) !== "undefined" && this.dateTime != null )  ) {
      return this.dateTime;
    }
    return new DateTimeValue();
  };
  hasDistance () {
    return (typeof(this.distance) !== "undefined" && this.distance != null ) ;
  };
  getDistance () {
    if ( (typeof(this.distance) !== "undefined" && this.distance != null )  ) {
      return this.distance;
    }
    return new DistanceValue();
  };
  hasPercentage () {
    return (typeof(this.percentage) !== "undefined" && this.percentage != null ) ;
  };
  getPercentage () {
    if ( (typeof(this.percentage) !== "undefined" && this.percentage != null )  ) {
      return this.percentage;
    }
    return new PercentageValue();
  };
  hasRecoveryTime () {
    return (typeof(this.recoveryTime) !== "undefined" && this.recoveryTime != null ) ;
  };
  getRecoveryTime () {
    if ( (typeof(this.recoveryTime) !== "undefined" && this.recoveryTime != null )  ) {
      return this.recoveryTime;
    }
    return new RecoveryTimeValue();
  };
  hasWeight () {
    return (typeof(this.weight) !== "undefined" && this.weight != null ) ;
  };
  getWeight () {
    if ( (typeof(this.weight) !== "undefined" && this.weight != null )  ) {
      return this.weight;
    }
    return new WeightValue();
  };
  hasNumRange () {
    return (typeof(this.numRange) !== "undefined" && this.numRange != null ) ;
  };
  getNumRange () {
    if ( (typeof(this.numRange) !== "undefined" && this.numRange != null )  ) {
      return this.numRange;
    }
    return new NumRangeValue();
  };
  hasPercentageRange () {
    return (typeof(this.percentageRange) !== "undefined" && this.percentageRange != null ) ;
  };
  getPercentageRange () {
    if ( (typeof(this.percentageRange) !== "undefined" && this.percentageRange != null )  ) {
      return this.percentageRange;
    }
    return new PercentageRangeValue();
  };
  hasRepeatBlock () {
    return (typeof(this.repeatBlock) !== "undefined" && this.repeatBlock != null ) ;
  };
  getRepeatBlock () {
    if ( (typeof(this.repeatBlock) !== "undefined" && this.repeatBlock != null )  ) {
      return this.repeatBlock;
    }
    return new RepeatBlockValue();
  };
  hasSetRepRangeLoad () {
    return (typeof(this.setRepRangeLoad) !== "undefined" && this.setRepRangeLoad != null ) ;
  };
  getSetRepRangeLoad () {
    if ( (typeof(this.setRepRangeLoad) !== "undefined" && this.setRepRangeLoad != null )  ) {
      return this.setRepRangeLoad;
    }
    return new SetRepRangeLoadValue();
  };
  hasZone () {
    return (typeof(this.zone) !== "undefined" && this.zone != null ) ;
  };
  getZone () {
    if ( (typeof(this.zone) !== "undefined" && this.zone != null )  ) {
      return this.zone;
    }
    return new ZoneValue();
  };
  hasPositiveInteger () {
    return (typeof(this.positiveInteger) !== "undefined" && this.positiveInteger != null ) ;
  };
  getPositiveInteger () {
    if ( (typeof(this.positiveInteger) !== "undefined" && this.positiveInteger != null )  ) {
      return this.positiveInteger;
    }
    return new PositiveIntegerValue();
  };
  hasDetailsLevel () {
    return (typeof(this.detailsLevel) !== "undefined" && this.detailsLevel != null ) ;
  };
  getDetailsLevel () {
    if ( (typeof(this.detailsLevel) !== "undefined" && this.detailsLevel != null )  ) {
      return this.detailsLevel;
    }
    return new DetailsLevelValue();
  };
  hasRecovery () {
    return (typeof(this.recovery) !== "undefined" && this.recovery != null ) ;
  };
  getRecovery () {
    if ( (typeof(this.recovery) !== "undefined" && this.recovery != null )  ) {
      return this.recovery;
    }
    return new RecoveryValue();
  };
  hasTimeValue () {
    return (typeof(this.timeValue) !== "undefined" && this.timeValue != null ) ;
  };
  getTimeValue () {
    if ( (typeof(this.timeValue) !== "undefined" && this.timeValue != null )  ) {
      return this.timeValue;
    }
    return new TimeValueValue();
  };
  hasLeftRight () {
    return (typeof(this.leftRight) !== "undefined" && this.leftRight != null ) ;
  };
  getLeftRight () {
    if ( (typeof(this.leftRight) !== "undefined" && this.leftRight != null )  ) {
      return this.leftRight;
    }
    return new LeftRightValue();
  };
  hasFeeling () {
    return (typeof(this.feeling) !== "undefined" && this.feeling != null ) ;
  };
  getFeeling () {
    if ( (typeof(this.feeling) !== "undefined" && this.feeling != null )  ) {
      return this.feeling;
    }
    return new FeelingValue();
  };
  hasEffort () {
    return (typeof(this.effort) !== "undefined" && this.effort != null ) ;
  };
  getEffort () {
    if ( (typeof(this.effort) !== "undefined" && this.effort != null )  ) {
      return this.effort;
    }
    return new EffortValue();
  };
  hasBodyMetric () {
    return (typeof(this.bodyMetric) !== "undefined" && this.bodyMetric != null ) ;
  };
  getBodyMetric () {
    if ( (typeof(this.bodyMetric) !== "undefined" && this.bodyMetric != null )  ) {
      return this.bodyMetric;
    }
    return new BodyMetricValue();
  };
  hasCircuit () {
    return (typeof(this.circuit) !== "undefined" && this.circuit != null ) ;
  };
  getCircuit () {
    if ( (typeof(this.circuit) !== "undefined" && this.circuit != null )  ) {
      return this.circuit;
    }
    return new CircuitValue();
  };
  hasContextEntry () {
    return (typeof(this.contextEntry) !== "undefined" && this.contextEntry != null ) ;
  };
  getContextEntry () {
    if ( (typeof(this.contextEntry) !== "undefined" && this.contextEntry != null )  ) {
      return this.contextEntry;
    }
    return new ContextEntryValue();
  };
}
SliceParsedValue.create = function(kind) {
  const out = new SliceParsedValue();
  out.kind = kind;
  return out;
};
SliceParsedValue.fromDateTime = function(value) {
  const out = new SliceParsedValue();
  out.kind = "datetime";
  out.dateTime = value;
  return out;
};
SliceParsedValue.fromDistance = function(value) {
  const out = new SliceParsedValue();
  out.kind = "distance";
  out.distance = value;
  return out;
};
SliceParsedValue.fromPercentage = function(value) {
  const out = new SliceParsedValue();
  out.kind = "percentage";
  out.percentage = value;
  return out;
};
SliceParsedValue.fromRecoveryTime = function(value) {
  const out = new SliceParsedValue();
  out.kind = "recovery-time";
  out.recoveryTime = value;
  return out;
};
SliceParsedValue.fromWeight = function(value) {
  const out = new SliceParsedValue();
  out.kind = "weight";
  out.weight = value;
  return out;
};
SliceParsedValue.fromNumRange = function(value) {
  const out = new SliceParsedValue();
  out.kind = "num-range";
  out.numRange = value;
  return out;
};
SliceParsedValue.fromPercentageRange = function(value) {
  const out = new SliceParsedValue();
  out.kind = "percentage-range";
  out.percentageRange = value;
  return out;
};
SliceParsedValue.fromRepeatBlock = function(value) {
  const out = new SliceParsedValue();
  out.kind = "repeat-block";
  out.repeatBlock = value;
  return out;
};
SliceParsedValue.fromSetRepRangeLoad = function(value) {
  const out = new SliceParsedValue();
  out.kind = "set-rep-range-load";
  out.setRepRangeLoad = value;
  return out;
};
SliceParsedValue.fromZone = function(value) {
  const out = new SliceParsedValue();
  out.kind = "zone";
  out.zone = value;
  return out;
};
SliceParsedValue.fromPositiveInteger = function(value) {
  const out = new SliceParsedValue();
  out.kind = "positive-integer";
  out.positiveInteger = value;
  return out;
};
SliceParsedValue.fromDetailsLevel = function(value) {
  const out = new SliceParsedValue();
  out.kind = "details-level";
  out.detailsLevel = value;
  return out;
};
SliceParsedValue.fromRecovery = function(value) {
  const out = new SliceParsedValue();
  out.kind = "recovery";
  out.recovery = value;
  return out;
};
SliceParsedValue.fromTimeValue = function(value) {
  const out = new SliceParsedValue();
  out.kind = "time-value";
  out.timeValue = value;
  return out;
};
SliceParsedValue.fromLeftRight = function(value) {
  const out = new SliceParsedValue();
  out.kind = "left-right";
  out.leftRight = value;
  return out;
};
SliceParsedValue.fromFeeling = function(value) {
  const out = new SliceParsedValue();
  out.kind = "feeling";
  out.feeling = value;
  return out;
};
SliceParsedValue.fromEffort = function(value) {
  const out = new SliceParsedValue();
  out.kind = "effort";
  out.effort = value;
  return out;
};
SliceParsedValue.fromBodyMetric = function(value) {
  const out = new SliceParsedValue();
  out.kind = "body-metric";
  out.bodyMetric = value;
  return out;
};
SliceParsedValue.fromCircuit = function(value) {
  const out = new SliceParsedValue();
  out.kind = "circuit";
  out.circuit = value;
  return out;
};
SliceParsedValue.fromContextEntry = function(value) {
  const out = new SliceParsedValue();
  out.kind = "context-entry";
  out.contextEntry = value;
  return out;
};
class TokenSlice  {
  constructor(text, from, length) {
    this.source = "";
    this.start = 0;
    this.size = 0;
    this.tag = "";     /** note: unused */
    this.children = [];
    this.source = text;
    const textLen = text.length;
    let safeStart = from;
    if ( safeStart < 0 ) {
      safeStart = 0;
    }
    if ( safeStart > textLen ) {
      safeStart = textLen;
    }
    let safeLength = length;
    if ( safeLength < 0 ) {
      safeLength = 0;
    }
    if ( (safeStart + safeLength) > textLen ) {
      safeLength = textLen - safeStart;
    }
    this.start = safeStart;
    this.size = safeLength;
  }
  length () {
    return this.size;
  };
  childCount () {
    return this.children.length;
  };
  addChild (child) {
    this.children.push(child);
  };
  getChild (index) {
    return this.children[index];
  };
  isEmpty () {
    return this.size == 0;
  };
  hasValue () {
    return this.size > 0;
  };
  hasDateTimeValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "datetime") && p.hasDateTime() ) {
        return true;
      }
    }
    return false;
  };
  setSliceValue (value) {
    this.parsedValue = value;
  };
  hasSliceValue () {
    return (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null ) ;
  };
  getSliceValueKind () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      return ((this.parsedValue)).kind;
    }
    return "";
  };
  setDateTimeValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.dateTime = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "datetime";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromDateTime(value);
  };
  getAsDateTimeValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "datetime") && p.hasDateTime() ) {
        return p.getDateTime();
      }
    }
    return new DateTimeValue();
  };
  hasDistanceValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "distance") && p.hasDistance() ) {
        return true;
      }
    }
    return false;
  };
  setDistanceValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.distance = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "distance";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromDistance(value);
  };
  getAsDistanceValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "distance") && p.hasDistance() ) {
        return p.getDistance();
      }
    }
    return new DistanceValue();
  };
  hasPercentageValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "percentage") && p.hasPercentage() ) {
        return true;
      }
    }
    return false;
  };
  setPercentageValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.percentage = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "percentage";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromPercentage(value);
  };
  getAsPercentageValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "percentage") && p.hasPercentage() ) {
        return p.getPercentage();
      }
    }
    return new PercentageValue();
  };
  hasRecoveryTimeValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "recovery-time") && p.hasRecoveryTime() ) {
        return true;
      }
    }
    return false;
  };
  setRecoveryTimeValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.recoveryTime = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "recovery-time";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromRecoveryTime(value);
  };
  getAsRecoveryTimeValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "recovery-time") && p.hasRecoveryTime() ) {
        return p.getRecoveryTime();
      }
    }
    return new RecoveryTimeValue();
  };
  hasWeightValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "weight") && p.hasWeight() ) {
        return true;
      }
    }
    return false;
  };
  setWeightValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.weight = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "weight";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromWeight(value);
  };
  getAsWeightValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "weight") && p.hasWeight() ) {
        return p.getWeight();
      }
    }
    return new WeightValue();
  };
  hasNumRangeValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "num-range") && p.hasNumRange() ) {
        return true;
      }
    }
    return false;
  };
  setNumRangeValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.numRange = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "num-range";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromNumRange(value);
  };
  getAsNumRangeValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "num-range") && p.hasNumRange() ) {
        return p.getNumRange();
      }
    }
    return new NumRangeValue();
  };
  hasPercentageRangeValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "percentage-range") && p.hasPercentageRange() ) {
        return true;
      }
    }
    return false;
  };
  setPercentageRangeValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.percentageRange = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "percentage-range";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromPercentageRange(value);
  };
  getAsPercentageRangeValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "percentage-range") && p.hasPercentageRange() ) {
        return p.getPercentageRange();
      }
    }
    return new PercentageRangeValue();
  };
  hasRepeatBlockValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "repeat-block") && p.hasRepeatBlock() ) {
        return true;
      }
    }
    return false;
  };
  setRepeatBlockValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.repeatBlock = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "repeat-block";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromRepeatBlock(value);
  };
  getAsRepeatBlockValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "repeat-block") && p.hasRepeatBlock() ) {
        return p.getRepeatBlock();
      }
    }
    return new RepeatBlockValue();
  };
  hasSetRepRangeLoadValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "set-rep-range-load") && p.hasSetRepRangeLoad() ) {
        return true;
      }
    }
    return false;
  };
  setSetRepRangeLoadValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.setRepRangeLoad = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "set-rep-range-load";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromSetRepRangeLoad(value);
  };
  getAsSetRepRangeLoadValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "set-rep-range-load") && p.hasSetRepRangeLoad() ) {
        return p.getSetRepRangeLoad();
      }
    }
    return new SetRepRangeLoadValue();
  };
  hasZoneValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "zone") && p.hasZone() ) {
        return true;
      }
    }
    return false;
  };
  setZoneValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.zone = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "zone";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromZone(value);
  };
  getAsZoneValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "zone") && p.hasZone() ) {
        return p.getZone();
      }
    }
    return new ZoneValue();
  };
  hasPositiveIntegerValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "positive-integer") && p.hasPositiveInteger() ) {
        return true;
      }
    }
    return false;
  };
  setPositiveIntegerValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.positiveInteger = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "positive-integer";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromPositiveInteger(value);
  };
  getAsPositiveIntegerValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "positive-integer") && p.hasPositiveInteger() ) {
        return p.getPositiveInteger();
      }
    }
    return new PositiveIntegerValue();
  };
  hasDetailsLevelValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "details-level") && p.hasDetailsLevel() ) {
        return true;
      }
    }
    return false;
  };
  setDetailsLevelValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.detailsLevel = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "details-level";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromDetailsLevel(value);
  };
  getAsDetailsLevelValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "details-level") && p.hasDetailsLevel() ) {
        return p.getDetailsLevel();
      }
    }
    return new DetailsLevelValue();
  };
  hasRecoveryValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "recovery") && p.hasRecovery() ) {
        return true;
      }
    }
    return false;
  };
  setRecoveryValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.recovery = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "recovery";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromRecovery(value);
  };
  getAsRecoveryValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "recovery") && p.hasRecovery() ) {
        return p.getRecovery();
      }
    }
    return new RecoveryValue();
  };
  hasTimeValueValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "time-value") && p.hasTimeValue() ) {
        return true;
      }
    }
    return false;
  };
  setTimeValueValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.timeValue = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "time-value";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromTimeValue(value);
  };
  getAsTimeValueValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "time-value") && p.hasTimeValue() ) {
        return p.getTimeValue();
      }
    }
    return new TimeValueValue();
  };
  hasLeftRightValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "left-right") && p.hasLeftRight() ) {
        return true;
      }
    }
    return false;
  };
  setLeftRightValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.leftRight = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "left-right";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromLeftRight(value);
  };
  getAsLeftRightValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "left-right") && p.hasLeftRight() ) {
        return p.getLeftRight();
      }
    }
    return new LeftRightValue();
  };
  hasFeelingValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "feeling") && p.hasFeeling() ) {
        return true;
      }
    }
    return false;
  };
  setFeelingValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.feeling = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "feeling";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromFeeling(value);
  };
  getAsFeelingValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "feeling") && p.hasFeeling() ) {
        return p.getFeeling();
      }
    }
    return new FeelingValue();
  };
  hasEffortValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "effort") && p.hasEffort() ) {
        return true;
      }
    }
    return false;
  };
  setEffortValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.effort = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "effort";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromEffort(value);
  };
  getAsEffortValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "effort") && p.hasEffort() ) {
        return p.getEffort();
      }
    }
    return new EffortValue();
  };
  hasBodyMetricValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "body-metric") && p.hasBodyMetric() ) {
        return true;
      }
    }
    return false;
  };
  setBodyMetricValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.bodyMetric = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "body-metric";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromBodyMetric(value);
  };
  getAsBodyMetricValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "body-metric") && p.hasBodyMetric() ) {
        return p.getBodyMetric();
      }
    }
    return new BodyMetricValue();
  };
  hasCircuitValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "circuit") && p.hasCircuit() ) {
        return true;
      }
    }
    return false;
  };
  setCircuitValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.circuit = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "circuit";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromCircuit(value);
  };
  getAsCircuitValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "circuit") && p.hasCircuit() ) {
        return p.getCircuit();
      }
    }
    return new CircuitValue();
  };
  hasContextEntryValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "context-entry") && p.hasContextEntry() ) {
        return true;
      }
    }
    return false;
  };
  setContextEntryValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.contextEntry = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "context-entry";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromContextEntry(value);
  };
  getAsContextEntryValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "context-entry") && p.hasContextEntry() ) {
        return p.getContextEntry();
      }
    }
    return new ContextEntryValue();
  };
  toString () {
    return this.source.substring(this.start, (this.start + this.size) );
  };
  strEquals (value) {
    const vLen = value.length;
    if ( vLen != this.size ) {
      return false;
    }
    let i = 0;
    while (i < vLen) {
      if ( (this.source.charCodeAt((this.start + i) )) == (value.charCodeAt(i )) ) {
      } else {
        return false;
      }
      i = i + 1;
    };
    return true;
  };
  charCodeAt (index) {
    if ( index < 0 ) {
      return -1;
    }
    if ( index >= this.size ) {
      return -1;
    }
    return this.source.charCodeAt((this.start + index) );
  };
  hasInteger (from, to) {
    if ( from < 0 ) {
      return false;
    }
    if ( to < from ) {
      return false;
    }
    if ( to >= this.size ) {
      return false;
    }
    let i = from;
    while (i <= to) {
      const ch = this.charCodeAt(i);
      if ( ch < 48 ) {
        return false;
      }
      if ( ch > 57 ) {
        return false;
      }
      i = i + 1;
    };
    return true;
  };
  parseInteger (from, to) {
    if ( this.hasInteger(from, to) ) {
    } else {
      return -1;
    }
    let value = 0;
    let i = from;
    while (i <= to) {
      const ch = this.charCodeAt(i);
      value = (value * 10) + (ch - 48);
      i = i + 1;
    };
    return value;
  };
  hasDouble (from, to) {
    if ( from < 0 ) {
      return false;
    }
    if ( to < from ) {
      return false;
    }
    if ( to >= this.size ) {
      return false;
    }
    let i = from;
    const first = this.charCodeAt(i);
    if ( (first == 43) || (first == 45) ) {
      i = i + 1;
      if ( i > to ) {
        return false;
      }
    }
    let hasDigit = false;
    let hasDot = false;
    while (i <= to) {
      const ch = this.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        hasDigit = true;
        i = i + 1;
        continue;
      }
      if ( ch == 46 ) {
        if ( hasDot ) {
          return false;
        }
        hasDot = true;
        i = i + 1;
        continue;
      }
      return false;
    };
    return hasDigit;
  };
  parseDouble (from, to) {
    if ( this.hasDouble(from, to) ) {
    } else {
      return 0.0;
    }
    const raw = this.source.substring((this.start + from), ((this.start + to) + 1) );
    const v = isNaN( parseFloat(raw) ) ? undefined : parseFloat(raw);
    if ( typeof(v) != "undefined" ) {
      return v;
    }
    return 0.0;
  };
  peek (offset) {
    let safeOffset = offset;
    if ( safeOffset < 0 ) {
      safeOffset = 0;
    }
    if ( safeOffset > this.size ) {
      safeOffset = this.size;
    }
    return new TokenSlice(this.source, this.start + safeOffset, this.size - safeOffset);
  };
  step (count) {
    return this.peek(count);
  };
  read (count) {
    let safeCount = count;
    if ( safeCount < 0 ) {
      safeCount = 0;
    }
    if ( safeCount > this.size ) {
      safeCount = this.size;
    }
    return new TokenSlice(this.source, this.start, safeCount);
  };
  slice (count) {
    return this.read(count);
  };
  pickSlice (from, length) {
    return new TokenSlice(this.source, this.start + from, length);
  };
  hasToken (token) {
    const tLen = token.length;
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > this.size ) {
      return false;
    }
    const me = (this.read(tLen)).toString();
    return me == token;
  };
  endsWith (token) {
    const tLen = token.length;
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > this.size ) {
      return false;
    }
    const me = (this).toString();
    const meLen = me.length;
    return (me.substring((meLen - tLen), meLen )) == token;
  };
  findTokenPos (token) {
    const tLen = token.length;
    if ( tLen == 0 ) {
      return 0;
    }
    if ( tLen > this.size ) {
      return -1;
    }
    const text = (this).toString();
    const maxStart = this.size - tLen;
    let i = 0;
    while (i <= maxStart) {
      if ( (text.substring(i, (i + tLen) )) == token ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  splitWithToken (token) {
    const pos = this.findTokenPos(token);
    if ( pos < 0 ) {
      return new TokenSlice(this.source, this.start, this.size);
    }
    return new TokenSlice(this.source, this.start, pos);
  };
  sliceToToken (token) {
    const pos = this.findTokenPos(token);
    if ( pos < 0 ) {
      return new TokenSlice(this.source, this.start, this.size);
    }
    const tLen = token.length;
    return new TokenSlice(this.source, this.start, pos + tLen);
  };
}
TokenSlice.fromText = function(text) {
  return new TokenSlice(text, 0, text.length);
};
module.exports.DateTimeValue = DateTimeValue;
module.exports.DistanceValue = DistanceValue;
module.exports.PercentageValue = PercentageValue;
module.exports.RecoveryTimeValue = RecoveryTimeValue;
module.exports.WeightValue = WeightValue;
module.exports.NumRangeValue = NumRangeValue;
module.exports.PercentageRangeValue = PercentageRangeValue;
module.exports.RepeatBlockValue = RepeatBlockValue;
module.exports.SetRepRangeLoadValue = SetRepRangeLoadValue;
module.exports.ZoneValue = ZoneValue;
module.exports.PositiveIntegerValue = PositiveIntegerValue;
module.exports.DetailsLevelValue = DetailsLevelValue;
module.exports.RecoveryValue = RecoveryValue;
module.exports.TimeValueValue = TimeValueValue;
module.exports.LeftRightValue = LeftRightValue;
module.exports.FeelingValue = FeelingValue;
module.exports.EffortValue = EffortValue;
module.exports.BodyMetricValue = BodyMetricValue;
module.exports.CircuitValue = CircuitValue;
module.exports.ContextEntryValue = ContextEntryValue;
module.exports.SliceParsedValue = SliceParsedValue;
module.exports.TokenSlice = TokenSlice;
