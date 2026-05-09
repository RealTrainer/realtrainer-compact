class IfProbe3  {
  constructor() {
  }
  test (a) {
    if ( a < 1 ) {
      return 1;
    }
    if ( a > 9 ) {
      return 2;
    }
    return 0;
  };
}
module.exports.IfProbe3 = IfProbe3;
