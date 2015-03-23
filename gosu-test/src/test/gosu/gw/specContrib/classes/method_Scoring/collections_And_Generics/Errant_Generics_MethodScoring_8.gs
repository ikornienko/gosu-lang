package gw.specContrib.classes.method_Scoring.collections_And_Generics

uses java.lang.*

class Errant_Generics_MethodScoring_8 {

  //More cases for # IDE-1750
  class A<T, S> {}
  class B<T, S> extends A<T, S> {}

  //Used as return types
  class X {}
  class Y {}

  function foo1<T>(p: A<T, T>) : X { return null }
  function foo1<T>(p: B<T, T>) : Y { return null }
  function testFoo1() {
    var x111 : X = foo1(new B<String, String>())      //## issuekeys: MSG_TYPE_MISMATCH
    var x112 : X = foo1(new B<String, Integer>())      //## issuekeys: MSG_TYPE_MISMATCH
    var x113 : X = foo1(new B<Integer, Integer>())      //## issuekeys: MSG_TYPE_MISMATCH

    var y111 : Y = foo1(new B<String, String>())
    var y112 : Y = foo1(new B<String, Integer>())
    var y113 : Y = foo1(new B<Integer, Integer>())
  }

  function foo2<T, S>(p: A<T, S>) : X { return null }
  function foo2<T, S>(p: B<T, S>) : Y { return null }

  function testFoo2() {
    var x111 : X = foo2(new B<String, String>())      //## issuekeys: MSG_TYPE_MISMATCH
    var x112 : X = foo2(new B<String, Integer>())      //## issuekeys: MSG_TYPE_MISMATCH

    var y111 : Y = foo2(new B<String, String>())
    var y112 : Y = foo2(new B<String, Integer>())
  }



  function foo3<T>(p:A<T, T>) : X { return null }
  function foo3<T extends String>(p:B<T, T>)  : Y { return null }
  function testFoo3() {
    var x111 : X = foo3(new B<String, String>())      //## issuekeys: MSG_TYPE_MISMATCH
    var x112 : X = foo3(new B<String, Integer>())
    var x113 : X = foo3(new B<Integer, Integer>())

    var y111 : Y = foo3(new B<String, String>())
    var y112 : Y = foo3(new B<String, Integer>())      //## issuekeys: MSG_TYPE_MISMATCH
    var y113 : Y = foo3(new B<Integer, Integer>())      //## issuekeys: MSG_TYPE_MISMATCH
  }

  function foo4<T, S>(p: A<T, S>) : X { return null }
  function foo4<T extends String, S>(p: B<T, S>)  : Y { return null }
  function testFoo4() {
    var x111 : X = foo4(new B<String, String>())      //## issuekeys: MSG_TYPE_MISMATCH
    var x112 : X = foo4(new B<String, Integer>())      //## issuekeys: MSG_TYPE_MISMATCH
    var x113 : X = foo4(new B<Integer, Integer>())

    var y111 : Y = foo4(new B<String, String>())
    var y112 : Y = foo4(new B<String, Integer>())
    var y113 : Y = foo4(new B<Integer, Integer>())      //## issuekeys: MSG_TYPE_MISMATCH
  }

  function foo5<T>(p: A<T, String>)  : X { return null }
  function foo5<T extends String>(p: B<T, String>)  : Y { return null }

  function testFoo5() {
    var x111 : X = foo5(new B<String, String>())      //## issuekeys: MSG_TYPE_MISMATCH
    var x112 : X = foo5(new B<String, Integer>())      //## issuekeys: MSG_AMBIGUOUS_METHOD_INVOCATION
    var x113 : X = foo5(new B<Integer, String>())

    var y111 : Y = foo5(new B<String, String>())
    var y112 : Y = foo5(new B<String, Integer>())      //## issuekeys: MSG_AMBIGUOUS_METHOD_INVOCATION
    var y113 : Y = foo5(new B<Integer, String>())      //## issuekeys: MSG_TYPE_MISMATCH
  }

  class C<T> {}
  class D<T> extends C<T> {}

  function foo6<T>(p: C<T>): X { return null }
  function foo6<T>(p: D<T>): Y { return null }

  function testFoo6() {
    // IDE-1750
    var x111: X = foo6(new C<Object>())
    var y111: Y = foo6(new D<Object>())
  }
}
