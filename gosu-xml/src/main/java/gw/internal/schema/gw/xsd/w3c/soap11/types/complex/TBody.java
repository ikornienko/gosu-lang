package gw.internal.schema.gw.xsd.w3c.soap11.types.complex;

/***************************************************************************/
/* THIS IS AUTOGENERATED CODE - DO NOT MODIFY OR YOUR CHANGES WILL BE LOST */
/* THIS CODE CAN BE REGENERATED USING 'xsd-codegen'                        */
/***************************************************************************/
public class TBody extends gw.internal.schema.gw.xsd.w3c.wsdl.types.complex.TExtensibilityElement implements gw.internal.xml.IXmlGeneratedClass {

  public static final javax.xml.namespace.QName $ATTRIBUTE_QNAME_EncodingStyle = new javax.xml.namespace.QName( "", "encodingStyle", "" );
  public static final javax.xml.namespace.QName $ATTRIBUTE_QNAME_Namespace = new javax.xml.namespace.QName( "", "namespace", "" );
  public static final javax.xml.namespace.QName $ATTRIBUTE_QNAME_Parts = new javax.xml.namespace.QName( "", "parts", "" );
  public static final javax.xml.namespace.QName $ATTRIBUTE_QNAME_Required = new javax.xml.namespace.QName( "http://schemas.xmlsoap.org/wsdl/", "required", "wsdl" );
  public static final javax.xml.namespace.QName $ATTRIBUTE_QNAME_Use = new javax.xml.namespace.QName( "", "use", "" );
  public static final javax.xml.namespace.QName $QNAME = new javax.xml.namespace.QName( "http://schemas.xmlsoap.org/wsdl/soap/", "tBody", "soap" );
  public static final gw.util.concurrent.LockingLazyVar<gw.lang.reflect.IType> TYPE = new gw.util.concurrent.LockingLazyVar<gw.lang.reflect.IType>( gw.lang.reflect.TypeSystem.getGlobalLock() ) {
          @Override
          protected gw.lang.reflect.IType init() {
            return gw.lang.reflect.TypeSystem.getByFullName( "gw.xsd.w3c.soap11.types.complex.TBody" );
          }
        };
  private static final gw.util.concurrent.LockingLazyVar<java.lang.Object> SCHEMAINFO = new gw.util.concurrent.LockingLazyVar<java.lang.Object>( gw.lang.reflect.TypeSystem.getGlobalLock() ) {
          @Override
          protected java.lang.Object init() {
            gw.lang.reflect.IType type = TYPE.get();
            return getSchemaInfoByType( type );
          }
        };

  public TBody() {
    super( TYPE.get(), SCHEMAINFO.get() );
  }

  protected TBody( gw.lang.reflect.IType type, java.lang.Object schemaInfo ) {
    super( type, schemaInfo );
  }


  public java.util.List<java.net.URI> EncodingStyle() {
    //noinspection unchecked
    return (java.util.List<java.net.URI>) TYPE.get().getTypeInfo().getProperty( "EncodingStyle" ).getAccessor().getValue( this );
  }

  public void setEncodingStyle$( java.util.List<java.net.URI> param ) {
    TYPE.get().getTypeInfo().getProperty( "EncodingStyle" ).getAccessor().setValue( this, param );
  }


  public java.net.URI Namespace() {
    return (java.net.URI) TYPE.get().getTypeInfo().getProperty( "Namespace" ).getAccessor().getValue( this );
  }

  public void setNamespace$( java.net.URI param ) {
    TYPE.get().getTypeInfo().getProperty( "Namespace" ).getAccessor().setValue( this, param );
  }


  public java.util.List<java.lang.String> Parts() {
    //noinspection unchecked
    return (java.util.List<java.lang.String>) TYPE.get().getTypeInfo().getProperty( "Parts" ).getAccessor().getValue( this );
  }

  public void setParts$( java.util.List<java.lang.String> param ) {
    TYPE.get().getTypeInfo().getProperty( "Parts" ).getAccessor().setValue( this, param );
  }


  public java.lang.Boolean Required() {
    return (java.lang.Boolean) TYPE.get().getTypeInfo().getProperty( "Required" ).getAccessor().getValue( this );
  }

  public void setRequired$( java.lang.Boolean param ) {
    TYPE.get().getTypeInfo().getProperty( "Required" ).getAccessor().setValue( this, param );
  }


  public gw.internal.schema.gw.xsd.w3c.soap11.enums.UseChoice Use() {
    return (gw.internal.schema.gw.xsd.w3c.soap11.enums.UseChoice) TYPE.get().getTypeInfo().getProperty( "Use" ).getAccessor().getValue( this );
  }

  public void setUse$( gw.internal.schema.gw.xsd.w3c.soap11.enums.UseChoice param ) {
    TYPE.get().getTypeInfo().getProperty( "Use" ).getAccessor().setValue( this, param );
  }

  @SuppressWarnings( {"UnusedDeclaration"} )
  private static final long FINGERPRINT = -2385574128046212000L;

}