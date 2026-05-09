class IfProbe9  {
  constructor() {
  }
  test (x) {
    if ( x < 1 ) {
      return false;
    }
    if ( x > 9 ) {
      return false;
    }
    return true;
  };
}
module.exports.IfProbe9 = IfProbe9;
