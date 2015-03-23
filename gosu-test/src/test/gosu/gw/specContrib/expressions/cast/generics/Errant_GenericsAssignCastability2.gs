package gw.specContrib.expressions.cast.generics

class Errant_GenericsAssignCastability2 {
  class Super<T>{}
  class Sub<T> extends Super<T> {}

  class Parent {}
  class Child extends Parent {}

  var superParent: Super<Parent>
  var superChild: Super<Child>

  var subParent: Sub<Parent>
  var subChild: Sub<Child>

  function testAssignability() {
    var s1111: Super<Parent> = superChild
    var s1112: Super<Parent> = subParent
    var s1113: Super<Parent> = subChild
//    var s1114 : Super<Parent> = superParent

    //IDE-1722
    var s2111: Super<Child> = superParent      //## issuekeys: MSG_TYPE_MISMATCH
    var s2112: Super<Child> = subParent      //## issuekeys: MSG_TYPE_MISMATCH
    var s2113: Super<Child> = subChild
//    var s2114 : Super<Child> = superChild


    var s3111: Sub<Parent> = subChild
    var s3112: Sub<Parent> = superParent      //## issuekeys: MSG_TYPE_MISMATCH
    var s3123: Sub<Parent> = superChild      //## issuekeys: MSG_TYPE_MISMATCH
//    var s3124: Sub<Parent> = subParent

    //IDE-1722
    var s4111: Sub<Child> = subParent      //## issuekeys: MSG_TYPE_MISMATCH
    var s4122: Sub<Child> = superParent      //## issuekeys: MSG_TYPE_MISMATCH
    var s4123: Sub<Child> = superChild        //## issuekeys: MSG_TYPE_MISMATCH
//    var s4124 : Sub<Child> = subChild

  }
  function testCastability() {

//    var a111 = superParent as Super<Parent>
    var a112 = superParent as Super<Child>
    var a113 = superParent as Sub<Parent>
    var a114 = superParent as Sub<Child>

    var b111 = superChild as Super<Parent>  //## issuekeys: MSG_UNNECESSARY_COERCION
//    var b112 = superChild as Super<Child>
    var b113 = superChild as Sub<Parent>
    var b114 = superChild as Sub<Child>

    var c111 = subParent as Super<Parent>  //## issuekeys: MSG_UNNECESSARY_COERCION
    var c112 = subParent as Super<Child>
//    var c113 = subParent as Sub<Parent>
    var c114 = subParent as Sub<Child>

    var d111 = subChild as Super<Parent>  //## issuekeys: MSG_UNNECESSARY_COERCION
    var d112 = subChild as Super<Child>  //## issuekeys: MSG_UNNECESSARY_COERCION
    var d113 = subChild as Sub<Parent>  //## issuekeys: MSG_UNNECESSARY_COERCION
//    var d114 = subChild as Sub<Child>

  }
}