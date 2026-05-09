func ==(l: TokenSlice, r: TokenSlice) -> Bool {
  return l === r
}
class TokenSlice : Equatable  { 
  var source : String = ""
  var start : Int = 0
  var size : Int = 0
  var tag : String = ""
  init(text : String, from : Int, length : Int ) {
    self.source = text;
    let textLen : Int = text.count
    var safeStart : Int = from
    if ( safeStart < 0 ) {
      safeStart = 0;
    }
    if ( safeStart > textLen ) {
      safeStart = textLen;
    }
    var safeLength : Int = length
    if ( safeLength < 0 ) {
      safeLength = 0;
    }
    if ( (safeStart + safeLength) > textLen ) {
      safeLength = textLen - safeStart;
    }
    self.start = safeStart;
    self.size = safeLength;
  }
  class func fromText(text : String) -> TokenSlice {
    return TokenSlice(text : text, from : 0, length : text.count);
  }
  func length() -> Int {
    return self.size;
  }
  func isEmpty() -> Bool {
    return self.size == 0;
  }
  func toString() -> String {
    return String(self.source[self.source.index(self.source.startIndex, offsetBy:self.start)..<self.source.index(self.source.startIndex, offsetBy:(self.start + self.size))]);
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
    if ( typeof(v) != "undefined" ) {
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
  func hasToken(token : String) -> Bool {
    let tLen : Int = token.count
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > self.size ) {
      return false;
    }
    let me : String = (self.read(count : tLen)).toString()
    return me == token;
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
class TokenDetector : Equatable  { 
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
    super.init()
    self.cachedNoMatch = noMatchSlice;
    self.keyword = token;
    self.detectedTag = "keyword";
  }
  override class func create(token : String) -> KeywordDetector {
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
func ==(l: DateTimeValue, r: DateTimeValue) -> Bool {
  return l === r
}
class DateTimeValue : Equatable  { 
  var ok : Bool = false
  var raw : String = ""
  var year : Int = 0
  var month : Int = 0
  var day : Int = 0
  var hasTime : Bool = false
  var hour : Int = 0
  var minute : Int = 0
  var second : Int = 0
  var timezone : String?
}
func ==(l: DateTimeDetector, r: DateTimeDetector) -> Bool {
  return l === r
}
class DateTimeDetector : TokenDetector { 
  var sliceMap : [TokenSlice:DateTimeValue] = [TokenSlice:DateTimeValue]()
  override init(noMatchSlice : TokenSlice ) {
    super.init()
    self.cachedNoMatch = noMatchSlice;
    self.detectedTag = "datetime";
  }
  override class func create() -> DateTimeDetector {
    let s : TokenSlice = TokenDetector.createNoMatchSlice()
    return DateTimeDetector(noMatchSlice : s);
  }
  func parseToMap(slice : TokenSlice) -> DateTimeValue {
    if ( self.sliceMap[slice] != nil ) {
      let cached : DateTimeValue? = self.sliceMap[slice]
      if ( cached != nil  ) {
        return cached!;
      }
    }
    let val : DateTimeValue = self.parseValue(slice : slice)
    self.sliceMap[slice] = val;
    return val;
  }
  func hasDateShape(slice : TokenSlice) -> Bool {
    if ( (slice).length() < 10 ) {
      return false;
    }
    if ( slice.hasInteger(from : 0, to : 3) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt(index : 4) != 45 ) {
      return false;
    }
    if ( slice.hasInteger(from : 5, to : 6) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt(index : 7) != 45 ) {
      return false;
    }
    if ( slice.hasInteger(from : 8, to : 9) ) {
    } else {
      return false;
    }
    let month : Int = slice.parseInteger(from : 5, to : 6)
    let day : Int = slice.parseInteger(from : 8, to : 9)
    if ( month < 1 ) {
      return false;
    }
    if ( month > 12 ) {
      return false;
    }
    if ( day < 1 ) {
      return false;
    }
    if ( day > 31 ) {
      return false;
    }
    return true;
  }
  func isoPrefixLength(slice : TokenSlice) -> Int {
    if ( self.hasDateShape(slice : slice) ) {
    } else {
      return 0;
    }
    let __len : Int = (slice).length()
    var idx : Int = 10
    if ( idx >= __len ) {
      return idx;
    }
    if ( slice.charCodeAt(index : idx) != 84 ) {
      return idx;
    }
    if ( (idx + 6) > __len ) {
      return 0;
    }
    if ( slice.hasInteger(from : (idx + 1), to : (idx + 2)) ) {
    } else {
      return 0;
    }
    if ( slice.charCodeAt(index : (idx + 3)) != 58 ) {
      return 0;
    }
    if ( slice.hasInteger(from : (idx + 4), to : (idx + 5)) ) {
    } else {
      return 0;
    }
    let hour : Int = slice.parseInteger(from : (idx + 1), to : (idx + 2))
    let minute : Int = slice.parseInteger(from : (idx + 4), to : (idx + 5))
    if ( hour < 0 ) {
      return 0;
    }
    if ( hour > 23 ) {
      return 0;
    }
    if ( minute < 0 ) {
      return 0;
    }
    if ( minute > 59 ) {
      return 0;
    }
    idx = idx + 6;
    if ( ((idx + 3) <= __len) && (slice.charCodeAt(index : idx) == 58) ) {
      if ( slice.hasInteger(from : (idx + 1), to : (idx + 2)) ) {
      } else {
        return 0;
      }
      let sec : Int = slice.parseInteger(from : (idx + 1), to : (idx + 2))
      if ( sec < 0 ) {
        return 0;
      }
      if ( sec > 59 ) {
        return 0;
      }
      idx = idx + 3;
    }
    if ( idx < __len ) {
      let tzCh : Int = slice.charCodeAt(index : idx)
      if ( tzCh == 90 ) {
        idx = idx + 1;
      }
      if ( (tzCh == 43) || (tzCh == 45) ) {
        if ( (idx + 6) > __len ) {
          return 0;
        }
        if ( slice.hasInteger(from : (idx + 1), to : (idx + 2)) ) {
        } else {
          return 0;
        }
        if ( slice.charCodeAt(index : (idx + 3)) != 58 ) {
          return 0;
        }
        if ( slice.hasInteger(from : (idx + 4), to : (idx + 5)) ) {
        } else {
          return 0;
        }
        let tzHour : Int = slice.parseInteger(from : (idx + 1), to : (idx + 2))
        let tzMin : Int = slice.parseInteger(from : (idx + 4), to : (idx + 5))
        if ( tzHour < 0 ) {
          return 0;
        }
        if ( tzHour > 23 ) {
          return 0;
        }
        if ( tzMin < 0 ) {
          return 0;
        }
        if ( tzMin > 59 ) {
          return 0;
        }
        idx = idx + 6;
      }
    }
    return idx;
  }
  func parseValue(slice : TokenSlice) -> DateTimeValue {
    let out : DateTimeValue = DateTimeValue()
    let plen : Int = self.isoPrefixLength(slice : slice)
    if ( plen == 0 ) {
      return out;
    }
    let core : TokenSlice = slice.read(count : plen)
    out.ok = true;
    out.raw = (core).toString();
    out.year = core.parseInteger(from : 0, to : 3);
    out.month = core.parseInteger(from : 5, to : 6);
    out.day = core.parseInteger(from : 8, to : 9);
    if ( (core).length() > 10 ) {
      out.hasTime = true;
      out.hour = core.parseInteger(from : 11, to : 12);
      out.minute = core.parseInteger(from : 14, to : 15);
      var idx : Int = 16
      if ( ((core).length() >= 19) && (core.charCodeAt(index : 16) == 58) ) {
        out.second = core.parseInteger(from : 17, to : 18);
        idx = 19;
      }
      if ( idx < (core).length() ) {
        out.timezone = (core.peek(offset : idx)).toString();
      }
    }
    return out;
  }
  override func detect(slice : TokenSlice) -> TokenSlice {
    let plen : Int = self.isoPrefixLength(slice : slice)
    if ( plen == 0 ) {
      return self.noMatch();
    }
    let matched : TokenSlice = slice.read(count : plen)
    matched.tag = self.detectedTag;
    return matched;
  }
}
func ==(l: TokenDetectorModule, r: TokenDetectorModule) -> Bool {
  return l === r
}
class TokenDetectorModule : Equatable  { 
  class func createKeyword(token : String) -> KeywordDetector {
    return KeywordDetector.create(token : token);
  }
  class func createDateTime() -> DateTimeDetector {
    return DateTimeDetector.create();
  }
}
