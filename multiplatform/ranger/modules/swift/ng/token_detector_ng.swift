import Foundation
func ==(l: DateTimeValue, r: DateTimeValue) -> Bool {
  return l === r
}
class DateTimeValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "datetime"
  var year : Int = 0
  var month : Int = 0
  var day : Int = 0
  var hasTime : Bool = false
  var hour : Int = 0
  var minute : Int = 0
  var second : Int = 0
  var timezone : String?
  class func fromDictionary(dict : [String:Any]) -> DateTimeValue {
    let obj : DateTimeValue = DateTimeValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["year"] as? Int 
      if ( v_1 != nil  ) {
        obj.year = v_1!;
      }
      let v_2 : Int? = dict["month"] as? Int 
      if ( v_2 != nil  ) {
        obj.month = v_2!;
      }
      let v_3 : Int? = dict["day"] as? Int 
      if ( v_3 != nil  ) {
        obj.day = v_3!;
      }
      let v_4 : Bool? = dict["hasTime"] as? Bool 
      if ( v_4 != nil  ) {
        obj.hasTime = v_4!;
      }
      let v_5 : Int? = dict["hour"] as? Int 
      if ( v_5 != nil  ) {
        obj.hour = v_5!;
      }
      let v_6 : Int? = dict["minute"] as? Int 
      if ( v_6 != nil  ) {
        obj.minute = v_6!;
      }
      let v_7 : Int? = dict["second"] as? Int 
      if ( v_7 != nil  ) {
        obj.second = v_7!;
      }
      let v_8 : String? = dict["timezone"] as? String 
      if ( v_8 != nil  ) {
        obj.timezone = v_8!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["year"] = self.year
      res["month"] = self.month
      res["day"] = self.day
      res["hasTime"] = self.hasTime
      res["hour"] = self.hour
      res["minute"] = self.minute
      res["second"] = self.second
      if ( self.timezone != nil  ) {
        res["timezone"] = self.timezone!
      }
    } catch { 
    }
    return res;
  }
}
func ==(l: DistanceValue, r: DistanceValue) -> Bool {
  return l === r
}
class DistanceValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "distance"
  var value : Int = 0
  var unit : String = "m"
  class func fromDictionary(dict : [String:Any]) -> DistanceValue {
    let obj : DistanceValue = DistanceValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["value"] as? Int 
      if ( v_1 != nil  ) {
        obj.value = v_1!;
      }
      let v_2 : String? = dict["unit"] as? String 
      if ( v_2 != nil  ) {
        obj.unit = v_2!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["value"] = self.value
      res["unit"] = self.unit
    } catch { 
    }
    return res;
  }
}
func ==(l: PercentageValue, r: PercentageValue) -> Bool {
  return l === r
}
class PercentageValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "percentage"
  var value : Int = 0
  class func fromDictionary(dict : [String:Any]) -> PercentageValue {
    let obj : PercentageValue = PercentageValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["value"] as? Int 
      if ( v_1 != nil  ) {
        obj.value = v_1!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["value"] = self.value
    } catch { 
    }
    return res;
  }
}
func ==(l: RecoveryTimeValue, r: RecoveryTimeValue) -> Bool {
  return l === r
}
class RecoveryTimeValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "recovery-time"
  var value : Int = 0
  var unit : String = ""
  class func fromDictionary(dict : [String:Any]) -> RecoveryTimeValue {
    let obj : RecoveryTimeValue = RecoveryTimeValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["value"] as? Int 
      if ( v_1 != nil  ) {
        obj.value = v_1!;
      }
      let v_2 : String? = dict["unit"] as? String 
      if ( v_2 != nil  ) {
        obj.unit = v_2!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["value"] = self.value
      res["unit"] = self.unit
    } catch { 
    }
    return res;
  }
}
func ==(l: WeightValue, r: WeightValue) -> Bool {
  return l === r
}
class WeightValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "weight"
  var value : Int = 0
  var unit : String = "kg"
  class func fromDictionary(dict : [String:Any]) -> WeightValue {
    let obj : WeightValue = WeightValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["value"] as? Int 
      if ( v_1 != nil  ) {
        obj.value = v_1!;
      }
      let v_2 : String? = dict["unit"] as? String 
      if ( v_2 != nil  ) {
        obj.unit = v_2!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["value"] = self.value
      res["unit"] = self.unit
    } catch { 
    }
    return res;
  }
}
func ==(l: NumRangeValue, r: NumRangeValue) -> Bool {
  return l === r
}
class NumRangeValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "num-range"
  var minValue : Int = 0
  var maxValue : Int = 0
  class func fromDictionary(dict : [String:Any]) -> NumRangeValue {
    let obj : NumRangeValue = NumRangeValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["minValue"] as? Int 
      if ( v_1 != nil  ) {
        obj.minValue = v_1!;
      }
      let v_2 : Int? = dict["maxValue"] as? Int 
      if ( v_2 != nil  ) {
        obj.maxValue = v_2!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["minValue"] = self.minValue
      res["maxValue"] = self.maxValue
    } catch { 
    }
    return res;
  }
}
func ==(l: PercentageRangeValue, r: PercentageRangeValue) -> Bool {
  return l === r
}
class PercentageRangeValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "percentage-range"
  var minValue : Int = 0
  var maxValue : Int = 0
  class func fromDictionary(dict : [String:Any]) -> PercentageRangeValue {
    let obj : PercentageRangeValue = PercentageRangeValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["minValue"] as? Int 
      if ( v_1 != nil  ) {
        obj.minValue = v_1!;
      }
      let v_2 : Int? = dict["maxValue"] as? Int 
      if ( v_2 != nil  ) {
        obj.maxValue = v_2!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["minValue"] = self.minValue
      res["maxValue"] = self.maxValue
    } catch { 
    }
    return res;
  }
}
func ==(l: RepeatBlockValue, r: RepeatBlockValue) -> Bool {
  return l === r
}
class RepeatBlockValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "repeat-block"
  var count : Int = 0
  class func fromDictionary(dict : [String:Any]) -> RepeatBlockValue {
    let obj : RepeatBlockValue = RepeatBlockValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["count"] as? Int 
      if ( v_1 != nil  ) {
        obj.count = v_1!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["count"] = self.count
    } catch { 
    }
    return res;
  }
}
func ==(l: SetRepRangeLoadValue, r: SetRepRangeLoadValue) -> Bool {
  return l === r
}
class SetRepRangeLoadValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "set-rep-range-load"
  var count : Int = 1
  var setsMin : Int = 0
  var setsMax : Int = 0
  var repsMin : Int = 0
  var repsMax : Int = 0
  var mode : String = ""
  var load : Int = 0
  var unit : String = ""
  class func fromDictionary(dict : [String:Any]) -> SetRepRangeLoadValue {
    let obj : SetRepRangeLoadValue = SetRepRangeLoadValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["count"] as? Int 
      if ( v_1 != nil  ) {
        obj.count = v_1!;
      }
      let v_2 : Int? = dict["setsMin"] as? Int 
      if ( v_2 != nil  ) {
        obj.setsMin = v_2!;
      }
      let v_3 : Int? = dict["setsMax"] as? Int 
      if ( v_3 != nil  ) {
        obj.setsMax = v_3!;
      }
      let v_4 : Int? = dict["repsMin"] as? Int 
      if ( v_4 != nil  ) {
        obj.repsMin = v_4!;
      }
      let v_5 : Int? = dict["repsMax"] as? Int 
      if ( v_5 != nil  ) {
        obj.repsMax = v_5!;
      }
      let v_6 : String? = dict["mode"] as? String 
      if ( v_6 != nil  ) {
        obj.mode = v_6!;
      }
      let v_7 : Int? = dict["load"] as? Int 
      if ( v_7 != nil  ) {
        obj.load = v_7!;
      }
      let v_8 : String? = dict["unit"] as? String 
      if ( v_8 != nil  ) {
        obj.unit = v_8!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["count"] = self.count
      res["setsMin"] = self.setsMin
      res["setsMax"] = self.setsMax
      res["repsMin"] = self.repsMin
      res["repsMax"] = self.repsMax
      res["mode"] = self.mode
      res["load"] = self.load
      res["unit"] = self.unit
    } catch { 
    }
    return res;
  }
}
func ==(l: ZoneValue, r: ZoneValue) -> Bool {
  return l === r
}
class ZoneValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "zone"
  var zone : Int = 0
  class func fromDictionary(dict : [String:Any]) -> ZoneValue {
    let obj : ZoneValue = ZoneValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["zone"] as? Int 
      if ( v_1 != nil  ) {
        obj.zone = v_1!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["zone"] = self.zone
    } catch { 
    }
    return res;
  }
}
func ==(l: PositiveIntegerValue, r: PositiveIntegerValue) -> Bool {
  return l === r
}
class PositiveIntegerValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "positive-integer"
  var value : Int = 0
  class func fromDictionary(dict : [String:Any]) -> PositiveIntegerValue {
    let obj : PositiveIntegerValue = PositiveIntegerValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["value"] as? Int 
      if ( v_1 != nil  ) {
        obj.value = v_1!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["value"] = self.value
    } catch { 
    }
    return res;
  }
}
func ==(l: DetailsLevelValue, r: DetailsLevelValue) -> Bool {
  return l === r
}
class DetailsLevelValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "details-level"
  var level : Int = 0
  var marker : String = ""
  class func fromDictionary(dict : [String:Any]) -> DetailsLevelValue {
    let obj : DetailsLevelValue = DetailsLevelValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["level"] as? Int 
      if ( v_1 != nil  ) {
        obj.level = v_1!;
      }
      let v_2 : String? = dict["marker"] as? String 
      if ( v_2 != nil  ) {
        obj.marker = v_2!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["level"] = self.level
      res["marker"] = self.marker
    } catch { 
    }
    return res;
  }
}
func ==(l: RecoveryValue, r: RecoveryValue) -> Bool {
  return l === r
}
class RecoveryValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "recovery"
  var label : String = "Recovery"
  class func fromDictionary(dict : [String:Any]) -> RecoveryValue {
    let obj : RecoveryValue = RecoveryValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : String? = dict["label"] as? String 
      if ( v_1 != nil  ) {
        obj.label = v_1!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["label"] = self.label
    } catch { 
    }
    return res;
  }
}
func ==(l: TimeValueValue, r: TimeValueValue) -> Bool {
  return l === r
}
class TimeValueValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "time-value"
  var minutes : Int = 0
  var seconds : Int = 0
  class func fromDictionary(dict : [String:Any]) -> TimeValueValue {
    let obj : TimeValueValue = TimeValueValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["minutes"] as? Int 
      if ( v_1 != nil  ) {
        obj.minutes = v_1!;
      }
      let v_2 : Int? = dict["seconds"] as? Int 
      if ( v_2 != nil  ) {
        obj.seconds = v_2!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["minutes"] = self.minutes
      res["seconds"] = self.seconds
    } catch { 
    }
    return res;
  }
}
func ==(l: LeftRightValue, r: LeftRightValue) -> Bool {
  return l === r
}
class LeftRightValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "left-right"
  var side : String = ""
  class func fromDictionary(dict : [String:Any]) -> LeftRightValue {
    let obj : LeftRightValue = LeftRightValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : String? = dict["side"] as? String 
      if ( v_1 != nil  ) {
        obj.side = v_1!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["side"] = self.side
    } catch { 
    }
    return res;
  }
}
func ==(l: FeelingValue, r: FeelingValue) -> Bool {
  return l === r
}
class FeelingValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "feeling"
  var score : Int = 0
  class func fromDictionary(dict : [String:Any]) -> FeelingValue {
    let obj : FeelingValue = FeelingValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["score"] as? Int 
      if ( v_1 != nil  ) {
        obj.score = v_1!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["score"] = self.score
    } catch { 
    }
    return res;
  }
}
func ==(l: EffortValue, r: EffortValue) -> Bool {
  return l === r
}
class EffortValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "effort"
  var score : Int = 0
  class func fromDictionary(dict : [String:Any]) -> EffortValue {
    let obj : EffortValue = EffortValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["score"] as? Int 
      if ( v_1 != nil  ) {
        obj.score = v_1!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["score"] = self.score
    } catch { 
    }
    return res;
  }
}
func ==(l: BodyMetricValue, r: BodyMetricValue) -> Bool {
  return l === r
}
class BodyMetricValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "body-metric"
  var metric : String = ""
  var primaryValue : Double = 0.0
  var secondaryValue : Int = 0
  var unit : String = ""
  class func fromDictionary(dict : [String:Any]) -> BodyMetricValue {
    let obj : BodyMetricValue = BodyMetricValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : String? = dict["metric"] as? String 
      if ( v_1 != nil  ) {
        obj.metric = v_1!;
      }
      let v_2 : Double? = dict["primaryValue"] as? Double 
      if ( v_2 != nil  ) {
        obj.primaryValue = v_2!;
      }
      let v_3 : Int? = dict["secondaryValue"] as? Int 
      if ( v_3 != nil  ) {
        obj.secondaryValue = v_3!;
      }
      let v_4 : String? = dict["unit"] as? String 
      if ( v_4 != nil  ) {
        obj.unit = v_4!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["metric"] = self.metric
      res["primaryValue"] = self.primaryValue
      res["secondaryValue"] = self.secondaryValue
      res["unit"] = self.unit
    } catch { 
    }
    return res;
  }
}
func ==(l: CircuitValue, r: CircuitValue) -> Bool {
  return l === r
}
class CircuitValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "circuit"
  var rounds : Int = 0
  var restValue : Int = 0
  var restUnit : String = ""
  class func fromDictionary(dict : [String:Any]) -> CircuitValue {
    let obj : CircuitValue = CircuitValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : Int? = dict["rounds"] as? Int 
      if ( v_1 != nil  ) {
        obj.rounds = v_1!;
      }
      let v_2 : Int? = dict["restValue"] as? Int 
      if ( v_2 != nil  ) {
        obj.restValue = v_2!;
      }
      let v_3 : String? = dict["restUnit"] as? String 
      if ( v_3 != nil  ) {
        obj.restUnit = v_3!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["rounds"] = self.rounds
      res["restValue"] = self.restValue
      res["restUnit"] = self.restUnit
    } catch { 
    }
    return res;
  }
}
func ==(l: ContextEntryValue, r: ContextEntryValue) -> Bool {
  return l === r
}
class ContextEntryValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = "context-entry"
  var content : String = ""
  var name : String = ""
  var value : String = ""
  var hasNumeric : Bool = false
  var numericValue : Double = 0.0
  var unit : String = ""
  var basis : String = ""
  var source : String = ""
  var hasConfidence : Bool = false
  var confidence : Double = 0.0
  var hasGoodness : Bool = false
  var goodness : Int = 0
  class func fromDictionary(dict : [String:Any]) -> ContextEntryValue {
    let obj : ContextEntryValue = ContextEntryValue()
    do {
      let v : String? = dict["kind"] as? String 
      if ( v != nil  ) {
        obj.kind = v!;
      }
      let v_1 : String? = dict["content"] as? String 
      if ( v_1 != nil  ) {
        obj.content = v_1!;
      }
      let v_2 : String? = dict["name"] as? String 
      if ( v_2 != nil  ) {
        obj.name = v_2!;
      }
      let v_3 : String? = dict["value"] as? String 
      if ( v_3 != nil  ) {
        obj.value = v_3!;
      }
      let v_4 : Bool? = dict["hasNumeric"] as? Bool 
      if ( v_4 != nil  ) {
        obj.hasNumeric = v_4!;
      }
      let v_5 : Double? = dict["numericValue"] as? Double 
      if ( v_5 != nil  ) {
        obj.numericValue = v_5!;
      }
      let v_6 : String? = dict["unit"] as? String 
      if ( v_6 != nil  ) {
        obj.unit = v_6!;
      }
      let v_7 : String? = dict["basis"] as? String 
      if ( v_7 != nil  ) {
        obj.basis = v_7!;
      }
      let v_8 : String? = dict["source"] as? String 
      if ( v_8 != nil  ) {
        obj.source = v_8!;
      }
      let v_9 : Bool? = dict["hasConfidence"] as? Bool 
      if ( v_9 != nil  ) {
        obj.hasConfidence = v_9!;
      }
      let v_10 : Double? = dict["confidence"] as? Double 
      if ( v_10 != nil  ) {
        obj.confidence = v_10!;
      }
      let v_11 : Bool? = dict["hasGoodness"] as? Bool 
      if ( v_11 != nil  ) {
        obj.hasGoodness = v_11!;
      }
      let v_12 : Int? = dict["goodness"] as? Int 
      if ( v_12 != nil  ) {
        obj.goodness = v_12!;
      }
    } catch { 
    }
    return obj;
  }
  func toDictionary() -> [String:Any] {
    var res : [String:Any] = [String:Any]()
    do {
      res["kind"] = self.kind
      res["content"] = self.content
      res["name"] = self.name
      res["value"] = self.value
      res["hasNumeric"] = self.hasNumeric
      res["numericValue"] = self.numericValue
      res["unit"] = self.unit
      res["basis"] = self.basis
      res["source"] = self.source
      res["hasConfidence"] = self.hasConfidence
      res["confidence"] = self.confidence
      res["hasGoodness"] = self.hasGoodness
      res["goodness"] = self.goodness
    } catch { 
    }
    return res;
  }
}
func ==(l: SliceParsedValue, r: SliceParsedValue) -> Bool {
  return l === r
}
class SliceParsedValue : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var kind : String = ""
  var dateTime : DateTimeValue?
  var distance : DistanceValue?
  var percentage : PercentageValue?
  var recoveryTime : RecoveryTimeValue?
  var weight : WeightValue?
  var numRange : NumRangeValue?
  var percentageRange : PercentageRangeValue?
  var repeatBlock : RepeatBlockValue?
  var setRepRangeLoad : SetRepRangeLoadValue?
  var zone : ZoneValue?
  var positiveInteger : PositiveIntegerValue?
  var detailsLevel : DetailsLevelValue?
  var recovery : RecoveryValue?
  var timeValue : TimeValueValue?
  var leftRight : LeftRightValue?
  var feeling : FeelingValue?
  var effort : EffortValue?
  var bodyMetric : BodyMetricValue?
  var circuit : CircuitValue?
  var contextEntry : ContextEntryValue?
  class func create(kind : String) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = kind;
    return out;
  }
  class func fromDateTime(value : DateTimeValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "datetime";
    out.dateTime = value;
    return out;
  }
  class func fromDistance(value : DistanceValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "distance";
    out.distance = value;
    return out;
  }
  class func fromPercentage(value : PercentageValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "percentage";
    out.percentage = value;
    return out;
  }
  class func fromRecoveryTime(value : RecoveryTimeValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "recovery-time";
    out.recoveryTime = value;
    return out;
  }
  class func fromWeight(value : WeightValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "weight";
    out.weight = value;
    return out;
  }
  class func fromNumRange(value : NumRangeValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "num-range";
    out.numRange = value;
    return out;
  }
  class func fromPercentageRange(value : PercentageRangeValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "percentage-range";
    out.percentageRange = value;
    return out;
  }
  class func fromRepeatBlock(value : RepeatBlockValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "repeat-block";
    out.repeatBlock = value;
    return out;
  }
  class func fromSetRepRangeLoad(value : SetRepRangeLoadValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "set-rep-range-load";
    out.setRepRangeLoad = value;
    return out;
  }
  class func fromZone(value : ZoneValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "zone";
    out.zone = value;
    return out;
  }
  class func fromPositiveInteger(value : PositiveIntegerValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "positive-integer";
    out.positiveInteger = value;
    return out;
  }
  class func fromDetailsLevel(value : DetailsLevelValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "details-level";
    out.detailsLevel = value;
    return out;
  }
  class func fromRecovery(value : RecoveryValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "recovery";
    out.recovery = value;
    return out;
  }
  class func fromTimeValue(value : TimeValueValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "time-value";
    out.timeValue = value;
    return out;
  }
  class func fromLeftRight(value : LeftRightValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "left-right";
    out.leftRight = value;
    return out;
  }
  class func fromFeeling(value : FeelingValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "feeling";
    out.feeling = value;
    return out;
  }
  class func fromEffort(value : EffortValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "effort";
    out.effort = value;
    return out;
  }
  class func fromBodyMetric(value : BodyMetricValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "body-metric";
    out.bodyMetric = value;
    return out;
  }
  class func fromCircuit(value : CircuitValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "circuit";
    out.circuit = value;
    return out;
  }
  class func fromContextEntry(value : ContextEntryValue) -> SliceParsedValue {
    let out : SliceParsedValue = SliceParsedValue()
    out.kind = "context-entry";
    out.contextEntry = value;
    return out;
  }
  func hasDateTime() -> Bool {
    return self.dateTime != nil ;
  }
  func getDateTime() -> DateTimeValue {
    if ( self.dateTime != nil  ) {
      return self.dateTime!;
    }
    return DateTimeValue();
  }
  func hasDistance() -> Bool {
    return self.distance != nil ;
  }
  func getDistance() -> DistanceValue {
    if ( self.distance != nil  ) {
      return self.distance!;
    }
    return DistanceValue();
  }
  func hasPercentage() -> Bool {
    return self.percentage != nil ;
  }
  func getPercentage() -> PercentageValue {
    if ( self.percentage != nil  ) {
      return self.percentage!;
    }
    return PercentageValue();
  }
  func hasRecoveryTime() -> Bool {
    return self.recoveryTime != nil ;
  }
  func getRecoveryTime() -> RecoveryTimeValue {
    if ( self.recoveryTime != nil  ) {
      return self.recoveryTime!;
    }
    return RecoveryTimeValue();
  }
  func hasWeight() -> Bool {
    return self.weight != nil ;
  }
  func getWeight() -> WeightValue {
    if ( self.weight != nil  ) {
      return self.weight!;
    }
    return WeightValue();
  }
  func hasNumRange() -> Bool {
    return self.numRange != nil ;
  }
  func getNumRange() -> NumRangeValue {
    if ( self.numRange != nil  ) {
      return self.numRange!;
    }
    return NumRangeValue();
  }
  func hasPercentageRange() -> Bool {
    return self.percentageRange != nil ;
  }
  func getPercentageRange() -> PercentageRangeValue {
    if ( self.percentageRange != nil  ) {
      return self.percentageRange!;
    }
    return PercentageRangeValue();
  }
  func hasRepeatBlock() -> Bool {
    return self.repeatBlock != nil ;
  }
  func getRepeatBlock() -> RepeatBlockValue {
    if ( self.repeatBlock != nil  ) {
      return self.repeatBlock!;
    }
    return RepeatBlockValue();
  }
  func hasSetRepRangeLoad() -> Bool {
    return self.setRepRangeLoad != nil ;
  }
  func getSetRepRangeLoad() -> SetRepRangeLoadValue {
    if ( self.setRepRangeLoad != nil  ) {
      return self.setRepRangeLoad!;
    }
    return SetRepRangeLoadValue();
  }
  func hasZone() -> Bool {
    return self.zone != nil ;
  }
  func getZone() -> ZoneValue {
    if ( self.zone != nil  ) {
      return self.zone!;
    }
    return ZoneValue();
  }
  func hasPositiveInteger() -> Bool {
    return self.positiveInteger != nil ;
  }
  func getPositiveInteger() -> PositiveIntegerValue {
    if ( self.positiveInteger != nil  ) {
      return self.positiveInteger!;
    }
    return PositiveIntegerValue();
  }
  func hasDetailsLevel() -> Bool {
    return self.detailsLevel != nil ;
  }
  func getDetailsLevel() -> DetailsLevelValue {
    if ( self.detailsLevel != nil  ) {
      return self.detailsLevel!;
    }
    return DetailsLevelValue();
  }
  func hasRecovery() -> Bool {
    return self.recovery != nil ;
  }
  func getRecovery() -> RecoveryValue {
    if ( self.recovery != nil  ) {
      return self.recovery!;
    }
    return RecoveryValue();
  }
  func hasTimeValue() -> Bool {
    return self.timeValue != nil ;
  }
  func getTimeValue() -> TimeValueValue {
    if ( self.timeValue != nil  ) {
      return self.timeValue!;
    }
    return TimeValueValue();
  }
  func hasLeftRight() -> Bool {
    return self.leftRight != nil ;
  }
  func getLeftRight() -> LeftRightValue {
    if ( self.leftRight != nil  ) {
      return self.leftRight!;
    }
    return LeftRightValue();
  }
  func hasFeeling() -> Bool {
    return self.feeling != nil ;
  }
  func getFeeling() -> FeelingValue {
    if ( self.feeling != nil  ) {
      return self.feeling!;
    }
    return FeelingValue();
  }
  func hasEffort() -> Bool {
    return self.effort != nil ;
  }
  func getEffort() -> EffortValue {
    if ( self.effort != nil  ) {
      return self.effort!;
    }
    return EffortValue();
  }
  func hasBodyMetric() -> Bool {
    return self.bodyMetric != nil ;
  }
  func getBodyMetric() -> BodyMetricValue {
    if ( self.bodyMetric != nil  ) {
      return self.bodyMetric!;
    }
    return BodyMetricValue();
  }
  func hasCircuit() -> Bool {
    return self.circuit != nil ;
  }
  func getCircuit() -> CircuitValue {
    if ( self.circuit != nil  ) {
      return self.circuit!;
    }
    return CircuitValue();
  }
  func hasContextEntry() -> Bool {
    return self.contextEntry != nil ;
  }
  func getContextEntry() -> ContextEntryValue {
    if ( self.contextEntry != nil  ) {
      return self.contextEntry!;
    }
    return ContextEntryValue();
  }
}
func ==(l: TokenSlice, r: TokenSlice) -> Bool {
  return l === r
}
class TokenSlice : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var source : String = ""
  var start : Int = 0
  var size : Int = 0
  var tag : String = ""
  var children : [TokenSlice] = [TokenSlice]()
  var parsedValue : SliceParsedValue?
  init(text : String, from : Int, length : Int ) {
    self.source = text;
    self.start = from;
    self.size = length;
  }
  class func fromText(text : String) -> TokenSlice {
    return TokenSlice(text : text, from : 0, length : text.count);
  }
  func length() -> Int {
    return self.size;
  }
  func childCount() -> Int {
    return self.children.count;
  }
  func addChild(child : TokenSlice) -> Void {
    self.children.append(child)
  }
  func getChild(index : Int) -> TokenSlice {
    return self.children[index];
  }
  func isEmpty() -> Bool {
    return self.size == 0;
  }
  func hasValue() -> Bool {
    return self.size > 0;
  }
  func hasDateTimeValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "datetime") && p.hasDateTime() ) {
        return true;
      }
    }
    return false;
  }
  func setSliceValue(value : SliceParsedValue) -> Void {
    self.parsedValue = value;
  }
  func hasSliceValue() -> Bool {
    return self.parsedValue != nil ;
  }
  func getSliceValueKind() -> String {
    if ( self.parsedValue != nil  ) {
      return ((self.parsedValue!)).kind;
    }
    return "";
  }
  func setDateTimeValue(value : DateTimeValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.dateTime = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "datetime";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromDateTime(value : value);
  }
  func getAsDateTimeValue() -> DateTimeValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "datetime") && p.hasDateTime() ) {
        return p.getDateTime();
      }
    }
    return DateTimeValue();
  }
  func hasDistanceValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "distance") && p.hasDistance() ) {
        return true;
      }
    }
    return false;
  }
  func setDistanceValue(value : DistanceValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.distance = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "distance";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromDistance(value : value);
  }
  func getAsDistanceValue() -> DistanceValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "distance") && p.hasDistance() ) {
        return p.getDistance();
      }
    }
    return DistanceValue();
  }
  func hasPercentageValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "percentage") && p.hasPercentage() ) {
        return true;
      }
    }
    return false;
  }
  func setPercentageValue(value : PercentageValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.percentage = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "percentage";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromPercentage(value : value);
  }
  func getAsPercentageValue() -> PercentageValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "percentage") && p.hasPercentage() ) {
        return p.getPercentage();
      }
    }
    return PercentageValue();
  }
  func hasRecoveryTimeValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "recovery-time") && p.hasRecoveryTime() ) {
        return true;
      }
    }
    return false;
  }
  func setRecoveryTimeValue(value : RecoveryTimeValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.recoveryTime = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "recovery-time";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromRecoveryTime(value : value);
  }
  func getAsRecoveryTimeValue() -> RecoveryTimeValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "recovery-time") && p.hasRecoveryTime() ) {
        return p.getRecoveryTime();
      }
    }
    return RecoveryTimeValue();
  }
  func hasWeightValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "weight") && p.hasWeight() ) {
        return true;
      }
    }
    return false;
  }
  func setWeightValue(value : WeightValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.weight = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "weight";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromWeight(value : value);
  }
  func getAsWeightValue() -> WeightValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "weight") && p.hasWeight() ) {
        return p.getWeight();
      }
    }
    return WeightValue();
  }
  func hasNumRangeValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "num-range") && p.hasNumRange() ) {
        return true;
      }
    }
    return false;
  }
  func setNumRangeValue(value : NumRangeValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.numRange = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "num-range";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromNumRange(value : value);
  }
  func getAsNumRangeValue() -> NumRangeValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "num-range") && p.hasNumRange() ) {
        return p.getNumRange();
      }
    }
    return NumRangeValue();
  }
  func hasPercentageRangeValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "percentage-range") && p.hasPercentageRange() ) {
        return true;
      }
    }
    return false;
  }
  func setPercentageRangeValue(value : PercentageRangeValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.percentageRange = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "percentage-range";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromPercentageRange(value : value);
  }
  func getAsPercentageRangeValue() -> PercentageRangeValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "percentage-range") && p.hasPercentageRange() ) {
        return p.getPercentageRange();
      }
    }
    return PercentageRangeValue();
  }
  func hasRepeatBlockValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "repeat-block") && p.hasRepeatBlock() ) {
        return true;
      }
    }
    return false;
  }
  func setRepeatBlockValue(value : RepeatBlockValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.repeatBlock = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "repeat-block";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromRepeatBlock(value : value);
  }
  func getAsRepeatBlockValue() -> RepeatBlockValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "repeat-block") && p.hasRepeatBlock() ) {
        return p.getRepeatBlock();
      }
    }
    return RepeatBlockValue();
  }
  func hasSetRepRangeLoadValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "set-rep-range-load") && p.hasSetRepRangeLoad() ) {
        return true;
      }
    }
    return false;
  }
  func setSetRepRangeLoadValue(value : SetRepRangeLoadValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.setRepRangeLoad = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "set-rep-range-load";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromSetRepRangeLoad(value : value);
  }
  func getAsSetRepRangeLoadValue() -> SetRepRangeLoadValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "set-rep-range-load") && p.hasSetRepRangeLoad() ) {
        return p.getSetRepRangeLoad();
      }
    }
    return SetRepRangeLoadValue();
  }
  func hasZoneValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "zone") && p.hasZone() ) {
        return true;
      }
    }
    return false;
  }
  func setZoneValue(value : ZoneValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.zone = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "zone";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromZone(value : value);
  }
  func getAsZoneValue() -> ZoneValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "zone") && p.hasZone() ) {
        return p.getZone();
      }
    }
    return ZoneValue();
  }
  func hasPositiveIntegerValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "positive-integer") && p.hasPositiveInteger() ) {
        return true;
      }
    }
    return false;
  }
  func setPositiveIntegerValue(value : PositiveIntegerValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.positiveInteger = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "positive-integer";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromPositiveInteger(value : value);
  }
  func getAsPositiveIntegerValue() -> PositiveIntegerValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "positive-integer") && p.hasPositiveInteger() ) {
        return p.getPositiveInteger();
      }
    }
    return PositiveIntegerValue();
  }
  func hasDetailsLevelValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "details-level") && p.hasDetailsLevel() ) {
        return true;
      }
    }
    return false;
  }
  func setDetailsLevelValue(value : DetailsLevelValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.detailsLevel = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "details-level";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromDetailsLevel(value : value);
  }
  func getAsDetailsLevelValue() -> DetailsLevelValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "details-level") && p.hasDetailsLevel() ) {
        return p.getDetailsLevel();
      }
    }
    return DetailsLevelValue();
  }
  func hasRecoveryValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "recovery") && p.hasRecovery() ) {
        return true;
      }
    }
    return false;
  }
  func setRecoveryValue(value : RecoveryValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.recovery = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "recovery";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromRecovery(value : value);
  }
  func getAsRecoveryValue() -> RecoveryValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "recovery") && p.hasRecovery() ) {
        return p.getRecovery();
      }
    }
    return RecoveryValue();
  }
  func hasTimeValueValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "time-value") && p.hasTimeValue() ) {
        return true;
      }
    }
    return false;
  }
  func setTimeValueValue(value : TimeValueValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.timeValue = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "time-value";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromTimeValue(value : value);
  }
  func getAsTimeValueValue() -> TimeValueValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "time-value") && p.hasTimeValue() ) {
        return p.getTimeValue();
      }
    }
    return TimeValueValue();
  }
  func hasLeftRightValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "left-right") && p.hasLeftRight() ) {
        return true;
      }
    }
    return false;
  }
  func setLeftRightValue(value : LeftRightValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.leftRight = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "left-right";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromLeftRight(value : value);
  }
  func getAsLeftRightValue() -> LeftRightValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "left-right") && p.hasLeftRight() ) {
        return p.getLeftRight();
      }
    }
    return LeftRightValue();
  }
  func hasFeelingValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "feeling") && p.hasFeeling() ) {
        return true;
      }
    }
    return false;
  }
  func setFeelingValue(value : FeelingValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.feeling = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "feeling";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromFeeling(value : value);
  }
  func getAsFeelingValue() -> FeelingValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "feeling") && p.hasFeeling() ) {
        return p.getFeeling();
      }
    }
    return FeelingValue();
  }
  func hasEffortValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "effort") && p.hasEffort() ) {
        return true;
      }
    }
    return false;
  }
  func setEffortValue(value : EffortValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.effort = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "effort";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromEffort(value : value);
  }
  func getAsEffortValue() -> EffortValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "effort") && p.hasEffort() ) {
        return p.getEffort();
      }
    }
    return EffortValue();
  }
  func hasBodyMetricValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "body-metric") && p.hasBodyMetric() ) {
        return true;
      }
    }
    return false;
  }
  func setBodyMetricValue(value : BodyMetricValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.bodyMetric = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "body-metric";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromBodyMetric(value : value);
  }
  func getAsBodyMetricValue() -> BodyMetricValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "body-metric") && p.hasBodyMetric() ) {
        return p.getBodyMetric();
      }
    }
    return BodyMetricValue();
  }
  func hasCircuitValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "circuit") && p.hasCircuit() ) {
        return true;
      }
    }
    return false;
  }
  func setCircuitValue(value : CircuitValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.circuit = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "circuit";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromCircuit(value : value);
  }
  func getAsCircuitValue() -> CircuitValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "circuit") && p.hasCircuit() ) {
        return p.getCircuit();
      }
    }
    return CircuitValue();
  }
  func hasContextEntryValue() -> Bool {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "context-entry") && p.hasContextEntry() ) {
        return true;
      }
    }
    return false;
  }
  func setContextEntryValue(value : ContextEntryValue) -> Void {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      p.contextEntry = value;
      if ( (p.kind.count) == 0 ) {
        p.kind = "context-entry";
      }
      self.parsedValue = p;
      return;
    }
    self.parsedValue = SliceParsedValue.fromContextEntry(value : value);
  }
  func getAsContextEntryValue() -> ContextEntryValue {
    if ( self.parsedValue != nil  ) {
      let p : SliceParsedValue = self.parsedValue!
      if ( (p.kind == "context-entry") && p.hasContextEntry() ) {
        return p.getContextEntry();
      }
    }
    return ContextEntryValue();
  }
  func toString() -> String {
    return String(self.source[self.source.index(self.source.startIndex, offsetBy:self.start)..<self.source.index(self.source.startIndex, offsetBy:(self.start + self.size))]);
  }
  func strEquals(value : String) -> Bool {
    let vLen : Int = value.count
    if ( vLen != self.size ) {
      return false;
    }
    var i : Int = 0
    while (i < vLen) {
      if ( (Int(self.source[self.source.index(self.source.startIndex, offsetBy: (self.start + i))].asciiValue ?? 0)) == (Int(value[value.index(value.startIndex, offsetBy: i)].asciiValue ?? 0)) ) {
      } else {
        return false;
      }
      i = i + 1;
    }
    return true;
  }
  func charCodeAt(index : Int) -> Int {
    if ( index < 0 ) {
      return -1;
    }
    if ( index >= self.size ) {
      return -1;
    }
    return Int(self.source[self.source.index(self.source.startIndex, offsetBy: (self.start + index))].asciiValue ?? 0);
  }
  func isDigitAt(index : Int) -> Bool {
    let ch : Int = self.charCodeAt(index : index)
    return (ch >= 48) && (ch <= 57);
  }
  func digitAt(index : Int) -> Int {
    let ch : Int = self.charCodeAt(index : index)
    if ( (ch >= 48) && (ch <= 57) ) {
      return ch - 48;
    }
    return -1;
  }
  func isWhitespace(ch : Int) -> Bool {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  }
  func isWhitespaceAt(index : Int) -> Bool {
    let ch : Int = self.charCodeAt(index : index)
    return self.isWhitespace(ch : ch);
  }
  func isAlphaNum(ch : Int) -> Bool {
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
  func isAlphaNumAt(index : Int) -> Bool {
    let ch : Int = self.charCodeAt(index : index)
    return self.isAlphaNum(ch : ch);
  }
  func findLineEnd(from : Int) -> Int {
    var safeFrom : Int = from
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= self.size ) {
      return self.size;
    }
    var i : Int = safeFrom
    while (i < self.size) {
      let ch : Int = self.charCodeAt(index : i)
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    }
    return i;
  }
  func findNumberEnd(from : Int) -> Int {
    var safeFrom : Int = from
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= self.size ) {
      return self.size;
    }
    var i : Int = safeFrom
    while (i < self.size) {
      if ( self.isDigitAt(index : i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    return i;
  }
  func findWhitespaceEnd(from : Int) -> Int {
    var safeFrom : Int = from
    if ( safeFrom < 0 ) {
      safeFrom = 0;
    }
    if ( safeFrom >= self.size ) {
      return self.size;
    }
    var i : Int = safeFrom
    while (i < self.size) {
      if ( self.isWhitespaceAt(index : i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    return i;
  }
  func hasInteger(from : Int, to : Int) -> Bool {
    if ( from < 0 ) {
      return false;
    }
    if ( to < from ) {
      return false;
    }
    if ( to >= self.size ) {
      return false;
    }
    var i : Int = from
    while (i <= to) {
      let ch : Int = self.charCodeAt(index : i)
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
  func parseInteger(from : Int, to : Int) -> Int {
    if ( self.hasInteger(from : from, to : to) ) {
    } else {
      return -1;
    }
    var value : Int = 0
    var i : Int = from
    while (i <= to) {
      let ch : Int = self.charCodeAt(index : i)
      value = (value * 10) + (ch - 48);
      i = i + 1;
    }
    return value;
  }
  func hasDouble(from : Int, to : Int) -> Bool {
    if ( from < 0 ) {
      return false;
    }
    if ( to < from ) {
      return false;
    }
    if ( to >= self.size ) {
      return false;
    }
    var i : Int = from
    let first : Int = self.charCodeAt(index : i)
    if ( (first == 43) || (first == 45) ) {
      i = i + 1;
      if ( i > to ) {
        return false;
      }
    }
    var hasDigit : Bool = false
    var hasDot : Bool = false
    while (i <= to) {
      let ch : Int = self.charCodeAt(index : i)
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
  func parseDouble(from : Int, to : Int) -> Double {
    if ( self.hasDouble(from : from, to : to) ) {
    } else {
      return 0.0;
    }
    let raw : String = String(self.source[self.source.index(self.source.startIndex, offsetBy:(self.start + from))..<self.source.index(self.source.startIndex, offsetBy:((self.start + to) + 1))])
    let v : Double? = isNaN( parseFloat(raw) ) ? undefined : parseFloat(raw)
    if ( v != nil ) {
      return v!;
    }
    return 0.0;
  }
  func peek(offset : Int) -> TokenSlice {
    var safeOffset : Int = offset
    if ( safeOffset < 0 ) {
      safeOffset = 0;
    }
    if ( safeOffset > self.size ) {
      safeOffset = self.size;
    }
    return TokenSlice(text : self.source, from : self.start + safeOffset, length : self.size - safeOffset);
  }
  func step(count : Int) -> TokenSlice {
    return self.peek(offset : count);
  }
  func read(count : Int) -> TokenSlice {
    var safeCount : Int = count
    if ( safeCount < 0 ) {
      safeCount = 0;
    }
    if ( safeCount > self.size ) {
      safeCount = self.size;
    }
    return TokenSlice(text : self.source, from : self.start, length : safeCount);
  }
  func slice(count : Int) -> TokenSlice {
    return self.read(count : count);
  }
  func pickSlice(from : Int, length : Int) -> TokenSlice {
    return TokenSlice(text : self.source, from : self.start + from, length : length);
  }
  func hasToken(token : String) -> Bool {
    let tLen : Int = token.count
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > self.size ) {
      return false;
    }
    var i : Int = 0
    while (i < tLen) {
      if ( (Int(self.source[self.source.index(self.source.startIndex, offsetBy: (self.start + i))].asciiValue ?? 0)) == (Int(token[token.index(token.startIndex, offsetBy: i)].asciiValue ?? 0)) ) {
      } else {
        return false;
      }
      i = i + 1;
    }
    return true;
  }
  func endsWith(token : String) -> Bool {
    let tLen : Int = token.count
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > self.size ) {
      return false;
    }
    let me : String = (self).toString()
    let meLen : Int = me.count
    return (String(me[me.index(me.startIndex, offsetBy:(meLen - tLen))..<me.index(me.startIndex, offsetBy:meLen)])) == token;
  }
  func findTokenPos(token : String) -> Int {
    let tLen : Int = token.count
    if ( tLen == 0 ) {
      return 0;
    }
    if ( tLen > self.size ) {
      return -1;
    }
    let text : String = (self).toString()
    let maxStart : Int = self.size - tLen
    var i : Int = 0
    while (i <= maxStart) {
      if ( (String(text[text.index(text.startIndex, offsetBy:i)..<text.index(text.startIndex, offsetBy:(i + tLen))])) == token ) {
        return i;
      }
      i = i + 1;
    }
    return -1;
  }
  func splitWithToken(token : String) -> TokenSlice {
    let pos : Int = self.findTokenPos(token : token)
    if ( pos < 0 ) {
      return TokenSlice(text : self.source, from : self.start, length : self.size);
    }
    return TokenSlice(text : self.source, from : self.start, length : pos);
  }
  func sliceToToken(token : String) -> TokenSlice {
    let pos : Int = self.findTokenPos(token : token)
    if ( pos < 0 ) {
      return TokenSlice(text : self.source, from : self.start, length : self.size);
    }
    let tLen : Int = token.count
    return TokenSlice(text : self.source, from : self.start, length : pos + tLen);
  }
}
func ==(l: TokenDetector, r: TokenDetector) -> Bool {
  return l === r
}
class TokenDetector : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var detectedTag : String = "unknown"
  var cachedNoMatch : TokenSlice = TokenSlice(text : "", from : 0, length : 0)
  init(noMatchSlice : TokenSlice ) {
    self.cachedNoMatch = noMatchSlice;
  }
  class func createNoMatchSlice() -> TokenSlice {
    let s : TokenSlice = TokenSlice(text : "", from : 0, length : 0)
    s.tag = "";
    return s;
  }
  class func create() -> TokenDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return TokenDetector(noMatchSlice : s);
  }
  func getNoMatchSlice() -> TokenSlice {
    return self.cachedNoMatch;
  }
  func noMatch() -> TokenSlice {
    return self.getNoMatchSlice();
  }
  func isInRange(value : Int, minValue : Int, maxValue : Int) -> Bool {
    if ( value < minValue ) {
      return false;
    }
    if ( value > maxValue ) {
      return false;
    }
    return true;
  }
  func isHour24(value : Int) -> Bool {
    return self.isInRange(value : value, minValue : 0, maxValue : 23);
  }
  func isMinuteSecond(value : Int) -> Bool {
    return self.isInRange(value : value, minValue : 0, maxValue : 59);
  }
  func isHour12(value : Int) -> Bool {
    return self.isInRange(value : value, minValue : 1, maxValue : 12);
  }
  func detect(slice : TokenSlice) -> TokenSlice {
    return self.noMatch();
  }
}
func ==(l: KeywordDetector, r: KeywordDetector) -> Bool {
  return l === r
}
class KeywordDetector : TokenDetector { 
  var keyword : String = ""
  init(token : String, noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.keyword = token;
    self.detectedTag = "keyword";
  }
  class func create(token : String) -> KeywordDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return KeywordDetector(token : token, noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let kLen : Int = self.keyword.count
    if ( kLen == 0 ) {
      return self.noMatch();
    }
    let size : Int = (slice).length()
    if ( size < kLen ) {
      return self.noMatch();
    }
    let head : String = (slice.read(count : kLen)).toString()
    if ( head == self.keyword ) {
      let matched : TokenSlice = slice.read(count : kLen)
      matched.tag = self.detectedTag;
      return matched;
    }
    return self.noMatch();
  }
}
func ==(l: DateTimeDetector, r: DateTimeDetector) -> Bool {
  return l === r
}
class DateTimeDetector : TokenDetector { 
  var sliceMap : [TokenSlice:DateTimeValue] = [TokenSlice:DateTimeValue]()
  var sliceHitMap : [TokenSlice:TokenSlice] = [TokenSlice:TokenSlice]()
  var parseDateShapeCalls : Int = 0
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "datetime";
  }
  override class func create() -> DateTimeDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return DateTimeDetector(noMatchSlice : s);
  }
  func parseToMap(slice : TokenSlice) -> TokenSlice {
    if ( self.sliceMap[slice] != nil ) {
      let cachedHit : TokenSlice? = self.sliceHitMap[slice]
      if ( cachedHit != nil  ) {
        let hit : TokenSlice = cachedHit!
        let cachedVal : DateTimeValue? = self.sliceMap[slice]
        if ( cachedVal != nil  ) {
          let payload : SliceParsedValue = SliceParsedValue.fromDateTime(value : (cachedVal!))
          hit.setSliceValue(value : payload)
          slice.setSliceValue(value : payload)
        }
        return hit;
      }
      return self.noMatch();
    }
    let newSlice : TokenSlice = self.parseDateShape(slice : slice)
    return newSlice;
  }
  func getParseDateShapeCalls() -> Int {
    return self.parseDateShapeCalls;
  }
  func hasCachedValue(slice : TokenSlice) -> Bool {
    return self.sliceMap[slice] != nil;
  }
  func parseDateShape(slice : TokenSlice) -> TokenSlice {
    self.parseDateShapeCalls = self.parseDateShapeCalls + 1;
    if ( slice.hasInteger(from : 0, to : 3) ) {
    } else {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 4) != 45 ) {
      return self.noMatch();
    }
    var plen : Int = 0
    let out : DateTimeValue = DateTimeValue()
    out.year = slice.parseInteger(from : 0, to : 3);
    if ( slice.hasInteger(from : 5, to : 6) ) {
      out.month = slice.parseInteger(from : 5, to : 6);
    } else {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 7) != 45 ) {
      return self.noMatch();
    }
    if ( slice.hasInteger(from : 8, to : 9) ) {
      out.day = slice.parseInteger(from : 8, to : 9);
    } else {
      return self.noMatch();
    }
    if ( out.month < 1 ) {
      return self.noMatch();
    }
    if ( out.month > 12 ) {
      return self.noMatch();
    }
    if ( out.day < 1 ) {
      return self.noMatch();
    }
    if ( out.day > 31 ) {
      return self.noMatch();
    }
    plen = 10;
    if ( slice.charCodeAt(index : 10) == 84 ) {
      if ( slice.hasInteger(from : 11, to : 12) ) {
        out.hour = slice.parseInteger(from : 11, to : 12);
      } else {
        return self.noMatch();
      }
      if ( slice.charCodeAt(index : 13) != 58 ) {
        return self.noMatch();
      }
      if ( slice.hasInteger(from : 14, to : 15) ) {
        out.minute = slice.parseInteger(from : 14, to : 15);
      } else {
        return self.noMatch();
      }
      if ( false == self.isHour24(value : out.hour) ) {
        return self.noMatch();
      }
      if ( false == self.isMinuteSecond(value : out.minute) ) {
        return self.noMatch();
      }
      var idx : Int = 16
      if ( ((slice).length() >= 19) && (slice.charCodeAt(index : 16) == 58) ) {
        out.second = slice.parseInteger(from : 17, to : 18);
        if ( false == self.isMinuteSecond(value : out.second) ) {
          return self.noMatch();
        }
        idx = 19;
      }
      if ( idx < (slice).length() ) {
        let tzCh : Int = slice.charCodeAt(index : idx)
        if ( tzCh == 90 ) {
          out.timezone = "Z";
          idx = idx + 1;
        }
        if ( (tzCh == 43) || (tzCh == 45) ) {
          if ( (idx + 6) <= (slice).length() ) {
            if ( slice.hasInteger(from : (idx + 1), to : (idx + 2)) ) {
            } else {
              return self.noMatch();
            }
            if ( slice.charCodeAt(index : (idx + 3)) != 58 ) {
              return self.noMatch();
            }
            if ( slice.hasInteger(from : (idx + 4), to : (idx + 5)) ) {
            } else {
              return self.noMatch();
            }
            let tzHour : Int = slice.parseInteger(from : (idx + 1), to : (idx + 2))
            let tzMin : Int = slice.parseInteger(from : (idx + 4), to : (idx + 5))
            if ( false == self.isHour24(value : tzHour) ) {
              return self.noMatch();
            }
            if ( false == self.isMinuteSecond(value : tzMin) ) {
              return self.noMatch();
            }
            let tzSlice : TokenSlice = slice.read(count : (idx + 6))
            out.timezone = (tzSlice.peek(offset : idx)).toString();
            idx = idx + 6;
          }
        }
      }
      plen = idx;
    }
    let newSlice : TokenSlice = slice.read(count : plen)
    newSlice.tag = self.detectedTag;
    let payload2 : SliceParsedValue = SliceParsedValue.fromDateTime(value : out)
    newSlice.setSliceValue(value : payload2)
    slice.setSliceValue(value : payload2)
    self.sliceMap[newSlice] = out;
    self.sliceMap[slice] = out;
    self.sliceHitMap[newSlice] = newSlice;
    self.sliceHitMap[slice] = newSlice;
    return newSlice;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    return self.parseToMap(slice : slice);
  }
}
func ==(l: SpaceDetector, r: SpaceDetector) -> Bool {
  return l === r
}
class SpaceDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "space";
  }
  override class func create() -> SpaceDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return SpaceDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( (slice).length() == 0 ) {
      return self.noMatch();
    }
    let i : Int = slice.findWhitespaceEnd(from : 0)
    if ( i == 0 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : i)
    out.tag = self.detectedTag;
    return out;
  }
}
func ==(l: NewlineDetector, r: NewlineDetector) -> Bool {
  return l === r
}
class NewlineDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "newline";
  }
  override class func create() -> NewlineDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return NewlineDetector(noMatchSlice : s);
  }
  func isNewline(ch : Int) -> Bool {
    if ( ch == 10 ) {
      return true;
    }
    if ( ch == 13 ) {
      return true;
    }
    return false;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( (slice).length() == 0 ) {
      return self.noMatch();
    }
    var i : Int = 0
    while (i < (slice).length()) {
      let ch : Int = slice.charCodeAt(index : i)
      if ( self.isNewline(ch : ch) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == 0 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : i)
    out.tag = self.detectedTag;
    return out;
  }
}
func ==(l: PositiveIntegerDetector, r: PositiveIntegerDetector) -> Bool {
  return l === r
}
class PositiveIntegerDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "positive-integer";
  }
  override class func create() -> PositiveIntegerDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return PositiveIntegerDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( (slice).length() == 0 ) {
      return self.noMatch();
    }
    var i : Int = 0
    var hasNonZero : Bool = false
    while (i < (slice).length()) {
      if ( slice.isDigitAt(index : i) ) {
        if ( slice.digitAt(index : i) != 0 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == 0 ) {
      return self.noMatch();
    }
    if ( hasNonZero ) {
    } else {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : i)
    out.tag = self.detectedTag;
    let v : PositiveIntegerValue = PositiveIntegerValue()
    v.value = out.parseInteger(from : 0, to : (i - 1));
    let payload : SliceParsedValue = SliceParsedValue.fromPositiveInteger(value : v)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: DecimalNumberDetector, r: DecimalNumberDetector) -> Bool {
  return l === r
}
class DecimalNumberDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "decimal-number";
  }
  override class func create() -> DecimalNumberDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return DecimalNumberDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len == 0 ) {
      return self.noMatch();
    }
    var i : Int = 0
    while (i < __len) {
      if ( slice.isDigitAt(index : i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == 0 ) {
      return self.noMatch();
    }
    if ( i >= __len ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : i) != 46 ) {
      return self.noMatch();
    }
    var j : Int = i + 1
    while (j < __len) {
      if ( slice.isDigitAt(index : j) ) {
        j = j + 1;
      } else {
        break;
      }
    }
    if ( j == (i + 1) ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : j)
    out.tag = self.detectedTag;
    return out;
  }
}
func ==(l: TimeValueDetector, r: TimeValueDetector) -> Bool {
  return l === r
}
class TimeValueDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "time-value";
  }
  override class func create() -> TimeValueDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return TimeValueDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( (slice).length() < 5 ) {
      return self.noMatch();
    }
    if ( slice.hasInteger(from : 0, to : 1) ) {
    } else {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 2) != 58 ) {
      return self.noMatch();
    }
    if ( slice.hasInteger(from : 3, to : 4) ) {
    } else {
      return self.noMatch();
    }
    let hour : Int = slice.parseInteger(from : 0, to : 1)
    let minute : Int = slice.parseInteger(from : 3, to : 4)
    if ( false == self.isHour24(value : hour) ) {
      return self.noMatch();
    }
    if ( false == self.isMinuteSecond(value : minute) ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : 5)
    out.tag = self.detectedTag;
    let tv : TimeValueValue = TimeValueValue()
    tv.minutes = hour;
    tv.seconds = minute;
    let payload : SliceParsedValue = SliceParsedValue.fromTimeValue(value : tv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: DistanceDetector, r: DistanceDetector) -> Bool {
  return l === r
}
class DistanceDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "distance";
  }
  override class func create() -> DistanceDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return DistanceDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 2 ) {
      return self.noMatch();
    }
    let valueLen : Int = slice.findNumberEnd(from : 0)
    if ( valueLen <= 0 ) {
      return self.noMatch();
    }
    if ( (valueLen + 1) > __len ) {
      return self.noMatch();
    }
    if ( slice.hasInteger(from : 0, to : (valueLen - 1)) ) {
    } else {
      return self.noMatch();
    }
    let parsed : Int = slice.parseInteger(from : 0, to : (valueLen - 1))
    if ( parsed <= 0 ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : valueLen) != 109 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : (valueLen + 1))
    out.tag = self.detectedTag;
    let dv : DistanceValue = DistanceValue()
    dv.value = parsed;
    dv.unit = "m";
    let payload : SliceParsedValue = SliceParsedValue.fromDistance(value : dv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: RecoveryTimeDetector, r: RecoveryTimeDetector) -> Bool {
  return l === r
}
class RecoveryTimeDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "recovery-time";
  }
  override class func create() -> RecoveryTimeDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return RecoveryTimeDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 3 ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 0) != 47 ) {
      return self.noMatch();
    }
    var i : Int = 1
    var hasNonZero : Bool = false
    while (i < __len) {
      if ( slice.isDigitAt(index : i) ) {
        if ( slice.digitAt(index : i) != 0 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == 1 ) {
      return self.noMatch();
    }
    if ( hasNonZero ) {
    } else {
      return self.noMatch();
    }
    if ( i >= __len ) {
      return self.noMatch();
    }
    let unit : Int = slice.charCodeAt(index : i)
    if ( (unit == 115) || (unit == 109) ) {
    } else {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : (i + 1))
    out.tag = self.detectedTag;
    let slashToken : TokenSlice = slice.read(count : 1)
    slashToken.tag = "keyword";
    out.addChild(child : slashToken)
    let valueToken : TokenSlice = (slice.peek(offset : 1)).read(count : (i - 1))
    valueToken.tag = "positive-integer";
    let piv : PositiveIntegerValue = PositiveIntegerValue()
    piv.value = valueToken.parseInteger(from : 0, to : ((valueToken).length() - 1));
    let parsedValue : SliceParsedValue = SliceParsedValue.fromPositiveInteger(value : piv)
    valueToken.setSliceValue(value : parsedValue)
    out.addChild(child : valueToken)
    let unitToken : TokenSlice = (slice.peek(offset : i)).read(count : 1)
    unitToken.tag = "keyword";
    out.addChild(child : unitToken)
    let rv : RecoveryTimeValue = RecoveryTimeValue()
    rv.value = ((slice.read(count : i)).peek(offset : 1)).parseInteger(from : 0, to : (i - 2));
    if ( unit == 115 ) {
      rv.unit = "s";
    } else {
      rv.unit = "m";
    }
    let payload : SliceParsedValue = SliceParsedValue.fromRecoveryTime(value : rv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: AMTimeValueDetector, r: AMTimeValueDetector) -> Bool {
  return l === r
}
class AMTimeValueDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "am-time";
  }
  override class func create() -> AMTimeValueDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return AMTimeValueDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 3 ) {
      return self.noMatch();
    }
    let i : Int = slice.findNumberEnd(from : 0)
    if ( i <= 0 ) {
      return self.noMatch();
    }
    if ( (i + 1) >= __len ) {
      return self.noMatch();
    }
    let valuePart : TokenSlice = slice.read(count : i)
    if ( valuePart.hasInteger(from : 0, to : (i - 1)) ) {
    } else {
      return self.noMatch();
    }
    let hour : Int = valuePart.parseInteger(from : 0, to : (i - 1))
    if ( false == self.isHour12(value : hour) ) {
      return self.noMatch();
    }
    let c1 : Int = slice.charCodeAt(index : i)
    let c2 : Int = slice.charCodeAt(index : (i + 1))
    if ( ((c1 == 65) && (c2 == 77)) || ((c1 == 80) && (c2 == 77)) ) {
      let out : TokenSlice = slice.read(count : (i + 2))
      out.tag = self.detectedTag;
      return out;
    }
    return self.noMatch();
  }
}
func ==(l: PercentageDetector, r: PercentageDetector) -> Bool {
  return l === r
}
class PercentageDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "percentage";
  }
  override class func create() -> PercentageDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return PercentageDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 2 ) {
      return self.noMatch();
    }
    let vLen : Int = slice.findNumberEnd(from : 0)
    if ( vLen <= 0 ) {
      return self.noMatch();
    }
    if ( (vLen + 1) > __len ) {
      return self.noMatch();
    }
    if ( slice.hasInteger(from : 0, to : (vLen - 1)) ) {
    } else {
      return self.noMatch();
    }
    let v : Int = slice.parseInteger(from : 0, to : (vLen - 1))
    if ( v <= 0 ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : vLen) != 37 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : (vLen + 1))
    out.tag = self.detectedTag;
    let pv : PercentageValue = PercentageValue()
    pv.value = v;
    let payload : SliceParsedValue = SliceParsedValue.fromPercentage(value : pv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: Parser, r: Parser) -> Bool {
  return l === r
}
class Parser : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var source : String = ""
  var slice : TokenSlice?
  var detectors : [TokenDetector] = [TokenDetector]()
  var parserdResults : [TokenSlice] = [TokenSlice]()
  init(source : String, detectors : [TokenDetector] ) {
    self.source = source;
    self.detectors = detectors;
    self.slice = TokenSlice(text : source, from : 0, length : source.count);
    self.parserdResults.removeAll()
  }
  func start() -> Void {
    var activeSlice : TokenSlice = TokenSlice(text : self.source, from : 0, length : self.source.count)
    while ((activeSlice).length() > 0) {
      var advance : Int = 0
      var i : Int = 0
      while (i < (self.detectors.count)) {
        let detector : TokenDetector = self.detectors[i]
        let result : TokenSlice = detector.detect(slice : activeSlice)
        if ( result.isEmpty() ) {
        } else {
          if ( result.tag == "space" ) {
          } else {
            if ( result.tag == "newline" ) {
            } else {
              self.parserdResults.append(result)
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
        activeSlice = activeSlice.peek(offset : advance);
      }
    }
  }
  func getResults() -> [TokenSlice] {
    return self.parserdResults;
  }
  func getCount() -> Int {
    return self.parserdResults.count;
  }
}
func ==(l: WeightDetector, r: WeightDetector) -> Bool {
  return l === r
}
class WeightDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "weight";
  }
  override class func create() -> WeightDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return WeightDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 3 ) {
      return self.noMatch();
    }
    var detectors : [TokenDetector] = [TokenDetector]()
    detectors.append(PositiveIntegerDetector.create())
    detectors.append(KeywordDetector.create(token : "kg"))
    let p : Parser = Parser(source : (slice).toString(), detectors : detectors)
    (p).start();
    if ( p.getCount() != 2 ) {
      return self.noMatch();
    }
    var parts : [TokenSlice] = p.getResults()
    let first : TokenSlice = parts[0]
    let second : TokenSlice = parts[1]
    if ( false == (first.tag == "positive-integer") ) {
      return self.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return self.noMatch();
    }
    if ( false == second.strEquals(value : "kg") ) {
      return self.noMatch();
    }
    let outLen : Int = (first).length() + (second).length()
    let out : TokenSlice = slice.read(count : outLen)
    out.tag = self.detectedTag;
    out.addChild(child : first)
    out.addChild(child : second)
    let firstLen : Int = (first).length()
    let wv : WeightValue = WeightValue()
    wv.value = first.parseInteger(from : 0, to : (firstLen - 1));
    wv.unit = "kg";
    let payload : SliceParsedValue = SliceParsedValue.fromWeight(value : wv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: NumRangeBlockDetector, r: NumRangeBlockDetector) -> Bool {
  return l === r
}
class NumRangeBlockDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "num-range";
  }
  override class func create() -> NumRangeBlockDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return NumRangeBlockDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 3 ) {
      return self.noMatch();
    }
    var i : Int = slice.findWhitespaceEnd(from : 0)
    let leftStart : Int = i
    while (i < __len) {
      if ( slice.isDigitAt(index : i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    let leftEnd : Int = i
    if ( leftEnd <= leftStart ) {
      return self.noMatch();
    }
    i = slice.findWhitespaceEnd(from : i);
    if ( (i >= __len) || (slice.charCodeAt(index : i) != 45) ) {
      return self.noMatch();
    }
    i = i + 1;
    i = slice.findWhitespaceEnd(from : i);
    let rightStart : Int = i
    while (i < __len) {
      if ( slice.isDigitAt(index : i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    let rightEnd : Int = i
    if ( rightEnd <= rightStart ) {
      return self.noMatch();
    }
    let left : TokenSlice = (slice.peek(offset : leftStart)).read(count : (leftEnd - leftStart))
    let right : TokenSlice = (slice.peek(offset : rightStart)).read(count : (rightEnd - rightStart))
    if ( false == left.hasInteger(from : 0, to : ((left).length() - 1)) ) {
      return self.noMatch();
    }
    if ( false == right.hasInteger(from : 0, to : ((right).length() - 1)) ) {
      return self.noMatch();
    }
    let lval : Int = left.parseInteger(from : 0, to : ((left).length() - 1))
    let rval : Int = right.parseInteger(from : 0, to : ((right).length() - 1))
    if ( lval <= 0 ) {
      return self.noMatch();
    }
    if ( rval <= 0 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : rightEnd)
    out.tag = self.detectedTag;
    let nv : NumRangeValue = NumRangeValue()
    nv.minValue = lval;
    nv.maxValue = rval;
    let payload : SliceParsedValue = SliceParsedValue.fromNumRange(value : nv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: SetRepRangeLoadDetector, r: SetRepRangeLoadDetector) -> Bool {
  return l === r
}
class SetRepRangeLoadDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "set-rep-range-load";
  }
  override class func create() -> SetRepRangeLoadDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return SetRepRangeLoadDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 9 ) {
      return self.noMatch();
    }
    var i : Int = 0
    while (i < __len) {
      if ( slice.isDigitAt(index : i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    let setsLeftEnd : Int = i
    if ( setsLeftEnd <= 0 ) {
      return self.noMatch();
    }
    let setsLeft : TokenSlice = slice.read(count : setsLeftEnd)
    if ( false == setsLeft.hasInteger(from : 0, to : ((setsLeft).length() - 1)) ) {
      return self.noMatch();
    }
    let setsSingleVal : Int = setsLeft.parseInteger(from : 0, to : ((setsLeft).length() - 1))
    if ( setsSingleVal <= 0 ) {
      return self.noMatch();
    }
    if ( i >= __len ) {
      return self.noMatch();
    }
    var setsMinVal : Int = 0
    var setsMaxVal : Int = 0
    var repsMinVal : Int = 0
    var repsMaxVal : Int = 0
    var countVal : Int = 1
    let firstSep : Int = slice.charCodeAt(index : i)
    if ( firstSep == 45 ) {
      i = i + 1;
      let setsRightStart : Int = i
      while (i < __len) {
        if ( slice.isDigitAt(index : i) ) {
          i = i + 1;
        } else {
          break;
        }
      }
      let setsRightEnd : Int = i
      if ( setsRightEnd <= setsRightStart ) {
        return self.noMatch();
      }
      if ( (i >= __len) || (slice.charCodeAt(index : i) != 120) ) {
        return self.noMatch();
      }
      i = i + 1;
      let repsLeftStart : Int = i
      while (i < __len) {
        if ( slice.isDigitAt(index : i) ) {
          i = i + 1;
        } else {
          break;
        }
      }
      let repsLeftEnd : Int = i
      if ( repsLeftEnd <= repsLeftStart ) {
        return self.noMatch();
      }
      if ( (i >= __len) || (slice.charCodeAt(index : i) != 45) ) {
        return self.noMatch();
      }
      i = i + 1;
      let repsRightStart : Int = i
      while (i < __len) {
        if ( slice.isDigitAt(index : i) ) {
          i = i + 1;
        } else {
          break;
        }
      }
      let repsRightEnd : Int = i
      if ( repsRightEnd <= repsRightStart ) {
        return self.noMatch();
      }
      let setsRight : TokenSlice = (slice.peek(offset : setsRightStart)).read(count : (setsRightEnd - setsRightStart))
      let repsLeft : TokenSlice = (slice.peek(offset : repsLeftStart)).read(count : (repsLeftEnd - repsLeftStart))
      let repsRight : TokenSlice = (slice.peek(offset : repsRightStart)).read(count : (repsRightEnd - repsRightStart))
      if ( false == setsRight.hasInteger(from : 0, to : ((setsRight).length() - 1)) ) {
        return self.noMatch();
      }
      if ( false == repsLeft.hasInteger(from : 0, to : ((repsLeft).length() - 1)) ) {
        return self.noMatch();
      }
      if ( false == repsRight.hasInteger(from : 0, to : ((repsRight).length() - 1)) ) {
        return self.noMatch();
      }
      setsMinVal = setsSingleVal;
      setsMaxVal = setsRight.parseInteger(from : 0, to : ((setsRight).length() - 1));
      repsMinVal = repsLeft.parseInteger(from : 0, to : ((repsLeft).length() - 1));
      repsMaxVal = repsRight.parseInteger(from : 0, to : ((repsRight).length() - 1));
    } else {
      if ( firstSep == 120 ) {
        i = i + 1;
        let repsLeftStart2 : Int = i
        while (i < __len) {
          if ( slice.isDigitAt(index : i) ) {
            i = i + 1;
          } else {
            break;
          }
        }
        let repsLeftEnd2 : Int = i
        if ( repsLeftEnd2 <= repsLeftStart2 ) {
          return self.noMatch();
        }
        if ( (i < __len) && (slice.charCodeAt(index : i) == 45) ) {
          i = i + 1;
          let repsRightStart3 : Int = i
          while (i < __len) {
            if ( slice.isDigitAt(index : i) ) {
              i = i + 1;
            } else {
              break;
            }
          }
          let repsRightEnd3 : Int = i
          if ( repsRightEnd3 <= repsRightStart3 ) {
            return self.noMatch();
          }
          if ( (i >= __len) || (slice.charCodeAt(index : i) != 120) ) {
            return self.noMatch();
          }
          let repsLeftRange : TokenSlice = (slice.peek(offset : repsLeftStart2)).read(count : (repsLeftEnd2 - repsLeftStart2))
          let repsRightRange : TokenSlice = (slice.peek(offset : repsRightStart3)).read(count : (repsRightEnd3 - repsRightStart3))
          if ( false == repsLeftRange.hasInteger(from : 0, to : ((repsLeftRange).length() - 1)) ) {
            return self.noMatch();
          }
          if ( false == repsRightRange.hasInteger(from : 0, to : ((repsRightRange).length() - 1)) ) {
            return self.noMatch();
          }
          setsMinVal = setsSingleVal;
          setsMaxVal = setsSingleVal;
          repsMinVal = repsLeftRange.parseInteger(from : 0, to : ((repsLeftRange).length() - 1));
          repsMaxVal = repsRightRange.parseInteger(from : 0, to : ((repsRightRange).length() - 1));
        } else {
          if ( (i >= __len) || (slice.charCodeAt(index : i) != 120) ) {
            return self.noMatch();
          }
          i = i + 1;
          let repsRightStart2 : Int = i
          while (i < __len) {
            if ( slice.isDigitAt(index : i) ) {
              i = i + 1;
            } else {
              break;
            }
          }
          let repsRightEnd2 : Int = i
          if ( repsRightEnd2 <= repsRightStart2 ) {
            return self.noMatch();
          }
          let setsMid : TokenSlice = (slice.peek(offset : repsLeftStart2)).read(count : (repsLeftEnd2 - repsLeftStart2))
          let repsExact : TokenSlice = (slice.peek(offset : repsRightStart2)).read(count : (repsRightEnd2 - repsRightStart2))
          if ( false == setsMid.hasInteger(from : 0, to : ((setsMid).length() - 1)) ) {
            return self.noMatch();
          }
          if ( false == repsExact.hasInteger(from : 0, to : ((repsExact).length() - 1)) ) {
            return self.noMatch();
          }
          setsMinVal = setsMid.parseInteger(from : 0, to : ((setsMid).length() - 1));
          setsMaxVal = setsMinVal;
          repsMinVal = repsExact.parseInteger(from : 0, to : ((repsExact).length() - 1));
          repsMaxVal = repsMinVal;
          countVal = setsSingleVal;
        }
      } else {
        return self.noMatch();
      }
    }
    if ( setsMinVal <= 0 ) {
      return self.noMatch();
    }
    if ( setsMaxVal <= 0 ) {
      return self.noMatch();
    }
    if ( repsMinVal <= 0 ) {
      return self.noMatch();
    }
    if ( repsMaxVal <= 0 ) {
      return self.noMatch();
    }
    if ( i >= __len ) {
      return self.noMatch();
    }
    let mode : Int = slice.charCodeAt(index : i)
    var modeText : String = ""
    var loadVal : Int = 0
    var unitText : String = ""
    if ( mode == 64 ) {
      modeText = "bw";
      unitText = "bw";
      i = i + 1;
      if ( (i + 1) >= __len ) {
        return self.noMatch();
      }
      if ( slice.charCodeAt(index : i) != 98 ) {
        return self.noMatch();
      }
      if ( slice.charCodeAt(index : (i + 1)) != 119 ) {
        return self.noMatch();
      }
      i = i + 2;
    } else {
      if ( mode == 120 ) {
        modeText = "kg";
        i = i + 1;
        let loadStart : Int = i
        while (i < __len) {
          if ( slice.isDigitAt(index : i) ) {
            i = i + 1;
          } else {
            break;
          }
        }
        if ( i <= loadStart ) {
          return self.noMatch();
        }
        let loadDigits : TokenSlice = (slice.peek(offset : loadStart)).read(count : (i - loadStart))
        if ( loadDigits.hasInteger(from : 0, to : ((loadDigits).length() - 1)) ) {
        } else {
          return self.noMatch();
        }
        loadVal = loadDigits.parseInteger(from : 0, to : ((loadDigits).length() - 1));
        if ( loadVal <= 0 ) {
          return self.noMatch();
        }
        if ( (i + 1) >= __len ) {
          return self.noMatch();
        }
        if ( slice.charCodeAt(index : i) != 107 ) {
          return self.noMatch();
        }
        if ( slice.charCodeAt(index : (i + 1)) != 103 ) {
          return self.noMatch();
        }
        unitText = "kg";
        i = i + 2;
      } else {
        return self.noMatch();
      }
    }
    if ( i < __len ) {
      if ( slice.isAlphaNumAt(index : i) ) {
        return self.noMatch();
      }
    }
    let out : TokenSlice = slice.read(count : i)
    out.tag = self.detectedTag;
    let sv : SetRepRangeLoadValue = SetRepRangeLoadValue()
    sv.count = countVal;
    sv.setsMin = setsMinVal;
    sv.setsMax = setsMaxVal;
    sv.repsMin = repsMinVal;
    sv.repsMax = repsMaxVal;
    sv.mode = modeText;
    sv.load = loadVal;
    sv.unit = unitText;
    let payload : SliceParsedValue = SliceParsedValue.fromSetRepRangeLoad(value : sv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: RepeatBlockDetector, r: RepeatBlockDetector) -> Bool {
  return l === r
}
class RepeatBlockDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "repeat-block";
  }
  override class func create() -> RepeatBlockDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return RepeatBlockDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 2 ) {
      return self.noMatch();
    }
    var i : Int = 0
    var hasNonZero : Bool = false
    while (i < __len) {
      if ( slice.isDigitAt(index : i) ) {
        if ( slice.digitAt(index : i) != 0 ) {
          hasNonZero = true;
        }
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == 0 ) {
      return self.noMatch();
    }
    if ( hasNonZero ) {
    } else {
      return self.noMatch();
    }
    if ( i >= __len ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : i) != 120 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : (i + 1))
    out.tag = self.detectedTag;
    let countSlice : TokenSlice = slice.read(count : i)
    let rv : RepeatBlockValue = RepeatBlockValue()
    rv.count = countSlice.parseInteger(from : 0, to : (i - 1));
    let payload : SliceParsedValue = SliceParsedValue.fromRepeatBlock(value : rv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: SpeedDetector, r: SpeedDetector) -> Bool {
  return l === r
}
class SpeedDetector : TokenDetector { 
  var distanceDetector : DistanceDetector?
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "speed";
    self.distanceDetector = DistanceDetector.create();
  }
  override class func create() -> SpeedDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return SpeedDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 7 ) {
      return self.noMatch();
    }
    let colonPos : Int = slice.findNumberEnd(from : 0)
    if ( colonPos <= 0 ) {
      return self.noMatch();
    }
    if ( (colonPos + 4) > __len ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : colonPos) != 58 ) {
      return self.noMatch();
    }
    let slashPos : Int = colonPos + 3
    if ( slice.charCodeAt(index : slashPos) != 47 ) {
      return self.noMatch();
    }
    let left : TokenSlice = slice.read(count : slashPos)
    if ( false == left.hasInteger(from : 0, to : (colonPos - 1)) ) {
      return self.noMatch();
    }
    if ( false == left.hasInteger(from : (colonPos + 1), to : (colonPos + 2)) ) {
      return self.noMatch();
    }
    let sec : Int = left.parseInteger(from : (colonPos + 1), to : (colonPos + 2))
    if ( false == self.isMinuteSecond(value : sec) ) {
      return self.noMatch();
    }
    let rightStart : TokenSlice = slice.peek(offset : (slashPos + 1))
    let dist : TokenSlice = self.distanceDetector!.detect(slice : rightStart)
    if ( dist.isEmpty() ) {
      return self.noMatch();
    }
    if ( false == (dist.tag == "distance") ) {
      return self.noMatch();
    }
    let first : TokenSlice = left
    first.tag = "time-value";
    let tv : TimeValueValue = TimeValueValue()
    tv.minutes = left.parseInteger(from : 0, to : (colonPos - 1));
    tv.seconds = sec;
    let firstParsed : SliceParsedValue = SliceParsedValue.fromTimeValue(value : tv)
    first.setSliceValue(value : firstParsed)
    let second : TokenSlice = (slice.peek(offset : slashPos)).read(count : 1)
    second.tag = "keyword";
    let third : TokenSlice = dist
    if ( false == (second.tag == "keyword") ) {
      return self.noMatch();
    }
    if ( false == second.strEquals(value : "/") ) {
      return self.noMatch();
    }
    if ( false == (third.tag == "distance") ) {
      return self.noMatch();
    }
    let outLen : Int = ((first).length() + (second).length()) + (third).length()
    let out : TokenSlice = slice.read(count : outLen)
    out.tag = self.detectedTag;
    out.addChild(child : first)
    out.addChild(child : second)
    out.addChild(child : third)
    return out;
  }
}
func ==(l: ZoneDetector, r: ZoneDetector) -> Bool {
  return l === r
}
class ZoneDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "zone";
  }
  override class func create() -> ZoneDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return ZoneDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( slice.hasToken(token : "Zone") ) {
    } else {
      return self.noMatch();
    }
    let __len : Int = (slice).length()
    if ( __len <= 4 ) {
      return self.noMatch();
    }
    var i : Int = 4
    if ( (i < __len) && (slice.charCodeAt(index : i) == 32) ) {
      i = i + 1;
    }
    if ( i >= __len ) {
      return self.noMatch();
    }
    let startDigits : Int = i
    while (i < __len) {
      if ( slice.isDigitAt(index : i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i == startDigits ) {
      return self.noMatch();
    }
    let zoneDigits : TokenSlice = (slice.peek(offset : startDigits)).read(count : (i - startDigits))
    if ( zoneDigits.hasInteger(from : 0, to : ((zoneDigits).length() - 1)) ) {
    } else {
      return self.noMatch();
    }
    let zoneNum : Int = zoneDigits.parseInteger(from : 0, to : ((zoneDigits).length() - 1))
    if ( (zoneNum < 1) || (zoneNum > 5) ) {
      return self.noMatch();
    }
    if ( i < __len ) {
      if ( slice.isAlphaNumAt(index : i) ) {
        return self.noMatch();
      }
    }
    let out : TokenSlice = slice.read(count : i)
    out.tag = self.detectedTag;
    let zv : ZoneValue = ZoneValue()
    zv.zone = zoneNum;
    let payload : SliceParsedValue = SliceParsedValue.fromZone(value : zv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: NGChildDetectorRegistry, r: NGChildDetectorRegistry) -> Bool {
  return l === r
}
class NGChildDetectorRegistry : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var recoveryChildDetectors : [TokenDetector] = [TokenDetector]()
  var leftRightChildDetectors : [TokenDetector] = [TokenDetector]()
  private static var __singleton_instance : NGChildDetectorRegistry? = nil
  class func __singleton() -> NGChildDetectorRegistry {
    if (NGChildDetectorRegistry.__singleton_instance == nil) {
      NGChildDetectorRegistry.__singleton_instance = NGChildDetectorRegistry()
    }
    return NGChildDetectorRegistry.__singleton_instance!
  }
  func getRecoveryChildDetectors() -> [TokenDetector] {
    if ( (self.recoveryChildDetectors.count) > 0 ) {
      return self.recoveryChildDetectors;
    }
    var ds : [TokenDetector] = [TokenDetector]()
    ds.append(DistanceDetector.create())
    ds.append(RecoveryTimeDetector.create())
    ds.append(TimeValueDetector.create())
    ds.append(AMTimeValueDetector.create())
    ds.append(PercentageDetector.create())
    ds.append(WeightDetector.create())
    ds.append(NumRangeBlockDetector.create())
    ds.append(PositiveIntegerDetector.create())
    ds.append(KeywordDetector.create(token : "min"))
    ds.append(KeywordDetector.create(token : "sec"))
    ds.append(KeywordDetector.create(token : "s"))
    ds.append(KeywordDetector.create(token : "m"))
    self.recoveryChildDetectors = ds;
    return self.recoveryChildDetectors;
  }
  func getLeftRightChildDetectors() -> [TokenDetector] {
    if ( (self.leftRightChildDetectors.count) > 0 ) {
      return self.leftRightChildDetectors;
    }
    var ds : [TokenDetector] = [TokenDetector]()
    ds.append(SetRepRangeLoadDetector.create())
    ds.append(RepeatBlockDetector.create())
    ds.append(WeightDetector.create())
    ds.append(DistanceDetector.create())
    ds.append(SpeedDetector.create())
    ds.append(ZoneDetector.create())
    ds.append(DecimalNumberDetector.create())
    ds.append(PositiveIntegerDetector.create())
    self.leftRightChildDetectors = ds;
    return self.leftRightChildDetectors;
  }
}
func ==(l: RecoveryDetector, r: RecoveryDetector) -> Bool {
  return l === r
}
class RecoveryDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "recovery";
  }
  override class func create() -> RecoveryDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return RecoveryDetector(noMatchSlice : s);
  }
  func createChildDetectors() -> [TokenDetector] {
    let reg : NGChildDetectorRegistry = NGChildDetectorRegistry.__singleton()
    return reg.getRecoveryChildDetectors();
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let key : String = "Recovery"
    let keyLen : Int = key.count
    let __len : Int = (slice).length()
    if ( __len <= keyLen ) {
      return self.noMatch();
    }
    let head : TokenSlice = slice.read(count : keyLen)
    if ( head.strEquals(value : key) ) {
    } else {
      return self.noMatch();
    }
    if ( slice.isAlphaNumAt(index : keyLen) ) {
      return self.noMatch();
    }
    let lineEnd : Int = slice.findLineEnd(from : keyLen)
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    let labelToken : TokenSlice = slice.read(count : keyLen)
    labelToken.tag = "keyword";
    out.addChild(child : labelToken)
    let restStart : Int = slice.findWhitespaceEnd(from : keyLen)
    if ( restStart < lineEnd ) {
      let rest : TokenSlice = (slice.peek(offset : restStart)).read(count : (lineEnd - restStart))
      let p : Parser = Parser(source : (rest).toString(), detectors : self.createChildDetectors())
      (p).start();
      var children : [TokenSlice] = p.getResults()
      for (i, ch) in children.enumerated() {
        out.addChild(child : ch)
      }
    }
    let rv : RecoveryValue = RecoveryValue()
    rv.label = "Recovery";
    let payload : SliceParsedValue = SliceParsedValue.fromRecovery(value : rv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: LeftRightDetector, r: LeftRightDetector) -> Bool {
  return l === r
}
class LeftRightDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "left-right";
  }
  override class func create() -> LeftRightDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return LeftRightDetector(noMatchSlice : s);
  }
  func createChildDetectors() -> [TokenDetector] {
    let reg : NGChildDetectorRegistry = NGChildDetectorRegistry.__singleton()
    return reg.getLeftRightChildDetectors();
  }
  func detectWithSide(slice : TokenSlice, side : String) -> TokenSlice {
    let key : String = side + " "
    if ( slice.hasToken(token : key) ) {
    } else {
      return self.noMatch();
    }
    let keyLen : Int = key.count
    let __len : Int = (slice).length()
    if ( keyLen >= __len ) {
      return self.noMatch();
    }
    let lineEnd : Int = slice.findLineEnd(from : keyLen)
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    let sideToken : TokenSlice = slice.read(count : (side.count))
    sideToken.tag = "keyword";
    out.addChild(child : sideToken)
    let restStart : Int = slice.findWhitespaceEnd(from : keyLen)
    if ( restStart < lineEnd ) {
      let payload : TokenSlice = (slice.peek(offset : restStart)).read(count : (lineEnd - restStart))
      let p : Parser = Parser(source : (payload).toString(), detectors : self.createChildDetectors())
      (p).start();
      var children : [TokenSlice] = p.getResults()
      for (i, ch3) in children.enumerated() {
        out.addChild(child : ch3)
      }
    }
    let lv : LeftRightValue = LeftRightValue()
    lv.side = side;
    let parsed : SliceParsedValue = SliceParsedValue.fromLeftRight(value : lv)
    out.setSliceValue(value : parsed)
    slice.setSliceValue(value : parsed)
    return out;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let left : TokenSlice = self.detectWithSide(slice : slice, side : "Left")
    if ( left.isEmpty() ) {
    } else {
      return left;
    }
    return self.detectWithSide(slice : slice, side : "Right");
  }
}
func ==(l: FeelingDetector, r: FeelingDetector) -> Bool {
  return l === r
}
class FeelingDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "feeling";
  }
  override class func create() -> FeelingDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return FeelingDetector(noMatchSlice : s);
  }
  func parseNumericScore(slice : TokenSlice) -> Int {
    var detectors : [TokenDetector] = [TokenDetector]()
    detectors.append(PositiveIntegerDetector.create())
    let p : Parser = Parser(source : (slice).toString(), detectors : detectors)
    (p).start();
    if ( p.getCount() != 1 ) {
      return -1;
    }
    let scoreToken : TokenSlice = p.getResults()[0]
    if ( scoreToken.tag == "positive-integer" ) {
      return scoreToken.parseInteger(from : 0, to : ((scoreToken).length() - 1));
    }
    return -1;
  }
  func parseSlashTenScore(slice : TokenSlice) -> Int {
    if ( slice.hasToken(token : "?/10") ) {
      return 0;
    }
    let __len : Int = (slice).length()
    var i : Int = 1
    while ((i + 2) < __len) {
      if ( slice.charCodeAt(index : i) == 47 ) {
        if ( (slice.charCodeAt(index : (i + 1)) == 49) && (slice.charCodeAt(index : (i + 2)) == 48) ) {
          var start : Int = i
          while (start > 0) {
            if ( slice.isDigitAt(index : (start - 1)) ) {
              start = start - 1;
            } else {
              break;
            }
          }
          if ( start < i ) {
            let numSlice : TokenSlice = (slice.peek(offset : start)).read(count : (i - start))
            if ( numSlice.hasInteger(from : 0, to : ((numSlice).length() - 1)) ) {
              return numSlice.parseInteger(from : 0, to : ((numSlice).length() - 1));
            }
          }
        }
      }
      i = i + 1;
    }
    return -1;
  }
  func parseKind(slice : TokenSlice) -> String {
    if ( slice.hasToken(token : "Feeling ") ) {
      return "feeling";
    }
    if ( slice.hasToken(token : "Feelings ") ) {
      return "feeling";
    }
    if ( slice.hasToken(token : "Pain ") ) {
      return "pain";
    }
    return "";
  }
  func prefixLength(slice : TokenSlice, kind : String) -> Int {
    if ( kind == "pain" ) {
      return 5;
    }
    if ( slice.hasToken(token : "Feelings ") ) {
      return 9;
    }
    return 8;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let kind : String = self.parseKind(slice : slice)
    if ( (kind.count) == 0 ) {
      return self.noMatch();
    }
    let keyLen : Int = self.prefixLength(slice : slice, kind : kind)
    let __len : Int = (slice).length()
    if ( keyLen >= __len ) {
      return self.noMatch();
    }
    let lineEnd : Int = slice.findLineEnd(from : keyLen)
    let rawSlice : TokenSlice = (slice.peek(offset : keyLen)).read(count : (lineEnd - keyLen))
    var trimStart : Int = 0
    let rawLen : Int = (rawSlice).length()
    while (trimStart < rawLen) {
      let chStart : Int = rawSlice.charCodeAt(index : trimStart)
      if ( rawSlice.isWhitespace(ch : chStart) ) {
        trimStart = trimStart + 1;
      } else {
        break;
      }
    }
    var trimEnd : Int = rawLen
    while (trimEnd > trimStart) {
      let chEnd : Int = rawSlice.charCodeAt(index : (trimEnd - 1))
      if ( rawSlice.isWhitespace(ch : chEnd) ) {
        trimEnd = trimEnd - 1;
      } else {
        break;
      }
    }
    var score : Int = -1
    if ( trimEnd > trimStart ) {
      let valueSlice : TokenSlice = (rawSlice.peek(offset : trimStart)).read(count : (trimEnd - trimStart))
      score = self.parseNumericScore(slice : valueSlice);
      if ( score < 0 ) {
        if ( (kind == "feeling") && valueSlice.hasToken(token : "RPE:") ) {
          if ( (valueSlice).length() > 4 ) {
            let rpeSlice : TokenSlice = (valueSlice.peek(offset : 4)).read(count : ((valueSlice).length() - 4))
            score = self.parseNumericScore(slice : rpeSlice);
          }
        }
      }
      if ( score < 0 ) {
        score = self.parseSlashTenScore(slice : valueSlice);
      }
      if ( score < 0 ) {
        if ( valueSlice.charCodeAt(index : 0) == 124 ) {
          score = 0;
        }
      }
      if ( score < 0 ) {
        if ( (kind == "pain") && valueSlice.hasToken(token : "-|") ) {
          score = 0;
        }
      }
    } else {
      score = 0;
    }
    if ( score < 0 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    var labelLen : Int = keyLen - 1
    if ( labelLen < 1 ) {
      labelLen = 1;
    }
    let label : TokenSlice = slice.read(count : labelLen)
    label.tag = "keyword";
    out.addChild(child : label)
    let scoreToken : TokenSlice = TokenSlice.fromText(text : ("" + String(score)))
    scoreToken.tag = "positive-integer";
    out.addChild(child : scoreToken)
    let fv : FeelingValue = FeelingValue()
    fv.kind = kind;
    fv.score = score;
    let parsed : SliceParsedValue = SliceParsedValue.fromFeeling(value : fv)
    out.setSliceValue(value : parsed)
    slice.setSliceValue(value : parsed)
    return out;
  }
}
func ==(l: EffortDetector, r: EffortDetector) -> Bool {
  return l === r
}
class EffortDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "effort";
  }
  override class func create() -> EffortDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return EffortDetector(noMatchSlice : s);
  }
  func prefixLength(slice : TokenSlice) -> Int {
    if ( slice.hasToken(token : "RPE ") ) {
      return 4;
    }
    return 7;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( slice.hasToken(token : "Effort ") ) {
    } else {
      if ( slice.hasToken(token : "RPE ") ) {
      } else {
        return self.noMatch();
      }
    }
    let keyLen : Int = self.prefixLength(slice : slice)
    let __len : Int = (slice).length()
    if ( keyLen >= __len ) {
      return self.noMatch();
    }
    let lineEnd : Int = slice.findLineEnd(from : keyLen)
    let valueSlice : TokenSlice = (slice.peek(offset : keyLen)).read(count : (lineEnd - keyLen))
    var detectors : [TokenDetector] = [TokenDetector]()
    detectors.append(PositiveIntegerDetector.create())
    let p : Parser = Parser(source : (valueSlice).toString(), detectors : detectors)
    (p).start();
    if ( p.getCount() != 1 ) {
      return self.noMatch();
    }
    let scoreToken : TokenSlice = p.getResults()[0]
    if ( scoreToken.tag == "positive-integer" ) {
    } else {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    var labelLen : Int = keyLen - 1
    if ( labelLen < 1 ) {
      labelLen = 1;
    }
    let label : TokenSlice = slice.read(count : labelLen)
    label.tag = "keyword";
    out.addChild(child : label)
    out.addChild(child : scoreToken)
    let ev : EffortValue = EffortValue()
    ev.score = scoreToken.parseInteger(from : 0, to : ((scoreToken).length() - 1));
    let parsed : SliceParsedValue = SliceParsedValue.fromEffort(value : ev)
    out.setSliceValue(value : parsed)
    slice.setSliceValue(value : parsed)
    return out;
  }
}
func ==(l: BodyMetricDetector, r: BodyMetricDetector) -> Bool {
  return l === r
}
class BodyMetricDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "body-metric";
  }
  override class func create() -> BodyMetricDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return BodyMetricDetector(noMatchSlice : s);
  }
  func findLineEnd(slice : TokenSlice, from : Int) -> Int {
    return slice.findLineEnd(from : from);
  }
  func createMetricSlice(slice : TokenSlice, offset : Int, lineEnd : Int) -> TokenSlice {
    if ( offset >= lineEnd ) {
      return slice.read(count : 0);
    }
    return (slice.peek(offset : offset)).read(count : (lineEnd - offset));
  }
  func parseDoublePrefix(metricSlice : TokenSlice) -> Double {
    let __len : Int = (metricSlice).length()
    var i : Int = 0
    while (i < __len) {
      let ch : Int = metricSlice.charCodeAt(index : i)
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
    if ( metricSlice.hasDouble(from : 0, to : (i - 1)) ) {
      return metricSlice.parseDouble(from : 0, to : (i - 1));
    }
    return -1.0;
  }
  func parseIntegerPrefix(metricSlice : TokenSlice) -> Int {
    let i : Int = metricSlice.findNumberEnd(from : 0)
    if ( i == 0 ) {
      return -1;
    }
    if ( metricSlice.hasInteger(from : 0, to : (i - 1)) ) {
      return metricSlice.parseInteger(from : 0, to : (i - 1));
    }
    return -1;
  }
  func setCommon(out : TokenSlice, source : TokenSlice, value : BodyMetricValue) -> Void {
    let parsed : SliceParsedValue = SliceParsedValue.fromBodyMetric(value : value)
    out.setSliceValue(value : parsed)
    source.setSliceValue(value : parsed)
  }
  func detectSimpleDoubleMetric(slice : TokenSlice, prefix : String, labelLen : Int, metricName : String, unit : String, allowZero : Bool) -> TokenSlice {
    if ( slice.hasToken(token : prefix) ) {
    } else {
      return self.noMatch();
    }
    let prefixLen : Int = prefix.count
    let lineEnd : Int = self.findLineEnd(slice : slice, from : prefixLen)
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    let label : TokenSlice = slice.read(count : labelLen)
    label.tag = "keyword";
    out.addChild(child : label)
    let metric : TokenSlice = self.createMetricSlice(slice : slice, offset : prefixLen, lineEnd : lineEnd)
    let value : Double = self.parseDoublePrefix(metricSlice : metric)
    if ( allowZero ) {
      if ( value < 0.0 ) {
        return self.noMatch();
      }
    } else {
      if ( value <= 0.0 ) {
        return self.noMatch();
      }
    }
    let mv : BodyMetricValue = BodyMetricValue()
    mv.metric = metricName;
    mv.primaryValue = value;
    mv.unit = unit;
    self.setCommon(out : out, source : slice, value : mv)
    return out;
  }
  func detectWeight(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "Weight ", labelLen : 6, metricName : "weight", unit : "kg", allowZero : false);
  }
  func detectBodyFat(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "BodyFat ", labelLen : 7, metricName : "body-fat", unit : "%", allowZero : true);
  }
  func detectSleep(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "Sleep ", labelLen : 5, metricName : "sleep", unit : "h", allowZero : false);
  }
  func detectRestingHr(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "Health resting_hr ", labelLen : 17, metricName : "resting-hr", unit : "bpm", allowZero : false);
  }
  func detectBp(slice : TokenSlice) -> TokenSlice {
    let prefix : String = "Vitals bp "
    if ( slice.hasToken(token : prefix) ) {
    } else {
      return self.noMatch();
    }
    let lineEnd : Int = self.findLineEnd(slice : slice, from : (prefix.count))
    let metric : TokenSlice = self.createMetricSlice(slice : slice, offset : (prefix.count), lineEnd : lineEnd)
    let slashPos : Int = metric.findTokenPos(token : "/")
    if ( (slashPos < 1) || (slashPos >= ((metric).length() - 1)) ) {
      return self.noMatch();
    }
    let left : TokenSlice = metric.read(count : slashPos)
    let right : TokenSlice = (metric.peek(offset : (slashPos + 1))).read(count : (((metric).length() - slashPos) - 1))
    if ( left.hasInteger(from : 0, to : ((left).length() - 1)) ) {
    } else {
      return self.noMatch();
    }
    if ( right.hasInteger(from : 0, to : ((right).length() - 1)) ) {
    } else {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    let label : TokenSlice = slice.read(count : 9)
    label.tag = "keyword";
    out.addChild(child : label)
    let mv : BodyMetricValue = BodyMetricValue()
    mv.metric = "blood-pressure";
    mv.primaryValue = left.parseDouble(from : 0, to : ((left).length() - 1));
    mv.secondaryValue = right.parseInteger(from : 0, to : ((right).length() - 1));
    mv.unit = "mmhg";
    self.setCommon(out : out, source : slice, value : mv)
    return out;
  }
  func detectVitalsWeight(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "Vitals weight:", labelLen : 13, metricName : "weight", unit : "kg", allowZero : false);
  }
  func detectVitalsSleep(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "Vitals sleep:", labelLen : 12, metricName : "sleep", unit : "h", allowZero : false);
  }
  func detectVitalsRhr(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "Vitals rhr:", labelLen : 10, metricName : "resting-hr", unit : "bpm", allowZero : false);
  }
  func detectWaist(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "Waist ", labelLen : 5, metricName : "waist", unit : "cm", allowZero : false);
  }
  func detectHip(slice : TokenSlice) -> TokenSlice {
    return self.detectSimpleDoubleMetric(slice : slice, prefix : "Hip ", labelLen : 3, metricName : "hip", unit : "cm", allowZero : false);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let w : TokenSlice = self.detectWeight(slice : slice)
    if ( w.isEmpty() ) {
    } else {
      return w;
    }
    let bf : TokenSlice = self.detectBodyFat(slice : slice)
    if ( bf.isEmpty() ) {
    } else {
      return bf;
    }
    let sl : TokenSlice = self.detectSleep(slice : slice)
    if ( sl.isEmpty() ) {
    } else {
      return sl;
    }
    let hr : TokenSlice = self.detectRestingHr(slice : slice)
    if ( hr.isEmpty() ) {
    } else {
      return hr;
    }
    let vw : TokenSlice = self.detectVitalsWeight(slice : slice)
    if ( vw.isEmpty() ) {
    } else {
      return vw;
    }
    let vs : TokenSlice = self.detectVitalsSleep(slice : slice)
    if ( vs.isEmpty() ) {
    } else {
      return vs;
    }
    let vr : TokenSlice = self.detectVitalsRhr(slice : slice)
    if ( vr.isEmpty() ) {
    } else {
      return vr;
    }
    let waist : TokenSlice = self.detectWaist(slice : slice)
    if ( waist.isEmpty() ) {
    } else {
      return waist;
    }
    let hip : TokenSlice = self.detectHip(slice : slice)
    if ( hip.isEmpty() ) {
    } else {
      return hip;
    }
    return self.detectBp(slice : slice);
  }
}
func ==(l: CircuitDetector, r: CircuitDetector) -> Bool {
  return l === r
}
class CircuitDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "circuit";
  }
  override class func create() -> CircuitDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return CircuitDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let prefix : String = "Circuit "
    if ( slice.hasToken(token : prefix) ) {
    } else {
      return self.noMatch();
    }
    /** unused:  let __len : Int = (slice).length()   **/ 
    let roundsStart : Int = prefix.count
    let roundsEnd : Int = slice.findNumberEnd(from : roundsStart)
    if ( roundsEnd <= roundsStart ) {
      return self.noMatch();
    }
    let roundsSlice : TokenSlice = (slice.peek(offset : roundsStart)).read(count : (roundsEnd - roundsStart))
    if ( roundsSlice.hasInteger(from : 0, to : ((roundsSlice).length() - 1)) ) {
    } else {
      return self.noMatch();
    }
    let lineEnd : Int = slice.findLineEnd(from : roundsEnd)
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    let circuitToken : TokenSlice = slice.read(count : 7)
    circuitToken.tag = "keyword";
    out.addChild(child : circuitToken)
    let roundsToken : TokenSlice = (slice.peek(offset : roundsStart)).read(count : (roundsEnd - roundsStart))
    roundsToken.tag = "positive-integer";
    out.addChild(child : roundsToken)
    let cv : CircuitValue = CircuitValue()
    cv.rounds = roundsSlice.parseInteger(from : 0, to : ((roundsSlice).length() - 1));
    if ( (roundsEnd < lineEnd) && (slice.charCodeAt(index : roundsEnd) == 47) ) {
      let i : Int = slice.findNumberEnd(from : (roundsEnd + 1))
      if ( i > (roundsEnd + 1) ) {
        var j : Int = i
        while (j < lineEnd) {
          let ch4 : Int = slice.charCodeAt(index : j)
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
          let restToken : TokenSlice = (slice.peek(offset : roundsEnd)).read(count : (j - roundsEnd))
          restToken.tag = "recovery-time";
          out.addChild(child : restToken)
          let vSlice : TokenSlice = (slice.peek(offset : (roundsEnd + 1))).read(count : ((i - roundsEnd) - 1))
          cv.restValue = vSlice.parseInteger(from : 0, to : ((vSlice).length() - 1));
          let unitRaw : String = ((slice.peek(offset : i)).read(count : (j - i))).toString()
          if ( (unitRaw == "min") || (unitRaw == "m") ) {
            cv.restUnit = "min";
          }
          if ( (unitRaw == "sec") || (unitRaw == "s") ) {
            cv.restUnit = "sec";
          }
        }
      }
    }
    let parsed : SliceParsedValue = SliceParsedValue.fromCircuit(value : cv)
    out.setSliceValue(value : parsed)
    slice.setSliceValue(value : parsed)
    return out;
  }
}
func ==(l: NGSharedLists, r: NGSharedLists) -> Bool {
  return l === r
}
class NGSharedLists : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var sportNames : [String] = [String]()
  var contextEntryKinds : [String] = [String]()
  var contextEntryPrefixTokens : [String] = [String]()
  var romanZonePrefixTokens : [String] = [String]()
  var contextEntryKindMap : [String:Bool] = [String:Bool]()
  var reservedGenericExerciseNameMap : [String:Bool] = [String:Bool]()
  init( ) {
    self.sportNames.append("Swim")
    self.sportNames.append("Run")
    self.sportNames.append("Bike")
    self.sportNames.append("Ski")
    self.sportNames.append("Row")
    self.addContextEntryKind(kind : "food", prefix : "Food ")
    self.addContextEntryKind(kind : "drinking", prefix : "Drinking ")
    self.addContextEntryKind(kind : "expense", prefix : "Expense ")
    self.addContextEntryKind(kind : "reminder", prefix : "Reminder ")
    self.addContextEntryKind(kind : "protein", prefix : "Protein ")
    self.addContextEntryKind(kind : "comment", prefix : "Comment ")
    self.addContextEntryKind(kind : "custom", prefix : "Custom ")
    self.addContextEntryKind(kind : "tags", prefix : "Tags ")
    self.addContextEntryKind(kind : "emojis", prefix : "Emojis ")
    self.addContextEntryKind(kind : "summary", prefix : "Summary ")
    self.addContextEntryKind(kind : "derived", prefix : "Derived ")
    self.addContextEntryKind(kind : "url", prefix : "URL ")
    self.romanZonePrefixTokens.append("III")
    self.romanZonePrefixTokens.append("II")
    self.romanZonePrefixTokens.append("IV")
    self.romanZonePrefixTokens.append("V")
    self.romanZonePrefixTokens.append("I")
    self.addReservedGenericExerciseName(name : "Split")
    self.addReservedGenericExerciseName(name : "Attempt")
    self.addReservedGenericExerciseName(name : "Recovery")
    self.addReservedGenericExerciseName(name : "Left")
    self.addReservedGenericExerciseName(name : "Right")
    self.addReservedGenericExerciseName(name : "Feeling")
    self.addReservedGenericExerciseName(name : "Feelings")
    self.addReservedGenericExerciseName(name : "Pain")
    self.addReservedGenericExerciseName(name : "Effort")
    self.addReservedGenericExerciseName(name : "RPE")
    self.addReservedGenericExerciseName(name : "Circuit")
    self.addReservedGenericExerciseName(name : "Food")
    self.addReservedGenericExerciseName(name : "Drinking")
    self.addReservedGenericExerciseName(name : "Expense")
    self.addReservedGenericExerciseName(name : "Reminder")
    self.addReservedGenericExerciseName(name : "Protein")
    self.addReservedGenericExerciseName(name : "Weight")
    self.addReservedGenericExerciseName(name : "BodyFat")
    self.addReservedGenericExerciseName(name : "Sleep")
    self.addReservedGenericExerciseName(name : "Health")
    self.addReservedGenericExerciseName(name : "Vitals")
    self.addReservedGenericExerciseName(name : "Comment")
    self.addReservedGenericExerciseName(name : "Custom")
    self.addReservedGenericExerciseName(name : "Tags")
    self.addReservedGenericExerciseName(name : "Emojis")
    self.addReservedGenericExerciseName(name : "Summary")
    self.addReservedGenericExerciseName(name : "Derived")
    self.addReservedGenericExerciseName(name : "URL")
    self.addReservedGenericExerciseName(name : "Waist")
    self.addReservedGenericExerciseName(name : "Hip")
    self.addReservedGenericExerciseName(name : "Blorple")
  }
  private static var __singleton_instance : NGSharedLists? = nil
  class func __singleton() -> NGSharedLists {
    if (NGSharedLists.__singleton_instance == nil) {
      NGSharedLists.__singleton_instance = NGSharedLists()
    }
    return NGSharedLists.__singleton_instance!
  }
  func addContextEntryKind(kind : String, prefix : String) -> Void {
    self.contextEntryKinds.append(kind)
    self.contextEntryPrefixTokens.append(prefix)
    self.contextEntryKindMap[kind] = true;
  }
  func addReservedGenericExerciseName(name : String) -> Void {
    self.reservedGenericExerciseNameMap[name] = true;
  }
  func defaultSportNames() -> [String] {
    return self.sportNames;
  }
  func defaultContextEntryKinds() -> [String] {
    return self.contextEntryKinds;
  }
  func defaultContextEntryPrefixTokens() -> [String] {
    return self.contextEntryPrefixTokens;
  }
  func defaultRomanZonePrefixTokens() -> [String] {
    return self.romanZonePrefixTokens;
  }
  func isContextEntryKind(kind : String) -> Bool {
    return self.contextEntryKindMap[kind] != nil;
  }
  func isReservedGenericExerciseName(name : String) -> Bool {
    return self.reservedGenericExerciseNameMap[name] != nil;
  }
}
func ==(l: ContextEntryDetector, r: ContextEntryDetector) -> Bool {
  return l === r
}
class ContextEntryDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "context-entry";
  }
  override class func create() -> ContextEntryDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return ContextEntryDetector(noMatchSlice : s);
  }
  func toTag(kind : String) -> String {
    let shared : NGSharedLists = NGSharedLists.__singleton()
    if ( shared.isContextEntryKind(kind : kind) ) {
      return kind;
    }
    return self.detectedTag;
  }
  func detectKind(slice : TokenSlice) -> String {
    let shared : NGSharedLists = NGSharedLists.__singleton()
    var kinds : [String] = shared.defaultContextEntryKinds()
    var prefixes : [String] = shared.defaultContextEntryPrefixTokens()
    let cnt : Int = kinds.count
    var i : Int = 0
    while (i < cnt) {
      if ( slice.hasToken(token : (prefixes[i])) ) {
        return kinds[i];
      }
      i = i + 1;
    }
    return "";
  }
  func findLineEnd(slice : TokenSlice, start : Int) -> Int {
    return slice.findLineEnd(from : start);
  }
  func parseDerivedFields(cv : ContextEntryValue, valueSlice : TokenSlice) -> Void {
    let __len : Int = (valueSlice).length()
    if ( __len <= 0 ) {
      return;
    }
    var i : Int = 0
    while (i < __len) {
      let chStart : Int = valueSlice.charCodeAt(index : i)
      if ( valueSlice.isWhitespace(ch : chStart) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i >= __len ) {
      return;
    }
    let metricStart : Int = i
    while (i < __len) {
      let chMetric : Int = valueSlice.charCodeAt(index : i)
      if ( valueSlice.isWhitespace(ch : chMetric) ) {
        break;
      }
      i = i + 1;
    }
    let metricEnd : Int = i
    if ( metricEnd > metricStart ) {
      cv.name = ((valueSlice.peek(offset : metricStart)).read(count : (metricEnd - metricStart))).toString();
    }
    while (i < __len) {
      let chAfterMetric : Int = valueSlice.charCodeAt(index : i)
      if ( valueSlice.isWhitespace(ch : chAfterMetric) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( i >= __len ) {
      return;
    }
    let valueStart : Int = i
    while (i < __len) {
      let chNum : Int = valueSlice.charCodeAt(index : i)
      if ( ((chNum == 124) || (chNum == 59)) || valueSlice.isWhitespace(ch : chNum) ) {
        break;
      }
      i = i + 1;
    }
    let valueEnd : Int = i
    if ( valueEnd > valueStart ) {
      let valueToken : TokenSlice = (valueSlice.peek(offset : valueStart)).read(count : (valueEnd - valueStart))
      cv.value = (valueToken).toString();
      if ( valueToken.hasDouble(from : 0, to : ((valueToken).length() - 1)) ) {
        cv.numericValue = valueToken.parseDouble(from : 0, to : ((valueToken).length() - 1));
        cv.hasNumeric = true;
      }
    }
    if ( i < __len ) {
      let sep : Int = valueSlice.charCodeAt(index : i)
      if ( (sep == 124) || (sep == 59) ) {
        i = i + 1;
        while (i < __len) {
          let chUnitStart : Int = valueSlice.charCodeAt(index : i)
          if ( valueSlice.isWhitespace(ch : chUnitStart) ) {
            i = i + 1;
          } else {
            break;
          }
        }
        let unitStart : Int = i
        while (i < __len) {
          let chUnit : Int = valueSlice.charCodeAt(index : i)
          if ( valueSlice.isWhitespace(ch : chUnit) ) {
            break;
          }
          i = i + 1;
        }
        let unitEnd : Int = i
        if ( unitEnd > unitStart ) {
          cv.unit = ((valueSlice.peek(offset : unitStart)).read(count : (unitEnd - unitStart))).toString();
        }
        while (i < __len) {
          let chBeforeToken : Int = valueSlice.charCodeAt(index : i)
          if ( valueSlice.isWhitespace(ch : chBeforeToken) ) {
            i = i + 1;
          } else {
            break;
          }
        }
        while (i < __len) {
          let tokenStart : Int = i
          while (i < __len) {
            let chToken : Int = valueSlice.charCodeAt(index : i)
            if ( valueSlice.isWhitespace(ch : chToken) ) {
              break;
            }
            i = i + 1;
          }
          let tokenEnd : Int = i
          if ( tokenEnd > tokenStart ) {
            let tokenSlice : TokenSlice = (valueSlice.peek(offset : tokenStart)).read(count : (tokenEnd - tokenStart))
            let tokenLen : Int = (tokenSlice).length()
            var colonAt : Int = -1
            var j : Int = 0
            while (j < tokenLen) {
              if ( tokenSlice.charCodeAt(index : j) == 58 ) {
                colonAt = j;
                break;
              }
              j = j + 1;
            }
            if ( (colonAt > 0) && (colonAt < (tokenLen - 1)) ) {
              let key : String = ((tokenSlice.peek(offset : 0)).read(count : colonAt)).toString()
              let valSlice : TokenSlice = (tokenSlice.peek(offset : (colonAt + 1))).read(count : (tokenLen - (colonAt + 1)))
              let valLen : Int = (valSlice).length()
              if ( key == "basis" ) {
                cv.basis = (valSlice).toString();
              }
              if ( key == "source" ) {
                cv.source = (valSlice).toString();
              }
              if ( key == "confidence" ) {
                if ( valLen > 0 ) {
                  let lastCh : Int = valSlice.charCodeAt(index : (valLen - 1))
                  if ( lastCh == 37 ) {
                    if ( valLen > 1 ) {
                      let numSlice : TokenSlice = (valSlice.peek(offset : 0)).read(count : (valLen - 1))
                      if ( numSlice.hasDouble(from : 0, to : ((numSlice).length() - 1)) ) {
                        cv.confidence = numSlice.parseDouble(from : 0, to : ((numSlice).length() - 1));
                        cv.hasConfidence = true;
                      }
                    }
                  } else {
                    if ( valSlice.hasDouble(from : 0, to : ((valSlice).length() - 1)) ) {
                      cv.confidence = valSlice.parseDouble(from : 0, to : ((valSlice).length() - 1));
                      cv.hasConfidence = true;
                    }
                  }
                }
              }
              if ( key == "goodness" ) {
                if ( valSlice.hasInteger(from : 0, to : ((valSlice).length() - 1)) ) {
                  cv.goodness = valSlice.parseInteger(from : 0, to : ((valSlice).length() - 1));
                  cv.hasGoodness = true;
                }
              }
            }
          }
          while (i < __len) {
            let chGap : Int = valueSlice.charCodeAt(index : i)
            if ( valueSlice.isWhitespace(ch : chGap) ) {
              i = i + 1;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len > 1 ) {
      let quote : Int = slice.charCodeAt(index : 0)
      if ( (quote == 34) || (quote == 39) ) {
        let lineEndQuoted : Int = self.findLineEnd(slice : slice, start : 1)
        let contentStart : Int = 1
        var contentEnd : Int = lineEndQuoted
        if ( (lineEndQuoted > 1) && (slice.charCodeAt(index : (lineEndQuoted - 1)) == quote) ) {
          contentEnd = lineEndQuoted - 1;
        }
        if ( contentEnd <= contentStart ) {
          return self.noMatch();
        }
        let outQuoted : TokenSlice = slice.read(count : lineEndQuoted)
        outQuoted.tag = "comment";
        let contentSlice : TokenSlice = (slice.peek(offset : contentStart)).read(count : (contentEnd - contentStart))
        let textToken : TokenSlice = contentSlice.read(count : (contentEnd - contentStart))
        textToken.tag = "text";
        outQuoted.addChild(child : textToken)
        let quotedValue : ContextEntryValue = ContextEntryValue()
        quotedValue.kind = "comment";
        quotedValue.content = (contentSlice).toString();
        let quotedParsed : SliceParsedValue = SliceParsedValue.fromContextEntry(value : quotedValue)
        outQuoted.setSliceValue(value : quotedParsed)
        slice.setSliceValue(value : quotedParsed)
        return outQuoted;
      }
    }
    let kind : String = self.detectKind(slice : slice)
    let kindLen : Int = kind.count
    if ( kindLen == 0 ) {
      return self.noMatch();
    }
    let keyLen : Int = kindLen + 1
    if ( keyLen >= __len ) {
      return self.noMatch();
    }
    let lineEnd : Int = self.findLineEnd(slice : slice, start : keyLen)
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.toTag(kind : kind);
    let labelLen : Int = keyLen - 1
    let label : TokenSlice = slice.read(count : labelLen)
    label.tag = "keyword";
    out.addChild(child : label)
    if ( keyLen < lineEnd ) {
      let contentSlice_1 : TokenSlice = (slice.peek(offset : keyLen)).read(count : (lineEnd - keyLen))
      let content : String = (contentSlice_1).toString()
      if ( (content.count) > 0 ) {
        let textToken_1 : TokenSlice = contentSlice_1.read(count : (content.count))
        textToken_1.tag = "text";
        out.addChild(child : textToken_1)
      }
    }
    let cv : ContextEntryValue = ContextEntryValue()
    cv.kind = kind;
    if ( keyLen < lineEnd ) {
      cv.content = ((slice.peek(offset : keyLen)).read(count : (lineEnd - keyLen))).toString();
    }
    if ( kind == "derived" ) {
      if ( keyLen < lineEnd ) {
        let derivedSlice : TokenSlice = (slice.peek(offset : keyLen)).read(count : (lineEnd - keyLen))
        self.parseDerivedFields(cv : cv, valueSlice : derivedSlice)
      }
    }
    if ( kind == "custom" ) {
      let customSlice : TokenSlice = (slice.peek(offset : keyLen)).read(count : (lineEnd - keyLen))
      let customLen : Int = (customSlice).length()
      var fieldStart : Int = 0
      while (fieldStart < customLen) {
        let chStart : Int = customSlice.charCodeAt(index : fieldStart)
        if ( customSlice.isWhitespace(ch : chStart) ) {
          fieldStart = fieldStart + 1;
        } else {
          break;
        }
      }
      var fieldEnd : Int = fieldStart
      while (fieldEnd < customLen) {
        let chField : Int = customSlice.charCodeAt(index : fieldEnd)
        if ( customSlice.isWhitespace(ch : chField) ) {
          break;
        }
        fieldEnd = fieldEnd + 1;
      }
      if ( fieldEnd > fieldStart ) {
        cv.name = ((customSlice.peek(offset : fieldStart)).read(count : (fieldEnd - fieldStart))).toString();
        var valueStart : Int = fieldEnd
        while (valueStart < customLen) {
          let chValueStart : Int = customSlice.charCodeAt(index : valueStart)
          if ( customSlice.isWhitespace(ch : chValueStart) ) {
            valueStart = valueStart + 1;
          } else {
            break;
          }
        }
        if ( valueStart < customLen ) {
          let valueSlice : TokenSlice = (customSlice.peek(offset : valueStart)).read(count : (customLen - valueStart))
          cv.value = (valueSlice).toString();
          if ( valueSlice.hasDouble(from : 0, to : ((valueSlice).length() - 1)) ) {
            cv.numericValue = valueSlice.parseDouble(from : 0, to : ((valueSlice).length() - 1));
            cv.hasNumeric = true;
          }
        }
      }
    }
    let parsed : SliceParsedValue = SliceParsedValue.fromContextEntry(value : cv)
    out.setSliceValue(value : parsed)
    slice.setSliceValue(value : parsed)
    return out;
  }
}
func ==(l: DistanceRangeBlockDetector, r: DistanceRangeBlockDetector) -> Bool {
  return l === r
}
class DistanceRangeBlockDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "distance-range";
  }
  override class func create() -> DistanceRangeBlockDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return DistanceRangeBlockDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 5 ) {
      return self.noMatch();
    }
    let lLen : Int = slice.findNumberEnd(from : 0)
    if ( lLen <= 0 ) {
      return self.noMatch();
    }
    if ( false == slice.hasInteger(from : 0, to : (lLen - 1)) ) {
      return self.noMatch();
    }
    if ( lLen >= __len ) {
      return self.noMatch();
    }
    let sep : Int = slice.charCodeAt(index : lLen)
    if ( sep == 45 ) {
      let rightAStart : Int = lLen + 1
      if ( rightAStart >= __len ) {
        return self.noMatch();
      }
      let rightA : TokenSlice = slice.peek(offset : rightAStart)
      let rLenA : Int = rightA.findNumberEnd(from : 0)
      if ( rLenA <= 0 ) {
        return self.noMatch();
      }
      if ( false == rightA.hasInteger(from : 0, to : (rLenA - 1)) ) {
        return self.noMatch();
      }
      if ( (rLenA + 1) > (rightA).length() ) {
        return self.noMatch();
      }
      if ( rightA.charCodeAt(index : rLenA) != 109 ) {
        return self.noMatch();
      }
      let lvalA : Int = slice.parseInteger(from : 0, to : (lLen - 1))
      let rvalA : Int = rightA.parseInteger(from : 0, to : (rLenA - 1))
      if ( (lvalA <= 0) || (rvalA <= 0) ) {
        return self.noMatch();
      }
      let outA : TokenSlice = slice.read(count : ((rightAStart + rLenA) + 1))
      outA.tag = self.detectedTag;
      return outA;
    }
    if ( sep != 109 ) {
      return self.noMatch();
    }
    let lLenB : Int = lLen
    if ( (lLenB + 2) > __len ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : (lLenB + 1)) != 45 ) {
      return self.noMatch();
    }
    let rightBStart : Int = lLenB + 2
    if ( rightBStart >= __len ) {
      return self.noMatch();
    }
    let rightB : TokenSlice = slice.peek(offset : rightBStart)
    let rLenB : Int = rightB.findNumberEnd(from : 0)
    if ( rLenB <= 0 ) {
      return self.noMatch();
    }
    if ( rightB.hasInteger(from : 0, to : (rLenB - 1)) ) {
    } else {
      return self.noMatch();
    }
    if ( (rLenB + 1) > (rightB).length() ) {
      return self.noMatch();
    }
    if ( rightB.charCodeAt(index : rLenB) != 109 ) {
      return self.noMatch();
    }
    let lvalB : Int = slice.parseInteger(from : 0, to : (lLenB - 1))
    let rvalB : Int = rightB.parseInteger(from : 0, to : (rLenB - 1))
    if ( (lvalB <= 0) || (rvalB <= 0) ) {
      return self.noMatch();
    }
    let outB : TokenSlice = slice.read(count : ((rightBStart + rLenB) + 1))
    outB.tag = self.detectedTag;
    return outB;
  }
}
func ==(l: SemicolonSeparatorDetector, r: SemicolonSeparatorDetector) -> Bool {
  return l === r
}
class SemicolonSeparatorDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "space";
  }
  override class func create() -> SemicolonSeparatorDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return SemicolonSeparatorDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( (slice).length() == 0 ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 0) != 59 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : 1)
    out.tag = self.detectedTag;
    return out;
  }
}
func ==(l: KCALDetector, r: KCALDetector) -> Bool {
  return l === r
}
class KCALDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "kcal";
  }
  override class func create() -> KCALDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return KCALDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 5 ) {
      return self.noMatch();
    }
    var detectors : [TokenDetector] = [TokenDetector]()
    detectors.append(PositiveIntegerDetector.create())
    detectors.append(KeywordDetector.create(token : "kcal"))
    let p : Parser = Parser(source : (slice).toString(), detectors : detectors)
    (p).start();
    if ( p.getCount() != 2 ) {
      return self.noMatch();
    }
    var parts : [TokenSlice] = p.getResults()
    let first : TokenSlice = parts[0]
    let second : TokenSlice = parts[1]
    if ( false == (first.tag == "positive-integer") ) {
      return self.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return self.noMatch();
    }
    if ( false == second.strEquals(value : "kcal") ) {
      return self.noMatch();
    }
    let outLen : Int = (first).length() + (second).length()
    let out : TokenSlice = slice.read(count : outLen)
    out.tag = self.detectedTag;
    out.addChild(child : first)
    out.addChild(child : second)
    return out;
  }
}
func ==(l: BPMDetector, r: BPMDetector) -> Bool {
  return l === r
}
class BPMDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "bpm";
  }
  override class func create() -> BPMDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return BPMDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 4 ) {
      return self.noMatch();
    }
    var detectors : [TokenDetector] = [TokenDetector]()
    detectors.append(PositiveIntegerDetector.create())
    detectors.append(KeywordDetector.create(token : "bpm"))
    let p : Parser = Parser(source : (slice).toString(), detectors : detectors)
    (p).start();
    if ( p.getCount() != 2 ) {
      return self.noMatch();
    }
    var parts : [TokenSlice] = p.getResults()
    let first : TokenSlice = parts[0]
    let second : TokenSlice = parts[1]
    if ( false == (first.tag == "positive-integer") ) {
      return self.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return self.noMatch();
    }
    if ( false == second.strEquals(value : "bpm") ) {
      return self.noMatch();
    }
    let outLen : Int = (first).length() + (second).length()
    let out : TokenSlice = slice.read(count : outLen)
    out.tag = self.detectedTag;
    out.addChild(child : first)
    out.addChild(child : second)
    return out;
  }
}
func ==(l: PercentageRangeDetector, r: PercentageRangeDetector) -> Bool {
  return l === r
}
class PercentageRangeDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "percentage-range";
  }
  override class func create() -> PercentageRangeDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return PercentageRangeDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 4 ) {
      return self.noMatch();
    }
    var i : Int = 0
    while (i < __len) {
      if ( slice.isDigitAt(index : i) ) {
        i = i + 1;
      } else {
        break;
      }
    }
    if ( ((i > 0) && (i < __len)) && (slice.charCodeAt(index : i) == 37) ) {
      if ( ((i + 1) < __len) && (slice.charCodeAt(index : (i + 1)) == 45) ) {
        var j : Int = i + 2
        while (j < __len) {
          if ( slice.isDigitAt(index : j) ) {
            j = j + 1;
          } else {
            break;
          }
        }
        if ( ((j > (i + 2)) && (j < __len)) && (slice.charCodeAt(index : j) == 37) ) {
          let leftDigits : TokenSlice = slice.read(count : i)
          let rightDigits : TokenSlice = (slice.peek(offset : (i + 2))).read(count : (j - (i + 2)))
          if ( false == leftDigits.hasInteger(from : 0, to : ((leftDigits).length() - 1)) ) {
            return self.noMatch();
          }
          if ( false == rightDigits.hasInteger(from : 0, to : ((rightDigits).length() - 1)) ) {
            return self.noMatch();
          }
          let lval : Int = leftDigits.parseInteger(from : 0, to : ((leftDigits).length() - 1))
          let rval : Int = rightDigits.parseInteger(from : 0, to : ((rightDigits).length() - 1))
          if ( (lval > 0) && (rval > 0) ) {
            let out2 : TokenSlice = slice.read(count : (j + 1))
            out2.tag = self.detectedTag;
            let pv2 : PercentageRangeValue = PercentageRangeValue()
            pv2.minValue = lval;
            pv2.maxValue = rval;
            let payload2 : SliceParsedValue = SliceParsedValue.fromPercentageRange(value : pv2)
            out2.setSliceValue(value : payload2)
            slice.setSliceValue(value : payload2)
            return out2;
          }
        }
      }
    }
    var detectors : [TokenDetector] = [TokenDetector]()
    detectors.append(SpaceDetector.create())
    detectors.append(NumRangeBlockDetector.create())
    detectors.append(KeywordDetector.create(token : "%"))
    let p : Parser = Parser(source : (slice).toString(), detectors : detectors)
    (p).start();
    if ( p.getCount() != 2 ) {
      return self.noMatch();
    }
    var parts : [TokenSlice] = p.getResults()
    let first : TokenSlice = parts[0]
    let second : TokenSlice = parts[1]
    if ( false == (first.tag == "num-range") ) {
      return self.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return self.noMatch();
    }
    if ( false == second.strEquals(value : "%") ) {
      return self.noMatch();
    }
    let outLen : Int = (first).length() + (second).length()
    let out : TokenSlice = slice.read(count : outLen)
    out.tag = self.detectedTag;
    out.addChild(child : first)
    out.addChild(child : second)
    let nrv : NumRangeValue = first.getAsNumRangeValue()
    let pv : PercentageRangeValue = PercentageRangeValue()
    pv.minValue = nrv.minValue;
    pv.maxValue = nrv.maxValue;
    let payload : SliceParsedValue = SliceParsedValue.fromPercentageRange(value : pv)
    out.setSliceValue(value : payload)
    slice.setSliceValue(value : payload)
    return out;
  }
}
func ==(l: RMDetector, r: RMDetector) -> Bool {
  return l === r
}
class RMDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "rm";
  }
  override class func create() -> RMDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return RMDetector(noMatchSlice : s);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 3 ) {
      return self.noMatch();
    }
    var detectors : [TokenDetector] = [TokenDetector]()
    detectors.append(PositiveIntegerDetector.create())
    detectors.append(KeywordDetector.create(token : "RM"))
    let p : Parser = Parser(source : (slice).toString(), detectors : detectors)
    (p).start();
    if ( p.getCount() != 2 ) {
      return self.noMatch();
    }
    var parts : [TokenSlice] = p.getResults()
    let first : TokenSlice = parts[0]
    let second : TokenSlice = parts[1]
    if ( false == (first.tag == "positive-integer") ) {
      return self.noMatch();
    }
    if ( false == (second.tag == "keyword") ) {
      return self.noMatch();
    }
    if ( false == second.strEquals(value : "RM") ) {
      return self.noMatch();
    }
    let outLen : Int = (first).length() + (second).length()
    let out : TokenSlice = slice.read(count : outLen)
    out.tag = self.detectedTag;
    out.addChild(child : first)
    out.addChild(child : second)
    return out;
  }
}
func ==(l: RomanZoneDetector, r: RomanZoneDetector) -> Bool {
  return l === r
}
class RomanZoneDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "zone-roman";
  }
  override class func create() -> RomanZoneDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return RomanZoneDetector(noMatchSlice : s);
  }
  func romanPrefixLen(slice : TokenSlice) -> Int {
    let shared : NGSharedLists = NGSharedLists.__singleton()
    var candidates : [String] = shared.defaultRomanZonePrefixTokens()
    var i : Int = 0
    let cnt : Int = candidates.count
    while (i < cnt) {
      let token : String = candidates[i]
      if ( slice.hasToken(token : token) ) {
        return token.count;
      }
      i = i + 1;
    }
    return 0;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let tokenLen : Int = self.romanPrefixLen(slice : slice)
    if ( tokenLen == 0 ) {
      return self.noMatch();
    }
    let __len : Int = (slice).length()
    if ( __len > tokenLen ) {
      if ( slice.isAlphaNumAt(index : tokenLen) ) {
        return self.noMatch();
      }
    }
    let out : TokenSlice = slice.read(count : tokenLen)
    out.tag = self.detectedTag;
    return out;
  }
}
func ==(l: PhaseDetector, r: PhaseDetector) -> Bool {
  return l === r
}
class PhaseDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "phase";
  }
  override class func create() -> PhaseDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return PhaseDetector(noMatchSlice : s);
  }
  func findLineEnd(slice : TokenSlice, from : Int) -> Int {
    return slice.findLineEnd(from : from);
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( slice.hasToken(token : "Phase") ) {
    } else {
      return self.noMatch();
    }
    let lineEnd : Int = self.findLineEnd(slice : slice, from : 0)
    if ( lineEnd <= 5 ) {
      return self.noMatch();
    }
    var keyEnd : Int = 0
    while (keyEnd < lineEnd) {
      let ch : Int = slice.charCodeAt(index : keyEnd)
      if ( slice.isWhitespace(ch : ch) ) {
        break;
      }
      if ( ch == 124 ) {
        break;
      }
      keyEnd = keyEnd + 1;
    }
    if ( keyEnd <= 0 ) {
      return self.noMatch();
    }
    let keyText : String = (slice.read(count : keyEnd)).toString()
    if ( (String(keyText[keyText.index(keyText.startIndex, offsetBy:0)..<keyText.index(keyText.startIndex, offsetBy:5)])) == "Phase" ) {
    } else {
      return self.noMatch();
    }
    var contentStart : Int = keyEnd
    if ( contentStart < lineEnd ) {
      let chSep : Int = slice.charCodeAt(index : contentStart)
      if ( (chSep == 124) || slice.isWhitespace(ch : chSep) ) {
        contentStart = contentStart + 1;
      }
    }
    while (contentStart < lineEnd) {
      let chSpace : Int = slice.charCodeAt(index : contentStart)
      if ( slice.isWhitespace(ch : chSpace) ) {
        contentStart = contentStart + 1;
      } else {
        break;
      }
    }
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    let label : TokenSlice = slice.read(count : keyEnd)
    label.tag = "keyword";
    out.addChild(child : label)
    if ( contentStart < lineEnd ) {
      let contentSlice : TokenSlice = (slice.peek(offset : contentStart)).read(count : (lineEnd - contentStart))
      let textToken : TokenSlice = contentSlice.read(count : (lineEnd - contentStart))
      textToken.tag = "text";
      out.addChild(child : textToken)
    }
    return out;
  }
}
func ==(l: HeadingDataDetector, r: HeadingDataDetector) -> Bool {
  return l === r
}
class HeadingDataDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "heading-data";
  }
  override class func create() -> HeadingDataDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return HeadingDataDetector(noMatchSlice : s);
  }
  func hasIsoDatePrefix(slice : TokenSlice, start : Int) -> Bool {
    if ( (start + 10) > (slice).length() ) {
      return false;
    }
    if ( slice.isDigitAt(index : (start + 0)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(index : (start + 1)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(index : (start + 2)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(index : (start + 3)) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt(index : (start + 4)) == 45 ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(index : (start + 5)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(index : (start + 6)) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt(index : (start + 7)) == 45 ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(index : (start + 8)) ) {
    } else {
      return false;
    }
    if ( slice.isDigitAt(index : (start + 9)) ) {
    } else {
      return false;
    }
    return true;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len < 2 ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 0) == 91 ) {
      var closeIdx : Int = 1
      while (closeIdx < __len) {
        let chClose : Int = slice.charCodeAt(index : closeIdx)
        if ( (chClose == 10) || (chClose == 13) ) {
          break;
        }
        if ( chClose == 93 ) {
          break;
        }
        closeIdx = closeIdx + 1;
      }
      if ( (closeIdx < __len) && (slice.charCodeAt(index : closeIdx) == 93) ) {
        if ( self.hasIsoDatePrefix(slice : slice, start : 1) ) {
          var i2 : Int = closeIdx + 1
          while (i2 < __len) {
            let chSpace : Int = slice.charCodeAt(index : i2)
            if ( slice.isWhitespace(ch : chSpace) ) {
              i2 = i2 + 1;
            } else {
              break;
            }
          }
          var hashCount : Int = 0
          while (i2 < __len) {
            if ( slice.charCodeAt(index : i2) == 35 ) {
              hashCount = hashCount + 1;
              i2 = i2 + 1;
            } else {
              break;
            }
          }
          if ( hashCount >= 1 ) {
            if ( (i2 < __len) && (slice.charCodeAt(index : i2) == 32) ) {
              i2 = i2 + 1;
              if ( i2 < __len ) {
                var j : Int = i2
                while (j < __len) {
                  let chJ : Int = slice.charCodeAt(index : j)
                  if ( (chJ == 10) || (chJ == 13) ) {
                    break;
                  }
                  j = j + 1;
                }
                if ( j > i2 ) {
                  let out2 : TokenSlice = slice.read(count : j)
                  out2.tag = self.detectedTag;
                  return out2;
                }
              }
            }
          }
        }
      }
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 0) != 35 ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 1) != 32 ) {
      return self.noMatch();
    }
    var i : Int = 2
    while (i < __len) {
      let ch : Int = slice.charCodeAt(index : i)
      if ( (ch == 10) || (ch == 13) ) {
        break;
      }
      i = i + 1;
    }
    if ( i <= 2 ) {
      return self.noMatch();
    }
    let out : TokenSlice = slice.read(count : i)
    out.tag = self.detectedTag;
    return out;
  }
}
func ==(l: StandardDetectors, r: StandardDetectors) -> Bool {
  return l === r
}
class StandardDetectors : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  class func create() -> [TokenDetector] {
    var ds : [TokenDetector] = [TokenDetector]()
    ds.append(SpaceDetector.create())
    ds.append(NewlineDetector.create())
    ds.append(DateTimeDetector.create())
    ds.append(SpeedDetector.create())
    ds.append(KCALDetector.create())
    ds.append(BPMDetector.create())
    ds.append(WeightDetector.create())
    ds.append(DistanceRangeBlockDetector.create())
    ds.append(PercentageRangeDetector.create())
    ds.append(SetRepRangeLoadDetector.create())
    ds.append(NumRangeBlockDetector.create())
    ds.append(DistanceDetector.create())
    ds.append(PercentageDetector.create())
    ds.append(RMDetector.create())
    ds.append(ZoneDetector.create())
    ds.append(RomanZoneDetector.create())
    ds.append(RecoveryTimeDetector.create())
    ds.append(TimeValueDetector.create())
    ds.append(RecoveryDetector.create())
    ds.append(LeftRightDetector.create())
    ds.append(FeelingDetector.create())
    ds.append(EffortDetector.create())
    ds.append(BodyMetricDetector.create())
    ds.append(CircuitDetector.create())
    ds.append(PhaseDetector.create())
    ds.append(ContextEntryDetector.create())
    ds.append(SportExerciseDetector.create())
    ds.append(DecimalNumberDetector.create())
    ds.append(PositiveIntegerDetector.create())
    ds.append(RepeatBlockDetector.create())
    ds.append(AMTimeValueDetector.create())
    ds.append(DetailsDataDetector.create())
    ds.append(HeadingDataDetector.create())
    return ds;
  }
}
func ==(l: DetailsDataDetector, r: DetailsDataDetector) -> Bool {
  return l === r
}
class DetailsDataDetector : TokenDetector { 
  override init(noMatchSlice : TokenSlice ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "details-data";
  }
  override class func create() -> DetailsDataDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return DetailsDataDetector(noMatchSlice : s);
  }
  func createChildDetectors() -> [TokenDetector] {
    return StandardDetectors.create();
  }
  func findFirstNumberOffset(slice : TokenSlice) -> Int {
    var i : Int = 0
    let __len : Int = (slice).length()
    while (i < __len) {
      let ch : Int = slice.charCodeAt(index : i)
      if ( (ch >= 48) && (ch <= 57) ) {
        return i;
      }
      i = i + 1;
    }
    return -1;
  }
  func isLetter(ch : Int) -> Bool {
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  }
  func addChildrenFromParser(out : TokenSlice, payload : TokenSlice) -> Void {
    let p : Parser = Parser(source : (payload).toString(), detectors : self.createChildDetectors())
    (p).start();
    var ch : [TokenSlice] = p.getResults()
    for (i, item) in ch.enumerated() {
      out.addChild(child : item)
    }
  }
  func addKeywordTailChildren(out : TokenSlice, payload : TokenSlice) -> Void {
    let rbDetector : RepeatBlockDetector = RepeatBlockDetector.create()
    let rb : TokenSlice = rbDetector.detect(slice : payload)
    if ( false == (rb.tag == "repeat-block") ) {
      self.addChildrenFromParser(out : out, payload : payload)
      return;
    }
    out.addChild(child : rb)
    var restStart : Int = (rb).length()
    let __len : Int = (payload).length()
    while (restStart < __len) {
      let ch : Int = payload.charCodeAt(index : restStart)
      if ( payload.isWhitespace(ch : ch) ) {
        restStart = restStart + 1;
      } else {
        break;
      }
    }
    if ( restStart < __len ) {
      let rest : TokenSlice = (payload.peek(offset : restStart)).read(count : (__len - restStart))
      self.addChildrenFromParser(out : out, payload : rest)
    }
  }
  func addParsedChildren(out : TokenSlice, payload : TokenSlice) -> Void {
    let p : Parser = Parser(source : (payload).toString(), detectors : self.createChildDetectors())
    (p).start();
    if ( p.getCount() > 0 ) {
      var ch : [TokenSlice] = p.getResults()
      for (i, item) in ch.enumerated() {
        out.addChild(child : item)
      }
      return;
    }
    let __len : Int = (payload).length()
    var wordEnd : Int = 0
    while (wordEnd < __len) {
      let chw : Int = payload.charCodeAt(index : wordEnd)
      if ( self.isLetter(ch : chw) ) {
        wordEnd = wordEnd + 1;
      } else {
        break;
      }
    }
    if ( wordEnd > 0 ) {
      let label : TokenSlice = payload.read(count : wordEnd)
      label.tag = "keyword";
      out.addChild(child : label)
      var tailStart : Int = wordEnd
      while (tailStart < __len) {
        let cht : Int = payload.charCodeAt(index : tailStart)
        if ( payload.isWhitespace(ch : cht) ) {
          tailStart = tailStart + 1;
        } else {
          break;
        }
      }
      if ( tailStart < __len ) {
        let tail : TokenSlice = (payload.peek(offset : tailStart)).read(count : (__len - tailStart))
        self.addKeywordTailChildren(out : out, payload : tail)
      }
      return;
    }
    let firstNum : Int = self.findFirstNumberOffset(slice : payload)
    if ( (firstNum > 0) && (firstNum < (payload).length()) ) {
      let numericTail : TokenSlice = (payload.peek(offset : firstNum)).read(count : ((payload).length() - firstNum))
      self.addChildrenFromParser(out : out, payload : numericTail)
    }
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    if ( (slice).length() < 1 ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : 0) != 62 ) {
      return self.noMatch();
    }
    let __len : Int = (slice).length()
    var markerEnd : Int = 0
    while (markerEnd < __len) {
      let chm : Int = slice.charCodeAt(index : markerEnd)
      if ( chm == 62 ) {
        markerEnd = markerEnd + 1;
      } else {
        break;
      }
    }
    if ( markerEnd == 0 ) {
      return self.noMatch();
    }
    let lineEnd : Int = slice.findLineEnd(from : markerEnd)
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    let levelToken : TokenSlice = slice.read(count : markerEnd)
    levelToken.tag = "details-level";
    let dlv : DetailsLevelValue = DetailsLevelValue()
    dlv.level = markerEnd;
    dlv.marker = (levelToken).toString();
    let payload : SliceParsedValue = SliceParsedValue.fromDetailsLevel(value : dlv)
    levelToken.setSliceValue(value : payload)
    out.addChild(child : levelToken)
    var contentStart : Int = markerEnd
    while (contentStart < lineEnd) {
      let ch2 : Int = slice.charCodeAt(index : contentStart)
      if ( (ch2 == 32) || (ch2 == 9) ) {
        contentStart = contentStart + 1;
      } else {
        break;
      }
    }
    if ( contentStart >= lineEnd ) {
      return out;
    }
    let payload_2 : TokenSlice = (slice.peek(offset : contentStart)).read(count : (lineEnd - contentStart))
    self.addParsedChildren(out : out, payload : payload_2)
    return out;
  }
}
func ==(l: NGSharedDetectorFactory, r: NGSharedDetectorFactory) -> Bool {
  return l === r
}
class NGSharedDetectorFactory : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var sportExerciseChildDetectors : [TokenDetector] = [TokenDetector]()
  private static var __singleton_instance : NGSharedDetectorFactory? = nil
  class func __singleton() -> NGSharedDetectorFactory {
    if (NGSharedDetectorFactory.__singleton_instance == nil) {
      NGSharedDetectorFactory.__singleton_instance = NGSharedDetectorFactory()
    }
    return NGSharedDetectorFactory.__singleton_instance!
  }
  func createSportExerciseChildDetectors() -> [TokenDetector] {
    if ( (self.sportExerciseChildDetectors.count) > 0 ) {
      return self.sportExerciseChildDetectors;
    }
    var ds : [TokenDetector] = [TokenDetector]()
    ds.append(SpaceDetector.create())
    ds.append(SemicolonSeparatorDetector.create())
    ds.append(NewlineDetector.create())
    ds.append(DateTimeDetector.create())
    ds.append(SpeedDetector.create())
    ds.append(KCALDetector.create())
    ds.append(BPMDetector.create())
    ds.append(WeightDetector.create())
    ds.append(DistanceRangeBlockDetector.create())
    ds.append(PercentageRangeDetector.create())
    ds.append(SetRepRangeLoadDetector.create())
    ds.append(NumRangeBlockDetector.create())
    ds.append(DistanceDetector.create())
    ds.append(PercentageDetector.create())
    ds.append(RMDetector.create())
    ds.append(ZoneDetector.create())
    ds.append(RomanZoneDetector.create())
    ds.append(RecoveryTimeDetector.create())
    ds.append(TimeValueDetector.create())
    ds.append(RecoveryDetector.create())
    ds.append(LeftRightDetector.create())
    ds.append(FeelingDetector.create())
    ds.append(EffortDetector.create())
    ds.append(BodyMetricDetector.create())
    ds.append(CircuitDetector.create())
    ds.append(PhaseDetector.create())
    ds.append(ContextEntryDetector.create())
    ds.append(DecimalNumberDetector.create())
    ds.append(PositiveIntegerDetector.create())
    ds.append(KeywordDetector.create(token : "min"))
    ds.append(KeywordDetector.create(token : "h"))
    ds.append(RepeatBlockDetector.create())
    ds.append(AMTimeValueDetector.create())
    ds.append(DetailsDataDetector.create())
    ds.append(HeadingDataDetector.create())
    self.sportExerciseChildDetectors = ds;
    return self.sportExerciseChildDetectors;
  }
}
func ==(l: SportExerciseDetector, r: SportExerciseDetector) -> Bool {
  return l === r
}
class SportExerciseDetector : TokenDetector { 
  var sports : [String] = [String]()
  var childDetectors : [TokenDetector] = [TokenDetector]()
  init(noMatchSlice : TokenSlice, sportNames : [String], ds : [TokenDetector] ) {
    super.init(noMatchSlice : noMatchSlice)
    self.cachedNoMatch = noMatchSlice;
    self.sports = sportNames;
    self.childDetectors = ds;
    self.detectedTag = "exercise";
  }
  override class func create() -> SportExerciseDetector {
    let shared : NGSharedLists = NGSharedLists.__singleton()
    let factory : NGSharedDetectorFactory = NGSharedDetectorFactory.__singleton()
    var sportNames : [String] = shared.defaultSportNames()
    var ds : [TokenDetector] = factory.createSportExerciseChildDetectors()
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return SportExerciseDetector(noMatchSlice : s, sportNames : sportNames, ds : ds);
  }
  class func createWithSports(sportNames : [String]) -> SportExerciseDetector {
    let factory : NGSharedDetectorFactory = NGSharedDetectorFactory.__singleton()
    var ds : [TokenDetector] = factory.createSportExerciseChildDetectors()
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return SportExerciseDetector(noMatchSlice : s, sportNames : sportNames, ds : ds);
  }
  func createChildDetectors() -> [TokenDetector] {
    return self.childDetectors;
  }
  func startsWithToken(slice : TokenSlice, token : String) -> Bool {
    let tLen : Int = token.count
    if ( tLen > (slice).length() ) {
      return false;
    }
    var i : Int = 0
    while (i < tLen) {
      if ( slice.charCodeAt(index : i) == (Int(token[token.index(token.startIndex, offsetBy: i)].asciiValue ?? 0)) ) {
      } else {
        return false;
      }
      i = i + 1;
    }
    return true;
  }
  func isUppercaseLetter(ch : Int) -> Bool {
    return (ch >= 65) && (ch <= 90);
  }
  func isLetter(ch : Int) -> Bool {
    if ( (ch >= 65) && (ch <= 90) ) {
      return true;
    }
    if ( (ch >= 97) && (ch <= 122) ) {
      return true;
    }
    return false;
  }
  func isReservedGenericName(name : String) -> Bool {
    let shared : NGSharedLists = NGSharedLists.__singleton()
    return shared.isReservedGenericExerciseName(name : name);
  }
  func scanGenericNameEnd(slice : TokenSlice) -> Int {
    let __len : Int = (slice).length()
    if ( __len <= 0 ) {
      return -1;
    }
    if ( false == self.isUppercaseLetter(ch : slice.charCodeAt(index : 0)) ) {
      return -1;
    }
    var pos : Int = 1
    while (pos < __len) {
      let ch : Int = slice.charCodeAt(index : pos)
      if ( self.isLetter(ch : ch) ) {
        pos = pos + 1;
      } else {
        break;
      }
    }
    var nameEnd : Int = pos
    while (pos < __len) {
      /** unused:  let gapStart : Int = pos   **/ 
      while (pos < __len) {
        let gapCh : Int = slice.charCodeAt(index : pos)
        if ( slice.isWhitespace(ch : gapCh) ) {
          pos = pos + 1;
        } else {
          break;
        }
      }
      if ( pos >= __len ) {
        break;
      }
      if ( false == self.isUppercaseLetter(ch : slice.charCodeAt(index : pos)) ) {
        break;
      }
      pos = pos + 1;
      while (pos < __len) {
        let ch2 : Int = slice.charCodeAt(index : pos)
        if ( self.isLetter(ch : ch2) ) {
          pos = pos + 1;
        } else {
          break;
        }
      }
      nameEnd = pos;
    }
    return nameEnd;
  }
  func isSeparator(slice : TokenSlice, index : Int) -> Bool {
    if ( slice.isWhitespaceAt(index : index) ) {
      return true;
    }
    if ( slice.charCodeAt(index : index) == 59 ) {
      return true;
    }
    return false;
  }
  func trimEnd(slice : TokenSlice, endPos : Int) -> Int {
    var out : Int = endPos
    while (out > 0) {
      let ch : Int = slice.charCodeAt(index : (out - 1))
      if ( slice.isWhitespace(ch : ch) ) {
        out = out - 1;
      } else {
        break;
      }
    }
    return out;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let __len : Int = (slice).length()
    if ( __len <= 0 ) {
      return self.noMatch();
    }
    let lineEnd : Int = slice.findLineEnd(from : 0)
    if ( lineEnd <= 0 ) {
      return self.noMatch();
    }
    var startPos : Int = 0
    while (startPos < lineEnd) {
      let chStart : Int = slice.charCodeAt(index : startPos)
      if ( slice.isWhitespace(ch : chStart) ) {
        startPos = startPos + 1;
      } else {
        break;
      }
    }
    if ( startPos >= lineEnd ) {
      return self.noMatch();
    }
    if ( slice.charCodeAt(index : startPos) == 62 ) {
      return self.noMatch();
    }
    var semicolonPos : Int = -1
    var p : Int = 0
    while (p < lineEnd) {
      if ( slice.charCodeAt(index : p) == 59 ) {
        semicolonPos = p;
        break;
      }
      p = p + 1;
    }
    let explicitNameMode : Bool = semicolonPos >= 0
    var matched : Bool = false
    if ( explicitNameMode ) {
      matched = true;
    } else {
      for (i, sportName) in self.sports.enumerated() {
        let sportLen : Int = sportName.count
        if ( lineEnd < sportLen ) {
          continue;
        }
        if ( false == self.startsWithToken(slice : slice, token : sportName) ) {
          continue;
        }
        if ( lineEnd == sportLen ) {
          matched = true;
          break;
        }
        if ( self.isSeparator(slice : slice, index : sportLen) ) {
          matched = true;
          break;
        }
      }
      if ( matched == false ) {
        let genericLen : Int = self.scanGenericNameEnd(slice : slice)
        if ( genericLen > 1 ) {
          let genericName : String = (slice.read(count : genericLen)).toString()
          if ( self.isReservedGenericName(name : genericName) ) {
            return self.noMatch();
          }
          if ( genericLen == lineEnd ) {
            matched = true;
          } else {
            if ( self.isSeparator(slice : slice, index : genericLen) ) {
              matched = true;
            }
          }
        }
      }
    }
    if ( matched == false ) {
      return self.noMatch();
    }
    var nameEnd : Int = lineEnd
    if ( semicolonPos >= 0 ) {
      nameEnd = semicolonPos;
    }
    nameEnd = self.trimEnd(slice : slice, endPos : nameEnd);
    if ( nameEnd <= 0 ) {
      return self.noMatch();
    }
    let nameToken : TokenSlice = slice.read(count : nameEnd)
    nameToken.tag = "exercise-name";
    let out : TokenSlice = slice.read(count : lineEnd)
    out.tag = self.detectedTag;
    out.addChild(child : nameToken)
    if ( semicolonPos >= 0 ) {
      var restStart : Int = semicolonPos + 1
      while (restStart < lineEnd) {
        if ( self.isSeparator(slice : slice, index : restStart) ) {
          restStart = restStart + 1;
        } else {
          break;
        }
      }
      if ( restStart < lineEnd ) {
        let restSlice : TokenSlice = (slice.peek(offset : restStart)).read(count : (lineEnd - restStart))
        let p_2 : Parser = Parser(source : (restSlice).toString(), detectors : self.createChildDetectors())
        (p_2).start();
        var children : [TokenSlice] = p_2.getResults()
        for (j, ch) in children.enumerated() {
          out.addChild(child : ch)
        }
      }
    }
    return out;
  }
}
func ==(l: NGExpectRule, r: NGExpectRule) -> Bool {
  return l === r
}
class NGExpectRule : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var testIndex : Int = -1
  var negated : Bool = false
  var kind : String = ""
  var childIndex : Int = -1
  var field : String = ""
  var value : String = ""
}
func ==(l: NGTestCase, r: NGTestCase) -> Bool {
  return l === r
}
class NGTestCase : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  var input : String = ""
  var expects : [NGExpectRule] = [NGExpectRule]()
  var jsonFile : String = ""
}
func ==(l: NGTestSpecParser, r: NGTestSpecParser) -> Bool {
  return l === r
}
class NGTestSpecParser : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  class func create() -> NGTestSpecParser {
    return NGTestSpecParser();
  }
  func isSpace(ch : Int) -> Bool {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  }
  func trim(text : String) -> String {
    let __len : Int = text.count
    if ( __len == 0 ) {
      return "";
    }
    var start : Int = 0
    while (start < __len) {
      let ch : Int = Int(text[text.index(text.startIndex, offsetBy: start)].asciiValue ?? 0)
      if ( self.isSpace(ch : ch) ) {
        start = start + 1;
      } else {
        break;
      }
    }
    var stop : Int = __len
    while (stop > start) {
      let ch2 : Int = Int(text[text.index(text.startIndex, offsetBy: (stop - 1))].asciiValue ?? 0)
      if ( self.isSpace(ch : ch2) ) {
        stop = stop - 1;
      } else {
        break;
      }
    }
    if ( stop <= start ) {
      return "";
    }
    return String(text[text.index(text.startIndex, offsetBy:start)..<text.index(text.startIndex, offsetBy:stop)]);
  }
  func startsWith(text : String, prefix : String) -> Bool {
    let tLen : Int = text.count
    let pLen : Int = prefix.count
    if ( pLen > tLen ) {
      return false;
    }
    return (String(text[text.index(text.startIndex, offsetBy:0)..<text.index(text.startIndex, offsetBy:pLen)])) == prefix;
  }
  func endsWith(text : String, suffix : String) -> Bool {
    let tLen : Int = text.count
    let sLen : Int = suffix.count
    if ( sLen > tLen ) {
      return false;
    }
    return (String(text[text.index(text.startIndex, offsetBy:(tLen - sLen))..<text.index(text.startIndex, offsetBy:tLen)])) == suffix;
  }
  func normalizeNumericText(text : String) -> String {
    if ( (self).endsWith(text : text, suffix : ".0") ) {
      return String(text[text.index(text.startIndex, offsetBy:0)..<text.index(text.startIndex, offsetBy:((text.count) - 2))]);
    }
    return text;
  }
  func isCommentLine(line : String) -> Bool {
    return (self).startsWith(text : line, prefix : "//");
  }
  func findSpace(text : String) -> Int {
    let __len : Int = text.count
    var i : Int = 0
    while (i < __len) {
      let ch : Int = Int(text[text.index(text.startIndex, offsetBy: i)].asciiValue ?? 0)
      if ( ch == 32 ) {
        return i;
      }
      i = i + 1;
    }
    return -1;
  }
  func decodeEscapes(text : String) -> String {
    let __len : Int = text.count
    if ( __len == 0 ) {
      return "";
    }
    var out : String = ""
    var i : Int = 0
    while (i < __len) {
      let ch : Int = Int(text[text.index(text.startIndex, offsetBy: i)].asciiValue ?? 0)
      if ( (ch == 92) && ((i + 1) < __len) ) {
        let next : Int = Int(text[text.index(text.startIndex, offsetBy: (i + 1))].asciiValue ?? 0)
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
      out = out + (String(text[text.index(text.startIndex, offsetBy:i)..<text.index(text.startIndex, offsetBy:(i + 1))]));
      i = i + 1;
    }
    return out;
  }
  func parseExpect(line : String) -> NGExpectRule {
    let out : NGExpectRule = NGExpectRule()
    let payload : String = (self).trim(text : line)
    if ( (payload.count) == 0 ) {
      return out;
    }
    var body : String = payload
    let idxSep : Int = self.findSpace(text : payload)
    if ( idxSep > 0 ) {
      let idxText : String = String(payload[payload.index(payload.startIndex, offsetBy:0)..<payload.index(payload.startIndex, offsetBy:idxSep)])
      let idxSlice : TokenSlice = TokenSlice.fromText(text : idxText)
      if ( (idxSlice).length() > 0 ) {
        if ( idxSlice.hasInteger(from : 0, to : ((idxSlice).length() - 1)) ) {
          out.testIndex = idxSlice.parseInteger(from : 0, to : ((idxSlice).length() - 1));
          body = (self).trim(text : (String(payload[payload.index(payload.startIndex, offsetBy:(idxSep + 1))..<payload.index(payload.startIndex, offsetBy:(payload.count))])));
        }
      }
    }
    if ( (self).startsWith(text : body, prefix : "not ") ) {
      out.negated = true;
      body = (self).trim(text : (String(body[body.index(body.startIndex, offsetBy:4)..<body.index(body.startIndex, offsetBy:(body.count))])));
    }
    if ( (self).startsWith(text : body, prefix : "tag ") ) {
      out.kind = "tag";
      out.value = self.decodeEscapes(text : (self).trim(text : (String(body[body.index(body.startIndex, offsetBy:4)..<body.index(body.startIndex, offsetBy:(body.count))]))));
      return out;
    }
    if ( (self).startsWith(text : body, prefix : "child ") ) {
      let rest : String = (self).trim(text : (String(body[body.index(body.startIndex, offsetBy:6)..<body.index(body.startIndex, offsetBy:(body.count))])))
      let childIdxSep : Int = self.findSpace(text : rest)
      if ( childIdxSep < 0 ) {
        return out;
      }
      let childIdxText : String = String(rest[rest.index(rest.startIndex, offsetBy:0)..<rest.index(rest.startIndex, offsetBy:childIdxSep)])
      let childIdxSlice : TokenSlice = TokenSlice.fromText(text : childIdxText)
      if ( (childIdxSlice).length() == 0 ) {
        return out;
      }
      if ( childIdxSlice.hasInteger(from : 0, to : ((childIdxSlice).length() - 1)) ) {
      } else {
        return out;
      }
      out.childIndex = childIdxSlice.parseInteger(from : 0, to : ((childIdxSlice).length() - 1));
      let afterIdx : String = (self).trim(text : (String(rest[rest.index(rest.startIndex, offsetBy:(childIdxSep + 1))..<rest.index(rest.startIndex, offsetBy:(rest.count))])))
      let fieldSep : Int = self.findSpace(text : afterIdx)
      if ( fieldSep < 0 ) {
        return out;
      }
      out.kind = "child";
      out.field = String(afterIdx[afterIdx.index(afterIdx.startIndex, offsetBy:0)..<afterIdx.index(afterIdx.startIndex, offsetBy:fieldSep)]);
      out.value = self.decodeEscapes(text : (self).trim(text : (String(afterIdx[afterIdx.index(afterIdx.startIndex, offsetBy:(fieldSep + 1))..<afterIdx.index(afterIdx.startIndex, offsetBy:(afterIdx.count))]))));
      return out;
    }
    if ( (self).startsWith(text : body, prefix : "json ") ) {
      let restJson : String = (self).trim(text : (String(body[body.index(body.startIndex, offsetBy:5)..<body.index(body.startIndex, offsetBy:(body.count))])))
      let pathSep : Int = self.findSpace(text : restJson)
      if ( pathSep < 0 ) {
        return out;
      }
      out.kind = "json";
      out.field = (self).trim(text : (String(restJson[restJson.index(restJson.startIndex, offsetBy:0)..<restJson.index(restJson.startIndex, offsetBy:pathSep)])));
      out.value = self.decodeEscapes(text : (self).trim(text : (String(restJson[restJson.index(restJson.startIndex, offsetBy:(pathSep + 1))..<restJson.index(restJson.startIndex, offsetBy:(restJson.count))]))));
      return out;
    }
    return out;
  }
  func resolveTargetIndex(blockStart : Int, caseCount : Int, idx : Int) -> Int {
    if ( idx >= 0 ) {
      return blockStart + idx;
    }
    return caseCount - 1;
  }
  func parseJsonFile(line : String, cases : [NGTestCase], blockStart : Int) -> Void {
    let payload : String = (self).trim(text : line)
    if ( (payload.count) == 0 ) {
      return;
    }
    if ( (self).startsWith(text : payload, prefix : "all ") ) {
      let allFileName : String = self.decodeEscapes(text : (self).trim(text : (String(payload[payload.index(payload.startIndex, offsetBy:4)..<payload.index(payload.startIndex, offsetBy:(payload.count))]))))
      if ( (allFileName.count) == 0 ) {
        return;
      }
      var from : Int = blockStart
      let to : Int = cases.count
      while (from < to) {
        let tcAll : NGTestCase = cases[from]
        tcAll.jsonFile = allFileName;
        from = from + 1;
      }
      return;
    }
    var target : Int = -1
    var fileName : String = payload
    let idxSep : Int = self.findSpace(text : payload)
    if ( idxSep > 0 ) {
      let idxText : String = String(payload[payload.index(payload.startIndex, offsetBy:0)..<payload.index(payload.startIndex, offsetBy:idxSep)])
      let idxSlice : TokenSlice = TokenSlice.fromText(text : idxText)
      if ( (idxSlice).length() > 0 ) {
        if ( idxSlice.hasInteger(from : 0, to : ((idxSlice).length() - 1)) ) {
          let idxValue : Int = idxSlice.parseInteger(from : 0, to : ((idxSlice).length() - 1))
          target = self.resolveTargetIndex(blockStart : blockStart, caseCount : (cases.count), idx : idxValue);
          fileName = (self).trim(text : (String(payload[payload.index(payload.startIndex, offsetBy:(idxSep + 1))..<payload.index(payload.startIndex, offsetBy:(payload.count))])));
        }
      }
    }
    if ( target < 0 ) {
      target = self.resolveTargetIndex(blockStart : blockStart, caseCount : (cases.count), idx : -1);
    }
    if ( (fileName.count) == 0 ) {
      return;
    }
    if ( (target >= 0) && (target < (cases.count)) ) {
      let tc : NGTestCase = cases[target]
      tc.jsonFile = self.decodeEscapes(text : fileName);
    }
  }
  func parse(specText : String) -> [NGTestCase] {
    var cases : [NGTestCase] = [NGTestCase]()
    var blockStart : Int = 0
    var prevKind : String = "none"
    let __len : Int = specText.count
    var lineStart : Int = 0
    var i : Int = 0
    while (i <= __len) {
      if ( i == __len ) {
      } else {
        let ch : Int = Int(specText[specText.index(specText.startIndex, offsetBy: i)].asciiValue ?? 0)
        if ( (ch == 10) || (ch == 13) ) {
        } else {
          i = i + 1;
          continue;
        }
      }
      let raw : String = String(specText[specText.index(specText.startIndex, offsetBy:lineStart)..<specText.index(specText.startIndex, offsetBy:i)])
      let line : String = (self).trim(text : raw)
      if ( (line.count) > 0 ) {
        if ( self.isCommentLine(line : line) ) {
        } else {
          if ( (self).startsWith(text : line, prefix : "Test ") ) {
            if ( prevKind != "test" ) {
              blockStart = cases.count;
            }
            let tc : NGTestCase = NGTestCase()
            tc.input = self.decodeEscapes(text : (self).trim(text : (String(line[line.index(line.startIndex, offsetBy:5)..<line.index(line.startIndex, offsetBy:(line.count))]))));
            cases.append(tc)
            prevKind = "test";
          } else {
            if ( (self).startsWith(text : line, prefix : "Expect ") ) {
              let ex : NGExpectRule = self.parseExpect(line : (String(line[line.index(line.startIndex, offsetBy:7)..<line.index(line.startIndex, offsetBy:(line.count))])))
              if ( (ex.kind.count) > 0 ) {
                let target : Int = self.resolveTargetIndex(blockStart : blockStart, caseCount : (cases.count), idx : ex.testIndex)
                if ( (target >= 0) && (target < (cases.count)) ) {
                  let tc2 : NGTestCase = cases[target]
                  tc2.expects.append(ex)
                }
              }
              prevKind = "expect";
            } else {
              if ( (self).startsWith(text : line, prefix : "JSON ") ) {
                self.parseJsonFile(line : String(line[line.index(line.startIndex, offsetBy:5)..<line.index(line.startIndex, offsetBy:(line.count))]), cases : cases, blockStart : blockStart)
                prevKind = "json";
              }
            }
          }
        }
      }
      if ( i == __len ) {
        break;
      }
      let firstNl : Int = Int(specText[specText.index(specText.startIndex, offsetBy: i)].asciiValue ?? 0)
      if ( (firstNl == 13) && ((i + 1) < __len) ) {
        if ( (Int(specText[specText.index(specText.startIndex, offsetBy: (i + 1))].asciiValue ?? 0)) == 10 ) {
          i = i + 1;
        }
      }
      i = i + 1;
      lineStart = i;
    }
    return cases;
  }
}
func ==(l: NGTestRunner, r: NGTestRunner) -> Bool {
  return l === r
}
class NGTestRunner : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  class func create() -> NGTestRunner {
    return NGTestRunner();
  }
  func isSpace(ch : Int) -> Bool {
    if ( ch == 32 ) {
      return true;
    }
    if ( ch == 9 ) {
      return true;
    }
    return false;
  }
  func trim(text : String) -> String {
    let __len : Int = text.count
    if ( __len == 0 ) {
      return "";
    }
    var start : Int = 0
    while (start < __len) {
      let ch : Int = Int(text[text.index(text.startIndex, offsetBy: start)].asciiValue ?? 0)
      if ( self.isSpace(ch : ch) ) {
        start = start + 1;
      } else {
        break;
      }
    }
    var stop : Int = __len
    while (stop > start) {
      let ch2 : Int = Int(text[text.index(text.startIndex, offsetBy: (stop - 1))].asciiValue ?? 0)
      if ( self.isSpace(ch : ch2) ) {
        stop = stop - 1;
      } else {
        break;
      }
    }
    if ( stop <= start ) {
      return "";
    }
    return String(text[text.index(text.startIndex, offsetBy:start)..<text.index(text.startIndex, offsetBy:stop)]);
  }
  func startsWith(text : String, prefix : String) -> Bool {
    let tLen : Int = text.count
    let pLen : Int = prefix.count
    if ( pLen > tLen ) {
      return false;
    }
    return (String(text[text.index(text.startIndex, offsetBy:0)..<text.index(text.startIndex, offsetBy:pLen)])) == prefix;
  }
  func endsWithText(text : String, suffix : String) -> Bool {
    let tLen : Int = text.count
    let sLen : Int = suffix.count
    if ( sLen > tLen ) {
      return false;
    }
    return (String(text[text.index(text.startIndex, offsetBy:(tLen - sLen))..<text.index(text.startIndex, offsetBy:tLen)])) == suffix;
  }
  func normalizeJsonNumericText(text : String) -> String {
    var out : String = (self).trim(text : text)
    while (self.endsWithText(text : out, suffix : ".0")) {
      out = String(out[out.index(out.startIndex, offsetBy:0)..<out.index(out.startIndex, offsetBy:((out.count) - 2))]);
    }
    return out;
  }
  func createDetectors() -> [TokenDetector] {
    return StandardDetectors.create();
  }
  func escapeJson(text : String) -> String {
    let __len : Int = text.count
    if ( __len == 0 ) {
      return "";
    }
    var out : String = ""
    var i : Int = 0
    while (i < __len) {
      let ch : Int = Int(text[text.index(text.startIndex, offsetBy: i)].asciiValue ?? 0)
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
      out = out + (String(text[text.index(text.startIndex, offsetBy:i)..<text.index(text.startIndex, offsetBy:(i + 1))]));
      i = i + 1;
    }
    return out;
  }
  func indent(level : Int) -> String {
    var out : String = ""
    var i : Int = 0
    while (i < level) {
      out = out + "  ";
      i = i + 1;
    }
    return out;
  }
  func jsonKVString(key : String, value : String) -> String {
    return ((("\"" + key) + "\":\"") + self.escapeJson(text : value)) + "\"";
  }
  func jsonKVNumber(key : String, value : String) -> String {
    return (("\"" + key) + "\":") + value;
  }
  func jsonObject(level : Int, fields : [String]) -> String {
    let pad : String = self.indent(level : level)
    let childPad : String = self.indent(level : (level + 1))
    var out : String = "{\n"
    let cnt : Int = fields.count
    var i : Int = 0
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
  func parsedValueToJson(token : TokenSlice, level : Int) -> String {
    if ( token.hasSliceValue() ) {
    } else {
      return "null";
    }
    let kind : String = token.getSliceValueKind()
    if ( kind == "datetime" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsDateTimeValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "distance" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsDistanceValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "percentage" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsPercentageValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "recovery-time" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsRecoveryTimeValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "time-value" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsTimeValueValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "weight" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsWeightValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "num-range" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsNumRangeValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "percentage-range" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsPercentageRangeValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "repeat-block" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsRepeatBlockValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "set-rep-range-load" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsSetRepRangeLoadValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "zone" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsZoneValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "positive-integer" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsPositiveIntegerValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "details-level" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsDetailsLevelValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "recovery" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsRecoveryValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "left-right" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsLeftRightValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "feeling" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsFeelingValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "effort" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsEffortValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "body-metric" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsBodyMetricValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "circuit" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsCircuitValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    if ( kind == "context-entry" ) {
      return { () -> String in 
        do {
          return String(data:try JSONSerialization.data(withJSONObject: (token.getAsContextEntryValue()).toDictionary(), options:[]), encoding:.utf8)!
        } catch {
          return ""
        }
      }();
    }
    return ("{\"kind\":\"" + self.escapeJson(text : kind)) + "\"}";
  }
  func tokenToJson(token : TokenSlice, level : Int) -> String {
    let pad : String = self.indent(level : level)
    let childPad : String = self.indent(level : (level + 1))
    var out : String = pad + "{\n"
    out = out + (childPad + (("\"tag\":\"" + self.escapeJson(text : token.tag)) + "\",\n"));
    out = out + (childPad + (("\"text\":\"" + self.escapeJson(text : (token).toString())) + "\",\n"));
    out = out + (((childPad + "\"parsed\":") + self.parsedValueToJson(token : token, level : (level + 1))) + ",\n");
    out = out + (childPad + "\"children\":[");
    let cc : Int = token.childCount()
    var i : Int = 0
    if ( cc > 0 ) {
      out = out + "\n";
      while (i < cc) {
        if ( i > 0 ) {
          out = out + ",\n";
        }
        let ch : TokenSlice = token.getChild(index : i)
        out = out + self.tokenToJson(token : ch, level : (level + 2));
        i = i + 1;
      }
      out = out + "\n";
      out = out + childPad;
    }
    out = out + "]\n";
    out = out + (pad + "}");
    return out;
  }
  func findDot(text : String) -> Int {
    let __len : Int = text.count
    var i : Int = 0
    while (i < __len) {
      if ( (Int(text[text.index(text.startIndex, offsetBy: i)].asciiValue ?? 0)) == 46 ) {
        return i;
      }
      i = i + 1;
    }
    return -1;
  }
  func normalizeJsonPath(path : String) -> String {
    let raw : String = (self).trim(text : path)
    if ( (raw.count) == 0 ) {
      return "";
    }
    var out : String = ""
    let __len : Int = raw.count
    var i : Int = 0
    if ( raw == "$" ) {
      return "";
    }
    if ( (self).startsWith(text : raw, prefix : "$.") ) {
      i = 2;
    } else {
      if ( (self).startsWith(text : raw, prefix : "$") ) {
        i = 1;
      }
    }
    while (i < __len) {
      let ch : Int = Int(raw[raw.index(raw.startIndex, offsetBy: i)].asciiValue ?? 0)
      if ( ch == 91 ) {
        i = i + 1;
        if ( (out.count) > 0 ) {
          out = out + ".";
        }
        while (i < __len) {
          let ch2 : Int = Int(raw[raw.index(raw.startIndex, offsetBy: i)].asciiValue ?? 0)
          if ( ch2 == 93 ) {
            i = i + 1;
            break;
          }
          out = out + (String(raw[raw.index(raw.startIndex, offsetBy:i)..<raw.index(raw.startIndex, offsetBy:(i + 1))]));
          i = i + 1;
        }
        continue;
      }
      out = out + (String(raw[raw.index(raw.startIndex, offsetBy:i)..<raw.index(raw.startIndex, offsetBy:(i + 1))]));
      i = i + 1;
    }
    if ( (self).startsWith(text : out, prefix : ".") ) {
      out = String(out[out.index(out.startIndex, offsetBy:1)..<out.index(out.startIndex, offsetBy:(out.count))]);
    }
    return out;
  }
  func jsonTokenValue(token : TokenSlice, path : String) -> String {
    let p : String = self.normalizeJsonPath(path : path)
    if ( (p.count) == 0 ) {
      return "";
    }
    let dotPos : Int = self.findDot(text : p)
    var head : String = p
    var tail : String = ""
    if ( dotPos >= 0 ) {
      head = String(p[p.index(p.startIndex, offsetBy:0)..<p.index(p.startIndex, offsetBy:dotPos)]);
      tail = String(p[p.index(p.startIndex, offsetBy:(dotPos + 1))..<p.index(p.startIndex, offsetBy:(p.count))]);
    }
    if ( head == "tag" ) {
      if ( (tail.count) == 0 ) {
        return token.tag;
      }
      return "";
    }
    if ( head == "text" ) {
      if ( (tail.count) == 0 ) {
        return (token).toString();
      }
      return "";
    }
    if ( head == "children" ) {
      if ( (tail.count) == 0 ) {
        return "";
      }
      let dotPos2 : Int = self.findDot(text : tail)
      var idxText : String = tail
      var rest : String = ""
      if ( dotPos2 >= 0 ) {
        idxText = String(tail[tail.index(tail.startIndex, offsetBy:0)..<tail.index(tail.startIndex, offsetBy:dotPos2)]);
        rest = String(tail[tail.index(tail.startIndex, offsetBy:(dotPos2 + 1))..<tail.index(tail.startIndex, offsetBy:(tail.count))]);
      }
      let idxSlice : TokenSlice = TokenSlice.fromText(text : idxText)
      if ( (idxSlice).length() == 0 ) {
        return "";
      }
      if ( idxSlice.hasInteger(from : 0, to : ((idxSlice).length() - 1)) ) {
      } else {
        return "";
      }
      let childIdx : Int = idxSlice.parseInteger(from : 0, to : ((idxSlice).length() - 1))
      if ( (childIdx < 0) || (childIdx >= token.childCount()) ) {
        return "";
      }
      let ch : TokenSlice = token.getChild(index : childIdx)
      if ( (rest.count) == 0 ) {
        return (ch).toString();
      }
      return self.jsonTokenValue(token : ch, path : rest);
    }
    if ( head == "parsed" ) {
      if ( (tail.count) == 0 ) {
        return token.getSliceValueKind();
      }
      if ( token.hasSliceValue() ) {
      } else {
        return "";
      }
      let kind : String = token.getSliceValueKind()
      if ( tail == "kind" ) {
        return kind;
      }
      if ( kind == "recovery-time" ) {
        let rv : RecoveryTimeValue = token.getAsRecoveryTimeValue()
        if ( tail == "value" ) {
          return "" + String(rv.value);
        }
        if ( tail == "unit" ) {
          return rv.unit;
        }
      }
      if ( kind == "time-value" ) {
        let tv : TimeValueValue = token.getAsTimeValueValue()
        if ( tail == "minutes" ) {
          return "" + String(tv.minutes);
        }
        if ( tail == "seconds" ) {
          return "" + String(tv.seconds);
        }
      }
      if ( kind == "datetime" ) {
        let dtv : DateTimeValue = token.getAsDateTimeValue()
        if ( tail == "year" ) {
          return "" + String(dtv.year);
        }
        if ( tail == "month" ) {
          return "" + String(dtv.month);
        }
        if ( tail == "day" ) {
          return "" + String(dtv.day);
        }
        if ( tail == "hour" ) {
          return "" + String(dtv.hour);
        }
        if ( tail == "minute" ) {
          return "" + String(dtv.minute);
        }
        if ( tail == "second" ) {
          return "" + String(dtv.second);
        }
        if ( tail == "timezone" ) {
          if ( dtv.timezone != nil  ) {
            return dtv.timezone!;
          }
          return "";
        }
      }
      if ( kind == "distance" ) {
        let dv : DistanceValue = token.getAsDistanceValue()
        if ( tail == "value" ) {
          return "" + String(dv.value);
        }
        if ( tail == "unit" ) {
          return dv.unit;
        }
      }
      if ( kind == "weight" ) {
        let wv : WeightValue = token.getAsWeightValue()
        if ( tail == "value" ) {
          return "" + String(wv.value);
        }
        if ( tail == "unit" ) {
          return wv.unit;
        }
      }
      if ( kind == "percentage" ) {
        let pv : PercentageValue = token.getAsPercentageValue()
        if ( tail == "value" ) {
          return "" + String(pv.value);
        }
      }
      if ( kind == "num-range" ) {
        let nr : NumRangeValue = token.getAsNumRangeValue()
        if ( tail == "minValue" ) {
          return "" + String(nr.minValue);
        }
        if ( tail == "maxValue" ) {
          return "" + String(nr.maxValue);
        }
      }
      if ( kind == "percentage-range" ) {
        let pr : PercentageRangeValue = token.getAsPercentageRangeValue()
        if ( tail == "minValue" ) {
          return "" + String(pr.minValue);
        }
        if ( tail == "maxValue" ) {
          return "" + String(pr.maxValue);
        }
      }
      if ( kind == "zone" ) {
        let zv : ZoneValue = token.getAsZoneValue()
        if ( tail == "zone" ) {
          return "" + String(zv.zone);
        }
      }
      if ( kind == "repeat-block" ) {
        let rb : RepeatBlockValue = token.getAsRepeatBlockValue()
        if ( tail == "count" ) {
          return "" + String(rb.count);
        }
      }
      if ( kind == "left-right" ) {
        let lr : LeftRightValue = token.getAsLeftRightValue()
        if ( tail == "side" ) {
          return lr.side;
        }
      }
      if ( kind == "set-rep-range-load" ) {
        let sr : SetRepRangeLoadValue = token.getAsSetRepRangeLoadValue()
        if ( tail == "count" ) {
          return "" + String(sr.count);
        }
        if ( tail == "setsMin" ) {
          return "" + String(sr.setsMin);
        }
        if ( tail == "setsMax" ) {
          return "" + String(sr.setsMax);
        }
        if ( tail == "repsMin" ) {
          return "" + String(sr.repsMin);
        }
        if ( tail == "repsMax" ) {
          return "" + String(sr.repsMax);
        }
        if ( tail == "mode" ) {
          return sr.mode;
        }
        if ( tail == "load" ) {
          return "" + String(sr.load);
        }
        if ( tail == "unit" ) {
          return sr.unit;
        }
      }
      if ( kind == "feeling" ) {
        let fv : FeelingValue = token.getAsFeelingValue()
        if ( (tail == "type") || (tail == "subKind") ) {
          return fv.kind;
        }
        if ( tail == "score" ) {
          return "" + String(fv.score);
        }
      }
      if ( kind == "effort" ) {
        let ev : EffortValue = token.getAsEffortValue()
        if ( (tail == "type") || (tail == "subKind") ) {
          return ev.kind;
        }
        if ( tail == "score" ) {
          return "" + String(ev.score);
        }
      }
      if ( kind == "body-metric" ) {
        let bm : BodyMetricValue = token.getAsBodyMetricValue()
        if ( tail == "metric" ) {
          return bm.metric;
        }
        if ( tail == "primaryValue" ) {
          return "" + String(bm.primaryValue);
        }
        if ( tail == "secondaryValue" ) {
          return "" + String(bm.secondaryValue);
        }
        if ( tail == "unit" ) {
          return bm.unit;
        }
      }
      if ( kind == "circuit" ) {
        let cv : CircuitValue = token.getAsCircuitValue()
        if ( tail == "rounds" ) {
          return "" + String(cv.rounds);
        }
        if ( tail == "restValue" ) {
          return "" + String(cv.restValue);
        }
        if ( tail == "restUnit" ) {
          return cv.restUnit;
        }
      }
      if ( kind == "details-level" ) {
        let dl : DetailsLevelValue = token.getAsDetailsLevelValue()
        if ( tail == "level" ) {
          return "" + String(dl.level);
        }
        if ( tail == "marker" ) {
          return dl.marker;
        }
      }
      if ( kind == "recovery" ) {
        let rv2 : RecoveryValue = token.getAsRecoveryValue()
        if ( tail == "label" ) {
          return rv2.label;
        }
      }
      if ( kind == "context-entry" ) {
        let ce : ContextEntryValue = token.getAsContextEntryValue()
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
          return "" + String(ce.numericValue);
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
          return "" + String(ce.numericValue);
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
          return "" + String(ce.confidence);
        }
        if ( tail == "hasGoodness" ) {
          if ( ce.hasGoodness ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "goodness" ) {
          return "" + String(ce.goodness);
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
          return "" + String(ce.confidence);
        }
        if ( tail == "hasDerivedGoodness" ) {
          if ( ce.hasGoodness ) {
            return "true";
          }
          return "false";
        }
        if ( tail == "derivedGoodness" ) {
          return "" + String(ce.goodness);
        }
      }
      if ( kind == "positive-integer" ) {
        let piv : PositiveIntegerValue = token.getAsPositiveIntegerValue()
        if ( tail == "value" ) {
          return "" + String(piv.value);
        }
      }
      if ( (tail == "type") || (tail == "subKind") ) {
        return kind;
      }
      return "";
    }
    return "";
  }
  func runSpec(specText : String) -> [String] {
    var out : [String] = [String]()
    let parser : NGTestSpecParser = NGTestSpecParser.create()
    var cases : [NGTestCase] = parser.parse(specText : specText)
    for (i, tc) in cases.enumerated() {
      let p : Parser = Parser(source : tc.input, detectors : self.createDetectors())
      (p).start();
      if ( p.getCount() == 0 ) {
        out.append(((("Test " + ("#" + ("" + String((i + 1))))) + " failed: no tokens for input '") + tc.input) + "'")
        continue;
      }
      var results : [TokenSlice] = p.getResults()
      let root : TokenSlice = results[0]
      for (j, ex) in tc.expects.enumerated() {
        if ( ex.kind == "tag" ) {
          let tagMatches : Bool = root.tag == ex.value
          if ( ex.negated ) {
            if ( tagMatches ) {
              let msgNotTag : String = (("Test " + ("#" + ("" + String((i + 1))))) + " expect not tag '") + ex.value
              out.append(msgNotTag + "' but it matched")
            }
          } else {
            if ( tagMatches ) {
            } else {
              let msgTag : String = (("Test " + ("#" + ("" + String((i + 1))))) + " expect tag '") + ex.value
              out.append(((msgTag + "' but got '") + root.tag) + "'")
            }
          }
          continue;
        }
        if ( ex.kind == "child" ) {
          if ( (ex.childIndex < 0) || (ex.childIndex >= root.childCount()) ) {
            out.append(((("Test " + ("#" + ("" + String((i + 1))))) + " expect child index out of range: ") + ("" + String(ex.childIndex))) + ((" childCount=" + ("" + String(root.childCount()))) + ""))
            continue;
          }
          let ch : TokenSlice = root.getChild(index : ex.childIndex)
          if ( ex.field == "string" ) {
            let got : String = (ch).toString()
            let strMatches : Bool = got == ex.value
            if ( ex.negated ) {
              if ( strMatches ) {
                let msgNotStr : String = (((("Test " + ("#" + ("" + String((i + 1))))) + " expect child ") + ("" + String(ex.childIndex))) + " not string '") + ex.value
                out.append(msgNotStr + "' but it matched")
              }
            } else {
              if ( strMatches ) {
              } else {
                let msgStr : String = (((("Test " + ("#" + ("" + String((i + 1))))) + " expect child ") + ("" + String(ex.childIndex))) + " string '") + ex.value
                out.append(((msgStr + "' but got '") + got) + "'")
              }
            }
            continue;
          }
          if ( ex.field == "tag" ) {
            let gotTag : String = ch.tag
            let tagMatches_1 : Bool = gotTag == ex.value
            if ( ex.negated ) {
              if ( tagMatches_1 ) {
                let msgNotTag_1 : String = (((("Test " + ("#" + ("" + String((i + 1))))) + " expect child ") + ("" + String(ex.childIndex))) + " not tag '") + ex.value
                out.append(msgNotTag_1 + "' but it matched")
              }
            } else {
              if ( tagMatches_1 ) {
              } else {
                let msgTag_1 : String = (((("Test " + ("#" + ("" + String((i + 1))))) + " expect child ") + ("" + String(ex.childIndex))) + " tag '") + ex.value
                out.append(((msgTag_1 + "' but got '") + gotTag) + "'")
              }
            }
            continue;
          }
          out.append(((("Test " + ("#" + ("" + String((i + 1))))) + " unsupported field '") + ex.field) + "' in Expect child")
          continue;
        }
        if ( ex.kind == "json" ) {
          let gotJson : String = self.jsonTokenValue(token : root, path : ex.field)
          if ( (gotJson.count) == 0 ) {
            if ( ex.negated ) {
              continue;
            }
            out.append(((("Test " + ("#" + ("" + String((i + 1))))) + " expect json path '") + ex.field) + "' was not found")
            continue;
          }
          let gotNorm : String = self.normalizeJsonNumericText(text : gotJson)
          let expNorm : String = self.normalizeJsonNumericText(text : ex.value)
          let jsonMatches : Bool = (gotJson == ex.value) || (gotNorm == expNorm)
          if ( ex.negated ) {
            if ( jsonMatches ) {
              let msgNotJson : String = ((("Test " + ("#" + ("" + String((i + 1))))) + " expect json path '") + ex.field) + "' not to be '"
              out.append((msgNotJson + ex.value) + "' but it matched")
            }
          } else {
            if ( jsonMatches ) {
            } else {
              let msgJson : String = ((("Test " + ("#" + ("" + String((i + 1))))) + " expect json path '") + ex.field) + "' value '"
              out.append((((msgJson + ex.value) + "' but got '") + gotJson) + "'")
            }
          }
          continue;
        }
      }
    }
    return out;
  }
  func exportJson(specText : String) -> [String] {
    var out : [String] = [String]()
    let parser : NGTestSpecParser = NGTestSpecParser.create()
    var cases : [NGTestCase] = parser.parse(specText : specText)
    var files : [String] = [String]()
    var payloads : [String] = [String]()
    var counts : [Int] = [Int]()
    for (i, tc) in cases.enumerated() {
      if ( (tc.jsonFile.count) == 0 ) {
        continue;
      }
      let p : Parser = Parser(source : tc.input, detectors : self.createDetectors())
      (p).start();
      if ( p.getCount() == 0 ) {
        continue;
      }
      var results : [TokenSlice] = p.getResults()
      let root : TokenSlice = results[0]
      let json : String = self.tokenToJson(token : root, level : 0)
      var fileIdx : Int = -1
      var search : Int = 0
      while (search < (files.count)) {
        if ( (files[search]) == tc.jsonFile ) {
          fileIdx = search;
          break;
        }
        search = search + 1;
      }
      if ( fileIdx < 0 ) {
        files.append(tc.jsonFile)
        payloads.append(json)
        counts.append(1)
      } else {
        let prevPayload : String = payloads[fileIdx]
        let nextPayload : String = (prevPayload + ",\n") + json
        payloads[fileIdx] = nextPayload;
        let prevCount : Int = counts[fileIdx]
        counts[fileIdx] = prevCount + 1;
      }
    }
    var j : Int = 0
    while (j < (files.count)) {
      let fileName : String = files[j]
      var payload : String = payloads[j]
      let cnt : Int = counts[j]
      if ( cnt > 1 ) {
        payload = ("[\n" + payload) + "\n]";
      }
      out.append((fileName + "\t") + payload)
      j = j + 1;
    }
    return out;
  }
}
func ==(l: TokenDetectorModule, r: TokenDetectorModule) -> Bool {
  return l === r
}
class TokenDetectorModule : Hashable  { 
  func hash(into hasher: inout Hasher) {
    hasher.combine(ObjectIdentifier(self))
  }
  class func createKeyword(token : String) -> KeywordDetector {
    return KeywordDetector.create(token : token);
  }
  class func createDateTime() -> DateTimeDetector {
    return DateTimeDetector.create();
  }
  class func createSpace() -> SpaceDetector {
    return SpaceDetector.create();
  }
  class func createNewline() -> NewlineDetector {
    return NewlineDetector.create();
  }
  class func createPositiveInteger() -> PositiveIntegerDetector {
    return PositiveIntegerDetector.create();
  }
  class func createDecimalNumber() -> DecimalNumberDetector {
    return DecimalNumberDetector.create();
  }
  class func createTimeValue() -> TimeValueDetector {
    return TimeValueDetector.create();
  }
  class func createRecoveryTime() -> RecoveryTimeDetector {
    return RecoveryTimeDetector.create();
  }
  class func createRecovery() -> RecoveryDetector {
    return RecoveryDetector.create();
  }
  class func createLeftRight() -> LeftRightDetector {
    return LeftRightDetector.create();
  }
  class func createFeeling() -> FeelingDetector {
    return FeelingDetector.create();
  }
  class func createEffort() -> EffortDetector {
    return EffortDetector.create();
  }
  class func createBodyMetric() -> BodyMetricDetector {
    return BodyMetricDetector.create();
  }
  class func createCircuit() -> CircuitDetector {
    return CircuitDetector.create();
  }
  class func createContextEntry() -> ContextEntryDetector {
    return ContextEntryDetector.create();
  }
  class func createSpeed() -> SpeedDetector {
    return SpeedDetector.create();
  }
  class func createRepeatBlock() -> RepeatBlockDetector {
    return RepeatBlockDetector.create();
  }
  class func createWeight() -> WeightDetector {
    return WeightDetector.create();
  }
  class func createDistance() -> DistanceDetector {
    return DistanceDetector.create();
  }
  class func createNumRangeBlock() -> NumRangeBlockDetector {
    return NumRangeBlockDetector.create();
  }
  class func createDistanceRangeBlock() -> DistanceRangeBlockDetector {
    return DistanceRangeBlockDetector.create();
  }
  class func createAMTimeValue() -> AMTimeValueDetector {
    return AMTimeValueDetector.create();
  }
  class func defaultSportNames() -> [String] {
    let shared : NGSharedLists = NGSharedLists.__singleton()
    return shared.defaultSportNames();
  }
  class func createSportExercise() -> SportExerciseDetector {
    return SportExerciseDetector.create();
  }
  class func createDetailsData() -> DetailsDataDetector {
    return DetailsDataDetector.create();
  }
  class func createHeadingData() -> HeadingDataDetector {
    return HeadingDataDetector.create();
  }
  class func createBPM() -> BPMDetector {
    return BPMDetector.create();
  }
  class func createKCAL() -> KCALDetector {
    return KCALDetector.create();
  }
  class func createPercentage() -> PercentageDetector {
    return PercentageDetector.create();
  }
  class func createPercentageRange() -> PercentageRangeDetector {
    return PercentageRangeDetector.create();
  }
  class func createRM() -> RMDetector {
    return RMDetector.create();
  }
  class func createSetRepRangeLoad() -> SetRepRangeLoadDetector {
    return SetRepRangeLoadDetector.create();
  }
  class func createZone() -> ZoneDetector {
    return ZoneDetector.create();
  }
  class func createRomanZone() -> RomanZoneDetector {
    return RomanZoneDetector.create();
  }
  class func createStandardDetectors() -> [TokenDetector] {
    return StandardDetectors.create();
  }
  class func createNGTestRunner() -> NGTestRunner {
    return NGTestRunner.create();
  }
  class func createNGTestSpecParser() -> NGTestSpecParser {
    return NGTestSpecParser.create();
  }
}
