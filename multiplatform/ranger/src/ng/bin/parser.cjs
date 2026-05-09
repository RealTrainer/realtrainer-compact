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
class DateTimeValue  {
  constructor() {
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.hasTime = false;     /** note: unused */
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
  }
}
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
        return cachedHit;
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
    this.sliceMap[newSlice] = out;
    this.sliceMap[slice] = out;
    this.sliceHitMap[newSlice] = newSlice;
    this.sliceHitMap[slice] = newSlice;
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
module.exports.TokenSlice = TokenSlice;
module.exports.TokenDetector = TokenDetector;
module.exports.DateTimeValue = DateTimeValue;
module.exports.DateTimeDetector = DateTimeDetector;
module.exports.Parser = Parser;
