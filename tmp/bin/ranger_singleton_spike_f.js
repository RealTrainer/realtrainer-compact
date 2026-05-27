class A  {
  constructor() {
    this.instance = new A();     /** note: unused */
  }
}
A.create = function() {
  return A.instance;
};
class Tester  {
  constructor() {
  }
}
module.exports.A = A;
module.exports.Tester = Tester;
