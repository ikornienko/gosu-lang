package gw.specContrib.generics

uses gw.test.TestClass
uses gw.lang.reflect.IRelativeTypeInfo

class GenericsContribTest extends TestClass {

  function testRecursiveBoundingTypePreserved() {
    assertTrue( RecursiveGosu.Type.Valid )
    assertSame( RecursiveGosu.Type.GenericType.GenericTypeVariables[0].BoundingType.TypeParameters[0], RecursiveGosu.Type.GenericType.GenericTypeVariables[0].TypeVariableDefinition.Type )
    assertSame( RecursiveJava.Type.GenericType.GenericTypeVariables[0].BoundingType.TypeParameters[0], RecursiveJava.Type.GenericType.GenericTypeVariables[0].TypeVariableDefinition.Type )
  }

  function testJavaClassWithRecursiveTypeVarRetainsRecursiveBounds() {
    assertSame( JavaClassWithRecursiveTypeVar.Type.GenericType.GenericTypeVariables[0].BoundingType,
                java.util.List.Type.GenericType.getParameterizedType( {JavaClassWithRecursiveTypeVar.Type.GenericType.GenericTypeVariables[0].TypeVariableDefinition.Type} ) )
    assertEquals( JavaClassWithRecursiveTypeVar.Type.GenericType.GenericTypeVariables[0].BoundingType.Name,
                  "java.util.List<T>" )
  }

  function testContravariantWildcardTypeUsesBoundingTypeOfItsTypeVarBound() {
    assertEquals( BeanPopulator<Bean>, (Bean.Type.TypeInfo as IRelativeTypeInfo).getMethod( Bean, "addPopulator", {BeanPopulator<Bean>} ).Parameters[0].FeatureType )
  }

  function testMohrRecursives() {
    var yey: Yey
    assertEquals( Yey, statictypeof yey.foo() )
  }

  function testDefaultMetaType() {
    assertEquals( String, typeof new DefaultMetaType().foo() )
  }
}