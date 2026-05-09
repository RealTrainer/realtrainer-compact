
class TokenSlice( text : String, from : Int, length : Int ) 
 {
  var source : String  = "";
  var start : Int  = 0;
  var size : Int  = 0;
  var tag : String  = "";
  
  init {
    source = text;
    val textLen : Int  = text.length;
    var safeStart : Int  = from;
    if ( safeStart < 0 ) {
      safeStart = 0;
    }
    if ( safeStart > textLen ) {
      safeStart = textLen;
    }
    var safeLength : Int  = length;
    if ( safeLength < 0 ) {
      safeLength = 0;
    }
    if ( (safeStart + safeLength) > textLen ) {
      safeLength = textLen - safeStart;
    }
    start = safeStart;
    size = safeLength;
  }
  companion object {
    
    fun  fromText( text : String) : TokenSlice {
      return  TokenSlice(text, 0, text.length);
    }
  }
  
  fun  length() : Int {
    return size;
  }
  
  fun  isEmpty() : Boolean {
    return size == 0;
  }
  
  fun  toString() : String {
    return source.substring(start, (start + size) );
  }
  
  fun  charCodeAt( index : Int) : Int {
    if ( index < 0 ) {
      return -1;
    }
    if ( index >= size ) {
      return -1;
    }
    return source[(start + index)].code;
  }
  
  fun  hasInteger( from : Int, to : Int) : Boolean {
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
  
  fun  parseInteger( from : Int, to : Int) : Int {
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
  
  fun  hasDouble( from : Int, to : Int) : Boolean {
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
  
  fun  parseDouble( from : Int, to : Int) : Double {
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
  
  fun  peek( offset : Int) : TokenSlice {
    var safeOffset : Int  = offset;
    if ( safeOffset < 0 ) {
      safeOffset = 0;
    }
    if ( safeOffset > size ) {
      safeOffset = size;
    }
    return  TokenSlice(source, start + safeOffset, size - safeOffset);
  }
  
  fun  step( count : Int) : TokenSlice {
    return this.peek(count);
  }
  
  fun  read( count : Int) : TokenSlice {
    var safeCount : Int  = count;
    if ( safeCount < 0 ) {
      safeCount = 0;
    }
    if ( safeCount > size ) {
      safeCount = size;
    }
    return  TokenSlice(source, start, safeCount);
  }
  
  fun  slice( count : Int) : TokenSlice {
    return this.read(count);
  }
  
  fun  hasToken( token : String) : Boolean {
    val tLen : Int  = token.length;
    if ( tLen == 0 ) {
      return true;
    }
    if ( tLen > size ) {
      return false;
    }
    val me : String  = (this.read(tLen)).toString();
    return me == token;
  }
  
  fun  endsWith( token : String) : Boolean {
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
  
  fun  findTokenPos( token : String) : Int {
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
  
  fun  splitWithToken( token : String) : TokenSlice {
    val pos : Int  = this.findTokenPos(token);
    if ( pos < 0 ) {
      return  TokenSlice(source, start, size);
    }
    return  TokenSlice(source, start, pos);
  }
  
  fun  sliceToToken( token : String) : TokenSlice {
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
  var detectedTag : String  = "unknown";
  var cachedNoMatch : TokenSlice  =  TokenSlice("", 0, 0);
  
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
  
  fun  getNoMatchSlice() : TokenSlice {
    return cachedNoMatch;
  }
  
  fun  noMatch() : TokenSlice {
    return this.getNoMatchSlice();
  }
  
  fun  detect( slice : TokenSlice) : TokenSlice {
    return this.noMatch();
  }
}



class KeywordDetector( token : String, noMatchSlice : TokenSlice ) : TokenDetector() 
 {
  var keyword : String  = "";
  
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
  
  fun  detect( slice : TokenSlice) : TokenSlice {
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


class DateTimeValue 
 {
  var ok : Boolean  = false;
  var raw : String  = "";
  var year : Int  = 0;
  var month : Int  = 0;
  var day : Int  = 0;
  var hasTime : Boolean  = false;
  var hour : Int  = 0;
  var minute : Int  = 0;
  var second : Int  = 0;
  var timezone : String?  = null;
}

class DateTimeDetector( noMatchSlice : TokenSlice ) : TokenDetector() 
 {
  var sliceMap : MutableMap<TokenSlice,DateTimeValue>  = hashMapOf();
  
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
  
  fun  parseToMap( slice : TokenSlice) : DateTimeValue {
    if ( sliceMap.containsKey(slice) ) {
      val cached : DateTimeValue?  = sliceMap[slice];
      if ( cached != null ) {
        return cached!!;
      }
    }
    val val : DateTimeValue  = this.parseValue(slice);
    sliceMap.set(slice, val)
    return val;
  }
  
  fun  hasDateShape( slice : TokenSlice) : Boolean {
    if ( (slice).length() < 10 ) {
      return false;
    }
    if ( slice.hasInteger(0, 3) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt(4) != 45 ) {
      return false;
    }
    if ( slice.hasInteger(5, 6) ) {
    } else {
      return false;
    }
    if ( slice.charCodeAt(7) != 45 ) {
      return false;
    }
    if ( slice.hasInteger(8, 9) ) {
    } else {
      return false;
    }
    val month : Int  = slice.parseInteger(5, 6);
    val day : Int  = slice.parseInteger(8, 9);
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
  
  fun  isoPrefixLength( slice : TokenSlice) : Int {
    if ( this.hasDateShape(slice) ) {
    } else {
      return 0;
    }
    val __len : Int  = (slice).length();
    var idx : Int  = 10;
    if ( idx >= __len ) {
      return idx;
    }
    if ( slice.charCodeAt(idx) != 84 ) {
      return idx;
    }
    if ( (idx + 6) > __len ) {
      return 0;
    }
    if ( slice.hasInteger(idx + 1, idx + 2) ) {
    } else {
      return 0;
    }
    if ( slice.charCodeAt((idx + 3)) != 58 ) {
      return 0;
    }
    if ( slice.hasInteger(idx + 4, idx + 5) ) {
    } else {
      return 0;
    }
    val hour : Int  = slice.parseInteger(idx + 1, idx + 2);
    val minute : Int  = slice.parseInteger(idx + 4, idx + 5);
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
    if ( ((idx + 3) <= __len) && (slice.charCodeAt(idx) == 58) ) {
      if ( slice.hasInteger(idx + 1, idx + 2) ) {
      } else {
        return 0;
      }
      val sec : Int  = slice.parseInteger(idx + 1, idx + 2);
      if ( sec < 0 ) {
        return 0;
      }
      if ( sec > 59 ) {
        return 0;
      }
      idx = idx + 3;
    }
    if ( idx < __len ) {
      val tzCh : Int  = slice.charCodeAt(idx);
      if ( tzCh == 90 ) {
        idx = idx + 1;
      }
      if ( (tzCh == 43) || (tzCh == 45) ) {
        if ( (idx + 6) > __len ) {
          return 0;
        }
        if ( slice.hasInteger(idx + 1, idx + 2) ) {
        } else {
          return 0;
        }
        if ( slice.charCodeAt((idx + 3)) != 58 ) {
          return 0;
        }
        if ( slice.hasInteger(idx + 4, idx + 5) ) {
        } else {
          return 0;
        }
        val tzHour : Int  = slice.parseInteger(idx + 1, idx + 2);
        val tzMin : Int  = slice.parseInteger(idx + 4, idx + 5);
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
  
  fun  parseValue( slice : TokenSlice) : DateTimeValue {
    val out : DateTimeValue  =  DateTimeValue();
    val plen : Int  = this.isoPrefixLength(slice);
    if ( plen == 0 ) {
      return out;
    }
    val core : TokenSlice  = slice.read(plen);
    out.ok = true;
    out.raw = (core).toString();
    out.year = core.parseInteger(0, 3);
    out.month = core.parseInteger(5, 6);
    out.day = core.parseInteger(8, 9);
    if ( (core).length() > 10 ) {
      out.hasTime = true;
      out.hour = core.parseInteger(11, 12);
      out.minute = core.parseInteger(14, 15);
      var idx : Int  = 16;
      if ( ((core).length() >= 19) && (core.charCodeAt(16) == 58) ) {
        out.second = core.parseInteger(17, 18);
        idx = 19;
      }
      if ( idx < (core).length() ) {
        out.timezone = (core.peek(idx)).toString();
      }
    }
    return out;
  }
  
  fun  detect( slice : TokenSlice) : TokenSlice {
    val plen : Int  = this.isoPrefixLength(slice);
    if ( plen == 0 ) {
      return this.noMatch();
    }
    val matched : TokenSlice  = slice.read(plen);
    matched.tag = detectedTag;
    return matched;
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
  }
}


