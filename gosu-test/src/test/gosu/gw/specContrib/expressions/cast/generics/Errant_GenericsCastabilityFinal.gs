package gw.specContrib.expressions.cast.generics

uses java.lang.Cloneable

class Errant_GenericsCastabilityFinal {
  static class A  {}
  static class B extends A implements Cloneable {}

  static class Box<T> {}

  final class FinalA{}

  static function main(args: String[]) {
    var a1 = new Box<B>()
    var b1 = a1 as Box<Cloneable>  //## issuekeys: MSG_UNNECESSARY_COERCION

    var a2: Box<A> = new Box<B>()
    var b2 = a2 as Box<Cloneable>

    var a3 = new Box<A>()
    var b3 = a3 as Box<Cloneable>

    var f4 = new Box<FinalA>()
    var b4 = f4 as Box<Cloneable>         //## issuekeys: MSG_TYPE_MISMATCH
  }
}
