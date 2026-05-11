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
    this.value = 0.0;
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
    const v_1 = isNaN( parseFloat(dict ["value"]) ) ? undefined : parseFloat(dict ["value"]) 
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
class DurationValue  {
  constructor() {
    this.kind = "duration";
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
DurationValue.fromDictionary = function(dict) {
  const obj = new DurationValue();
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
class RepeatPartValue  {
  constructor() {
    this.kind = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      if ( (typeof(this.positiveInteger) !== "undefined" && this.positiveInteger != null )  ) {
        res["positiveInteger"] = ((this.positiveInteger)).toDictionary();
      }
      if ( (typeof(this.numRange) !== "undefined" && this.numRange != null )  ) {
        res["numRange"] = ((this.numRange)).toDictionary();
      }
      if ( (typeof(this.distance) !== "undefined" && this.distance != null )  ) {
        res["distance"] = ((this.distance)).toDictionary();
      }
      if ( (typeof(this.weight) !== "undefined" && this.weight != null )  ) {
        res["weight"] = ((this.weight)).toDictionary();
      }
      if ( (typeof(this.duration) !== "undefined" && this.duration != null )  ) {
        res["duration"] = ((this.duration)).toDictionary();
      }
      if ( (typeof(this.timeValue) !== "undefined" && this.timeValue != null )  ) {
        res["timeValue"] = ((this.timeValue)).toDictionary();
      }
      if ( (typeof(this.percentage) !== "undefined" && this.percentage != null )  ) {
        res["percentage"] = ((this.percentage)).toDictionary();
      }
      if ( (typeof(this.percentageRange) !== "undefined" && this.percentageRange != null )  ) {
        res["percentageRange"] = ((this.percentageRange)).toDictionary();
      }
    } catch(e) {
    }
    return res;
  };
}
RepeatPartValue.fromDictionary = function(dict) {
  const obj = new RepeatPartValue();
  try {
    const v = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
    ;
    if ( (typeof(v) !== "undefined" && v != null )  ) {
      obj.kind = v;
    }
    const theValue = (dict["positiveInteger"] instanceof Object ) ? dict ["positiveInteger"] : undefined ;
    if ( (typeof(theValue) !== "undefined" && theValue != null )  ) {
      const newObj = PositiveIntegerValue.fromDictionary((theValue));
      obj.positiveInteger = newObj;
    }
    const theValue_1 = (dict["numRange"] instanceof Object ) ? dict ["numRange"] : undefined ;
    if ( (typeof(theValue_1) !== "undefined" && theValue_1 != null )  ) {
      const newObj_1 = NumRangeValue.fromDictionary((theValue_1));
      obj.numRange = newObj_1;
    }
    const theValue_2 = (dict["distance"] instanceof Object ) ? dict ["distance"] : undefined ;
    if ( (typeof(theValue_2) !== "undefined" && theValue_2 != null )  ) {
      const newObj_2 = DistanceValue.fromDictionary((theValue_2));
      obj.distance = newObj_2;
    }
    const theValue_3 = (dict["weight"] instanceof Object ) ? dict ["weight"] : undefined ;
    if ( (typeof(theValue_3) !== "undefined" && theValue_3 != null )  ) {
      const newObj_3 = WeightValue.fromDictionary((theValue_3));
      obj.weight = newObj_3;
    }
    const theValue_4 = (dict["duration"] instanceof Object ) ? dict ["duration"] : undefined ;
    if ( (typeof(theValue_4) !== "undefined" && theValue_4 != null )  ) {
      const newObj_4 = DurationValue.fromDictionary((theValue_4));
      obj.duration = newObj_4;
    }
    const theValue_5 = (dict["timeValue"] instanceof Object ) ? dict ["timeValue"] : undefined ;
    if ( (typeof(theValue_5) !== "undefined" && theValue_5 != null )  ) {
      const newObj_5 = TimeValueValue.fromDictionary((theValue_5));
      obj.timeValue = newObj_5;
    }
    const theValue_6 = (dict["percentage"] instanceof Object ) ? dict ["percentage"] : undefined ;
    if ( (typeof(theValue_6) !== "undefined" && theValue_6 != null )  ) {
      const newObj_6 = PercentageValue.fromDictionary((theValue_6));
      obj.percentage = newObj_6;
    }
    const theValue_7 = (dict["percentageRange"] instanceof Object ) ? dict ["percentageRange"] : undefined ;
    if ( (typeof(theValue_7) !== "undefined" && theValue_7 != null )  ) {
      const newObj_7 = PercentageRangeValue.fromDictionary((theValue_7));
      obj.percentageRange = newObj_7;
    }
  } catch(e) {
  }
  return obj;
};
class RepeatBlockValue  {
  constructor() {
    this.kind = "repeat-block";
    this.parts = [];
    this.loadMode = "";
  }
  toDictionary () {
    let res = {};
    try {
      res["kind"] = this.kind;
      let values = [];
      for ( let i = 0; i < this.parts.length; i++) {
        var item = this.parts[i];
        const obj = item.toDictionary();
        values.push(obj);
      };
      res["parts"] = values;
      res["loadMode"] = this.loadMode;
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
    const values = (dict["parts"] instanceof Array ) ? dict ["parts"] : undefined ;
    if ( (typeof(values) !== "undefined" && values != null )  ) {
      const arr = values;
      operatorsOfJSONArrayObject.forEach_2(arr, ((item, index) => { 
        if( item instanceof Object ) /* union case */ {
          var oo = item;
          const newObj = RepeatPartValue.fromDictionary(oo);
          obj.parts.push(newObj);
        };
      }));
    }
    const v_1 = (typeof (dict ["loadMode"]) != "string" ) ? undefined : dict ["loadMode"] 
    ;
    if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
      obj.loadMode = v_1;
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
  hasDuration () {
    return (typeof(this.duration) !== "undefined" && this.duration != null ) ;
  };
  getDuration () {
    if ( (typeof(this.duration) !== "undefined" && this.duration != null )  ) {
      return this.duration;
    }
    return new DurationValue();
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
SliceParsedValue.fromDuration = function(value) {
  const out = new SliceParsedValue();
  out.kind = "duration";
  out.duration = value;
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
    this.start = from;
    this.size = length;
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
  hasDurationValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "duration") && p.hasDuration() ) {
        return true;
      }
    }
    return false;
  };
  setDurationValue (value) {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      p.duration = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "duration";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromDuration(value);
  };
  getAsDurationValue () {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p = this.parsedValue;
      if ( (p.kind == "duration") && p.hasDuration() ) {
        return p.getDuration();
      }
    }
    return new DurationValue();
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
  isDigitAt (index) {
    const ch = this.charCodeAt(index);
    return (ch >= 48) && (ch <= 57);
  };
  digitAt (index) {
    const ch = this.charCodeAt(index);
    if ( (ch >= 48) && (ch <= 57) ) {
      return ch - 48;
    }
    return -1;
  };
  isWhitespace (ch) {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  };
  isWhitespaceAt (index) {
    const ch = this.charCodeAt(index);
    return this.isWhitespace(ch);
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
    if ( ch >= 128 ) {
      return true;
    }
    return false;
  };
  isAlphaNumAt (index) {
    const ch = this.charCodeAt(index);
    return this.isAlphaNum(ch);
  };
  findLineEnd (from) {
    let safeFrom = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= this.size ) {
      return this.size;
    }
    let i = safeFrom;
    while (i < this.size) {
      const ch = this.charCodeAt(i);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    };
    return i;
  };
  findNumberEnd (from) {
    let safeFrom = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= this.size ) {
      return this.size;
    }
    let i = safeFrom;
    while (i < this.size) {
      if ( this.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    return i;
  };
  findWhitespaceEnd (from) {
    let safeFrom = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= this.size ) {
      return this.size;
    }
    let i = safeFrom;
    while (i < this.size) {
      if ( this.isWhitespaceAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    return i;
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
    if ( from < 0 ) {
      return -1;
    }
    if ( to < from ) {
      return -1;
    }
    if ( to >= this.size ) {
      return -1;
    }
    let value = 0;
    let i = from;
    while (i <= to) {
      const ch = this.charCodeAt(i);
      if ( (ch < 48) || (ch > 57) ) {
        return -1;
      }
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
    if ( (this.source.charCodeAt(this.start )) != (token.charCodeAt(0 )) ) {
      return false;
    }
    if ( tLen == 1 ) {
      return true;
    }
    let i = 1;
    while (i < tLen) {
      if ( (this.source.charCodeAt((this.start + i) )) == (token.charCodeAt(i )) ) {
      } else {
        return false;
      }
      i = i + 1;
    };
    return true;
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
  isInRange (value, minValue, maxValue) {
    if ( value < minValue ) {
      return false;
    }
    if ( value > maxValue ) {
      return false;
    }
    return true;
  };
  isHour24 (value) {
    return this.isInRange(value, 0, 23);
  };
  isMinuteSecond (value) {
    return this.isInRange(value, 0, 59);
  };
  isHour12 (value) {
    return this.isInRange(value, 1, 12);
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
    this.parseDateShapeCalls = 0;
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "datetime";
  }
  getParseDateShapeCalls () {
    return this.parseDateShapeCalls;
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
      if ( false == this.isHour24(out.hour) ) {
        return this.noMatch();
      }
      if ( false == this.isMinuteSecond(out.minute) ) {
        return this.noMatch();
      }
      let idx = 16;
      if ( ((slice).length() >= 19) && (slice.charCodeAt(16) == 58) ) {
        out.second = slice.parseInteger(17, 18);
        if ( false == this.isMinuteSecond(out.second) ) {
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
            if ( false == this.isHour24(tzHour) ) {
              return this.noMatch();
            }
            if ( false == this.isMinuteSecond(tzMin) ) {
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
    return newSlice;
  };
  detect (slice) {
    return this.parseDateShape(slice);
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
  detect (slice) {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    const i = slice.findWhitespaceEnd(0);
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
  detect (slice) {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    let i = 0;
    let hasNonZero = false;
    while (i < (slice).length()) {
      if ( slice.isDigitAt(i) ) {
        if ( slice.digitAt(i) != 0 ) {
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
  detect (slice) {
    const __len = (slice).length();
    if ( __len == 0 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
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
      if ( slice.isDigitAt(j) ) {
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
    if ( false == this.isHour24(hour) ) {
      return this.noMatch();
    }
    if ( false == this.isMinuteSecond(minute) ) {
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
    const valueLen = slice.findNumberEnd(0);
    if ( valueLen <= 0 ) {
      return this.noMatch();
    }
    if ( (valueLen + 1) > __len ) {
      return this.noMatch();
    }
    if ( slice.hasInteger(0, (valueLen - 1)) ) {
    } else {
      return this.noMatch();
    }
    const parsed = slice.parseInteger(0, (valueLen - 1));
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
      if ( slice.isDigitAt(i) ) {
        if ( slice.digitAt(i) != 0 ) {
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
    const parsedValue = SliceParsedValue.fromPositiveInteger(piv);
    valueToken.setSliceValue(parsedValue);
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
    const i = slice.findNumberEnd(0);
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
    if ( false == this.isHour12(hour) ) {
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
    const vLen = slice.findNumberEnd(0);
    if ( vLen <= 0 ) {
      return this.noMatch();
    }
    if ( (vLen + 1) > __len ) {
      return this.noMatch();
    }
    if ( slice.hasInteger(0, (vLen - 1)) ) {
    } else {
      return this.noMatch();
    }
    const v = slice.parseInteger(0, (vLen - 1));
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
class Parser  {
  constructor(source, detectors) {
    this.source = "";
    this.slice = new TokenSlice("", 0, 0);
    this.detectors = [];
    this.parserdResults = [];
    this.source = source;
    this.detectors = detectors;
    this.slice = new TokenSlice(source, 0, source.length);
    this.parserdResults.length = 0;
  }
  start () {
    let activeSlice = new TokenSlice("", 0, 0);
    activeSlice = this.slice;
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
Parser.fromSlice = function(s, detectors) {
  const p = new Parser("", detectors);
  p.slice = s;
  return p;
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
    let i = slice.findWhitespaceEnd(0);
    const leftStart = i;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    const leftEnd = i;
    if ( leftEnd <= leftStart ) {
      return this.noMatch();
    }
    i = slice.findWhitespaceEnd(i);
    if ( (i >= __len) || (slice.charCodeAt(i) != 45) ) {
      return this.noMatch();
    }
    i = i + 1;
    i = slice.findWhitespaceEnd(i);
    const rightStart = i;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    const rightEnd = i;
    if ( rightEnd <= rightStart ) {
      return this.noMatch();
    }
    const left = (slice.peek(leftStart)).read((leftEnd - leftStart));
    const right = (slice.peek(rightStart)).read((rightEnd - rightStart));
    if ( false == left.hasInteger(0, ((left).length() - 1)) ) {
      return this.noMatch();
    }
    if ( false == right.hasInteger(0, ((right).length() - 1)) ) {
      return this.noMatch();
    }
    const lval = left.parseInteger(0, ((left).length() - 1));
    const rval = right.parseInteger(0, ((right).length() - 1));
    if ( lval <= 0 ) {
      return this.noMatch();
    }
    if ( rval <= 0 ) {
      return this.noMatch();
    }
    const out = slice.read(rightEnd);
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
class PercentageRangeDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "percentage-range";
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 4 ) {
      return this.noMatch();
    }
    let i = 0;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( ((i > 0) && (i < __len)) && (slice.charCodeAt(i) == 37) ) {
      if ( ((i + 1) < __len) && (slice.charCodeAt((i + 1)) == 45) ) {
        let j = i + 2;
        while (j < __len) {
          if ( slice.isDigitAt(j) ) {
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
    const subReg = NGSubParserDetectors.__singleton();
    const detectors = subReg.getPercentageRangeChildDetectors();
    const p = Parser.fromSlice(slice, detectors);
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
class DurationDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "duration";
  }
  isAlphaCode (c) {
    if ( (c >= 65) && (c <= 90) ) {
      return true;
    }
    if ( (c >= 97) && (c <= 122) ) {
      return true;
    }
    return false;
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    let i = 0;
    let hasNonZero = false;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        if ( slice.digitAt(i) != 0 ) {
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
    if ( hasNonZero == false ) {
      return this.noMatch();
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    const numEnd = i;
    const value = slice.parseInteger(0, (numEnd - 1));
    let unitLen = 0;
    let unitText = "";
    const c0 = slice.charCodeAt(numEnd);
    if ( (numEnd + 3) <= __len ) {
      if ( c0 == 109 ) {
        if ( slice.charCodeAt((numEnd + 1)) == 105 ) {
          if ( slice.charCodeAt((numEnd + 2)) == 110 ) {
            unitLen = 3;
            unitText = "min";
          }
        }
      }
    }
    if ( unitLen == 0 ) {
      if ( c0 == 115 ) {
        unitLen = 1;
        unitText = "s";
      }
    }
    if ( unitLen == 0 ) {
      if ( c0 == 104 ) {
        unitLen = 1;
        unitText = "h";
      }
    }
    if ( unitLen == 0 ) {
      return this.noMatch();
    }
    const afterUnit = numEnd + unitLen;
    if ( afterUnit < __len ) {
      if ( this.isAlphaCode(slice.charCodeAt(afterUnit)) ) {
        return this.noMatch();
      }
    }
    const out = slice.read(afterUnit);
    out.tag = this.detectedTag;
    const dv = new DurationValue();
    dv.value = value;
    dv.unit = unitText;
    const payload = SliceParsedValue.fromDuration(dv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
}
DurationDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new DurationDetector(s);
};
class NGSubParserDetectors  {
  constructor() {
    this.kcalChildDetectors = [];
    this.bpmChildDetectors = [];
    this.rmChildDetectors = [];
    this.weightChildDetectors = [];
    this.positiveIntegerOnlyChildDetectors = [];
    this.percentageRangeChildDetectors = [];
    this.repeatBlockChildDetectors = [];
  }
  getKcalChildDetectors () {
    if ( (this.kcalChildDetectors.length) > 0 ) {
      return this.kcalChildDetectors;
    }
    let ds = [];
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("kcal"));
    this.kcalChildDetectors = ds;
    return this.kcalChildDetectors;
  };
  getBpmChildDetectors () {
    if ( (this.bpmChildDetectors.length) > 0 ) {
      return this.bpmChildDetectors;
    }
    let ds = [];
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("bpm"));
    this.bpmChildDetectors = ds;
    return this.bpmChildDetectors;
  };
  getRmChildDetectors () {
    if ( (this.rmChildDetectors.length) > 0 ) {
      return this.rmChildDetectors;
    }
    let ds = [];
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("RM"));
    this.rmChildDetectors = ds;
    return this.rmChildDetectors;
  };
  getWeightChildDetectors () {
    if ( (this.weightChildDetectors.length) > 0 ) {
      return this.weightChildDetectors;
    }
    let ds = [];
    ds.push(DecimalNumberDetector.create());
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("kg"));
    this.weightChildDetectors = ds;
    return this.weightChildDetectors;
  };
  getPositiveIntegerOnlyChildDetectors () {
    if ( (this.positiveIntegerOnlyChildDetectors.length) > 0 ) {
      return this.positiveIntegerOnlyChildDetectors;
    }
    let ds = [];
    ds.push(PositiveIntegerDetector.create());
    this.positiveIntegerOnlyChildDetectors = ds;
    return this.positiveIntegerOnlyChildDetectors;
  };
  getPercentageRangeChildDetectors () {
    if ( (this.percentageRangeChildDetectors.length) > 0 ) {
      return this.percentageRangeChildDetectors;
    }
    let ds = [];
    ds.push(SpaceDetector.create());
    ds.push(NumRangeBlockDetector.create());
    ds.push(KeywordDetector.create("%"));
    this.percentageRangeChildDetectors = ds;
    return this.percentageRangeChildDetectors;
  };
  getRepeatBlockChildDetectors () {
    if ( (this.repeatBlockChildDetectors.length) > 0 ) {
      return this.repeatBlockChildDetectors;
    }
    let ds = [];
    ds.push(PercentageRangeDetector.create());
    ds.push(PercentageDetector.create());
    ds.push(DistanceDetector.create());
    ds.push(WeightDetector.create());
    ds.push(DurationDetector.create());
    ds.push(NumRangeBlockDetector.create());
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("@bw"));
    ds.push(KeywordDetector.create("x"));
    this.repeatBlockChildDetectors = ds;
    return this.repeatBlockChildDetectors;
  };
}
NGSubParserDetectors.__singleton_instance = null;
NGSubParserDetectors.__singleton = function() {
  if (NGSubParserDetectors.__singleton_instance == null) {
    NGSubParserDetectors.__singleton_instance = new NGSubParserDetectors();
  }
  return NGSubParserDetectors.__singleton_instance;
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
    const subReg = NGSubParserDetectors.__singleton();
    const detectors = subReg.getWeightChildDetectors();
    const p = Parser.fromSlice(slice, detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts = p.getResults();
    const first = parts[0];
    const second = parts[1];
    const isInt = first.tag == "positive-integer";
    const isDec = first.tag == "decimal-number";
    if ( (isInt == false) && (isDec == false) ) {
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
    wv.value = first.parseDouble(0, (firstLen - 1));
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
class RepeatBlockDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "repeat-block";
  }
  isAlphaCode (c) {
    if ( (c >= 65) && (c <= 90) ) {
      return true;
    }
    if ( (c >= 97) && (c <= 122) ) {
      return true;
    }
    return false;
  };
  buildPart (tok) {
    const part = new RepeatPartValue();
    const t = tok.tag;
    if ( t == "positive-integer" ) {
      part.kind = "positive-integer";
      part.positiveInteger = tok.getAsPositiveIntegerValue();
      return part;
    }
    if ( t == "num-range" ) {
      part.kind = "num-range";
      part.numRange = tok.getAsNumRangeValue();
      return part;
    }
    if ( t == "distance" ) {
      part.kind = "distance";
      part.distance = tok.getAsDistanceValue();
      return part;
    }
    if ( t == "weight" ) {
      part.kind = "weight";
      part.weight = tok.getAsWeightValue();
      return part;
    }
    if ( t == "duration" ) {
      part.kind = "duration";
      part.duration = tok.getAsDurationValue();
      return part;
    }
    if ( t == "time-value" ) {
      part.kind = "time-value";
      part.timeValue = tok.getAsTimeValueValue();
      return part;
    }
    if ( t == "percentage" ) {
      part.kind = "percentage";
      part.percentage = tok.getAsPercentageValue();
      return part;
    }
    if ( t == "percentage-range" ) {
      part.kind = "percentage-range";
      part.percentageRange = tok.getAsPercentageRangeValue();
      return part;
    }
    part.kind = "";
    return part;
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    const subReg = NGSubParserDetectors.__singleton();
    const detectors = subReg.getRepeatBlockChildDetectors();
    const p = Parser.fromSlice(slice, detectors);
    (p).start();
    const n = p.getCount();
    if ( n == 0 ) {
      return this.noMatch();
    }
    const results = p.getResults();
    const rv = new RepeatBlockValue();
    let consumed = 0;
    let hasX = false;
    let expectPart = true;
    let stop = false;
    let lastPartLen = 0;
    let lastWasNonInteger = false;
    let i = 0;
    while ((i < n) && (stop == false)) {
      const tok = results[i];
      const ttag = tok.tag;
      const ttext = (tok).toString();
      const tlen = (tok).length();
      if ( expectPart ) {
        const part = this.buildPart(tok);
        if ( (part.kind.length) > 0 ) {
          rv.parts.push(part);
          consumed = consumed + tlen;
          expectPart = false;
          lastPartLen = tlen;
          if ( part.kind == "positive-integer" ) {
            lastWasNonInteger = false;
          } else {
            lastWasNonInteger = true;
          }
        } else {
          stop = true;
        }
      } else {
        if ( (ttag == "keyword") && (ttext == "x") ) {
          hasX = true;
          consumed = consumed + tlen;
          expectPart = true;
        } else {
          if ( (ttag == "keyword") && (ttext == "@bw") ) {
            rv.loadMode = "bw";
            consumed = consumed + tlen;
            stop = true;
          } else {
            stop = true;
          }
        }
      }
      i = i + 1;
    };
    if ( ((expectPart == false) && (hasX == true)) && (consumed < __len) ) {
      if ( lastWasNonInteger == false ) {
        const nc = slice.charCodeAt(consumed);
        if ( this.isAlphaCode(nc) ) {
          const last = rv.parts.length;
          if ( last >= 1 ) {
            let newParts = [];
            let j = 0;
            while (j < (last - 1)) {
              newParts.push(rv.parts[j]);
              j = j + 1;
            };
            rv.parts = newParts;
            consumed = consumed - lastPartLen;
          }
        }
      }
    }
    const partCount = rv.parts.length;
    if ( partCount == 0 ) {
      return this.noMatch();
    }
    if ( hasX == false ) {
      if ( partCount == 1 ) {
        const only = rv.parts[0];
        if ( only.kind == "positive-integer" ) {
          return this.noMatch();
        }
        if ( only.kind == "num-range" ) {
          return this.noMatch();
        }
      }
    }
    if ( consumed < __len ) {
      const lineEnd = slice.findLineEnd(0);
      let k = consumed;
      while (k < lineEnd) {
        if ( slice.isWhitespaceAt(k) ) {
          k = k + 1;
        } else {
          break;
        }
      };
      if ( (k > consumed) && (k < lineEnd) ) {
        if ( this.isAlphaCode(slice.charCodeAt(k)) ) {
          let m = k;
          let hasSemi = false;
          while (m < lineEnd) {
            if ( slice.charCodeAt(m) == 59 ) {
              hasSemi = true;
              break;
            }
            m = m + 1;
          };
          if ( hasSemi ) {
            return this.noMatch();
          }
        }
      }
    }
    const out = slice.read(consumed);
    out.tag = this.detectedTag;
    const payload = SliceParsedValue.fromRepeatBlock(rv);
    out.setSliceValue(payload);
    return out;
  };
}
RepeatBlockDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new RepeatBlockDetector(s);
};
class SpeedDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "speed";
    this.distanceDetector = DistanceDetector.create();
  }
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 7 ) {
      return this.noMatch();
    }
    const colonPos = slice.findNumberEnd(0);
    if ( colonPos <= 0 ) {
      return this.noMatch();
    }
    if ( (colonPos + 4) > __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(colonPos) != 58 ) {
      return this.noMatch();
    }
    const slashPos = colonPos + 3;
    if ( slice.charCodeAt(slashPos) != 47 ) {
      return this.noMatch();
    }
    const left = slice.read(slashPos);
    if ( false == left.hasInteger(0, (colonPos - 1)) ) {
      return this.noMatch();
    }
    if ( false == left.hasInteger((colonPos + 1), (colonPos + 2)) ) {
      return this.noMatch();
    }
    const sec = left.parseInteger((colonPos + 1), (colonPos + 2));
    if ( false == this.isMinuteSecond(sec) ) {
      return this.noMatch();
    }
    const rightStart = slice.peek((slashPos + 1));
    const dist = this.distanceDetector.detect(rightStart);
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
    const firstParsed = SliceParsedValue.fromTimeValue(tv);
    first.setSliceValue(firstParsed);
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
      if ( slice.isDigitAt(i) ) {
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
      if ( slice.isAlphaNumAt(i) ) {
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
class NGChildDetectorRegistry  {
  constructor() {
    this.recoveryChildDetectors = [];
    this.leftRightChildDetectors = [];
  }
  getRecoveryChildDetectors () {
    if ( (this.recoveryChildDetectors.length) > 0 ) {
      return this.recoveryChildDetectors;
    }
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
    this.recoveryChildDetectors = ds;
    return this.recoveryChildDetectors;
  };
  getLeftRightChildDetectors () {
    if ( (this.leftRightChildDetectors.length) > 0 ) {
      return this.leftRightChildDetectors;
    }
    let ds = [];
    ds.push(RepeatBlockDetector.create());
    ds.push(WeightDetector.create());
    ds.push(DistanceDetector.create());
    ds.push(SpeedDetector.create());
    ds.push(ZoneDetector.create());
    ds.push(DecimalNumberDetector.create());
    ds.push(PositiveIntegerDetector.create());
    this.leftRightChildDetectors = ds;
    return this.leftRightChildDetectors;
  };
}
NGChildDetectorRegistry.__singleton_instance = null;
NGChildDetectorRegistry.__singleton = function() {
  if (NGChildDetectorRegistry.__singleton_instance == null) {
    NGChildDetectorRegistry.__singleton_instance = new NGChildDetectorRegistry();
  }
  return NGChildDetectorRegistry.__singleton_instance;
};
class RecoveryDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "recovery";
  }
  createChildDetectors () {
    const reg = NGChildDetectorRegistry.__singleton();
    return reg.getRecoveryChildDetectors();
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
    if ( slice.isAlphaNumAt(keyLen) ) {
      return this.noMatch();
    }
    const lineEnd = slice.findLineEnd(keyLen);
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const labelToken = slice.read(keyLen);
    labelToken.tag = "keyword";
    out.addChild(labelToken);
    const restStart = slice.findWhitespaceEnd(keyLen);
    if ( restStart < lineEnd ) {
      const rest = (slice.peek(restStart)).read((lineEnd - restStart));
      const p = Parser.fromSlice(rest, this.createChildDetectors());
      (p).start();
      const children = p.getResults();
      for ( let i = 0; i < children.length; i++) {
        var ch = children[i];
        out.addChild(ch);
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
class LeftRightDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "left-right";
  }
  createChildDetectors () {
    const reg = NGChildDetectorRegistry.__singleton();
    return reg.getLeftRightChildDetectors();
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
    const lineEnd = slice.findLineEnd(keyLen);
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const sideToken = slice.read((side.length));
    sideToken.tag = "keyword";
    out.addChild(sideToken);
    const restStart = slice.findWhitespaceEnd(keyLen);
    if ( restStart < lineEnd ) {
      const payload = (slice.peek(restStart)).read((lineEnd - restStart));
      const p = Parser.fromSlice(payload, this.createChildDetectors());
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
  parseNumericScore (slice) {
    const subReg = NGSubParserDetectors.__singleton();
    const detectors = subReg.getPositiveIntegerOnlyChildDetectors();
    const p = Parser.fromSlice(slice, detectors);
    (p).start();
    if ( p.getCount() != 1 ) {
      return -1;
    }
    const scoreToken = p.getResults()[0];
    if ( scoreToken.tag == "positive-integer" ) {
      return scoreToken.parseInteger(0, ((scoreToken).length() - 1));
    }
    return -1;
  };
  parseSlashTenScore (slice) {
    if ( slice.hasToken("?/10") ) {
      return 0;
    }
    const __len = (slice).length();
    let i = 1;
    while ((i + 2) < __len) {
      if ( slice.charCodeAt(i) == 47 ) {
        if ( (slice.charCodeAt((i + 1)) == 49) && (slice.charCodeAt((i + 2)) == 48) ) {
          let start = i;
          while (start > 0) {
            if ( slice.isDigitAt((start - 1)) ) {
              start = start - 1;
            } else {
              break;
            }
          };
          if ( start < i ) {
            const numSlice = (slice.peek(start)).read((i - start));
            if ( numSlice.hasInteger(0, ((numSlice).length() - 1)) ) {
              return numSlice.parseInteger(0, ((numSlice).length() - 1));
            }
          }
        }
      }
      i = i + 1;
    };
    return -1;
  };
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
    const lineEnd = slice.findLineEnd(keyLen);
    const rawSlice = (slice.peek(keyLen)).read((lineEnd - keyLen));
    let trimStart = 0;
    const rawLen = (rawSlice).length();
    while (trimStart < rawLen) {
      const chStart = rawSlice.charCodeAt(trimStart);
      if ( rawSlice.isWhitespace(chStart) ) {
        trimStart = trimStart + 1;
      } else {
        break;
      }
    };
    let trimEnd = rawLen;
    while (trimEnd > trimStart) {
      const chEnd = rawSlice.charCodeAt((trimEnd - 1));
      if ( rawSlice.isWhitespace(chEnd) ) {
        trimEnd = trimEnd - 1;
      } else {
        break;
      }
    };
    let score = -1;
    if ( trimEnd > trimStart ) {
      const valueSlice = (rawSlice.peek(trimStart)).read((trimEnd - trimStart));
      score = this.parseNumericScore(valueSlice);
      if ( score < 0 ) {
        if ( (kind == "feeling") && valueSlice.hasToken("RPE:") ) {
          if ( (valueSlice).length() > 4 ) {
            const rpeSlice = (valueSlice.peek(4)).read(((valueSlice).length() - 4));
            score = this.parseNumericScore(rpeSlice);
          }
        }
      }
      if ( score < 0 ) {
        score = this.parseSlashTenScore(valueSlice);
      }
      if ( score < 0 ) {
        if ( valueSlice.charCodeAt(0) == 124 ) {
          score = 0;
        }
      }
      if ( score < 0 ) {
        if ( (kind == "pain") && valueSlice.hasToken("-|") ) {
          score = 0;
        }
      }
    } else {
      score = 0;
    }
    if ( score < 0 ) {
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
    const scoreToken = TokenSlice.fromText(("" + score));
    scoreToken.tag = "positive-integer";
    out.addChild(scoreToken);
    const fv = new FeelingValue();
    fv.kind = kind;
    fv.score = score;
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
class EffortDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "effort";
  }
  prefixLength (slice) {
    if ( slice.hasToken("RPE ") ) {
      return 4;
    }
    return 7;
  };
  detect (slice) {
    if ( slice.hasToken("Effort ") ) {
    } else {
      if ( slice.hasToken("RPE ") ) {
      } else {
        return this.noMatch();
      }
    }
    const keyLen = this.prefixLength(slice);
    const __len = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    const lineEnd = slice.findLineEnd(keyLen);
    const valueSlice = (slice.peek(keyLen)).read((lineEnd - keyLen));
    const subReg = NGSubParserDetectors.__singleton();
    const detectors = subReg.getPositiveIntegerOnlyChildDetectors();
    const p = Parser.fromSlice(valueSlice, detectors);
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
    const ev = new EffortValue();
    ev.score = scoreToken.parseInteger(0, ((scoreToken).length() - 1));
    const parsed = SliceParsedValue.fromEffort(ev);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
}
EffortDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new EffortDetector(s);
};
class BodyMetricDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "body-metric";
  }
  findLineEnd (slice, from) {
    return slice.findLineEnd(from);
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
    const i = metricSlice.findNumberEnd(0);
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
  detectSimpleDoubleMetric (slice, prefix, labelLen, metricName, unit, allowZero) {
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const prefixLen = prefix.length;
    const lineEnd = this.findLineEnd(slice, prefixLen);
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    const metric = this.createMetricSlice(slice, prefixLen, lineEnd);
    const value = this.parseDoublePrefix(metric);
    if ( allowZero ) {
      if ( value < 0.0 ) {
        return this.noMatch();
      }
    } else {
      if ( value <= 0.0 ) {
        return this.noMatch();
      }
    }
    const mv = new BodyMetricValue();
    mv.metric = metricName;
    mv.primaryValue = value;
    mv.unit = unit;
    this.setCommon(out, slice, mv);
    return out;
  };
  detectWeight (slice) {
    return this.detectSimpleDoubleMetric(slice, "Weight ", 6, "weight", "kg", false);
  };
  detectBodyFat (slice) {
    return this.detectSimpleDoubleMetric(slice, "BodyFat ", 7, "body-fat", "%", true);
  };
  detectSleep (slice) {
    return this.detectSimpleDoubleMetric(slice, "Sleep ", 5, "sleep", "h", false);
  };
  detectRestingHr (slice) {
    return this.detectSimpleDoubleMetric(slice, "Health resting_hr ", 17, "resting-hr", "bpm", false);
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
  detectVitalsWeight (slice) {
    return this.detectSimpleDoubleMetric(slice, "Vitals weight:", 13, "weight", "kg", false);
  };
  detectVitalsSleep (slice) {
    return this.detectSimpleDoubleMetric(slice, "Vitals sleep:", 12, "sleep", "h", false);
  };
  detectVitalsRhr (slice) {
    return this.detectSimpleDoubleMetric(slice, "Vitals rhr:", 10, "resting-hr", "bpm", false);
  };
  detectWaist (slice) {
    return this.detectSimpleDoubleMetric(slice, "Waist ", 5, "waist", "cm", false);
  };
  detectHip (slice) {
    return this.detectSimpleDoubleMetric(slice, "Hip ", 3, "hip", "cm", false);
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
    const vw = this.detectVitalsWeight(slice);
    if ( vw.isEmpty() ) {
    } else {
      return vw;
    }
    const vs = this.detectVitalsSleep(slice);
    if ( vs.isEmpty() ) {
    } else {
      return vs;
    }
    const vr = this.detectVitalsRhr(slice);
    if ( vr.isEmpty() ) {
    } else {
      return vr;
    }
    const waist = this.detectWaist(slice);
    if ( waist.isEmpty() ) {
    } else {
      return waist;
    }
    const hip = this.detectHip(slice);
    if ( hip.isEmpty() ) {
    } else {
      return hip;
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
    const roundsEnd = slice.findNumberEnd(roundsStart);
    if ( roundsEnd <= roundsStart ) {
      return this.noMatch();
    }
    const roundsSlice = (slice.peek(roundsStart)).read((roundsEnd - roundsStart));
    if ( roundsSlice.hasInteger(0, ((roundsSlice).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    const lineEnd = slice.findLineEnd(roundsEnd);
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
      const i = slice.findNumberEnd((roundsEnd + 1));
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
class NGSharedLists  {
  constructor() {
    this.sportNames = [];
    this.contextEntryKinds = [];
    this.contextEntryPrefixTokens = [];
    this.romanZonePrefixTokens = [];
    this.contextEntryKindMap = {};
    this.reservedGenericExerciseNameMap = {};
    this.sportNames.push("Swim");
    this.sportNames.push("Run");
    this.sportNames.push("Bike");
    this.sportNames.push("Ski");
    this.sportNames.push("Row");
    this.addContextEntryKind("food", "Food ");
    this.addContextEntryKind("drinking", "Drinking ");
    this.addContextEntryKind("expense", "Expense ");
    this.addContextEntryKind("reminder", "Reminder ");
    this.addContextEntryKind("protein", "Protein ");
    this.addContextEntryKind("comment", "Comment ");
    this.addContextEntryKind("custom", "Custom ");
    this.addContextEntryKind("tags", "Tags ");
    this.addContextEntryKind("emojis", "Emojis ");
    this.addContextEntryKind("summary", "Summary ");
    this.addContextEntryKind("derived", "Derived ");
    this.addContextEntryKind("url", "URL ");
    this.romanZonePrefixTokens.push("III");
    this.romanZonePrefixTokens.push("II");
    this.romanZonePrefixTokens.push("IV");
    this.romanZonePrefixTokens.push("V");
    this.romanZonePrefixTokens.push("I");
    this.addReservedGenericExerciseName("Split");
    this.addReservedGenericExerciseName("Attempt");
    this.addReservedGenericExerciseName("Recovery");
    this.addReservedGenericExerciseName("Left");
    this.addReservedGenericExerciseName("Right");
    this.addReservedGenericExerciseName("Feeling");
    this.addReservedGenericExerciseName("Feelings");
    this.addReservedGenericExerciseName("Pain");
    this.addReservedGenericExerciseName("Effort");
    this.addReservedGenericExerciseName("RPE");
    this.addReservedGenericExerciseName("Circuit");
    this.addReservedGenericExerciseName("Food");
    this.addReservedGenericExerciseName("Drinking");
    this.addReservedGenericExerciseName("Expense");
    this.addReservedGenericExerciseName("Reminder");
    this.addReservedGenericExerciseName("Protein");
    this.addReservedGenericExerciseName("Weight");
    this.addReservedGenericExerciseName("BodyFat");
    this.addReservedGenericExerciseName("Sleep");
    this.addReservedGenericExerciseName("Health");
    this.addReservedGenericExerciseName("Vitals");
    this.addReservedGenericExerciseName("Comment");
    this.addReservedGenericExerciseName("Custom");
    this.addReservedGenericExerciseName("Tags");
    this.addReservedGenericExerciseName("Emojis");
    this.addReservedGenericExerciseName("Summary");
    this.addReservedGenericExerciseName("Derived");
    this.addReservedGenericExerciseName("URL");
    this.addReservedGenericExerciseName("Waist");
    this.addReservedGenericExerciseName("Hip");
    this.addReservedGenericExerciseName("Blorple");
  }
  addContextEntryKind (kind, prefix) {
    this.contextEntryKinds.push(kind);
    this.contextEntryPrefixTokens.push(prefix);
    this.contextEntryKindMap[kind] = true;
  };
  addReservedGenericExerciseName (name) {
    this.reservedGenericExerciseNameMap[name] = true;
  };
  defaultSportNames () {
    return this.sportNames;
  };
  defaultContextEntryKinds () {
    return this.contextEntryKinds;
  };
  defaultContextEntryPrefixTokens () {
    return this.contextEntryPrefixTokens;
  };
  defaultRomanZonePrefixTokens () {
    return this.romanZonePrefixTokens;
  };
  isContextEntryKind (kind) {
    return ( typeof(this.contextEntryKindMap[kind] ) != "undefined" && this.contextEntryKindMap.hasOwnProperty(kind) );
  };
  isReservedGenericExerciseName (name) {
    return ( typeof(this.reservedGenericExerciseNameMap[name] ) != "undefined" && this.reservedGenericExerciseNameMap.hasOwnProperty(name) );
  };
}
NGSharedLists.__singleton_instance = null;
NGSharedLists.__singleton = function() {
  if (NGSharedLists.__singleton_instance == null) {
    NGSharedLists.__singleton_instance = new NGSharedLists();
  }
  return NGSharedLists.__singleton_instance;
};
class ContextEntryDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "context-entry";
  }
  toTag (kind) {
    const shared = NGSharedLists.__singleton();
    if ( shared.isContextEntryKind(kind) ) {
      return kind;
    }
    return this.detectedTag;
  };
  detectKind (slice) {
    const shared = NGSharedLists.__singleton();
    const kinds = shared.defaultContextEntryKinds();
    const prefixes = shared.defaultContextEntryPrefixTokens();
    const cnt = kinds.length;
    let i = 0;
    while (i < cnt) {
      if ( slice.hasToken((prefixes[i])) ) {
        return kinds[i];
      }
      i = i + 1;
    };
    return "";
  };
  findLineEnd (slice, start) {
    return slice.findLineEnd(start);
  };
  parseDerivedFields (cv, valueSlice) {
    const __len = (valueSlice).length();
    if ( __len <= 0 ) {
      return;
    }
    let i = 0;
    while (i < __len) {
      const chStart = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chStart) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i >= __len ) {
      return;
    }
    const metricStart = i;
    while (i < __len) {
      const chMetric = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chMetric) ) {
        break;
      }
      i = i + 1;
    };
    const metricEnd = i;
    if ( metricEnd > metricStart ) {
      cv.name = ((valueSlice.peek(metricStart)).read((metricEnd - metricStart))).toString();
    }
    while (i < __len) {
      const chAfterMetric = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chAfterMetric) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i >= __len ) {
      return;
    }
    const valueStart = i;
    while (i < __len) {
      const chNum = valueSlice.charCodeAt(i);
      if ( ((chNum == 124) || (chNum == 59)) || valueSlice.isWhitespace(chNum) ) {
        break;
      }
      i = i + 1;
    };
    const valueEnd = i;
    if ( valueEnd > valueStart ) {
      const valueToken = (valueSlice.peek(valueStart)).read((valueEnd - valueStart));
      cv.value = (valueToken).toString();
      if ( valueToken.hasDouble(0, ((valueToken).length() - 1)) ) {
        cv.numericValue = valueToken.parseDouble(0, ((valueToken).length() - 1));
        cv.hasNumeric = true;
      }
    }
    if ( i < __len ) {
      const sep = valueSlice.charCodeAt(i);
      if ( (sep == 124) || (sep == 59) ) {
        i = i + 1;
        while (i < __len) {
          const chUnitStart = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chUnitStart) ) {
            i = i + 1;
          } else {
            break;
          }
        };
        const unitStart = i;
        while (i < __len) {
          const chUnit = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chUnit) ) {
            break;
          }
          i = i + 1;
        };
        const unitEnd = i;
        if ( unitEnd > unitStart ) {
          cv.unit = ((valueSlice.peek(unitStart)).read((unitEnd - unitStart))).toString();
        }
        while (i < __len) {
          const chBeforeToken = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chBeforeToken) ) {
            i = i + 1;
          } else {
            break;
          }
        };
        while (i < __len) {
          const tokenStart = i;
          while (i < __len) {
            const chToken = valueSlice.charCodeAt(i);
            if ( valueSlice.isWhitespace(chToken) ) {
              break;
            }
            i = i + 1;
          };
          const tokenEnd = i;
          if ( tokenEnd > tokenStart ) {
            const tokenSlice = (valueSlice.peek(tokenStart)).read((tokenEnd - tokenStart));
            const tokenLen = (tokenSlice).length();
            let colonAt = -1;
            let j = 0;
            while (j < tokenLen) {
              if ( tokenSlice.charCodeAt(j) == 58 ) {
                colonAt = j;
                break;
              }
              j = j + 1;
            };
            if ( (colonAt > 0) && (colonAt < (tokenLen - 1)) ) {
              const key = ((tokenSlice.peek(0)).read(colonAt)).toString();
              const valSlice = (tokenSlice.peek((colonAt + 1))).read((tokenLen - (colonAt + 1)));
              const valLen = (valSlice).length();
              if ( key == "basis" ) {
                cv.basis = (valSlice).toString();
              }
              if ( key == "source" ) {
                cv.source = (valSlice).toString();
              }
              if ( key == "confidence" ) {
                if ( valLen > 0 ) {
                  const lastCh = valSlice.charCodeAt((valLen - 1));
                  if ( lastCh == 37 ) {
                    if ( valLen > 1 ) {
                      const numSlice = (valSlice.peek(0)).read((valLen - 1));
                      if ( numSlice.hasDouble(0, ((numSlice).length() - 1)) ) {
                        cv.confidence = numSlice.parseDouble(0, ((numSlice).length() - 1));
                        cv.hasConfidence = true;
                      }
                    }
                  } else {
                    if ( valSlice.hasDouble(0, ((valSlice).length() - 1)) ) {
                      cv.confidence = valSlice.parseDouble(0, ((valSlice).length() - 1));
                      cv.hasConfidence = true;
                    }
                  }
                }
              }
              if ( key == "goodness" ) {
                if ( valSlice.hasInteger(0, ((valSlice).length() - 1)) ) {
                  cv.goodness = valSlice.parseInteger(0, ((valSlice).length() - 1));
                  cv.hasGoodness = true;
                }
              }
            }
          }
          while (i < __len) {
            const chGap = valueSlice.charCodeAt(i);
            if ( valueSlice.isWhitespace(chGap) ) {
              i = i + 1;
            } else {
              break;
            }
          };
        };
      }
    }
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len > 1 ) {
      const quote = slice.charCodeAt(0);
      if ( (quote == 34) || (quote == 39) ) {
        const lineEndQuoted = this.findLineEnd(slice, 1);
        const contentStart = 1;
        let contentEnd = lineEndQuoted;
        if ( (lineEndQuoted > 1) && (slice.charCodeAt((lineEndQuoted - 1)) == quote) ) {
          contentEnd = lineEndQuoted - 1;
        }
        if ( contentEnd <= contentStart ) {
          return this.noMatch();
        }
        const outQuoted = slice.read(lineEndQuoted);
        outQuoted.tag = "comment";
        const contentSlice = (slice.peek(contentStart)).read((contentEnd - contentStart));
        const textToken = contentSlice.read((contentEnd - contentStart));
        textToken.tag = "text";
        outQuoted.addChild(textToken);
        const quotedValue = new ContextEntryValue();
        quotedValue.kind = "comment";
        quotedValue.content = (contentSlice).toString();
        const quotedParsed = SliceParsedValue.fromContextEntry(quotedValue);
        outQuoted.setSliceValue(quotedParsed);
        slice.setSliceValue(quotedParsed);
        return outQuoted;
      }
    }
    const kind = this.detectKind(slice);
    const kindLen = kind.length;
    if ( kindLen == 0 ) {
      return this.noMatch();
    }
    const keyLen = kindLen + 1;
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    const lineEnd = this.findLineEnd(slice, keyLen);
    const out = slice.read(lineEnd);
    out.tag = this.toTag(kind);
    const labelLen = keyLen - 1;
    const label = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    if ( keyLen < lineEnd ) {
      const contentSlice_1 = (slice.peek(keyLen)).read((lineEnd - keyLen));
      const content = (contentSlice_1).toString();
      if ( (content.length) > 0 ) {
        const textToken_1 = contentSlice_1.read((content.length));
        textToken_1.tag = "text";
        out.addChild(textToken_1);
      }
    }
    const cv = new ContextEntryValue();
    cv.kind = kind;
    if ( keyLen < lineEnd ) {
      cv.content = ((slice.peek(keyLen)).read((lineEnd - keyLen))).toString();
    }
    if ( kind == "derived" ) {
      if ( keyLen < lineEnd ) {
        const derivedSlice = (slice.peek(keyLen)).read((lineEnd - keyLen));
        this.parseDerivedFields(cv, derivedSlice);
      }
    }
    if ( kind == "custom" ) {
      const customSlice = (slice.peek(keyLen)).read((lineEnd - keyLen));
      const customLen = (customSlice).length();
      let fieldStart = 0;
      while (fieldStart < customLen) {
        const chStart = customSlice.charCodeAt(fieldStart);
        if ( customSlice.isWhitespace(chStart) ) {
          fieldStart = fieldStart + 1;
        } else {
          break;
        }
      };
      let fieldEnd = fieldStart;
      while (fieldEnd < customLen) {
        const chField = customSlice.charCodeAt(fieldEnd);
        if ( customSlice.isWhitespace(chField) ) {
          break;
        }
        fieldEnd = fieldEnd + 1;
      };
      if ( fieldEnd > fieldStart ) {
        cv.name = ((customSlice.peek(fieldStart)).read((fieldEnd - fieldStart))).toString();
        let valueStart = fieldEnd;
        while (valueStart < customLen) {
          const chValueStart = customSlice.charCodeAt(valueStart);
          if ( customSlice.isWhitespace(chValueStart) ) {
            valueStart = valueStart + 1;
          } else {
            break;
          }
        };
        if ( valueStart < customLen ) {
          const valueSlice = (customSlice.peek(valueStart)).read((customLen - valueStart));
          cv.value = (valueSlice).toString();
          if ( valueSlice.hasDouble(0, ((valueSlice).length() - 1)) ) {
            cv.numericValue = valueSlice.parseDouble(0, ((valueSlice).length() - 1));
            cv.hasNumeric = true;
          }
        }
      }
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
    const lLen = slice.findNumberEnd(0);
    if ( lLen <= 0 ) {
      return this.noMatch();
    }
    if ( false == slice.hasInteger(0, (lLen - 1)) ) {
      return this.noMatch();
    }
    if ( lLen >= __len ) {
      return this.noMatch();
    }
    const sep = slice.charCodeAt(lLen);
    if ( sep == 45 ) {
      const rightAStart = lLen + 1;
      if ( rightAStart >= __len ) {
        return this.noMatch();
      }
      const rightA = slice.peek(rightAStart);
      const rLenA = rightA.findNumberEnd(0);
      if ( rLenA <= 0 ) {
        return this.noMatch();
      }
      if ( false == rightA.hasInteger(0, (rLenA - 1)) ) {
        return this.noMatch();
      }
      if ( (rLenA + 1) > (rightA).length() ) {
        return this.noMatch();
      }
      if ( rightA.charCodeAt(rLenA) != 109 ) {
        return this.noMatch();
      }
      const lvalA = slice.parseInteger(0, (lLen - 1));
      const rvalA = rightA.parseInteger(0, (rLenA - 1));
      if ( (lvalA <= 0) || (rvalA <= 0) ) {
        return this.noMatch();
      }
      const outA = slice.read(((rightAStart + rLenA) + 1));
      outA.tag = this.detectedTag;
      return outA;
    }
    if ( sep != 109 ) {
      return this.noMatch();
    }
    const lLenB = lLen;
    if ( (lLenB + 2) > __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt((lLenB + 1)) != 45 ) {
      return this.noMatch();
    }
    const rightBStart = lLenB + 2;
    if ( rightBStart >= __len ) {
      return this.noMatch();
    }
    const rightB = slice.peek(rightBStart);
    const rLenB = rightB.findNumberEnd(0);
    if ( rLenB <= 0 ) {
      return this.noMatch();
    }
    if ( rightB.hasInteger(0, (rLenB - 1)) ) {
    } else {
      return this.noMatch();
    }
    if ( (rLenB + 1) > (rightB).length() ) {
      return this.noMatch();
    }
    if ( rightB.charCodeAt(rLenB) != 109 ) {
      return this.noMatch();
    }
    const lvalB = slice.parseInteger(0, (lLenB - 1));
    const rvalB = rightB.parseInteger(0, (rLenB - 1));
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
class SemicolonSeparatorDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "space";
  }
  detect (slice) {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 59 ) {
      return this.noMatch();
    }
    const out = slice.read(1);
    out.tag = this.detectedTag;
    return out;
  };
}
SemicolonSeparatorDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new SemicolonSeparatorDetector(s);
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
    const subReg = NGSubParserDetectors.__singleton();
    const detectors = subReg.getKcalChildDetectors();
    const p = Parser.fromSlice(slice, detectors);
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
    const subReg = NGSubParserDetectors.__singleton();
    const detectors = subReg.getBpmChildDetectors();
    const p = Parser.fromSlice(slice, detectors);
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
    const subReg = NGSubParserDetectors.__singleton();
    const detectors = subReg.getRmChildDetectors();
    const p = Parser.fromSlice(slice, detectors);
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
  romanPrefixLen (slice) {
    const shared = NGSharedLists.__singleton();
    const candidates = shared.defaultRomanZonePrefixTokens();
    let i = 0;
    const cnt = candidates.length;
    while (i < cnt) {
      const token = candidates[i];
      if ( slice.hasToken(token) ) {
        return token.length;
      }
      i = i + 1;
    };
    return 0;
  };
  detect (slice) {
    const tokenLen = this.romanPrefixLen(slice);
    if ( tokenLen == 0 ) {
      return this.noMatch();
    }
    const __len = (slice).length();
    if ( __len > tokenLen ) {
      if ( slice.isAlphaNumAt(tokenLen) ) {
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
class PhaseDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "phase";
  }
  findLineEnd (slice, from) {
    return slice.findLineEnd(from);
  };
  detect (slice) {
    if ( slice.hasToken("Phase") ) {
    } else {
      return this.noMatch();
    }
    const lineEnd = this.findLineEnd(slice, 0);
    if ( lineEnd <= 5 ) {
      return this.noMatch();
    }
    let keyEnd = 0;
    while (keyEnd < lineEnd) {
      const ch = slice.charCodeAt(keyEnd);
      if ( slice.isWhitespace(ch) ) {
        break;
      }
      if ( ch == 124 ) {
        break;
      }
      keyEnd = keyEnd + 1;
    };
    if ( keyEnd <= 0 ) {
      return this.noMatch();
    }
    const keyText = (slice.read(keyEnd)).toString();
    if ( (keyText.substring(0, 5 )) == "Phase" ) {
    } else {
      return this.noMatch();
    }
    let contentStart = keyEnd;
    if ( contentStart < lineEnd ) {
      const chSep = slice.charCodeAt(contentStart);
      if ( (chSep == 124) || slice.isWhitespace(chSep) ) {
        contentStart = contentStart + 1;
      }
    }
    while (contentStart < lineEnd) {
      const chSpace = slice.charCodeAt(contentStart);
      if ( slice.isWhitespace(chSpace) ) {
        contentStart = contentStart + 1;
      } else {
        break;
      }
    };
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label = slice.read(keyEnd);
    label.tag = "keyword";
    out.addChild(label);
    if ( contentStart < lineEnd ) {
      const contentSlice = (slice.peek(contentStart)).read((lineEnd - contentStart));
      const textToken = contentSlice.read((lineEnd - contentStart));
      textToken.tag = "text";
      out.addChild(textToken);
    }
    return out;
  };
}
PhaseDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new PhaseDetector(s);
};
class HeadingDataDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "heading-data";
  }
  hasIsoDatePrefix (slice, start) {
    if ( (start + 10) > (slice).length() ) {
      return false;
    }
    if ( slice.isDigitAt((start + 0)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt((start + 1)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt((start + 2)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt((start + 3)) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt((start + 4)) == 45 ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt((start + 5)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt((start + 6)) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt((start + 7)) == 45 ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt((start + 8)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt((start + 9)) ) {
    } else {
      return false;
    }
    return true;
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) == 91 ) {
      let closeIdx = 1;
      while (closeIdx < __len) {
        const chClose = slice.charCodeAt(closeIdx);
        if ( (chClose == 10) || (chClose == 13) ) {
          break;
        }
        if ( chClose == 93 ) {
          break;
        }
        closeIdx = closeIdx + 1;
      };
      if ( (closeIdx < __len) && (slice.charCodeAt(closeIdx) == 93) ) {
        if ( this.hasIsoDatePrefix(slice, 1) ) {
          let i2 = closeIdx + 1;
          while (i2 < __len) {
            const chSpace = slice.charCodeAt(i2);
            if ( slice.isWhitespace(chSpace) ) {
              i2 = i2 + 1;
            } else {
              break;
            }
          };
          let hashCount = 0;
          while (i2 < __len) {
            if ( slice.charCodeAt(i2) == 35 ) {
              hashCount = hashCount + 1;
              i2 = i2 + 1;
            } else {
              break;
            }
          };
          if ( hashCount >= 1 ) {
            if ( (i2 < __len) && (slice.charCodeAt(i2) == 32) ) {
              i2 = i2 + 1;
              if ( i2 < __len ) {
                let j = i2;
                while (j < __len) {
                  const chJ = slice.charCodeAt(j);
                  if ( (chJ == 10) || (chJ == 13) ) {
                    break;
                  }
                  j = j + 1;
                };
                if ( j > i2 ) {
                  const out2 = slice.read(j);
                  out2.tag = this.detectedTag;
                  return out2;
                }
              }
            }
          }
        }
      }
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
  ds.push(DistanceRangeBlockDetector.create());
  ds.push(RepeatBlockDetector.create());
  ds.push(NumRangeBlockDetector.create());
  ds.push(RMDetector.create());
  ds.push(ZoneDetector.create());
  ds.push(RomanZoneDetector.create());
  ds.push(RecoveryTimeDetector.create());
  ds.push(TimeValueDetector.create());
  ds.push(RecoveryDetector.create());
  ds.push(LeftRightDetector.create());
  ds.push(FeelingDetector.create());
  ds.push(EffortDetector.create());
  ds.push(BodyMetricDetector.create());
  ds.push(CircuitDetector.create());
  ds.push(PhaseDetector.create());
  ds.push(ContextEntryDetector.create());
  ds.push(SportExerciseDetector.create());
  ds.push(DecimalNumberDetector.create());
  ds.push(PositiveIntegerDetector.create());
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
  addKeywordTailChildren (out, payload) {
    const rbDetector = RepeatBlockDetector.create();
    const rb = rbDetector.detect(payload);
    if ( false == (rb.tag == "repeat-block") ) {
      this.addChildrenFromParser(out, payload);
      return;
    }
    out.addChild(rb);
    let restStart = (rb).length();
    const __len = (payload).length();
    while (restStart < __len) {
      const ch = payload.charCodeAt(restStart);
      if ( payload.isWhitespace(ch) ) {
        restStart = restStart + 1;
      } else {
        break;
      }
    };
    if ( restStart < __len ) {
      const rest = (payload.peek(restStart)).read((__len - restStart));
      this.addChildrenFromParser(out, rest);
    }
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
        if ( payload.isWhitespace(cht) ) {
          tailStart = tailStart + 1;
        } else {
          break;
        }
      };
      if ( tailStart < __len ) {
        const tail = (payload.peek(tailStart)).read((__len - tailStart));
        this.addKeywordTailChildren(out, tail);
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
    const lineEnd = slice.findLineEnd(markerEnd);
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
    this.sportExerciseChildDetectors = [];
  }
  createSportExerciseChildDetectors () {
    if ( (this.sportExerciseChildDetectors.length) > 0 ) {
      return this.sportExerciseChildDetectors;
    }
    let ds = [];
    ds.push(SpaceDetector.create());
    ds.push(SemicolonSeparatorDetector.create());
    ds.push(NewlineDetector.create());
    ds.push(DateTimeDetector.create());
    ds.push(SpeedDetector.create());
    ds.push(KCALDetector.create());
    ds.push(BPMDetector.create());
    ds.push(DistanceRangeBlockDetector.create());
    ds.push(RepeatBlockDetector.create());
    ds.push(NumRangeBlockDetector.create());
    ds.push(RMDetector.create());
    ds.push(ZoneDetector.create());
    ds.push(RomanZoneDetector.create());
    ds.push(RecoveryTimeDetector.create());
    ds.push(TimeValueDetector.create());
    ds.push(RecoveryDetector.create());
    ds.push(LeftRightDetector.create());
    ds.push(FeelingDetector.create());
    ds.push(EffortDetector.create());
    ds.push(BodyMetricDetector.create());
    ds.push(CircuitDetector.create());
    ds.push(PhaseDetector.create());
    ds.push(ContextEntryDetector.create());
    ds.push(DecimalNumberDetector.create());
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("min"));
    ds.push(KeywordDetector.create("h"));
    ds.push(AMTimeValueDetector.create());
    ds.push(DetailsDataDetector.create());
    ds.push(HeadingDataDetector.create());
    this.sportExerciseChildDetectors = ds;
    return this.sportExerciseChildDetectors;
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
  constructor(noMatchSlice, sportNames, ds) {
    super()
    this.sports = [];
    this.childDetectors = [];
    this.cachedNoMatch = noMatchSlice;
    this.sports = sportNames;
    this.childDetectors = ds;
    this.detectedTag = "exercise";
  }
  createChildDetectors () {
    return this.childDetectors;
  };
  startsWithToken (slice, token) {
    const tLen = token.length;
    if ( tLen > (slice).length() ) {
      return false;
    }
    let i = 0;
    while (i < tLen) {
      if ( slice.charCodeAt(i) == (token.charCodeAt(i )) ) {
      } else {
        return false;
      }
      i = i + 1;
    };
    return true;
  };
  isUppercaseLetter (ch) {
    return (ch >= 65) && (ch <= 90);
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
  isReservedGenericName (name) {
    const shared = NGSharedLists.__singleton();
    return shared.isReservedGenericExerciseName(name);
  };
  scanGenericNameEnd (slice) {
    const __len = (slice).length();
    if ( __len <= 0 ) {
      return -1;
    }
    if ( false == this.isUppercaseLetter(slice.charCodeAt(0)) ) {
      return -1;
    }
    let pos = 1;
    while (pos < __len) {
      const ch = slice.charCodeAt(pos);
      if ( this.isLetter(ch) ) {
        pos = pos + 1;
      } else {
        break;
      }
    };
    let nameEnd = pos;
    while (pos < __len) {
      const gapStart = pos;
      while (pos < __len) {
        const gapCh = slice.charCodeAt(pos);
        if ( slice.isWhitespace(gapCh) ) {
          pos = pos + 1;
        } else {
          break;
        }
      };
      if ( pos >= __len ) {
        break;
      }
      if ( false == this.isUppercaseLetter(slice.charCodeAt(pos)) ) {
        break;
      }
      pos = pos + 1;
      while (pos < __len) {
        const ch2 = slice.charCodeAt(pos);
        if ( this.isLetter(ch2) ) {
          pos = pos + 1;
        } else {
          break;
        }
      };
      nameEnd = pos;
    };
    return nameEnd;
  };
  isSeparator (slice, index) {
    if ( slice.isWhitespaceAt(index) ) {
      return true;
    }
    if ( slice.charCodeAt(index) == 59 ) {
      return true;
    }
    return false;
  };
  trimEnd (slice, endPos) {
    let out = endPos;
    while (out > 0) {
      const ch = slice.charCodeAt((out - 1));
      if ( slice.isWhitespace(ch) ) {
        out = out - 1;
      } else {
        break;
      }
    };
    return out;
  };
  detect (slice) {
    const __len = (slice).length();
    if ( __len <= 0 ) {
      return this.noMatch();
    }
    const lineEnd = slice.findLineEnd(0);
    if ( lineEnd <= 0 ) {
      return this.noMatch();
    }
    let startPos = 0;
    while (startPos < lineEnd) {
      const chStart = slice.charCodeAt(startPos);
      if ( slice.isWhitespace(chStart) ) {
        startPos = startPos + 1;
      } else {
        break;
      }
    };
    if ( startPos >= lineEnd ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(startPos) == 62 ) {
      return this.noMatch();
    }
    let semicolonPos = -1;
    let p = 0;
    while (p < lineEnd) {
      if ( slice.charCodeAt(p) == 59 ) {
        semicolonPos = p;
        break;
      }
      p = p + 1;
    };
    const explicitNameMode = semicolonPos >= 0;
    let matched = false;
    if ( explicitNameMode ) {
      matched = true;
    } else {
      for ( let i = 0; i < this.sports.length; i++) {
        var sportName = this.sports[i];
        const sportLen = sportName.length;
        if ( lineEnd < sportLen ) {
          continue;
        }
        if ( false == this.startsWithToken(slice, sportName) ) {
          continue;
        }
        if ( lineEnd == sportLen ) {
          matched = true;
          break;
        }
        if ( this.isSeparator(slice, sportLen) ) {
          matched = true;
          break;
        }
      };
      if ( matched == false ) {
        const genericLen = this.scanGenericNameEnd(slice);
        if ( genericLen > 1 ) {
          const genericName = (slice.read(genericLen)).toString();
          if ( this.isReservedGenericName(genericName) ) {
            return this.noMatch();
          }
          if ( genericLen == lineEnd ) {
            matched = true;
          } else {
            if ( this.isSeparator(slice, genericLen) ) {
              matched = true;
            }
          }
        }
      }
    }
    if ( matched == false ) {
      return this.noMatch();
    }
    let nameEnd = lineEnd;
    if ( semicolonPos >= 0 ) {
      nameEnd = semicolonPos;
    }
    nameEnd = this.trimEnd(slice, nameEnd);
    if ( nameEnd <= 0 ) {
      return this.noMatch();
    }
    const nameToken = slice.read(nameEnd);
    nameToken.tag = "exercise-name";
    const out = slice.read(lineEnd);
    out.tag = this.detectedTag;
    out.addChild(nameToken);
    if ( semicolonPos >= 0 ) {
      let restStart = semicolonPos + 1;
      while (restStart < lineEnd) {
        if ( this.isSeparator(slice, restStart) ) {
          restStart = restStart + 1;
        } else {
          break;
        }
      };
      if ( restStart < lineEnd ) {
        const restSlice = (slice.peek(restStart)).read((lineEnd - restStart));
        const p_2 = Parser.fromSlice(restSlice, this.createChildDetectors());
        (p_2).start();
        const children = p_2.getResults();
        for ( let j = 0; j < children.length; j++) {
          var ch = children[j];
          out.addChild(ch);
        };
      }
    }
    return out;
  };
}
SportExerciseDetector.create = function() {
  const shared = NGSharedLists.__singleton();
  const factory = NGSharedDetectorFactory.__singleton();
  const sportNames = shared.defaultSportNames();
  const ds = factory.createSportExerciseChildDetectors();
  const s = TokenDetector.createNoMatchSlice();
  return new SportExerciseDetector(s, sportNames, ds);
};
SportExerciseDetector.createWithSports = function(sportNames) {
  const factory = NGSharedDetectorFactory.__singleton();
  const ds = factory.createSportExerciseChildDetectors();
  const s = TokenDetector.createNoMatchSlice();
  return new SportExerciseDetector(s, sportNames, ds);
};
class NGExpectRule  {
  constructor() {
    this.testIndex = -1;
    this.negated = false;
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
    if ( (this).startsWith(body, "not ") ) {
      out.negated = true;
      body = (this).trim((body.substring(4, (body.length) )));
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
  endsWithText (text, suffix) {
    const tLen = text.length;
    const sLen = suffix.length;
    if ( sLen > tLen ) {
      return false;
    }
    return (text.substring((tLen - sLen), tLen )) == suffix;
  };
  normalizeJsonNumericText (text) {
    let out = (this).trim(text);
    while (this.endsWithText(out, ".0")) {
      out = out.substring(0, ((out.length) - 2) );
    };
    return out;
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
    if ( kind == "effort" ) {
      return JSON.stringify((token.getAsEffortValue()).toDictionary());
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
        if ( tail == "loadMode" ) {
          return rb.loadMode;
        }
        if ( tail == "partCount" ) {
          return "" + (rb.parts.length);
        }
        if ( (this).startsWith(tail, "parts.") ) {
          const rest1 = tail.substring(6, (tail.length) );
          const dotPos3 = this.findDot(rest1);
          let idxText_1 = rest1;
          let fieldName = "";
          if ( dotPos3 >= 0 ) {
            idxText_1 = rest1.substring(0, dotPos3 );
            fieldName = rest1.substring((dotPos3 + 1), (rest1.length) );
          }
          const idxSlice2 = TokenSlice.fromText(idxText_1);
          if ( (idxSlice2).length() == 0 ) {
            return "";
          }
          if ( idxSlice2.hasInteger(0, ((idxSlice2).length() - 1)) ) {
          } else {
            return "";
          }
          const partIdx = idxSlice2.parseInteger(0, ((idxSlice2).length() - 1));
          if ( (partIdx < 0) || (partIdx >= (rb.parts.length)) ) {
            return "";
          }
          const part = rb.parts[partIdx];
          if ( (fieldName.length) == 0 ) {
            return part.kind;
          }
          if ( fieldName == "kind" ) {
            return part.kind;
          }
          if ( fieldName == "value" ) {
            if ( part.kind == "positive-integer" ) {
              if ( (typeof(part.positiveInteger) !== "undefined" && part.positiveInteger != null )  ) {
                return "" + ((part.positiveInteger)).value;
              }
            }
            if ( part.kind == "distance" ) {
              if ( (typeof(part.distance) !== "undefined" && part.distance != null )  ) {
                return "" + ((part.distance)).value;
              }
            }
            if ( part.kind == "weight" ) {
              if ( (typeof(part.weight) !== "undefined" && part.weight != null )  ) {
                return "" + ((part.weight)).value;
              }
            }
            if ( part.kind == "duration" ) {
              if ( (typeof(part.duration) !== "undefined" && part.duration != null )  ) {
                return "" + ((part.duration)).value;
              }
            }
            if ( part.kind == "percentage" ) {
              if ( (typeof(part.percentage) !== "undefined" && part.percentage != null )  ) {
                return "" + ((part.percentage)).value;
              }
            }
            return "";
          }
          if ( fieldName == "min" ) {
            if ( part.kind == "num-range" ) {
              if ( (typeof(part.numRange) !== "undefined" && part.numRange != null )  ) {
                return "" + ((part.numRange)).minValue;
              }
            }
            if ( part.kind == "percentage-range" ) {
              if ( (typeof(part.percentageRange) !== "undefined" && part.percentageRange != null )  ) {
                return "" + ((part.percentageRange)).minValue;
              }
            }
            return "";
          }
          if ( fieldName == "max" ) {
            if ( part.kind == "num-range" ) {
              if ( (typeof(part.numRange) !== "undefined" && part.numRange != null )  ) {
                return "" + ((part.numRange)).maxValue;
              }
            }
            if ( part.kind == "percentage-range" ) {
              if ( (typeof(part.percentageRange) !== "undefined" && part.percentageRange != null )  ) {
                return "" + ((part.percentageRange)).maxValue;
              }
            }
            return "";
          }
          if ( fieldName == "unit" ) {
            if ( part.kind == "distance" ) {
              if ( (typeof(part.distance) !== "undefined" && part.distance != null )  ) {
                return ((part.distance)).unit;
              }
            }
            if ( part.kind == "weight" ) {
              if ( (typeof(part.weight) !== "undefined" && part.weight != null )  ) {
                return ((part.weight)).unit;
              }
            }
            if ( part.kind == "duration" ) {
              if ( (typeof(part.duration) !== "undefined" && part.duration != null )  ) {
                return ((part.duration)).unit;
              }
            }
            return "";
          }
          return "";
        }
      }
      if ( kind == "left-right" ) {
        const lr = token.getAsLeftRightValue();
        if ( tail == "side" ) {
          return lr.side;
        }
      }
      if ( kind == "feeling" ) {
        const fv = token.getAsFeelingValue();
        if ( (tail == "type") || (tail == "subKind") ) {
          return fv.kind;
        }
        if ( tail == "score" ) {
          return "" + fv.score;
        }
      }
      if ( kind == "effort" ) {
        const ev = token.getAsEffortValue();
        if ( (tail == "type") || (tail == "subKind") ) {
          return ev.kind;
        }
        if ( tail == "score" ) {
          return "" + ev.score;
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
        if ( (tail == "type") || (tail == "subKind") ) {
          return ce.kind;
        }
        if ( tail == "content" ) {
          return ce.content;
        }
        if ( tail == "name" ) {
          return ce.name;
        }
        if ( tail == "value" ) {
          return ce.value;
        }
        if ( tail == "hasNumeric" ) {
          if ( ce.hasNumeric ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "numericValue" ) {
          return "" + ce.numericValue;
        }
        if ( tail == "customField" ) {
          return ce.name;
        }
        if ( tail == "customValue" ) {
          return ce.value;
        }
        if ( tail == "hasCustomNumeric" ) {
          if ( ce.hasNumeric ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "customNumericValue" ) {
          return "" + ce.numericValue;
        }
        if ( tail == "unit" ) {
          return ce.unit;
        }
        if ( tail == "basis" ) {
          return ce.basis;
        }
        if ( tail == "source" ) {
          return ce.source;
        }
        if ( tail == "hasConfidence" ) {
          if ( ce.hasConfidence ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "confidence" ) {
          return "" + ce.confidence;
        }
        if ( tail == "hasGoodness" ) {
          if ( ce.hasGoodness ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "goodness" ) {
          return "" + ce.goodness;
        }
        if ( tail == "derivedUnit" ) {
          return ce.unit;
        }
        if ( tail == "derivedBasis" ) {
          return ce.basis;
        }
        if ( tail == "derivedSource" ) {
          return ce.source;
        }
        if ( tail == "hasDerivedConfidence" ) {
          if ( ce.hasConfidence ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "derivedConfidence" ) {
          return "" + ce.confidence;
        }
        if ( tail == "hasDerivedGoodness" ) {
          if ( ce.hasGoodness ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "derivedGoodness" ) {
          return "" + ce.goodness;
        }
      }
      if ( kind == "positive-integer" ) {
        const piv = token.getAsPositiveIntegerValue();
        if ( tail == "value" ) {
          return "" + piv.value;
        }
      }
      if ( (tail == "type") || (tail == "subKind") ) {
        return kind;
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
          const tagMatches = root.tag == ex.value;
          if ( ex.negated ) {
            if ( tagMatches ) {
              const msgNotTag = (("Test " + ("#" + ("" + (i + 1)))) + " expect not tag '") + ex.value;
              out.push(msgNotTag + "' but it matched");
            }
          } else {
            if ( tagMatches ) {
            } else {
              const msgTag = (("Test " + ("#" + ("" + (i + 1)))) + " expect tag '") + ex.value;
              out.push(((msgTag + "' but got '") + root.tag) + "'");
            }
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
            const strMatches = got == ex.value;
            if ( ex.negated ) {
              if ( strMatches ) {
                const msgNotStr = (((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + ("" + ex.childIndex)) + " not string '") + ex.value;
                out.push(msgNotStr + "' but it matched");
              }
            } else {
              if ( strMatches ) {
              } else {
                const msgStr = (((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + ("" + ex.childIndex)) + " string '") + ex.value;
                out.push(((msgStr + "' but got '") + got) + "'");
              }
            }
            continue;
          }
          if ( ex.field == "tag" ) {
            const gotTag = ch.tag;
            const tagMatches_1 = gotTag == ex.value;
            if ( ex.negated ) {
              if ( tagMatches_1 ) {
                const msgNotTag_1 = (((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + ("" + ex.childIndex)) + " not tag '") + ex.value;
                out.push(msgNotTag_1 + "' but it matched");
              }
            } else {
              if ( tagMatches_1 ) {
              } else {
                const msgTag_1 = (((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + ("" + ex.childIndex)) + " tag '") + ex.value;
                out.push(((msgTag_1 + "' but got '") + gotTag) + "'");
              }
            }
            continue;
          }
          out.push(((("Test " + ("#" + ("" + (i + 1)))) + " unsupported field '") + ex.field) + "' in Expect child");
          continue;
        }
        if ( ex.kind == "json" ) {
          const gotJson = this.jsonTokenValue(root, ex.field);
          if ( (gotJson.length) == 0 ) {
            if ( ex.negated ) {
              continue;
            }
            out.push(((("Test " + ("#" + ("" + (i + 1)))) + " expect json path '") + ex.field) + "' was not found");
            continue;
          }
          const gotNorm = this.normalizeJsonNumericText(gotJson);
          const expNorm = this.normalizeJsonNumericText(ex.value);
          const jsonMatches = (gotJson == ex.value) || (gotNorm == expNorm);
          if ( ex.negated ) {
            if ( jsonMatches ) {
              const msgNotJson = ((("Test " + ("#" + ("" + (i + 1)))) + " expect json path '") + ex.field) + "' not to be '";
              out.push((msgNotJson + ex.value) + "' but it matched");
            }
          } else {
            if ( jsonMatches ) {
            } else {
              const msgJson = ((("Test " + ("#" + ("" + (i + 1)))) + " expect json path '") + ex.field) + "' value '";
              out.push((((msgJson + ex.value) + "' but got '") + gotJson) + "'");
            }
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
TokenDetectorModule.createEffort = function() {
  return EffortDetector.create();
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
class operatorsOfJSONArrayObject  {
  constructor() {
  }
}
operatorsOfJSONArrayObject.forEach_2 = function(__self, cb) {
  let cnt = __self.length;
  let i = 0;
  while (cnt > 0) {
    const value = __self[i];
    cb(value, i);
    cnt = cnt - 1;
    i = i + 1;
  };
};
module.exports.DateTimeValue = DateTimeValue;
module.exports.DistanceValue = DistanceValue;
module.exports.PercentageValue = PercentageValue;
module.exports.RecoveryTimeValue = RecoveryTimeValue;
module.exports.WeightValue = WeightValue;
module.exports.NumRangeValue = NumRangeValue;
module.exports.PercentageRangeValue = PercentageRangeValue;
module.exports.PositiveIntegerValue = PositiveIntegerValue;
module.exports.DurationValue = DurationValue;
module.exports.TimeValueValue = TimeValueValue;
module.exports.RepeatPartValue = RepeatPartValue;
module.exports.RepeatBlockValue = RepeatBlockValue;
module.exports.ZoneValue = ZoneValue;
module.exports.DetailsLevelValue = DetailsLevelValue;
module.exports.RecoveryValue = RecoveryValue;
module.exports.LeftRightValue = LeftRightValue;
module.exports.FeelingValue = FeelingValue;
module.exports.EffortValue = EffortValue;
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
module.exports.DistanceDetector = DistanceDetector;
module.exports.RecoveryTimeDetector = RecoveryTimeDetector;
module.exports.AMTimeValueDetector = AMTimeValueDetector;
module.exports.PercentageDetector = PercentageDetector;
module.exports.Parser = Parser;
module.exports.NumRangeBlockDetector = NumRangeBlockDetector;
module.exports.PercentageRangeDetector = PercentageRangeDetector;
module.exports.DurationDetector = DurationDetector;
module.exports.NGSubParserDetectors = NGSubParserDetectors;
module.exports.WeightDetector = WeightDetector;
module.exports.RepeatBlockDetector = RepeatBlockDetector;
module.exports.SpeedDetector = SpeedDetector;
module.exports.ZoneDetector = ZoneDetector;
module.exports.NGChildDetectorRegistry = NGChildDetectorRegistry;
module.exports.RecoveryDetector = RecoveryDetector;
module.exports.LeftRightDetector = LeftRightDetector;
module.exports.FeelingDetector = FeelingDetector;
module.exports.EffortDetector = EffortDetector;
module.exports.BodyMetricDetector = BodyMetricDetector;
module.exports.CircuitDetector = CircuitDetector;
module.exports.NGSharedLists = NGSharedLists;
module.exports.ContextEntryDetector = ContextEntryDetector;
module.exports.DistanceRangeBlockDetector = DistanceRangeBlockDetector;
module.exports.SemicolonSeparatorDetector = SemicolonSeparatorDetector;
module.exports.KCALDetector = KCALDetector;
module.exports.BPMDetector = BPMDetector;
module.exports.RMDetector = RMDetector;
module.exports.RomanZoneDetector = RomanZoneDetector;
module.exports.PhaseDetector = PhaseDetector;
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
