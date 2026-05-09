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
    return out;
  };
}
TimeValueDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new TimeValueDetector(s);
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
    return out;
  };
}
RecoveryTimeDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new RecoveryTimeDetector(s);
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
    return out;
  };
}
DistanceDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new DistanceDetector(s);
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
    return out;
  };
}
RepeatBlockDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new RepeatBlockDetector(s);
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
    return out;
  };
}
NumRangeBlockDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new NumRangeBlockDetector(s);
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
    return out;
  };
}
PercentageRangeDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new PercentageRangeDetector(s);
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
    if ( i >= __len ) {
      return this.noMatch();
    }
    const mode = slice.charCodeAt(i);
    if ( mode == 64 ) {
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
        if ( loadDigits.parseInteger(0, ((loadDigits).length() - 1)) <= 0 ) {
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
    return out;
  };
}
SetRepRangeLoadDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new SetRepRangeLoadDetector(s);
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
    return out;
  };
}
PercentageDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new PercentageDetector(s);
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
    return out;
  };
}
ZoneDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new ZoneDetector(s);
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
class DetailsDataDetector  extends TokenDetector {
  constructor(noMatchSlice) {
    super()
    this.cachedNoMatch = noMatchSlice;
    this.detectedTag = "details-data";
  }
  detect (slice) {
    if ( (slice).length() < 1 ) {
      return this.noMatch();
    }
    if ( slice.charCodeAt(0) != 62 ) {
      return this.noMatch();
    }
    const out = slice.read(1);
    out.tag = this.detectedTag;
    return out;
  };
}
DetailsDataDetector.create = function() {
  const s = TokenDetector.createNoMatchSlice();
  return new DetailsDataDetector(s);
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
  ds.push(SportExerciseDetector.create());
  ds.push(DecimalNumberDetector.create());
  ds.push(PositiveIntegerDetector.create());
  ds.push(RepeatBlockDetector.create());
  ds.push(AMTimeValueDetector.create());
  ds.push(DetailsDataDetector.create());
  ds.push(HeadingDataDetector.create());
  return ds;
};
class NGExpectRule  {
  constructor() {
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
    if ( (this).startsWith(payload, "tag ") ) {
      out.kind = "tag";
      out.value = this.decodeEscapes((this).trim((payload.substring(4, (payload.length) ))));
      return out;
    }
    if ( (this).startsWith(payload, "child ") ) {
      const rest = (this).trim((payload.substring(6, (payload.length) )));
      const idxSep = this.findSpace(rest);
      if ( idxSep < 0 ) {
        return out;
      }
      const idxText = rest.substring(0, idxSep );
      const idxSlice = TokenSlice.fromText(idxText);
      if ( (idxSlice).length() == 0 ) {
        return out;
      }
      if ( idxSlice.hasInteger(0, ((idxSlice).length() - 1)) ) {
      } else {
        return out;
      }
      out.childIndex = idxSlice.parseInteger(0, ((idxSlice).length() - 1));
      const afterIdx = (this).trim((rest.substring((idxSep + 1), (rest.length) )));
      const fieldSep = this.findSpace(afterIdx);
      if ( fieldSep < 0 ) {
        return out;
      }
      out.kind = "child";
      out.field = afterIdx.substring(0, fieldSep );
      out.value = this.decodeEscapes((this).trim((afterIdx.substring((fieldSep + 1), (afterIdx.length) ))));
      return out;
    }
    return out;
  };
  parse (specText) {
    let cases = [];
    let active;
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
            const tc = new NGTestCase();
            tc.input = this.decodeEscapes((this).trim((line.substring(5, (line.length) ))));
            cases.push(tc);
            active = tc;
          } else {
            if ( (this).startsWith(line, "Expect ") ) {
              if ( typeof(active) != "undefined" ) {
                const ex = this.parseExpect((line.substring(7, (line.length) )));
                if ( (ex.kind.length) > 0 ) {
                  const tc2 = active;
                  tc2.expects.push(ex);
                }
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
  createDetectors () {
    return StandardDetectors.create();
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
        }
      };
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
module.exports.TokenSlice = TokenSlice;
module.exports.TokenDetector = TokenDetector;
module.exports.KeywordDetector = KeywordDetector;
module.exports.DateTimeValue = DateTimeValue;
module.exports.DateTimeDetector = DateTimeDetector;
module.exports.SpaceDetector = SpaceDetector;
module.exports.NewlineDetector = NewlineDetector;
module.exports.PositiveIntegerDetector = PositiveIntegerDetector;
module.exports.DecimalNumberDetector = DecimalNumberDetector;
module.exports.TimeValueDetector = TimeValueDetector;
module.exports.RecoveryTimeDetector = RecoveryTimeDetector;
module.exports.DistanceDetector = DistanceDetector;
module.exports.SpeedDetector = SpeedDetector;
module.exports.RepeatBlockDetector = RepeatBlockDetector;
module.exports.Parser = Parser;
module.exports.WeightDetector = WeightDetector;
module.exports.NumRangeBlockDetector = NumRangeBlockDetector;
module.exports.DistanceRangeBlockDetector = DistanceRangeBlockDetector;
module.exports.AMTimeValueDetector = AMTimeValueDetector;
module.exports.NGSharedLists = NGSharedLists;
module.exports.KCALDetector = KCALDetector;
module.exports.BPMDetector = BPMDetector;
module.exports.PercentageRangeDetector = PercentageRangeDetector;
module.exports.SetRepRangeLoadDetector = SetRepRangeLoadDetector;
module.exports.PercentageDetector = PercentageDetector;
module.exports.RMDetector = RMDetector;
module.exports.ZoneDetector = ZoneDetector;
module.exports.RomanZoneDetector = RomanZoneDetector;
module.exports.DetailsDataDetector = DetailsDataDetector;
module.exports.HeadingDataDetector = HeadingDataDetector;
module.exports.NGSharedDetectorFactory = NGSharedDetectorFactory;
module.exports.SportExerciseDetector = SportExerciseDetector;
module.exports.StandardDetectors = StandardDetectors;
module.exports.NGExpectRule = NGExpectRule;
module.exports.NGTestCase = NGTestCase;
module.exports.NGTestSpecParser = NGTestSpecParser;
module.exports.NGTestRunner = NGTestRunner;
module.exports.TokenDetectorModule = TokenDetectorModule;
