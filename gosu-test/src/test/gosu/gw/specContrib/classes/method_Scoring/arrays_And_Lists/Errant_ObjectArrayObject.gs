package gw.specContrib.classes.method_Scoring.arrays_And_Lists

class Errant_ObjectArrayObject {
  class AAA {}
  class BBB {}
  function foo(o: Object) : AAA { return null }
  function foo(o: Object[]) : BBB { return null }

  function main() {
    //IDE-1482
    var s: String[]
    var a : AAA = foo(s)      //## issuekeys: INCOMPATIBLE TYPES. FOUND: 'GW.SPECCONTRIB.AAA.PARSERVSOPENSOURCE.METHODSCORINGOVERLOADING.ARRAYS_AND_LISTS.TOBEPUSHED.ERRANT_OBJECTARRAYOBJECT.BBB', REQUIRED: 'GW.SPECCONTRIB.AAA.PARSERVSOPENSOURCE.METHODSCORINGOVERLOADING.ARRAYS_AND_LISTS.TOBEPUSHED.ERRANT_OBJECTARRAYOBJECT.AAA'
    var b : BBB = foo(s)

    // IDE-1770
    var i1: java.lang.Integer[][]
    var a1 : AAA = foo(s)      //## issuekeys: INCOMPATIBLE TYPES
    var b1 : BBB = foo(s)

    var i2: java.lang.Integer[][][]
    var a2 : AAA = foo(s)      //## issuekeys: INCOMPATIBLE TYPES
    var b2 : BBB = foo(s)
  }
}