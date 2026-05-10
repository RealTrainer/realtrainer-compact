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
    const v_1 = isNaN( parseInt(dict ["setsMin"]) ) ? undefined : parseInt(dict ["setsMin"]) 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.setsMin = v_1;
    }
    const v_2 = isNaN( parseInt(dict ["setsMax"]) ) ? undefined : parseInt(dict ["setsMax"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.setsMax = v_2;
    }
    const v_3 = isNaN( parseInt(dict ["repsMin"]) ) ? undefined : parseInt(dict ["repsMin"]) 
    ;
    if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
      obj.repsMin = v_3;
    }
    const v_4 = isNaN( parseInt(dict ["repsMax"]) ) ? undefined : parseInt(dict ["repsMax"]) 
    ;
    if ( (typeof(v_4) !== "undefined" && v_4 != null )  ) {
      obj.repsMax = v_4;
    }
    const v_5 = (typeof (dict ["mode"]) != "string" ) ? undefined : dict ["mode"] 
    ;
    if ( (typeof(v_5) !== "undefined" && v_5 != null )  ) {
      obj.mode = v_5;
    }
    const v_6 = isNaN( parseInt(dict ["load"]) ) ? undefined : parseInt(dict ["load"]) 
    ;
    if ( (typeof(v_6) !== "undefined" && v_6 != null )  ) {
      obj.load = v_6;
    }
    const v_7 = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
    ;
    if ( (typeof(v_7) !== "undefined" && v_7 != null )  ) {
      obj.unit = v_7;
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
    this.kind = "";     /** note: unused */
    this.score = 0;
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
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
    const v_1 = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.kind = v_1;
    }
    const v_2 = isNaN( parseInt(dict ["score"]) ) ? undefined : parseInt(dict ["score"]) 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.score = v_2;
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
    this.kind = "";     /** note: unused */
    this.content = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      res["kind"] = this.kind;
      res["content"] = this.content;
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
    const v_1 = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.kind = v_1;
    }
    const v_2 = (typeof (dict ["content"]) != "string" ) ? undefined : dict ["content"] 
    ;
    if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
      obj.content = v_2;
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
    this.tag = "";
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
class TokenDetector  {
  constructor(noMatchSlice) {
    this.detectedTag = "unknown";
    this.cachedNoMatch = new TokenSlice("", 0, 0);
    this.cachedNoMatch = noMatchSlice;
  }
  getNoMatchSlice () {
    return this.cachedNoMatch;
  };
  noMatch () {
    return this.getNoMatchSlice();
  };
  detect (slice) {
    return this.noMatch();
  };
}
TokenDetector.createNoMatchSlice = function() {
  const s = new TokenSlice("", 0, 0);
  s.tag = "";
  return s;
};
TokenDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new TokenDetector(s);
};
class KeywordDetector  extends TokenDetector {
  constructor(token, noMatchSlice) {
    super()
    this.keyword = "";
    this.cachedNoMatch = noMatchSlice;
    this.keyword = token;
    this.detectedTag = "keyword";
  }
  detect (slice) {
    const kLen = this.keyword.length;
    if ( kLen == 0 ) {
      return this.noMatch();
    }
    const size = (slice).length();
    if ( size < kLen ) {
      return this.noMatch();
    }
    const head = (slice.read(kLen)).toString();
    if ( head == this.keyword ) {
      const matched = slice.read(kLen);
      matched.tag = this.detectedTag;
      return matched;
    }
    return this.noMatch();
  };
}
KeywordDetector.create = function(token) {
  const s = TokenDetector.createNoMatchSlice();
  return new KeywordDetector(token, s);
};
class DateTimeDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.sliceMap = {};
    this.sliceHitMap = {};
    this.parseDateShapeCalls = 0;
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "datetime";
  }
  parseToMap (slice) {
    if ( ( typeof(this.sliceMap[slice] ) != "undefined" && this.sliceMap.hasOwnProperty(slice) ) ) {
      const cachedHit = ( this.sliceHitMap.hasOwnProperty(slice) ? this.sliceHitMap[slice] : undefined );
      if ( (typeof(cachedHit) !== "undefined" && cachedHit != null )  ) {
        const hit = cachedHit;
        const cachedVal = ( this.sliceMap.hasOwnProperty(slice) ? this.sliceMap[slice] : undefined );
        if ( (typeof(cachedVal) !== "undefined" && cachedVal != null )  ) {
          const payload = SliceParsedValue.fromDateTime((cachedVal));
          hit.setSliceValue(payload);
          slice.setSliceValue(payload);
        }
        return hit;
      }
      return this.noMatch();
    }
    const newSlice = this.parseDateShape(slice);
    return newSlice;
  };
  getParseDateShapeCalls () {
    return this.parseDateShapeCalls;
  };
  hasCachedValue (slice) {
    return ( typeof(this.sliceMap[slice] ) != "undefined" && this.sliceMap.hasOwnProperty(slice) );
  };
  parseDateShape (slice) {
    this.parseDateShapeCalls = this.parseDateShapeCalls + 1;
    if ( slice.hasInteger(0, 3) ) {
    } else {
      return this.noMatch();
    }
    if ( slice.charCodeAt(4) != 45 ) {
      return this.noMatch();
    }
    let plen = 0;
    const out = new DateTimeValue();
    out.year = slice.parseInteger(0, 3);
    if ( slice.hasInteger(5, 6) ) {
      out.month = slice.parseInteger(5, 6);
    } else {
      return this.noMatch();
    }
    if ( slice.charCodeAt(7) != 45 ) {
      return this.noMatch();
    }
    if ( slice.hasInteger(8, 9) ) {
      out.day = slice.parseInteger(8, 9);
    } else {
      return this.noMatch();
    }
    if ( out.month < 1 ) {
      return this.noMatch();
    }
    if ( out.month > 12 ) {
      return this.noMatch();
    }
    if ( out.day < 1 ) {
      return this.noMatch();
    }
    if ( out.day > 31 ) {
      return this.noMatch();
    }
    plen = 10;
    if ( slice.charCodeAt(10) == 84 ) {
      if ( slice.hasInteger(11, 12) ) {
        out.hour = slice.parseInteger(11, 12);
      } else {
        return this.noMatch();
      }
      if ( slice.charCodeAt(13) != 58 ) {
        return this.noMatch();
      }
      if ( slice.hasInteger(14, 15) ) {
        out.minute = slice.parseInteger(14, 15);
      } else {
        return this.noMatch();
      }
      if ( out.hour < 0 ) {
        return this.noMatch();
      }
      if ( out.hour > 23 ) {
        return this.noMatch();
      }
      if ( out.minute < 0 ) {
        return this.noMatch();
      }
      if ( out.minute > 59 ) {
        return this.noMatch();
      }
      let idx = 16;
      if ( ((slice).length() >= 19) && (slice.charCodeAt(16) == 58) ) {
        out.second = slice.parseInteger(17, 18);
        if ( out.second < 0 ) {
          return this.noMatch();
        }
        if ( out.second > 59 ) {
          return this.noMatch();
        }
        idx = 19;
      }
      if ( idx < (slice).length() ) {
        const tzCh = slice.charCodeAt(idx);
        if ( tzCh == 90 ) {
          out.timezone = "Z";
          idx = idx + 1;
        }
        if ( (tzCh == 43) || (tzCh == 45) ) {
          if ( (idx + 6) <= (slice).length() ) {
            if ( slice.hasInteger((idx + 1), (idx + 2)) ) {
            } else {
              return this.noMatch();
            }
            if ( slice.charCodeAt((idx + 3)) != 58 ) {
              return this.noMatch();
            }
            if ( slice.hasInteger((idx + 4), (idx + 5)) ) {
            } else {
              return this.noMatch();
            }
            const tzHour = slice.parseInteger((idx + 1), (idx + 2));
            const tzMin = slice.parseInteger((idx + 4), (idx + 5));
            if ( tzHour < 0 ) {
              return this.noMatch();
            }
            if ( tzHour > 23 ) {
              return this.noMatch();
            }
            if ( tzMin < 0 ) {
              return this.noMatch();
            }
            if ( tzMin > 59 ) {
              return this.noMatch();
            }
            const tzSlice = slice.read((idx + 6));
            out.timezone = (tzSlice.peek(idx)).toString();
            idx = idx + 6;
          }
        }
      }
      plen = idx;
    }
    const newSlice = slice.read(plen);
    newSlice.tag = this.detectedTag;
    const payload2 = SliceParsedValue.fromDateTime(out);
    newSlice.setSliceValue(payload2);
    slice.setSliceValue(payload2);
    this.sliceMap[newSlice] = out;
    this.sliceMap[slice] = out;
    this.sliceHitMap[newSlice] = newSlice;
    this.sliceHitMap[slice] = newSlice;
    return newSlice;
  };
  detect (slice) {
    return this.parseToMap(slice);
  };
}
DateTimeDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new DateTimeDetector(s);
};
class SpaceDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "space";
  }
  isWhitespace (ch) {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  };
  detect (slice) {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < (slice).length()) {
      const ch = slice.charCodeAt(i);
      if ( this.isWhitespace(ch) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 0 ) {
      return this.noMatch();
    }
    const out = slice.read(i);
    out.tag = this.detectedTag;
    return out;
  };
}
SpaceDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new SpaceDetector(s);
};
class NewlineDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "newline";
  }
  isNewline (ch) {
    if ( ch == 10 ) {
      return true;
    }
    if ( ch == 13 ) {
      return true;
    }
    return false;
  };
  detect (slice) {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < (slice).length()) {
      const ch = slice.charCodeAt(i);
      if ( this.isNewline(ch) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 0 ) {
      return this.noMatch();
    }
    const out = slice.read(i);
    out.tag = this.detectedTag;
    return out;
  };
}
NewlineDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new NewlineDetector(s);
};
class PositiveIntegerDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "positive-integer";
  }
  isDigit (ch) {
    if ( ch < 48 ) {
      return false;
    }
    if ( ch > 57 ) {
      return false;
    }
    return true;
  };
  detect (slice) {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    let i = 0;
    let hasNonZero = false;
    while (i < (slice).length()) {
      const ch = slice.charCodeAt(i);
      if ( this.isDigit(ch) ) {
        if ( ch != 48 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 0 ) {
      return this.noMatch();
    }
    if ( hasNonZero ) {
    } else {
      return this.noMatch();
    }
    const out = slice.read(i);
    out.tag = this.detectedTag;
    const v = new PositiveIntegerValue();
    v.value = out.parseInteger(0, (i - 1));
    const payload = SliceParsedValue.fromPositiveInteger(v);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
PositiveIntegerDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new PositiveIntegerDetector(s);
};
class DecimalNumberDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "decimal-number";
  }
  isDigit (ch) {
    if ( ch < 48 ) {
      return false;
    }
    if ( ch > 57 ) {
      return false;
    }
    return true;
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len == 0 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < __len) {
      const ch = slice.charCodeAt(i);
      if ( this.isDigit(ch) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 0 ) {
      return this.noMatch();
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(i) != 46 ) {
      return this.noMatch();
    }
    let j = i + 1;
    while (j < __len) {
      const ch2 = slice.charCodeAt(j);
      if ( this.isDigit(ch2) ) {
        j = j + 1;
      } else {
        break;
      }
    };
    if ( j == (i + 1) ) {
      return this.noMatch();
    }
    const out = slice.read(j);
    out.tag = this.detectedTag;
    return out;
  };
}
DecimalNumberDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new DecimalNumberDetector(s);
};
class TimeValueDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "time-value";
  }
  detect (slice) {
    if ( (slice).length() < 5 ) {
      return this.noMatch();
    }
    if ( slice.hasInteger(0, 1) ) {
    } else {
      return this.noMatch();
    }
    if ( slice.charCodeAt(2) != 58 ) {
      return this.noMatch();
    }
    if ( slice.hasInteger(3, 4) ) {
    } else {
      return this.noMatch();
    }
    const hour = slice.parseInteger(0, 1);
    const minute = slice.parseInteger(3, 4);
    if ( hour < 0 ) {
      return this.noMatch();
    }
    if ( hour > 23 ) {
      return this.noMatch();
    }
    if ( minute < 0 ) {
      return this.noMatch();
    }
    if ( minute > 59 ) {
      return this.noMatch();
    }
    const out = slice.read(5);
    out.tag = this.detectedTag;
    const tv = new TimeValueValue();
    tv.minutes = hour;
    tv.seconds = minute;
    const payload = SliceParsedValue.fromTimeValue(tv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
TimeValueDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new TimeValueDetector(s);
};
class Parser  {
  constructor(source, detectors) {
    this.source = "";
    this.detectors = [];
    this.parserdResults = [];
    this.source = source;
    this.detectors = detectors;
    this.slice = new TokenSlice(source, 0, source.length);
    this.parserdResults.length = 0;
  }
  start () {
    let activeSlice = new TokenSlice(this.source, 0, this.source.length);
    while ((activeSlice).length() > 0) {
      let advance = 0;
      let i = 0;
      while (i < (this.detectors.length)) {
        const detector = this.detectors[i];
        const result = detector.detect(activeSlice);
        if ( result.isEmpty() ) {
        } else {
          if ( result.tag == "space" ) {
          } else {
            if ( result.tag == "newline" ) {
            } else {
              this.parserdResults.push(result);
            }
          }
          advance = (result).length();
          break;
        }
        i = i + 1;
      };
      if ( advance == 0 ) {
        break;
      } else {
        activeSlice = activeSlice.peek(advance);
      }
    };
  };
  getResults () {
    return this.parserdResults;
  };
  getCount () {
    return this.parserdResults.length;
  };
}
class DistanceDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "distance";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    let valuePart = slice;
    valuePart = slice.splitWithToken("m");
    const valueLen = (valuePart).length();
    if ( valueLen <= 0 ) {
      return this.noMatch();
    }
    if ( (valueLen + 1) > __len ) {
      return this.noMatch();
    }
    if ( valuePart.hasInteger(0, (valueLen - 1)) ) {
    } else {
      return this.noMatch();
    }
    const parsed = valuePart.parseInteger(0, (valueLen - 1));
    if ( parsed <= 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(valueLen) != 109 ) {
      return this.noMatch();
    }
    const out = slice.read((valueLen + 1));
    out.tag = this.detectedTag;
    const dv = new DistanceValue();
    dv.value = parsed;
    dv.unit = "m";
    const payload = SliceParsedValue.fromDistance(dv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
DistanceDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new DistanceDetector(s);
};
class RecoveryTimeDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "recovery-time";
  }
  isDigit (ch) {
    if ( ch < 48 ) {
      return false;
    }
    if ( ch > 57 ) {
      return false;
    }
    return true;
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 47 ) {
      return this.noMatch();
    }
    let i = 1;
    let hasNonZero = false;
    while (i < __len) {
      const ch = slice.charCodeAt(i);
      if ( this.isDigit(ch) ) {
        if ( ch != 48 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 1 ) {
      return this.noMatch();
    }
    if ( hasNonZero ) {
    } else {
      return this.noMatch();
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    const unit = slice.charCodeAt(i);
    if ( (unit == 115) || (unit == 109) ) {
    } else {
      return this.noMatch();
    }
    const out = slice.read((i + 1));
    out.tag = this.detectedTag;
    const slashToken = slice.read(1);
    slashToken.tag = "keyword";
    out.addChild(slashToken);
    const valueToken = (slice.peek(1)).read((i - 1));
    valueToken.tag = "positive-integer";
    const piv = new PositiveIntegerValue();
    piv.value = valueToken.parseInteger(0, ((valueToken).length() - 1));
    valueToken.setSliceValue(SliceParsedValue.fromPositiveInteger(piv));
    out.addChild(valueToken);
    const unitToken = (slice.peek(i)).read(1);
    unitToken.tag = "keyword";
    out.addChild(unitToken);
    const rv = new RecoveryTimeValue();
    rv.value = ((slice.read(i)).peek(1)).parseInteger(0, (i - 2));
    if ( unit == 115 ) {
      rv.unit = "s";
    } else {
      rv.unit = "m";
    }
    const payload = SliceParsedValue.fromRecoveryTime(rv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
RecoveryTimeDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new RecoveryTimeDetector(s);
};
class AMTimeValueDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "am-time";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < __len) {
      const ch = slice.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i <= 0 ) {
      return this.noMatch();
    }
    if ( (i + 1) >= __len ) {
      return this.noMatch();
    }
    const valuePart = slice.read(i);
    if ( valuePart.hasInteger(0, (i - 1)) ) {
    } else {
      return this.noMatch();
    }
    const hour = valuePart.parseInteger(0, (i - 1));
    if ( (hour < 1) || (hour > 12) ) {
      return this.noMatch();
    }
    const c1 = slice.charCodeAt(i);
    const c2 = slice.charCodeAt((i + 1));
    if ( ((c1 == 65) && (c2 == 77)) || ((c1 == 80) && (c2 == 77)) ) {
      const out = slice.read((i + 2));
      out.tag = this.detectedTag;
      return out;
    }
    return this.noMatch();
  };
}
AMTimeValueDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new AMTimeValueDetector(s);
};
class PercentageDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "percentage";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    const valuePart = slice.splitWithToken("%");
    const vLen = (valuePart).length();
    if ( vLen <= 0 ) {
      return this.noMatch();
    }
    if ( (vLen + 1) > __len ) {
      return this.noMatch();
    }
    if ( valuePart.hasInteger(0, (vLen - 1)) ) {
    } else {
      return this.noMatch();
    }
    const v = valuePart.parseInteger(0, (vLen - 1));
    if ( v <= 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(vLen) != 37 ) {
      return this.noMatch();
    }
    const out = slice.read((vLen + 1));
    out.tag = this.detectedTag;
    const pv = new PercentageValue();
    pv.value = v;
    const payload = SliceParsedValue.fromPercentage(pv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
PercentageDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new PercentageDetector(s);
};
class WeightDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "weight";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    let detectors = [];
    detectors.push(PositiveIntegerDetector.create());
    detectors.push(KeywordDetector.create("kg"));
    const p = new Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts = p.getResults();
    const first = parts[0];
    const second = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("kg") ) {
      return this.noMatch();
    }
    const outLen = (first).length() + (second).length();
    const out = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    const firstLen = (first).length();
    const wv = new WeightValue();
    wv.value = first.parseInteger(0, (firstLen - 1));
    wv.unit = "kg";
    const payload = SliceParsedValue.fromWeight(wv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
WeightDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new WeightDetector(s);
};
class NumRangeBlockDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "num-range";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    const dashPos = slice.findTokenPos("-");
    if ( dashPos <= 0 ) {
      return this.noMatch();
    }
    const left = slice.read(dashPos);
    if ( left.hasInteger(0, ((left).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    const rightAll = slice.peek((dashPos + 1));
    if ( (rightAll).length() <= 0 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < (rightAll).length()) {
      const ch = rightAll.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 0 ) {
      return this.noMatch();
    }
    const right = rightAll.read(i);
    if ( right.hasInteger(0, (i - 1)) ) {
    } else {
      return this.noMatch();
    }
    const lval = left.parseInteger(0, ((left).length() - 1));
    const rval = right.parseInteger(0, (i - 1));
    if ( lval <= 0 ) {
      return this.noMatch();
    }
    if ( rval <= 0 ) {
      return this.noMatch();
    }
    const out = slice.read(((dashPos + 1) + i));
    out.tag = this.detectedTag;
    const nv = new NumRangeValue();
    nv.minValue = lval;
    nv.maxValue = rval;
    const payload = SliceParsedValue.fromNumRange(nv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
NumRangeBlockDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new NumRangeBlockDetector(s);
};
class RecoveryDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "recovery";
  }
  isAlphaNum (ch) {
    if ( (ch >= 48) && (ch <= 57) ) {
      return true;
    }
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  };
  createChildDetectors () {
    let ds = [];
    ds.push(DistanceDetector.create());
    ds.push(RecoveryTimeDetector.create());
    ds.push(TimeValueDetector.create());
    ds.push(AMTimeValueDetector.create());
    ds.push(PercentageDetector.create());
    ds.push(WeightDetector.create());
    ds.push(NumRangeBlockDetector.create());
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("min"));
    ds.push(KeywordDetector.create("sec"));
    ds.push(KeywordDetector.create("s"));
    ds.push(KeywordDetector.create("m"));
    return ds;
  };
  detect (slice) {
    const key = "Recovery";
    const keyLen = key.length;
    const __len = (slice).length();
    if ( __len <= keyLen ) {
      return this.noMatch();
    }
    const head = slice.read(keyLen);
    if ( head.strEquals(key) ) {
    } else {
      return this.noMatch();
    }
    const next = slice.charCodeAt(keyLen);
    if ( this.isAlphaNum(next) ) {
      return this.noMatch();
    }
    let lineEnd = keyLen;
    while (lineEnd < __len) {
      const ch = slice.charCodeAt(lineEnd);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      lineEnd = lineEnd + 1;
    };
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const labelToken = slice.read(keyLen);
    labelToken.tag = "keyword";
    out.addChild(labelToken);
    let restStart = keyLen;
    while (restStart < lineEnd) {
      const ch2 = slice.charCodeAt(restStart);
      if ( (ch2 == 32) || (ch2 == 9) ) {
        restStart = restStart + 1;
      } else {
        break;
      }
    };
    if ( restStart < lineEnd ) {
      const rest = (slice.peek(restStart)).read((lineEnd - restStart));
      const p = new Parser((rest).toString(), this.createChildDetectors());
      (p).start();
      const children = p.getResults();
      for ( let i = 0; i < children.length; i++) {
        var ch_1 = children[i];
        out.addChild(ch_1);
      };
    }
    const rv = new RecoveryValue();
    rv.label = "Recovery";
    const payload = SliceParsedValue.fromRecovery(rv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
RecoveryDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new RecoveryDetector(s);
};
class RepeatBlockDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "repeat-block";
  }
  isDigit (ch) {
    if ( ch < 48 ) {
      return false;
    }
    if ( ch > 57 ) {
      return false;
    }
    return true;
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    let i = 0;
    let hasNonZero = false;
    while (i < __len) {
      const ch = slice.charCodeAt(i);
      if ( this.isDigit(ch) ) {
        if ( ch != 48 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 0 ) {
      return this.noMatch();
    }
    if ( hasNonZero ) {
    } else {
      return this.noMatch();
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(i) != 120 ) {
      return this.noMatch();
    }
    const out = slice.read((i + 1));
    out.tag = this.detectedTag;
    const countSlice = slice.read(i);
    const rv = new RepeatBlockValue();
    rv.count = countSlice.parseInteger(0, (i - 1));
    const payload = SliceParsedValue.fromRepeatBlock(rv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
RepeatBlockDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new RepeatBlockDetector(s);
};
class SetRepRangeLoadDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "set-rep-range-load";
  }
  isDigit (ch) {
    return (ch >= 48) && (ch <= 57);
  };
  isAlphaNum (ch) {
    if ( (ch >= 48) && (ch <= 57) ) {
      return true;
    }
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 9 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < __len) {
      if ( this.isDigit(slice.charCodeAt(i)) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    const setsLeftEnd = i;
    if ( setsLeftEnd <= 0 ) {
      return this.noMatch();
    }
    if ( (i >= __len) || (slice.charCodeAt(i) != 45) ) {
      return this.noMatch();
    }
    i = i + 1;
    const setsRightStart = i;
    while (i < __len) {
      if ( this.isDigit(slice.charCodeAt(i)) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    const setsRightEnd = i;
    if ( setsRightEnd <= setsRightStart ) {
      return this.noMatch();
    }
    if ( (i >= __len) || (slice.charCodeAt(i) != 120) ) {
      return this.noMatch();
    }
    i = i + 1;
    const repsLeftStart = i;
    while (i < __len) {
      if ( this.isDigit(slice.charCodeAt(i)) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    const repsLeftEnd = i;
    if ( repsLeftEnd <= repsLeftStart ) {
      return this.noMatch();
    }
    if ( (i >= __len) || (slice.charCodeAt(i) != 45) ) {
      return this.noMatch();
    }
    i = i + 1;
    const repsRightStart = i;
    while (i < __len) {
      if ( this.isDigit(slice.charCodeAt(i)) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    const repsRightEnd = i;
    if ( repsRightEnd <= repsRightStart ) {
      return this.noMatch();
    }
    const setsLeft = slice.read(setsLeftEnd);
    const setsRight = (slice.peek(setsRightStart)).read((setsRightEnd - setsRightStart));
    const repsLeft = (slice.peek(repsLeftStart)).read((repsLeftEnd - repsLeftStart));
    const repsRight = (slice.peek(repsRightStart)).read((repsRightEnd - repsRightStart));
    if ( setsLeft.hasInteger(0, ((setsLeft).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    if ( setsRight.hasInteger(0, ((setsRight).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    if ( repsLeft.hasInteger(0, ((repsLeft).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    if ( repsRight.hasInteger(0, ((repsRight).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    if ( setsLeft.parseInteger(0, ((setsLeft).length() - 1)) <= 0 ) {
      return this.noMatch();
    }
    if ( setsRight.parseInteger(0, ((setsRight).length() - 1)) <= 0 ) {
      return this.noMatch();
    }
    if ( repsLeft.parseInteger(0, ((repsLeft).length() - 1)) <= 0 ) {
      return this.noMatch();
    }
    if ( repsRight.parseInteger(0, ((repsRight).length() - 1)) <= 0 ) {
      return this.noMatch();
    }
    const setsMinVal = setsLeft.parseInteger(0, ((setsLeft).length() - 1));
    const setsMaxVal = setsRight.parseInteger(0, ((setsRight).length() - 1));
    const repsMinVal = repsLeft.parseInteger(0, ((repsLeft).length() - 1));
    const repsMaxVal = repsRight.parseInteger(0, ((repsRight).length() - 1));
    if ( i >= __len ) {
      return this.noMatch();
    }
    const mode = slice.charCodeAt(i);
    let modeText = "";
    let loadVal = 0;
    let unitText = "";
    if ( mode == 64 ) {
      modeText = "bw";
      unitText = "bw";
      i = i + 1;
      if ( (i + 1) >= __len ) {
        return this.noMatch();
      }
      if ( slice.charCodeAt(i) != 98 ) {
        return this.noMatch();
      }
      if ( slice.charCodeAt((i + 1)) != 119 ) {
        return this.noMatch();
      }
      i = i + 2;
    } else {
      if ( mode == 120 ) {
        modeText = "kg";
        i = i + 1;
        const loadStart = i;
        while (i < __len) {
          if ( this.isDigit(slice.charCodeAt(i)) ) {
            i = i + 1;
          } else {
            break;
          }
        };
        if ( i <= loadStart ) {
          return this.noMatch();
        }
        const loadDigits = (slice.peek(loadStart)).read((i - loadStart));
        if ( loadDigits.hasInteger(0, ((loadDigits).length() - 1)) ) {
        } else {
          return this.noMatch();
        }
        loadVal = loadDigits.parseInteger(0, ((loadDigits).length() - 1));
        if ( loadVal <= 0 ) {
          return this.noMatch();
        }
        if ( (i + 1) >= __len ) {
          return this.noMatch();
        }
        if ( slice.charCodeAt(i) != 107 ) {
          return this.noMatch();
        }
        if ( slice.charCodeAt((i + 1)) != 103 ) {
          return this.noMatch();
        }
        unitText = "kg";
        i = i + 2;
      } else {
        return this.noMatch();
      }
    }
    if ( i < __len ) {
      if ( this.isAlphaNum(slice.charCodeAt(i)) ) {
        return this.noMatch();
      }
    }
    const out = slice.read(i);
    out.tag = this.detectedTag;
    const sv = new SetRepRangeLoadValue();
    sv.setsMin = setsMinVal;
    sv.setsMax = setsMaxVal;
    sv.repsMin = repsMinVal;
    sv.repsMax = repsMaxVal;
    sv.mode = modeText;
    sv.load = loadVal;
    sv.unit = unitText;
    const payload = SliceParsedValue.fromSetRepRangeLoad(sv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
SetRepRangeLoadDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new SetRepRangeLoadDetector(s);
};
class SpeedDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "speed";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 7 ) {
      return this.noMatch();
    }
    const slashPos = slice.findTokenPos("/");
    if ( slashPos <= 0 ) {
      return this.noMatch();
    }
    const left = slice.read(slashPos);
    const colonPos = left.findTokenPos(":");
    if ( colonPos <= 0 ) {
      return this.noMatch();
    }
    if ( (colonPos + 3) != (left).length() ) {
      return this.noMatch();
    }
    if ( false == left.hasInteger(0, (colonPos - 1)) ) {
      return this.noMatch();
    }
    if ( false == left.hasInteger((colonPos + 1), (colonPos + 2)) ) {
      return this.noMatch();
    }
    const sec = left.parseInteger((colonPos + 1), (colonPos + 2));
    if ( (sec < 0) || (sec > 59) ) {
      return this.noMatch();
    }
    const rightStart = slice.peek((slashPos + 1));
    const dist = (DistanceDetector.create()).detect(rightStart);
    if ( dist.isEmpty() ) {
      return this.noMatch();
    }
    if ( false == (dist.tag == "distance") ) {
      return this.noMatch();
    }
    const first = left;
    first.tag = "time-value";
    const tv = new TimeValueValue();
    tv.minutes = left.parseInteger(0, (colonPos - 1));
    tv.seconds = sec;
    first.setSliceValue(SliceParsedValue.fromTimeValue(tv));
    const second = (slice.peek(slashPos)).read(1);
    second.tag = "keyword";
    const third = dist;
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("/") ) {
      return this.noMatch();
    }
    if ( false == (third.tag == "distance") ) {
      return this.noMatch();
    }
    const outLen = ((first).length() + (second).length()) + (third).length();
    const out = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    out.addChild(third);
    return out;
  };
}
SpeedDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new SpeedDetector(s);
};
class ZoneDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "zone";
  }
  isDigit (ch) {
    return (ch >= 48) && (ch <= 57);
  };
  isAlphaNum (ch) {
    if ( (ch >= 48) && (ch <= 57) ) {
      return true;
    }
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  };
  detect (slice) {
    if ( slice.hasToken("Zone") ) {
    } else {
      return this.noMatch();
    }
    const __len = (slice).length();
    if ( __len <= 4 ) {
      return this.noMatch();
    }
    let i = 4;
    if ( (i < __len) && (slice.charCodeAt(i) == 32) ) {
      i = i + 1;
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    const startDigits = i;
    while (i < __len) {
      const ch = slice.charCodeAt(i);
      if ( this.isDigit(ch) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == startDigits ) {
      return this.noMatch();
    }
    const zoneDigits = (slice.peek(startDigits)).read((i - startDigits));
    if ( zoneDigits.hasInteger(0, ((zoneDigits).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    const zoneNum = zoneDigits.parseInteger(0, ((zoneDigits).length() - 1));
    if ( (zoneNum < 1) || (zoneNum > 5) ) {
      return this.noMatch();
    }
    if ( i < __len ) {
      const next = slice.charCodeAt(i);
      if ( this.isAlphaNum(next) ) {
        return this.noMatch();
      }
    }
    const out = slice.read(i);
    out.tag = this.detectedTag;
    const zv = new ZoneValue();
    zv.zone = zoneNum;
    const payload = SliceParsedValue.fromZone(zv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
ZoneDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new ZoneDetector(s);
};
class LeftRightDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "left-right";
  }
  createChildDetectors () {
    let ds = [];
    ds.push(SetRepRangeLoadDetector.create());
    ds.push(RepeatBlockDetector.create());
    ds.push(WeightDetector.create());
    ds.push(DistanceDetector.create());
    ds.push(SpeedDetector.create());
    ds.push(ZoneDetector.create());
    ds.push(DecimalNumberDetector.create());
    ds.push(PositiveIntegerDetector.create());
    return ds;
  };
  detectWithSide (slice, side) {
    const key = side + " ";
    if ( slice.hasToken(key) ) {
    } else {
      return this.noMatch();
    }
    const keyLen = key.length;
    const __len = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    let lineEnd = keyLen;
    while (lineEnd < __len) {
      const ch = slice.charCodeAt(lineEnd);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      lineEnd = lineEnd + 1;
    };
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const sideToken = slice.read((side.length));
    sideToken.tag = "keyword";
    out.addChild(sideToken);
    let restStart = keyLen;
    while (restStart < lineEnd) {
      const ch2 = slice.charCodeAt(restStart);
      if ( (ch2 == 32) || (ch2 == 9) ) {
        restStart = restStart + 1;
      } else {
        break;
      }
    };
    if ( restStart < lineEnd ) {
      const payload = (slice.peek(restStart)).read((lineEnd - restStart));
      const p = new Parser((payload).toString(), this.createChildDetectors());
      (p).start();
      const children = p.getResults();
      for ( let i = 0; i < children.length; i++) {
        var ch3 = children[i];
        out.addChild(ch3);
      };
    }
    const lv = new LeftRightValue();
    lv.side = side;
    const parsed = SliceParsedValue.fromLeftRight(lv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
  detect (slice) {
    const left = this.detectWithSide(slice, "Left");
    if ( left.isEmpty() ) {
    } else {
      return left;
    }
    return this.detectWithSide(slice, "Right");
  };
}
LeftRightDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new LeftRightDetector(s);
};
class FeelingDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "feeling";
  }
  parseKind (slice) {
    if ( slice.hasToken("Feeling ") ) {
      return "feeling";
    }
    if ( slice.hasToken("Feelings ") ) {
      return "feeling";
    }
    if ( slice.hasToken("Pain ") ) {
      return "pain";
    }
    return "";
  };
  prefixLength (slice, kind) {
    if ( kind == "pain" ) {
      return 5;
    }
    if ( slice.hasToken("Feelings ") ) {
      return 9;
    }
    return 8;
  };
  detect (slice) {
    const kind = this.parseKind(slice);
    if ( (kind.length) == 0 ) {
      return this.noMatch();
    }
    const keyLen = this.prefixLength(slice, kind);
    const __len = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    let lineEnd = keyLen;
    while (lineEnd < __len) {
      const ch = slice.charCodeAt(lineEnd);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      lineEnd = lineEnd + 1;
    };
    const valueSlice = (slice.peek(keyLen)).read((lineEnd - keyLen));
    let detectors = [];
    detectors.push(PositiveIntegerDetector.create());
    const p = new Parser((valueSlice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 1 ) {
      return this.noMatch();
    }
    const scoreToken = p.getResults()[0];
    if ( scoreToken.tag == "positive-integer" ) {
    } else {
      return this.noMatch();
    }
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    let labelLen = keyLen - 1;
    if ( labelLen < 1 ) {
      labelLen = 1;
    }
    const label = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    out.addChild(scoreToken);
    const fv = new FeelingValue();
    fv.kind = kind;
    fv.score = scoreToken.parseInteger(0, ((scoreToken).length() - 1));
    const parsed = SliceParsedValue.fromFeeling(fv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
}
FeelingDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new FeelingDetector(s);
};
class BodyMetricDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "body-metric";
  }
  findLineEnd (slice, from) {
    const __len = (slice).length();
    let i = from;
    while (i < __len) {
      const ch = slice.charCodeAt(i);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    };
    return i;
  };
  createMetricSlice (slice, offset, lineEnd) {
    if ( offset >= lineEnd ) {
      return slice.read(0);
    }
    return (slice.peek(offset)).read((lineEnd - offset));
  };
  parseDoublePrefix (metricSlice) {
    const __len = (metricSlice).length();
    let i = 0;
    while (i < __len) {
      const ch = metricSlice.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        i = i + 1;
        continue;
      }
      if ( ch == 46 ) {
        i = i + 1;
        continue;
      }
      break;
    };
    if ( i == 0 ) {
      return -1.0;
    }
    if ( metricSlice.hasDouble(0, (i - 1)) ) {
      return metricSlice.parseDouble(0, (i - 1));
    }
    return -1.0;
  };
  parseIntegerPrefix (metricSlice) {
    const __len = (metricSlice).length();
    let i = 0;
    while (i < __len) {
      const ch = metricSlice.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 0 ) {
      return -1;
    }
    if ( metricSlice.hasInteger(0, (i - 1)) ) {
      return metricSlice.parseInteger(0, (i - 1));
    }
    return -1;
  };
  setCommon (out, source, value) {
    const parsed = SliceParsedValue.fromBodyMetric(value);
    out.setSliceValue(parsed);
    source.setSliceValue(parsed);
  };
  detectWeight (slice) {
    const prefix = "Weight ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const lineEnd = this.findLineEnd(slice, (prefix.length));
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label = slice.read(6);
    label.tag = "keyword";
    out.addChild(label);
    const metric = this.createMetricSlice(slice, (prefix.length), lineEnd);
    const value = this.parseDoublePrefix(metric);
    if ( value <= 0.0 ) {
      return this.noMatch();
    }
    const mv = new BodyMetricValue();
    mv.metric = "weight";
    mv.primaryValue = value;
    mv.unit = "kg";
    this.setCommon(out, slice, mv);
    return out;
  };
  detectBodyFat (slice) {
    const prefix = "BodyFat ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const lineEnd = this.findLineEnd(slice, (prefix.length));
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label = slice.read(7);
    label.tag = "keyword";
    out.addChild(label);
    const metric = this.createMetricSlice(slice, (prefix.length), lineEnd);
    const value = this.parseDoublePrefix(metric);
    if ( value < 0.0 ) {
      return this.noMatch();
    }
    const mv = new BodyMetricValue();
    mv.metric = "body-fat";
    mv.primaryValue = value;
    mv.unit = "%";
    this.setCommon(out, slice, mv);
    return out;
  };
  detectSleep (slice) {
    const prefix = "Sleep ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const lineEnd = this.findLineEnd(slice, (prefix.length));
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label = slice.read(5);
    label.tag = "keyword";
    out.addChild(label);
    const metric = this.createMetricSlice(slice, (prefix.length), lineEnd);
    const value = this.parseDoublePrefix(metric);
    if ( value <= 0.0 ) {
      return this.noMatch();
    }
    const mv = new BodyMetricValue();
    mv.metric = "sleep";
    mv.primaryValue = value;
    mv.unit = "h";
    this.setCommon(out, slice, mv);
    return out;
  };
  detectRestingHr (slice) {
    const prefix = "Health resting_hr ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const lineEnd = this.findLineEnd(slice, (prefix.length));
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label = slice.read(17);
    label.tag = "keyword";
    out.addChild(label);
    const metric = this.createMetricSlice(slice, (prefix.length), lineEnd);
    const value = this.parseDoublePrefix(metric);
    if ( value <= 0.0 ) {
      return this.noMatch();
    }
    const mv = new BodyMetricValue();
    mv.metric = "resting-hr";
    mv.primaryValue = value;
    mv.unit = "bpm";
    this.setCommon(out, slice, mv);
    return out;
  };
  detectBp (slice) {
    const prefix = "Vitals bp ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const lineEnd = this.findLineEnd(slice, (prefix.length));
    const metric = this.createMetricSlice(slice, (prefix.length), lineEnd);
    const slashPos = metric.findTokenPos("/");
    if ( (slashPos < 1) || (slashPos >= ((metric).length() - 1)) ) {
      return this.noMatch();
    }
    const left = metric.read(slashPos);
    const right = (metric.peek((slashPos + 1))).read((((metric).length() - slashPos) - 1));
    if ( left.hasInteger(0, ((left).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    if ( right.hasInteger(0, ((right).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label = slice.read(9);
    label.tag = "keyword";
    out.addChild(label);
    const mv = new BodyMetricValue();
    mv.metric = "blood-pressure";
    mv.primaryValue = left.parseDouble(0, ((left).length() - 1));
    mv.secondaryValue = right.parseInteger(0, ((right).length() - 1));
    mv.unit = "mmhg";
    this.setCommon(out, slice, mv);
    return out;
  };
  detect (slice) {
    const w = this.detectWeight(slice);
    if ( w.isEmpty() ) {
    } else {
      return w;
    }
    const bf = this.detectBodyFat(slice);
    if ( bf.isEmpty() ) {
    } else {
      return bf;
    }
    const sl = this.detectSleep(slice);
    if ( sl.isEmpty() ) {
    } else {
      return sl;
    }
    const hr = this.detectRestingHr(slice);
    if ( hr.isEmpty() ) {
    } else {
      return hr;
    }
    return this.detectBp(slice);
  };
}
BodyMetricDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new BodyMetricDetector(s);
};
class CircuitDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "circuit";
  }
  detect (slice) {
    const prefix = "Circuit ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const __len = (slice).length();
    const roundsStart = prefix.length;
    let roundsEnd = roundsStart;
    while (roundsEnd < __len) {
      const ch = slice.charCodeAt(roundsEnd);
      if ( (ch >= 48) && (ch <= 57) ) {
        roundsEnd = roundsEnd + 1;
      } else {
        break;
      }
    };
    if ( roundsEnd <= roundsStart ) {
      return this.noMatch();
    }
    const roundsSlice = (slice.peek(roundsStart)).read((roundsEnd - roundsStart));
    if ( roundsSlice.hasInteger(0, ((roundsSlice).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    let lineEnd = roundsEnd;
    while (lineEnd < __len) {
      const ch2 = slice.charCodeAt(lineEnd);
      if ( (ch2 == 10) || (ch2 == 13) ) {
        break;
      }
      lineEnd = lineEnd + 1;
    };
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const circuitToken = slice.read(7);
    circuitToken.tag = "keyword";
    out.addChild(circuitToken);
    const roundsToken = (slice.peek(roundsStart)).read((roundsEnd - roundsStart));
    roundsToken.tag = "positive-integer";
    out.addChild(roundsToken);
    const cv = new CircuitValue();
    cv.rounds = roundsSlice.parseInteger(0, ((roundsSlice).length() - 1));
    if ( (roundsEnd < lineEnd) && (slice.charCodeAt(roundsEnd) == 47) ) {
      let i = roundsEnd + 1;
      while (i < lineEnd) {
        const ch3 = slice.charCodeAt(i);
        if ( (ch3 >= 48) && (ch3 <= 57) ) {
          i = i + 1;
        } else {
          break;
        }
      };
      if ( i > (roundsEnd + 1) ) {
        let j = i;
        while (j < lineEnd) {
          const ch4 = slice.charCodeAt(j);
          if ( (ch4 >= 65) && (ch4 <= 90) ) {
            j = j + 1;
            continue;
          }
          if ( (ch4 >= 97) && (ch4 <= 122) ) {
            j = j + 1;
            continue;
          }
          break;
        };
        if ( j > i ) {
          const restToken = (slice.peek(roundsEnd)).read((j - roundsEnd));
          restToken.tag = "recovery-time";
          out.addChild(restToken);
          const vSlice = (slice.peek((roundsEnd + 1))).read(((i - roundsEnd) - 1));
          cv.restValue = vSlice.parseInteger(0, ((vSlice).length() - 1));
          const unitRaw = ((slice.peek(i)).read((j - i))).toString();
          if ( (unitRaw == "min") || (unitRaw == "m") ) {
            cv.restUnit = "min";
          }
          if ( (unitRaw == "sec") || (unitRaw == "s") ) {
            cv.restUnit = "sec";
          }
        }
      }
    }
    const parsed = SliceParsedValue.fromCircuit(cv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
}
CircuitDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new CircuitDetector(s);
};
class ContextEntryDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "context-entry";
  }
  toTag (kind) {
    if ( kind == "food" ) {
      return "food";
    }
    if ( kind == "drinking" ) {
      return "drinking";
    }
    if ( kind == "expense" ) {
      return "expense";
    }
    if ( kind == "reminder" ) {
      return "reminder";
    }
    if ( kind == "protein" ) {
      return "protein";
    }
    return this.detectedTag;
  };
  detectKind (slice) {
    if ( slice.hasToken("Food ") ) {
      return "food";
    }
    if ( slice.hasToken("Drinking ") ) {
      return "drinking";
    }
    if ( slice.hasToken("Expense ") ) {
      return "expense";
    }
    if ( slice.hasToken("Reminder ") ) {
      return "reminder";
    }
    if ( slice.hasToken("Protein ") ) {
      return "protein";
    }
    return "";
  };
  detect (slice) {
    const kind = this.detectKind(slice);
    if ( (kind.length) == 0 ) {
      return this.noMatch();
    }
    let keyLen = 0;
    if ( kind == "food" ) {
      keyLen = 5;
    }
    if ( kind == "drinking" ) {
      keyLen = 9;
    }
    if ( kind == "expense" ) {
      keyLen = 8;
    }
    if ( kind == "reminder" ) {
      keyLen = 9;
    }
    if ( kind == "protein" ) {
      keyLen = 8;
    }
    if ( keyLen <= 0 ) {
      return this.noMatch();
    }
    const __len = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    let lineEnd = keyLen;
    while (lineEnd < __len) {
      const ch = slice.charCodeAt(lineEnd);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      lineEnd = lineEnd + 1;
    };
    const out = slice.read(lineEnd);
    out.tag = this.toTag(kind);
    const labelLen = keyLen - 1;
    const label = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    if ( keyLen < lineEnd ) {
      const contentSlice = (slice.peek(keyLen)).read((lineEnd - keyLen));
      const content = (contentSlice).toString();
      if ( (content.length) > 0 ) {
        const textToken = contentSlice.read((content.length));
        textToken.tag = "text";
        out.addChild(textToken);
      }
    }
    const cv = new ContextEntryValue();
    cv.kind = kind;
    if ( keyLen < lineEnd ) {
      cv.content = ((slice.peek(keyLen)).read((lineEnd - keyLen))).toString();
    }
    const parsed = SliceParsedValue.fromContextEntry(cv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
}
ContextEntryDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new ContextEntryDetector(s);
};
class DistanceRangeBlockDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "distance-range";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 5 ) {
      return this.noMatch();
    }
    const dashPos = slice.findTokenPos("-");
    if ( dashPos <= 0 ) {
      return this.noMatch();
    }
    const leftA = slice.read(dashPos);
    if ( leftA.hasInteger(0, ((leftA).length() - 1)) ) {
      const rightA = slice.peek((dashPos + 1));
      const rightPartA = rightA.splitWithToken("m");
      const rLenA = (rightPartA).length();
      if ( rLenA > 0 ) {
        if ( rightPartA.hasInteger(0, (rLenA - 1)) ) {
          if ( (rLenA + 1) <= (rightA).length() ) {
            if ( rightA.charCodeAt(rLenA) == 109 ) {
              const lvalA = leftA.parseInteger(0, ((leftA).length() - 1));
              const rvalA = rightPartA.parseInteger(0, (rLenA - 1));
              if ( (lvalA > 0) && (rvalA > 0) ) {
                const outA = slice.read((((dashPos + 1) + rLenA) + 1));
                outA.tag = this.detectedTag;
                return outA;
              }
            }
          }
        }
      }
    }
    const leftPartB = slice.splitWithToken("m-");
    const lLenB = (leftPartB).length();
    if ( lLenB <= 0 ) {
      return this.noMatch();
    }
    if ( leftPartB.hasInteger(0, (lLenB - 1)) ) {
    } else {
      return this.noMatch();
    }
    const rightBStart = lLenB + 2;
    if ( rightBStart >= __len ) {
      return this.noMatch();
    }
    const rightB = slice.peek(rightBStart);
    const rightPartB = rightB.splitWithToken("m");
    const rLenB = (rightPartB).length();
    if ( rLenB <= 0 ) {
      return this.noMatch();
    }
    if ( rightPartB.hasInteger(0, (rLenB - 1)) ) {
    } else {
      return this.noMatch();
    }
    if ( (rLenB + 1) > (rightB).length() ) {
      return this.noMatch();
    }
    if ( rightB.charCodeAt(rLenB) != 109 ) {
      return this.noMatch();
    }
    const lvalB = leftPartB.parseInteger(0, (lLenB - 1));
    const rvalB = rightPartB.parseInteger(0, (rLenB - 1));
    if ( (lvalB <= 0) || (rvalB <= 0) ) {
      return this.noMatch();
    }
    const outB = slice.read(((rightBStart + rLenB) + 1));
    outB.tag = this.detectedTag;
    return outB;
  };
}
DistanceRangeBlockDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new DistanceRangeBlockDetector(s);
};
class NGSharedLists  {
  constructor() {
    this.sportNames = [];
    this.sportNames.push("Swim");
    this.sportNames.push("Run");
    this.sportNames.push("Bike");
    this.sportNames.push("Ski");
    this.sportNames.push("Row");
  }
  defaultSportNames () {
    return this.sportNames;
  };
}
NGSharedLists.__singleton_instance = null;
NGSharedLists.__singleton = function() {
  if (NGSharedLists.__singleton_instance == null) {
    NGSharedLists.__singleton_instance = new NGSharedLists();
  }
  return NGSharedLists.__singleton_instance;
};
class KCALDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "kcal";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 5 ) {
      return this.noMatch();
    }
    let detectors = [];
    detectors.push(PositiveIntegerDetector.create());
    detectors.push(KeywordDetector.create("kcal"));
    const p = new Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts = p.getResults();
    const first = parts[0];
    const second = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("kcal") ) {
      return this.noMatch();
    }
    const outLen = (first).length() + (second).length();
    const out = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  };
}
KCALDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new KCALDetector(s);
};
class BPMDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "bpm";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 4 ) {
      return this.noMatch();
    }
    let detectors = [];
    detectors.push(PositiveIntegerDetector.create());
    detectors.push(KeywordDetector.create("bpm"));
    const p = new Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts = p.getResults();
    const first = parts[0];
    const second = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("bpm") ) {
      return this.noMatch();
    }
    const outLen = (first).length() + (second).length();
    const out = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  };
}
BPMDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new BPMDetector(s);
};
class PercentageRangeDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "percentage-range";
  }
  isDigit (ch) {
    return (ch >= 48) && (ch <= 57);
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 4 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < __len) {
      const chL = slice.charCodeAt(i);
      if ( this.isDigit(chL) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( ((i > 0) && (i < __len)) && (slice.charCodeAt(i) == 37) ) {
      if ( ((i + 1) < __len) && (slice.charCodeAt((i + 1)) == 45) ) {
        let j = i + 2;
        while (j < __len) {
          const chR = slice.charCodeAt(j);
          if ( this.isDigit(chR) ) {
            j = j + 1;
          } else {
            break;
          }
        };
        if ( ((j > (i + 2)) && (j < __len)) && (slice.charCodeAt(j) == 37) ) {
          const leftDigits = slice.read(i);
          const rightDigits = (slice.peek((i + 2))).read((j - (i + 2)));
          if ( false == leftDigits.hasInteger(0, ((leftDigits).length() - 1)) ) {
            return this.noMatch();
          }
          if ( false == rightDigits.hasInteger(0, ((rightDigits).length() - 1)) ) {
            return this.noMatch();
          }
          const lval = leftDigits.parseInteger(0, ((leftDigits).length() - 1));
          const rval = rightDigits.parseInteger(0, ((rightDigits).length() - 1));
          if ( (lval > 0) && (rval > 0) ) {
            const out2 = slice.read((j + 1));
            out2.tag = this.detectedTag;
            const pv2 = new PercentageRangeValue();
            pv2.minValue = lval;
            pv2.maxValue = rval;
            const payload2 = SliceParsedValue.fromPercentageRange(pv2);
            out2.setSliceValue(payload2);
            slice.setSliceValue(payload2);
            return out2;
          }
        }
      }
    }
    let detectors = [];
    detectors.push(NumRangeBlockDetector.create());
    detectors.push(KeywordDetector.create("%"));
    const p = new Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts = p.getResults();
    const first = parts[0];
    const second = parts[1];
    if ( false == (first.tag == "num-range") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("%") ) {
      return this.noMatch();
    }
    const outLen = (first).length() + (second).length();
    const out = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    const nrv = first.getAsNumRangeValue();
    const pv = new PercentageRangeValue();
    pv.minValue = nrv.minValue;
    pv.maxValue = nrv.maxValue;
    const payload = SliceParsedValue.fromPercentageRange(pv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
PercentageRangeDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new PercentageRangeDetector(s);
};
class RMDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "rm";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    let detectors = [];
    detectors.push(PositiveIntegerDetector.create());
    detectors.push(KeywordDetector.create("RM"));
    const p = new Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts = p.getResults();
    const first = parts[0];
    const second = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("RM") ) {
      return this.noMatch();
    }
    const outLen = (first).length() + (second).length();
    const out = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  };
}
RMDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new RMDetector(s);
};
class RomanZoneDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "zone-roman";
  }
  isAlphaNum (ch) {
    if ( (ch >= 48) && (ch <= 57) ) {
      return true;
    }
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  };
  detect (slice) {
    let tokenLen = 0;
    if ( slice.hasToken("III") ) {
      tokenLen = 3;
    } else {
      if ( slice.hasToken("II") ) {
        tokenLen = 2;
      } else {
        if ( slice.hasToken("IV") ) {
          tokenLen = 2;
        } else {
          if ( slice.hasToken("V") ) {
            tokenLen = 1;
          } else {
            if ( slice.hasToken("I") ) {
              tokenLen = 1;
            } else {
              return this.noMatch();
            }
          }
        }
      }
    }
    const __len = (slice).length();
    if ( __len > tokenLen ) {
      const next = slice.charCodeAt(tokenLen);
      if ( this.isAlphaNum(next) ) {
        return this.noMatch();
      }
    }
    const out = slice.read(tokenLen);
    out.tag = this.detectedTag;
    return out;
  };
}
RomanZoneDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new RomanZoneDetector(s);
};
class HeadingDataDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "heading-data";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 35 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(1) != 32 ) {
      return this.noMatch();
    }
    let i = 2;
    while (i < __len) {
      const ch = slice.charCodeAt(i);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    };
    if ( i <= 2 ) {
      return this.noMatch();
    }
    const out = slice.read(i);
    out.tag = this.detectedTag;
    return out;
  };
}
HeadingDataDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new HeadingDataDetector(s);
};
class StandardDetectors  {
  constructor() {
  }
}
StandardDetectors.create = function() {
  let ds = [];
  ds.push(SpaceDetector.create());
  ds.push(NewlineDetector.create());
  ds.push(DateTimeDetector.create());
  ds.push(SpeedDetector.create());
  ds.push(KCALDetector.create());
  ds.push(BPMDetector.create());
  ds.push(WeightDetector.create());
  ds.push(DistanceRangeBlockDetector.create());
  ds.push(PercentageRangeDetector.create());
  ds.push(SetRepRangeLoadDetector.create());
  ds.push(NumRangeBlockDetector.create());
  ds.push(DistanceDetector.create());
  ds.push(PercentageDetector.create());
  ds.push(RMDetector.create());
  ds.push(ZoneDetector.create());
  ds.push(RomanZoneDetector.create());
  ds.push(RecoveryTimeDetector.create());
  ds.push(TimeValueDetector.create());
  ds.push(RecoveryDetector.create());
  ds.push(LeftRightDetector.create());
  ds.push(FeelingDetector.create());
  ds.push(BodyMetricDetector.create());
  ds.push(CircuitDetector.create());
  ds.push(ContextEntryDetector.create());
  ds.push(SportExerciseDetector.create());
  ds.push(DecimalNumberDetector.create());
  ds.push(PositiveIntegerDetector.create());
  ds.push(RepeatBlockDetector.create());
  ds.push(AMTimeValueDetector.create());
  ds.push(DetailsDataDetector.create());
  ds.push(HeadingDataDetector.create());
  return ds;
};
class DetailsDataDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "details-data";
  }
  createChildDetectors () {
    return StandardDetectors.create();
  };
  findFirstNumberOffset (slice) {
    let i = 0;
    const __len = (slice).length();
    while (i < __len) {
      const ch = slice.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  isLetter (ch) {
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  };
  addChildrenFromParser (out, payload) {
    const p = new Parser((payload).toString(), this.createChildDetectors());
    (p).start();
    const ch = p.getResults();
    for ( let i = 0; i < ch.length; i++) {
      var item = ch[i];
      out.addChild(item);
    };
  };
  addParsedChildren (out, payload) {
    const p = new Parser((payload).toString(), this.createChildDetectors());
    (p).start();
    if ( p.getCount() > 0 ) {
      const ch = p.getResults();
      for ( let i = 0; i < ch.length; i++) {
        var item = ch[i];
        out.addChild(item);
      };
      return;
    }
    const __len = (payload).length();
    let wordEnd = 0;
    while (wordEnd < __len) {
      const chw = payload.charCodeAt(wordEnd);
      if ( this.isLetter(chw) ) {
        wordEnd = wordEnd + 1;
      } else {
        break;
      }
    };
    if ( wordEnd > 0 ) {
      const label = payload.read(wordEnd);
      label.tag = "keyword";
      out.addChild(label);
      let tailStart = wordEnd;
      while (tailStart < __len) {
        const cht = payload.charCodeAt(tailStart);
        if ( (cht == 32) || (cht == 9) ) {
          tailStart = tailStart + 1;
        } else {
          break;
        }
      };
      if ( tailStart < __len ) {
        const tail = (payload.peek(tailStart)).read((__len - tailStart));
        this.addChildrenFromParser(out, tail);
      }
      return;
    }
    const firstNum = this.findFirstNumberOffset(payload);
    if ( (firstNum > 0) && (firstNum < (payload).length()) ) {
      const numericTail = (payload.peek(firstNum)).read(((payload).length() - firstNum));
      this.addChildrenFromParser(out, numericTail);
    }
  };
  detect (slice) {
    if ( (slice).length() < 1 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 62 ) {
      return this.noMatch();
    }
    const __len = (slice).length();
    let markerEnd = 0;
    while (markerEnd < __len) {
      const chm = slice.charCodeAt(markerEnd);
      if ( chm == 62 ) {
        markerEnd = markerEnd + 1;
      } else {
        break;
      }
    };
    if ( markerEnd == 0 ) {
      return this.noMatch();
    }
    let lineEnd = markerEnd;
    while (lineEnd < __len) {
      const ch = slice.charCodeAt(lineEnd);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      lineEnd = lineEnd + 1;
    };
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const levelToken = slice.read(markerEnd);
    levelToken.tag = "details-level";
    const dlv = new DetailsLevelValue();
    dlv.level = markerEnd;
    dlv.marker = (levelToken).toString();
    const payload = SliceParsedValue.fromDetailsLevel(dlv);
    levelToken.setSliceValue(payload);
    out.addChild(levelToken);
    let contentStart = markerEnd;
    while (contentStart < lineEnd) {
      const ch2 = slice.charCodeAt(contentStart);
      if ( (ch2 == 32) || (ch2 == 9) ) {
        contentStart = contentStart + 1;
      } else {
        break;
      }
    };
    if ( contentStart >= lineEnd ) {
      return out;
    }
    const payload_2 = (slice.peek(contentStart)).read((lineEnd - contentStart));
    this.addParsedChildren(out, payload_2);
    return out;
  };
}
DetailsDataDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new DetailsDataDetector(s);
};
class NGSharedDetectorFactory  {
  constructor() {
  }
  createSportExerciseChildDetectors () {
    let ds = [];
    ds.push(SpaceDetector.create());
    ds.push(NewlineDetector.create());
    ds.push(DateTimeDetector.create());
    ds.push(SpeedDetector.create());
    ds.push(KCALDetector.create());
    ds.push(BPMDetector.create());
    ds.push(WeightDetector.create());
    ds.push(DistanceRangeBlockDetector.create());
    ds.push(PercentageRangeDetector.create());
    ds.push(SetRepRangeLoadDetector.create());
    ds.push(NumRangeBlockDetector.create());
    ds.push(DistanceDetector.create());
    ds.push(PercentageDetector.create());
    ds.push(RMDetector.create());
    ds.push(ZoneDetector.create());
    ds.push(RomanZoneDetector.create());
    ds.push(RecoveryTimeDetector.create());
    ds.push(TimeValueDetector.create());
    ds.push(RecoveryDetector.create());
    ds.push(LeftRightDetector.create());
    ds.push(FeelingDetector.create());
    ds.push(BodyMetricDetector.create());
    ds.push(CircuitDetector.create());
    ds.push(ContextEntryDetector.create());
    ds.push(DecimalNumberDetector.create());
    ds.push(PositiveIntegerDetector.create());
    ds.push(RepeatBlockDetector.create());
    ds.push(AMTimeValueDetector.create());
    ds.push(DetailsDataDetector.create());
    ds.push(HeadingDataDetector.create());
    return ds;
  };
}
NGSharedDetectorFactory.__singleton_instance = null;
NGSharedDetectorFactory.__singleton = function() {
  if (NGSharedDetectorFactory.__singleton_instance == null) {
    NGSharedDetectorFactory.__singleton_instance = new NGSharedDetectorFactory();
  }
  return NGSharedDetectorFactory.__singleton_instance;
};
class SportExerciseDetector  extends TokenDetector {
  constructor(noMatchSlice, sportNames) {
    super()
    this.sports = [];
    this.cachedNoMatch = noMatchSlice;
    this.sports = sportNames;
    this.detectedTag = "exercise";
  }
  createChildDetectors () {
    const shared = NGSharedDetectorFactory.__singleton();
    return shared.createSportExerciseChildDetectors();
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 6 ) {
      return this.noMatch();
    }
    let name = "";
    let nameLen = 0;
    let matched = false;
    for ( let i = 0; i < this.sports.length; i++) {
      var sportName = this.sports[i];
      const head = sportName + " ";
      if ( slice.hasToken(head) ) {
        name = sportName;
        nameLen = sportName.length;
        matched = true;
        break;
      }
    };
    if ( matched == false ) {
      return this.noMatch();
    }
    const restStart = nameLen + 1;
    if ( restStart >= __len ) {
      return this.noMatch();
    }
    let lineEnd = restStart;
    while (lineEnd < __len) {
      const ch = slice.charCodeAt(lineEnd);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      lineEnd = lineEnd + 1;
    };
    if ( lineEnd <= restStart ) {
      return this.noMatch();
    }
    const restSlice = (slice.peek(restStart)).read((lineEnd - restStart));
    const p = new Parser((restSlice).toString(), this.createChildDetectors());
    (p).start();
    if ( p.getCount() <= 0 ) {
      return this.noMatch();
    }
    const nameToken = slice.read(nameLen);
    nameToken.tag = "exercise-name";
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    out.addChild(nameToken);
    const children = p.getResults();
    for ( let i_1 = 0; i_1 < children.length; i_1++) {
      var ch_1 = children[i_1];
      out.addChild(ch_1);
    };
    return out;
  };
}
SportExerciseDetector.create = function() {
  const shared = NGSharedLists.__singleton();
  const sportNames = shared.defaultSportNames();
  const s = TokenDetector.createNoMatchSlice();
  return new SportExerciseDetector(s, sportNames);
};
SportExerciseDetector.createWithSports = function(sportNames) {
  const s = TokenDetector.createNoMatchSlice();
  return new SportExerciseDetector(s, sportNames);
};
class NGExpectRule  {
  constructor() {
    this.testIndex = -1;
    this.kind = "";
    this.childIndex = -1;
    this.field = "";
    this.value = "";
  }
}
class NGTestCase  {
  constructor() {
    this.input = "";
    this.expects = [];
    this.jsonFile = "";
  }
}
class NGTestSpecParser  {
  constructor() {
  }
  isSpace (ch) {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  };
  trim (text) {
    const __len = text.length;
    if ( __len == 0 ) {
      return "";
    }
    let start = 0;
    while (start < __len) {
      const ch = text.charCodeAt(start );
      if ( this.isSpace(ch) ) {
        start = start + 1;
      } else {
        break;
      }
    };
    let stop = __len;
    while (stop > start) {
      const ch2 = text.charCodeAt((stop - 1) );
      if ( this.isSpace(ch2) ) {
        stop = stop - 1;
      } else {
        break;
      }
    };
    if ( stop <= start ) {
      return "";
    }
    return text.substring(start, stop );
  };
  startsWith (text, prefix) {
    const tLen = text.length;
    const pLen = prefix.length;
    if ( pLen > tLen ) {
      return false;
    }
    return (text.substring(0, pLen )) == prefix;
  };
  endsWith (text, suffix) {
    const tLen = text.length;
    const sLen = suffix.length;
    if ( sLen > tLen ) {
      return false;
    }
    return (text.substring((tLen - sLen), tLen )) == suffix;
  };
  normalizeNumericText (text) {
    if ( (this).endsWith(text, ".0") ) {
      return text.substring(0, ((text.length) - 2) );
    }
    return text;
  };
  isCommentLine (line) {
    return (this).startsWith(line, "//");
  };
  findSpace (text) {
    const __len = text.length;
    let i = 0;
    while (i < __len) {
      const ch = text.charCodeAt(i );
      if ( ch == 32 ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  decodeEscapes (text) {
    const __len = text.length;
    if ( __len == 0 ) {
      return "";
    }
    let out = "";
    let i = 0;
    while (i < __len) {
      const ch = text.charCodeAt(i );
      if ( (ch == 92) && ((i + 1) < __len) ) {
        const next = text.charCodeAt((i + 1) );
        if ( next == 110 ) {
          out = out + "\n";
          i = i + 2;
          continue;
        }
        if ( next == 114 ) {
          out = out + "\r";
          i = i + 2;
          continue;
        }
        if ( next == 116 ) {
          out = out + "\t";
          i = i + 2;
          continue;
        }
        if ( next == 92 ) {
          out = out + "\\";
          i = i + 2;
          continue;
        }
      }
      out = out + (text.substring(i, (i + 1) ));
      i = i + 1;
    };
    return out;
  };
  parseExpect (line) {
    const out = new NGExpectRule();
    const payload = (this).trim(line);
    if ( (payload.length) == 0 ) {
      return out;
    }
    let body = payload;
    const idxSep = this.findSpace(payload);
    if ( idxSep > 0 ) {
      const idxText = payload.substring(0, idxSep );
      const idxSlice = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() > 0 ) {
        if ( idxSlice.hasInteger(0, ((idxSlice).length() - 1)) ) {
          out.testIndex = idxSlice.parseInteger(0, ((idxSlice).length() - 1));
          body = (this).trim((payload.substring((idxSep + 1), (payload.length) )));
        }
      }
    }
    if ( (this).startsWith(body, "tag ") ) {
      out.kind = "tag";
      out.value = this.decodeEscapes((this).trim((body.substring(4, (body.length) ))));
      return out;
    }
    if ( (this).startsWith(body, "child ") ) {
      const rest = (this).trim((body.substring(6, (body.length) )));
      const childIdxSep = this.findSpace(rest);
      if ( childIdxSep < 0 ) {
        return out;
      }
      const childIdxText = rest.substring(0, childIdxSep );
      const childIdxSlice = TokenSlice.fromText(childIdxText);
      if ( (childIdxSlice).length() == 0 ) {
        return out;
      }
      if ( childIdxSlice.hasInteger(0, ((childIdxSlice).length() - 1)) ) {
      } else {
        return out;
      }
      out.childIndex = childIdxSlice.parseInteger(0, ((childIdxSlice).length() - 1));
      const afterIdx = (this).trim((rest.substring((childIdxSep + 1), (rest.length) )));
      const fieldSep = this.findSpace(afterIdx);
      if ( fieldSep < 0 ) {
        return out;
      }
      out.kind = "child";
      out.field = afterIdx.substring(0, fieldSep );
      out.value = this.decodeEscapes((this).trim((afterIdx.substring((fieldSep + 1), (afterIdx.length) ))));
      return out;
    }
    if ( (this).startsWith(body, "json ") ) {
      const restJson = (this).trim((body.substring(5, (body.length) )));
      const pathSep = this.findSpace(restJson);
      if ( pathSep < 0 ) {
        return out;
      }
      out.kind = "json";
      out.field = (this).trim((restJson.substring(0, pathSep )));
      out.value = this.decodeEscapes((this).trim((restJson.substring((pathSep + 1), (restJson.length) ))));
      return out;
    }
    return out;
  };
  resolveTargetIndex (blockStart, caseCount, idx) {
    if ( idx >= 0 ) {
      return blockStart + idx;
    }
    return caseCount - 1;
  };
  parseJsonFile (line, cases, blockStart) {
    const payload = (this).trim(line);
    if ( (payload.length) == 0 ) {
      return;
    }
    if ( (this).startsWith(payload, "all ") ) {
      const allFileName = this.decodeEscapes((this).trim((payload.substring(4, (payload.length) ))));
      if ( (allFileName.length) == 0 ) {
        return;
      }
      let from = blockStart;
      const to = cases.length;
      while (from < to) {
        const tcAll = cases[from];
        tcAll.jsonFile = allFileName;
        from = from + 1;
      };
      return;
    }
    let target = -1;
    let fileName = payload;
    const idxSep = this.findSpace(payload);
    if ( idxSep > 0 ) {
      const idxText = payload.substring(0, idxSep );
      const idxSlice = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() > 0 ) {
        if ( idxSlice.hasInteger(0, ((idxSlice).length() - 1)) ) {
          const idxValue = idxSlice.parseInteger(0, ((idxSlice).length() - 1));
          target = this.resolveTargetIndex(blockStart, (cases.length), idxValue);
          fileName = (this).trim((payload.substring((idxSep + 1), (payload.length) )));
        }
      }
    }
    if ( target < 0 ) {
      target = this.resolveTargetIndex(blockStart, (cases.length), -1);
    }
    if ( (fileName.length) == 0 ) {
      return;
    }
    if ( (target >= 0) && (target < (cases.length)) ) {
      const tc = cases[target];
      tc.jsonFile = this.decodeEscapes(fileName);
    }
  };
  parse (specText) {
    let cases = [];
    let blockStart = 0;
    let prevKind = "none";
    const __len = specText.length;
    let lineStart = 0;
    let i = 0;
    while (i <= __len) {
      if ( i == __len ) {
      } else {
        const ch = specText.charCodeAt(i );
        if ( (ch == 10) || (ch == 13) ) {
        } else {
          i = i + 1;
          continue;
        }
      }
      const raw = specText.substring(lineStart, i );
      const line = (this).trim(raw);
      if ( (line.length) > 0 ) {
        if ( this.isCommentLine(line) ) {
        } else {
          if ( (this).startsWith(line, "Test ") ) {
            if ( prevKind != "test" ) {
              blockStart = cases.length;
            }
            const tc = new NGTestCase();
            tc.input = this.decodeEscapes((this).trim((line.substring(5, (line.length) ))));
            cases.push(tc);
            prevKind = "test";
          } else {
            if ( (this).startsWith(line, "Expect ") ) {
              const ex = this.parseExpect((line.substring(7, (line.length) )));
              if ( (ex.kind.length) > 0 ) {
                const target = this.resolveTargetIndex(blockStart, (cases.length), ex.testIndex);
                if ( (target >= 0) && (target < (cases.length)) ) {
                  const tc2 = cases[target];
                  tc2.expects.push(ex);
                }
              }
              prevKind = "expect";
            } else {
              if ( (this).startsWith(line, "JSON ") ) {
                this.parseJsonFile(line.substring(5, (line.length) ), cases, blockStart);
                prevKind = "json";
              }
            }
          }
        }
      }
      if ( i == __len ) {
        break;
      }
      const firstNl = specText.charCodeAt(i );
      if ( (firstNl == 13) && ((i + 1) < __len) ) {
        if ( (specText.charCodeAt((i + 1) )) == 10 ) {
          i = i + 1;
        }
      }
      i = i + 1;
      lineStart = i;
    };
    return cases;
  };
}
NGTestSpecParser.create = function() {
  return new NGTestSpecParser();
};
class NGTestRunner  {
  constructor() {
  }
  isSpace (ch) {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  };
  trim (text) {
    const __len = text.length;
    if ( __len == 0 ) {
      return "";
    }
    let start = 0;
    while (start < __len) {
      const ch = text.charCodeAt(start );
      if ( this.isSpace(ch) ) {
        start = start + 1;
      } else {
        break;
      }
    };
    let stop = __len;
    while (stop > start) {
      const ch2 = text.charCodeAt((stop - 1) );
      if ( this.isSpace(ch2) ) {
        stop = stop - 1;
      } else {
        break;
      }
    };
    if ( stop <= start ) {
      return "";
    }
    return text.substring(start, stop );
  };
  startsWith (text, prefix) {
    const tLen = text.length;
    const pLen = prefix.length;
    if ( pLen > tLen ) {
      return false;
    }
    return (text.substring(0, pLen )) == prefix;
  };
  createDetectors () {
    return StandardDetectors.create();
  };
  escapeJson (text) {
    const __len = text.length;
    if ( __len == 0 ) {
      return "";
    }
    let out = "";
    let i = 0;
    while (i < __len) {
      const ch = text.charCodeAt(i );
      if ( ch == 34 ) {
        out = out + "\\\"";
        i = i + 1;
        continue;
      }
      if ( ch == 92 ) {
        out = out + "\\\\";
        i = i + 1;
        continue;
      }
      if ( ch == 10 ) {
        out = out + "\\n";
        i = i + 1;
        continue;
      }
      if ( ch == 13 ) {
        out = out + "\\r";
        i = i + 1;
        continue;
      }
      if ( ch == 9 ) {
        out = out + "\\t";
        i = i + 1;
        continue;
      }
      out = out + (text.substring(i, (i + 1) ));
      i = i + 1;
    };
    return out;
  };
  indent (level) {
    let out = "";
    let i = 0;
    while (i < level) {
      out = out + "  ";
      i = i + 1;
    };
    return out;
  };
  jsonKVString (key, value) {
    return ((("\"" + key) + "\":\"") + this.escapeJson(value)) + "\"";
  };
  jsonKVNumber (key, value) {
    return (("\"" + key) + "\":") + value;
  };
  jsonObject (level, fields) {
    const pad = this.indent(level);
    const childPad = this.indent((level + 1));
    let out = "{\n";
    const cnt = fields.length;
    let i = 0;
    while (i < cnt) {
      out = (out + childPad) + (fields[i]);
      if ( (i + 1) < cnt ) {
        out = out + ",";
      }
      out = out + "\n";
      i = i + 1;
    };
    out = (out + pad) + "}";
    return out;
  };
  parsedValueToJson (token, level) {
    if ( token.hasSliceValue() ) {
    } else {
      return "null";
    }
    const kind = token.getSliceValueKind();
    if ( kind == "datetime" ) {
      return JSON.stringify((token.getAsDateTimeValue()).toDictionary());
    }
    if ( kind == "distance" ) {
      return JSON.stringify((token.getAsDistanceValue()).toDictionary());
    }
    if ( kind == "percentage" ) {
      return JSON.stringify((token.getAsPercentageValue()).toDictionary());
    }
    if ( kind == "recovery-time" ) {
      return JSON.stringify((token.getAsRecoveryTimeValue()).toDictionary());
    }
    if ( kind == "time-value" ) {
      return JSON.stringify((token.getAsTimeValueValue()).toDictionary());
    }
    if ( kind == "weight" ) {
      return JSON.stringify((token.getAsWeightValue()).toDictionary());
    }
    if ( kind == "num-range" ) {
      return JSON.stringify((token.getAsNumRangeValue()).toDictionary());
    }
    if ( kind == "percentage-range" ) {
      return JSON.stringify((token.getAsPercentageRangeValue()).toDictionary());
    }
    if ( kind == "repeat-block" ) {
      return JSON.stringify((token.getAsRepeatBlockValue()).toDictionary());
    }
    if ( kind == "set-rep-range-load" ) {
      return JSON.stringify((token.getAsSetRepRangeLoadValue()).toDictionary());
    }
    if ( kind == "zone" ) {
      return JSON.stringify((token.getAsZoneValue()).toDictionary());
    }
    if ( kind == "positive-integer" ) {
      return JSON.stringify((token.getAsPositiveIntegerValue()).toDictionary());
    }
    if ( kind == "details-level" ) {
      return JSON.stringify((token.getAsDetailsLevelValue()).toDictionary());
    }
    if ( kind == "recovery" ) {
      return JSON.stringify((token.getAsRecoveryValue()).toDictionary());
    }
    if ( kind == "left-right" ) {
      return JSON.stringify((token.getAsLeftRightValue()).toDictionary());
    }
    if ( kind == "feeling" ) {
      return JSON.stringify((token.getAsFeelingValue()).toDictionary());
    }
    if ( kind == "body-metric" ) {
      return JSON.stringify((token.getAsBodyMetricValue()).toDictionary());
    }
    if ( kind == "circuit" ) {
      return JSON.stringify((token.getAsCircuitValue()).toDictionary());
    }
    if ( kind == "context-entry" ) {
      return JSON.stringify((token.getAsContextEntryValue()).toDictionary());
    }
    return ("{\"kind\":\"" + this.escapeJson(kind)) + "\"}";
  };
  tokenToJson (token, level) {
    const pad = this.indent(level);
    const childPad = this.indent((level + 1));
    let out = pad + "{\n";
    out = out + (childPad + (("\"tag\":\"" + this.escapeJson(token.tag)) + "\",\n"));
    out = out + (childPad + (("\"text\":\"" + this.escapeJson((token).toString())) + "\",\n"));
    out = out + (((childPad + "\"parsed\":") + this.parsedValueToJson(token, (level + 1))) + ",\n");
    out = out + (childPad + "\"children\":[");
    const cc = token.childCount();
    let i = 0;
    if ( cc > 0 ) {
      out = out + "\n";
      while (i < cc) {
        if ( i > 0 ) {
          out = out + ",\n";
        }
        const ch = token.getChild(i);
        out = out + this.tokenToJson(ch, (level + 2));
        i = i + 1;
      };
      out = out + "\n";
      out = out + childPad;
    }
    out = out + "]\n";
    out = out + (pad + "}");
    return out;
  };
  findDot (text) {
    const __len = text.length;
    let i = 0;
    while (i < __len) {
      if ( (text.charCodeAt(i )) == 46 ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  normalizeJsonPath (path) {
    const raw = (this).trim(path);
    if ( (raw.length) == 0 ) {
      return "";
    }
    let out = "";
    const __len = raw.length;
    let i = 0;
    if ( raw == "$" ) {
      return "";
    }
    if ( (this).startsWith(raw, "$.") ) {
      i = 2;
    } else {
      if ( (this).startsWith(raw, "$") ) {
        i = 1;
      }
    }
    while (i < __len) {
      const ch = raw.charCodeAt(i );
      if ( ch == 91 ) {
        i = i + 1;
        if ( (out.length) > 0 ) {
          out = out + ".";
        }
        while (i < __len) {
          const ch2 = raw.charCodeAt(i );
          if ( ch2 == 93 ) {
            i = i + 1;
            break;
          }
          out = out + (raw.substring(i, (i + 1) ));
          i = i + 1;
        };
        continue;
      }
      out = out + (raw.substring(i, (i + 1) ));
      i = i + 1;
    };
    if ( (this).startsWith(out, ".") ) {
      out = out.substring(1, (out.length) );
    }
    return out;
  };
  jsonTokenValue (token, path) {
    const p = this.normalizeJsonPath(path);
    if ( (p.length) == 0 ) {
      return "";
    }
    const dotPos = this.findDot(p);
    let head = p;
    let tail = "";
    if ( dotPos >= 0 ) {
      head = p.substring(0, dotPos );
      tail = p.substring((dotPos + 1), (p.length) );
    }
    if ( head == "tag" ) {
      if ( (tail.length) == 0 ) {
        return token.tag;
      }
      return "";
    }
    if ( head == "text" ) {
      if ( (tail.length) == 0 ) {
        return (token).toString();
      }
      return "";
    }
    if ( head == "children" ) {
      if ( (tail.length) == 0 ) {
        return "";
      }
      const dotPos2 = this.findDot(tail);
      let idxText = tail;
      let rest = "";
      if ( dotPos2 >= 0 ) {
        idxText = tail.substring(0, dotPos2 );
        rest = tail.substring((dotPos2 + 1), (tail.length) );
      }
      const idxSlice = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() == 0 ) {
        return "";
      }
      if ( idxSlice.hasInteger(0, ((idxSlice).length() - 1)) ) {
      } else {
        return "";
      }
      const childIdx = idxSlice.parseInteger(0, ((idxSlice).length() - 1));
      if ( (childIdx < 0) || (childIdx >= token.childCount()) ) {
        return "";
      }
      const ch = token.getChild(childIdx);
      if ( (rest.length) == 0 ) {
        return (ch).toString();
      }
      return this.jsonTokenValue(ch, rest);
    }
    if ( head == "parsed" ) {
      if ( (tail.length) == 0 ) {
        return token.getSliceValueKind();
      }
      if ( token.hasSliceValue() ) {
      } else {
        return "";
      }
      const kind = token.getSliceValueKind();
      if ( tail == "kind" ) {
        return kind;
      }
      if ( kind == "recovery-time" ) {
        const rv = token.getAsRecoveryTimeValue();
        if ( tail == "value" ) {
          return "" + rv.value;
        }
        if ( tail == "unit" ) {
          return rv.unit;
        }
      }
      if ( kind == "time-value" ) {
        const tv = token.getAsTimeValueValue();
        if ( tail == "minutes" ) {
          return "" + tv.minutes;
        }
        if ( tail == "seconds" ) {
          return "" + tv.seconds;
        }
      }
      if ( kind == "datetime" ) {
        const dtv = token.getAsDateTimeValue();
        if ( tail == "year" ) {
          return "" + dtv.year;
        }
        if ( tail == "month" ) {
          return "" + dtv.month;
        }
        if ( tail == "day" ) {
          return "" + dtv.day;
        }
        if ( tail == "hour" ) {
          return "" + dtv.hour;
        }
        if ( tail == "minute" ) {
          return "" + dtv.minute;
        }
        if ( tail == "second" ) {
          return "" + dtv.second;
        }
        if ( tail == "timezone" ) {
          if ( (typeof(dtv.timezone) !== "undefined" && dtv.timezone != null )  ) {
            return dtv.timezone;
          }
          return "";
        }
      }
      if ( kind == "distance" ) {
        const dv = token.getAsDistanceValue();
        if ( tail == "value" ) {
          return "" + dv.value;
        }
        if ( tail == "unit" ) {
          return dv.unit;
        }
      }
      if ( kind == "weight" ) {
        const wv = token.getAsWeightValue();
        if ( tail == "value" ) {
          return "" + wv.value;
        }
        if ( tail == "unit" ) {
          return wv.unit;
        }
      }
      if ( kind == "percentage" ) {
        const pv = token.getAsPercentageValue();
        if ( tail == "value" ) {
          return "" + pv.value;
        }
      }
      if ( kind == "num-range" ) {
        const nr = token.getAsNumRangeValue();
        if ( tail == "minValue" ) {
          return "" + nr.minValue;
        }
        if ( tail == "maxValue" ) {
          return "" + nr.maxValue;
        }
      }
      if ( kind == "percentage-range" ) {
        const pr = token.getAsPercentageRangeValue();
        if ( tail == "minValue" ) {
          return "" + pr.minValue;
        }
        if ( tail == "maxValue" ) {
          return "" + pr.maxValue;
        }
      }
      if ( kind == "zone" ) {
        const zv = token.getAsZoneValue();
        if ( tail == "zone" ) {
          return "" + zv.zone;
        }
      }
      if ( kind == "repeat-block" ) {
        const rb = token.getAsRepeatBlockValue();
        if ( tail == "count" ) {
          return "" + rb.count;
        }
      }
      if ( kind == "left-right" ) {
        const lr = token.getAsLeftRightValue();
        if ( tail == "side" ) {
          return lr.side;
        }
      }
      if ( kind == "set-rep-range-load" ) {
        const sr = token.getAsSetRepRangeLoadValue();
        if ( tail == "setsMin" ) {
          return "" + sr.setsMin;
        }
        if ( tail == "setsMax" ) {
          return "" + sr.setsMax;
        }
        if ( tail == "repsMin" ) {
          return "" + sr.repsMin;
        }
        if ( tail == "repsMax" ) {
          return "" + sr.repsMax;
        }
        if ( tail == "mode" ) {
          return sr.mode;
        }
        if ( tail == "load" ) {
          return "" + sr.load;
        }
        if ( tail == "unit" ) {
          return sr.unit;
        }
      }
      if ( kind == "feeling" ) {
        const fv = token.getAsFeelingValue();
        if ( tail == "type" ) {
          return fv.kind;
        }
        if ( tail == "score" ) {
          return "" + fv.score;
        }
      }
      if ( kind == "body-metric" ) {
        const bm = token.getAsBodyMetricValue();
        if ( tail == "metric" ) {
          return bm.metric;
        }
        if ( tail == "primaryValue" ) {
          return "" + bm.primaryValue;
        }
        if ( tail == "secondaryValue" ) {
          return "" + bm.secondaryValue;
        }
        if ( tail == "unit" ) {
          return bm.unit;
        }
      }
      if ( kind == "circuit" ) {
        const cv = token.getAsCircuitValue();
        if ( tail == "rounds" ) {
          return "" + cv.rounds;
        }
        if ( tail == "restValue" ) {
          return "" + cv.restValue;
        }
        if ( tail == "restUnit" ) {
          return cv.restUnit;
        }
      }
      if ( kind == "details-level" ) {
        const dl = token.getAsDetailsLevelValue();
        if ( tail == "level" ) {
          return "" + dl.level;
        }
        if ( tail == "marker" ) {
          return dl.marker;
        }
      }
      if ( kind == "recovery" ) {
        const rv2 = token.getAsRecoveryValue();
        if ( tail == "label" ) {
          return rv2.label;
        }
      }
      if ( kind == "context-entry" ) {
        const ce = token.getAsContextEntryValue();
        if ( tail == "type" ) {
          return ce.kind;
        }
        if ( tail == "content" ) {
          return ce.content;
        }
      }
      if ( kind == "positive-integer" ) {
        const piv = token.getAsPositiveIntegerValue();
        if ( tail == "value" ) {
          return "" + piv.value;
        }
      }
      return "";
    }
    return "";
  };
  runSpec (specText) {
    let out = [];
    const parser = NGTestSpecParser.create();
    const cases = parser.parse(specText);
    for ( let i = 0; i < cases.length; i++) {
      var tc = cases[i];
      const p = new Parser(tc.input, this.createDetectors());
      (p).start();
      if ( p.getCount() == 0 ) {
        out.push(((("Test " + ("#" + ("" + (i + 1)))) + " failed: no tokens for input '") + tc.input) + "'");
        continue;
      }
      const results = p.getResults();
      const root = results[0];
      for ( let j = 0; j < tc.expects.length; j++) {
        var ex = tc.expects[j];
        if ( ex.kind == "tag" ) {
          if ( root.tag == ex.value ) {
          } else {
            out.push(((("Test " + ("#" + ("" + (i + 1)))) + " expect tag '") + ex.value) + (("' but got '" + root.tag) + "'"));
          }
          continue;
        }
        if ( ex.kind == "child" ) {
          if ( (ex.childIndex < 0) || (ex.childIndex >= root.childCount()) ) {
            out.push(((("Test " + ("#" + ("" + (i + 1)))) + " expect child index out of range: ") + ("" + ex.childIndex)) + ((" childCount=" + ("" + root.childCount())) + ""));
            continue;
          }
          const ch = root.getChild(ex.childIndex);
          if ( ex.field == "string" ) {
            const got = (ch).toString();
            if ( got == ex.value ) {
            } else {
              out.push((((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + (("" + ex.childIndex) + " string '")) + ex.value) + (("' but got '" + got) + "'"));
            }
            continue;
          }
          if ( ex.field == "tag" ) {
            const gotTag = ch.tag;
            if ( gotTag == ex.value ) {
            } else {
              out.push((((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + (("" + ex.childIndex) + " tag '")) + ex.value) + (("' but got '" + gotTag) + "'"));
            }
            continue;
          }
          out.push(((("Test " + ("#" + ("" + (i + 1)))) + " unsupported field '") + ex.field) + "' in Expect child");
          continue;
        }
        if ( ex.kind == "json" ) {
          const gotJson = this.jsonTokenValue(root, ex.field);
          if ( (gotJson.length) == 0 ) {
            out.push(((("Test " + ("#" + ("" + (i + 1)))) + " expect json path '") + ex.field) + "' was not found");
            continue;
          }
          if ( gotJson == ex.value ) {
          } else {
            out.push(((((("Test " + ("#" + ("" + (i + 1)))) + " expect json path '") + ex.field) + "' value '") + ex.value) + (("' but got '" + gotJson) + "'"));
          }
          continue;
        }
      };
    };
    return out;
  };
  exportJson (specText) {
    let out = [];
    const parser = NGTestSpecParser.create();
    const cases = parser.parse(specText);
    let files = [];
    let payloads = [];
    let counts = [];
    for ( let i = 0; i < cases.length; i++) {
      var tc = cases[i];
      if ( (tc.jsonFile.length) == 0 ) {
        continue;
      }
      const p = new Parser(tc.input, this.createDetectors());
      (p).start();
      if ( p.getCount() == 0 ) {
        continue;
      }
      const results = p.getResults();
      const root = results[0];
      const json = this.tokenToJson(root, 0);
      let fileIdx = -1;
      let search = 0;
      while (search < (files.length)) {
        if ( (files[search]) == tc.jsonFile ) {
          fileIdx = search;
          break;
        }
        search = search + 1;
      };
      if ( fileIdx < 0 ) {
        files.push(tc.jsonFile);
        payloads.push(json);
        counts.push(1);
      } else {
        const prevPayload = payloads[fileIdx];
        const nextPayload = (prevPayload + ",\n") + json;
        payloads[fileIdx] = nextPayload;
        const prevCount = counts[fileIdx];
        counts[fileIdx] = prevCount + 1;
      }
    };
    let j = 0;
    while (j < (files.length)) {
      const fileName = files[j];
      let payload = payloads[j];
      const cnt = counts[j];
      if ( cnt > 1 ) {
        payload = ("[\n" + payload) + "\n]";
      }
      out.push((fileName + "\t") + payload);
      j = j + 1;
    };
    return out;
  };
}
NGTestRunner.create = function() {
  return new NGTestRunner();
};
class TokenDetectorModule  {
  constructor() {
  }
}
TokenDetectorModule.createKeyword = function(token) {
  return KeywordDetector.create(token);
};
TokenDetectorModule.createDateTime = function() {
  return DateTimeDetector.create();
};
TokenDetectorModule.createSpace = function() {
  return SpaceDetector.create();
};
TokenDetectorModule.createNewline = function() {
  return NewlineDetector.create();
};
TokenDetectorModule.createPositiveInteger = function() {
  return PositiveIntegerDetector.create();
};
TokenDetectorModule.createDecimalNumber = function() {
  return DecimalNumberDetector.create();
};
TokenDetectorModule.createTimeValue = function() {
  return TimeValueDetector.create();
};
TokenDetectorModule.createRecoveryTime = function() {
  return RecoveryTimeDetector.create();
};
TokenDetectorModule.createRecovery = function() {
  return RecoveryDetector.create();
};
TokenDetectorModule.createLeftRight = function() {
  return LeftRightDetector.create();
};
TokenDetectorModule.createFeeling = function() {
  return FeelingDetector.create();
};
TokenDetectorModule.createBodyMetric = function() {
  return BodyMetricDetector.create();
};
TokenDetectorModule.createCircuit = function() {
  return CircuitDetector.create();
};
TokenDetectorModule.createContextEntry = function() {
  return ContextEntryDetector.create();
};
TokenDetectorModule.createSpeed = function() {
  return SpeedDetector.create();
};
TokenDetectorModule.createRepeatBlock = function() {
  return RepeatBlockDetector.create();
};
TokenDetectorModule.createWeight = function() {
  return WeightDetector.create();
};
TokenDetectorModule.createDistance = function() {
  return DistanceDetector.create();
};
TokenDetectorModule.createNumRangeBlock = function() {
  return NumRangeBlockDetector.create();
};
TokenDetectorModule.createDistanceRangeBlock = function() {
  return DistanceRangeBlockDetector.create();
};
TokenDetectorModule.createAMTimeValue = function() {
  return AMTimeValueDetector.create();
};
TokenDetectorModule.defaultSportNames = function() {
  const shared = NGSharedLists.__singleton();
  return shared.defaultSportNames();
};
TokenDetectorModule.createSportExercise = function() {
  return SportExerciseDetector.create();
};
TokenDetectorModule.createDetailsData = function() {
  return DetailsDataDetector.create();
};
TokenDetectorModule.createHeadingData = function() {
  return HeadingDataDetector.create();
};
TokenDetectorModule.createBPM = function() {
  return BPMDetector.create();
};
TokenDetectorModule.createKCAL = function() {
  return KCALDetector.create();
};
TokenDetectorModule.createPercentage = function() {
  return PercentageDetector.create();
};
TokenDetectorModule.createPercentageRange = function() {
  return PercentageRangeDetector.create();
};
TokenDetectorModule.createRM = function() {
  return RMDetector.create();
};
TokenDetectorModule.createSetRepRangeLoad = function() {
  return SetRepRangeLoadDetector.create();
};
TokenDetectorModule.createZone = function() {
  return ZoneDetector.create();
};
TokenDetectorModule.createRomanZone = function() {
  return RomanZoneDetector.create();
};
TokenDetectorModule.createStandardDetectors = function() {
  return StandardDetectors.create();
};
TokenDetectorModule.createNGTestRunner = function() {
  return NGTestRunner.create();
};
TokenDetectorModule.createNGTestSpecParser = function() {
  return NGTestSpecParser.create();
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
module.exports.BodyMetricValue = BodyMetricValue;
module.exports.CircuitValue = CircuitValue;
module.exports.ContextEntryValue = ContextEntryValue;
module.exports.SliceParsedValue = SliceParsedValue;
module.exports.TokenSlice = TokenSlice;
module.exports.TokenDetector = TokenDetector;
module.exports.KeywordDetector = KeywordDetector;
module.exports.DateTimeDetector = DateTimeDetector;
module.exports.SpaceDetector = SpaceDetector;
module.exports.NewlineDetector = NewlineDetector;
module.exports.PositiveIntegerDetector = PositiveIntegerDetector;
module.exports.DecimalNumberDetector = DecimalNumberDetector;
module.exports.TimeValueDetector = TimeValueDetector;
module.exports.Parser = Parser;
module.exports.DistanceDetector = DistanceDetector;
module.exports.RecoveryTimeDetector = RecoveryTimeDetector;
module.exports.AMTimeValueDetector = AMTimeValueDetector;
module.exports.PercentageDetector = PercentageDetector;
module.exports.WeightDetector = WeightDetector;
module.exports.NumRangeBlockDetector = NumRangeBlockDetector;
module.exports.RecoveryDetector = RecoveryDetector;
module.exports.RepeatBlockDetector = RepeatBlockDetector;
module.exports.SetRepRangeLoadDetector = SetRepRangeLoadDetector;
module.exports.SpeedDetector = SpeedDetector;
module.exports.ZoneDetector = ZoneDetector;
module.exports.LeftRightDetector = LeftRightDetector;
module.exports.FeelingDetector = FeelingDetector;
module.exports.BodyMetricDetector = BodyMetricDetector;
module.exports.CircuitDetector = CircuitDetector;
module.exports.ContextEntryDetector = ContextEntryDetector;
module.exports.DistanceRangeBlockDetector = DistanceRangeBlockDetector;
module.exports.NGSharedLists = NGSharedLists;
module.exports.KCALDetector = KCALDetector;
module.exports.BPMDetector = BPMDetector;
module.exports.PercentageRangeDetector = PercentageRangeDetector;
module.exports.RMDetector = RMDetector;
module.exports.RomanZoneDetector = RomanZoneDetector;
module.exports.HeadingDataDetector = HeadingDataDetector;
module.exports.StandardDetectors = StandardDetectors;
module.exports.DetailsDataDetector = DetailsDataDetector;
module.exports.NGSharedDetectorFactory = NGSharedDetectorFactory;
module.exports.SportExerciseDetector = SportExerciseDetector;
module.exports.NGExpectRule = NGExpectRule;
module.exports.NGTestCase = NGTestCase;
module.exports.NGTestSpecParser = NGTestSpecParser;
module.exports.NGTestRunner = NGTestRunner;
module.exports.TokenDetectorModule = TokenDetectorModule;
