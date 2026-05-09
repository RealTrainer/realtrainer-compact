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
module.exports.TokenSlice = TokenSlice;
