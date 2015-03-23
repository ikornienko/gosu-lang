package gw.specContrib

uses gw.BaseVerifyErrantTest
uses java.io.File
uses java.lang.*
uses java.util.ArrayList
uses java.lang.StringBuilder
uses gw.lang.reflect.gs.IGosuClass
uses java.util.Collections
uses java.io.BufferedReader
uses java.io.StringReader
uses gw.lang.parser.IParseIssue
uses gw.lang.reflect.TypeSystem
uses java.util.Set
uses java.util.regex.Pattern

class ProcesSpecContribTest extends BaseVerifyErrantTest {

  private function findAllErrantFiles(file : File, errantClasses: List<String>) {
    var files = file.listFiles()
    for(f in files) {
      if(f.Directory) {
        findAllErrantFiles(f, errantClasses)
      } else if(f.File and f.Name.startsWith("Errant") and !f.Name.endsWith(".java")) {
        errantClasses.add(convertToClassPath(f))
      } else {
        print("Not an Errant file: " + f.AbsolutePath)
      }
    }
  }

  private function compareErrantTypeWithCompilerBehaviour( gsClass: IGosuClass ) {
    print("Processing ${gsClass.Name}")
    var bValid = gsClass.Valid
    var knowBreakLines : ArrayList<Integer> = {}

    var issuesByLine = bValid and gsClass.ParseResultsException == null ?
                                           Collections.emptyMap<Integer,List<IParseIssue>>()
                                           : gsClass.ParseResultsException.ParseIssues.partition( \ issue -> issue.Line )
    var iLine = 0
    var kbPattern =  Pattern.compile("//## KB\\([A-Z]+-[0-9]+\\)")
    using( var reader = new BufferedReader( new StringReader( gsClass.Source ) ) ) {
      var line = reader.readLine()
      while( line != null ) {
        iLine++
        if( line.indexOf( "//## KB(" ) != -1 ) {
          assertTrue( gsClass.Name + " : Wrong jira format in known break on line " + iLine, kbPattern.matcher(line).find())
          if(!skipKnownBreak) {
            knowBreakLines.add(iLine)
          } else {
            issuesByLine.remove(iLine)
          }
        } else {
          var iOffset = line.indexOf( "//## issuekeys:" )
          if(iOffset != -1) {
            var issuesForLine = issuesByLine.get( iLine )
            assertTrue( gsClass.Name + " : Found unexpected error[s] on line " + iLine, issuesForLine != null )
            issuesByLine.remove(iLine)
          }
        }
        line = reader.readLine()
      }
      assertTrue( gsClass.Name + " : found known break[s] at line[s]: [" + knowBreakLines.join(", ") + "]", knowBreakLines.Empty)
    }
    var err = new StringBuilder()
    err.append(gsClass.Name)
    if(!issuesByLine.Empty) {
      for(l in issuesByLine.Keys) {
        err.append("\nNot found expected error[s] on line ").append(l).append(":  ")
                                                            .append(issuesByLine[l].reduce(new StringBuilder(), \ ret, el -> ret.append(el.MessageKey.Key).append(", ")))
      }
    }
    assertTrue(err.toString(), issuesByLine.Empty )
  }

  private function convertToClassPath(f : File) : String {
    var dotPath = f.AbsolutePath.replace(File.separator, ".")
    var i = dotPath.indexOf("gw.specContrib")
    var extLength = f.Extension.length()+1
    return dotPath.substring(i, dotPath.length() - extLength)
  }

  function testAnalyzeSpecContrib() {
    var excluded : Set<String> = {
                                   "gw.specContrib.typeinference.Errant_SwitchTypeNarrowing",  // IDE-426
                                   "gw.specContrib.typeinference.Errant_CollectionInitializerTypeInference", // IDE-1798 // IDE-1807
                                   "gw.specContrib.expressions.cast.generics.Errant_TypeParamExtending", //IDE-1731
                                   "gw.specContrib.classes.Errant_ConstructorOverrideInAnonymousClass",  // IDE-1821
                                   "gw.specContrib.classes.enhancements.Errant_SymbolCollision_ListEnh2", // IDE-1824

                                   /* Feature literals broken tests */
                                   "gw.specContrib.featureLiterals.gosuMembersBinding.genericsFL.Errant_FLCollections", //IDE-???
                                   "gw.specContrib.featureLiterals.gosuMembersBinding.genericsFL.Errant_FLCollectionOfCollections", //IDE-???
                                   "gw.specContrib.featureLiterals.gosuMembersBinding.genericsFL.Errant_FLParameterizedFunction", //IDE-???
                                   "gw.specContrib.featureLiterals.gosuMembersBinding.Errant_FLExpressionValue", //IDE-???
                                   "gw.specContrib.featureLiterals.gosuMembersBinding.Errant_FLStaticVsNonStaticMethods", //IDE-???
                                   "gw.specContrib.featureLiterals.gosuMembersBinding.namedParams.Errant_FLNamedParams", //IDE-1611

                                   /* to skip as we don't support this check in our testing framework */
                                   "gw.specContrib.classes.Errant_ClassDeclaredInEnhancement",
                                   "gw.specContrib.classes.Errant_ClassNotNamedAfterFile",
                                   "gw.specContrib.classes.Errant_EnhancementDeclaredInClass",
                                   "gw.specContrib.classes.Errant_EnhancementNotNamedAfterFile"
                                 }
    var errantClasses = new ArrayList<String>()
    findAllErrantFiles(new File("gosu-test/src/test/gosu/gw/specContrib"), errantClasses)
    var j = errantClasses.size()-1

    for(c in errantClasses index i) {
      if(!excluded.contains(c)) {
        System.out.print("["+ i + "/" + j +  "]  ")
        compareErrantTypeWithCompilerBehaviour(TypeSystem.getByFullName(c) as IGosuClass)
      }
    }
  }
}