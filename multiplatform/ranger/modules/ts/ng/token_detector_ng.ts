type union_Any = DateTimeValue|DistanceValue|PercentageValue|RecoveryTimeValue|WeightValue|NumRangeValue|PercentageRangeValue|PositiveIntegerValue|DurationValue|TimeValueValue|RepeatPartValue|RepeatBlockValue|ZoneValue|DetailsLevelValue|RecoveryValue|LeftRightValue|FeelingValue|EffortValue|BodyMetricValue|CircuitValue|ContextEntryValue|SliceParsedValue|TokenSlice|TokenDetector|KeywordDetector|DateTimeDetector|SpaceDetector|NewlineDetector|PositiveIntegerDetector|DecimalNumberDetector|TimeValueDetector|DistanceDetector|RecoveryTimeDetector|AMTimeValueDetector|PercentageDetector|Parser|NumRangeBlockDetector|PercentageRangeDetector|DurationDetector|NGSubParserDetectors|WeightDetector|RepeatBlockDetector|SpeedDetector|ZoneDetector|NGChildDetectorRegistry|RecoveryDetector|LeftRightDetector|FeelingDetector|EffortDetector|BodyMetricDetector|CircuitDetector|NGSharedLists|ContextEntryDetector|DistanceRangeBlockDetector|SemicolonSeparatorDetector|KCALDetector|BPMDetector|RMDetector|RomanZoneDetector|PhaseDetector|HeadingDataDetector|StandardDetectors|DetailsDataDetector|NGSharedDetectorFactory|SportExerciseDetector|NGExpectRule|NGTestCase|NGTestSpecParser|NGTestRunner|TokenDetectorModule|number|string|boolean|number;
export class DateTimeValue  {
  kind: string;
  year: number;
  month: number;
  day: number;
  hasTime: boolean;
  hour: number;
  minute: number;
  second: number;
  timezone?: string;
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
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
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
  static fromDictionary (dict : Record<string, any>) : DateTimeValue  {
    const obj : DateTimeValue  = new DateTimeValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["year"]) ) ? undefined : parseInt(dict ["year"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.year = v_1;
      }
      const v_2 : number | undefined  = isNaN( parseInt(dict ["month"]) ) ? undefined : parseInt(dict ["month"]) 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.month = v_2;
      }
      const v_3 : number | undefined  = isNaN( parseInt(dict ["day"]) ) ? undefined : parseInt(dict ["day"]) 
      ;
      if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
        obj.day = v_3;
      }
      const v_4 : boolean | undefined  = typeof(dict ["hasTime"]) === "undefined" ? undefined :(dict ["hasTime"]) ;
      if ( (typeof(v_4) !== "undefined" && v_4 != null )  ) {
        obj.hasTime = v_4;
      }
      const v_5 : number | undefined  = isNaN( parseInt(dict ["hour"]) ) ? undefined : parseInt(dict ["hour"]) 
      ;
      if ( (typeof(v_5) !== "undefined" && v_5 != null )  ) {
        obj.hour = v_5;
      }
      const v_6 : number | undefined  = isNaN( parseInt(dict ["minute"]) ) ? undefined : parseInt(dict ["minute"]) 
      ;
      if ( (typeof(v_6) !== "undefined" && v_6 != null )  ) {
        obj.minute = v_6;
      }
      const v_7 : number | undefined  = isNaN( parseInt(dict ["second"]) ) ? undefined : parseInt(dict ["second"]) 
      ;
      if ( (typeof(v_7) !== "undefined" && v_7 != null )  ) {
        obj.second = v_7;
      }
      const v_8 : string | undefined  = (typeof (dict ["timezone"]) != "string" ) ? undefined : dict ["timezone"] 
      ;
      if ( (typeof(v_8) !== "undefined" && v_8 != null )  ) {
        obj.timezone = v_8;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class DistanceValue  {
  kind: string;
  value: number;
  unit: string;
  constructor() {
    this.kind = "distance";
    this.value = 0;
    this.unit = "m";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : DistanceValue  {
    const obj : DistanceValue  = new DistanceValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.value = v_1;
      }
      const v_2 : string | undefined  = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.unit = v_2;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class PercentageValue  {
  kind: string;
  value: number;
  constructor() {
    this.kind = "percentage";
    this.value = 0;
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : PercentageValue  {
    const obj : PercentageValue  = new PercentageValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.value = v_1;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class RecoveryTimeValue  {
  kind: string;
  value: number;
  unit: string;
  constructor() {
    this.kind = "recovery-time";
    this.value = 0;
    this.unit = "";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : RecoveryTimeValue  {
    const obj : RecoveryTimeValue  = new RecoveryTimeValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.value = v_1;
      }
      const v_2 : string | undefined  = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.unit = v_2;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class WeightValue  {
  kind: string;
  value: number;
  unit: string;
  constructor() {
    this.kind = "weight";
    this.value = 0.0;
    this.unit = "kg";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : WeightValue  {
    const obj : WeightValue  = new WeightValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseFloat(dict ["value"]) ) ? undefined : parseFloat(dict ["value"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.value = v_1;
      }
      const v_2 : string | undefined  = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.unit = v_2;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class NumRangeValue  {
  kind: string;
  minValue: number;
  maxValue: number;
  constructor() {
    this.kind = "num-range";
    this.minValue = 0;
    this.maxValue = 0;
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["minValue"] = this.minValue;
      res["maxValue"] = this.maxValue;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : NumRangeValue  {
    const obj : NumRangeValue  = new NumRangeValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["minValue"]) ) ? undefined : parseInt(dict ["minValue"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.minValue = v_1;
      }
      const v_2 : number | undefined  = isNaN( parseInt(dict ["maxValue"]) ) ? undefined : parseInt(dict ["maxValue"]) 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.maxValue = v_2;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class PercentageRangeValue  {
  kind: string;
  minValue: number;
  maxValue: number;
  constructor() {
    this.kind = "percentage-range";
    this.minValue = 0;
    this.maxValue = 0;
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["minValue"] = this.minValue;
      res["maxValue"] = this.maxValue;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : PercentageRangeValue  {
    const obj : PercentageRangeValue  = new PercentageRangeValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["minValue"]) ) ? undefined : parseInt(dict ["minValue"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.minValue = v_1;
      }
      const v_2 : number | undefined  = isNaN( parseInt(dict ["maxValue"]) ) ? undefined : parseInt(dict ["maxValue"]) 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.maxValue = v_2;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class PositiveIntegerValue  {
  kind: string;
  value: number;
  constructor() {
    this.kind = "positive-integer";
    this.value = 0;
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : PositiveIntegerValue  {
    const obj : PositiveIntegerValue  = new PositiveIntegerValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.value = v_1;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class DurationValue  {
  kind: string;
  value: number;
  unit: string;
  constructor() {
    this.kind = "duration";
    this.value = 0;
    this.unit = "";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["value"] = this.value;
      res["unit"] = this.unit;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : DurationValue  {
    const obj : DurationValue  = new DurationValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["value"]) ) ? undefined : parseInt(dict ["value"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.value = v_1;
      }
      const v_2 : string | undefined  = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.unit = v_2;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class TimeValueValue  {
  kind: string;
  minutes: number;
  seconds: number;
  constructor() {
    this.kind = "time-value";
    this.minutes = 0;
    this.seconds = 0;
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["minutes"] = this.minutes;
      res["seconds"] = this.seconds;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : TimeValueValue  {
    const obj : TimeValueValue  = new TimeValueValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["minutes"]) ) ? undefined : parseInt(dict ["minutes"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.minutes = v_1;
      }
      const v_2 : number | undefined  = isNaN( parseInt(dict ["seconds"]) ) ? undefined : parseInt(dict ["seconds"]) 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.seconds = v_2;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class RepeatPartValue  {
  kind: string;
  positiveInteger?: PositiveIntegerValue;
  numRange?: NumRangeValue;
  distance?: DistanceValue;
  weight?: WeightValue;
  duration?: DurationValue;
  timeValue?: TimeValueValue;
  percentage?: PercentageValue;
  percentageRange?: PercentageRangeValue;
  constructor() {
    this.kind = "";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
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
  static fromDictionary (dict : Record<string, any>) : RepeatPartValue  {
    const obj : RepeatPartValue  = new RepeatPartValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const theValue : Record<string, any> | undefined  = (dict["positiveInteger"] instanceof Object ) ? dict ["positiveInteger"] : undefined ;
      if ( (typeof(theValue) !== "undefined" && theValue != null )  ) {
        const newObj : PositiveIntegerValue  = PositiveIntegerValue.fromDictionary((theValue));
        obj.positiveInteger = newObj;
      }
      const theValue_1 : Record<string, any> | undefined  = (dict["numRange"] instanceof Object ) ? dict ["numRange"] : undefined ;
      if ( (typeof(theValue_1) !== "undefined" && theValue_1 != null )  ) {
        const newObj_1 : NumRangeValue  = NumRangeValue.fromDictionary((theValue_1));
        obj.numRange = newObj_1;
      }
      const theValue_2 : Record<string, any> | undefined  = (dict["distance"] instanceof Object ) ? dict ["distance"] : undefined ;
      if ( (typeof(theValue_2) !== "undefined" && theValue_2 != null )  ) {
        const newObj_2 : DistanceValue  = DistanceValue.fromDictionary((theValue_2));
        obj.distance = newObj_2;
      }
      const theValue_3 : Record<string, any> | undefined  = (dict["weight"] instanceof Object ) ? dict ["weight"] : undefined ;
      if ( (typeof(theValue_3) !== "undefined" && theValue_3 != null )  ) {
        const newObj_3 : WeightValue  = WeightValue.fromDictionary((theValue_3));
        obj.weight = newObj_3;
      }
      const theValue_4 : Record<string, any> | undefined  = (dict["duration"] instanceof Object ) ? dict ["duration"] : undefined ;
      if ( (typeof(theValue_4) !== "undefined" && theValue_4 != null )  ) {
        const newObj_4 : DurationValue  = DurationValue.fromDictionary((theValue_4));
        obj.duration = newObj_4;
      }
      const theValue_5 : Record<string, any> | undefined  = (dict["timeValue"] instanceof Object ) ? dict ["timeValue"] : undefined ;
      if ( (typeof(theValue_5) !== "undefined" && theValue_5 != null )  ) {
        const newObj_5 : TimeValueValue  = TimeValueValue.fromDictionary((theValue_5));
        obj.timeValue = newObj_5;
      }
      const theValue_6 : Record<string, any> | undefined  = (dict["percentage"] instanceof Object ) ? dict ["percentage"] : undefined ;
      if ( (typeof(theValue_6) !== "undefined" && theValue_6 != null )  ) {
        const newObj_6 : PercentageValue  = PercentageValue.fromDictionary((theValue_6));
        obj.percentage = newObj_6;
      }
      const theValue_7 : Record<string, any> | undefined  = (dict["percentageRange"] instanceof Object ) ? dict ["percentageRange"] : undefined ;
      if ( (typeof(theValue_7) !== "undefined" && theValue_7 != null )  ) {
        const newObj_7 : PercentageRangeValue  = PercentageRangeValue.fromDictionary((theValue_7));
        obj.percentageRange = newObj_7;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class RepeatBlockValue  {
  kind: string;
  parts!: Array<RepeatPartValue>;
  loadMode: string;
  constructor() {
    this.kind = "repeat-block";
    this.parts = [];
    this.loadMode = "";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      let values : Array<any>  = [];
      for ( let i = 0; i < this.parts.length; i++) {
        var item = this.parts[i];
        const obj : Record<string, any>  = item.toDictionary();
        values.push(obj);
      };
      res["parts"] = values;
      res["loadMode"] = this.loadMode;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : RepeatBlockValue  {
    const obj : RepeatBlockValue  = new RepeatBlockValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const values : Array<any> | undefined  = (dict["parts"] instanceof Array ) ? dict ["parts"] : undefined ;
      if ( (typeof(values) !== "undefined" && values != null )  ) {
        const arr : Array<any>  = values;
        operatorsOfJSONArrayObject.forEach_2(arr, ((item : Object, index : number):void => { 
          if( item instanceof Object ) /* union case */ {
            var oo = item;
            const newObj : RepeatPartValue  = RepeatPartValue.fromDictionary(oo);
            obj.parts.push(newObj);
          };
        }));
      }
      const v_1 : string | undefined  = (typeof (dict ["loadMode"]) != "string" ) ? undefined : dict ["loadMode"] 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.loadMode = v_1;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class ZoneValue  {
  kind: string;
  zone: number;
  constructor() {
    this.kind = "zone";
    this.zone = 0;
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["zone"] = this.zone;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : ZoneValue  {
    const obj : ZoneValue  = new ZoneValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["zone"]) ) ? undefined : parseInt(dict ["zone"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.zone = v_1;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class DetailsLevelValue  {
  kind: string;
  level: number;
  marker: string;
  constructor() {
    this.kind = "details-level";
    this.level = 0;
    this.marker = "";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["level"] = this.level;
      res["marker"] = this.marker;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : DetailsLevelValue  {
    const obj : DetailsLevelValue  = new DetailsLevelValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["level"]) ) ? undefined : parseInt(dict ["level"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.level = v_1;
      }
      const v_2 : string | undefined  = (typeof (dict ["marker"]) != "string" ) ? undefined : dict ["marker"] 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.marker = v_2;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class RecoveryValue  {
  kind: string;
  label: string;
  constructor() {
    this.kind = "recovery";
    this.label = "Recovery";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["label"] = this.label;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : RecoveryValue  {
    const obj : RecoveryValue  = new RecoveryValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : string | undefined  = (typeof (dict ["label"]) != "string" ) ? undefined : dict ["label"] 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.label = v_1;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class LeftRightValue  {
  kind: string;
  side: string;
  constructor() {
    this.kind = "left-right";
    this.side = "";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["side"] = this.side;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : LeftRightValue  {
    const obj : LeftRightValue  = new LeftRightValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : string | undefined  = (typeof (dict ["side"]) != "string" ) ? undefined : dict ["side"] 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.side = v_1;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class FeelingValue  {
  kind: string;
  score: number;
  constructor() {
    this.kind = "feeling";
    this.score = 0;
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["score"] = this.score;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : FeelingValue  {
    const obj : FeelingValue  = new FeelingValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["score"]) ) ? undefined : parseInt(dict ["score"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.score = v_1;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class EffortValue  {
  kind: string;
  score: number;
  constructor() {
    this.kind = "effort";
    this.score = 0;
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["score"] = this.score;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : EffortValue  {
    const obj : EffortValue  = new EffortValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["score"]) ) ? undefined : parseInt(dict ["score"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.score = v_1;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class BodyMetricValue  {
  kind: string;
  metric: string;
  primaryValue: number;
  secondaryValue: number;
  unit: string;
  constructor() {
    this.kind = "body-metric";
    this.metric = "";
    this.primaryValue = 0.0;
    this.secondaryValue = 0;
    this.unit = "";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
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
  static fromDictionary (dict : Record<string, any>) : BodyMetricValue  {
    const obj : BodyMetricValue  = new BodyMetricValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : string | undefined  = (typeof (dict ["metric"]) != "string" ) ? undefined : dict ["metric"] 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.metric = v_1;
      }
      const v_2 : number | undefined  = isNaN( parseFloat(dict ["primaryValue"]) ) ? undefined : parseFloat(dict ["primaryValue"]) 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.primaryValue = v_2;
      }
      const v_3 : number | undefined  = isNaN( parseInt(dict ["secondaryValue"]) ) ? undefined : parseInt(dict ["secondaryValue"]) 
      ;
      if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
        obj.secondaryValue = v_3;
      }
      const v_4 : string | undefined  = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
      ;
      if ( (typeof(v_4) !== "undefined" && v_4 != null )  ) {
        obj.unit = v_4;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class CircuitValue  {
  kind: string;
  rounds: number;
  restValue: number;
  restUnit: string;
  constructor() {
    this.kind = "circuit";
    this.rounds = 0;
    this.restValue = 0;
    this.restUnit = "";
  }
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
    try {
      res["kind"] = this.kind;
      res["rounds"] = this.rounds;
      res["restValue"] = this.restValue;
      res["restUnit"] = this.restUnit;
    } catch(e) {
    }
    return res;
  };
  static fromDictionary (dict : Record<string, any>) : CircuitValue  {
    const obj : CircuitValue  = new CircuitValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : number | undefined  = isNaN( parseInt(dict ["rounds"]) ) ? undefined : parseInt(dict ["rounds"]) 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.rounds = v_1;
      }
      const v_2 : number | undefined  = isNaN( parseInt(dict ["restValue"]) ) ? undefined : parseInt(dict ["restValue"]) 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.restValue = v_2;
      }
      const v_3 : string | undefined  = (typeof (dict ["restUnit"]) != "string" ) ? undefined : dict ["restUnit"] 
      ;
      if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
        obj.restUnit = v_3;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class ContextEntryValue  {
  kind: string;
  content: string;
  name: string;
  value: string;
  hasNumeric: boolean;
  numericValue: number;
  unit: string;
  basis: string;
  source: string;
  hasConfidence: boolean;
  confidence: number;
  hasGoodness: boolean;
  goodness: number;
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
  toDictionary () : Record<string, any>  {
    let res : Record<string, any>  = {};
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
  static fromDictionary (dict : Record<string, any>) : ContextEntryValue  {
    const obj : ContextEntryValue  = new ContextEntryValue();
    try {
      const v : string | undefined  = (typeof (dict ["kind"]) != "string" ) ? undefined : dict ["kind"] 
      ;
      if ( (typeof(v) !== "undefined" && v != null )  ) {
        obj.kind = v;
      }
      const v_1 : string | undefined  = (typeof (dict ["content"]) != "string" ) ? undefined : dict ["content"] 
      ;
      if ( (typeof(v_1) !== "undefined" && v_1 != null )  ) {
        obj.content = v_1;
      }
      const v_2 : string | undefined  = (typeof (dict ["name"]) != "string" ) ? undefined : dict ["name"] 
      ;
      if ( (typeof(v_2) !== "undefined" && v_2 != null )  ) {
        obj.name = v_2;
      }
      const v_3 : string | undefined  = (typeof (dict ["value"]) != "string" ) ? undefined : dict ["value"] 
      ;
      if ( (typeof(v_3) !== "undefined" && v_3 != null )  ) {
        obj.value = v_3;
      }
      const v_4 : boolean | undefined  = typeof(dict ["hasNumeric"]) === "undefined" ? undefined :(dict ["hasNumeric"]) ;
      if ( (typeof(v_4) !== "undefined" && v_4 != null )  ) {
        obj.hasNumeric = v_4;
      }
      const v_5 : number | undefined  = isNaN( parseFloat(dict ["numericValue"]) ) ? undefined : parseFloat(dict ["numericValue"]) 
      ;
      if ( (typeof(v_5) !== "undefined" && v_5 != null )  ) {
        obj.numericValue = v_5;
      }
      const v_6 : string | undefined  = (typeof (dict ["unit"]) != "string" ) ? undefined : dict ["unit"] 
      ;
      if ( (typeof(v_6) !== "undefined" && v_6 != null )  ) {
        obj.unit = v_6;
      }
      const v_7 : string | undefined  = (typeof (dict ["basis"]) != "string" ) ? undefined : dict ["basis"] 
      ;
      if ( (typeof(v_7) !== "undefined" && v_7 != null )  ) {
        obj.basis = v_7;
      }
      const v_8 : string | undefined  = (typeof (dict ["source"]) != "string" ) ? undefined : dict ["source"] 
      ;
      if ( (typeof(v_8) !== "undefined" && v_8 != null )  ) {
        obj.source = v_8;
      }
      const v_9 : boolean | undefined  = typeof(dict ["hasConfidence"]) === "undefined" ? undefined :(dict ["hasConfidence"]) ;
      if ( (typeof(v_9) !== "undefined" && v_9 != null )  ) {
        obj.hasConfidence = v_9;
      }
      const v_10 : number | undefined  = isNaN( parseFloat(dict ["confidence"]) ) ? undefined : parseFloat(dict ["confidence"]) 
      ;
      if ( (typeof(v_10) !== "undefined" && v_10 != null )  ) {
        obj.confidence = v_10;
      }
      const v_11 : boolean | undefined  = typeof(dict ["hasGoodness"]) === "undefined" ? undefined :(dict ["hasGoodness"]) ;
      if ( (typeof(v_11) !== "undefined" && v_11 != null )  ) {
        obj.hasGoodness = v_11;
      }
      const v_12 : number | undefined  = isNaN( parseInt(dict ["goodness"]) ) ? undefined : parseInt(dict ["goodness"]) 
      ;
      if ( (typeof(v_12) !== "undefined" && v_12 != null )  ) {
        obj.goodness = v_12;
      }
    } catch(e) {
    }
    return obj;
  };
}
export class SliceParsedValue  {
  kind: string;
  dateTime?: DateTimeValue;
  distance?: DistanceValue;
  percentage?: PercentageValue;
  recoveryTime?: RecoveryTimeValue;
  weight?: WeightValue;
  numRange?: NumRangeValue;
  percentageRange?: PercentageRangeValue;
  repeatBlock?: RepeatBlockValue;
  zone?: ZoneValue;
  positiveInteger?: PositiveIntegerValue;
  detailsLevel?: DetailsLevelValue;
  recovery?: RecoveryValue;
  timeValue?: TimeValueValue;
  leftRight?: LeftRightValue;
  feeling?: FeelingValue;
  effort?: EffortValue;
  bodyMetric?: BodyMetricValue;
  circuit?: CircuitValue;
  contextEntry?: ContextEntryValue;
  duration?: DurationValue;
  constructor() {
    this.kind = "";
  }
  hasDateTime () : boolean  {
    return (typeof(this.dateTime) !== "undefined" && this.dateTime != null ) ;
  };
  getDateTime () : DateTimeValue  {
    if ( (typeof(this.dateTime) !== "undefined" && this.dateTime != null )  ) {
      return this.dateTime;
    }
    return new DateTimeValue();
  };
  hasDistance () : boolean  {
    return (typeof(this.distance) !== "undefined" && this.distance != null ) ;
  };
  getDistance () : DistanceValue  {
    if ( (typeof(this.distance) !== "undefined" && this.distance != null )  ) {
      return this.distance;
    }
    return new DistanceValue();
  };
  hasPercentage () : boolean  {
    return (typeof(this.percentage) !== "undefined" && this.percentage != null ) ;
  };
  getPercentage () : PercentageValue  {
    if ( (typeof(this.percentage) !== "undefined" && this.percentage != null )  ) {
      return this.percentage;
    }
    return new PercentageValue();
  };
  hasRecoveryTime () : boolean  {
    return (typeof(this.recoveryTime) !== "undefined" && this.recoveryTime != null ) ;
  };
  getRecoveryTime () : RecoveryTimeValue  {
    if ( (typeof(this.recoveryTime) !== "undefined" && this.recoveryTime != null )  ) {
      return this.recoveryTime;
    }
    return new RecoveryTimeValue();
  };
  hasWeight () : boolean  {
    return (typeof(this.weight) !== "undefined" && this.weight != null ) ;
  };
  getWeight () : WeightValue  {
    if ( (typeof(this.weight) !== "undefined" && this.weight != null )  ) {
      return this.weight;
    }
    return new WeightValue();
  };
  hasNumRange () : boolean  {
    return (typeof(this.numRange) !== "undefined" && this.numRange != null ) ;
  };
  getNumRange () : NumRangeValue  {
    if ( (typeof(this.numRange) !== "undefined" && this.numRange != null )  ) {
      return this.numRange;
    }
    return new NumRangeValue();
  };
  hasPercentageRange () : boolean  {
    return (typeof(this.percentageRange) !== "undefined" && this.percentageRange != null ) ;
  };
  getPercentageRange () : PercentageRangeValue  {
    if ( (typeof(this.percentageRange) !== "undefined" && this.percentageRange != null )  ) {
      return this.percentageRange;
    }
    return new PercentageRangeValue();
  };
  hasRepeatBlock () : boolean  {
    return (typeof(this.repeatBlock) !== "undefined" && this.repeatBlock != null ) ;
  };
  getRepeatBlock () : RepeatBlockValue  {
    if ( (typeof(this.repeatBlock) !== "undefined" && this.repeatBlock != null )  ) {
      return this.repeatBlock;
    }
    return new RepeatBlockValue();
  };
  hasZone () : boolean  {
    return (typeof(this.zone) !== "undefined" && this.zone != null ) ;
  };
  getZone () : ZoneValue  {
    if ( (typeof(this.zone) !== "undefined" && this.zone != null )  ) {
      return this.zone;
    }
    return new ZoneValue();
  };
  hasPositiveInteger () : boolean  {
    return (typeof(this.positiveInteger) !== "undefined" && this.positiveInteger != null ) ;
  };
  getPositiveInteger () : PositiveIntegerValue  {
    if ( (typeof(this.positiveInteger) !== "undefined" && this.positiveInteger != null )  ) {
      return this.positiveInteger;
    }
    return new PositiveIntegerValue();
  };
  hasDetailsLevel () : boolean  {
    return (typeof(this.detailsLevel) !== "undefined" && this.detailsLevel != null ) ;
  };
  getDetailsLevel () : DetailsLevelValue  {
    if ( (typeof(this.detailsLevel) !== "undefined" && this.detailsLevel != null )  ) {
      return this.detailsLevel;
    }
    return new DetailsLevelValue();
  };
  hasRecovery () : boolean  {
    return (typeof(this.recovery) !== "undefined" && this.recovery != null ) ;
  };
  getRecovery () : RecoveryValue  {
    if ( (typeof(this.recovery) !== "undefined" && this.recovery != null )  ) {
      return this.recovery;
    }
    return new RecoveryValue();
  };
  hasTimeValue () : boolean  {
    return (typeof(this.timeValue) !== "undefined" && this.timeValue != null ) ;
  };
  getTimeValue () : TimeValueValue  {
    if ( (typeof(this.timeValue) !== "undefined" && this.timeValue != null )  ) {
      return this.timeValue;
    }
    return new TimeValueValue();
  };
  hasLeftRight () : boolean  {
    return (typeof(this.leftRight) !== "undefined" && this.leftRight != null ) ;
  };
  getLeftRight () : LeftRightValue  {
    if ( (typeof(this.leftRight) !== "undefined" && this.leftRight != null )  ) {
      return this.leftRight;
    }
    return new LeftRightValue();
  };
  hasFeeling () : boolean  {
    return (typeof(this.feeling) !== "undefined" && this.feeling != null ) ;
  };
  getFeeling () : FeelingValue  {
    if ( (typeof(this.feeling) !== "undefined" && this.feeling != null )  ) {
      return this.feeling;
    }
    return new FeelingValue();
  };
  hasEffort () : boolean  {
    return (typeof(this.effort) !== "undefined" && this.effort != null ) ;
  };
  getEffort () : EffortValue  {
    if ( (typeof(this.effort) !== "undefined" && this.effort != null )  ) {
      return this.effort;
    }
    return new EffortValue();
  };
  hasBodyMetric () : boolean  {
    return (typeof(this.bodyMetric) !== "undefined" && this.bodyMetric != null ) ;
  };
  getBodyMetric () : BodyMetricValue  {
    if ( (typeof(this.bodyMetric) !== "undefined" && this.bodyMetric != null )  ) {
      return this.bodyMetric;
    }
    return new BodyMetricValue();
  };
  hasCircuit () : boolean  {
    return (typeof(this.circuit) !== "undefined" && this.circuit != null ) ;
  };
  getCircuit () : CircuitValue  {
    if ( (typeof(this.circuit) !== "undefined" && this.circuit != null )  ) {
      return this.circuit;
    }
    return new CircuitValue();
  };
  hasContextEntry () : boolean  {
    return (typeof(this.contextEntry) !== "undefined" && this.contextEntry != null ) ;
  };
  getContextEntry () : ContextEntryValue  {
    if ( (typeof(this.contextEntry) !== "undefined" && this.contextEntry != null )  ) {
      return this.contextEntry;
    }
    return new ContextEntryValue();
  };
  hasDuration () : boolean  {
    return (typeof(this.duration) !== "undefined" && this.duration != null ) ;
  };
  getDuration () : DurationValue  {
    if ( (typeof(this.duration) !== "undefined" && this.duration != null )  ) {
      return this.duration;
    }
    return new DurationValue();
  };
  static create (kind : string) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = kind;
    return out;
  };
  static fromDateTime (value : DateTimeValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "datetime";
    out.dateTime = value;
    return out;
  };
  static fromDistance (value : DistanceValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "distance";
    out.distance = value;
    return out;
  };
  static fromPercentage (value : PercentageValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "percentage";
    out.percentage = value;
    return out;
  };
  static fromRecoveryTime (value : RecoveryTimeValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "recovery-time";
    out.recoveryTime = value;
    return out;
  };
  static fromWeight (value : WeightValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "weight";
    out.weight = value;
    return out;
  };
  static fromNumRange (value : NumRangeValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "num-range";
    out.numRange = value;
    return out;
  };
  static fromPercentageRange (value : PercentageRangeValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "percentage-range";
    out.percentageRange = value;
    return out;
  };
  static fromRepeatBlock (value : RepeatBlockValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "repeat-block";
    out.repeatBlock = value;
    return out;
  };
  static fromZone (value : ZoneValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "zone";
    out.zone = value;
    return out;
  };
  static fromPositiveInteger (value : PositiveIntegerValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "positive-integer";
    out.positiveInteger = value;
    return out;
  };
  static fromDetailsLevel (value : DetailsLevelValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "details-level";
    out.detailsLevel = value;
    return out;
  };
  static fromRecovery (value : RecoveryValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "recovery";
    out.recovery = value;
    return out;
  };
  static fromTimeValue (value : TimeValueValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "time-value";
    out.timeValue = value;
    return out;
  };
  static fromLeftRight (value : LeftRightValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "left-right";
    out.leftRight = value;
    return out;
  };
  static fromFeeling (value : FeelingValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "feeling";
    out.feeling = value;
    return out;
  };
  static fromEffort (value : EffortValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "effort";
    out.effort = value;
    return out;
  };
  static fromBodyMetric (value : BodyMetricValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "body-metric";
    out.bodyMetric = value;
    return out;
  };
  static fromCircuit (value : CircuitValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "circuit";
    out.circuit = value;
    return out;
  };
  static fromContextEntry (value : ContextEntryValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "context-entry";
    out.contextEntry = value;
    return out;
  };
  static fromDuration (value : DurationValue) : SliceParsedValue  {
    const out : SliceParsedValue  = new SliceParsedValue();
    out.kind = "duration";
    out.duration = value;
    return out;
  };
}
export class TokenSlice  {
  source: string;
  start: number;
  size: number;
  tag: string;
  children!: Array<TokenSlice>;
  parsedValue?: SliceParsedValue;
  constructor(text : string, from : number, length : number) {
    this.source = "";
    this.start = 0;
    this.size = 0;
    this.tag = "";
    this.children = [];
    this.source = text;
    this.start = from;
    this.size = length;
  }
  length () : number  {
    return this.size;
  };
  childCount () : number  {
    return this.children.length;
  };
  addChild (child : TokenSlice) : void  {
    this.children.push(child);
  };
  getChild (index : number) : TokenSlice  {
    return this.children[index];
  };
  isEmpty () : boolean  {
    return this.size == 0;
  };
  hasValue () : boolean  {
    return this.size > 0;
  };
  hasDateTimeValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "datetime") && p.hasDateTime() ) {
        return true;
      }
    }
    return false;
  };
  setSliceValue (value : SliceParsedValue) : void  {
    this.parsedValue = value;
  };
  hasSliceValue () : boolean  {
    return (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null ) ;
  };
  getSliceValueKind () : string  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      return ((this.parsedValue)).kind;
    }
    return "";
  };
  setDateTimeValue (value : DateTimeValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.dateTime = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "datetime";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromDateTime(value);
  };
  getAsDateTimeValue () : DateTimeValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "datetime") && p.hasDateTime() ) {
        return p.getDateTime();
      }
    }
    return new DateTimeValue();
  };
  hasDistanceValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "distance") && p.hasDistance() ) {
        return true;
      }
    }
    return false;
  };
  setDistanceValue (value : DistanceValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.distance = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "distance";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromDistance(value);
  };
  getAsDistanceValue () : DistanceValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "distance") && p.hasDistance() ) {
        return p.getDistance();
      }
    }
    return new DistanceValue();
  };
  hasPercentageValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "percentage") && p.hasPercentage() ) {
        return true;
      }
    }
    return false;
  };
  setPercentageValue (value : PercentageValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.percentage = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "percentage";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromPercentage(value);
  };
  getAsPercentageValue () : PercentageValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "percentage") && p.hasPercentage() ) {
        return p.getPercentage();
      }
    }
    return new PercentageValue();
  };
  hasRecoveryTimeValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "recovery-time") && p.hasRecoveryTime() ) {
        return true;
      }
    }
    return false;
  };
  setRecoveryTimeValue (value : RecoveryTimeValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.recoveryTime = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "recovery-time";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromRecoveryTime(value);
  };
  getAsRecoveryTimeValue () : RecoveryTimeValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "recovery-time") && p.hasRecoveryTime() ) {
        return p.getRecoveryTime();
      }
    }
    return new RecoveryTimeValue();
  };
  hasWeightValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "weight") && p.hasWeight() ) {
        return true;
      }
    }
    return false;
  };
  setWeightValue (value : WeightValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.weight = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "weight";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromWeight(value);
  };
  getAsWeightValue () : WeightValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "weight") && p.hasWeight() ) {
        return p.getWeight();
      }
    }
    return new WeightValue();
  };
  hasNumRangeValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "num-range") && p.hasNumRange() ) {
        return true;
      }
    }
    return false;
  };
  setNumRangeValue (value : NumRangeValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.numRange = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "num-range";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromNumRange(value);
  };
  getAsNumRangeValue () : NumRangeValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "num-range") && p.hasNumRange() ) {
        return p.getNumRange();
      }
    }
    return new NumRangeValue();
  };
  hasPercentageRangeValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "percentage-range") && p.hasPercentageRange() ) {
        return true;
      }
    }
    return false;
  };
  setPercentageRangeValue (value : PercentageRangeValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.percentageRange = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "percentage-range";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromPercentageRange(value);
  };
  getAsPercentageRangeValue () : PercentageRangeValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "percentage-range") && p.hasPercentageRange() ) {
        return p.getPercentageRange();
      }
    }
    return new PercentageRangeValue();
  };
  hasRepeatBlockValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "repeat-block") && p.hasRepeatBlock() ) {
        return true;
      }
    }
    return false;
  };
  setRepeatBlockValue (value : RepeatBlockValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.repeatBlock = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "repeat-block";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromRepeatBlock(value);
  };
  getAsRepeatBlockValue () : RepeatBlockValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "repeat-block") && p.hasRepeatBlock() ) {
        return p.getRepeatBlock();
      }
    }
    return new RepeatBlockValue();
  };
  hasDurationValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "duration") && p.hasDuration() ) {
        return true;
      }
    }
    return false;
  };
  setDurationValue (value : DurationValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.duration = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "duration";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromDuration(value);
  };
  getAsDurationValue () : DurationValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "duration") && p.hasDuration() ) {
        return p.getDuration();
      }
    }
    return new DurationValue();
  };
  hasZoneValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "zone") && p.hasZone() ) {
        return true;
      }
    }
    return false;
  };
  setZoneValue (value : ZoneValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.zone = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "zone";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromZone(value);
  };
  getAsZoneValue () : ZoneValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "zone") && p.hasZone() ) {
        return p.getZone();
      }
    }
    return new ZoneValue();
  };
  hasPositiveIntegerValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "positive-integer") && p.hasPositiveInteger() ) {
        return true;
      }
    }
    return false;
  };
  setPositiveIntegerValue (value : PositiveIntegerValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.positiveInteger = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "positive-integer";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromPositiveInteger(value);
  };
  getAsPositiveIntegerValue () : PositiveIntegerValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "positive-integer") && p.hasPositiveInteger() ) {
        return p.getPositiveInteger();
      }
    }
    return new PositiveIntegerValue();
  };
  hasDetailsLevelValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "details-level") && p.hasDetailsLevel() ) {
        return true;
      }
    }
    return false;
  };
  setDetailsLevelValue (value : DetailsLevelValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.detailsLevel = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "details-level";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromDetailsLevel(value);
  };
  getAsDetailsLevelValue () : DetailsLevelValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "details-level") && p.hasDetailsLevel() ) {
        return p.getDetailsLevel();
      }
    }
    return new DetailsLevelValue();
  };
  hasRecoveryValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "recovery") && p.hasRecovery() ) {
        return true;
      }
    }
    return false;
  };
  setRecoveryValue (value : RecoveryValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.recovery = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "recovery";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromRecovery(value);
  };
  getAsRecoveryValue () : RecoveryValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "recovery") && p.hasRecovery() ) {
        return p.getRecovery();
      }
    }
    return new RecoveryValue();
  };
  hasTimeValueValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "time-value") && p.hasTimeValue() ) {
        return true;
      }
    }
    return false;
  };
  setTimeValueValue (value : TimeValueValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.timeValue = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "time-value";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromTimeValue(value);
  };
  getAsTimeValueValue () : TimeValueValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "time-value") && p.hasTimeValue() ) {
        return p.getTimeValue();
      }
    }
    return new TimeValueValue();
  };
  hasLeftRightValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "left-right") && p.hasLeftRight() ) {
        return true;
      }
    }
    return false;
  };
  setLeftRightValue (value : LeftRightValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.leftRight = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "left-right";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromLeftRight(value);
  };
  getAsLeftRightValue () : LeftRightValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "left-right") && p.hasLeftRight() ) {
        return p.getLeftRight();
      }
    }
    return new LeftRightValue();
  };
  hasFeelingValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "feeling") && p.hasFeeling() ) {
        return true;
      }
    }
    return false;
  };
  setFeelingValue (value : FeelingValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.feeling = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "feeling";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromFeeling(value);
  };
  getAsFeelingValue () : FeelingValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "feeling") && p.hasFeeling() ) {
        return p.getFeeling();
      }
    }
    return new FeelingValue();
  };
  hasEffortValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "effort") && p.hasEffort() ) {
        return true;
      }
    }
    return false;
  };
  setEffortValue (value : EffortValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.effort = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "effort";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromEffort(value);
  };
  getAsEffortValue () : EffortValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "effort") && p.hasEffort() ) {
        return p.getEffort();
      }
    }
    return new EffortValue();
  };
  hasBodyMetricValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "body-metric") && p.hasBodyMetric() ) {
        return true;
      }
    }
    return false;
  };
  setBodyMetricValue (value : BodyMetricValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.bodyMetric = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "body-metric";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromBodyMetric(value);
  };
  getAsBodyMetricValue () : BodyMetricValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "body-metric") && p.hasBodyMetric() ) {
        return p.getBodyMetric();
      }
    }
    return new BodyMetricValue();
  };
  hasCircuitValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "circuit") && p.hasCircuit() ) {
        return true;
      }
    }
    return false;
  };
  setCircuitValue (value : CircuitValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.circuit = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "circuit";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromCircuit(value);
  };
  getAsCircuitValue () : CircuitValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "circuit") && p.hasCircuit() ) {
        return p.getCircuit();
      }
    }
    return new CircuitValue();
  };
  hasContextEntryValue () : boolean  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "context-entry") && p.hasContextEntry() ) {
        return true;
      }
    }
    return false;
  };
  setContextEntryValue (value : ContextEntryValue) : void  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      p.contextEntry = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "context-entry";
      }
      this.parsedValue = p;
      return;
    }
    this.parsedValue = SliceParsedValue.fromContextEntry(value);
  };
  getAsContextEntryValue () : ContextEntryValue  {
    if ( (typeof(this.parsedValue) !== "undefined" && this.parsedValue != null )  ) {
      const p : SliceParsedValue  = this.parsedValue;
      if ( (p.kind == "context-entry") && p.hasContextEntry() ) {
        return p.getContextEntry();
      }
    }
    return new ContextEntryValue();
  };
  toString () : string  {
    return this.source.substring(this.start, (this.start + this.size) );
  };
  strEquals (value : string) : boolean  {
    const vLen : number  = value.length;
    if ( vLen != this.size ) {
      return false;
    }
    let i : number  = 0;
    while (i < vLen) {
      if ( (this.source.charCodeAt((this.start + i) )) == (value.charCodeAt(i )) ) {
      } else {
        return false;
      }
      i = i + 1;
    };
    return true;
  };
  charCodeAt (index : number) : number  {
    if ( index < 0 ) {
      return -1;
    }
    if ( index >= this.size ) {
      return -1;
    }
    return this.source.charCodeAt((this.start + index) );
  };
  isDigitAt (index : number) : boolean  {
    const ch : number  = this.charCodeAt(index);
    return (ch >= 48) && (ch <= 57);
  };
  digitAt (index : number) : number  {
    const ch : number  = this.charCodeAt(index);
    if ( (ch >= 48) && (ch <= 57) ) {
      return ch - 48;
    }
    return -1;
  };
  isWhitespace (ch : number) : boolean  {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  };
  isWhitespaceAt (index : number) : boolean  {
    const ch : number  = this.charCodeAt(index);
    return this.isWhitespace(ch);
  };
  isAlphaNum (ch : number) : boolean  {
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
  isAlphaNumAt (index : number) : boolean  {
    const ch : number  = this.charCodeAt(index);
    return this.isAlphaNum(ch);
  };
  findLineEnd (from : number) : number  {
    let safeFrom : number  = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= this.size ) {
      return this.size;
    }
    let i : number  = safeFrom;
    while (i < this.size) {
      const ch : number  = this.charCodeAt(i);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    };
    return i;
  };
  findNumberEnd (from : number) : number  {
    let safeFrom : number  = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= this.size ) {
      return this.size;
    }
    let i : number  = safeFrom;
    while (i < this.size) {
      if ( this.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    return i;
  };
  findWhitespaceEnd (from : number) : number  {
    let safeFrom : number  = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= this.size ) {
      return this.size;
    }
    let i : number  = safeFrom;
    while (i < this.size) {
      if ( this.isWhitespaceAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    return i;
  };
  hasInteger (from : number, to : number) : boolean  {
    if ( from < 0 ) {
      return false;
    }
    if ( to < from ) {
      return false;
    }
    if ( to >= this.size ) {
      return false;
    }
    let i : number  = from;
    while (i <= to) {
      const ch : number  = this.charCodeAt(i);
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
  parseInteger (from : number, to : number) : number  {
    if ( from < 0 ) {
      return -1;
    }
    if ( to < from ) {
      return -1;
    }
    if ( to >= this.size ) {
      return -1;
    }
    let value : number  = 0;
    let i : number  = from;
    while (i <= to) {
      const ch : number  = this.charCodeAt(i);
      if ( (ch < 48) || (ch > 57) ) {
        return -1;
      }
      value = (value * 10) + (ch - 48);
      i = i + 1;
    };
    return value;
  };
  hasDouble (from : number, to : number) : boolean  {
    if ( from < 0 ) {
      return false;
    }
    if ( to < from ) {
      return false;
    }
    if ( to >= this.size ) {
      return false;
    }
    let i : number  = from;
    const first : number  = this.charCodeAt(i);
    if ( (first == 43) || (first == 45) ) {
      i = i + 1;
      if ( i > to ) {
        return false;
      }
    }
    let hasDigit : boolean  = false;
    let hasDot : boolean  = false;
    while (i <= to) {
      const ch : number  = this.charCodeAt(i);
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
  parseDouble (from : number, to : number) : number  {
    if ( this.hasDouble(from, to) ) {
    } else {
      return 0.0;
    }
    const raw : string  = this.source.substring((this.start + from), ((this.start + to) + 1) );
    const v : number | undefined  = isNaN( parseFloat(raw) ) ? undefined : parseFloat(raw);
    if ( typeof(v) != "undefined" ) {
      return v;
    }
    return 0.0;
  };
  peek (offset : number) : TokenSlice  {
    let safeOffset : number  = offset;
    if ( safeOffset < 0 ) {
      safeOffset = 0;
    }
    if ( safeOffset > this.size ) {
      safeOffset = this.size;
    }
    return new TokenSlice(this.source, this.start + safeOffset, this.size - safeOffset);
  };
  step (count : number) : TokenSlice  {
    return this.peek(count);
  };
  read (count : number) : TokenSlice  {
    let safeCount : number  = count;
    if ( safeCount < 0 ) {
      safeCount = 0;
    }
    if ( safeCount > this.size ) {
      safeCount = this.size;
    }
    return new TokenSlice(this.source, this.start, safeCount);
  };
  slice (count : number) : TokenSlice  {
    return this.read(count);
  };
  pickSlice (from : number, length : number) : TokenSlice  {
    return new TokenSlice(this.source, this.start + from, length);
  };
  hasToken (token : string) : boolean  {
    const tLen : number  = token.length;
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
    let i : number  = 1;
    while (i < tLen) {
      if ( (this.source.charCodeAt((this.start + i) )) == (token.charCodeAt(i )) ) {
      } else {
        return false;
      }
      i = i + 1;
    };
    return true;
  };
  endsWith (token : string) : boolean  {
    const tLen : number  = token.length;
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > this.size ) {
      return false;
    }
    const me : string  = (this).toString();
    const meLen : number  = me.length;
    return (me.substring((meLen - tLen), meLen )) == token;
  };
  findTokenPos (token : string) : number  {
    const tLen : number  = token.length;
    if ( tLen == 0 ) {
      return 0;
    }
    if ( tLen > this.size ) {
      return -1;
    }
    const text : string  = (this).toString();
    const maxStart : number  = this.size - tLen;
    let i : number  = 0;
    while (i <= maxStart) {
      if ( (text.substring(i, (i + tLen) )) == token ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  splitWithToken (token : string) : TokenSlice  {
    const pos : number  = this.findTokenPos(token);
    if ( pos < 0 ) {
      return new TokenSlice(this.source, this.start, this.size);
    }
    return new TokenSlice(this.source, this.start, pos);
  };
  sliceToToken (token : string) : TokenSlice  {
    const pos : number  = this.findTokenPos(token);
    if ( pos < 0 ) {
      return new TokenSlice(this.source, this.start, this.size);
    }
    const tLen : number  = token.length;
    return new TokenSlice(this.source, this.start, pos + tLen);
  };
  static fromText (text : string) : TokenSlice  {
    return new TokenSlice(text, 0, text.length);
  };
}
export class TokenDetector  {
  detectedTag: string;
  cachedNoMatch: TokenSlice;
  constructor(noMatchSlice : TokenSlice) {
    this.detectedTag = "unknown";
    this.cachedNoMatch = new TokenSlice("", 0, 0);
    this.cachedNoMatch = noMatchSlice;
  }
  getNoMatchSlice () : TokenSlice  {
    return this.cachedNoMatch;
  };
  noMatch () : TokenSlice  {
    return this.getNoMatchSlice();
  };
  isInRange (value : number, minValue : number, maxValue : number) : boolean  {
    if ( value < minValue ) {
      return false;
    }
    if ( value > maxValue ) {
      return false;
    }
    return true;
  };
  isHour24 (value : number) : boolean  {
    return this.isInRange(value, 0, 23);
  };
  isMinuteSecond (value : number) : boolean  {
    return this.isInRange(value, 0, 59);
  };
  isHour12 (value : number) : boolean  {
    return this.isInRange(value, 1, 12);
  };
  detect (slice : TokenSlice) : TokenSlice  {
    return this.noMatch();
  };
  static createNoMatchSlice () : TokenSlice  {
    const s : TokenSlice  = new TokenSlice("", 0, 0);
    s.tag = "";
    return s;
  };
  static create (...args : Array<any>) : TokenDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new TokenDetector(s);
  };
}
export class KeywordDetector  extends TokenDetector {
  keyword: string;
  constructor(token : string, noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.keyword = "";
    this.cachedNoMatch = noMatchSlice;
    this.keyword = token;
    this.detectedTag = "keyword";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const kLen : number  = this.keyword.length;
    if ( kLen == 0 ) {
      return this.noMatch();
    }
    const size : number  = (slice).length();
    if ( size < kLen ) {
      return this.noMatch();
    }
    const head : string  = (slice.read(kLen)).toString();
    if ( head == this.keyword ) {
      const matched : TokenSlice  = slice.read(kLen);
      matched.tag = this.detectedTag;
      return matched;
    }
    return this.noMatch();
  };
  static create (token : string) : KeywordDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new KeywordDetector(token, s);
  };
}
export class DateTimeDetector  extends TokenDetector {
  parseDateShapeCalls: number;
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.parseDateShapeCalls = 0;
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "datetime";
  }
  getParseDateShapeCalls () : number  {
    return this.parseDateShapeCalls;
  };
  parseDateShape (slice : TokenSlice) : TokenSlice  {
    this.parseDateShapeCalls = this.parseDateShapeCalls + 1;
    if ( slice.hasInteger(0, 3) ) {
    } else {
      return this.noMatch();
    }
    if ( slice.charCodeAt(4) != 45 ) {
      return this.noMatch();
    }
    let plen : number  = 0;
    const out : DateTimeValue  = new DateTimeValue();
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
      let idx : number  = 16;
      if ( ((slice).length() >= 19) && (slice.charCodeAt(16) == 58) ) {
        out.second = slice.parseInteger(17, 18);
        if ( false == this.isMinuteSecond(out.second) ) {
          return this.noMatch();
        }
        idx = 19;
      }
      if ( idx < (slice).length() ) {
        const tzCh : number  = slice.charCodeAt(idx);
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
            const tzHour : number  = slice.parseInteger((idx + 1), (idx + 2));
            const tzMin : number  = slice.parseInteger((idx + 4), (idx + 5));
            if ( false == this.isHour24(tzHour) ) {
              return this.noMatch();
            }
            if ( false == this.isMinuteSecond(tzMin) ) {
              return this.noMatch();
            }
            const tzSlice : TokenSlice  = slice.read((idx + 6));
            out.timezone = (tzSlice.peek(idx)).toString();
            idx = idx + 6;
          }
        }
      }
      plen = idx;
    }
    const newSlice : TokenSlice  = slice.read(plen);
    newSlice.tag = this.detectedTag;
    const payload2 : SliceParsedValue  = SliceParsedValue.fromDateTime(out);
    newSlice.setSliceValue(payload2);
    slice.setSliceValue(payload2);
    return newSlice;
  };
  detect (slice : TokenSlice) : TokenSlice  {
    return this.parseDateShape(slice);
  };
  static create () : DateTimeDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new DateTimeDetector(s);
  };
}
export class SpaceDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "space";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    const i : number  = slice.findWhitespaceEnd(0);
    if ( i == 0 ) {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read(i);
    out.tag = this.detectedTag;
    return out;
  };
  static create () : SpaceDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new SpaceDetector(s);
  };
}
export class NewlineDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "newline";
  }
  isNewline (ch : number) : boolean  {
    if ( ch == 10 ) {
      return true;
    }
    if ( ch == 13 ) {
      return true;
    }
    return false;
  };
  detect (slice : TokenSlice) : TokenSlice  {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    let i : number  = 0;
    while (i < (slice).length()) {
      const ch : number  = slice.charCodeAt(i);
      if ( this.isNewline(ch) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i == 0 ) {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read(i);
    out.tag = this.detectedTag;
    return out;
  };
  static create () : NewlineDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new NewlineDetector(s);
  };
}
export class PositiveIntegerDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "positive-integer";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    let i : number  = 0;
    let hasNonZero : boolean  = false;
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
    const out : TokenSlice  = slice.read(i);
    out.tag = this.detectedTag;
    const v : PositiveIntegerValue  = new PositiveIntegerValue();
    v.value = out.parseInteger(0, (i - 1));
    const payload : SliceParsedValue  = SliceParsedValue.fromPositiveInteger(v);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : PositiveIntegerDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new PositiveIntegerDetector(s);
  };
}
export class DecimalNumberDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "decimal-number";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len == 0 ) {
      return this.noMatch();
    }
    let i : number  = 0;
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
    let j : number  = i + 1;
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
    const out : TokenSlice  = slice.read(j);
    out.tag = this.detectedTag;
    return out;
  };
  static create () : DecimalNumberDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new DecimalNumberDetector(s);
  };
}
export class TimeValueDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "time-value";
  }
  detect (slice : TokenSlice) : TokenSlice  {
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
    const hour : number  = slice.parseInteger(0, 1);
    const minute : number  = slice.parseInteger(3, 4);
    if ( false == this.isHour24(hour) ) {
      return this.noMatch();
    }
    if ( false == this.isMinuteSecond(minute) ) {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read(5);
    out.tag = this.detectedTag;
    const tv : TimeValueValue  = new TimeValueValue();
    tv.minutes = hour;
    tv.seconds = minute;
    const payload : SliceParsedValue  = SliceParsedValue.fromTimeValue(tv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : TimeValueDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new TimeValueDetector(s);
  };
}
export class DistanceDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "distance";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    const valueLen : number  = slice.findNumberEnd(0);
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
    const parsed : number  = slice.parseInteger(0, (valueLen - 1));
    if ( parsed <= 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(valueLen) != 109 ) {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read((valueLen + 1));
    out.tag = this.detectedTag;
    const dv : DistanceValue  = new DistanceValue();
    dv.value = parsed;
    dv.unit = "m";
    const payload : SliceParsedValue  = SliceParsedValue.fromDistance(dv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : DistanceDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new DistanceDetector(s);
  };
}
export class RecoveryTimeDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "recovery-time";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 47 ) {
      return this.noMatch();
    }
    let i : number  = 1;
    let hasNonZero : boolean  = false;
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
    const unit : number  = slice.charCodeAt(i);
    if ( (unit == 115) || (unit == 109) ) {
    } else {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read((i + 1));
    out.tag = this.detectedTag;
    const slashToken : TokenSlice  = slice.read(1);
    slashToken.tag = "keyword";
    out.addChild(slashToken);
    const valueToken : TokenSlice  = (slice.peek(1)).read((i - 1));
    valueToken.tag = "positive-integer";
    const piv : PositiveIntegerValue  = new PositiveIntegerValue();
    piv.value = valueToken.parseInteger(0, ((valueToken).length() - 1));
    const parsedValue : SliceParsedValue  = SliceParsedValue.fromPositiveInteger(piv);
    valueToken.setSliceValue(parsedValue);
    out.addChild(valueToken);
    const unitToken : TokenSlice  = (slice.peek(i)).read(1);
    unitToken.tag = "keyword";
    out.addChild(unitToken);
    const rv : RecoveryTimeValue  = new RecoveryTimeValue();
    rv.value = ((slice.read(i)).peek(1)).parseInteger(0, (i - 2));
    if ( unit == 115 ) {
      rv.unit = "s";
    } else {
      rv.unit = "m";
    }
    const payload : SliceParsedValue  = SliceParsedValue.fromRecoveryTime(rv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : RecoveryTimeDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new RecoveryTimeDetector(s);
  };
}
export class AMTimeValueDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "am-time";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    const i : number  = slice.findNumberEnd(0);
    if ( i <= 0 ) {
      return this.noMatch();
    }
    if ( (i + 1) >= __len ) {
      return this.noMatch();
    }
    const valuePart : TokenSlice  = slice.read(i);
    if ( valuePart.hasInteger(0, (i - 1)) ) {
    } else {
      return this.noMatch();
    }
    const hour : number  = valuePart.parseInteger(0, (i - 1));
    if ( false == this.isHour12(hour) ) {
      return this.noMatch();
    }
    const c1 : number  = slice.charCodeAt(i);
    const c2 : number  = slice.charCodeAt((i + 1));
    if ( ((c1 == 65) && (c2 == 77)) || ((c1 == 80) && (c2 == 77)) ) {
      const out : TokenSlice  = slice.read((i + 2));
      out.tag = this.detectedTag;
      return out;
    }
    return this.noMatch();
  };
  static create () : AMTimeValueDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new AMTimeValueDetector(s);
  };
}
export class PercentageDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "percentage";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    const vLen : number  = slice.findNumberEnd(0);
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
    const v : number  = slice.parseInteger(0, (vLen - 1));
    if ( v <= 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(vLen) != 37 ) {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read((vLen + 1));
    out.tag = this.detectedTag;
    const pv : PercentageValue  = new PercentageValue();
    pv.value = v;
    const payload : SliceParsedValue  = SliceParsedValue.fromPercentage(pv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : PercentageDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new PercentageDetector(s);
  };
}
export class Parser  {
  source: string;
  slice: TokenSlice;
  detectors!: Array<TokenDetector>;
  parserdResults!: Array<TokenSlice>;
  constructor(source : string, detectors : Array<TokenDetector>) {
    this.source = "";
    this.slice = new TokenSlice("", 0, 0);
    this.detectors = [];
    this.parserdResults = [];
    this.source = source;
    this.detectors = detectors;
    this.slice = new TokenSlice(source, 0, source.length);
    this.parserdResults.length = 0;
  }
  start () : void  {
    let activeSlice : TokenSlice  = new TokenSlice("", 0, 0);
    activeSlice = this.slice;
    while ((activeSlice).length() > 0) {
      let advance : number  = 0;
      let i : number  = 0;
      while (i < (this.detectors.length)) {
        const detector : TokenDetector  = this.detectors[i];
        const result : TokenSlice  = detector.detect(activeSlice);
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
  getResults () : Array<TokenSlice>  {
    return this.parserdResults;
  };
  getCount () : number  {
    return this.parserdResults.length;
  };
  static fromSlice (s : TokenSlice, detectors : Array<TokenDetector>) : Parser  {
    const p : Parser  = new Parser("", detectors);
    p.slice = s;
    return p;
  };
}
export class NumRangeBlockDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "num-range";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    let i : number  = slice.findWhitespaceEnd(0);
    const leftStart : number  = i;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    const leftEnd : number  = i;
    if ( leftEnd <= leftStart ) {
      return this.noMatch();
    }
    i = slice.findWhitespaceEnd(i);
    if ( (i >= __len) || (slice.charCodeAt(i) != 45) ) {
      return this.noMatch();
    }
    i = i + 1;
    i = slice.findWhitespaceEnd(i);
    const rightStart : number  = i;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    const rightEnd : number  = i;
    if ( rightEnd <= rightStart ) {
      return this.noMatch();
    }
    const left : TokenSlice  = (slice.peek(leftStart)).read((leftEnd - leftStart));
    const right : TokenSlice  = (slice.peek(rightStart)).read((rightEnd - rightStart));
    if ( false == left.hasInteger(0, ((left).length() - 1)) ) {
      return this.noMatch();
    }
    if ( false == right.hasInteger(0, ((right).length() - 1)) ) {
      return this.noMatch();
    }
    const lval : number  = left.parseInteger(0, ((left).length() - 1));
    const rval : number  = right.parseInteger(0, ((right).length() - 1));
    if ( lval <= 0 ) {
      return this.noMatch();
    }
    if ( rval <= 0 ) {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read(rightEnd);
    out.tag = this.detectedTag;
    const nv : NumRangeValue  = new NumRangeValue();
    nv.minValue = lval;
    nv.maxValue = rval;
    const payload : SliceParsedValue  = SliceParsedValue.fromNumRange(nv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : NumRangeBlockDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new NumRangeBlockDetector(s);
  };
}
export class PercentageRangeDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "percentage-range";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 4 ) {
      return this.noMatch();
    }
    let i : number  = 0;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( ((i > 0) && (i < __len)) && (slice.charCodeAt(i) == 37) ) {
      if ( ((i + 1) < __len) && (slice.charCodeAt((i + 1)) == 45) ) {
        let j : number  = i + 2;
        while (j < __len) {
          if ( slice.isDigitAt(j) ) {
            j = j + 1;
          } else {
            break;
          }
        };
        if ( ((j > (i + 2)) && (j < __len)) && (slice.charCodeAt(j) == 37) ) {
          const leftDigits : TokenSlice  = slice.read(i);
          const rightDigits : TokenSlice  = (slice.peek((i + 2))).read((j - (i + 2)));
          if ( false == leftDigits.hasInteger(0, ((leftDigits).length() - 1)) ) {
            return this.noMatch();
          }
          if ( false == rightDigits.hasInteger(0, ((rightDigits).length() - 1)) ) {
            return this.noMatch();
          }
          const lval : number  = leftDigits.parseInteger(0, ((leftDigits).length() - 1));
          const rval : number  = rightDigits.parseInteger(0, ((rightDigits).length() - 1));
          if ( (lval > 0) && (rval > 0) ) {
            const out2 : TokenSlice  = slice.read((j + 1));
            out2.tag = this.detectedTag;
            const pv2 : PercentageRangeValue  = new PercentageRangeValue();
            pv2.minValue = lval;
            pv2.maxValue = rval;
            const payload2 : SliceParsedValue  = SliceParsedValue.fromPercentageRange(pv2);
            out2.setSliceValue(payload2);
            slice.setSliceValue(payload2);
            return out2;
          }
        }
      }
    }
    const subReg : NGSubParserDetectors  = NGSubParserDetectors.__singleton();
    const detectors : Array<TokenDetector>  = subReg.getPercentageRangeChildDetectors();
    const p : Parser  = Parser.fromSlice(slice, detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts : Array<TokenSlice>  = p.getResults();
    const first : TokenSlice  = parts[0];
    const second : TokenSlice  = parts[1];
    if ( false == (first.tag == "num-range") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("%") ) {
      return this.noMatch();
    }
    const outLen : number  = (first).length() + (second).length();
    const out : TokenSlice  = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    const nrv : NumRangeValue  = first.getAsNumRangeValue();
    const pv : PercentageRangeValue  = new PercentageRangeValue();
    pv.minValue = nrv.minValue;
    pv.maxValue = nrv.maxValue;
    const payload : SliceParsedValue  = SliceParsedValue.fromPercentageRange(pv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : PercentageRangeDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new PercentageRangeDetector(s);
  };
}
export class DurationDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "duration";
  }
  isAlphaCode (c : number) : boolean  {
    if ( (c >= 65) && (c <= 90) ) {
      return true;
    }
    if ( (c >= 97) && (c <= 122) ) {
      return true;
    }
    return false;
  };
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    let i : number  = 0;
    let hasNonZero : boolean  = false;
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
    const numEnd : number  = i;
    const value : number  = slice.parseInteger(0, (numEnd - 1));
    let unitLen : number  = 0;
    let unitText : string  = "";
    const c0 : number  = slice.charCodeAt(numEnd);
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
    const afterUnit : number  = numEnd + unitLen;
    if ( afterUnit < __len ) {
      if ( this.isAlphaCode(slice.charCodeAt(afterUnit)) ) {
        return this.noMatch();
      }
    }
    const out : TokenSlice  = slice.read(afterUnit);
    out.tag = this.detectedTag;
    const dv : DurationValue  = new DurationValue();
    dv.value = value;
    dv.unit = unitText;
    const payload : SliceParsedValue  = SliceParsedValue.fromDuration(dv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : DurationDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new DurationDetector(s);
  };
}
export class NGSubParserDetectors  {
  kcalChildDetectors!: Array<TokenDetector>;
  bpmChildDetectors!: Array<TokenDetector>;
  rmChildDetectors!: Array<TokenDetector>;
  weightChildDetectors!: Array<TokenDetector>;
  positiveIntegerOnlyChildDetectors!: Array<TokenDetector>;
  percentageRangeChildDetectors!: Array<TokenDetector>;
  repeatBlockChildDetectors!: Array<TokenDetector>;
  constructor() {
    this.kcalChildDetectors = [];
    this.bpmChildDetectors = [];
    this.rmChildDetectors = [];
    this.weightChildDetectors = [];
    this.positiveIntegerOnlyChildDetectors = [];
    this.percentageRangeChildDetectors = [];
    this.repeatBlockChildDetectors = [];
  }
  getKcalChildDetectors () : Array<TokenDetector>  {
    if ( (this.kcalChildDetectors.length) > 0 ) {
      return this.kcalChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("kcal"));
    this.kcalChildDetectors = ds;
    return this.kcalChildDetectors;
  };
  getBpmChildDetectors () : Array<TokenDetector>  {
    if ( (this.bpmChildDetectors.length) > 0 ) {
      return this.bpmChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("bpm"));
    this.bpmChildDetectors = ds;
    return this.bpmChildDetectors;
  };
  getRmChildDetectors () : Array<TokenDetector>  {
    if ( (this.rmChildDetectors.length) > 0 ) {
      return this.rmChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("RM"));
    this.rmChildDetectors = ds;
    return this.rmChildDetectors;
  };
  getWeightChildDetectors () : Array<TokenDetector>  {
    if ( (this.weightChildDetectors.length) > 0 ) {
      return this.weightChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
    ds.push(DecimalNumberDetector.create());
    ds.push(PositiveIntegerDetector.create());
    ds.push(KeywordDetector.create("kg"));
    this.weightChildDetectors = ds;
    return this.weightChildDetectors;
  };
  getPositiveIntegerOnlyChildDetectors () : Array<TokenDetector>  {
    if ( (this.positiveIntegerOnlyChildDetectors.length) > 0 ) {
      return this.positiveIntegerOnlyChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
    ds.push(PositiveIntegerDetector.create());
    this.positiveIntegerOnlyChildDetectors = ds;
    return this.positiveIntegerOnlyChildDetectors;
  };
  getPercentageRangeChildDetectors () : Array<TokenDetector>  {
    if ( (this.percentageRangeChildDetectors.length) > 0 ) {
      return this.percentageRangeChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
    ds.push(SpaceDetector.create());
    ds.push(NumRangeBlockDetector.create());
    ds.push(KeywordDetector.create("%"));
    this.percentageRangeChildDetectors = ds;
    return this.percentageRangeChildDetectors;
  };
  getRepeatBlockChildDetectors () : Array<TokenDetector>  {
    if ( (this.repeatBlockChildDetectors.length) > 0 ) {
      return this.repeatBlockChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
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
  static __singleton_instance : NGSubParserDetectors | null = null;
  static __singleton() : NGSubParserDetectors {
    if (this.__singleton_instance == null) {
      this.__singleton_instance = new NGSubParserDetectors();
    }
    return this.__singleton_instance;
  };
}
export class WeightDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "weight";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    const subReg : NGSubParserDetectors  = NGSubParserDetectors.__singleton();
    const detectors : Array<TokenDetector>  = subReg.getWeightChildDetectors();
    const p : Parser  = Parser.fromSlice(slice, detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts : Array<TokenSlice>  = p.getResults();
    const first : TokenSlice  = parts[0];
    const second : TokenSlice  = parts[1];
    const isInt : boolean  = first.tag == "positive-integer";
    const isDec : boolean  = first.tag == "decimal-number";
    if ( (isInt == false) && (isDec == false) ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("kg") ) {
      return this.noMatch();
    }
    const outLen : number  = (first).length() + (second).length();
    const out : TokenSlice  = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    const firstLen : number  = (first).length();
    const wv : WeightValue  = new WeightValue();
    wv.value = first.parseDouble(0, (firstLen - 1));
    wv.unit = "kg";
    const payload : SliceParsedValue  = SliceParsedValue.fromWeight(wv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : WeightDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new WeightDetector(s);
  };
}
export class RepeatBlockDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "repeat-block";
  }
  isAlphaCode (c : number) : boolean  {
    if ( (c >= 65) && (c <= 90) ) {
      return true;
    }
    if ( (c >= 97) && (c <= 122) ) {
      return true;
    }
    return false;
  };
  buildPart (tok : TokenSlice) : RepeatPartValue  {
    const part : RepeatPartValue  = new RepeatPartValue();
    const t : string  = tok.tag;
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
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    const subReg : NGSubParserDetectors  = NGSubParserDetectors.__singleton();
    const detectors : Array<TokenDetector>  = subReg.getRepeatBlockChildDetectors();
    const p : Parser  = Parser.fromSlice(slice, detectors);
    (p).start();
    const n : number  = p.getCount();
    if ( n == 0 ) {
      return this.noMatch();
    }
    const results : Array<TokenSlice>  = p.getResults();
    const rv : RepeatBlockValue  = new RepeatBlockValue();
    let consumed : number  = 0;
    let hasX : boolean  = false;
    let expectPart : boolean  = true;
    let stop : boolean  = false;
    let lastPartLen : number  = 0;
    let lastWasNonInteger : boolean  = false;
    let i : number  = 0;
    while ((i < n) && (stop == false)) {
      const tok : TokenSlice  = results[i];
      const ttag : string  = tok.tag;
      const ttext : string  = (tok).toString();
      const tlen : number  = (tok).length();
      if ( expectPart ) {
        const part : RepeatPartValue  = this.buildPart(tok);
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
        const nc : number  = slice.charCodeAt(consumed);
        if ( this.isAlphaCode(nc) ) {
          const last : number  = rv.parts.length;
          if ( last >= 1 ) {
            let newParts : Array<RepeatPartValue> | undefined  = [];
            let j : number  = 0;
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
    const partCount : number  = rv.parts.length;
    if ( partCount == 0 ) {
      return this.noMatch();
    }
    if ( hasX == false ) {
      if ( partCount == 1 ) {
        const only : RepeatPartValue  = rv.parts[0];
        if ( only.kind == "positive-integer" ) {
          return this.noMatch();
        }
        if ( only.kind == "num-range" ) {
          return this.noMatch();
        }
      }
    }
    if ( consumed < __len ) {
      const lineEnd : number  = slice.findLineEnd(0);
      let k : number  = consumed;
      while (k < lineEnd) {
        if ( slice.isWhitespaceAt(k) ) {
          k = k + 1;
        } else {
          break;
        }
      };
      if ( (k > consumed) && (k < lineEnd) ) {
        if ( this.isAlphaCode(slice.charCodeAt(k)) ) {
          let m : number  = k;
          let hasSemi : boolean  = false;
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
    const out : TokenSlice  = slice.read(consumed);
    out.tag = this.detectedTag;
    const payload : SliceParsedValue  = SliceParsedValue.fromRepeatBlock(rv);
    out.setSliceValue(payload);
    return out;
  };
  static create () : RepeatBlockDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new RepeatBlockDetector(s);
  };
}
export class SpeedDetector  extends TokenDetector {
  distanceDetector?: DistanceDetector;
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "speed";
    this.distanceDetector = DistanceDetector.create();
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 7 ) {
      return this.noMatch();
    }
    const colonPos : number  = slice.findNumberEnd(0);
    if ( colonPos <= 0 ) {
      return this.noMatch();
    }
    if ( (colonPos + 4) > __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(colonPos) != 58 ) {
      return this.noMatch();
    }
    const slashPos : number  = colonPos + 3;
    if ( slice.charCodeAt(slashPos) != 47 ) {
      return this.noMatch();
    }
    const left : TokenSlice  = slice.read(slashPos);
    if ( false == left.hasInteger(0, (colonPos - 1)) ) {
      return this.noMatch();
    }
    if ( false == left.hasInteger((colonPos + 1), (colonPos + 2)) ) {
      return this.noMatch();
    }
    const sec : number  = left.parseInteger((colonPos + 1), (colonPos + 2));
    if ( false == this.isMinuteSecond(sec) ) {
      return this.noMatch();
    }
    const rightStart : TokenSlice  = slice.peek((slashPos + 1));
    const dist : TokenSlice  = this.distanceDetector!.detect(rightStart);
    if ( dist.isEmpty() ) {
      return this.noMatch();
    }
    if ( false == (dist.tag == "distance") ) {
      return this.noMatch();
    }
    const first : TokenSlice  = left;
    first.tag = "time-value";
    const tv : TimeValueValue  = new TimeValueValue();
    tv.minutes = left.parseInteger(0, (colonPos - 1));
    tv.seconds = sec;
    const firstParsed : SliceParsedValue  = SliceParsedValue.fromTimeValue(tv);
    first.setSliceValue(firstParsed);
    const second : TokenSlice  = (slice.peek(slashPos)).read(1);
    second.tag = "keyword";
    const third : TokenSlice  = dist;
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("/") ) {
      return this.noMatch();
    }
    if ( false == (third.tag == "distance") ) {
      return this.noMatch();
    }
    const outLen : number  = ((first).length() + (second).length()) + (third).length();
    const out : TokenSlice  = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    out.addChild(third);
    return out;
  };
  static create () : SpeedDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new SpeedDetector(s);
  };
}
export class ZoneDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "zone";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    if ( slice.hasToken("Zone") ) {
    } else {
      return this.noMatch();
    }
    const __len : number  = (slice).length();
    if ( __len <= 4 ) {
      return this.noMatch();
    }
    let i : number  = 4;
    if ( (i < __len) && (slice.charCodeAt(i) == 32) ) {
      i = i + 1;
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    const startDigits : number  = i;
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
    const zoneDigits : TokenSlice  = (slice.peek(startDigits)).read((i - startDigits));
    if ( zoneDigits.hasInteger(0, ((zoneDigits).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    const zoneNum : number  = zoneDigits.parseInteger(0, ((zoneDigits).length() - 1));
    if ( (zoneNum < 1) || (zoneNum > 5) ) {
      return this.noMatch();
    }
    if ( i < __len ) {
      if ( slice.isAlphaNumAt(i) ) {
        return this.noMatch();
      }
    }
    const out : TokenSlice  = slice.read(i);
    out.tag = this.detectedTag;
    const zv : ZoneValue  = new ZoneValue();
    zv.zone = zoneNum;
    const payload : SliceParsedValue  = SliceParsedValue.fromZone(zv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : ZoneDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new ZoneDetector(s);
  };
}
export class NGChildDetectorRegistry  {
  recoveryChildDetectors!: Array<TokenDetector>;
  leftRightChildDetectors!: Array<TokenDetector>;
  constructor() {
    this.recoveryChildDetectors = [];
    this.leftRightChildDetectors = [];
  }
  getRecoveryChildDetectors () : Array<TokenDetector>  {
    if ( (this.recoveryChildDetectors.length) > 0 ) {
      return this.recoveryChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
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
  getLeftRightChildDetectors () : Array<TokenDetector>  {
    if ( (this.leftRightChildDetectors.length) > 0 ) {
      return this.leftRightChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
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
  static __singleton_instance : NGChildDetectorRegistry | null = null;
  static __singleton() : NGChildDetectorRegistry {
    if (this.__singleton_instance == null) {
      this.__singleton_instance = new NGChildDetectorRegistry();
    }
    return this.__singleton_instance;
  };
}
export class RecoveryDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "recovery";
  }
  createChildDetectors () : Array<TokenDetector>  {
    const reg : NGChildDetectorRegistry  = NGChildDetectorRegistry.__singleton();
    return reg.getRecoveryChildDetectors();
  };
  detect (slice : TokenSlice) : TokenSlice  {
    const key : string  = "Recovery";
    const keyLen : number  = key.length;
    const __len : number  = (slice).length();
    if ( __len <= keyLen ) {
      return this.noMatch();
    }
    const head : TokenSlice  = slice.read(keyLen);
    if ( head.strEquals(key) ) {
    } else {
      return this.noMatch();
    }
    if ( slice.isAlphaNumAt(keyLen) ) {
      return this.noMatch();
    }
    const lineEnd : number  = slice.findLineEnd(keyLen);
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const labelToken : TokenSlice  = slice.read(keyLen);
    labelToken.tag = "keyword";
    out.addChild(labelToken);
    const restStart : number  = slice.findWhitespaceEnd(keyLen);
    if ( restStart < lineEnd ) {
      const rest : TokenSlice  = (slice.peek(restStart)).read((lineEnd - restStart));
      const p : Parser  = Parser.fromSlice(rest, this.createChildDetectors());
      (p).start();
      const children : Array<TokenSlice>  = p.getResults();
      for ( let i = 0; i < children.length; i++) {
        var ch = children[i];
        out.addChild(ch);
      };
    }
    const rv : RecoveryValue  = new RecoveryValue();
    rv.label = "Recovery";
    const payload : SliceParsedValue  = SliceParsedValue.fromRecovery(rv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  };
  static create () : RecoveryDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new RecoveryDetector(s);
  };
}
export class LeftRightDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "left-right";
  }
  createChildDetectors () : Array<TokenDetector>  {
    const reg : NGChildDetectorRegistry  = NGChildDetectorRegistry.__singleton();
    return reg.getLeftRightChildDetectors();
  };
  detectWithSide (slice : TokenSlice, side : string) : TokenSlice  {
    const key : string  = side + " ";
    if ( slice.hasToken(key) ) {
    } else {
      return this.noMatch();
    }
    const keyLen : number  = key.length;
    const __len : number  = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    const lineEnd : number  = slice.findLineEnd(keyLen);
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const sideToken : TokenSlice  = slice.read((side.length));
    sideToken.tag = "keyword";
    out.addChild(sideToken);
    const restStart : number  = slice.findWhitespaceEnd(keyLen);
    if ( restStart < lineEnd ) {
      const payload : TokenSlice  = (slice.peek(restStart)).read((lineEnd - restStart));
      const p : Parser  = Parser.fromSlice(payload, this.createChildDetectors());
      (p).start();
      const children : Array<TokenSlice>  = p.getResults();
      for ( let i = 0; i < children.length; i++) {
        var ch3 = children[i];
        out.addChild(ch3);
      };
    }
    const lv : LeftRightValue  = new LeftRightValue();
    lv.side = side;
    const parsed : SliceParsedValue  = SliceParsedValue.fromLeftRight(lv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
  detect (slice : TokenSlice) : TokenSlice  {
    const left : TokenSlice  = this.detectWithSide(slice, "Left");
    if ( left.isEmpty() ) {
    } else {
      return left;
    }
    return this.detectWithSide(slice, "Right");
  };
  static create () : LeftRightDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new LeftRightDetector(s);
  };
}
export class FeelingDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "feeling";
  }
  parseNumericScore (slice : TokenSlice) : number  {
    const subReg : NGSubParserDetectors  = NGSubParserDetectors.__singleton();
    const detectors : Array<TokenDetector>  = subReg.getPositiveIntegerOnlyChildDetectors();
    const p : Parser  = Parser.fromSlice(slice, detectors);
    (p).start();
    if ( p.getCount() != 1 ) {
      return -1;
    }
    const scoreToken : TokenSlice  = p.getResults()[0];
    if ( scoreToken.tag == "positive-integer" ) {
      return scoreToken.parseInteger(0, ((scoreToken).length() - 1));
    }
    return -1;
  };
  parseSlashTenScore (slice : TokenSlice) : number  {
    if ( slice.hasToken("?/10") ) {
      return 0;
    }
    const __len : number  = (slice).length();
    let i : number  = 1;
    while ((i + 2) < __len) {
      if ( slice.charCodeAt(i) == 47 ) {
        if ( (slice.charCodeAt((i + 1)) == 49) && (slice.charCodeAt((i + 2)) == 48) ) {
          let start : number  = i;
          while (start > 0) {
            if ( slice.isDigitAt((start - 1)) ) {
              start = start - 1;
            } else {
              break;
            }
          };
          if ( start < i ) {
            const numSlice : TokenSlice  = (slice.peek(start)).read((i - start));
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
  parseKind (slice : TokenSlice) : string  {
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
  prefixLength (slice : TokenSlice, kind : string) : number  {
    if ( kind == "pain" ) {
      return 5;
    }
    if ( slice.hasToken("Feelings ") ) {
      return 9;
    }
    return 8;
  };
  detect (slice : TokenSlice) : TokenSlice  {
    const kind : string  = this.parseKind(slice);
    if ( (kind.length) == 0 ) {
      return this.noMatch();
    }
    const keyLen : number  = this.prefixLength(slice, kind);
    const __len : number  = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    const lineEnd : number  = slice.findLineEnd(keyLen);
    const rawSlice : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
    let trimStart : number  = 0;
    const rawLen : number  = (rawSlice).length();
    while (trimStart < rawLen) {
      const chStart : number  = rawSlice.charCodeAt(trimStart);
      if ( rawSlice.isWhitespace(chStart) ) {
        trimStart = trimStart + 1;
      } else {
        break;
      }
    };
    let trimEnd : number  = rawLen;
    while (trimEnd > trimStart) {
      const chEnd : number  = rawSlice.charCodeAt((trimEnd - 1));
      if ( rawSlice.isWhitespace(chEnd) ) {
        trimEnd = trimEnd - 1;
      } else {
        break;
      }
    };
    let score : number  = -1;
    if ( trimEnd > trimStart ) {
      const valueSlice : TokenSlice  = (rawSlice.peek(trimStart)).read((trimEnd - trimStart));
      score = this.parseNumericScore(valueSlice);
      if ( score < 0 ) {
        if ( (kind == "feeling") && valueSlice.hasToken("RPE:") ) {
          if ( (valueSlice).length() > 4 ) {
            const rpeSlice : TokenSlice  = (valueSlice.peek(4)).read(((valueSlice).length() - 4));
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
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    let labelLen : number  = keyLen - 1;
    if ( labelLen < 1 ) {
      labelLen = 1;
    }
    const label : TokenSlice  = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    const scoreToken : TokenSlice  = TokenSlice.fromText(("" + score));
    scoreToken.tag = "positive-integer";
    out.addChild(scoreToken);
    const fv : FeelingValue  = new FeelingValue();
    fv.kind = kind;
    fv.score = score;
    const parsed : SliceParsedValue  = SliceParsedValue.fromFeeling(fv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
  static create () : FeelingDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new FeelingDetector(s);
  };
}
export class EffortDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "effort";
  }
  prefixLength (slice : TokenSlice) : number  {
    if ( slice.hasToken("RPE ") ) {
      return 4;
    }
    return 7;
  };
  detect (slice : TokenSlice) : TokenSlice  {
    if ( slice.hasToken("Effort ") ) {
    } else {
      if ( slice.hasToken("RPE ") ) {
      } else {
        return this.noMatch();
      }
    }
    const keyLen : number  = this.prefixLength(slice);
    const __len : number  = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    const lineEnd : number  = slice.findLineEnd(keyLen);
    const valueSlice : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
    const subReg : NGSubParserDetectors  = NGSubParserDetectors.__singleton();
    const detectors : Array<TokenDetector>  = subReg.getPositiveIntegerOnlyChildDetectors();
    const p : Parser  = Parser.fromSlice(valueSlice, detectors);
    (p).start();
    if ( p.getCount() != 1 ) {
      return this.noMatch();
    }
    const scoreToken : TokenSlice  = p.getResults()[0];
    if ( scoreToken.tag == "positive-integer" ) {
    } else {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    let labelLen : number  = keyLen - 1;
    if ( labelLen < 1 ) {
      labelLen = 1;
    }
    const label : TokenSlice  = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    out.addChild(scoreToken);
    const ev : EffortValue  = new EffortValue();
    ev.score = scoreToken.parseInteger(0, ((scoreToken).length() - 1));
    const parsed : SliceParsedValue  = SliceParsedValue.fromEffort(ev);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
  static create () : EffortDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new EffortDetector(s);
  };
}
export class BodyMetricDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "body-metric";
  }
  findLineEnd (slice : TokenSlice, from : number) : number  {
    return slice.findLineEnd(from);
  };
  createMetricSlice (slice : TokenSlice, offset : number, lineEnd : number) : TokenSlice  {
    if ( offset >= lineEnd ) {
      return slice.read(0);
    }
    return (slice.peek(offset)).read((lineEnd - offset));
  };
  parseDoublePrefix (metricSlice : TokenSlice) : number  {
    const __len : number  = (metricSlice).length();
    let i : number  = 0;
    while (i < __len) {
      const ch : number  = metricSlice.charCodeAt(i);
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
  parseIntegerPrefix (metricSlice : TokenSlice) : number  {
    const i : number  = metricSlice.findNumberEnd(0);
    if ( i == 0 ) {
      return -1;
    }
    if ( metricSlice.hasInteger(0, (i - 1)) ) {
      return metricSlice.parseInteger(0, (i - 1));
    }
    return -1;
  };
  setCommon (out : TokenSlice, source : TokenSlice, value : BodyMetricValue) : void  {
    const parsed : SliceParsedValue  = SliceParsedValue.fromBodyMetric(value);
    out.setSliceValue(parsed);
    source.setSliceValue(parsed);
  };
  detectSimpleDoubleMetric (slice : TokenSlice, prefix : string, labelLen : number, metricName : string, unit : string, allowZero : boolean) : TokenSlice  {
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const prefixLen : number  = prefix.length;
    const lineEnd : number  = this.findLineEnd(slice, prefixLen);
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label : TokenSlice  = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    const metric : TokenSlice  = this.createMetricSlice(slice, prefixLen, lineEnd);
    const value : number  = this.parseDoublePrefix(metric);
    if ( allowZero ) {
      if ( value < 0.0 ) {
        return this.noMatch();
      }
    } else {
      if ( value <= 0.0 ) {
        return this.noMatch();
      }
    }
    const mv : BodyMetricValue  = new BodyMetricValue();
    mv.metric = metricName;
    mv.primaryValue = value;
    mv.unit = unit;
    this.setCommon(out, slice, mv);
    return out;
  };
  detectWeight (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "Weight ", 6, "weight", "kg", false);
  };
  detectBodyFat (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "BodyFat ", 7, "body-fat", "%", true);
  };
  detectSleep (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "Sleep ", 5, "sleep", "h", false);
  };
  detectRestingHr (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "Health resting_hr ", 17, "resting-hr", "bpm", false);
  };
  detectBp (slice : TokenSlice) : TokenSlice  {
    const prefix : string  = "Vitals bp ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const lineEnd : number  = this.findLineEnd(slice, (prefix.length));
    const metric : TokenSlice  = this.createMetricSlice(slice, (prefix.length), lineEnd);
    const slashPos : number  = metric.findTokenPos("/");
    if ( (slashPos < 1) || (slashPos >= ((metric).length() - 1)) ) {
      return this.noMatch();
    }
    const left : TokenSlice  = metric.read(slashPos);
    const right : TokenSlice  = (metric.peek((slashPos + 1))).read((((metric).length() - slashPos) - 1));
    if ( left.hasInteger(0, ((left).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    if ( right.hasInteger(0, ((right).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label : TokenSlice  = slice.read(9);
    label.tag = "keyword";
    out.addChild(label);
    const mv : BodyMetricValue  = new BodyMetricValue();
    mv.metric = "blood-pressure";
    mv.primaryValue = left.parseDouble(0, ((left).length() - 1));
    mv.secondaryValue = right.parseInteger(0, ((right).length() - 1));
    mv.unit = "mmhg";
    this.setCommon(out, slice, mv);
    return out;
  };
  detectVitalsWeight (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "Vitals weight:", 13, "weight", "kg", false);
  };
  detectVitalsSleep (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "Vitals sleep:", 12, "sleep", "h", false);
  };
  detectVitalsRhr (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "Vitals rhr:", 10, "resting-hr", "bpm", false);
  };
  detectWaist (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "Waist ", 5, "waist", "cm", false);
  };
  detectHip (slice : TokenSlice) : TokenSlice  {
    return this.detectSimpleDoubleMetric(slice, "Hip ", 3, "hip", "cm", false);
  };
  detect (slice : TokenSlice) : TokenSlice  {
    const w : TokenSlice  = this.detectWeight(slice);
    if ( w.isEmpty() ) {
    } else {
      return w;
    }
    const bf : TokenSlice  = this.detectBodyFat(slice);
    if ( bf.isEmpty() ) {
    } else {
      return bf;
    }
    const sl : TokenSlice  = this.detectSleep(slice);
    if ( sl.isEmpty() ) {
    } else {
      return sl;
    }
    const hr : TokenSlice  = this.detectRestingHr(slice);
    if ( hr.isEmpty() ) {
    } else {
      return hr;
    }
    const vw : TokenSlice  = this.detectVitalsWeight(slice);
    if ( vw.isEmpty() ) {
    } else {
      return vw;
    }
    const vs : TokenSlice  = this.detectVitalsSleep(slice);
    if ( vs.isEmpty() ) {
    } else {
      return vs;
    }
    const vr : TokenSlice  = this.detectVitalsRhr(slice);
    if ( vr.isEmpty() ) {
    } else {
      return vr;
    }
    const waist : TokenSlice  = this.detectWaist(slice);
    if ( waist.isEmpty() ) {
    } else {
      return waist;
    }
    const hip : TokenSlice  = this.detectHip(slice);
    if ( hip.isEmpty() ) {
    } else {
      return hip;
    }
    return this.detectBp(slice);
  };
  static create () : BodyMetricDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new BodyMetricDetector(s);
  };
}
export class CircuitDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "circuit";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const prefix : string  = "Circuit ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    const __len : number  = (slice).length();
    const roundsStart : number  = prefix.length;
    const roundsEnd : number  = slice.findNumberEnd(roundsStart);
    if ( roundsEnd <= roundsStart ) {
      return this.noMatch();
    }
    const roundsSlice : TokenSlice  = (slice.peek(roundsStart)).read((roundsEnd - roundsStart));
    if ( roundsSlice.hasInteger(0, ((roundsSlice).length() - 1)) ) {
    } else {
      return this.noMatch();
    }
    const lineEnd : number  = slice.findLineEnd(roundsEnd);
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const circuitToken : TokenSlice  = slice.read(7);
    circuitToken.tag = "keyword";
    out.addChild(circuitToken);
    const roundsToken : TokenSlice  = (slice.peek(roundsStart)).read((roundsEnd - roundsStart));
    roundsToken.tag = "positive-integer";
    out.addChild(roundsToken);
    const cv : CircuitValue  = new CircuitValue();
    cv.rounds = roundsSlice.parseInteger(0, ((roundsSlice).length() - 1));
    if ( (roundsEnd < lineEnd) && (slice.charCodeAt(roundsEnd) == 47) ) {
      const i : number  = slice.findNumberEnd((roundsEnd + 1));
      if ( i > (roundsEnd + 1) ) {
        let j : number  = i;
        while (j < lineEnd) {
          const ch4 : number  = slice.charCodeAt(j);
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
          const restToken : TokenSlice  = (slice.peek(roundsEnd)).read((j - roundsEnd));
          restToken.tag = "recovery-time";
          out.addChild(restToken);
          const vSlice : TokenSlice  = (slice.peek((roundsEnd + 1))).read(((i - roundsEnd) - 1));
          cv.restValue = vSlice.parseInteger(0, ((vSlice).length() - 1));
          const unitRaw : string  = ((slice.peek(i)).read((j - i))).toString();
          if ( (unitRaw == "min") || (unitRaw == "m") ) {
            cv.restUnit = "min";
          }
          if ( (unitRaw == "sec") || (unitRaw == "s") ) {
            cv.restUnit = "sec";
          }
        }
      }
    }
    const parsed : SliceParsedValue  = SliceParsedValue.fromCircuit(cv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
  static create () : CircuitDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new CircuitDetector(s);
  };
}
export class NGSharedLists  {
  sportNames!: Array<string>;
  contextEntryKinds!: Array<string>;
  contextEntryPrefixTokens!: Array<string>;
  romanZonePrefixTokens!: Array<string>;
  contextEntryKindMap!: {[key:string]:boolean};
  reservedGenericExerciseNameMap!: {[key:string]:boolean};
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
  addContextEntryKind (kind : string, prefix : string) : void  {
    this.contextEntryKinds.push(kind);
    this.contextEntryPrefixTokens.push(prefix);
    this.contextEntryKindMap[kind] = true;
  };
  addReservedGenericExerciseName (name : string) : void  {
    this.reservedGenericExerciseNameMap[name] = true;
  };
  defaultSportNames () : Array<string>  {
    return this.sportNames;
  };
  defaultContextEntryKinds () : Array<string>  {
    return this.contextEntryKinds;
  };
  defaultContextEntryPrefixTokens () : Array<string>  {
    return this.contextEntryPrefixTokens;
  };
  defaultRomanZonePrefixTokens () : Array<string>  {
    return this.romanZonePrefixTokens;
  };
  isContextEntryKind (kind : string) : boolean  {
    return ( typeof(this.contextEntryKindMap[kind] ) != "undefined" && this.contextEntryKindMap.hasOwnProperty(kind) );
  };
  isReservedGenericExerciseName (name : string) : boolean  {
    return ( typeof(this.reservedGenericExerciseNameMap[name] ) != "undefined" && this.reservedGenericExerciseNameMap.hasOwnProperty(name) );
  };
  static __singleton_instance : NGSharedLists | null = null;
  static __singleton() : NGSharedLists {
    if (this.__singleton_instance == null) {
      this.__singleton_instance = new NGSharedLists();
    }
    return this.__singleton_instance;
  };
}
export class ContextEntryDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "context-entry";
  }
  toTag (kind : string) : string  {
    const shared : NGSharedLists  = NGSharedLists.__singleton();
    if ( shared.isContextEntryKind(kind) ) {
      return kind;
    }
    return this.detectedTag;
  };
  detectKind (slice : TokenSlice) : string  {
    const shared : NGSharedLists  = NGSharedLists.__singleton();
    const kinds : Array<string>  = shared.defaultContextEntryKinds();
    const prefixes : Array<string>  = shared.defaultContextEntryPrefixTokens();
    const cnt : number  = kinds.length;
    let i : number  = 0;
    while (i < cnt) {
      if ( slice.hasToken((prefixes[i])) ) {
        return kinds[i];
      }
      i = i + 1;
    };
    return "";
  };
  findLineEnd (slice : TokenSlice, start : number) : number  {
    return slice.findLineEnd(start);
  };
  parseDerivedFields (cv : ContextEntryValue, valueSlice : TokenSlice) : void  {
    const __len : number  = (valueSlice).length();
    if ( __len <= 0 ) {
      return;
    }
    let i : number  = 0;
    while (i < __len) {
      const chStart : number  = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chStart) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i >= __len ) {
      return;
    }
    const metricStart : number  = i;
    while (i < __len) {
      const chMetric : number  = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chMetric) ) {
        break;
      }
      i = i + 1;
    };
    const metricEnd : number  = i;
    if ( metricEnd > metricStart ) {
      cv.name = ((valueSlice.peek(metricStart)).read((metricEnd - metricStart))).toString();
    }
    while (i < __len) {
      const chAfterMetric : number  = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chAfterMetric) ) {
        i = i + 1;
      } else {
        break;
      }
    };
    if ( i >= __len ) {
      return;
    }
    const valueStart : number  = i;
    while (i < __len) {
      const chNum : number  = valueSlice.charCodeAt(i);
      if ( ((chNum == 124) || (chNum == 59)) || valueSlice.isWhitespace(chNum) ) {
        break;
      }
      i = i + 1;
    };
    const valueEnd : number  = i;
    if ( valueEnd > valueStart ) {
      const valueToken : TokenSlice  = (valueSlice.peek(valueStart)).read((valueEnd - valueStart));
      cv.value = (valueToken).toString();
      if ( valueToken.hasDouble(0, ((valueToken).length() - 1)) ) {
        cv.numericValue = valueToken.parseDouble(0, ((valueToken).length() - 1));
        cv.hasNumeric = true;
      }
    }
    if ( i < __len ) {
      const sep : number  = valueSlice.charCodeAt(i);
      if ( (sep == 124) || (sep == 59) ) {
        i = i + 1;
        while (i < __len) {
          const chUnitStart : number  = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chUnitStart) ) {
            i = i + 1;
          } else {
            break;
          }
        };
        const unitStart : number  = i;
        while (i < __len) {
          const chUnit : number  = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chUnit) ) {
            break;
          }
          i = i + 1;
        };
        const unitEnd : number  = i;
        if ( unitEnd > unitStart ) {
          cv.unit = ((valueSlice.peek(unitStart)).read((unitEnd - unitStart))).toString();
        }
        while (i < __len) {
          const chBeforeToken : number  = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chBeforeToken) ) {
            i = i + 1;
          } else {
            break;
          }
        };
        while (i < __len) {
          const tokenStart : number  = i;
          while (i < __len) {
            const chToken : number  = valueSlice.charCodeAt(i);
            if ( valueSlice.isWhitespace(chToken) ) {
              break;
            }
            i = i + 1;
          };
          const tokenEnd : number  = i;
          if ( tokenEnd > tokenStart ) {
            const tokenSlice : TokenSlice  = (valueSlice.peek(tokenStart)).read((tokenEnd - tokenStart));
            const tokenLen : number  = (tokenSlice).length();
            let colonAt : number  = -1;
            let j : number  = 0;
            while (j < tokenLen) {
              if ( tokenSlice.charCodeAt(j) == 58 ) {
                colonAt = j;
                break;
              }
              j = j + 1;
            };
            if ( (colonAt > 0) && (colonAt < (tokenLen - 1)) ) {
              const key : string  = ((tokenSlice.peek(0)).read(colonAt)).toString();
              const valSlice : TokenSlice  = (tokenSlice.peek((colonAt + 1))).read((tokenLen - (colonAt + 1)));
              const valLen : number  = (valSlice).length();
              if ( key == "basis" ) {
                cv.basis = (valSlice).toString();
              }
              if ( key == "source" ) {
                cv.source = (valSlice).toString();
              }
              if ( key == "confidence" ) {
                if ( valLen > 0 ) {
                  const lastCh : number  = valSlice.charCodeAt((valLen - 1));
                  if ( lastCh == 37 ) {
                    if ( valLen > 1 ) {
                      const numSlice : TokenSlice  = (valSlice.peek(0)).read((valLen - 1));
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
            const chGap : number  = valueSlice.charCodeAt(i);
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
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len > 1 ) {
      const quote : number  = slice.charCodeAt(0);
      if ( (quote == 34) || (quote == 39) ) {
        const lineEndQuoted : number  = this.findLineEnd(slice, 1);
        const contentStart : number  = 1;
        let contentEnd : number  = lineEndQuoted;
        if ( (lineEndQuoted > 1) && (slice.charCodeAt((lineEndQuoted - 1)) == quote) ) {
          contentEnd = lineEndQuoted - 1;
        }
        if ( contentEnd <= contentStart ) {
          return this.noMatch();
        }
        const outQuoted : TokenSlice  = slice.read(lineEndQuoted);
        outQuoted.tag = "comment";
        const contentSlice : TokenSlice  = (slice.peek(contentStart)).read((contentEnd - contentStart));
        const textToken : TokenSlice  = contentSlice.read((contentEnd - contentStart));
        textToken.tag = "text";
        outQuoted.addChild(textToken);
        const quotedValue : ContextEntryValue  = new ContextEntryValue();
        quotedValue.kind = "comment";
        quotedValue.content = (contentSlice).toString();
        const quotedParsed : SliceParsedValue  = SliceParsedValue.fromContextEntry(quotedValue);
        outQuoted.setSliceValue(quotedParsed);
        slice.setSliceValue(quotedParsed);
        return outQuoted;
      }
    }
    const kind : string  = this.detectKind(slice);
    const kindLen : number  = kind.length;
    if ( kindLen == 0 ) {
      return this.noMatch();
    }
    const keyLen : number  = kindLen + 1;
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    const lineEnd : number  = this.findLineEnd(slice, keyLen);
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.toTag(kind);
    const labelLen : number  = keyLen - 1;
    const label : TokenSlice  = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    if ( keyLen < lineEnd ) {
      const contentSlice_1 : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
      const content : string  = (contentSlice_1).toString();
      if ( (content.length) > 0 ) {
        const textToken_1 : TokenSlice  = contentSlice_1.read((content.length));
        textToken_1.tag = "text";
        out.addChild(textToken_1);
      }
    }
    const cv : ContextEntryValue  = new ContextEntryValue();
    cv.kind = kind;
    if ( keyLen < lineEnd ) {
      cv.content = ((slice.peek(keyLen)).read((lineEnd - keyLen))).toString();
    }
    if ( kind == "derived" ) {
      if ( keyLen < lineEnd ) {
        const derivedSlice : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
        this.parseDerivedFields(cv, derivedSlice);
      }
    }
    if ( kind == "custom" ) {
      const customSlice : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
      const customLen : number  = (customSlice).length();
      let fieldStart : number  = 0;
      while (fieldStart < customLen) {
        const chStart : number  = customSlice.charCodeAt(fieldStart);
        if ( customSlice.isWhitespace(chStart) ) {
          fieldStart = fieldStart + 1;
        } else {
          break;
        }
      };
      let fieldEnd : number  = fieldStart;
      while (fieldEnd < customLen) {
        const chField : number  = customSlice.charCodeAt(fieldEnd);
        if ( customSlice.isWhitespace(chField) ) {
          break;
        }
        fieldEnd = fieldEnd + 1;
      };
      if ( fieldEnd > fieldStart ) {
        cv.name = ((customSlice.peek(fieldStart)).read((fieldEnd - fieldStart))).toString();
        let valueStart : number  = fieldEnd;
        while (valueStart < customLen) {
          const chValueStart : number  = customSlice.charCodeAt(valueStart);
          if ( customSlice.isWhitespace(chValueStart) ) {
            valueStart = valueStart + 1;
          } else {
            break;
          }
        };
        if ( valueStart < customLen ) {
          const valueSlice : TokenSlice  = (customSlice.peek(valueStart)).read((customLen - valueStart));
          cv.value = (valueSlice).toString();
          if ( valueSlice.hasDouble(0, ((valueSlice).length() - 1)) ) {
            cv.numericValue = valueSlice.parseDouble(0, ((valueSlice).length() - 1));
            cv.hasNumeric = true;
          }
        }
      }
    }
    const parsed : SliceParsedValue  = SliceParsedValue.fromContextEntry(cv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  };
  static create () : ContextEntryDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new ContextEntryDetector(s);
  };
}
export class DistanceRangeBlockDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "distance-range";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 5 ) {
      return this.noMatch();
    }
    const lLen : number  = slice.findNumberEnd(0);
    if ( lLen <= 0 ) {
      return this.noMatch();
    }
    if ( false == slice.hasInteger(0, (lLen - 1)) ) {
      return this.noMatch();
    }
    if ( lLen >= __len ) {
      return this.noMatch();
    }
    const sep : number  = slice.charCodeAt(lLen);
    if ( sep == 45 ) {
      const rightAStart : number  = lLen + 1;
      if ( rightAStart >= __len ) {
        return this.noMatch();
      }
      const rightA : TokenSlice  = slice.peek(rightAStart);
      const rLenA : number  = rightA.findNumberEnd(0);
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
      const lvalA : number  = slice.parseInteger(0, (lLen - 1));
      const rvalA : number  = rightA.parseInteger(0, (rLenA - 1));
      if ( (lvalA <= 0) || (rvalA <= 0) ) {
        return this.noMatch();
      }
      const outA : TokenSlice  = slice.read(((rightAStart + rLenA) + 1));
      outA.tag = this.detectedTag;
      return outA;
    }
    if ( sep != 109 ) {
      return this.noMatch();
    }
    const lLenB : number  = lLen;
    if ( (lLenB + 2) > __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt((lLenB + 1)) != 45 ) {
      return this.noMatch();
    }
    const rightBStart : number  = lLenB + 2;
    if ( rightBStart >= __len ) {
      return this.noMatch();
    }
    const rightB : TokenSlice  = slice.peek(rightBStart);
    const rLenB : number  = rightB.findNumberEnd(0);
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
    const lvalB : number  = slice.parseInteger(0, (lLenB - 1));
    const rvalB : number  = rightB.parseInteger(0, (rLenB - 1));
    if ( (lvalB <= 0) || (rvalB <= 0) ) {
      return this.noMatch();
    }
    const outB : TokenSlice  = slice.read(((rightBStart + rLenB) + 1));
    outB.tag = this.detectedTag;
    return outB;
  };
  static create () : DistanceRangeBlockDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new DistanceRangeBlockDetector(s);
  };
}
export class SemicolonSeparatorDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "space";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 59 ) {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read(1);
    out.tag = this.detectedTag;
    return out;
  };
  static create () : SemicolonSeparatorDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new SemicolonSeparatorDetector(s);
  };
}
export class KCALDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "kcal";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 5 ) {
      return this.noMatch();
    }
    const subReg : NGSubParserDetectors  = NGSubParserDetectors.__singleton();
    const detectors : Array<TokenDetector>  = subReg.getKcalChildDetectors();
    const p : Parser  = Parser.fromSlice(slice, detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts : Array<TokenSlice>  = p.getResults();
    const first : TokenSlice  = parts[0];
    const second : TokenSlice  = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("kcal") ) {
      return this.noMatch();
    }
    const outLen : number  = (first).length() + (second).length();
    const out : TokenSlice  = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  };
  static create () : KCALDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new KCALDetector(s);
  };
}
export class BPMDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "bpm";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 4 ) {
      return this.noMatch();
    }
    const subReg : NGSubParserDetectors  = NGSubParserDetectors.__singleton();
    const detectors : Array<TokenDetector>  = subReg.getBpmChildDetectors();
    const p : Parser  = Parser.fromSlice(slice, detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts : Array<TokenSlice>  = p.getResults();
    const first : TokenSlice  = parts[0];
    const second : TokenSlice  = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("bpm") ) {
      return this.noMatch();
    }
    const outLen : number  = (first).length() + (second).length();
    const out : TokenSlice  = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  };
  static create () : BPMDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new BPMDetector(s);
  };
}
export class RMDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "rm";
  }
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    const subReg : NGSubParserDetectors  = NGSubParserDetectors.__singleton();
    const detectors : Array<TokenDetector>  = subReg.getRmChildDetectors();
    const p : Parser  = Parser.fromSlice(slice, detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    const parts : Array<TokenSlice>  = p.getResults();
    const first : TokenSlice  = parts[0];
    const second : TokenSlice  = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("RM") ) {
      return this.noMatch();
    }
    const outLen : number  = (first).length() + (second).length();
    const out : TokenSlice  = slice.read(outLen);
    out.tag = this.detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  };
  static create () : RMDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new RMDetector(s);
  };
}
export class RomanZoneDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "zone-roman";
  }
  romanPrefixLen (slice : TokenSlice) : number  {
    const shared : NGSharedLists  = NGSharedLists.__singleton();
    const candidates : Array<string>  = shared.defaultRomanZonePrefixTokens();
    let i : number  = 0;
    const cnt : number  = candidates.length;
    while (i < cnt) {
      const token : string  = candidates[i];
      if ( slice.hasToken(token) ) {
        return token.length;
      }
      i = i + 1;
    };
    return 0;
  };
  detect (slice : TokenSlice) : TokenSlice  {
    const tokenLen : number  = this.romanPrefixLen(slice);
    if ( tokenLen == 0 ) {
      return this.noMatch();
    }
    const __len : number  = (slice).length();
    if ( __len > tokenLen ) {
      if ( slice.isAlphaNumAt(tokenLen) ) {
        return this.noMatch();
      }
    }
    const out : TokenSlice  = slice.read(tokenLen);
    out.tag = this.detectedTag;
    return out;
  };
  static create () : RomanZoneDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new RomanZoneDetector(s);
  };
}
export class PhaseDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "phase";
  }
  findLineEnd (slice : TokenSlice, from : number) : number  {
    return slice.findLineEnd(from);
  };
  detect (slice : TokenSlice) : TokenSlice  {
    if ( slice.hasToken("Phase") ) {
    } else {
      return this.noMatch();
    }
    const lineEnd : number  = this.findLineEnd(slice, 0);
    if ( lineEnd <= 5 ) {
      return this.noMatch();
    }
    let keyEnd : number  = 0;
    while (keyEnd < lineEnd) {
      const ch : number  = slice.charCodeAt(keyEnd);
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
    const keyText : string  = (slice.read(keyEnd)).toString();
    if ( (keyText.substring(0, 5 )) == "Phase" ) {
    } else {
      return this.noMatch();
    }
    let contentStart : number  = keyEnd;
    if ( contentStart < lineEnd ) {
      const chSep : number  = slice.charCodeAt(contentStart);
      if ( (chSep == 124) || slice.isWhitespace(chSep) ) {
        contentStart = contentStart + 1;
      }
    }
    while (contentStart < lineEnd) {
      const chSpace : number  = slice.charCodeAt(contentStart);
      if ( slice.isWhitespace(chSpace) ) {
        contentStart = contentStart + 1;
      } else {
        break;
      }
    };
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const label : TokenSlice  = slice.read(keyEnd);
    label.tag = "keyword";
    out.addChild(label);
    if ( contentStart < lineEnd ) {
      const contentSlice : TokenSlice  = (slice.peek(contentStart)).read((lineEnd - contentStart));
      const textToken : TokenSlice  = contentSlice.read((lineEnd - contentStart));
      textToken.tag = "text";
      out.addChild(textToken);
    }
    return out;
  };
  static create () : PhaseDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new PhaseDetector(s);
  };
}
export class HeadingDataDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "heading-data";
  }
  hasIsoDatePrefix (slice : TokenSlice, start : number) : boolean  {
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
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) == 91 ) {
      let closeIdx : number  = 1;
      while (closeIdx < __len) {
        const chClose : number  = slice.charCodeAt(closeIdx);
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
          let i2 : number  = closeIdx + 1;
          while (i2 < __len) {
            const chSpace : number  = slice.charCodeAt(i2);
            if ( slice.isWhitespace(chSpace) ) {
              i2 = i2 + 1;
            } else {
              break;
            }
          };
          let hashCount : number  = 0;
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
                let j : number  = i2;
                while (j < __len) {
                  const chJ : number  = slice.charCodeAt(j);
                  if ( (chJ == 10) || (chJ == 13) ) {
                    break;
                  }
                  j = j + 1;
                };
                if ( j > i2 ) {
                  const out2 : TokenSlice  = slice.read(j);
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
    let i : number  = 2;
    while (i < __len) {
      const ch : number  = slice.charCodeAt(i);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    };
    if ( i <= 2 ) {
      return this.noMatch();
    }
    const out : TokenSlice  = slice.read(i);
    out.tag = this.detectedTag;
    return out;
  };
  static create () : HeadingDataDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new HeadingDataDetector(s);
  };
}
export class StandardDetectors  {
  constructor() {
  }
  static create () : Array<TokenDetector>  {
    let ds : Array<TokenDetector> | undefined  = [];
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
}
export class DetailsDataDetector  extends TokenDetector {
  constructor(noMatchSlice : TokenSlice) {
    super(noMatchSlice)
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "details-data";
  }
  createChildDetectors () : Array<TokenDetector>  {
    return StandardDetectors.create();
  };
  findFirstNumberOffset (slice : TokenSlice) : number  {
    let i : number  = 0;
    const __len : number  = (slice).length();
    while (i < __len) {
      const ch : number  = slice.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  isLetter (ch : number) : boolean  {
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  };
  addChildrenFromParser (out : TokenSlice, payload : TokenSlice) : void  {
    const p : Parser  = new Parser((payload).toString(), this.createChildDetectors());
    (p).start();
    const ch : Array<TokenSlice>  = p.getResults();
    for ( let i = 0; i < ch.length; i++) {
      var item = ch[i];
      out.addChild(item);
    };
  };
  addKeywordTailChildren (out : TokenSlice, payload : TokenSlice) : void  {
    const rbDetector : RepeatBlockDetector  = RepeatBlockDetector.create();
    const rb : TokenSlice  = rbDetector.detect(payload);
    if ( false == (rb.tag == "repeat-block") ) {
      this.addChildrenFromParser(out, payload);
      return;
    }
    out.addChild(rb);
    let restStart : number  = (rb).length();
    const __len : number  = (payload).length();
    while (restStart < __len) {
      const ch : number  = payload.charCodeAt(restStart);
      if ( payload.isWhitespace(ch) ) {
        restStart = restStart + 1;
      } else {
        break;
      }
    };
    if ( restStart < __len ) {
      const rest : TokenSlice  = (payload.peek(restStart)).read((__len - restStart));
      this.addChildrenFromParser(out, rest);
    }
  };
  addParsedChildren (out : TokenSlice, payload : TokenSlice) : void  {
    const p : Parser  = new Parser((payload).toString(), this.createChildDetectors());
    (p).start();
    if ( p.getCount() > 0 ) {
      const ch : Array<TokenSlice>  = p.getResults();
      for ( let i = 0; i < ch.length; i++) {
        var item = ch[i];
        out.addChild(item);
      };
      return;
    }
    const __len : number  = (payload).length();
    let wordEnd : number  = 0;
    while (wordEnd < __len) {
      const chw : number  = payload.charCodeAt(wordEnd);
      if ( this.isLetter(chw) ) {
        wordEnd = wordEnd + 1;
      } else {
        break;
      }
    };
    if ( wordEnd > 0 ) {
      const label : TokenSlice  = payload.read(wordEnd);
      label.tag = "keyword";
      out.addChild(label);
      let tailStart : number  = wordEnd;
      while (tailStart < __len) {
        const cht : number  = payload.charCodeAt(tailStart);
        if ( payload.isWhitespace(cht) ) {
          tailStart = tailStart + 1;
        } else {
          break;
        }
      };
      if ( tailStart < __len ) {
        const tail : TokenSlice  = (payload.peek(tailStart)).read((__len - tailStart));
        this.addKeywordTailChildren(out, tail);
      }
      return;
    }
    const firstNum : number  = this.findFirstNumberOffset(payload);
    if ( (firstNum > 0) && (firstNum < (payload).length()) ) {
      const numericTail : TokenSlice  = (payload.peek(firstNum)).read(((payload).length() - firstNum));
      this.addChildrenFromParser(out, numericTail);
    }
  };
  detect (slice : TokenSlice) : TokenSlice  {
    if ( (slice).length() < 1 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 62 ) {
      return this.noMatch();
    }
    const __len : number  = (slice).length();
    let markerEnd : number  = 0;
    while (markerEnd < __len) {
      const chm : number  = slice.charCodeAt(markerEnd);
      if ( chm == 62 ) {
        markerEnd = markerEnd + 1;
      } else {
        break;
      }
    };
    if ( markerEnd == 0 ) {
      return this.noMatch();
    }
    const lineEnd : number  = slice.findLineEnd(markerEnd);
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    const levelToken : TokenSlice  = slice.read(markerEnd);
    levelToken.tag = "details-level";
    const dlv : DetailsLevelValue  = new DetailsLevelValue();
    dlv.level = markerEnd;
    dlv.marker = (levelToken).toString();
    const payload : SliceParsedValue  = SliceParsedValue.fromDetailsLevel(dlv);
    levelToken.setSliceValue(payload);
    out.addChild(levelToken);
    let contentStart : number  = markerEnd;
    while (contentStart < lineEnd) {
      const ch2 : number  = slice.charCodeAt(contentStart);
      if ( (ch2 == 32) || (ch2 == 9) ) {
        contentStart = contentStart + 1;
      } else {
        break;
      }
    };
    if ( contentStart >= lineEnd ) {
      return out;
    }
    const payload_2 : TokenSlice  = (slice.peek(contentStart)).read((lineEnd - contentStart));
    this.addParsedChildren(out, payload_2);
    return out;
  };
  static create () : DetailsDataDetector  {
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new DetailsDataDetector(s);
  };
}
export class NGSharedDetectorFactory  {
  sportExerciseChildDetectors!: Array<TokenDetector>;
  constructor() {
    this.sportExerciseChildDetectors = [];
  }
  createSportExerciseChildDetectors () : Array<TokenDetector>  {
    if ( (this.sportExerciseChildDetectors.length) > 0 ) {
      return this.sportExerciseChildDetectors;
    }
    let ds : Array<TokenDetector> | undefined  = [];
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
  static __singleton_instance : NGSharedDetectorFactory | null = null;
  static __singleton() : NGSharedDetectorFactory {
    if (this.__singleton_instance == null) {
      this.__singleton_instance = new NGSharedDetectorFactory();
    }
    return this.__singleton_instance;
  };
}
export class SportExerciseDetector  extends TokenDetector {
  sports!: Array<string>;
  childDetectors!: Array<TokenDetector>;
  constructor(noMatchSlice : TokenSlice, sportNames : Array<string>, ds : Array<TokenDetector>) {
    super(noMatchSlice)
    this.sports = [];
    this.childDetectors = [];
    this.cachedNoMatch = noMatchSlice;
    this.sports = sportNames;
    this.childDetectors = ds;
    this.detectedTag = "exercise";
  }
  createChildDetectors () : Array<TokenDetector>  {
    return this.childDetectors;
  };
  startsWithToken (slice : TokenSlice, token : string) : boolean  {
    const tLen : number  = token.length;
    if ( tLen > (slice).length() ) {
      return false;
    }
    let i : number  = 0;
    while (i < tLen) {
      if ( slice.charCodeAt(i) == (token.charCodeAt(i )) ) {
      } else {
        return false;
      }
      i = i + 1;
    };
    return true;
  };
  isUppercaseLetter (ch : number) : boolean  {
    return (ch >= 65) && (ch <= 90);
  };
  isLetter (ch : number) : boolean  {
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  };
  isReservedGenericName (name : string) : boolean  {
    const shared : NGSharedLists  = NGSharedLists.__singleton();
    return shared.isReservedGenericExerciseName(name);
  };
  scanGenericNameEnd (slice : TokenSlice) : number  {
    const __len : number  = (slice).length();
    if ( __len <= 0 ) {
      return -1;
    }
    if ( false == this.isUppercaseLetter(slice.charCodeAt(0)) ) {
      return -1;
    }
    let pos : number  = 1;
    while (pos < __len) {
      const ch : number  = slice.charCodeAt(pos);
      if ( this.isLetter(ch) ) {
        pos = pos + 1;
      } else {
        break;
      }
    };
    let nameEnd : number  = pos;
    while (pos < __len) {
      const gapStart : number  = pos;
      while (pos < __len) {
        const gapCh : number  = slice.charCodeAt(pos);
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
        const ch2 : number  = slice.charCodeAt(pos);
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
  isSeparator (slice : TokenSlice, index : number) : boolean  {
    if ( slice.isWhitespaceAt(index) ) {
      return true;
    }
    if ( slice.charCodeAt(index) == 59 ) {
      return true;
    }
    return false;
  };
  trimEnd (slice : TokenSlice, endPos : number) : number  {
    let out : number  = endPos;
    while (out > 0) {
      const ch : number  = slice.charCodeAt((out - 1));
      if ( slice.isWhitespace(ch) ) {
        out = out - 1;
      } else {
        break;
      }
    };
    return out;
  };
  detect (slice : TokenSlice) : TokenSlice  {
    const __len : number  = (slice).length();
    if ( __len <= 0 ) {
      return this.noMatch();
    }
    const lineEnd : number  = slice.findLineEnd(0);
    if ( lineEnd <= 0 ) {
      return this.noMatch();
    }
    let startPos : number  = 0;
    while (startPos < lineEnd) {
      const chStart : number  = slice.charCodeAt(startPos);
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
    let semicolonPos : number  = -1;
    let p : number  = 0;
    while (p < lineEnd) {
      if ( slice.charCodeAt(p) == 59 ) {
        semicolonPos = p;
        break;
      }
      p = p + 1;
    };
    const explicitNameMode : boolean  = semicolonPos >= 0;
    let matched : boolean  = false;
    if ( explicitNameMode ) {
      matched = true;
    } else {
      for ( let i = 0; i < this.sports.length; i++) {
        var sportName = this.sports[i];
        const sportLen : number  = sportName.length;
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
        const genericLen : number  = this.scanGenericNameEnd(slice);
        if ( genericLen > 1 ) {
          const genericName : string  = (slice.read(genericLen)).toString();
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
    let nameEnd : number  = lineEnd;
    if ( semicolonPos >= 0 ) {
      nameEnd = semicolonPos;
    }
    nameEnd = this.trimEnd(slice, nameEnd);
    if ( nameEnd <= 0 ) {
      return this.noMatch();
    }
    const nameToken : TokenSlice  = slice.read(nameEnd);
    nameToken.tag = "exercise-name";
    const out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.detectedTag;
    out.addChild(nameToken);
    if ( semicolonPos >= 0 ) {
      let restStart : number  = semicolonPos + 1;
      while (restStart < lineEnd) {
        if ( this.isSeparator(slice, restStart) ) {
          restStart = restStart + 1;
        } else {
          break;
        }
      };
      if ( restStart < lineEnd ) {
        const restSlice : TokenSlice  = (slice.peek(restStart)).read((lineEnd - restStart));
        const p_2 : Parser  = Parser.fromSlice(restSlice, this.createChildDetectors());
        (p_2).start();
        const children : Array<TokenSlice>  = p_2.getResults();
        for ( let j = 0; j < children.length; j++) {
          var ch = children[j];
          out.addChild(ch);
        };
      }
    }
    return out;
  };
  static create () : SportExerciseDetector  {
    const shared : NGSharedLists  = NGSharedLists.__singleton();
    const factory : NGSharedDetectorFactory  = NGSharedDetectorFactory.__singleton();
    const sportNames : Array<string>  = shared.defaultSportNames();
    const ds : Array<TokenDetector>  = factory.createSportExerciseChildDetectors();
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new SportExerciseDetector(s, sportNames, ds);
  };
  static createWithSports (sportNames : Array<string>) : SportExerciseDetector  {
    const factory : NGSharedDetectorFactory  = NGSharedDetectorFactory.__singleton();
    const ds : Array<TokenDetector>  = factory.createSportExerciseChildDetectors();
    const s : TokenSlice  = TokenDetector.createNoMatchSlice();
    return new SportExerciseDetector(s, sportNames, ds);
  };
}
export class NGExpectRule  {
  testIndex: number;
  negated: boolean;
  kind: string;
  childIndex: number;
  field: string;
  value: string;
  constructor() {
    this.testIndex = -1;
    this.negated = false;
    this.kind = "";
    this.childIndex = -1;
    this.field = "";
    this.value = "";
  }
}
export class NGTestCase  {
  input: string;
  expects!: Array<NGExpectRule>;
  jsonFile: string;
  constructor() {
    this.input = "";
    this.expects = [];
    this.jsonFile = "";
  }
}
export class NGTestSpecParser  {
  constructor() {
  }
  isSpace (ch : number) : boolean  {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  };
  trim (text : string) : string  {
    const __len : number  = text.length;
    if ( __len == 0 ) {
      return "";
    }
    let start : number  = 0;
    while (start < __len) {
      const ch : number  = text.charCodeAt(start );
      if ( this.isSpace(ch) ) {
        start = start + 1;
      } else {
        break;
      }
    };
    let stop : number  = __len;
    while (stop > start) {
      const ch2 : number  = text.charCodeAt((stop - 1) );
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
  startsWith (text : string, prefix : string) : boolean  {
    const tLen : number  = text.length;
    const pLen : number  = prefix.length;
    if ( pLen > tLen ) {
      return false;
    }
    return (text.substring(0, pLen )) == prefix;
  };
  endsWith (text : string, suffix : string) : boolean  {
    const tLen : number  = text.length;
    const sLen : number  = suffix.length;
    if ( sLen > tLen ) {
      return false;
    }
    return (text.substring((tLen - sLen), tLen )) == suffix;
  };
  normalizeNumericText (text : string) : string  {
    if ( (this).endsWith(text, ".0") ) {
      return text.substring(0, ((text.length) - 2) );
    }
    return text;
  };
  isCommentLine (line : string) : boolean  {
    return (this).startsWith(line, "//");
  };
  findSpace (text : string) : number  {
    const __len : number  = text.length;
    let i : number  = 0;
    while (i < __len) {
      const ch : number  = text.charCodeAt(i );
      if ( ch == 32 ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  decodeEscapes (text : string) : string  {
    const __len : number  = text.length;
    if ( __len == 0 ) {
      return "";
    }
    let out : string  = "";
    let i : number  = 0;
    while (i < __len) {
      const ch : number  = text.charCodeAt(i );
      if ( (ch == 92) && ((i + 1) < __len) ) {
        const next : number  = text.charCodeAt((i + 1) );
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
  parseExpect (line : string) : NGExpectRule  {
    const out : NGExpectRule  = new NGExpectRule();
    const payload : string  = (this).trim(line);
    if ( (payload.length) == 0 ) {
      return out;
    }
    let body : string  = payload;
    const idxSep : number  = this.findSpace(payload);
    if ( idxSep > 0 ) {
      const idxText : string  = payload.substring(0, idxSep );
      const idxSlice : TokenSlice  = TokenSlice.fromText(idxText);
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
      const rest : string  = (this).trim((body.substring(6, (body.length) )));
      const childIdxSep : number  = this.findSpace(rest);
      if ( childIdxSep < 0 ) {
        return out;
      }
      const childIdxText : string  = rest.substring(0, childIdxSep );
      const childIdxSlice : TokenSlice  = TokenSlice.fromText(childIdxText);
      if ( (childIdxSlice).length() == 0 ) {
        return out;
      }
      if ( childIdxSlice.hasInteger(0, ((childIdxSlice).length() - 1)) ) {
      } else {
        return out;
      }
      out.childIndex = childIdxSlice.parseInteger(0, ((childIdxSlice).length() - 1));
      const afterIdx : string  = (this).trim((rest.substring((childIdxSep + 1), (rest.length) )));
      const fieldSep : number  = this.findSpace(afterIdx);
      if ( fieldSep < 0 ) {
        return out;
      }
      out.kind = "child";
      out.field = afterIdx.substring(0, fieldSep );
      out.value = this.decodeEscapes((this).trim((afterIdx.substring((fieldSep + 1), (afterIdx.length) ))));
      return out;
    }
    if ( (this).startsWith(body, "json ") ) {
      const restJson : string  = (this).trim((body.substring(5, (body.length) )));
      const pathSep : number  = this.findSpace(restJson);
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
  resolveTargetIndex (blockStart : number, caseCount : number, idx : number) : number  {
    if ( idx >= 0 ) {
      return blockStart + idx;
    }
    return caseCount - 1;
  };
  parseJsonFile (line : string, cases : Array<NGTestCase>, blockStart : number) : void  {
    const payload : string  = (this).trim(line);
    if ( (payload.length) == 0 ) {
      return;
    }
    if ( (this).startsWith(payload, "all ") ) {
      const allFileName : string  = this.decodeEscapes((this).trim((payload.substring(4, (payload.length) ))));
      if ( (allFileName.length) == 0 ) {
        return;
      }
      let from : number  = blockStart;
      const to : number  = cases.length;
      while (from < to) {
        const tcAll : NGTestCase  = cases[from];
        tcAll.jsonFile = allFileName;
        from = from + 1;
      };
      return;
    }
    let target : number  = -1;
    let fileName : string  = payload;
    const idxSep : number  = this.findSpace(payload);
    if ( idxSep > 0 ) {
      const idxText : string  = payload.substring(0, idxSep );
      const idxSlice : TokenSlice  = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() > 0 ) {
        if ( idxSlice.hasInteger(0, ((idxSlice).length() - 1)) ) {
          const idxValue : number  = idxSlice.parseInteger(0, ((idxSlice).length() - 1));
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
      const tc : NGTestCase  = cases[target];
      tc.jsonFile = this.decodeEscapes(fileName);
    }
  };
  parse (specText : string) : Array<NGTestCase>  {
    let cases : Array<NGTestCase> | undefined  = [];
    let blockStart : number  = 0;
    let prevKind : string  = "none";
    const __len : number  = specText.length;
    let lineStart : number  = 0;
    let i : number  = 0;
    while (i <= __len) {
      if ( i == __len ) {
      } else {
        const ch : number  = specText.charCodeAt(i );
        if ( (ch == 10) || (ch == 13) ) {
        } else {
          i = i + 1;
          continue;
        }
      }
      const raw : string  = specText.substring(lineStart, i );
      const line : string  = (this).trim(raw);
      if ( (line.length) > 0 ) {
        if ( this.isCommentLine(line) ) {
        } else {
          if ( (this).startsWith(line, "Test ") ) {
            if ( prevKind != "test" ) {
              blockStart = cases.length;
            }
            const tc : NGTestCase  = new NGTestCase();
            tc.input = this.decodeEscapes((this).trim((line.substring(5, (line.length) ))));
            cases.push(tc);
            prevKind = "test";
          } else {
            if ( (this).startsWith(line, "Expect ") ) {
              const ex : NGExpectRule  = this.parseExpect((line.substring(7, (line.length) )));
              if ( (ex.kind.length) > 0 ) {
                const target : number  = this.resolveTargetIndex(blockStart, (cases.length), ex.testIndex);
                if ( (target >= 0) && (target < (cases.length)) ) {
                  const tc2 : NGTestCase  = cases[target];
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
      const firstNl : number  = specText.charCodeAt(i );
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
  static create () : NGTestSpecParser  {
    return new NGTestSpecParser();
  };
}
export class NGTestRunner  {
  constructor() {
  }
  isSpace (ch : number) : boolean  {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  };
  trim (text : string) : string  {
    const __len : number  = text.length;
    if ( __len == 0 ) {
      return "";
    }
    let start : number  = 0;
    while (start < __len) {
      const ch : number  = text.charCodeAt(start );
      if ( this.isSpace(ch) ) {
        start = start + 1;
      } else {
        break;
      }
    };
    let stop : number  = __len;
    while (stop > start) {
      const ch2 : number  = text.charCodeAt((stop - 1) );
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
  startsWith (text : string, prefix : string) : boolean  {
    const tLen : number  = text.length;
    const pLen : number  = prefix.length;
    if ( pLen > tLen ) {
      return false;
    }
    return (text.substring(0, pLen )) == prefix;
  };
  endsWithText (text : string, suffix : string) : boolean  {
    const tLen : number  = text.length;
    const sLen : number  = suffix.length;
    if ( sLen > tLen ) {
      return false;
    }
    return (text.substring((tLen - sLen), tLen )) == suffix;
  };
  normalizeJsonNumericText (text : string) : string  {
    let out : string  = (this).trim(text);
    while (this.endsWithText(out, ".0")) {
      out = out.substring(0, ((out.length) - 2) );
    };
    return out;
  };
  createDetectors () : Array<TokenDetector>  {
    return StandardDetectors.create();
  };
  escapeJson (text : string) : string  {
    const __len : number  = text.length;
    if ( __len == 0 ) {
      return "";
    }
    let out : string  = "";
    let i : number  = 0;
    while (i < __len) {
      const ch : number  = text.charCodeAt(i );
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
  indent (level : number) : string  {
    let out : string  = "";
    let i : number  = 0;
    while (i < level) {
      out = out + "  ";
      i = i + 1;
    };
    return out;
  };
  jsonKVString (key : string, value : string) : string  {
    return ((("\"" + key) + "\":\"") + this.escapeJson(value)) + "\"";
  };
  jsonKVNumber (key : string, value : string) : string  {
    return (("\"" + key) + "\":") + value;
  };
  jsonObject (level : number, fields : Array<string>) : string  {
    const pad : string  = this.indent(level);
    const childPad : string  = this.indent((level + 1));
    let out : string  = "{\n";
    const cnt : number  = fields.length;
    let i : number  = 0;
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
  parsedValueToJson (token : TokenSlice, level : number) : string  {
    if ( token.hasSliceValue() ) {
    } else {
      return "null";
    }
    const kind : string  = token.getSliceValueKind();
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
  tokenToJson (token : TokenSlice, level : number) : string  {
    const pad : string  = this.indent(level);
    const childPad : string  = this.indent((level + 1));
    let out : string  = pad + "{\n";
    out = out + (childPad + (("\"tag\":\"" + this.escapeJson(token.tag)) + "\",\n"));
    out = out + (childPad + (("\"text\":\"" + this.escapeJson((token).toString())) + "\",\n"));
    out = out + (((childPad + "\"parsed\":") + this.parsedValueToJson(token, (level + 1))) + ",\n");
    out = out + (childPad + "\"children\":[");
    const cc : number  = token.childCount();
    let i : number  = 0;
    if ( cc > 0 ) {
      out = out + "\n";
      while (i < cc) {
        if ( i > 0 ) {
          out = out + ",\n";
        }
        const ch : TokenSlice  = token.getChild(i);
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
  findDot (text : string) : number  {
    const __len : number  = text.length;
    let i : number  = 0;
    while (i < __len) {
      if ( (text.charCodeAt(i )) == 46 ) {
        return i;
      }
      i = i + 1;
    };
    return -1;
  };
  normalizeJsonPath (path : string) : string  {
    const raw : string  = (this).trim(path);
    if ( (raw.length) == 0 ) {
      return "";
    }
    let out : string  = "";
    const __len : number  = raw.length;
    let i : number  = 0;
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
      const ch : number  = raw.charCodeAt(i );
      if ( ch == 91 ) {
        i = i + 1;
        if ( (out.length) > 0 ) {
          out = out + ".";
        }
        while (i < __len) {
          const ch2 : number  = raw.charCodeAt(i );
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
  jsonTokenValue (token : TokenSlice, path : string) : string  {
    const p : string  = this.normalizeJsonPath(path);
    if ( (p.length) == 0 ) {
      return "";
    }
    const dotPos : number  = this.findDot(p);
    let head : string  = p;
    let tail : string  = "";
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
      const dotPos2 : number  = this.findDot(tail);
      let idxText : string  = tail;
      let rest : string  = "";
      if ( dotPos2 >= 0 ) {
        idxText = tail.substring(0, dotPos2 );
        rest = tail.substring((dotPos2 + 1), (tail.length) );
      }
      const idxSlice : TokenSlice  = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() == 0 ) {
        return "";
      }
      if ( idxSlice.hasInteger(0, ((idxSlice).length() - 1)) ) {
      } else {
        return "";
      }
      const childIdx : number  = idxSlice.parseInteger(0, ((idxSlice).length() - 1));
      if ( (childIdx < 0) || (childIdx >= token.childCount()) ) {
        return "";
      }
      const ch : TokenSlice  = token.getChild(childIdx);
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
      const kind : string  = token.getSliceValueKind();
      if ( tail == "kind" ) {
        return kind;
      }
      if ( kind == "recovery-time" ) {
        const rv : RecoveryTimeValue  = token.getAsRecoveryTimeValue();
        if ( tail == "value" ) {
          return "" + rv.value;
        }
        if ( tail == "unit" ) {
          return rv.unit;
        }
      }
      if ( kind == "time-value" ) {
        const tv : TimeValueValue  = token.getAsTimeValueValue();
        if ( tail == "minutes" ) {
          return "" + tv.minutes;
        }
        if ( tail == "seconds" ) {
          return "" + tv.seconds;
        }
      }
      if ( kind == "datetime" ) {
        const dtv : DateTimeValue  = token.getAsDateTimeValue();
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
        const dv : DistanceValue  = token.getAsDistanceValue();
        if ( tail == "value" ) {
          return "" + dv.value;
        }
        if ( tail == "unit" ) {
          return dv.unit;
        }
      }
      if ( kind == "weight" ) {
        const wv : WeightValue  = token.getAsWeightValue();
        if ( tail == "value" ) {
          return "" + wv.value;
        }
        if ( tail == "unit" ) {
          return wv.unit;
        }
      }
      if ( kind == "percentage" ) {
        const pv : PercentageValue  = token.getAsPercentageValue();
        if ( tail == "value" ) {
          return "" + pv.value;
        }
      }
      if ( kind == "num-range" ) {
        const nr : NumRangeValue  = token.getAsNumRangeValue();
        if ( tail == "minValue" ) {
          return "" + nr.minValue;
        }
        if ( tail == "maxValue" ) {
          return "" + nr.maxValue;
        }
      }
      if ( kind == "percentage-range" ) {
        const pr : PercentageRangeValue  = token.getAsPercentageRangeValue();
        if ( tail == "minValue" ) {
          return "" + pr.minValue;
        }
        if ( tail == "maxValue" ) {
          return "" + pr.maxValue;
        }
      }
      if ( kind == "zone" ) {
        const zv : ZoneValue  = token.getAsZoneValue();
        if ( tail == "zone" ) {
          return "" + zv.zone;
        }
      }
      if ( kind == "repeat-block" ) {
        const rb : RepeatBlockValue  = token.getAsRepeatBlockValue();
        if ( tail == "loadMode" ) {
          return rb.loadMode;
        }
        if ( tail == "partCount" ) {
          return "" + (rb.parts.length);
        }
        if ( (this).startsWith(tail, "parts.") ) {
          const rest1 : string  = tail.substring(6, (tail.length) );
          const dotPos3 : number  = this.findDot(rest1);
          let idxText_1 : string  = rest1;
          let fieldName : string  = "";
          if ( dotPos3 >= 0 ) {
            idxText_1 = rest1.substring(0, dotPos3 );
            fieldName = rest1.substring((dotPos3 + 1), (rest1.length) );
          }
          const idxSlice2 : TokenSlice  = TokenSlice.fromText(idxText_1);
          if ( (idxSlice2).length() == 0 ) {
            return "";
          }
          if ( idxSlice2.hasInteger(0, ((idxSlice2).length() - 1)) ) {
          } else {
            return "";
          }
          const partIdx : number  = idxSlice2.parseInteger(0, ((idxSlice2).length() - 1));
          if ( (partIdx < 0) || (partIdx >= (rb.parts.length)) ) {
            return "";
          }
          const part : RepeatPartValue  = rb.parts[partIdx];
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
        const lr : LeftRightValue  = token.getAsLeftRightValue();
        if ( tail == "side" ) {
          return lr.side;
        }
      }
      if ( kind == "feeling" ) {
        const fv : FeelingValue  = token.getAsFeelingValue();
        if ( (tail == "type") || (tail == "subKind") ) {
          return fv.kind;
        }
        if ( tail == "score" ) {
          return "" + fv.score;
        }
      }
      if ( kind == "effort" ) {
        const ev : EffortValue  = token.getAsEffortValue();
        if ( (tail == "type") || (tail == "subKind") ) {
          return ev.kind;
        }
        if ( tail == "score" ) {
          return "" + ev.score;
        }
      }
      if ( kind == "body-metric" ) {
        const bm : BodyMetricValue  = token.getAsBodyMetricValue();
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
        const cv : CircuitValue  = token.getAsCircuitValue();
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
        const dl : DetailsLevelValue  = token.getAsDetailsLevelValue();
        if ( tail == "level" ) {
          return "" + dl.level;
        }
        if ( tail == "marker" ) {
          return dl.marker;
        }
      }
      if ( kind == "recovery" ) {
        const rv2 : RecoveryValue  = token.getAsRecoveryValue();
        if ( tail == "label" ) {
          return rv2.label;
        }
      }
      if ( kind == "context-entry" ) {
        const ce : ContextEntryValue  = token.getAsContextEntryValue();
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
        const piv : PositiveIntegerValue  = token.getAsPositiveIntegerValue();
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
  runSpec (specText : string) : Array<string>  {
    let out : Array<string> | undefined  = [];
    const parser : NGTestSpecParser  = NGTestSpecParser.create();
    const cases : Array<NGTestCase>  = parser.parse(specText);
    for ( let i = 0; i < cases.length; i++) {
      var tc = cases[i];
      const p : Parser  = new Parser(tc.input, this.createDetectors());
      (p).start();
      if ( p.getCount() == 0 ) {
        out.push(((("Test " + ("#" + ("" + (i + 1)))) + " failed: no tokens for input '") + tc.input) + "'");
        continue;
      }
      const results : Array<TokenSlice>  = p.getResults();
      const root : TokenSlice  = results[0];
      for ( let j = 0; j < tc.expects.length; j++) {
        var ex = tc.expects[j];
        if ( ex.kind == "tag" ) {
          const tagMatches : boolean  = root.tag == ex.value;
          if ( ex.negated ) {
            if ( tagMatches ) {
              const msgNotTag : string  = (("Test " + ("#" + ("" + (i + 1)))) + " expect not tag '") + ex.value;
              out.push(msgNotTag + "' but it matched");
            }
          } else {
            if ( tagMatches ) {
            } else {
              const msgTag : string  = (("Test " + ("#" + ("" + (i + 1)))) + " expect tag '") + ex.value;
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
          const ch : TokenSlice  = root.getChild(ex.childIndex);
          if ( ex.field == "string" ) {
            const got : string  = (ch).toString();
            const strMatches : boolean  = got == ex.value;
            if ( ex.negated ) {
              if ( strMatches ) {
                const msgNotStr : string  = (((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + ("" + ex.childIndex)) + " not string '") + ex.value;
                out.push(msgNotStr + "' but it matched");
              }
            } else {
              if ( strMatches ) {
              } else {
                const msgStr : string  = (((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + ("" + ex.childIndex)) + " string '") + ex.value;
                out.push(((msgStr + "' but got '") + got) + "'");
              }
            }
            continue;
          }
          if ( ex.field == "tag" ) {
            const gotTag : string  = ch.tag;
            const tagMatches_1 : boolean  = gotTag == ex.value;
            if ( ex.negated ) {
              if ( tagMatches_1 ) {
                const msgNotTag_1 : string  = (((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + ("" + ex.childIndex)) + " not tag '") + ex.value;
                out.push(msgNotTag_1 + "' but it matched");
              }
            } else {
              if ( tagMatches_1 ) {
              } else {
                const msgTag_1 : string  = (((("Test " + ("#" + ("" + (i + 1)))) + " expect child ") + ("" + ex.childIndex)) + " tag '") + ex.value;
                out.push(((msgTag_1 + "' but got '") + gotTag) + "'");
              }
            }
            continue;
          }
          out.push(((("Test " + ("#" + ("" + (i + 1)))) + " unsupported field '") + ex.field) + "' in Expect child");
          continue;
        }
        if ( ex.kind == "json" ) {
          const gotJson : string  = this.jsonTokenValue(root, ex.field);
          if ( (gotJson.length) == 0 ) {
            if ( ex.negated ) {
              continue;
            }
            out.push(((("Test " + ("#" + ("" + (i + 1)))) + " expect json path '") + ex.field) + "' was not found");
            continue;
          }
          const gotNorm : string  = this.normalizeJsonNumericText(gotJson);
          const expNorm : string  = this.normalizeJsonNumericText(ex.value);
          const jsonMatches : boolean  = (gotJson == ex.value) || (gotNorm == expNorm);
          if ( ex.negated ) {
            if ( jsonMatches ) {
              const msgNotJson : string  = ((("Test " + ("#" + ("" + (i + 1)))) + " expect json path '") + ex.field) + "' not to be '";
              out.push((msgNotJson + ex.value) + "' but it matched");
            }
          } else {
            if ( jsonMatches ) {
            } else {
              const msgJson : string  = ((("Test " + ("#" + ("" + (i + 1)))) + " expect json path '") + ex.field) + "' value '";
              out.push((((msgJson + ex.value) + "' but got '") + gotJson) + "'");
            }
          }
          continue;
        }
      };
    };
    return out;
  };
  exportJson (specText : string) : Array<string>  {
    let out : Array<string> | undefined  = [];
    const parser : NGTestSpecParser  = NGTestSpecParser.create();
    const cases : Array<NGTestCase>  = parser.parse(specText);
    let files : Array<string> | undefined  = [];
    let payloads : Array<string> | undefined  = [];
    let counts : Array<number> | undefined  = [];
    for ( let i = 0; i < cases.length; i++) {
      var tc = cases[i];
      if ( (tc.jsonFile.length) == 0 ) {
        continue;
      }
      const p : Parser  = new Parser(tc.input, this.createDetectors());
      (p).start();
      if ( p.getCount() == 0 ) {
        continue;
      }
      const results : Array<TokenSlice>  = p.getResults();
      const root : TokenSlice  = results[0];
      const json : string  = this.tokenToJson(root, 0);
      let fileIdx : number  = -1;
      let search : number  = 0;
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
        const prevPayload : string  = payloads[fileIdx];
        const nextPayload : string  = (prevPayload + ",\n") + json;
        payloads[fileIdx] = nextPayload;
        const prevCount : number  = counts[fileIdx];
        counts[fileIdx] = prevCount + 1;
      }
    };
    let j : number  = 0;
    while (j < (files.length)) {
      const fileName : string  = files[j];
      let payload : string  = payloads[j];
      const cnt : number  = counts[j];
      if ( cnt > 1 ) {
        payload = ("[\n" + payload) + "\n]";
      }
      out.push((fileName + "\t") + payload);
      j = j + 1;
    };
    return out;
  };
  static create () : NGTestRunner  {
    return new NGTestRunner();
  };
}
export class TokenDetectorModule  {
  constructor() {
  }
  static createKeyword (token : string) : KeywordDetector  {
    return KeywordDetector.create(token);
  };
  static createDateTime () : DateTimeDetector  {
    return DateTimeDetector.create();
  };
  static createSpace () : SpaceDetector  {
    return SpaceDetector.create();
  };
  static createNewline () : NewlineDetector  {
    return NewlineDetector.create();
  };
  static createPositiveInteger () : PositiveIntegerDetector  {
    return PositiveIntegerDetector.create();
  };
  static createDecimalNumber () : DecimalNumberDetector  {
    return DecimalNumberDetector.create();
  };
  static createTimeValue () : TimeValueDetector  {
    return TimeValueDetector.create();
  };
  static createRecoveryTime () : RecoveryTimeDetector  {
    return RecoveryTimeDetector.create();
  };
  static createRecovery () : RecoveryDetector  {
    return RecoveryDetector.create();
  };
  static createLeftRight () : LeftRightDetector  {
    return LeftRightDetector.create();
  };
  static createFeeling () : FeelingDetector  {
    return FeelingDetector.create();
  };
  static createEffort () : EffortDetector  {
    return EffortDetector.create();
  };
  static createBodyMetric () : BodyMetricDetector  {
    return BodyMetricDetector.create();
  };
  static createCircuit () : CircuitDetector  {
    return CircuitDetector.create();
  };
  static createContextEntry () : ContextEntryDetector  {
    return ContextEntryDetector.create();
  };
  static createSpeed () : SpeedDetector  {
    return SpeedDetector.create();
  };
  static createRepeatBlock () : RepeatBlockDetector  {
    return RepeatBlockDetector.create();
  };
  static createWeight () : WeightDetector  {
    return WeightDetector.create();
  };
  static createDistance () : DistanceDetector  {
    return DistanceDetector.create();
  };
  static createNumRangeBlock () : NumRangeBlockDetector  {
    return NumRangeBlockDetector.create();
  };
  static createDistanceRangeBlock () : DistanceRangeBlockDetector  {
    return DistanceRangeBlockDetector.create();
  };
  static createAMTimeValue () : AMTimeValueDetector  {
    return AMTimeValueDetector.create();
  };
  static defaultSportNames () : Array<string>  {
    const shared : NGSharedLists  = NGSharedLists.__singleton();
    return shared.defaultSportNames();
  };
  static createSportExercise () : SportExerciseDetector  {
    return SportExerciseDetector.create();
  };
  static createDetailsData () : DetailsDataDetector  {
    return DetailsDataDetector.create();
  };
  static createHeadingData () : HeadingDataDetector  {
    return HeadingDataDetector.create();
  };
  static createBPM () : BPMDetector  {
    return BPMDetector.create();
  };
  static createKCAL () : KCALDetector  {
    return KCALDetector.create();
  };
  static createPercentage () : PercentageDetector  {
    return PercentageDetector.create();
  };
  static createPercentageRange () : PercentageRangeDetector  {
    return PercentageRangeDetector.create();
  };
  static createRM () : RMDetector  {
    return RMDetector.create();
  };
  static createZone () : ZoneDetector  {
    return ZoneDetector.create();
  };
  static createRomanZone () : RomanZoneDetector  {
    return RomanZoneDetector.create();
  };
  static createStandardDetectors () : Array<TokenDetector>  {
    return StandardDetectors.create();
  };
  static createNGTestRunner () : NGTestRunner  {
    return NGTestRunner.create();
  };
  static createNGTestSpecParser () : NGTestSpecParser  {
    return NGTestSpecParser.create();
  };
}
class operatorsOfJSONArrayObject  {
  constructor() {
  }
  static forEach_2 (__self : Array<any>, cb : (item:Record<string, any>, index:number) => void) : void  {
    let cnt : number  = __self.length;
    let i : number  = 0;
    while (cnt > 0) {
      const value : Record<string, any>  = __self[i];
      cb(value, i);
      cnt = cnt - 1;
      i = i + 1;
    };
  };
}
