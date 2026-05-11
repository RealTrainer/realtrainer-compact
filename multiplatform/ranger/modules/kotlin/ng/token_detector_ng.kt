
class DateTimeValue 
 {
  @JvmField var kind : String  = "datetime";
  @JvmField var year : Int  = 0;
  @JvmField var month : Int  = 0;
  @JvmField var day : Int  = 0;
  @JvmField var hasTime : Boolean  = false;
  @JvmField var hour : Int  = 0;
  @JvmField var minute : Int  = 0;
  @JvmField var second : Int  = 0;
  @JvmField var timezone : String?  = null;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : DateTimeValue {
      val obj : DateTimeValue  =  DateTimeValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("year")) null else dict.optInt("year"));
        if ( v_1 != null ) {
          obj.year = v_1!!;
        }
        val v_2 : Int?  = (if (dict.isNull("month")) null else dict.optInt("month"));
        if ( v_2 != null ) {
          obj.month = v_2!!;
        }
        val v_3 : Int?  = (if (dict.isNull("day")) null else dict.optInt("day"));
        if ( v_3 != null ) {
          obj.day = v_3!!;
        }
        val v_4 : Boolean?  = (if (dict.isNull("hasTime")) null else dict.optBoolean("hasTime"));
        if ( v_4 != null ) {
          obj.hasTime = v_4!!;
        }
        val v_5 : Int?  = (if (dict.isNull("hour")) null else dict.optInt("hour"));
        if ( v_5 != null ) {
          obj.hour = v_5!!;
        }
        val v_6 : Int?  = (if (dict.isNull("minute")) null else dict.optInt("minute"));
        if ( v_6 != null ) {
          obj.minute = v_6!!;
        }
        val v_7 : Int?  = (if (dict.isNull("second")) null else dict.optInt("second"));
        if ( v_7 != null ) {
          obj.second = v_7!!;
        }
        val v_8 : String?  = (if (dict.isNull("timezone")) null else dict.optString("timezone"));
        if ( v_8 != null ) {
          obj.timezone = v_8!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("year" , this.year);
      res.put("month" , this.month);
      res.put("day" , this.day);
      res.put("hasTime" , this.hasTime);
      res.put("hour" , this.hour);
      res.put("minute" , this.minute);
      res.put("second" , this.second);
      if ( this.timezone != null ) {
        res.put("timezone" , this.timezone!!);
      }
    } catch( e : Exception ) {
    }
    return res;
  }
}


class DistanceValue 
 {
  @JvmField var kind : String  = "distance";
  @JvmField var value : Int  = 0;
  @JvmField var unit : String  = "m";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : DistanceValue {
      val obj : DistanceValue  =  DistanceValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("value")) null else dict.optInt("value"));
        if ( v_1 != null ) {
          obj.value = v_1!!;
        }
        val v_2 : String?  = (if (dict.isNull("unit")) null else dict.optString("unit"));
        if ( v_2 != null ) {
          obj.unit = v_2!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("value" , this.value);
      res.put("unit" , this.unit);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class PercentageValue 
 {
  @JvmField var kind : String  = "percentage";
  @JvmField var value : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : PercentageValue {
      val obj : PercentageValue  =  PercentageValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("value")) null else dict.optInt("value"));
        if ( v_1 != null ) {
          obj.value = v_1!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("value" , this.value);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class RecoveryTimeValue 
 {
  @JvmField var kind : String  = "recovery-time";
  @JvmField var value : Int  = 0;
  @JvmField var unit : String  = "";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : RecoveryTimeValue {
      val obj : RecoveryTimeValue  =  RecoveryTimeValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("value")) null else dict.optInt("value"));
        if ( v_1 != null ) {
          obj.value = v_1!!;
        }
        val v_2 : String?  = (if (dict.isNull("unit")) null else dict.optString("unit"));
        if ( v_2 != null ) {
          obj.unit = v_2!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("value" , this.value);
      res.put("unit" , this.unit);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class WeightValue 
 {
  @JvmField var kind : String  = "weight";
  @JvmField var value : Int  = 0;
  @JvmField var unit : String  = "kg";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : WeightValue {
      val obj : WeightValue  =  WeightValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("value")) null else dict.optInt("value"));
        if ( v_1 != null ) {
          obj.value = v_1!!;
        }
        val v_2 : String?  = (if (dict.isNull("unit")) null else dict.optString("unit"));
        if ( v_2 != null ) {
          obj.unit = v_2!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("value" , this.value);
      res.put("unit" , this.unit);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class NumRangeValue 
 {
  @JvmField var kind : String  = "num-range";
  @JvmField var minValue : Int  = 0;
  @JvmField var maxValue : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : NumRangeValue {
      val obj : NumRangeValue  =  NumRangeValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("minValue")) null else dict.optInt("minValue"));
        if ( v_1 != null ) {
          obj.minValue = v_1!!;
        }
        val v_2 : Int?  = (if (dict.isNull("maxValue")) null else dict.optInt("maxValue"));
        if ( v_2 != null ) {
          obj.maxValue = v_2!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("minValue" , this.minValue);
      res.put("maxValue" , this.maxValue);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class PercentageRangeValue 
 {
  @JvmField var kind : String  = "percentage-range";
  @JvmField var minValue : Int  = 0;
  @JvmField var maxValue : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : PercentageRangeValue {
      val obj : PercentageRangeValue  =  PercentageRangeValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("minValue")) null else dict.optInt("minValue"));
        if ( v_1 != null ) {
          obj.minValue = v_1!!;
        }
        val v_2 : Int?  = (if (dict.isNull("maxValue")) null else dict.optInt("maxValue"));
        if ( v_2 != null ) {
          obj.maxValue = v_2!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("minValue" , this.minValue);
      res.put("maxValue" , this.maxValue);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class RepeatBlockValue 
 {
  @JvmField var kind : String  = "repeat-block";
  @JvmField var count : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : RepeatBlockValue {
      val obj : RepeatBlockValue  =  RepeatBlockValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("count")) null else dict.optInt("count"));
        if ( v_1 != null ) {
          obj.count = v_1!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("count" , this.count);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class SetRepRangeLoadValue 
 {
  @JvmField var kind : String  = "set-rep-range-load";
  @JvmField var count : Int  = 1;
  @JvmField var setsMin : Int  = 0;
  @JvmField var setsMax : Int  = 0;
  @JvmField var repsMin : Int  = 0;
  @JvmField var repsMax : Int  = 0;
  @JvmField var mode : String  = "";
  @JvmField var load : Int  = 0;
  @JvmField var unit : String  = "";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : SetRepRangeLoadValue {
      val obj : SetRepRangeLoadValue  =  SetRepRangeLoadValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("count")) null else dict.optInt("count"));
        if ( v_1 != null ) {
          obj.count = v_1!!;
        }
        val v_2 : Int?  = (if (dict.isNull("setsMin")) null else dict.optInt("setsMin"));
        if ( v_2 != null ) {
          obj.setsMin = v_2!!;
        }
        val v_3 : Int?  = (if (dict.isNull("setsMax")) null else dict.optInt("setsMax"));
        if ( v_3 != null ) {
          obj.setsMax = v_3!!;
        }
        val v_4 : Int?  = (if (dict.isNull("repsMin")) null else dict.optInt("repsMin"));
        if ( v_4 != null ) {
          obj.repsMin = v_4!!;
        }
        val v_5 : Int?  = (if (dict.isNull("repsMax")) null else dict.optInt("repsMax"));
        if ( v_5 != null ) {
          obj.repsMax = v_5!!;
        }
        val v_6 : String?  = (if (dict.isNull("mode")) null else dict.optString("mode"));
        if ( v_6 != null ) {
          obj.mode = v_6!!;
        }
        val v_7 : Int?  = (if (dict.isNull("load")) null else dict.optInt("load"));
        if ( v_7 != null ) {
          obj.load = v_7!!;
        }
        val v_8 : String?  = (if (dict.isNull("unit")) null else dict.optString("unit"));
        if ( v_8 != null ) {
          obj.unit = v_8!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("count" , this.count);
      res.put("setsMin" , this.setsMin);
      res.put("setsMax" , this.setsMax);
      res.put("repsMin" , this.repsMin);
      res.put("repsMax" , this.repsMax);
      res.put("mode" , this.mode);
      res.put("load" , this.load);
      res.put("unit" , this.unit);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class ZoneValue 
 {
  @JvmField var kind : String  = "zone";
  @JvmField var zone : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : ZoneValue {
      val obj : ZoneValue  =  ZoneValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("zone")) null else dict.optInt("zone"));
        if ( v_1 != null ) {
          obj.zone = v_1!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("zone" , this.zone);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class PositiveIntegerValue 
 {
  @JvmField var kind : String  = "positive-integer";
  @JvmField var value : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : PositiveIntegerValue {
      val obj : PositiveIntegerValue  =  PositiveIntegerValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("value")) null else dict.optInt("value"));
        if ( v_1 != null ) {
          obj.value = v_1!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("value" , this.value);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class DetailsLevelValue 
 {
  @JvmField var kind : String  = "details-level";
  @JvmField var level : Int  = 0;
  @JvmField var marker : String  = "";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : DetailsLevelValue {
      val obj : DetailsLevelValue  =  DetailsLevelValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("level")) null else dict.optInt("level"));
        if ( v_1 != null ) {
          obj.level = v_1!!;
        }
        val v_2 : String?  = (if (dict.isNull("marker")) null else dict.optString("marker"));
        if ( v_2 != null ) {
          obj.marker = v_2!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("level" , this.level);
      res.put("marker" , this.marker);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class RecoveryValue 
 {
  @JvmField var kind : String  = "recovery";
  @JvmField var label : String  = "Recovery";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : RecoveryValue {
      val obj : RecoveryValue  =  RecoveryValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : String?  = (if (dict.isNull("label")) null else dict.optString("label"));
        if ( v_1 != null ) {
          obj.label = v_1!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("label" , this.label);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class TimeValueValue 
 {
  @JvmField var kind : String  = "time-value";
  @JvmField var minutes : Int  = 0;
  @JvmField var seconds : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : TimeValueValue {
      val obj : TimeValueValue  =  TimeValueValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("minutes")) null else dict.optInt("minutes"));
        if ( v_1 != null ) {
          obj.minutes = v_1!!;
        }
        val v_2 : Int?  = (if (dict.isNull("seconds")) null else dict.optInt("seconds"));
        if ( v_2 != null ) {
          obj.seconds = v_2!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("minutes" , this.minutes);
      res.put("seconds" , this.seconds);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class LeftRightValue 
 {
  @JvmField var kind : String  = "left-right";
  @JvmField var side : String  = "";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : LeftRightValue {
      val obj : LeftRightValue  =  LeftRightValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : String?  = (if (dict.isNull("side")) null else dict.optString("side"));
        if ( v_1 != null ) {
          obj.side = v_1!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("side" , this.side);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class FeelingValue 
 {
  @JvmField var kind : String  = "feeling";
  @JvmField var score : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : FeelingValue {
      val obj : FeelingValue  =  FeelingValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("score")) null else dict.optInt("score"));
        if ( v_1 != null ) {
          obj.score = v_1!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("score" , this.score);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class EffortValue 
 {
  @JvmField var kind : String  = "effort";
  @JvmField var score : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : EffortValue {
      val obj : EffortValue  =  EffortValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("score")) null else dict.optInt("score"));
        if ( v_1 != null ) {
          obj.score = v_1!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("score" , this.score);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class BodyMetricValue 
 {
  @JvmField var kind : String  = "body-metric";
  @JvmField var metric : String  = "";
  @JvmField var primaryValue : Double  = 0.0;
  @JvmField var secondaryValue : Int  = 0;
  @JvmField var unit : String  = "";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : BodyMetricValue {
      val obj : BodyMetricValue  =  BodyMetricValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : String?  = (if (dict.isNull("metric")) null else dict.optString("metric"));
        if ( v_1 != null ) {
          obj.metric = v_1!!;
        }
        val v_2 : Double?  = (if (dict.isNull("primaryValue")) null else dict.optDouble("primaryValue"));
        if ( v_2 != null ) {
          obj.primaryValue = v_2!!;
        }
        val v_3 : Int?  = (if (dict.isNull("secondaryValue")) null else dict.optInt("secondaryValue"));
        if ( v_3 != null ) {
          obj.secondaryValue = v_3!!;
        }
        val v_4 : String?  = (if (dict.isNull("unit")) null else dict.optString("unit"));
        if ( v_4 != null ) {
          obj.unit = v_4!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("metric" , this.metric);
      res.put("primaryValue" , this.primaryValue);
      res.put("secondaryValue" , this.secondaryValue);
      res.put("unit" , this.unit);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class CircuitValue 
 {
  @JvmField var kind : String  = "circuit";
  @JvmField var rounds : Int  = 0;
  @JvmField var restValue : Int  = 0;
  @JvmField var restUnit : String  = "";
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : CircuitValue {
      val obj : CircuitValue  =  CircuitValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : Int?  = (if (dict.isNull("rounds")) null else dict.optInt("rounds"));
        if ( v_1 != null ) {
          obj.rounds = v_1!!;
        }
        val v_2 : Int?  = (if (dict.isNull("restValue")) null else dict.optInt("restValue"));
        if ( v_2 != null ) {
          obj.restValue = v_2!!;
        }
        val v_3 : String?  = (if (dict.isNull("restUnit")) null else dict.optString("restUnit"));
        if ( v_3 != null ) {
          obj.restUnit = v_3!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("rounds" , this.rounds);
      res.put("restValue" , this.restValue);
      res.put("restUnit" , this.restUnit);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class ContextEntryValue 
 {
  @JvmField var kind : String  = "context-entry";
  @JvmField var content : String  = "";
  @JvmField var name : String  = "";
  @JvmField var value : String  = "";
  @JvmField var hasNumeric : Boolean  = false;
  @JvmField var numericValue : Double  = 0.0;
  @JvmField var unit : String  = "";
  @JvmField var basis : String  = "";
  @JvmField var source : String  = "";
  @JvmField var hasConfidence : Boolean  = false;
  @JvmField var confidence : Double  = 0.0;
  @JvmField var hasGoodness : Boolean  = false;
  @JvmField var goodness : Int  = 0;
  companion object {
    
    fun  fromDictionary( dict : JSONDataObject) : ContextEntryValue {
      val obj : ContextEntryValue  =  ContextEntryValue();
      try {
        val v : String?  = (if (dict.isNull("kind")) null else dict.optString("kind"));
        if ( v != null ) {
          obj.kind = v!!;
        }
        val v_1 : String?  = (if (dict.isNull("content")) null else dict.optString("content"));
        if ( v_1 != null ) {
          obj.content = v_1!!;
        }
        val v_2 : String?  = (if (dict.isNull("name")) null else dict.optString("name"));
        if ( v_2 != null ) {
          obj.name = v_2!!;
        }
        val v_3 : String?  = (if (dict.isNull("value")) null else dict.optString("value"));
        if ( v_3 != null ) {
          obj.value = v_3!!;
        }
        val v_4 : Boolean?  = (if (dict.isNull("hasNumeric")) null else dict.optBoolean("hasNumeric"));
        if ( v_4 != null ) {
          obj.hasNumeric = v_4!!;
        }
        val v_5 : Double?  = (if (dict.isNull("numericValue")) null else dict.optDouble("numericValue"));
        if ( v_5 != null ) {
          obj.numericValue = v_5!!;
        }
        val v_6 : String?  = (if (dict.isNull("unit")) null else dict.optString("unit"));
        if ( v_6 != null ) {
          obj.unit = v_6!!;
        }
        val v_7 : String?  = (if (dict.isNull("basis")) null else dict.optString("basis"));
        if ( v_7 != null ) {
          obj.basis = v_7!!;
        }
        val v_8 : String?  = (if (dict.isNull("source")) null else dict.optString("source"));
        if ( v_8 != null ) {
          obj.source = v_8!!;
        }
        val v_9 : Boolean?  = (if (dict.isNull("hasConfidence")) null else dict.optBoolean("hasConfidence"));
        if ( v_9 != null ) {
          obj.hasConfidence = v_9!!;
        }
        val v_10 : Double?  = (if (dict.isNull("confidence")) null else dict.optDouble("confidence"));
        if ( v_10 != null ) {
          obj.confidence = v_10!!;
        }
        val v_11 : Boolean?  = (if (dict.isNull("hasGoodness")) null else dict.optBoolean("hasGoodness"));
        if ( v_11 != null ) {
          obj.hasGoodness = v_11!!;
        }
        val v_12 : Int?  = (if (dict.isNull("goodness")) null else dict.optInt("goodness"));
        if ( v_12 != null ) {
          obj.goodness = v_12!!;
        }
      } catch( e : Exception ) {
      }
      return obj;
    }
  }
  
  open fun  toDictionary() : JSONDataObject {
    var res : JSONDataObject  = JSONObject();
    try {
      res.put("kind" , this.kind);
      res.put("content" , this.content);
      res.put("name" , this.name);
      res.put("value" , this.value);
      res.put("hasNumeric" , this.hasNumeric);
      res.put("numericValue" , this.numericValue);
      res.put("unit" , this.unit);
      res.put("basis" , this.basis);
      res.put("source" , this.source);
      res.put("hasConfidence" , this.hasConfidence);
      res.put("confidence" , this.confidence);
      res.put("hasGoodness" , this.hasGoodness);
      res.put("goodness" , this.goodness);
    } catch( e : Exception ) {
    }
    return res;
  }
}


class SliceParsedValue 
 {
  @JvmField var kind : String  = "";
  @JvmField var dateTime : DateTimeValue?  = null;
  @JvmField var distance : DistanceValue?  = null;
  @JvmField var percentage : PercentageValue?  = null;
  @JvmField var recoveryTime : RecoveryTimeValue?  = null;
  @JvmField var weight : WeightValue?  = null;
  @JvmField var numRange : NumRangeValue?  = null;
  @JvmField var percentageRange : PercentageRangeValue?  = null;
  @JvmField var repeatBlock : RepeatBlockValue?  = null;
  @JvmField var setRepRangeLoad : SetRepRangeLoadValue?  = null;
  @JvmField var zone : ZoneValue?  = null;
  @JvmField var positiveInteger : PositiveIntegerValue?  = null;
  @JvmField var detailsLevel : DetailsLevelValue?  = null;
  @JvmField var recovery : RecoveryValue?  = null;
  @JvmField var timeValue : TimeValueValue?  = null;
  @JvmField var leftRight : LeftRightValue?  = null;
  @JvmField var feeling : FeelingValue?  = null;
  @JvmField var effort : EffortValue?  = null;
  @JvmField var bodyMetric : BodyMetricValue?  = null;
  @JvmField var circuit : CircuitValue?  = null;
  @JvmField var contextEntry : ContextEntryValue?  = null;
  companion object {
    
    fun  create( kind : String) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = kind;
      return out;
    }
    
    fun  fromDateTime( value : DateTimeValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "datetime";
      out.dateTime = value;
      return out;
    }
    
    fun  fromDistance( value : DistanceValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "distance";
      out.distance = value;
      return out;
    }
    
    fun  fromPercentage( value : PercentageValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "percentage";
      out.percentage = value;
      return out;
    }
    
    fun  fromRecoveryTime( value : RecoveryTimeValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "recovery-time";
      out.recoveryTime = value;
      return out;
    }
    
    fun  fromWeight( value : WeightValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "weight";
      out.weight = value;
      return out;
    }
    
    fun  fromNumRange( value : NumRangeValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "num-range";
      out.numRange = value;
      return out;
    }
    
    fun  fromPercentageRange( value : PercentageRangeValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "percentage-range";
      out.percentageRange = value;
      return out;
    }
    
    fun  fromRepeatBlock( value : RepeatBlockValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "repeat-block";
      out.repeatBlock = value;
      return out;
    }
    
    fun  fromSetRepRangeLoad( value : SetRepRangeLoadValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "set-rep-range-load";
      out.setRepRangeLoad = value;
      return out;
    }
    
    fun  fromZone( value : ZoneValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "zone";
      out.zone = value;
      return out;
    }
    
    fun  fromPositiveInteger( value : PositiveIntegerValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "positive-integer";
      out.positiveInteger = value;
      return out;
    }
    
    fun  fromDetailsLevel( value : DetailsLevelValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "details-level";
      out.detailsLevel = value;
      return out;
    }
    
    fun  fromRecovery( value : RecoveryValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "recovery";
      out.recovery = value;
      return out;
    }
    
    fun  fromTimeValue( value : TimeValueValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "time-value";
      out.timeValue = value;
      return out;
    }
    
    fun  fromLeftRight( value : LeftRightValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "left-right";
      out.leftRight = value;
      return out;
    }
    
    fun  fromFeeling( value : FeelingValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "feeling";
      out.feeling = value;
      return out;
    }
    
    fun  fromEffort( value : EffortValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "effort";
      out.effort = value;
      return out;
    }
    
    fun  fromBodyMetric( value : BodyMetricValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "body-metric";
      out.bodyMetric = value;
      return out;
    }
    
    fun  fromCircuit( value : CircuitValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "circuit";
      out.circuit = value;
      return out;
    }
    
    fun  fromContextEntry( value : ContextEntryValue) : SliceParsedValue {
      val out : SliceParsedValue  =  SliceParsedValue();
      out.kind = "context-entry";
      out.contextEntry = value;
      return out;
    }
  }
  
  open fun  hasDateTime() : Boolean {
    return dateTime != null;
  }
  
  open fun  getDateTime() : DateTimeValue {
    if ( dateTime != null ) {
      return dateTime!!;
    }
    return  DateTimeValue();
  }
  
  open fun  hasDistance() : Boolean {
    return distance != null;
  }
  
  open fun  getDistance() : DistanceValue {
    if ( distance != null ) {
      return distance!!;
    }
    return  DistanceValue();
  }
  
  open fun  hasPercentage() : Boolean {
    return percentage != null;
  }
  
  open fun  getPercentage() : PercentageValue {
    if ( percentage != null ) {
      return percentage!!;
    }
    return  PercentageValue();
  }
  
  open fun  hasRecoveryTime() : Boolean {
    return recoveryTime != null;
  }
  
  open fun  getRecoveryTime() : RecoveryTimeValue {
    if ( recoveryTime != null ) {
      return recoveryTime!!;
    }
    return  RecoveryTimeValue();
  }
  
  open fun  hasWeight() : Boolean {
    return weight != null;
  }
  
  open fun  getWeight() : WeightValue {
    if ( weight != null ) {
      return weight!!;
    }
    return  WeightValue();
  }
  
  open fun  hasNumRange() : Boolean {
    return numRange != null;
  }
  
  open fun  getNumRange() : NumRangeValue {
    if ( numRange != null ) {
      return numRange!!;
    }
    return  NumRangeValue();
  }
  
  open fun  hasPercentageRange() : Boolean {
    return percentageRange != null;
  }
  
  open fun  getPercentageRange() : PercentageRangeValue {
    if ( percentageRange != null ) {
      return percentageRange!!;
    }
    return  PercentageRangeValue();
  }
  
  open fun  hasRepeatBlock() : Boolean {
    return repeatBlock != null;
  }
  
  open fun  getRepeatBlock() : RepeatBlockValue {
    if ( repeatBlock != null ) {
      return repeatBlock!!;
    }
    return  RepeatBlockValue();
  }
  
  open fun  hasSetRepRangeLoad() : Boolean {
    return setRepRangeLoad != null;
  }
  
  open fun  getSetRepRangeLoad() : SetRepRangeLoadValue {
    if ( setRepRangeLoad != null ) {
      return setRepRangeLoad!!;
    }
    return  SetRepRangeLoadValue();
  }
  
  open fun  hasZone() : Boolean {
    return zone != null;
  }
  
  open fun  getZone() : ZoneValue {
    if ( zone != null ) {
      return zone!!;
    }
    return  ZoneValue();
  }
  
  open fun  hasPositiveInteger() : Boolean {
    return positiveInteger != null;
  }
  
  open fun  getPositiveInteger() : PositiveIntegerValue {
    if ( positiveInteger != null ) {
      return positiveInteger!!;
    }
    return  PositiveIntegerValue();
  }
  
  open fun  hasDetailsLevel() : Boolean {
    return detailsLevel != null;
  }
  
  open fun  getDetailsLevel() : DetailsLevelValue {
    if ( detailsLevel != null ) {
      return detailsLevel!!;
    }
    return  DetailsLevelValue();
  }
  
  open fun  hasRecovery() : Boolean {
    return recovery != null;
  }
  
  open fun  getRecovery() : RecoveryValue {
    if ( recovery != null ) {
      return recovery!!;
    }
    return  RecoveryValue();
  }
  
  open fun  hasTimeValue() : Boolean {
    return timeValue != null;
  }
  
  open fun  getTimeValue() : TimeValueValue {
    if ( timeValue != null ) {
      return timeValue!!;
    }
    return  TimeValueValue();
  }
  
  open fun  hasLeftRight() : Boolean {
    return leftRight != null;
  }
  
  open fun  getLeftRight() : LeftRightValue {
    if ( leftRight != null ) {
      return leftRight!!;
    }
    return  LeftRightValue();
  }
  
  open fun  hasFeeling() : Boolean {
    return feeling != null;
  }
  
  open fun  getFeeling() : FeelingValue {
    if ( feeling != null ) {
      return feeling!!;
    }
    return  FeelingValue();
  }
  
  open fun  hasEffort() : Boolean {
    return effort != null;
  }
  
  open fun  getEffort() : EffortValue {
    if ( effort != null ) {
      return effort!!;
    }
    return  EffortValue();
  }
  
  open fun  hasBodyMetric() : Boolean {
    return bodyMetric != null;
  }
  
  open fun  getBodyMetric() : BodyMetricValue {
    if ( bodyMetric != null ) {
      return bodyMetric!!;
    }
    return  BodyMetricValue();
  }
  
  open fun  hasCircuit() : Boolean {
    return circuit != null;
  }
  
  open fun  getCircuit() : CircuitValue {
    if ( circuit != null ) {
      return circuit!!;
    }
    return  CircuitValue();
  }
  
  open fun  hasContextEntry() : Boolean {
    return contextEntry != null;
  }
  
  open fun  getContextEntry() : ContextEntryValue {
    if ( contextEntry != null ) {
      return contextEntry!!;
    }
    return  ContextEntryValue();
  }
}






















class TokenSlice( text : String, from : Int, length : Int ) 
 {
  @JvmField var source : String  = "";
  @JvmField var start : Int  = 0;
  @JvmField var size : Int  = 0;
  @JvmField var tag : String  = "";
  @JvmField var children : MutableList<TokenSlice>  = arrayListOf();
  @JvmField var parsedValue : SliceParsedValue?  = null;
  
  init {
    source = text;
    start = from;
    size = length;
  }
  companion object {
    
    fun  fromText( text : String) : TokenSlice {
      return  TokenSlice(text, 0, text.length);
    }
  }
  
  open fun  length() : Int {
    return size;
  }
  
  open fun  childCount() : Int {
    return children.size;
  }
  
  open fun  addChild( child : TokenSlice) : Unit {
    children.add(child);
  }
  
  open fun  getChild( index : Int) : TokenSlice {
    return children[index];
  }
  
  open fun  isEmpty() : Boolean {
    return size == 0;
  }
  
  open fun  hasValue() : Boolean {
    return size > 0;
  }
  
  open fun  hasDateTimeValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "datetime") && p.hasDateTime() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setSliceValue( value : SliceParsedValue) : Unit {
    parsedValue = value;
  }
  
  open fun  hasSliceValue() : Boolean {
    return parsedValue != null;
  }
  
  open fun  getSliceValueKind() : String {
    if ( parsedValue != null ) {
      return ((parsedValue!!)).kind;
    }
    return "";
  }
  
  open fun  setDateTimeValue( value : DateTimeValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.dateTime = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "datetime";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromDateTime(value);
  }
  
  open fun  getAsDateTimeValue() : DateTimeValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "datetime") && p.hasDateTime() ) {
        return p.getDateTime();
      }
    }
    return  DateTimeValue();
  }
  
  open fun  hasDistanceValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "distance") && p.hasDistance() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setDistanceValue( value : DistanceValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.distance = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "distance";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromDistance(value);
  }
  
  open fun  getAsDistanceValue() : DistanceValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "distance") && p.hasDistance() ) {
        return p.getDistance();
      }
    }
    return  DistanceValue();
  }
  
  open fun  hasPercentageValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "percentage") && p.hasPercentage() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setPercentageValue( value : PercentageValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.percentage = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "percentage";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromPercentage(value);
  }
  
  open fun  getAsPercentageValue() : PercentageValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "percentage") && p.hasPercentage() ) {
        return p.getPercentage();
      }
    }
    return  PercentageValue();
  }
  
  open fun  hasRecoveryTimeValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "recovery-time") && p.hasRecoveryTime() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setRecoveryTimeValue( value : RecoveryTimeValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.recoveryTime = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "recovery-time";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromRecoveryTime(value);
  }
  
  open fun  getAsRecoveryTimeValue() : RecoveryTimeValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "recovery-time") && p.hasRecoveryTime() ) {
        return p.getRecoveryTime();
      }
    }
    return  RecoveryTimeValue();
  }
  
  open fun  hasWeightValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "weight") && p.hasWeight() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setWeightValue( value : WeightValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.weight = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "weight";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromWeight(value);
  }
  
  open fun  getAsWeightValue() : WeightValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "weight") && p.hasWeight() ) {
        return p.getWeight();
      }
    }
    return  WeightValue();
  }
  
  open fun  hasNumRangeValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "num-range") && p.hasNumRange() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setNumRangeValue( value : NumRangeValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.numRange = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "num-range";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromNumRange(value);
  }
  
  open fun  getAsNumRangeValue() : NumRangeValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "num-range") && p.hasNumRange() ) {
        return p.getNumRange();
      }
    }
    return  NumRangeValue();
  }
  
  open fun  hasPercentageRangeValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "percentage-range") && p.hasPercentageRange() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setPercentageRangeValue( value : PercentageRangeValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.percentageRange = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "percentage-range";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromPercentageRange(value);
  }
  
  open fun  getAsPercentageRangeValue() : PercentageRangeValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "percentage-range") && p.hasPercentageRange() ) {
        return p.getPercentageRange();
      }
    }
    return  PercentageRangeValue();
  }
  
  open fun  hasRepeatBlockValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "repeat-block") && p.hasRepeatBlock() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setRepeatBlockValue( value : RepeatBlockValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.repeatBlock = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "repeat-block";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromRepeatBlock(value);
  }
  
  open fun  getAsRepeatBlockValue() : RepeatBlockValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "repeat-block") && p.hasRepeatBlock() ) {
        return p.getRepeatBlock();
      }
    }
    return  RepeatBlockValue();
  }
  
  open fun  hasSetRepRangeLoadValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "set-rep-range-load") && p.hasSetRepRangeLoad() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setSetRepRangeLoadValue( value : SetRepRangeLoadValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.setRepRangeLoad = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "set-rep-range-load";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromSetRepRangeLoad(value);
  }
  
  open fun  getAsSetRepRangeLoadValue() : SetRepRangeLoadValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "set-rep-range-load") && p.hasSetRepRangeLoad() ) {
        return p.getSetRepRangeLoad();
      }
    }
    return  SetRepRangeLoadValue();
  }
  
  open fun  hasZoneValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "zone") && p.hasZone() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setZoneValue( value : ZoneValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.zone = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "zone";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromZone(value);
  }
  
  open fun  getAsZoneValue() : ZoneValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "zone") && p.hasZone() ) {
        return p.getZone();
      }
    }
    return  ZoneValue();
  }
  
  open fun  hasPositiveIntegerValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "positive-integer") && p.hasPositiveInteger() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setPositiveIntegerValue( value : PositiveIntegerValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.positiveInteger = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "positive-integer";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromPositiveInteger(value);
  }
  
  open fun  getAsPositiveIntegerValue() : PositiveIntegerValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "positive-integer") && p.hasPositiveInteger() ) {
        return p.getPositiveInteger();
      }
    }
    return  PositiveIntegerValue();
  }
  
  open fun  hasDetailsLevelValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "details-level") && p.hasDetailsLevel() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setDetailsLevelValue( value : DetailsLevelValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.detailsLevel = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "details-level";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromDetailsLevel(value);
  }
  
  open fun  getAsDetailsLevelValue() : DetailsLevelValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "details-level") && p.hasDetailsLevel() ) {
        return p.getDetailsLevel();
      }
    }
    return  DetailsLevelValue();
  }
  
  open fun  hasRecoveryValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "recovery") && p.hasRecovery() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setRecoveryValue( value : RecoveryValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.recovery = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "recovery";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromRecovery(value);
  }
  
  open fun  getAsRecoveryValue() : RecoveryValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "recovery") && p.hasRecovery() ) {
        return p.getRecovery();
      }
    }
    return  RecoveryValue();
  }
  
  open fun  hasTimeValueValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "time-value") && p.hasTimeValue() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setTimeValueValue( value : TimeValueValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.timeValue = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "time-value";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromTimeValue(value);
  }
  
  open fun  getAsTimeValueValue() : TimeValueValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "time-value") && p.hasTimeValue() ) {
        return p.getTimeValue();
      }
    }
    return  TimeValueValue();
  }
  
  open fun  hasLeftRightValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "left-right") && p.hasLeftRight() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setLeftRightValue( value : LeftRightValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.leftRight = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "left-right";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromLeftRight(value);
  }
  
  open fun  getAsLeftRightValue() : LeftRightValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "left-right") && p.hasLeftRight() ) {
        return p.getLeftRight();
      }
    }
    return  LeftRightValue();
  }
  
  open fun  hasFeelingValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "feeling") && p.hasFeeling() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setFeelingValue( value : FeelingValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.feeling = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "feeling";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromFeeling(value);
  }
  
  open fun  getAsFeelingValue() : FeelingValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "feeling") && p.hasFeeling() ) {
        return p.getFeeling();
      }
    }
    return  FeelingValue();
  }
  
  open fun  hasEffortValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "effort") && p.hasEffort() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setEffortValue( value : EffortValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.effort = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "effort";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromEffort(value);
  }
  
  open fun  getAsEffortValue() : EffortValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "effort") && p.hasEffort() ) {
        return p.getEffort();
      }
    }
    return  EffortValue();
  }
  
  open fun  hasBodyMetricValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "body-metric") && p.hasBodyMetric() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setBodyMetricValue( value : BodyMetricValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.bodyMetric = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "body-metric";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromBodyMetric(value);
  }
  
  open fun  getAsBodyMetricValue() : BodyMetricValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "body-metric") && p.hasBodyMetric() ) {
        return p.getBodyMetric();
      }
    }
    return  BodyMetricValue();
  }
  
  open fun  hasCircuitValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "circuit") && p.hasCircuit() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setCircuitValue( value : CircuitValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.circuit = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "circuit";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromCircuit(value);
  }
  
  open fun  getAsCircuitValue() : CircuitValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "circuit") && p.hasCircuit() ) {
        return p.getCircuit();
      }
    }
    return  CircuitValue();
  }
  
  open fun  hasContextEntryValue() : Boolean {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "context-entry") && p.hasContextEntry() ) {
        return true;
      }
    }
    return false;
  }
  
  open fun  setContextEntryValue( value : ContextEntryValue) : Unit {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      p.contextEntry = value;
      if ( (p.kind.length) == 0 ) {
        p.kind = "context-entry";
      }
      parsedValue = p;
      return;
    }
    parsedValue = SliceParsedValue.fromContextEntry(value);
  }
  
  open fun  getAsContextEntryValue() : ContextEntryValue {
    if ( parsedValue != null ) {
      val p : SliceParsedValue  = parsedValue!!;
      if ( (p.kind == "context-entry") && p.hasContextEntry() ) {
        return p.getContextEntry();
      }
    }
    return  ContextEntryValue();
  }
  
  override fun  toString() : String {
    return source.substring(start, (start + size) );
  }
  
  open fun  strEquals( value : String) : Boolean {
    val vLen : Int  = value.length;
    if ( vLen != size ) {
      return false;
    }
    var i : Int  = 0;
    while (i < vLen) {
      if ( (source[(start + i)].code) == (value[i].code) ) {
      } else {
        return false;
      }
      i = i + 1;
    }
    return true;
  }
  
  open fun  charCodeAt( index : Int) : Int {
    if ( index < 0 ) {
      return -1;
    }
    if ( index >= size ) {
      return -1;
    }
    return source[(start + index)].code;
  }
  
  open fun  isDigitAt( index : Int) : Boolean {
    val ch : Int  = this.charCodeAt(index);
    return (ch >= 48) && (ch <= 57);
  }
  
  open fun  digitAt( index : Int) : Int {
    val ch : Int  = this.charCodeAt(index);
    if ( (ch >= 48) && (ch <= 57) ) {
      return ch - 48;
    }
    return -1;
  }
  
  open fun  isWhitespace( ch : Int) : Boolean {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  }
  
  open fun  isWhitespaceAt( index : Int) : Boolean {
    val ch : Int  = this.charCodeAt(index);
    return this.isWhitespace(ch);
  }
  
  open fun  isAlphaNum( ch : Int) : Boolean {
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
  }
  
  open fun  isAlphaNumAt( index : Int) : Boolean {
    val ch : Int  = this.charCodeAt(index);
    return this.isAlphaNum(ch);
  }
  
  open fun  findLineEnd( from : Int) : Int {
    var safeFrom : Int  = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= size ) {
      return size;
    }
    var i : Int  = safeFrom;
    while (i < size) {
      val ch : Int  = this.charCodeAt(i);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    }
    return i;
  }
  
  open fun  findNumberEnd( from : Int) : Int {
    var safeFrom : Int  = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= size ) {
      return size;
    }
    var i : Int  = safeFrom;
    while (i < size) {
      if ( this.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    return i;
  }
  
  open fun  findWhitespaceEnd( from : Int) : Int {
    var safeFrom : Int  = from;
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= size ) {
      return size;
    }
    var i : Int  = safeFrom;
    while (i < size) {
      if ( this.isWhitespaceAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    return i;
  }
  
  open fun  hasInteger( from : Int, to : Int) : Boolean {
    if ( from < 0 ) {
      return false;
    }
    if ( to < from ) {
      return false;
    }
    if ( to >= size ) {
      return false;
    }
    var i : Int  = from;
    while (i <= to) {
      val ch : Int  = this.charCodeAt(i);
      if ( ch < 48 ) {
        return false;
      }
      if ( ch > 57 ) {
        return false;
      }
      i = i + 1;
    }
    return true;
  }
  
  open fun  parseInteger( from : Int, to : Int) : Int {
    if ( this.hasInteger(from, to) ) {
    } else {
      return -1;
    }
    var value : Int  = 0;
    var i : Int  = from;
    while (i <= to) {
      val ch : Int  = this.charCodeAt(i);
      value = (value * 10) + (ch - 48);
      i = i + 1;
    }
    return value;
  }
  
  open fun  hasDouble( from : Int, to : Int) : Boolean {
    if ( from < 0 ) {
      return false;
    }
    if ( to < from ) {
      return false;
    }
    if ( to >= size ) {
      return false;
    }
    var i : Int  = from;
    val first : Int  = this.charCodeAt(i);
    if ( (first == 43) || (first == 45) ) {
      i = i + 1;
      if ( i > to ) {
        return false;
      }
    }
    var hasDigit : Boolean  = false;
    var hasDot : Boolean  = false;
    while (i <= to) {
      val ch : Int  = this.charCodeAt(i);
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
    }
    return hasDigit;
  }
  
  open fun  parseDouble( from : Int, to : Int) : Double {
    if ( this.hasDouble(from, to) ) {
    } else {
      return 0.0;
    }
    val raw : String  = source.substring((start + from), ((start + to) + 1) );
    val v : Double?  = raw.toDoubleOrNull();
    if ( v != null ) {
      return v!!;
    }
    return 0.0;
  }
  
  open fun  peek( offset : Int) : TokenSlice {
    var safeOffset : Int  = offset;
    if ( safeOffset < 0 ) {
      safeOffset = 0;
    }
    if ( safeOffset > size ) {
      safeOffset = size;
    }
    return  TokenSlice(source, start + safeOffset, size - safeOffset);
  }
  
  open fun  step( count : Int) : TokenSlice {
    return this.peek(count);
  }
  
  open fun  read( count : Int) : TokenSlice {
    var safeCount : Int  = count;
    if ( safeCount < 0 ) {
      safeCount = 0;
    }
    if ( safeCount > size ) {
      safeCount = size;
    }
    return  TokenSlice(source, start, safeCount);
  }
  
  open fun  slice( count : Int) : TokenSlice {
    return this.read(count);
  }
  
  open fun  pickSlice( from : Int, length : Int) : TokenSlice {
    return  TokenSlice(source, start + from, length);
  }
  
  open fun  hasToken( token : String) : Boolean {
    val tLen : Int  = token.length;
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > size ) {
      return false;
    }
    var i : Int  = 0;
    while (i < tLen) {
      if ( (source[(start + i)].code) == (token[i].code) ) {
      } else {
        return false;
      }
      i = i + 1;
    }
    return true;
  }
  
  open fun  endsWith( token : String) : Boolean {
    val tLen : Int  = token.length;
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > size ) {
      return false;
    }
    val me : String  = (this).toString();
    val meLen : Int  = me.length;
    return (me.substring((meLen - tLen), meLen )) == token;
  }
  
  open fun  findTokenPos( token : String) : Int {
    val tLen : Int  = token.length;
    if ( tLen == 0 ) {
      return 0;
    }
    if ( tLen > size ) {
      return -1;
    }
    val text : String  = (this).toString();
    val maxStart : Int  = size - tLen;
    var i : Int  = 0;
    while (i <= maxStart) {
      if ( (text.substring(i, (i + tLen) )) == token ) {
        return i;
      }
      i = i + 1;
    }
    return -1;
  }
  
  open fun  splitWithToken( token : String) : TokenSlice {
    val pos : Int  = this.findTokenPos(token);
    if ( pos < 0 ) {
      return  TokenSlice(source, start, size);
    }
    return  TokenSlice(source, start, pos);
  }
  
  open fun  sliceToToken( token : String) : TokenSlice {
    val pos : Int  = this.findTokenPos(token);
    if ( pos < 0 ) {
      return  TokenSlice(source, start, size);
    }
    val tLen : Int  = token.length;
    return  TokenSlice(source, start, pos + tLen);
  }
}


open class TokenDetector( noMatchSlice : TokenSlice ) 
 {
  @JvmField var detectedTag : String  = "unknown";
  @JvmField var cachedNoMatch : TokenSlice  =  TokenSlice("", 0, 0);
  
  init {
    cachedNoMatch = noMatchSlice;
  }
  companion object {
    
    fun  createNoMatchSlice() : TokenSlice {
      val s : TokenSlice  =  TokenSlice("", 0, 0);
      s.tag = "";
      return s;
    }
    
    fun  create() : TokenDetector {
      val s : TokenSlice  = this.createNoMatchSlice();
      return  TokenDetector(s);
    }
  }
  
  open fun  getNoMatchSlice() : TokenSlice {
    return cachedNoMatch;
  }
  
  open fun  noMatch() : TokenSlice {
    return this.getNoMatchSlice();
  }
  
  open fun  isInRange( value : Int, minValue : Int, maxValue : Int) : Boolean {
    if ( value < minValue ) {
      return false;
    }
    if ( value > maxValue ) {
      return false;
    }
    return true;
  }
  
  open fun  isHour24( value : Int) : Boolean {
    return this.isInRange(value, 0, 23);
  }
  
  open fun  isMinuteSecond( value : Int) : Boolean {
    return this.isInRange(value, 0, 59);
  }
  
  open fun  isHour12( value : Int) : Boolean {
    return this.isInRange(value, 1, 12);
  }
  
  open fun  detect( slice : TokenSlice) : TokenSlice {
    return this.noMatch();
  }
}



class KeywordDetector( token : String, noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  @JvmField var keyword : String  = "";
  
  init {
    cachedNoMatch = noMatchSlice;
    keyword = token;
    detectedTag = "keyword";
  }
  companion object {
    
    fun  create( token : String) : KeywordDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  KeywordDetector(token, s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val kLen : Int  = keyword.length;
    if ( kLen == 0 ) {
      return this.noMatch();
    }
    val size : Int  = (slice).length();
    if ( size < kLen ) {
      return this.noMatch();
    }
    val head : String  = (slice.read(kLen)).toString();
    if ( head == keyword ) {
      val matched : TokenSlice  = slice.read(kLen);
      matched.tag = detectedTag;
      return matched;
    }
    return this.noMatch();
  }
}


class DateTimeDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  @JvmField var sliceMap : MutableMap<TokenSlice,DateTimeValue>  = hashMapOf();
  @JvmField var sliceHitMap : MutableMap<TokenSlice,TokenSlice>  = hashMapOf();
  @JvmField var parseDateShapeCalls : Int  = 0;
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "datetime";
  }
  companion object {
    
    fun  create() : DateTimeDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  DateTimeDetector(s);
    }
  }
  
  open fun  parseToMap( slice : TokenSlice) : TokenSlice {
    if ( sliceMap.containsKey(slice) ) {
      val cachedHit : TokenSlice?  = sliceHitMap[slice];
      if ( cachedHit != null ) {
        val hit : TokenSlice  = cachedHit!!;
        val cachedVal : DateTimeValue?  = sliceMap[slice];
        if ( cachedVal != null ) {
          val payload : SliceParsedValue  = SliceParsedValue.fromDateTime(cachedVal!!);
          hit.setSliceValue(payload);
          slice.setSliceValue(payload);
        }
        return hit;
      }
      return this.noMatch();
    }
    val newSlice : TokenSlice  = this.parseDateShape(slice);
    return newSlice;
  }
  
  open fun  getParseDateShapeCalls() : Int {
    return parseDateShapeCalls;
  }
  
  open fun  hasCachedValue( slice : TokenSlice) : Boolean {
    return sliceMap.containsKey(slice);
  }
  
  open fun  parseDateShape( slice : TokenSlice) : TokenSlice {
    parseDateShapeCalls = parseDateShapeCalls + 1;
    if ( slice.hasInteger(0, 3) ) {
    } else {
      return this.noMatch();
    }
    if ( slice.charCodeAt(4) != 45 ) {
      return this.noMatch();
    }
    var plen : Int  = 0;
    val out : DateTimeValue  =  DateTimeValue();
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
      var idx : Int  = 16;
      if ( ((slice).length() >= 19) && (slice.charCodeAt(16) == 58) ) {
        out.second = slice.parseInteger(17, 18);
        if ( false == this.isMinuteSecond(out.second) ) {
          return this.noMatch();
        }
        idx = 19;
      }
      if ( idx < (slice).length() ) {
        val tzCh : Int  = slice.charCodeAt(idx);
        if ( tzCh == 90 ) {
          out.timezone = "Z";
          idx = idx + 1;
        }
        if ( (tzCh == 43) || (tzCh == 45) ) {
          if ( (idx + 6) <= (slice).length() ) {
            if ( slice.hasInteger(idx + 1, idx + 2) ) {
            } else {
              return this.noMatch();
            }
            if ( slice.charCodeAt((idx + 3)) != 58 ) {
              return this.noMatch();
            }
            if ( slice.hasInteger(idx + 4, idx + 5) ) {
            } else {
              return this.noMatch();
            }
            val tzHour : Int  = slice.parseInteger(idx + 1, idx + 2);
            val tzMin : Int  = slice.parseInteger(idx + 4, idx + 5);
            if ( false == this.isHour24(tzHour) ) {
              return this.noMatch();
            }
            if ( false == this.isMinuteSecond(tzMin) ) {
              return this.noMatch();
            }
            val tzSlice : TokenSlice  = slice.read(idx + 6);
            out.timezone = (tzSlice.peek(idx)).toString();
            idx = idx + 6;
          }
        }
      }
      plen = idx;
    }
    val newSlice : TokenSlice  = slice.read(plen);
    newSlice.tag = detectedTag;
    val payload2 : SliceParsedValue  = SliceParsedValue.fromDateTime(out);
    newSlice.setSliceValue(payload2);
    slice.setSliceValue(payload2);
    sliceMap.set(newSlice, out)
    sliceMap.set(slice, out)
    sliceHitMap.set(newSlice, newSlice)
    sliceHitMap.set(slice, newSlice)
    return newSlice;
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    return this.parseToMap(slice);
  }
}


class SpaceDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "space";
  }
  companion object {
    
    fun  create() : SpaceDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  SpaceDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    val i : Int  = slice.findWhitespaceEnd(0);
    if ( i == 0 ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(i);
    out.tag = detectedTag;
    return out;
  }
}


class NewlineDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "newline";
  }
  companion object {
    
    fun  create() : NewlineDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  NewlineDetector(s);
    }
  }
  
  open fun  isNewline( ch : Int) : Boolean {
    if ( ch == 10 ) {
      return true;
    }
    if ( ch == 13 ) {
      return true;
    }
    return false;
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    var i : Int  = 0;
    while (i < (slice).length()) {
      val ch : Int  = slice.charCodeAt(i);
      if ( this.isNewline(ch) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == 0 ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(i);
    out.tag = detectedTag;
    return out;
  }
}


class PositiveIntegerDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "positive-integer";
  }
  companion object {
    
    fun  create() : PositiveIntegerDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  PositiveIntegerDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    var i : Int  = 0;
    var hasNonZero : Boolean  = false;
    while (i < (slice).length()) {
      if ( slice.isDigitAt(i) ) {
        if ( slice.digitAt(i) != 0 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == 0 ) {
      return this.noMatch();
    }
    if ( hasNonZero ) {
    } else {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(i);
    out.tag = detectedTag;
    val v : PositiveIntegerValue  =  PositiveIntegerValue();
    v.value = out.parseInteger(0, i - 1);
    val payload : SliceParsedValue  = SliceParsedValue.fromPositiveInteger(v);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class DecimalNumberDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "decimal-number";
  }
  companion object {
    
    fun  create() : DecimalNumberDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  DecimalNumberDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len == 0 ) {
      return this.noMatch();
    }
    var i : Int  = 0;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == 0 ) {
      return this.noMatch();
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(i) != 46 ) {
      return this.noMatch();
    }
    var j : Int  = i + 1;
    while (j < __len) {
      if ( slice.isDigitAt(j) ) {
        j = j + 1;
      } else {
        break;
      }
    }
    if ( j == (i + 1) ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(j);
    out.tag = detectedTag;
    return out;
  }
}


class TimeValueDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "time-value";
  }
  companion object {
    
    fun  create() : TimeValueDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  TimeValueDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
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
    val hour : Int  = slice.parseInteger(0, 1);
    val minute : Int  = slice.parseInteger(3, 4);
    if ( false == this.isHour24(hour) ) {
      return this.noMatch();
    }
    if ( false == this.isMinuteSecond(minute) ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(5);
    out.tag = detectedTag;
    val tv : TimeValueValue  =  TimeValueValue();
    tv.minutes = hour;
    tv.seconds = minute;
    val payload : SliceParsedValue  = SliceParsedValue.fromTimeValue(tv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class DistanceDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "distance";
  }
  companion object {
    
    fun  create() : DistanceDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  DistanceDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    val valueLen : Int  = slice.findNumberEnd(0);
    if ( valueLen <= 0 ) {
      return this.noMatch();
    }
    if ( (valueLen + 1) > __len ) {
      return this.noMatch();
    }
    if ( slice.hasInteger(0, valueLen - 1) ) {
    } else {
      return this.noMatch();
    }
    val parsed : Int  = slice.parseInteger(0, valueLen - 1);
    if ( parsed <= 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(valueLen) != 109 ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(valueLen + 1);
    out.tag = detectedTag;
    val dv : DistanceValue  =  DistanceValue();
    dv.value = parsed;
    dv.unit = "m";
    val payload : SliceParsedValue  = SliceParsedValue.fromDistance(dv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class RecoveryTimeDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "recovery-time";
  }
  companion object {
    
    fun  create() : RecoveryTimeDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  RecoveryTimeDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 47 ) {
      return this.noMatch();
    }
    var i : Int  = 1;
    var hasNonZero : Boolean  = false;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        if ( slice.digitAt(i) != 0 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    }
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
    val unit : Int  = slice.charCodeAt(i);
    if ( (unit == 115) || (unit == 109) ) {
    } else {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(i + 1);
    out.tag = detectedTag;
    val slashToken : TokenSlice  = slice.read(1);
    slashToken.tag = "keyword";
    out.addChild(slashToken);
    val valueToken : TokenSlice  = (slice.peek(1)).read((i - 1));
    valueToken.tag = "positive-integer";
    val piv : PositiveIntegerValue  =  PositiveIntegerValue();
    piv.value = valueToken.parseInteger(0, (valueToken).length() - 1);
    val parsedValue : SliceParsedValue  = SliceParsedValue.fromPositiveInteger(piv);
    valueToken.setSliceValue(parsedValue);
    out.addChild(valueToken);
    val unitToken : TokenSlice  = (slice.peek(i)).read(1);
    unitToken.tag = "keyword";
    out.addChild(unitToken);
    val rv : RecoveryTimeValue  =  RecoveryTimeValue();
    rv.value = ((slice.read(i)).peek(1)).parseInteger(0, (i - 2));
    if ( unit == 115 ) {
      rv.unit = "s";
    } else {
      rv.unit = "m";
    }
    val payload : SliceParsedValue  = SliceParsedValue.fromRecoveryTime(rv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class AMTimeValueDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "am-time";
  }
  companion object {
    
    fun  create() : AMTimeValueDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  AMTimeValueDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    val i : Int  = slice.findNumberEnd(0);
    if ( i <= 0 ) {
      return this.noMatch();
    }
    if ( (i + 1) >= __len ) {
      return this.noMatch();
    }
    val valuePart : TokenSlice  = slice.read(i);
    if ( valuePart.hasInteger(0, i - 1) ) {
    } else {
      return this.noMatch();
    }
    val hour : Int  = valuePart.parseInteger(0, i - 1);
    if ( false == this.isHour12(hour) ) {
      return this.noMatch();
    }
    val c1 : Int  = slice.charCodeAt(i);
    val c2 : Int  = slice.charCodeAt(i + 1);
    if ( ((c1 == 65) && (c2 == 77)) || ((c1 == 80) && (c2 == 77)) ) {
      val out : TokenSlice  = slice.read(i + 2);
      out.tag = detectedTag;
      return out;
    }
    return this.noMatch();
  }
}


class PercentageDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "percentage";
  }
  companion object {
    
    fun  create() : PercentageDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  PercentageDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    val vLen : Int  = slice.findNumberEnd(0);
    if ( vLen <= 0 ) {
      return this.noMatch();
    }
    if ( (vLen + 1) > __len ) {
      return this.noMatch();
    }
    if ( slice.hasInteger(0, vLen - 1) ) {
    } else {
      return this.noMatch();
    }
    val v : Int  = slice.parseInteger(0, vLen - 1);
    if ( v <= 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(vLen) != 37 ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(vLen + 1);
    out.tag = detectedTag;
    val pv : PercentageValue  =  PercentageValue();
    pv.value = v;
    val payload : SliceParsedValue  = SliceParsedValue.fromPercentage(pv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class Parser( source : String, detectors : MutableList<TokenDetector> ) 
 {
  @JvmField var source : String  = "";
  @JvmField var slice : TokenSlice?  = null;
  @JvmField var detectors : MutableList<TokenDetector>  = arrayListOf();
  @JvmField var parserdResults : MutableList<TokenSlice>  = arrayListOf();
  
  init {
    this.source = source;
    this.detectors = detectors;
    slice =  TokenSlice(source, 0, source.length);
    parserdResults.clear()
  }
  
  open fun  start() : Unit {
    var activeSlice : TokenSlice  =  TokenSlice(source, 0, source.length);
    while ((activeSlice).length() > 0) {
      var advance : Int  = 0;
      var i : Int  = 0;
      while (i < (detectors.size)) {
        val detector : TokenDetector  = detectors[i];
        val result : TokenSlice  = detector.detect(activeSlice);
        if ( result.isEmpty() ) {
        } else {
          if ( result.tag == "space" ) {
          } else {
            if ( result.tag == "newline" ) {
            } else {
              parserdResults.add(result);
            }
          }
          advance = (result).length();
          break;
        }
        i = i + 1;
      }
      if ( advance == 0 ) {
        break;
      } else {
        activeSlice = activeSlice.peek(advance);
      }
    }
  }
  
  open fun  getResults() : MutableList<TokenSlice> {
    return parserdResults;
  }
  
  open fun  getCount() : Int {
    return parserdResults.size;
  }
}

class WeightDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "weight";
  }
  companion object {
    
    fun  create() : WeightDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  WeightDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    var detectors : MutableList<TokenDetector>  = arrayListOf();
    detectors.add(PositiveIntegerDetector.create());
    detectors.add(KeywordDetector.create("kg"));
    val p : Parser  =  Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    val parts : MutableList<TokenSlice>  = p.getResults();
    val first : TokenSlice  = parts[0];
    val second : TokenSlice  = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("kg") ) {
      return this.noMatch();
    }
    val outLen : Int  = (first).length() + (second).length();
    val out : TokenSlice  = slice.read(outLen);
    out.tag = detectedTag;
    out.addChild(first);
    out.addChild(second);
    val firstLen : Int  = (first).length();
    val wv : WeightValue  =  WeightValue();
    wv.value = first.parseInteger(0, firstLen - 1);
    wv.unit = "kg";
    val payload : SliceParsedValue  = SliceParsedValue.fromWeight(wv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class NumRangeBlockDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "num-range";
  }
  companion object {
    
    fun  create() : NumRangeBlockDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  NumRangeBlockDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    var i : Int  = slice.findWhitespaceEnd(0);
    val leftStart : Int  = i;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    val leftEnd : Int  = i;
    if ( leftEnd <= leftStart ) {
      return this.noMatch();
    }
    i = slice.findWhitespaceEnd(i);
    if ( (i >= __len) || (slice.charCodeAt(i) != 45) ) {
      return this.noMatch();
    }
    i = i + 1;
    i = slice.findWhitespaceEnd(i);
    val rightStart : Int  = i;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    val rightEnd : Int  = i;
    if ( rightEnd <= rightStart ) {
      return this.noMatch();
    }
    val left : TokenSlice  = (slice.peek(leftStart)).read((leftEnd - leftStart));
    val right : TokenSlice  = (slice.peek(rightStart)).read((rightEnd - rightStart));
    if ( false == left.hasInteger(0, ((left).length() - 1)) ) {
      return this.noMatch();
    }
    if ( false == right.hasInteger(0, ((right).length() - 1)) ) {
      return this.noMatch();
    }
    val lval : Int  = left.parseInteger(0, (left).length() - 1);
    val rval : Int  = right.parseInteger(0, (right).length() - 1);
    if ( lval <= 0 ) {
      return this.noMatch();
    }
    if ( rval <= 0 ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(rightEnd);
    out.tag = detectedTag;
    val nv : NumRangeValue  =  NumRangeValue();
    nv.minValue = lval;
    nv.maxValue = rval;
    val payload : SliceParsedValue  = SliceParsedValue.fromNumRange(nv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class SetRepRangeLoadDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "set-rep-range-load";
  }
  companion object {
    
    fun  create() : SetRepRangeLoadDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  SetRepRangeLoadDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 9 ) {
      return this.noMatch();
    }
    var i : Int  = 0;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    val setsLeftEnd : Int  = i;
    if ( setsLeftEnd <= 0 ) {
      return this.noMatch();
    }
    val setsLeft : TokenSlice  = slice.read(setsLeftEnd);
    if ( false == setsLeft.hasInteger(0, ((setsLeft).length() - 1)) ) {
      return this.noMatch();
    }
    val setsSingleVal : Int  = setsLeft.parseInteger(0, (setsLeft).length() - 1);
    if ( setsSingleVal <= 0 ) {
      return this.noMatch();
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    var setsMinVal : Int  = 0;
    var setsMaxVal : Int  = 0;
    var repsMinVal : Int  = 0;
    var repsMaxVal : Int  = 0;
    var countVal : Int  = 1;
    val firstSep : Int  = slice.charCodeAt(i);
    if ( firstSep == 45 ) {
      i = i + 1;
      val setsRightStart : Int  = i;
      while (i < __len) {
        if ( slice.isDigitAt(i) ) {
          i = i + 1;
        } else {
          break;
        }
      }
      val setsRightEnd : Int  = i;
      if ( setsRightEnd <= setsRightStart ) {
        return this.noMatch();
      }
      if ( (i >= __len) || (slice.charCodeAt(i) != 120) ) {
        return this.noMatch();
      }
      i = i + 1;
      val repsLeftStart : Int  = i;
      while (i < __len) {
        if ( slice.isDigitAt(i) ) {
          i = i + 1;
        } else {
          break;
        }
      }
      val repsLeftEnd : Int  = i;
      if ( repsLeftEnd <= repsLeftStart ) {
        return this.noMatch();
      }
      if ( (i >= __len) || (slice.charCodeAt(i) != 45) ) {
        return this.noMatch();
      }
      i = i + 1;
      val repsRightStart : Int  = i;
      while (i < __len) {
        if ( slice.isDigitAt(i) ) {
          i = i + 1;
        } else {
          break;
        }
      }
      val repsRightEnd : Int  = i;
      if ( repsRightEnd <= repsRightStart ) {
        return this.noMatch();
      }
      val setsRight : TokenSlice  = (slice.peek(setsRightStart)).read((setsRightEnd - setsRightStart));
      val repsLeft : TokenSlice  = (slice.peek(repsLeftStart)).read((repsLeftEnd - repsLeftStart));
      val repsRight : TokenSlice  = (slice.peek(repsRightStart)).read((repsRightEnd - repsRightStart));
      if ( false == setsRight.hasInteger(0, ((setsRight).length() - 1)) ) {
        return this.noMatch();
      }
      if ( false == repsLeft.hasInteger(0, ((repsLeft).length() - 1)) ) {
        return this.noMatch();
      }
      if ( false == repsRight.hasInteger(0, ((repsRight).length() - 1)) ) {
        return this.noMatch();
      }
      setsMinVal = setsSingleVal;
      setsMaxVal = setsRight.parseInteger(0, (setsRight).length() - 1);
      repsMinVal = repsLeft.parseInteger(0, (repsLeft).length() - 1);
      repsMaxVal = repsRight.parseInteger(0, (repsRight).length() - 1);
    } else {
      if ( firstSep == 120 ) {
        i = i + 1;
        val repsLeftStart2 : Int  = i;
        while (i < __len) {
          if ( slice.isDigitAt(i) ) {
            i = i + 1;
          } else {
            break;
          }
        }
        val repsLeftEnd2 : Int  = i;
        if ( repsLeftEnd2 <= repsLeftStart2 ) {
          return this.noMatch();
        }
        if ( (i < __len) && (slice.charCodeAt(i) == 45) ) {
          i = i + 1;
          val repsRightStart3 : Int  = i;
          while (i < __len) {
            if ( slice.isDigitAt(i) ) {
              i = i + 1;
            } else {
              break;
            }
          }
          val repsRightEnd3 : Int  = i;
          if ( repsRightEnd3 <= repsRightStart3 ) {
            return this.noMatch();
          }
          if ( (i >= __len) || (slice.charCodeAt(i) != 120) ) {
            return this.noMatch();
          }
          val repsLeftRange : TokenSlice  = (slice.peek(repsLeftStart2)).read((repsLeftEnd2 - repsLeftStart2));
          val repsRightRange : TokenSlice  = (slice.peek(repsRightStart3)).read((repsRightEnd3 - repsRightStart3));
          if ( false == repsLeftRange.hasInteger(0, ((repsLeftRange).length() - 1)) ) {
            return this.noMatch();
          }
          if ( false == repsRightRange.hasInteger(0, ((repsRightRange).length() - 1)) ) {
            return this.noMatch();
          }
          setsMinVal = setsSingleVal;
          setsMaxVal = setsSingleVal;
          repsMinVal = repsLeftRange.parseInteger(0, (repsLeftRange).length() - 1);
          repsMaxVal = repsRightRange.parseInteger(0, (repsRightRange).length() - 1);
        } else {
          if ( (i >= __len) || (slice.charCodeAt(i) != 120) ) {
            return this.noMatch();
          }
          i = i + 1;
          val repsRightStart2 : Int  = i;
          while (i < __len) {
            if ( slice.isDigitAt(i) ) {
              i = i + 1;
            } else {
              break;
            }
          }
          val repsRightEnd2 : Int  = i;
          if ( repsRightEnd2 <= repsRightStart2 ) {
            return this.noMatch();
          }
          val setsMid : TokenSlice  = (slice.peek(repsLeftStart2)).read((repsLeftEnd2 - repsLeftStart2));
          val repsExact : TokenSlice  = (slice.peek(repsRightStart2)).read((repsRightEnd2 - repsRightStart2));
          if ( false == setsMid.hasInteger(0, ((setsMid).length() - 1)) ) {
            return this.noMatch();
          }
          if ( false == repsExact.hasInteger(0, ((repsExact).length() - 1)) ) {
            return this.noMatch();
          }
          setsMinVal = setsMid.parseInteger(0, (setsMid).length() - 1);
          setsMaxVal = setsMinVal;
          repsMinVal = repsExact.parseInteger(0, (repsExact).length() - 1);
          repsMaxVal = repsMinVal;
          countVal = setsSingleVal;
        }
      } else {
        return this.noMatch();
      }
    }
    if ( setsMinVal <= 0 ) {
      return this.noMatch();
    }
    if ( setsMaxVal <= 0 ) {
      return this.noMatch();
    }
    if ( repsMinVal <= 0 ) {
      return this.noMatch();
    }
    if ( repsMaxVal <= 0 ) {
      return this.noMatch();
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    val mode : Int  = slice.charCodeAt(i);
    var modeText : String  = "";
    var loadVal : Int  = 0;
    var unitText : String  = "";
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
        val loadStart : Int  = i;
        while (i < __len) {
          if ( slice.isDigitAt(i) ) {
            i = i + 1;
          } else {
            break;
          }
        }
        if ( i <= loadStart ) {
          return this.noMatch();
        }
        val loadDigits : TokenSlice  = (slice.peek(loadStart)).read((i - loadStart));
        if ( loadDigits.hasInteger(0, (loadDigits).length() - 1) ) {
        } else {
          return this.noMatch();
        }
        loadVal = loadDigits.parseInteger(0, (loadDigits).length() - 1);
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
      if ( slice.isAlphaNumAt(i) ) {
        return this.noMatch();
      }
    }
    val out : TokenSlice  = slice.read(i);
    out.tag = detectedTag;
    val sv : SetRepRangeLoadValue  =  SetRepRangeLoadValue();
    sv.count = countVal;
    sv.setsMin = setsMinVal;
    sv.setsMax = setsMaxVal;
    sv.repsMin = repsMinVal;
    sv.repsMax = repsMaxVal;
    sv.mode = modeText;
    sv.load = loadVal;
    sv.unit = unitText;
    val payload : SliceParsedValue  = SliceParsedValue.fromSetRepRangeLoad(sv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class RepeatBlockDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "repeat-block";
  }
  companion object {
    
    fun  create() : RepeatBlockDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  RepeatBlockDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    var i : Int  = 0;
    var hasNonZero : Boolean  = false;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        if ( slice.digitAt(i) != 0 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    }
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
    val out : TokenSlice  = slice.read(i + 1);
    out.tag = detectedTag;
    val countSlice : TokenSlice  = slice.read(i);
    val rv : RepeatBlockValue  =  RepeatBlockValue();
    rv.count = countSlice.parseInteger(0, i - 1);
    val payload : SliceParsedValue  = SliceParsedValue.fromRepeatBlock(rv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class SpeedDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  @JvmField var distanceDetector : DistanceDetector?  = null;
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "speed";
    distanceDetector = DistanceDetector.create();
  }
  companion object {
    
    fun  create() : SpeedDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  SpeedDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 7 ) {
      return this.noMatch();
    }
    val colonPos : Int  = slice.findNumberEnd(0);
    if ( colonPos <= 0 ) {
      return this.noMatch();
    }
    if ( (colonPos + 4) > __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(colonPos) != 58 ) {
      return this.noMatch();
    }
    val slashPos : Int  = colonPos + 3;
    if ( slice.charCodeAt(slashPos) != 47 ) {
      return this.noMatch();
    }
    val left : TokenSlice  = slice.read(slashPos);
    if ( false == left.hasInteger(0, (colonPos - 1)) ) {
      return this.noMatch();
    }
    if ( false == left.hasInteger((colonPos + 1), (colonPos + 2)) ) {
      return this.noMatch();
    }
    val sec : Int  = left.parseInteger(colonPos + 1, colonPos + 2);
    if ( false == this.isMinuteSecond(sec) ) {
      return this.noMatch();
    }
    val rightStart : TokenSlice  = slice.peek(slashPos + 1);
    val dist : TokenSlice  = this.distanceDetector!!.detect(rightStart);
    if ( dist.isEmpty() ) {
      return this.noMatch();
    }
    if ( false == (dist.tag == "distance") ) {
      return this.noMatch();
    }
    val first : TokenSlice  = left;
    first.tag = "time-value";
    val tv : TimeValueValue  =  TimeValueValue();
    tv.minutes = left.parseInteger(0, colonPos - 1);
    tv.seconds = sec;
    val firstParsed : SliceParsedValue  = SliceParsedValue.fromTimeValue(tv);
    first.setSliceValue(firstParsed);
    val second : TokenSlice  = (slice.peek(slashPos)).read(1);
    second.tag = "keyword";
    val third : TokenSlice  = dist;
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("/") ) {
      return this.noMatch();
    }
    if ( false == (third.tag == "distance") ) {
      return this.noMatch();
    }
    val outLen : Int  = ((first).length() + (second).length()) + (third).length();
    val out : TokenSlice  = slice.read(outLen);
    out.tag = detectedTag;
    out.addChild(first);
    out.addChild(second);
    out.addChild(third);
    return out;
  }
}


class ZoneDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "zone";
  }
  companion object {
    
    fun  create() : ZoneDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  ZoneDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    if ( slice.hasToken("Zone") ) {
    } else {
      return this.noMatch();
    }
    val __len : Int  = (slice).length();
    if ( __len <= 4 ) {
      return this.noMatch();
    }
    var i : Int  = 4;
    if ( (i < __len) && (slice.charCodeAt(i) == 32) ) {
      i = i + 1;
    }
    if ( i >= __len ) {
      return this.noMatch();
    }
    val startDigits : Int  = i;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == startDigits ) {
      return this.noMatch();
    }
    val zoneDigits : TokenSlice  = (slice.peek(startDigits)).read((i - startDigits));
    if ( zoneDigits.hasInteger(0, (zoneDigits).length() - 1) ) {
    } else {
      return this.noMatch();
    }
    val zoneNum : Int  = zoneDigits.parseInteger(0, (zoneDigits).length() - 1);
    if ( (zoneNum < 1) || (zoneNum > 5) ) {
      return this.noMatch();
    }
    if ( i < __len ) {
      if ( slice.isAlphaNumAt(i) ) {
        return this.noMatch();
      }
    }
    val out : TokenSlice  = slice.read(i);
    out.tag = detectedTag;
    val zv : ZoneValue  =  ZoneValue();
    zv.zone = zoneNum;
    val payload : SliceParsedValue  = SliceParsedValue.fromZone(zv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class NGChildDetectorRegistry 
 {
  @JvmField var recoveryChildDetectors : MutableList<TokenDetector>  = arrayListOf();
  @JvmField var leftRightChildDetectors : MutableList<TokenDetector>  = arrayListOf();
  companion object {
    private var __singleton_instance : NGChildDetectorRegistry? = null
    fun __singleton() : NGChildDetectorRegistry {
      if (__singleton_instance == null) {
        __singleton_instance = NGChildDetectorRegistry()
      }
      return __singleton_instance!!
    }
  }
  
  open fun  getRecoveryChildDetectors() : MutableList<TokenDetector> {
    if ( (recoveryChildDetectors.size) > 0 ) {
      return recoveryChildDetectors;
    }
    var ds : MutableList<TokenDetector>  = arrayListOf();
    ds.add(DistanceDetector.create());
    ds.add(RecoveryTimeDetector.create());
    ds.add(TimeValueDetector.create());
    ds.add(AMTimeValueDetector.create());
    ds.add(PercentageDetector.create());
    ds.add(WeightDetector.create());
    ds.add(NumRangeBlockDetector.create());
    ds.add(PositiveIntegerDetector.create());
    ds.add(KeywordDetector.create("min"));
    ds.add(KeywordDetector.create("sec"));
    ds.add(KeywordDetector.create("s"));
    ds.add(KeywordDetector.create("m"));
    recoveryChildDetectors = ds;
    return recoveryChildDetectors;
  }
  
  open fun  getLeftRightChildDetectors() : MutableList<TokenDetector> {
    if ( (leftRightChildDetectors.size) > 0 ) {
      return leftRightChildDetectors;
    }
    var ds : MutableList<TokenDetector>  = arrayListOf();
    ds.add(SetRepRangeLoadDetector.create());
    ds.add(RepeatBlockDetector.create());
    ds.add(WeightDetector.create());
    ds.add(DistanceDetector.create());
    ds.add(SpeedDetector.create());
    ds.add(ZoneDetector.create());
    ds.add(DecimalNumberDetector.create());
    ds.add(PositiveIntegerDetector.create());
    leftRightChildDetectors = ds;
    return leftRightChildDetectors;
  }
}

class RecoveryDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "recovery";
  }
  companion object {
    
    fun  create() : RecoveryDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  RecoveryDetector(s);
    }
  }
  
  open fun  createChildDetectors() : MutableList<TokenDetector> {
    val reg : NGChildDetectorRegistry  =  NGChildDetectorRegistry.__singleton();
    return reg.getRecoveryChildDetectors();
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val key : String  = "Recovery";
    val keyLen : Int  = key.length;
    val __len : Int  = (slice).length();
    if ( __len <= keyLen ) {
      return this.noMatch();
    }
    val head : TokenSlice  = slice.read(keyLen);
    if ( head.strEquals(key) ) {
    } else {
      return this.noMatch();
    }
    if ( slice.isAlphaNumAt(keyLen) ) {
      return this.noMatch();
    }
    val lineEnd : Int  = slice.findLineEnd(keyLen);
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    val labelToken : TokenSlice  = slice.read(keyLen);
    labelToken.tag = "keyword";
    out.addChild(labelToken);
    val restStart : Int  = slice.findWhitespaceEnd(keyLen);
    if ( restStart < lineEnd ) {
      val rest : TokenSlice  = (slice.peek(restStart)).read((lineEnd - restStart));
      val p : Parser  =  Parser((rest).toString(), this.createChildDetectors());
      (p).start();
      val children : MutableList<TokenSlice>  = p.getResults();
      for ( i in children.indices ) {
        val ch = children[i]
        out.addChild(ch);
      }
    }
    val rv : RecoveryValue  =  RecoveryValue();
    rv.label = "Recovery";
    val payload : SliceParsedValue  = SliceParsedValue.fromRecovery(rv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class LeftRightDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "left-right";
  }
  companion object {
    
    fun  create() : LeftRightDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  LeftRightDetector(s);
    }
  }
  
  open fun  createChildDetectors() : MutableList<TokenDetector> {
    val reg : NGChildDetectorRegistry  =  NGChildDetectorRegistry.__singleton();
    return reg.getLeftRightChildDetectors();
  }
  
  open fun  detectWithSide( slice : TokenSlice, side : String) : TokenSlice {
    val key : String  = side + " ";
    if ( slice.hasToken(key) ) {
    } else {
      return this.noMatch();
    }
    val keyLen : Int  = key.length;
    val __len : Int  = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    val lineEnd : Int  = slice.findLineEnd(keyLen);
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    val sideToken : TokenSlice  = slice.read(side.length);
    sideToken.tag = "keyword";
    out.addChild(sideToken);
    val restStart : Int  = slice.findWhitespaceEnd(keyLen);
    if ( restStart < lineEnd ) {
      val payload : TokenSlice  = (slice.peek(restStart)).read((lineEnd - restStart));
      val p : Parser  =  Parser((payload).toString(), this.createChildDetectors());
      (p).start();
      val children : MutableList<TokenSlice>  = p.getResults();
      for ( i in children.indices ) {
        val ch3 = children[i]
        out.addChild(ch3);
      }
    }
    val lv : LeftRightValue  =  LeftRightValue();
    lv.side = side;
    val parsed : SliceParsedValue  = SliceParsedValue.fromLeftRight(lv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val left : TokenSlice  = this.detectWithSide(slice, "Left");
    if ( left.isEmpty() ) {
    } else {
      return left;
    }
    return this.detectWithSide(slice, "Right");
  }
}


class FeelingDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "feeling";
  }
  companion object {
    
    fun  create() : FeelingDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  FeelingDetector(s);
    }
  }
  
  open fun  parseNumericScore( slice : TokenSlice) : Int {
    var detectors : MutableList<TokenDetector>  = arrayListOf();
    detectors.add(PositiveIntegerDetector.create());
    val p : Parser  =  Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 1 ) {
      return -1;
    }
    val scoreToken : TokenSlice  = p.getResults()[0];
    if ( scoreToken.tag == "positive-integer" ) {
      return scoreToken.parseInteger(0, (scoreToken).length() - 1);
    }
    return -1;
  }
  
  open fun  parseSlashTenScore( slice : TokenSlice) : Int {
    if ( slice.hasToken("?/10") ) {
      return 0;
    }
    val __len : Int  = (slice).length();
    var i : Int  = 1;
    while ((i + 2) < __len) {
      if ( slice.charCodeAt(i) == 47 ) {
        if ( (slice.charCodeAt((i + 1)) == 49) && (slice.charCodeAt((i + 2)) == 48) ) {
          var start : Int  = i;
          while (start > 0) {
            if ( slice.isDigitAt(start - 1) ) {
              start = start - 1;
            } else {
              break;
            }
          }
          if ( start < i ) {
            val numSlice : TokenSlice  = (slice.peek(start)).read((i - start));
            if ( numSlice.hasInteger(0, (numSlice).length() - 1) ) {
              return numSlice.parseInteger(0, (numSlice).length() - 1);
            }
          }
        }
      }
      i = i + 1;
    }
    return -1;
  }
  
  open fun  parseKind( slice : TokenSlice) : String {
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
  }
  
  open fun  prefixLength( slice : TokenSlice, kind : String) : Int {
    if ( kind == "pain" ) {
      return 5;
    }
    if ( slice.hasToken("Feelings ") ) {
      return 9;
    }
    return 8;
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val kind : String  = this.parseKind(slice);
    if ( (kind.length) == 0 ) {
      return this.noMatch();
    }
    val keyLen : Int  = this.prefixLength(slice, kind);
    val __len : Int  = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    val lineEnd : Int  = slice.findLineEnd(keyLen);
    val rawSlice : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
    var trimStart : Int  = 0;
    val rawLen : Int  = (rawSlice).length();
    while (trimStart < rawLen) {
      val chStart : Int  = rawSlice.charCodeAt(trimStart);
      if ( rawSlice.isWhitespace(chStart) ) {
        trimStart = trimStart + 1;
      } else {
        break;
      }
    }
    var trimEnd : Int  = rawLen;
    while (trimEnd > trimStart) {
      val chEnd : Int  = rawSlice.charCodeAt(trimEnd - 1);
      if ( rawSlice.isWhitespace(chEnd) ) {
        trimEnd = trimEnd - 1;
      } else {
        break;
      }
    }
    var score : Int  = -1;
    if ( trimEnd > trimStart ) {
      val valueSlice : TokenSlice  = (rawSlice.peek(trimStart)).read((trimEnd - trimStart));
      score = this.parseNumericScore(valueSlice);
      if ( score < 0 ) {
        if ( (kind == "feeling") && valueSlice.hasToken("RPE:") ) {
          if ( (valueSlice).length() > 4 ) {
            val rpeSlice : TokenSlice  = (valueSlice.peek(4)).read(((valueSlice).length() - 4));
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
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    var labelLen : Int  = keyLen - 1;
    if ( labelLen < 1 ) {
      labelLen = 1;
    }
    val label : TokenSlice  = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    val scoreToken : TokenSlice  = TokenSlice.fromText("" + score.toString());
    scoreToken.tag = "positive-integer";
    out.addChild(scoreToken);
    val fv : FeelingValue  =  FeelingValue();
    fv.kind = kind;
    fv.score = score;
    val parsed : SliceParsedValue  = SliceParsedValue.fromFeeling(fv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  }
}


class EffortDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "effort";
  }
  companion object {
    
    fun  create() : EffortDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  EffortDetector(s);
    }
  }
  
  open fun  prefixLength( slice : TokenSlice) : Int {
    if ( slice.hasToken("RPE ") ) {
      return 4;
    }
    return 7;
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    if ( slice.hasToken("Effort ") ) {
    } else {
      if ( slice.hasToken("RPE ") ) {
      } else {
        return this.noMatch();
      }
    }
    val keyLen : Int  = this.prefixLength(slice);
    val __len : Int  = (slice).length();
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    val lineEnd : Int  = slice.findLineEnd(keyLen);
    val valueSlice : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
    var detectors : MutableList<TokenDetector>  = arrayListOf();
    detectors.add(PositiveIntegerDetector.create());
    val p : Parser  =  Parser((valueSlice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 1 ) {
      return this.noMatch();
    }
    val scoreToken : TokenSlice  = p.getResults()[0];
    if ( scoreToken.tag == "positive-integer" ) {
    } else {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    var labelLen : Int  = keyLen - 1;
    if ( labelLen < 1 ) {
      labelLen = 1;
    }
    val label : TokenSlice  = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    out.addChild(scoreToken);
    val ev : EffortValue  =  EffortValue();
    ev.score = scoreToken.parseInteger(0, (scoreToken).length() - 1);
    val parsed : SliceParsedValue  = SliceParsedValue.fromEffort(ev);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  }
}


class BodyMetricDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "body-metric";
  }
  companion object {
    
    fun  create() : BodyMetricDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  BodyMetricDetector(s);
    }
  }
  
  open fun  findLineEnd( slice : TokenSlice, from : Int) : Int {
    return slice.findLineEnd(from);
  }
  
  open fun  createMetricSlice( slice : TokenSlice, offset : Int, lineEnd : Int) : TokenSlice {
    if ( offset >= lineEnd ) {
      return slice.read(0);
    }
    return (slice.peek(offset)).read((lineEnd - offset));
  }
  
  open fun  parseDoublePrefix( metricSlice : TokenSlice) : Double {
    val __len : Int  = (metricSlice).length();
    var i : Int  = 0;
    while (i < __len) {
      val ch : Int  = metricSlice.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        i = i + 1;
        continue;
      }
      if ( ch == 46 ) {
        i = i + 1;
        continue;
      }
      break;
    }
    if ( i == 0 ) {
      return -1.0;
    }
    if ( metricSlice.hasDouble(0, i - 1) ) {
      return metricSlice.parseDouble(0, i - 1);
    }
    return -1.0;
  }
  
  open fun  parseIntegerPrefix( metricSlice : TokenSlice) : Int {
    val i : Int  = metricSlice.findNumberEnd(0);
    if ( i == 0 ) {
      return -1;
    }
    if ( metricSlice.hasInteger(0, i - 1) ) {
      return metricSlice.parseInteger(0, i - 1);
    }
    return -1;
  }
  
  open fun  setCommon( out : TokenSlice, source : TokenSlice, value : BodyMetricValue) : Unit {
    val parsed : SliceParsedValue  = SliceParsedValue.fromBodyMetric(value);
    out.setSliceValue(parsed);
    source.setSliceValue(parsed);
  }
  
  open fun  detectSimpleDoubleMetric( slice : TokenSlice, prefix : String, labelLen : Int, metricName : String, unit : String, allowZero : Boolean) : TokenSlice {
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    val prefixLen : Int  = prefix.length;
    val lineEnd : Int  = this.findLineEnd(slice, prefixLen);
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    val label : TokenSlice  = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    val metric : TokenSlice  = this.createMetricSlice(slice, prefixLen, lineEnd);
    val value : Double  = this.parseDoublePrefix(metric);
    if ( allowZero ) {
      if ( value < 0.0 ) {
        return this.noMatch();
      }
    } else {
      if ( value <= 0.0 ) {
        return this.noMatch();
      }
    }
    val mv : BodyMetricValue  =  BodyMetricValue();
    mv.metric = metricName;
    mv.primaryValue = value;
    mv.unit = unit;
    this.setCommon(out, slice, mv);
    return out;
  }
  
  open fun  detectWeight( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "Weight ", 6, "weight", "kg", false);
  }
  
  open fun  detectBodyFat( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "BodyFat ", 7, "body-fat", "%", true);
  }
  
  open fun  detectSleep( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "Sleep ", 5, "sleep", "h", false);
  }
  
  open fun  detectRestingHr( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "Health resting_hr ", 17, "resting-hr", "bpm", false);
  }
  
  open fun  detectBp( slice : TokenSlice) : TokenSlice {
    val prefix : String  = "Vitals bp ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    val lineEnd : Int  = this.findLineEnd(slice, prefix.length);
    val metric : TokenSlice  = this.createMetricSlice(slice, prefix.length, lineEnd);
    val slashPos : Int  = metric.findTokenPos("/");
    if ( (slashPos < 1) || (slashPos >= ((metric).length() - 1)) ) {
      return this.noMatch();
    }
    val left : TokenSlice  = metric.read(slashPos);
    val right : TokenSlice  = (metric.peek((slashPos + 1))).read((((metric).length() - slashPos) - 1));
    if ( left.hasInteger(0, (left).length() - 1) ) {
    } else {
      return this.noMatch();
    }
    if ( right.hasInteger(0, (right).length() - 1) ) {
    } else {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    val label : TokenSlice  = slice.read(9);
    label.tag = "keyword";
    out.addChild(label);
    val mv : BodyMetricValue  =  BodyMetricValue();
    mv.metric = "blood-pressure";
    mv.primaryValue = left.parseDouble(0, (left).length() - 1);
    mv.secondaryValue = right.parseInteger(0, (right).length() - 1);
    mv.unit = "mmhg";
    this.setCommon(out, slice, mv);
    return out;
  }
  
  open fun  detectVitalsWeight( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "Vitals weight:", 13, "weight", "kg", false);
  }
  
  open fun  detectVitalsSleep( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "Vitals sleep:", 12, "sleep", "h", false);
  }
  
  open fun  detectVitalsRhr( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "Vitals rhr:", 10, "resting-hr", "bpm", false);
  }
  
  open fun  detectWaist( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "Waist ", 5, "waist", "cm", false);
  }
  
  open fun  detectHip( slice : TokenSlice) : TokenSlice {
    return this.detectSimpleDoubleMetric(slice, "Hip ", 3, "hip", "cm", false);
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val w : TokenSlice  = this.detectWeight(slice);
    if ( w.isEmpty() ) {
    } else {
      return w;
    }
    val bf : TokenSlice  = this.detectBodyFat(slice);
    if ( bf.isEmpty() ) {
    } else {
      return bf;
    }
    val sl : TokenSlice  = this.detectSleep(slice);
    if ( sl.isEmpty() ) {
    } else {
      return sl;
    }
    val hr : TokenSlice  = this.detectRestingHr(slice);
    if ( hr.isEmpty() ) {
    } else {
      return hr;
    }
    val vw : TokenSlice  = this.detectVitalsWeight(slice);
    if ( vw.isEmpty() ) {
    } else {
      return vw;
    }
    val vs : TokenSlice  = this.detectVitalsSleep(slice);
    if ( vs.isEmpty() ) {
    } else {
      return vs;
    }
    val vr : TokenSlice  = this.detectVitalsRhr(slice);
    if ( vr.isEmpty() ) {
    } else {
      return vr;
    }
    val waist : TokenSlice  = this.detectWaist(slice);
    if ( waist.isEmpty() ) {
    } else {
      return waist;
    }
    val hip : TokenSlice  = this.detectHip(slice);
    if ( hip.isEmpty() ) {
    } else {
      return hip;
    }
    return this.detectBp(slice);
  }
}


class CircuitDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "circuit";
  }
  companion object {
    
    fun  create() : CircuitDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  CircuitDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val prefix : String  = "Circuit ";
    if ( slice.hasToken(prefix) ) {
    } else {
      return this.noMatch();
    }
    /** unused:  val __len : Int  = (slice).length()   **/ ;
    val roundsStart : Int  = prefix.length;
    val roundsEnd : Int  = slice.findNumberEnd(roundsStart);
    if ( roundsEnd <= roundsStart ) {
      return this.noMatch();
    }
    val roundsSlice : TokenSlice  = (slice.peek(roundsStart)).read((roundsEnd - roundsStart));
    if ( roundsSlice.hasInteger(0, (roundsSlice).length() - 1) ) {
    } else {
      return this.noMatch();
    }
    val lineEnd : Int  = slice.findLineEnd(roundsEnd);
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    val circuitToken : TokenSlice  = slice.read(7);
    circuitToken.tag = "keyword";
    out.addChild(circuitToken);
    val roundsToken : TokenSlice  = (slice.peek(roundsStart)).read((roundsEnd - roundsStart));
    roundsToken.tag = "positive-integer";
    out.addChild(roundsToken);
    val cv : CircuitValue  =  CircuitValue();
    cv.rounds = roundsSlice.parseInteger(0, (roundsSlice).length() - 1);
    if ( (roundsEnd < lineEnd) && (slice.charCodeAt(roundsEnd) == 47) ) {
      val i : Int  = slice.findNumberEnd(roundsEnd + 1);
      if ( i > (roundsEnd + 1) ) {
        var j : Int  = i;
        while (j < lineEnd) {
          val ch4 : Int  = slice.charCodeAt(j);
          if ( (ch4 >= 65) && (ch4 <= 90) ) {
            j = j + 1;
            continue;
          }
          if ( (ch4 >= 97) && (ch4 <= 122) ) {
            j = j + 1;
            continue;
          }
          break;
        }
        if ( j > i ) {
          val restToken : TokenSlice  = (slice.peek(roundsEnd)).read((j - roundsEnd));
          restToken.tag = "recovery-time";
          out.addChild(restToken);
          val vSlice : TokenSlice  = (slice.peek((roundsEnd + 1))).read(((i - roundsEnd) - 1));
          cv.restValue = vSlice.parseInteger(0, (vSlice).length() - 1);
          val unitRaw : String  = ((slice.peek(i)).read((j - i))).toString();
          if ( (unitRaw == "min") || (unitRaw == "m") ) {
            cv.restUnit = "min";
          }
          if ( (unitRaw == "sec") || (unitRaw == "s") ) {
            cv.restUnit = "sec";
          }
        }
      }
    }
    val parsed : SliceParsedValue  = SliceParsedValue.fromCircuit(cv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  }
}


class NGSharedLists( ) 
 {
  @JvmField var sportNames : MutableList<String>  = arrayListOf();
  @JvmField var contextEntryKinds : MutableList<String>  = arrayListOf();
  @JvmField var contextEntryPrefixTokens : MutableList<String>  = arrayListOf();
  @JvmField var romanZonePrefixTokens : MutableList<String>  = arrayListOf();
  @JvmField var contextEntryKindMap : MutableMap<String,Boolean>  = hashMapOf();
  @JvmField var reservedGenericExerciseNameMap : MutableMap<String,Boolean>  = hashMapOf();
  
  init {
    sportNames.add("Swim");
    sportNames.add("Run");
    sportNames.add("Bike");
    sportNames.add("Ski");
    sportNames.add("Row");
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
    romanZonePrefixTokens.add("III");
    romanZonePrefixTokens.add("II");
    romanZonePrefixTokens.add("IV");
    romanZonePrefixTokens.add("V");
    romanZonePrefixTokens.add("I");
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
  companion object {
    private var __singleton_instance : NGSharedLists? = null
    fun __singleton() : NGSharedLists {
      if (__singleton_instance == null) {
        __singleton_instance = NGSharedLists()
      }
      return __singleton_instance!!
    }
  }
  
  open fun  addContextEntryKind( kind : String, prefix : String) : Unit {
    contextEntryKinds.add(kind);
    contextEntryPrefixTokens.add(prefix);
    contextEntryKindMap.set(kind, true)
  }
  
  open fun  addReservedGenericExerciseName( name : String) : Unit {
    reservedGenericExerciseNameMap.set(name, true)
  }
  
  open fun  defaultSportNames() : MutableList<String> {
    return sportNames;
  }
  
  open fun  defaultContextEntryKinds() : MutableList<String> {
    return contextEntryKinds;
  }
  
  open fun  defaultContextEntryPrefixTokens() : MutableList<String> {
    return contextEntryPrefixTokens;
  }
  
  open fun  defaultRomanZonePrefixTokens() : MutableList<String> {
    return romanZonePrefixTokens;
  }
  
  open fun  isContextEntryKind( kind : String) : Boolean {
    return contextEntryKindMap.containsKey(kind);
  }
  
  open fun  isReservedGenericExerciseName( name : String) : Boolean {
    return reservedGenericExerciseNameMap.containsKey(name);
  }
}

class ContextEntryDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "context-entry";
  }
  companion object {
    
    fun  create() : ContextEntryDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  ContextEntryDetector(s);
    }
  }
  
  open fun  toTag( kind : String) : String {
    val shared : NGSharedLists  =  NGSharedLists.__singleton();
    if ( shared.isContextEntryKind(kind) ) {
      return kind;
    }
    return detectedTag;
  }
  
  open fun  detectKind( slice : TokenSlice) : String {
    val shared : NGSharedLists  =  NGSharedLists.__singleton();
    val kinds : MutableList<String>  = shared.defaultContextEntryKinds();
    val prefixes : MutableList<String>  = shared.defaultContextEntryPrefixTokens();
    val cnt : Int  = kinds.size;
    var i : Int  = 0;
    while (i < cnt) {
      if ( slice.hasToken(prefixes[i]) ) {
        return kinds[i];
      }
      i = i + 1;
    }
    return "";
  }
  
  open fun  findLineEnd( slice : TokenSlice, start : Int) : Int {
    return slice.findLineEnd(start);
  }
  
  open fun  parseDerivedFields( cv : ContextEntryValue, valueSlice : TokenSlice) : Unit {
    val __len : Int  = (valueSlice).length();
    if ( __len <= 0 ) {
      return;
    }
    var i : Int  = 0;
    while (i < __len) {
      val chStart : Int  = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chStart) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i >= __len ) {
      return;
    }
    val metricStart : Int  = i;
    while (i < __len) {
      val chMetric : Int  = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chMetric) ) {
        break;
      }
      i = i + 1;
    }
    val metricEnd : Int  = i;
    if ( metricEnd > metricStart ) {
      cv.name = ((valueSlice.peek(metricStart)).read((metricEnd - metricStart))).toString();
    }
    while (i < __len) {
      val chAfterMetric : Int  = valueSlice.charCodeAt(i);
      if ( valueSlice.isWhitespace(chAfterMetric) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i >= __len ) {
      return;
    }
    val valueStart : Int  = i;
    while (i < __len) {
      val chNum : Int  = valueSlice.charCodeAt(i);
      if ( ((chNum == 124) || (chNum == 59)) || valueSlice.isWhitespace(chNum) ) {
        break;
      }
      i = i + 1;
    }
    val valueEnd : Int  = i;
    if ( valueEnd > valueStart ) {
      val valueToken : TokenSlice  = (valueSlice.peek(valueStart)).read((valueEnd - valueStart));
      cv.value = (valueToken).toString();
      if ( valueToken.hasDouble(0, (valueToken).length() - 1) ) {
        cv.numericValue = valueToken.parseDouble(0, (valueToken).length() - 1);
        cv.hasNumeric = true;
      }
    }
    if ( i < __len ) {
      val sep : Int  = valueSlice.charCodeAt(i);
      if ( (sep == 124) || (sep == 59) ) {
        i = i + 1;
        while (i < __len) {
          val chUnitStart : Int  = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chUnitStart) ) {
            i = i + 1;
          } else {
            break;
          }
        }
        val unitStart : Int  = i;
        while (i < __len) {
          val chUnit : Int  = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chUnit) ) {
            break;
          }
          i = i + 1;
        }
        val unitEnd : Int  = i;
        if ( unitEnd > unitStart ) {
          cv.unit = ((valueSlice.peek(unitStart)).read((unitEnd - unitStart))).toString();
        }
        while (i < __len) {
          val chBeforeToken : Int  = valueSlice.charCodeAt(i);
          if ( valueSlice.isWhitespace(chBeforeToken) ) {
            i = i + 1;
          } else {
            break;
          }
        }
        while (i < __len) {
          val tokenStart : Int  = i;
          while (i < __len) {
            val chToken : Int  = valueSlice.charCodeAt(i);
            if ( valueSlice.isWhitespace(chToken) ) {
              break;
            }
            i = i + 1;
          }
          val tokenEnd : Int  = i;
          if ( tokenEnd > tokenStart ) {
            val tokenSlice : TokenSlice  = (valueSlice.peek(tokenStart)).read((tokenEnd - tokenStart));
            val tokenLen : Int  = (tokenSlice).length();
            var colonAt : Int  = -1;
            var j : Int  = 0;
            while (j < tokenLen) {
              if ( tokenSlice.charCodeAt(j) == 58 ) {
                colonAt = j;
                break;
              }
              j = j + 1;
            }
            if ( (colonAt > 0) && (colonAt < (tokenLen - 1)) ) {
              val key : String  = ((tokenSlice.peek(0)).read(colonAt)).toString();
              val valSlice : TokenSlice  = (tokenSlice.peek((colonAt + 1))).read((tokenLen - (colonAt + 1)));
              val valLen : Int  = (valSlice).length();
              if ( key == "basis" ) {
                cv.basis = (valSlice).toString();
              }
              if ( key == "source" ) {
                cv.source = (valSlice).toString();
              }
              if ( key == "confidence" ) {
                if ( valLen > 0 ) {
                  val lastCh : Int  = valSlice.charCodeAt(valLen - 1);
                  if ( lastCh == 37 ) {
                    if ( valLen > 1 ) {
                      val numSlice : TokenSlice  = (valSlice.peek(0)).read((valLen - 1));
                      if ( numSlice.hasDouble(0, (numSlice).length() - 1) ) {
                        cv.confidence = numSlice.parseDouble(0, (numSlice).length() - 1);
                        cv.hasConfidence = true;
                      }
                    }
                  } else {
                    if ( valSlice.hasDouble(0, (valSlice).length() - 1) ) {
                      cv.confidence = valSlice.parseDouble(0, (valSlice).length() - 1);
                      cv.hasConfidence = true;
                    }
                  }
                }
              }
              if ( key == "goodness" ) {
                if ( valSlice.hasInteger(0, (valSlice).length() - 1) ) {
                  cv.goodness = valSlice.parseInteger(0, (valSlice).length() - 1);
                  cv.hasGoodness = true;
                }
              }
            }
          }
          while (i < __len) {
            val chGap : Int  = valueSlice.charCodeAt(i);
            if ( valueSlice.isWhitespace(chGap) ) {
              i = i + 1;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len > 1 ) {
      val quote : Int  = slice.charCodeAt(0);
      if ( (quote == 34) || (quote == 39) ) {
        val lineEndQuoted : Int  = this.findLineEnd(slice, 1);
        val contentStart : Int  = 1;
        var contentEnd : Int  = lineEndQuoted;
        if ( (lineEndQuoted > 1) && (slice.charCodeAt((lineEndQuoted - 1)) == quote) ) {
          contentEnd = lineEndQuoted - 1;
        }
        if ( contentEnd <= contentStart ) {
          return this.noMatch();
        }
        val outQuoted : TokenSlice  = slice.read(lineEndQuoted);
        outQuoted.tag = "comment";
        val contentSlice : TokenSlice  = (slice.peek(contentStart)).read((contentEnd - contentStart));
        val textToken : TokenSlice  = contentSlice.read(contentEnd - contentStart);
        textToken.tag = "text";
        outQuoted.addChild(textToken);
        val quotedValue : ContextEntryValue  =  ContextEntryValue();
        quotedValue.kind = "comment";
        quotedValue.content = (contentSlice).toString();
        val quotedParsed : SliceParsedValue  = SliceParsedValue.fromContextEntry(quotedValue);
        outQuoted.setSliceValue(quotedParsed);
        slice.setSliceValue(quotedParsed);
        return outQuoted;
      }
    }
    val kind : String  = this.detectKind(slice);
    val kindLen : Int  = kind.length;
    if ( kindLen == 0 ) {
      return this.noMatch();
    }
    val keyLen : Int  = kindLen + 1;
    if ( keyLen >= __len ) {
      return this.noMatch();
    }
    val lineEnd : Int  = this.findLineEnd(slice, keyLen);
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = this.toTag(kind);
    val labelLen : Int  = keyLen - 1;
    val label : TokenSlice  = slice.read(labelLen);
    label.tag = "keyword";
    out.addChild(label);
    if ( keyLen < lineEnd ) {
      val contentSlice_1 : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
      val content : String  = (contentSlice_1).toString();
      if ( (content.length) > 0 ) {
        val textToken_1 : TokenSlice  = contentSlice_1.read(content.length);
        textToken_1.tag = "text";
        out.addChild(textToken_1);
      }
    }
    val cv : ContextEntryValue  =  ContextEntryValue();
    cv.kind = kind;
    if ( keyLen < lineEnd ) {
      cv.content = ((slice.peek(keyLen)).read((lineEnd - keyLen))).toString();
    }
    if ( kind == "derived" ) {
      if ( keyLen < lineEnd ) {
        val derivedSlice : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
        this.parseDerivedFields(cv, derivedSlice);
      }
    }
    if ( kind == "custom" ) {
      val customSlice : TokenSlice  = (slice.peek(keyLen)).read((lineEnd - keyLen));
      val customLen : Int  = (customSlice).length();
      var fieldStart : Int  = 0;
      while (fieldStart < customLen) {
        val chStart : Int  = customSlice.charCodeAt(fieldStart);
        if ( customSlice.isWhitespace(chStart) ) {
          fieldStart = fieldStart + 1;
        } else {
          break;
        }
      }
      var fieldEnd : Int  = fieldStart;
      while (fieldEnd < customLen) {
        val chField : Int  = customSlice.charCodeAt(fieldEnd);
        if ( customSlice.isWhitespace(chField) ) {
          break;
        }
        fieldEnd = fieldEnd + 1;
      }
      if ( fieldEnd > fieldStart ) {
        cv.name = ((customSlice.peek(fieldStart)).read((fieldEnd - fieldStart))).toString();
        var valueStart : Int  = fieldEnd;
        while (valueStart < customLen) {
          val chValueStart : Int  = customSlice.charCodeAt(valueStart);
          if ( customSlice.isWhitespace(chValueStart) ) {
            valueStart = valueStart + 1;
          } else {
            break;
          }
        }
        if ( valueStart < customLen ) {
          val valueSlice : TokenSlice  = (customSlice.peek(valueStart)).read((customLen - valueStart));
          cv.value = (valueSlice).toString();
          if ( valueSlice.hasDouble(0, (valueSlice).length() - 1) ) {
            cv.numericValue = valueSlice.parseDouble(0, (valueSlice).length() - 1);
            cv.hasNumeric = true;
          }
        }
      }
    }
    val parsed : SliceParsedValue  = SliceParsedValue.fromContextEntry(cv);
    out.setSliceValue(parsed);
    slice.setSliceValue(parsed);
    return out;
  }
}


class DistanceRangeBlockDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "distance-range";
  }
  companion object {
    
    fun  create() : DistanceRangeBlockDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  DistanceRangeBlockDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 5 ) {
      return this.noMatch();
    }
    val lLen : Int  = slice.findNumberEnd(0);
    if ( lLen <= 0 ) {
      return this.noMatch();
    }
    if ( false == slice.hasInteger(0, (lLen - 1)) ) {
      return this.noMatch();
    }
    if ( lLen >= __len ) {
      return this.noMatch();
    }
    val sep : Int  = slice.charCodeAt(lLen);
    if ( sep == 45 ) {
      val rightAStart : Int  = lLen + 1;
      if ( rightAStart >= __len ) {
        return this.noMatch();
      }
      val rightA : TokenSlice  = slice.peek(rightAStart);
      val rLenA : Int  = rightA.findNumberEnd(0);
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
      val lvalA : Int  = slice.parseInteger(0, lLen - 1);
      val rvalA : Int  = rightA.parseInteger(0, rLenA - 1);
      if ( (lvalA <= 0) || (rvalA <= 0) ) {
        return this.noMatch();
      }
      val outA : TokenSlice  = slice.read((rightAStart + rLenA) + 1);
      outA.tag = detectedTag;
      return outA;
    }
    if ( sep != 109 ) {
      return this.noMatch();
    }
    val lLenB : Int  = lLen;
    if ( (lLenB + 2) > __len ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt((lLenB + 1)) != 45 ) {
      return this.noMatch();
    }
    val rightBStart : Int  = lLenB + 2;
    if ( rightBStart >= __len ) {
      return this.noMatch();
    }
    val rightB : TokenSlice  = slice.peek(rightBStart);
    val rLenB : Int  = rightB.findNumberEnd(0);
    if ( rLenB <= 0 ) {
      return this.noMatch();
    }
    if ( rightB.hasInteger(0, rLenB - 1) ) {
    } else {
      return this.noMatch();
    }
    if ( (rLenB + 1) > (rightB).length() ) {
      return this.noMatch();
    }
    if ( rightB.charCodeAt(rLenB) != 109 ) {
      return this.noMatch();
    }
    val lvalB : Int  = slice.parseInteger(0, lLenB - 1);
    val rvalB : Int  = rightB.parseInteger(0, rLenB - 1);
    if ( (lvalB <= 0) || (rvalB <= 0) ) {
      return this.noMatch();
    }
    val outB : TokenSlice  = slice.read((rightBStart + rLenB) + 1);
    outB.tag = detectedTag;
    return outB;
  }
}


class SemicolonSeparatorDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "space";
  }
  companion object {
    
    fun  create() : SemicolonSeparatorDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  SemicolonSeparatorDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    if ( (slice).length() == 0 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 59 ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(1);
    out.tag = detectedTag;
    return out;
  }
}


class KCALDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "kcal";
  }
  companion object {
    
    fun  create() : KCALDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  KCALDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 5 ) {
      return this.noMatch();
    }
    var detectors : MutableList<TokenDetector>  = arrayListOf();
    detectors.add(PositiveIntegerDetector.create());
    detectors.add(KeywordDetector.create("kcal"));
    val p : Parser  =  Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    val parts : MutableList<TokenSlice>  = p.getResults();
    val first : TokenSlice  = parts[0];
    val second : TokenSlice  = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("kcal") ) {
      return this.noMatch();
    }
    val outLen : Int  = (first).length() + (second).length();
    val out : TokenSlice  = slice.read(outLen);
    out.tag = detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  }
}


class BPMDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "bpm";
  }
  companion object {
    
    fun  create() : BPMDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  BPMDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 4 ) {
      return this.noMatch();
    }
    var detectors : MutableList<TokenDetector>  = arrayListOf();
    detectors.add(PositiveIntegerDetector.create());
    detectors.add(KeywordDetector.create("bpm"));
    val p : Parser  =  Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    val parts : MutableList<TokenSlice>  = p.getResults();
    val first : TokenSlice  = parts[0];
    val second : TokenSlice  = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("bpm") ) {
      return this.noMatch();
    }
    val outLen : Int  = (first).length() + (second).length();
    val out : TokenSlice  = slice.read(outLen);
    out.tag = detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  }
}


class PercentageRangeDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "percentage-range";
  }
  companion object {
    
    fun  create() : PercentageRangeDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  PercentageRangeDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 4 ) {
      return this.noMatch();
    }
    var i : Int  = 0;
    while (i < __len) {
      if ( slice.isDigitAt(i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( ((i > 0) && (i < __len)) && (slice.charCodeAt(i) == 37) ) {
      if ( ((i + 1) < __len) && (slice.charCodeAt((i + 1)) == 45) ) {
        var j : Int  = i + 2;
        while (j < __len) {
          if ( slice.isDigitAt(j) ) {
            j = j + 1;
          } else {
            break;
          }
        }
        if ( ((j > (i + 2)) && (j < __len)) && (slice.charCodeAt(j) == 37) ) {
          val leftDigits : TokenSlice  = slice.read(i);
          val rightDigits : TokenSlice  = (slice.peek((i + 2))).read((j - (i + 2)));
          if ( false == leftDigits.hasInteger(0, ((leftDigits).length() - 1)) ) {
            return this.noMatch();
          }
          if ( false == rightDigits.hasInteger(0, ((rightDigits).length() - 1)) ) {
            return this.noMatch();
          }
          val lval : Int  = leftDigits.parseInteger(0, (leftDigits).length() - 1);
          val rval : Int  = rightDigits.parseInteger(0, (rightDigits).length() - 1);
          if ( (lval > 0) && (rval > 0) ) {
            val out2 : TokenSlice  = slice.read(j + 1);
            out2.tag = detectedTag;
            val pv2 : PercentageRangeValue  =  PercentageRangeValue();
            pv2.minValue = lval;
            pv2.maxValue = rval;
            val payload2 : SliceParsedValue  = SliceParsedValue.fromPercentageRange(pv2);
            out2.setSliceValue(payload2);
            slice.setSliceValue(payload2);
            return out2;
          }
        }
      }
    }
    var detectors : MutableList<TokenDetector>  = arrayListOf();
    detectors.add(SpaceDetector.create());
    detectors.add(NumRangeBlockDetector.create());
    detectors.add(KeywordDetector.create("%"));
    val p : Parser  =  Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    val parts : MutableList<TokenSlice>  = p.getResults();
    val first : TokenSlice  = parts[0];
    val second : TokenSlice  = parts[1];
    if ( false == (first.tag == "num-range") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("%") ) {
      return this.noMatch();
    }
    val outLen : Int  = (first).length() + (second).length();
    val out : TokenSlice  = slice.read(outLen);
    out.tag = detectedTag;
    out.addChild(first);
    out.addChild(second);
    val nrv : NumRangeValue  = first.getAsNumRangeValue();
    val pv : PercentageRangeValue  =  PercentageRangeValue();
    pv.minValue = nrv.minValue;
    pv.maxValue = nrv.maxValue;
    val payload : SliceParsedValue  = SliceParsedValue.fromPercentageRange(pv);
    out.setSliceValue(payload);
    slice.setSliceValue(payload);
    return out;
  }
}


class RMDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "rm";
  }
  companion object {
    
    fun  create() : RMDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  RMDetector(s);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 3 ) {
      return this.noMatch();
    }
    var detectors : MutableList<TokenDetector>  = arrayListOf();
    detectors.add(PositiveIntegerDetector.create());
    detectors.add(KeywordDetector.create("RM"));
    val p : Parser  =  Parser((slice).toString(), detectors);
    (p).start();
    if ( p.getCount() != 2 ) {
      return this.noMatch();
    }
    val parts : MutableList<TokenSlice>  = p.getResults();
    val first : TokenSlice  = parts[0];
    val second : TokenSlice  = parts[1];
    if ( false == (first.tag == "positive-integer") ) {
      return this.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return this.noMatch();
    }
    if ( false == second.strEquals("RM") ) {
      return this.noMatch();
    }
    val outLen : Int  = (first).length() + (second).length();
    val out : TokenSlice  = slice.read(outLen);
    out.tag = detectedTag;
    out.addChild(first);
    out.addChild(second);
    return out;
  }
}


class RomanZoneDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "zone-roman";
  }
  companion object {
    
    fun  create() : RomanZoneDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  RomanZoneDetector(s);
    }
  }
  
  open fun  romanPrefixLen( slice : TokenSlice) : Int {
    val shared : NGSharedLists  =  NGSharedLists.__singleton();
    val candidates : MutableList<String>  = shared.defaultRomanZonePrefixTokens();
    var i : Int  = 0;
    val cnt : Int  = candidates.size;
    while (i < cnt) {
      val token : String  = candidates[i];
      if ( slice.hasToken(token) ) {
        return token.length;
      }
      i = i + 1;
    }
    return 0;
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val tokenLen : Int  = this.romanPrefixLen(slice);
    if ( tokenLen == 0 ) {
      return this.noMatch();
    }
    val __len : Int  = (slice).length();
    if ( __len > tokenLen ) {
      if ( slice.isAlphaNumAt(tokenLen) ) {
        return this.noMatch();
      }
    }
    val out : TokenSlice  = slice.read(tokenLen);
    out.tag = detectedTag;
    return out;
  }
}


class PhaseDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "phase";
  }
  companion object {
    
    fun  create() : PhaseDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  PhaseDetector(s);
    }
  }
  
  open fun  findLineEnd( slice : TokenSlice, from : Int) : Int {
    return slice.findLineEnd(from);
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    if ( slice.hasToken("Phase") ) {
    } else {
      return this.noMatch();
    }
    val lineEnd : Int  = this.findLineEnd(slice, 0);
    if ( lineEnd <= 5 ) {
      return this.noMatch();
    }
    var keyEnd : Int  = 0;
    while (keyEnd < lineEnd) {
      val ch : Int  = slice.charCodeAt(keyEnd);
      if ( slice.isWhitespace(ch) ) {
        break;
      }
      if ( ch == 124 ) {
        break;
      }
      keyEnd = keyEnd + 1;
    }
    if ( keyEnd <= 0 ) {
      return this.noMatch();
    }
    val keyText : String  = (slice.read(keyEnd)).toString();
    if ( (keyText.substring(0, 5 )) == "Phase" ) {
    } else {
      return this.noMatch();
    }
    var contentStart : Int  = keyEnd;
    if ( contentStart < lineEnd ) {
      val chSep : Int  = slice.charCodeAt(contentStart);
      if ( (chSep == 124) || slice.isWhitespace(chSep) ) {
        contentStart = contentStart + 1;
      }
    }
    while (contentStart < lineEnd) {
      val chSpace : Int  = slice.charCodeAt(contentStart);
      if ( slice.isWhitespace(chSpace) ) {
        contentStart = contentStart + 1;
      } else {
        break;
      }
    }
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    val label : TokenSlice  = slice.read(keyEnd);
    label.tag = "keyword";
    out.addChild(label);
    if ( contentStart < lineEnd ) {
      val contentSlice : TokenSlice  = (slice.peek(contentStart)).read((lineEnd - contentStart));
      val textToken : TokenSlice  = contentSlice.read(lineEnd - contentStart);
      textToken.tag = "text";
      out.addChild(textToken);
    }
    return out;
  }
}


class HeadingDataDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "heading-data";
  }
  companion object {
    
    fun  create() : HeadingDataDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  HeadingDataDetector(s);
    }
  }
  
  open fun  hasIsoDatePrefix( slice : TokenSlice, start : Int) : Boolean {
    if ( (start + 10) > (slice).length() ) {
      return false;
    }
    if ( slice.isDigitAt(start + 0) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(start + 1) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(start + 2) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(start + 3) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt((start + 4)) == 45 ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(start + 5) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(start + 6) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt((start + 7)) == 45 ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(start + 8) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(start + 9) ) {
    } else {
      return false;
    }
    return true;
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len < 2 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) == 91 ) {
      var closeIdx : Int  = 1;
      while (closeIdx < __len) {
        val chClose : Int  = slice.charCodeAt(closeIdx);
        if ( (chClose == 10) || (chClose == 13) ) {
          break;
        }
        if ( chClose == 93 ) {
          break;
        }
        closeIdx = closeIdx + 1;
      }
      if ( (closeIdx < __len) && (slice.charCodeAt(closeIdx) == 93) ) {
        if ( this.hasIsoDatePrefix(slice, 1) ) {
          var i2 : Int  = closeIdx + 1;
          while (i2 < __len) {
            val chSpace : Int  = slice.charCodeAt(i2);
            if ( slice.isWhitespace(chSpace) ) {
              i2 = i2 + 1;
            } else {
              break;
            }
          }
          var hashCount : Int  = 0;
          while (i2 < __len) {
            if ( slice.charCodeAt(i2) == 35 ) {
              hashCount = hashCount + 1;
              i2 = i2 + 1;
            } else {
              break;
            }
          }
          if ( hashCount >= 1 ) {
            if ( (i2 < __len) && (slice.charCodeAt(i2) == 32) ) {
              i2 = i2 + 1;
              if ( i2 < __len ) {
                var j : Int  = i2;
                while (j < __len) {
                  val chJ : Int  = slice.charCodeAt(j);
                  if ( (chJ == 10) || (chJ == 13) ) {
                    break;
                  }
                  j = j + 1;
                }
                if ( j > i2 ) {
                  val out2 : TokenSlice  = slice.read(j);
                  out2.tag = detectedTag;
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
    var i : Int  = 2;
    while (i < __len) {
      val ch : Int  = slice.charCodeAt(i);
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    }
    if ( i <= 2 ) {
      return this.noMatch();
    }
    val out : TokenSlice  = slice.read(i);
    out.tag = detectedTag;
    return out;
  }
}


class StandardDetectors 
 {
  companion object {
    
    fun  create() : MutableList<TokenDetector> {
      var ds : MutableList<TokenDetector>  = arrayListOf();
      ds.add(SpaceDetector.create());
      ds.add(NewlineDetector.create());
      ds.add(DateTimeDetector.create());
      ds.add(SpeedDetector.create());
      ds.add(KCALDetector.create());
      ds.add(BPMDetector.create());
      ds.add(WeightDetector.create());
      ds.add(DistanceRangeBlockDetector.create());
      ds.add(PercentageRangeDetector.create());
      ds.add(SetRepRangeLoadDetector.create());
      ds.add(NumRangeBlockDetector.create());
      ds.add(DistanceDetector.create());
      ds.add(PercentageDetector.create());
      ds.add(RMDetector.create());
      ds.add(ZoneDetector.create());
      ds.add(RomanZoneDetector.create());
      ds.add(RecoveryTimeDetector.create());
      ds.add(TimeValueDetector.create());
      ds.add(RecoveryDetector.create());
      ds.add(LeftRightDetector.create());
      ds.add(FeelingDetector.create());
      ds.add(EffortDetector.create());
      ds.add(BodyMetricDetector.create());
      ds.add(CircuitDetector.create());
      ds.add(PhaseDetector.create());
      ds.add(ContextEntryDetector.create());
      ds.add(SportExerciseDetector.create());
      ds.add(DecimalNumberDetector.create());
      ds.add(PositiveIntegerDetector.create());
      ds.add(RepeatBlockDetector.create());
      ds.add(AMTimeValueDetector.create());
      ds.add(DetailsDataDetector.create());
      ds.add(HeadingDataDetector.create());
      return ds;
    }
  }
}


class DetailsDataDetector( noMatchSlice : TokenSlice ) : TokenDetector(noMatchSlice) 
 {
  
  init {
    cachedNoMatch = noMatchSlice;
    detectedTag = "details-data";
  }
  companion object {
    
    fun  create() : DetailsDataDetector {
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  DetailsDataDetector(s);
    }
  }
  
  open fun  createChildDetectors() : MutableList<TokenDetector> {
    return StandardDetectors.create();
  }
  
  open fun  findFirstNumberOffset( slice : TokenSlice) : Int {
    var i : Int  = 0;
    val __len : Int  = (slice).length();
    while (i < __len) {
      val ch : Int  = slice.charCodeAt(i);
      if ( (ch >= 48) && (ch <= 57) ) {
        return i;
      }
      i = i + 1;
    }
    return -1;
  }
  
  open fun  isLetter( ch : Int) : Boolean {
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  }
  
  open fun  addChildrenFromParser( out : TokenSlice, payload : TokenSlice) : Unit {
    val p : Parser  =  Parser((payload).toString(), this.createChildDetectors());
    (p).start();
    val ch : MutableList<TokenSlice>  = p.getResults();
    for ( i in ch.indices ) {
      val item = ch[i]
      out.addChild(item);
    }
  }
  
  open fun  addKeywordTailChildren( out : TokenSlice, payload : TokenSlice) : Unit {
    val rbDetector : RepeatBlockDetector  = RepeatBlockDetector.create();
    val rb : TokenSlice  = rbDetector.detect(payload);
    if ( false == (rb.tag == "repeat-block") ) {
      this.addChildrenFromParser(out, payload);
      return;
    }
    out.addChild(rb);
    var restStart : Int  = (rb).length();
    val __len : Int  = (payload).length();
    while (restStart < __len) {
      val ch : Int  = payload.charCodeAt(restStart);
      if ( payload.isWhitespace(ch) ) {
        restStart = restStart + 1;
      } else {
        break;
      }
    }
    if ( restStart < __len ) {
      val rest : TokenSlice  = (payload.peek(restStart)).read((__len - restStart));
      this.addChildrenFromParser(out, rest);
    }
  }
  
  open fun  addParsedChildren( out : TokenSlice, payload : TokenSlice) : Unit {
    val p : Parser  =  Parser((payload).toString(), this.createChildDetectors());
    (p).start();
    if ( p.getCount() > 0 ) {
      val ch : MutableList<TokenSlice>  = p.getResults();
      for ( i in ch.indices ) {
        val item = ch[i]
        out.addChild(item);
      }
      return;
    }
    val __len : Int  = (payload).length();
    var wordEnd : Int  = 0;
    while (wordEnd < __len) {
      val chw : Int  = payload.charCodeAt(wordEnd);
      if ( this.isLetter(chw) ) {
        wordEnd = wordEnd + 1;
      } else {
        break;
      }
    }
    if ( wordEnd > 0 ) {
      val label : TokenSlice  = payload.read(wordEnd);
      label.tag = "keyword";
      out.addChild(label);
      var tailStart : Int  = wordEnd;
      while (tailStart < __len) {
        val cht : Int  = payload.charCodeAt(tailStart);
        if ( payload.isWhitespace(cht) ) {
          tailStart = tailStart + 1;
        } else {
          break;
        }
      }
      if ( tailStart < __len ) {
        val tail : TokenSlice  = (payload.peek(tailStart)).read((__len - tailStart));
        this.addKeywordTailChildren(out, tail);
      }
      return;
    }
    val firstNum : Int  = this.findFirstNumberOffset(payload);
    if ( (firstNum > 0) && (firstNum < (payload).length()) ) {
      val numericTail : TokenSlice  = (payload.peek(firstNum)).read(((payload).length() - firstNum));
      this.addChildrenFromParser(out, numericTail);
    }
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    if ( (slice).length() < 1 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 62 ) {
      return this.noMatch();
    }
    val __len : Int  = (slice).length();
    var markerEnd : Int  = 0;
    while (markerEnd < __len) {
      val chm : Int  = slice.charCodeAt(markerEnd);
      if ( chm == 62 ) {
        markerEnd = markerEnd + 1;
      } else {
        break;
      }
    }
    if ( markerEnd == 0 ) {
      return this.noMatch();
    }
    val lineEnd : Int  = slice.findLineEnd(markerEnd);
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    val levelToken : TokenSlice  = slice.read(markerEnd);
    levelToken.tag = "details-level";
    val dlv : DetailsLevelValue  =  DetailsLevelValue();
    dlv.level = markerEnd;
    dlv.marker = (levelToken).toString();
    val payload : SliceParsedValue  = SliceParsedValue.fromDetailsLevel(dlv);
    levelToken.setSliceValue(payload);
    out.addChild(levelToken);
    var contentStart : Int  = markerEnd;
    while (contentStart < lineEnd) {
      val ch2 : Int  = slice.charCodeAt(contentStart);
      if ( (ch2 == 32) || (ch2 == 9) ) {
        contentStart = contentStart + 1;
      } else {
        break;
      }
    }
    if ( contentStart >= lineEnd ) {
      return out;
    }
    val payload_2 : TokenSlice  = (slice.peek(contentStart)).read((lineEnd - contentStart));
    this.addParsedChildren(out, payload_2);
    return out;
  }
}


class NGSharedDetectorFactory 
 {
  @JvmField var sportExerciseChildDetectors : MutableList<TokenDetector>  = arrayListOf();
  companion object {
    private var __singleton_instance : NGSharedDetectorFactory? = null
    fun __singleton() : NGSharedDetectorFactory {
      if (__singleton_instance == null) {
        __singleton_instance = NGSharedDetectorFactory()
      }
      return __singleton_instance!!
    }
  }
  
  open fun  createSportExerciseChildDetectors() : MutableList<TokenDetector> {
    if ( (sportExerciseChildDetectors.size) > 0 ) {
      return sportExerciseChildDetectors;
    }
    var ds : MutableList<TokenDetector>  = arrayListOf();
    ds.add(SpaceDetector.create());
    ds.add(SemicolonSeparatorDetector.create());
    ds.add(NewlineDetector.create());
    ds.add(DateTimeDetector.create());
    ds.add(SpeedDetector.create());
    ds.add(KCALDetector.create());
    ds.add(BPMDetector.create());
    ds.add(WeightDetector.create());
    ds.add(DistanceRangeBlockDetector.create());
    ds.add(PercentageRangeDetector.create());
    ds.add(SetRepRangeLoadDetector.create());
    ds.add(NumRangeBlockDetector.create());
    ds.add(DistanceDetector.create());
    ds.add(PercentageDetector.create());
    ds.add(RMDetector.create());
    ds.add(ZoneDetector.create());
    ds.add(RomanZoneDetector.create());
    ds.add(RecoveryTimeDetector.create());
    ds.add(TimeValueDetector.create());
    ds.add(RecoveryDetector.create());
    ds.add(LeftRightDetector.create());
    ds.add(FeelingDetector.create());
    ds.add(EffortDetector.create());
    ds.add(BodyMetricDetector.create());
    ds.add(CircuitDetector.create());
    ds.add(PhaseDetector.create());
    ds.add(ContextEntryDetector.create());
    ds.add(DecimalNumberDetector.create());
    ds.add(PositiveIntegerDetector.create());
    ds.add(KeywordDetector.create("min"));
    ds.add(KeywordDetector.create("h"));
    ds.add(RepeatBlockDetector.create());
    ds.add(AMTimeValueDetector.create());
    ds.add(DetailsDataDetector.create());
    ds.add(HeadingDataDetector.create());
    sportExerciseChildDetectors = ds;
    return sportExerciseChildDetectors;
  }
}

class SportExerciseDetector( noMatchSlice : TokenSlice, sportNames : MutableList<String>, ds : MutableList<TokenDetector> ) : TokenDetector(noMatchSlice) 
 {
  @JvmField var sports : MutableList<String>  = arrayListOf();
  @JvmField var childDetectors : MutableList<TokenDetector>  = arrayListOf();
  
  init {
    cachedNoMatch = noMatchSlice;
    sports = sportNames;
    childDetectors = ds;
    detectedTag = "exercise";
  }
  companion object {
    
    fun  create() : SportExerciseDetector {
      val shared : NGSharedLists  =  NGSharedLists.__singleton();
      val factory : NGSharedDetectorFactory  =  NGSharedDetectorFactory.__singleton();
      val sportNames : MutableList<String>  = shared.defaultSportNames();
      val ds : MutableList<TokenDetector>  = factory.createSportExerciseChildDetectors();
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  SportExerciseDetector(s, sportNames, ds);
    }
    
    fun  createWithSports( sportNames : MutableList<String>) : SportExerciseDetector {
      val factory : NGSharedDetectorFactory  =  NGSharedDetectorFactory.__singleton();
      val ds : MutableList<TokenDetector>  = factory.createSportExerciseChildDetectors();
      val s : TokenSlice  = TokenDetector.createNoMatchSlice();
      return  SportExerciseDetector(s, sportNames, ds);
    }
  }
  
  open fun  createChildDetectors() : MutableList<TokenDetector> {
    return childDetectors;
  }
  
  open fun  startsWithToken( slice : TokenSlice, token : String) : Boolean {
    val tLen : Int  = token.length;
    if ( tLen > (slice).length() ) {
      return false;
    }
    var i : Int  = 0;
    while (i < tLen) {
      if ( slice.charCodeAt(i) == (token[i].code) ) {
      } else {
        return false;
      }
      i = i + 1;
    }
    return true;
  }
  
  open fun  isUppercaseLetter( ch : Int) : Boolean {
    return (ch >= 65) && (ch <= 90);
  }
  
  open fun  isLetter( ch : Int) : Boolean {
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  }
  
  open fun  isReservedGenericName( name : String) : Boolean {
    val shared : NGSharedLists  =  NGSharedLists.__singleton();
    return shared.isReservedGenericExerciseName(name);
  }
  
  open fun  scanGenericNameEnd( slice : TokenSlice) : Int {
    val __len : Int  = (slice).length();
    if ( __len <= 0 ) {
      return -1;
    }
    if ( false == this.isUppercaseLetter(slice.charCodeAt(0)) ) {
      return -1;
    }
    var pos : Int  = 1;
    while (pos < __len) {
      val ch : Int  = slice.charCodeAt(pos);
      if ( this.isLetter(ch) ) {
        pos = pos + 1;
      } else {
        break;
      }
    }
    var nameEnd : Int  = pos;
    while (pos < __len) {
      /** unused:  val gapStart : Int  = pos   **/ ;
      while (pos < __len) {
        val gapCh : Int  = slice.charCodeAt(pos);
        if ( slice.isWhitespace(gapCh) ) {
          pos = pos + 1;
        } else {
          break;
        }
      }
      if ( pos >= __len ) {
        break;
      }
      if ( false == this.isUppercaseLetter(slice.charCodeAt(pos)) ) {
        break;
      }
      pos = pos + 1;
      while (pos < __len) {
        val ch2 : Int  = slice.charCodeAt(pos);
        if ( this.isLetter(ch2) ) {
          pos = pos + 1;
        } else {
          break;
        }
      }
      nameEnd = pos;
    }
    return nameEnd;
  }
  
  open fun  isSeparator( slice : TokenSlice, index : Int) : Boolean {
    if ( slice.isWhitespaceAt(index) ) {
      return true;
    }
    if ( slice.charCodeAt(index) == 59 ) {
      return true;
    }
    return false;
  }
  
  open fun  trimEnd( slice : TokenSlice, endPos : Int) : Int {
    var out : Int  = endPos;
    while (out > 0) {
      val ch : Int  = slice.charCodeAt(out - 1);
      if ( slice.isWhitespace(ch) ) {
        out = out - 1;
      } else {
        break;
      }
    }
    return out;
  }
  
  override fun  detect( slice : TokenSlice) : TokenSlice {
    val __len : Int  = (slice).length();
    if ( __len <= 0 ) {
      return this.noMatch();
    }
    val lineEnd : Int  = slice.findLineEnd(0);
    if ( lineEnd <= 0 ) {
      return this.noMatch();
    }
    var startPos : Int  = 0;
    while (startPos < lineEnd) {
      val chStart : Int  = slice.charCodeAt(startPos);
      if ( slice.isWhitespace(chStart) ) {
        startPos = startPos + 1;
      } else {
        break;
      }
    }
    if ( startPos >= lineEnd ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(startPos) == 62 ) {
      return this.noMatch();
    }
    var semicolonPos : Int  = -1;
    var p : Int  = 0;
    while (p < lineEnd) {
      if ( slice.charCodeAt(p) == 59 ) {
        semicolonPos = p;
        break;
      }
      p = p + 1;
    }
    val explicitNameMode : Boolean  = semicolonPos >= 0;
    var matched : Boolean  = false;
    if ( explicitNameMode ) {
      matched = true;
    } else {
      for ( i in sports.indices ) {
        val sportName = sports[i]
        val sportLen : Int  = sportName.length;
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
      }
      if ( matched == false ) {
        val genericLen : Int  = this.scanGenericNameEnd(slice);
        if ( genericLen > 1 ) {
          val genericName : String  = (slice.read(genericLen)).toString();
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
    var nameEnd : Int  = lineEnd;
    if ( semicolonPos >= 0 ) {
      nameEnd = semicolonPos;
    }
    nameEnd = this.trimEnd(slice, nameEnd);
    if ( nameEnd <= 0 ) {
      return this.noMatch();
    }
    val nameToken : TokenSlice  = slice.read(nameEnd);
    nameToken.tag = "exercise-name";
    val out : TokenSlice  = slice.read(lineEnd);
    out.tag = detectedTag;
    out.addChild(nameToken);
    if ( semicolonPos >= 0 ) {
      var restStart : Int  = semicolonPos + 1;
      while (restStart < lineEnd) {
        if ( this.isSeparator(slice, restStart) ) {
          restStart = restStart + 1;
        } else {
          break;
        }
      }
      if ( restStart < lineEnd ) {
        val restSlice : TokenSlice  = (slice.peek(restStart)).read((lineEnd - restStart));
        val p_2 : Parser  =  Parser((restSlice).toString(), this.createChildDetectors());
        (p_2).start();
        val children : MutableList<TokenSlice>  = p_2.getResults();
        for ( j in children.indices ) {
          val ch = children[j]
          out.addChild(ch);
        }
      }
    }
    return out;
  }
}



class NGExpectRule 
 {
  @JvmField var testIndex : Int  = -1;
  @JvmField var negated : Boolean  = false;
  @JvmField var kind : String  = "";
  @JvmField var childIndex : Int  = -1;
  @JvmField var field : String  = "";
  @JvmField var value : String  = "";
}

class NGTestCase 
 {
  @JvmField var input : String  = "";
  @JvmField var expects : MutableList<NGExpectRule>  = arrayListOf();
  @JvmField var jsonFile : String  = "";
}

class NGTestSpecParser 
 {
  companion object {
    
    fun  create() : NGTestSpecParser {
      return  NGTestSpecParser();
    }
  }
  
  open fun  isSpace( ch : Int) : Boolean {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  }
  
  open fun  trim( text : String) : String {
    val __len : Int  = text.length;
    if ( __len == 0 ) {
      return "";
    }
    var start : Int  = 0;
    while (start < __len) {
      val ch : Int  = text[start].code;
      if ( this.isSpace(ch) ) {
        start = start + 1;
      } else {
        break;
      }
    }
    var stop : Int  = __len;
    while (stop > start) {
      val ch2 : Int  = text[(stop - 1)].code;
      if ( this.isSpace(ch2) ) {
        stop = stop - 1;
      } else {
        break;
      }
    }
    if ( stop <= start ) {
      return "";
    }
    return text.substring(start, stop );
  }
  
  open fun  startsWith( text : String, prefix : String) : Boolean {
    val tLen : Int  = text.length;
    val pLen : Int  = prefix.length;
    if ( pLen > tLen ) {
      return false;
    }
    return (text.substring(0, pLen )) == prefix;
  }
  
  open fun  endsWith( text : String, suffix : String) : Boolean {
    val tLen : Int  = text.length;
    val sLen : Int  = suffix.length;
    if ( sLen > tLen ) {
      return false;
    }
    return (text.substring((tLen - sLen), tLen )) == suffix;
  }
  
  open fun  normalizeNumericText( text : String) : String {
    if ( (this).endsWith(text, ".0") ) {
      return text.substring(0, ((text.length) - 2) );
    }
    return text;
  }
  
  open fun  isCommentLine( line : String) : Boolean {
    return (this).startsWith(line, "//");
  }
  
  open fun  findSpace( text : String) : Int {
    val __len : Int  = text.length;
    var i : Int  = 0;
    while (i < __len) {
      val ch : Int  = text[i].code;
      if ( ch == 32 ) {
        return i;
      }
      i = i + 1;
    }
    return -1;
  }
  
  open fun  decodeEscapes( text : String) : String {
    val __len : Int  = text.length;
    if ( __len == 0 ) {
      return "";
    }
    var out : String  = "";
    var i : Int  = 0;
    while (i < __len) {
      val ch : Int  = text[i].code;
      if ( (ch == 92) && ((i + 1) < __len) ) {
        val next : Int  = text[(i + 1)].code;
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
    }
    return out;
  }
  
  open fun  parseExpect( line : String) : NGExpectRule {
    val out : NGExpectRule  =  NGExpectRule();
    val payload : String  = (this).trim(line);
    if ( (payload.length) == 0 ) {
      return out;
    }
    var body : String  = payload;
    val idxSep : Int  = this.findSpace(payload);
    if ( idxSep > 0 ) {
      val idxText : String  = payload.substring(0, idxSep );
      val idxSlice : TokenSlice  = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() > 0 ) {
        if ( idxSlice.hasInteger(0, (idxSlice).length() - 1) ) {
          out.testIndex = idxSlice.parseInteger(0, (idxSlice).length() - 1);
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
      val rest : String  = (this).trim((body.substring(6, (body.length) )));
      val childIdxSep : Int  = this.findSpace(rest);
      if ( childIdxSep < 0 ) {
        return out;
      }
      val childIdxText : String  = rest.substring(0, childIdxSep );
      val childIdxSlice : TokenSlice  = TokenSlice.fromText(childIdxText);
      if ( (childIdxSlice).length() == 0 ) {
        return out;
      }
      if ( childIdxSlice.hasInteger(0, (childIdxSlice).length() - 1) ) {
      } else {
        return out;
      }
      out.childIndex = childIdxSlice.parseInteger(0, (childIdxSlice).length() - 1);
      val afterIdx : String  = (this).trim((rest.substring((childIdxSep + 1), (rest.length) )));
      val fieldSep : Int  = this.findSpace(afterIdx);
      if ( fieldSep < 0 ) {
        return out;
      }
      out.kind = "child";
      out.field = afterIdx.substring(0, fieldSep );
      out.value = this.decodeEscapes((this).trim((afterIdx.substring((fieldSep + 1), (afterIdx.length) ))));
      return out;
    }
    if ( (this).startsWith(body, "json ") ) {
      val restJson : String  = (this).trim((body.substring(5, (body.length) )));
      val pathSep : Int  = this.findSpace(restJson);
      if ( pathSep < 0 ) {
        return out;
      }
      out.kind = "json";
      out.field = (this).trim((restJson.substring(0, pathSep )));
      out.value = this.decodeEscapes((this).trim((restJson.substring((pathSep + 1), (restJson.length) ))));
      return out;
    }
    return out;
  }
  
  open fun  resolveTargetIndex( blockStart : Int, caseCount : Int, idx : Int) : Int {
    if ( idx >= 0 ) {
      return blockStart + idx;
    }
    return caseCount - 1;
  }
  
  open fun  parseJsonFile( line : String, cases : MutableList<NGTestCase>, blockStart : Int) : Unit {
    val payload : String  = (this).trim(line);
    if ( (payload.length) == 0 ) {
      return;
    }
    if ( (this).startsWith(payload, "all ") ) {
      val allFileName : String  = this.decodeEscapes((this).trim((payload.substring(4, (payload.length) ))));
      if ( (allFileName.length) == 0 ) {
        return;
      }
      var from : Int  = blockStart;
      val to : Int  = cases.size;
      while (from < to) {
        val tcAll : NGTestCase  = cases[from];
        tcAll.jsonFile = allFileName;
        from = from + 1;
      }
      return;
    }
    var target : Int  = -1;
    var fileName : String  = payload;
    val idxSep : Int  = this.findSpace(payload);
    if ( idxSep > 0 ) {
      val idxText : String  = payload.substring(0, idxSep );
      val idxSlice : TokenSlice  = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() > 0 ) {
        if ( idxSlice.hasInteger(0, (idxSlice).length() - 1) ) {
          val idxValue : Int  = idxSlice.parseInteger(0, (idxSlice).length() - 1);
          target = this.resolveTargetIndex(blockStart, cases.size, idxValue);
          fileName = (this).trim((payload.substring((idxSep + 1), (payload.length) )));
        }
      }
    }
    if ( target < 0 ) {
      target = this.resolveTargetIndex(blockStart, cases.size, -1);
    }
    if ( (fileName.length) == 0 ) {
      return;
    }
    if ( (target >= 0) && (target < (cases.size)) ) {
      val tc : NGTestCase  = cases[target];
      tc.jsonFile = this.decodeEscapes(fileName);
    }
  }
  
  open fun  parse( specText : String) : MutableList<NGTestCase> {
    var cases : MutableList<NGTestCase>  = arrayListOf();
    var blockStart : Int  = 0;
    var prevKind : String  = "none";
    val __len : Int  = specText.length;
    var lineStart : Int  = 0;
    var i : Int  = 0;
    while (i <= __len) {
      if ( i == __len ) {
      } else {
        val ch : Int  = specText[i].code;
        if ( (ch == 10) || (ch == 13) ) {
        } else {
          i = i + 1;
          continue;
        }
      }
      val raw : String  = specText.substring(lineStart, i );
      val line : String  = (this).trim(raw);
      if ( (line.length) > 0 ) {
        if ( this.isCommentLine(line) ) {
        } else {
          if ( (this).startsWith(line, "Test ") ) {
            if ( prevKind != "test" ) {
              blockStart = cases.size;
            }
            val tc : NGTestCase  =  NGTestCase();
            tc.input = this.decodeEscapes((this).trim((line.substring(5, (line.length) ))));
            cases.add(tc);
            prevKind = "test";
          } else {
            if ( (this).startsWith(line, "Expect ") ) {
              val ex : NGExpectRule  = this.parseExpect(line.substring(7, (line.length) ));
              if ( (ex.kind.length) > 0 ) {
                val target : Int  = this.resolveTargetIndex(blockStart, cases.size, ex.testIndex);
                if ( (target >= 0) && (target < (cases.size)) ) {
                  val tc2 : NGTestCase  = cases[target];
                  tc2.expects.add(ex);
                }
              }
              prevKind = "expect";
            } else {
              if ( (this).startsWith(line, "JSON ") ) {
                this.parseJsonFile(
                line.substring(5, line.length )
                , cases, blockStart);
                prevKind = "json";
              }
            }
          }
        }
      }
      if ( i == __len ) {
        break;
      }
      val firstNl : Int  = specText[i].code;
      if ( (firstNl == 13) && ((i + 1) < __len) ) {
        if ( (specText[(i + 1)].code) == 10 ) {
          i = i + 1;
        }
      }
      i = i + 1;
      lineStart = i;
    }
    return cases;
  }
}


class NGTestRunner 
 {
  companion object {
    
    fun  create() : NGTestRunner {
      return  NGTestRunner();
    }
  }
  
  open fun  isSpace( ch : Int) : Boolean {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  }
  
  open fun  trim( text : String) : String {
    val __len : Int  = text.length;
    if ( __len == 0 ) {
      return "";
    }
    var start : Int  = 0;
    while (start < __len) {
      val ch : Int  = text[start].code;
      if ( this.isSpace(ch) ) {
        start = start + 1;
      } else {
        break;
      }
    }
    var stop : Int  = __len;
    while (stop > start) {
      val ch2 : Int  = text[(stop - 1)].code;
      if ( this.isSpace(ch2) ) {
        stop = stop - 1;
      } else {
        break;
      }
    }
    if ( stop <= start ) {
      return "";
    }
    return text.substring(start, stop );
  }
  
  open fun  startsWith( text : String, prefix : String) : Boolean {
    val tLen : Int  = text.length;
    val pLen : Int  = prefix.length;
    if ( pLen > tLen ) {
      return false;
    }
    return (text.substring(0, pLen )) == prefix;
  }
  
  open fun  endsWithText( text : String, suffix : String) : Boolean {
    val tLen : Int  = text.length;
    val sLen : Int  = suffix.length;
    if ( sLen > tLen ) {
      return false;
    }
    return (text.substring((tLen - sLen), tLen )) == suffix;
  }
  
  open fun  normalizeJsonNumericText( text : String) : String {
    var out : String  = (this).trim(text);
    while (this.endsWithText(out, ".0")) {
      out = out.substring(0, ((out.length) - 2) );
    }
    return out;
  }
  
  open fun  createDetectors() : MutableList<TokenDetector> {
    return StandardDetectors.create();
  }
  
  open fun  escapeJson( text : String) : String {
    val __len : Int  = text.length;
    if ( __len == 0 ) {
      return "";
    }
    var out : String  = "";
    var i : Int  = 0;
    while (i < __len) {
      val ch : Int  = text[i].code;
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
    }
    return out;
  }
  
  open fun  indent( level : Int) : String {
    var out : String  = "";
    var i : Int  = 0;
    while (i < level) {
      out = out + "  ";
      i = i + 1;
    }
    return out;
  }
  
  open fun  jsonKVString( key : String, value : String) : String {
    return ((("\"" + key) + "\":\"") + this.escapeJson(value)) + "\"";
  }
  
  open fun  jsonKVNumber( key : String, value : String) : String {
    return (("\"" + key) + "\":") + value;
  }
  
  open fun  jsonObject( level : Int, fields : MutableList<String>) : String {
    val pad : String  = this.indent(level);
    val childPad : String  = this.indent(level + 1);
    var out : String  = "{\n";
    val cnt : Int  = fields.size;
    var i : Int  = 0;
    while (i < cnt) {
      out = (out + childPad) + (fields[i]);
      if ( (i + 1) < cnt ) {
        out = out + ",";
      }
      out = out + "\n";
      i = i + 1;
    }
    out = (out + pad) + "}";
    return out;
  }
  
  open fun  parsedValueToJson( token : TokenSlice, level : Int) : String {
    if ( token.hasSliceValue() ) {
    } else {
      return "null";
    }
    val kind : String  = token.getSliceValueKind();
    if ( kind == "datetime" ) {
      return (token.getAsDateTimeValue()).toDictionary().toString();
    }
    if ( kind == "distance" ) {
      return (token.getAsDistanceValue()).toDictionary().toString();
    }
    if ( kind == "percentage" ) {
      return (token.getAsPercentageValue()).toDictionary().toString();
    }
    if ( kind == "recovery-time" ) {
      return (token.getAsRecoveryTimeValue()).toDictionary().toString();
    }
    if ( kind == "time-value" ) {
      return (token.getAsTimeValueValue()).toDictionary().toString();
    }
    if ( kind == "weight" ) {
      return (token.getAsWeightValue()).toDictionary().toString();
    }
    if ( kind == "num-range" ) {
      return (token.getAsNumRangeValue()).toDictionary().toString();
    }
    if ( kind == "percentage-range" ) {
      return (token.getAsPercentageRangeValue()).toDictionary().toString();
    }
    if ( kind == "repeat-block" ) {
      return (token.getAsRepeatBlockValue()).toDictionary().toString();
    }
    if ( kind == "set-rep-range-load" ) {
      return (token.getAsSetRepRangeLoadValue()).toDictionary().toString();
    }
    if ( kind == "zone" ) {
      return (token.getAsZoneValue()).toDictionary().toString();
    }
    if ( kind == "positive-integer" ) {
      return (token.getAsPositiveIntegerValue()).toDictionary().toString();
    }
    if ( kind == "details-level" ) {
      return (token.getAsDetailsLevelValue()).toDictionary().toString();
    }
    if ( kind == "recovery" ) {
      return (token.getAsRecoveryValue()).toDictionary().toString();
    }
    if ( kind == "left-right" ) {
      return (token.getAsLeftRightValue()).toDictionary().toString();
    }
    if ( kind == "feeling" ) {
      return (token.getAsFeelingValue()).toDictionary().toString();
    }
    if ( kind == "effort" ) {
      return (token.getAsEffortValue()).toDictionary().toString();
    }
    if ( kind == "body-metric" ) {
      return (token.getAsBodyMetricValue()).toDictionary().toString();
    }
    if ( kind == "circuit" ) {
      return (token.getAsCircuitValue()).toDictionary().toString();
    }
    if ( kind == "context-entry" ) {
      return (token.getAsContextEntryValue()).toDictionary().toString();
    }
    return ("{\"kind\":\"" + this.escapeJson(kind)) + "\"}";
  }
  
  open fun  tokenToJson( token : TokenSlice, level : Int) : String {
    val pad : String  = this.indent(level);
    val childPad : String  = this.indent(level + 1);
    var out : String  = pad + "{\n";
    out = out + (childPad + (("\"tag\":\"" + this.escapeJson(token.tag)) + "\",\n"));
    out = out + (childPad + (("\"text\":\"" + this.escapeJson((token).toString())) + "\",\n"));
    out = out + (((childPad + "\"parsed\":") + this.parsedValueToJson(token, (level + 1))) + ",\n");
    out = out + (childPad + "\"children\":[");
    val cc : Int  = token.childCount();
    var i : Int  = 0;
    if ( cc > 0 ) {
      out = out + "\n";
      while (i < cc) {
        if ( i > 0 ) {
          out = out + ",\n";
        }
        val ch : TokenSlice  = token.getChild(i);
        out = out + this.tokenToJson(ch, (level + 2));
        i = i + 1;
      }
      out = out + "\n";
      out = out + childPad;
    }
    out = out + "]\n";
    out = out + (pad + "}");
    return out;
  }
  
  open fun  findDot( text : String) : Int {
    val __len : Int  = text.length;
    var i : Int  = 0;
    while (i < __len) {
      if ( (text[i].code) == 46 ) {
        return i;
      }
      i = i + 1;
    }
    return -1;
  }
  
  open fun  normalizeJsonPath( path : String) : String {
    val raw : String  = (this).trim(path);
    if ( (raw.length) == 0 ) {
      return "";
    }
    var out : String  = "";
    val __len : Int  = raw.length;
    var i : Int  = 0;
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
      val ch : Int  = raw[i].code;
      if ( ch == 91 ) {
        i = i + 1;
        if ( (out.length) > 0 ) {
          out = out + ".";
        }
        while (i < __len) {
          val ch2 : Int  = raw[i].code;
          if ( ch2 == 93 ) {
            i = i + 1;
            break;
          }
          out = out + (raw.substring(i, (i + 1) ));
          i = i + 1;
        }
        continue;
      }
      out = out + (raw.substring(i, (i + 1) ));
      i = i + 1;
    }
    if ( (this).startsWith(out, ".") ) {
      out = out.substring(1, (out.length) );
    }
    return out;
  }
  
  open fun  jsonTokenValue( token : TokenSlice, path : String) : String {
    val p : String  = this.normalizeJsonPath(path);
    if ( (p.length) == 0 ) {
      return "";
    }
    val dotPos : Int  = this.findDot(p);
    var head : String  = p;
    var tail : String  = "";
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
      val dotPos2 : Int  = this.findDot(tail);
      var idxText : String  = tail;
      var rest : String  = "";
      if ( dotPos2 >= 0 ) {
        idxText = tail.substring(0, dotPos2 );
        rest = tail.substring((dotPos2 + 1), (tail.length) );
      }
      val idxSlice : TokenSlice  = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() == 0 ) {
        return "";
      }
      if ( idxSlice.hasInteger(0, (idxSlice).length() - 1) ) {
      } else {
        return "";
      }
      val childIdx : Int  = idxSlice.parseInteger(0, (idxSlice).length() - 1);
      if ( (childIdx < 0) || (childIdx >= token.childCount()) ) {
        return "";
      }
      val ch : TokenSlice  = token.getChild(childIdx);
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
      val kind : String  = token.getSliceValueKind();
      if ( tail == "kind" ) {
        return kind;
      }
      if ( kind == "recovery-time" ) {
        val rv : RecoveryTimeValue  = token.getAsRecoveryTimeValue();
        if ( tail == "value" ) {
          return "" + rv.value.toString();
        }
        if ( tail == "unit" ) {
          return rv.unit;
        }
      }
      if ( kind == "time-value" ) {
        val tv : TimeValueValue  = token.getAsTimeValueValue();
        if ( tail == "minutes" ) {
          return "" + tv.minutes.toString();
        }
        if ( tail == "seconds" ) {
          return "" + tv.seconds.toString();
        }
      }
      if ( kind == "datetime" ) {
        val dtv : DateTimeValue  = token.getAsDateTimeValue();
        if ( tail == "year" ) {
          return "" + dtv.year.toString();
        }
        if ( tail == "month" ) {
          return "" + dtv.month.toString();
        }
        if ( tail == "day" ) {
          return "" + dtv.day.toString();
        }
        if ( tail == "hour" ) {
          return "" + dtv.hour.toString();
        }
        if ( tail == "minute" ) {
          return "" + dtv.minute.toString();
        }
        if ( tail == "second" ) {
          return "" + dtv.second.toString();
        }
        if ( tail == "timezone" ) {
          if ( dtv.timezone != null ) {
            return dtv.timezone!!;
          }
          return "";
        }
      }
      if ( kind == "distance" ) {
        val dv : DistanceValue  = token.getAsDistanceValue();
        if ( tail == "value" ) {
          return "" + dv.value.toString();
        }
        if ( tail == "unit" ) {
          return dv.unit;
        }
      }
      if ( kind == "weight" ) {
        val wv : WeightValue  = token.getAsWeightValue();
        if ( tail == "value" ) {
          return "" + wv.value.toString();
        }
        if ( tail == "unit" ) {
          return wv.unit;
        }
      }
      if ( kind == "percentage" ) {
        val pv : PercentageValue  = token.getAsPercentageValue();
        if ( tail == "value" ) {
          return "" + pv.value.toString();
        }
      }
      if ( kind == "num-range" ) {
        val nr : NumRangeValue  = token.getAsNumRangeValue();
        if ( tail == "minValue" ) {
          return "" + nr.minValue.toString();
        }
        if ( tail == "maxValue" ) {
          return "" + nr.maxValue.toString();
        }
      }
      if ( kind == "percentage-range" ) {
        val pr : PercentageRangeValue  = token.getAsPercentageRangeValue();
        if ( tail == "minValue" ) {
          return "" + pr.minValue.toString();
        }
        if ( tail == "maxValue" ) {
          return "" + pr.maxValue.toString();
        }
      }
      if ( kind == "zone" ) {
        val zv : ZoneValue  = token.getAsZoneValue();
        if ( tail == "zone" ) {
          return "" + zv.zone.toString();
        }
      }
      if ( kind == "repeat-block" ) {
        val rb : RepeatBlockValue  = token.getAsRepeatBlockValue();
        if ( tail == "count" ) {
          return "" + rb.count.toString();
        }
      }
      if ( kind == "left-right" ) {
        val lr : LeftRightValue  = token.getAsLeftRightValue();
        if ( tail == "side" ) {
          return lr.side;
        }
      }
      if ( kind == "set-rep-range-load" ) {
        val sr : SetRepRangeLoadValue  = token.getAsSetRepRangeLoadValue();
        if ( tail == "count" ) {
          return "" + sr.count.toString();
        }
        if ( tail == "setsMin" ) {
          return "" + sr.setsMin.toString();
        }
        if ( tail == "setsMax" ) {
          return "" + sr.setsMax.toString();
        }
        if ( tail == "repsMin" ) {
          return "" + sr.repsMin.toString();
        }
        if ( tail == "repsMax" ) {
          return "" + sr.repsMax.toString();
        }
        if ( tail == "mode" ) {
          return sr.mode;
        }
        if ( tail == "load" ) {
          return "" + sr.load.toString();
        }
        if ( tail == "unit" ) {
          return sr.unit;
        }
      }
      if ( kind == "feeling" ) {
        val fv : FeelingValue  = token.getAsFeelingValue();
        if ( (tail == "type") || (tail == "subKind") ) {
          return fv.kind;
        }
        if ( tail == "score" ) {
          return "" + fv.score.toString();
        }
      }
      if ( kind == "effort" ) {
        val ev : EffortValue  = token.getAsEffortValue();
        if ( (tail == "type") || (tail == "subKind") ) {
          return ev.kind;
        }
        if ( tail == "score" ) {
          return "" + ev.score.toString();
        }
      }
      if ( kind == "body-metric" ) {
        val bm : BodyMetricValue  = token.getAsBodyMetricValue();
        if ( tail == "metric" ) {
          return bm.metric;
        }
        if ( tail == "primaryValue" ) {
          return "" + bm.primaryValue.toString();
        }
        if ( tail == "secondaryValue" ) {
          return "" + bm.secondaryValue.toString();
        }
        if ( tail == "unit" ) {
          return bm.unit;
        }
      }
      if ( kind == "circuit" ) {
        val cv : CircuitValue  = token.getAsCircuitValue();
        if ( tail == "rounds" ) {
          return "" + cv.rounds.toString();
        }
        if ( tail == "restValue" ) {
          return "" + cv.restValue.toString();
        }
        if ( tail == "restUnit" ) {
          return cv.restUnit;
        }
      }
      if ( kind == "details-level" ) {
        val dl : DetailsLevelValue  = token.getAsDetailsLevelValue();
        if ( tail == "level" ) {
          return "" + dl.level.toString();
        }
        if ( tail == "marker" ) {
          return dl.marker;
        }
      }
      if ( kind == "recovery" ) {
        val rv2 : RecoveryValue  = token.getAsRecoveryValue();
        if ( tail == "label" ) {
          return rv2.label;
        }
      }
      if ( kind == "context-entry" ) {
        val ce : ContextEntryValue  = token.getAsContextEntryValue();
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
          return "" + ce.numericValue.toString();
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
          return "" + ce.numericValue.toString();
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
          return "" + ce.confidence.toString();
        }
        if ( tail == "hasGoodness" ) {
          if ( ce.hasGoodness ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "goodness" ) {
          return "" + ce.goodness.toString();
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
          return "" + ce.confidence.toString();
        }
        if ( tail == "hasDerivedGoodness" ) {
          if ( ce.hasGoodness ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "derivedGoodness" ) {
          return "" + ce.goodness.toString();
        }
      }
      if ( kind == "positive-integer" ) {
        val piv : PositiveIntegerValue  = token.getAsPositiveIntegerValue();
        if ( tail == "value" ) {
          return "" + piv.value.toString();
        }
      }
      if ( (tail == "type") || (tail == "subKind") ) {
        return kind;
      }
      return "";
    }
    return "";
  }
  
  open fun  runSpec( specText : String) : MutableList<String> {
    var out : MutableList<String>  = arrayListOf();
    val parser : NGTestSpecParser  = NGTestSpecParser.create();
    val cases : MutableList<NGTestCase>  = parser.parse(specText);
    for ( i in cases.indices ) {
      val tc = cases[i]
      val p : Parser  =  Parser(tc.input, this.createDetectors());
      (p).start();
      if ( p.getCount() == 0 ) {
        out.add(((("Test " + ("#" + ("" + (i + 1).toString()))) + " failed: no tokens for input '") + tc.input) + "'");
        continue;
      }
      val results : MutableList<TokenSlice>  = p.getResults();
      val root : TokenSlice  = results[0];
      for ( j in tc.expects.indices ) {
        val ex = tc.expects[j]
        if ( ex.kind == "tag" ) {
          val tagMatches : Boolean  = root.tag == ex.value;
          if ( ex.negated ) {
            if ( tagMatches ) {
              val msgNotTag : String  = (("Test " + ("#" + ("" + (i + 1).toString()))) + " expect not tag '") + ex.value;
              out.add(msgNotTag + "' but it matched");
            }
          } else {
            if ( tagMatches ) {
            } else {
              val msgTag : String  = (("Test " + ("#" + ("" + (i + 1).toString()))) + " expect tag '") + ex.value;
              out.add(((msgTag + "' but got '") + root.tag) + "'");
            }
          }
          continue;
        }
        if ( ex.kind == "child" ) {
          if ( (ex.childIndex < 0) || (ex.childIndex >= root.childCount()) ) {
            out.add(((("Test " + ("#" + ("" + (i + 1).toString()))) + " expect child index out of range: ") + ("" + ex.childIndex.toString())) + ((" childCount=" + ("" + root.childCount().toString())) + ""));
            continue;
          }
          val ch : TokenSlice  = root.getChild(ex.childIndex);
          if ( ex.field == "string" ) {
            val got : String  = (ch).toString();
            val strMatches : Boolean  = got == ex.value;
            if ( ex.negated ) {
              if ( strMatches ) {
                val msgNotStr : String  = (((("Test " + ("#" + ("" + (i + 1).toString()))) + " expect child ") + ("" + ex.childIndex.toString())) + " not string '") + ex.value;
                out.add(msgNotStr + "' but it matched");
              }
            } else {
              if ( strMatches ) {
              } else {
                val msgStr : String  = (((("Test " + ("#" + ("" + (i + 1).toString()))) + " expect child ") + ("" + ex.childIndex.toString())) + " string '") + ex.value;
                out.add(((msgStr + "' but got '") + got) + "'");
              }
            }
            continue;
          }
          if ( ex.field == "tag" ) {
            val gotTag : String  = ch.tag;
            val tagMatches_1 : Boolean  = gotTag == ex.value;
            if ( ex.negated ) {
              if ( tagMatches_1 ) {
                val msgNotTag_1 : String  = (((("Test " + ("#" + ("" + (i + 1).toString()))) + " expect child ") + ("" + ex.childIndex.toString())) + " not tag '") + ex.value;
                out.add(msgNotTag_1 + "' but it matched");
              }
            } else {
              if ( tagMatches_1 ) {
              } else {
                val msgTag_1 : String  = (((("Test " + ("#" + ("" + (i + 1).toString()))) + " expect child ") + ("" + ex.childIndex.toString())) + " tag '") + ex.value;
                out.add(((msgTag_1 + "' but got '") + gotTag) + "'");
              }
            }
            continue;
          }
          out.add(((("Test " + ("#" + ("" + (i + 1).toString()))) + " unsupported field '") + ex.field) + "' in Expect child");
          continue;
        }
        if ( ex.kind == "json" ) {
          val gotJson : String  = this.jsonTokenValue(root, ex.field);
          if ( (gotJson.length) == 0 ) {
            if ( ex.negated ) {
              continue;
            }
            out.add(((("Test " + ("#" + ("" + (i + 1).toString()))) + " expect json path '") + ex.field) + "' was not found");
            continue;
          }
          val gotNorm : String  = this.normalizeJsonNumericText(gotJson);
          val expNorm : String  = this.normalizeJsonNumericText(ex.value);
          val jsonMatches : Boolean  = (gotJson == ex.value) || (gotNorm == expNorm);
          if ( ex.negated ) {
            if ( jsonMatches ) {
              val msgNotJson : String  = ((("Test " + ("#" + ("" + (i + 1).toString()))) + " expect json path '") + ex.field) + "' not to be '";
              out.add((msgNotJson + ex.value) + "' but it matched");
            }
          } else {
            if ( jsonMatches ) {
            } else {
              val msgJson : String  = ((("Test " + ("#" + ("" + (i + 1).toString()))) + " expect json path '") + ex.field) + "' value '";
              out.add((((msgJson + ex.value) + "' but got '") + gotJson) + "'");
            }
          }
          continue;
        }
      }
    }
    return out;
  }
  
  open fun  exportJson( specText : String) : MutableList<String> {
    var out : MutableList<String>  = arrayListOf();
    val parser : NGTestSpecParser  = NGTestSpecParser.create();
    val cases : MutableList<NGTestCase>  = parser.parse(specText);
    var files : MutableList<String>  = arrayListOf();
    var payloads : MutableList<String>  = arrayListOf();
    var counts : MutableList<Int>  = arrayListOf();
    for ( i in cases.indices ) {
      val tc = cases[i]
      if ( (tc.jsonFile.length) == 0 ) {
        continue;
      }
      val p : Parser  =  Parser(tc.input, this.createDetectors());
      (p).start();
      if ( p.getCount() == 0 ) {
        continue;
      }
      val results : MutableList<TokenSlice>  = p.getResults();
      val root : TokenSlice  = results[0];
      val json : String  = this.tokenToJson(root, 0);
      var fileIdx : Int  = -1;
      var search : Int  = 0;
      while (search < (files.size)) {
        if ( (files[search]) == tc.jsonFile ) {
          fileIdx = search;
          break;
        }
        search = search + 1;
      }
      if ( fileIdx < 0 ) {
        files.add(tc.jsonFile);
        payloads.add(json);
        counts.add(1);
      } else {
        val prevPayload : String  = payloads[fileIdx];
        val nextPayload : String  = (prevPayload + ",\n") + json;
        payloads.set(fileIdx, nextPayload)
        val prevCount : Int  = counts[fileIdx];
        counts.set(fileIdx, prevCount + 1)
      }
    }
    var j : Int  = 0;
    while (j < (files.size)) {
      val fileName : String  = files[j];
      var payload : String  = payloads[j];
      val cnt : Int  = counts[j];
      if ( cnt > 1 ) {
        payload = ("[\n" + payload) + "\n]";
      }
      out.add((fileName + "\t") + payload);
      j = j + 1;
    }
    return out;
  }
}


class TokenDetectorModule 
 {
  companion object {
    
    fun  createKeyword( token : String) : KeywordDetector {
      return KeywordDetector.create(token);
    }
    
    fun  createDateTime() : DateTimeDetector {
      return DateTimeDetector.create();
    }
    
    fun  createSpace() : SpaceDetector {
      return SpaceDetector.create();
    }
    
    fun  createNewline() : NewlineDetector {
      return NewlineDetector.create();
    }
    
    fun  createPositiveInteger() : PositiveIntegerDetector {
      return PositiveIntegerDetector.create();
    }
    
    fun  createDecimalNumber() : DecimalNumberDetector {
      return DecimalNumberDetector.create();
    }
    
    fun  createTimeValue() : TimeValueDetector {
      return TimeValueDetector.create();
    }
    
    fun  createRecoveryTime() : RecoveryTimeDetector {
      return RecoveryTimeDetector.create();
    }
    
    fun  createRecovery() : RecoveryDetector {
      return RecoveryDetector.create();
    }
    
    fun  createLeftRight() : LeftRightDetector {
      return LeftRightDetector.create();
    }
    
    fun  createFeeling() : FeelingDetector {
      return FeelingDetector.create();
    }
    
    fun  createEffort() : EffortDetector {
      return EffortDetector.create();
    }
    
    fun  createBodyMetric() : BodyMetricDetector {
      return BodyMetricDetector.create();
    }
    
    fun  createCircuit() : CircuitDetector {
      return CircuitDetector.create();
    }
    
    fun  createContextEntry() : ContextEntryDetector {
      return ContextEntryDetector.create();
    }
    
    fun  createSpeed() : SpeedDetector {
      return SpeedDetector.create();
    }
    
    fun  createRepeatBlock() : RepeatBlockDetector {
      return RepeatBlockDetector.create();
    }
    
    fun  createWeight() : WeightDetector {
      return WeightDetector.create();
    }
    
    fun  createDistance() : DistanceDetector {
      return DistanceDetector.create();
    }
    
    fun  createNumRangeBlock() : NumRangeBlockDetector {
      return NumRangeBlockDetector.create();
    }
    
    fun  createDistanceRangeBlock() : DistanceRangeBlockDetector {
      return DistanceRangeBlockDetector.create();
    }
    
    fun  createAMTimeValue() : AMTimeValueDetector {
      return AMTimeValueDetector.create();
    }
    
    fun  defaultSportNames() : MutableList<String> {
      val shared : NGSharedLists  =  NGSharedLists.__singleton();
      return shared.defaultSportNames();
    }
    
    fun  createSportExercise() : SportExerciseDetector {
      return SportExerciseDetector.create();
    }
    
    fun  createDetailsData() : DetailsDataDetector {
      return DetailsDataDetector.create();
    }
    
    fun  createHeadingData() : HeadingDataDetector {
      return HeadingDataDetector.create();
    }
    
    fun  createBPM() : BPMDetector {
      return BPMDetector.create();
    }
    
    fun  createKCAL() : KCALDetector {
      return KCALDetector.create();
    }
    
    fun  createPercentage() : PercentageDetector {
      return PercentageDetector.create();
    }
    
    fun  createPercentageRange() : PercentageRangeDetector {
      return PercentageRangeDetector.create();
    }
    
    fun  createRM() : RMDetector {
      return RMDetector.create();
    }
    
    fun  createSetRepRangeLoad() : SetRepRangeLoadDetector {
      return SetRepRangeLoadDetector.create();
    }
    
    fun  createZone() : ZoneDetector {
      return ZoneDetector.create();
    }
    
    fun  createRomanZone() : RomanZoneDetector {
      return RomanZoneDetector.create();
    }
    
    fun  createStandardDetectors() : MutableList<TokenDetector> {
      return StandardDetectors.create();
    }
    
    fun  createNGTestRunner() : NGTestRunner {
      return NGTestRunner.create();
    }
    
    fun  createNGTestSpecParser() : NGTestSpecParser {
      return NGTestSpecParser.create();
    }
  }
}






































typealias JSONObject = org.json.JSONObject
typealias JSONArray = org.json.JSONArray
typealias JSONDataObject = org.json.JSONObject
typealias JSONArrayObject = org.json.JSONArray

