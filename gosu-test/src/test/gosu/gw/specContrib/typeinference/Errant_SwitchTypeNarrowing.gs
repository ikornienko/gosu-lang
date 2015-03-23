package gw.specContrib.typeinference

uses java.lang.Runnable

class Errant_SwitchTypeNarrowing {
  private enum MyEnum  { ONE, TWO }

  private function foo1(x: Object) {
    switch (typeof(x)) {
      case String:
      default:
        x.contains("ne")         //## issuekeys: MSG_NO_METHOD_DESCRIPTOR_FOUND_FOR_METHOD, MSG_NO_METHOD_DESCRIPTOR_FOUND_FOR_METHOD, MSG_NO_SUCH_FUNCTION
    }
  }

  private function foo2(x: Object) {
    switch (typeof(x)) {
      case MyEnum:
        switch (x) {
          case ONE:
            return
        }
      case String:  //## issuekeys: MSG_NONTERMINAL_CASE_CLAUSE
        x.contains("ne")         //## issuekeys: MSG_NO_METHOD_DESCRIPTOR_FOUND_FOR_METHOD, MSG_NO_METHOD_DESCRIPTOR_FOUND_FOR_METHOD, MSG_NO_SUCH_FUNCTION
    }
  }

  private function foo3(x: Object) {
    switch (typeof(x)) {
      case MyEnum:
        if (x == ONE) {
          break
        }
      case String:  //## issuekeys: MSG_NONTERMINAL_CASE_CLAUSE
        x.contains("ne")         //## issuekeys: MSG_NO_METHOD_DESCRIPTOR_FOUND_FOR_METHOD, MSG_NO_METHOD_DESCRIPTOR_FOUND_FOR_METHOD, MSG_NO_SUCH_FUNCTION
    }
  }

  private function foo4(x: Object) {
    switch (typeof(x)) {
      case MyEnum:
        print("Enum")
      case String:  //## issuekeys: MSG_NONTERMINAL_CASE_CLAUSE
        x.contains("ne")         //## issuekeys: MSG_NO_METHOD_DESCRIPTOR_FOUND_FOR_METHOD, MSG_NO_METHOD_DESCRIPTOR_FOUND_FOR_METHOD, MSG_NO_SUCH_FUNCTION
    }
  }

  function test() {
    var x: Object = "neat"
    var f = x typeis String

    switch (typeof( ((x)) )) {  // crazy parentheses are valid
      case MyEnum:
          if (f) {
            switch (x) {
              case ONE:
                  return
              case TWO:
                  throw new java.lang.RuntimeException()
            }
          } else {
            break
          }
        /* This should work as the previous case IS terminal, we considered all the possible cases (ONE, TWO) */
      case String:
          x.contains("ne")
    }
  }

  function foo5() {
    var x:Object = "neat"

    switch ( typeof( ((x)) ) ) {  // this case with parentheses is a valid one
      case String:
        print(x.capitalize())
        if (x == "h") {
          break
        } else {
          return     // note return instead of break
        }
      case Runnable:
        /* the following should work, because "case String" ended with "break" in all branches of control flow */
        x.run()
    }
  }
}