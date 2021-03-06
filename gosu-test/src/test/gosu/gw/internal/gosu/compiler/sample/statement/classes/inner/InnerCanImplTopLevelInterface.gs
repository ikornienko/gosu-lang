package gw.internal.gosu.compiler.sample.statement.classes.inner

class InnerCanImplTopLevelInterface
{
  function makeInner() : Inner
  {
    return new Inner()
  }

  class Inner implements ITopLevelFoo
  {
    function interface1() : String
    {
      return "1"
    }

    function interface2() : Number
    {
      return 2
    }
  }
}