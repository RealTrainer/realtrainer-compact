class DateTimeValue  {
  constructor() {
    this.year = 0;     /** note: unused */
    this.month = 0;     /** note: unused */
    this.day = 0;     /** note: unused */
    this.hasTime = false;     /** note: unused */
    this.hour = 0;     /** note: unused */
    this.minute = 0;     /** note: unused */
    this.second = 0;     /** note: unused */
  }
}
class DistanceValue  {
  constructor() {
    this.value = 0;     /** note: unused */
    this.unit = "m";     /** note: unused */
  }
}
class PercentageValue  {
  constructor() {
    this.value = 0;     /** note: unused */
  }
}
class RecoveryTimeValue  {
  constructor() {
    this.value = 0;     /** note: unused */
    this.unit = "";     /** note: unused */
  }
}
class WeightValue  {
  constructor() {
    this.value = 0;     /** note: unused */
    this.unit = "kg";     /** note: unused */
  }
}
class NumRangeValue  {
  constructor() {
    this.minValue = 0;     /** note: unused */
    this.maxValue = 0;     /** note: unused */
  }
}
class PercentageRangeValue  {
  constructor() {
    this.minValue = 0;     /** note: unused */
    this.maxValue = 0;     /** note: unused */
  }
}
class RepeatBlockValue  {
  constructor() {
    this.count = 0;     /** note: unused */
  }
}
class SetRepRangeLoadValue  {
  constructor() {
    this.setsMin = 0;     /** note: unused */
    this.setsMax = 0;     /** note: unused */
    this.repsMin = 0;     /** note: unused */
    this.repsMax = 0;     /** note: unused */
    this.mode = "";     /** note: unused */
    this.load = 0;     /** note: unused */
    this.unit = "";     /** note: unused */
  }
}
class ZoneValue  {
  constructor() {
    this.zone = 0;     /** note: unused */
  }
}
class PositiveIntegerValue  {
  constructor() {
    this.value = 0;     /** note: unused */
  }
}
class DetailsLevelValue  {
  constructor() {
    this.level = 0;     /** note: unused */
    this.marker = "";     /** note: unused */
  }
}
class RecoveryValue  {
  constructor() {
    this.label = "Recovery";     /** note: unused */
  }
}
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
module.exports.SliceParsedValue = SliceParsedValue;
module.exports.TokenSlice = TokenSlice;
