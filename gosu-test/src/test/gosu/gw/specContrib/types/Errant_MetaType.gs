package gw.specContrib.types

class Errant_MetaType {
  public static final var OH: String = "oh"

  static function main(args: String[]) {
    var b = new Errant_MetaType()

    var t1 = Errant_MetaType
    var t2 = statictypeof b
    var t3 = Errant_MetaType.Type

    print(t1.OH)
    print(t2.OH)  //## issuekeys: MSG_INVALID_REFERENCE
    print(t3.OH)  //## issuekeys: MSG_INVALID_REFERENCE
  }

  function foo<T>(): T[] {
    return T.Type.makeArrayInstance(2) as T[]
  }
}