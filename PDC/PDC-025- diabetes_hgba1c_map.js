/**
* Query Title: PDC-025
* Query Type:  Ratio
* Description: HGBA1C in last 6 months / for patients with diabetes
*/
function map( patient ){
  /**
  * Denominator
  *
  * Base criteria:
  *   - diagnosed with diabetes
  */
  function checkDenominator(){
    // Coded entry lists
    var conList       = patient.conditions(),

    // Medical codes
        // http://www.cms.gov/medicare-coverage-database/staticpages/icd-9-code-lookup.aspx?KeyWord=diabetes
        conCodes      ={ "ICD9"      :[ "^250" ]},  // Diabetes, types 1 and 2

    // Filters
        conditions    = filter_general( conList, conCodes );

    // Inclusion/exclusion
    return isMatch( conditions );
  }


  /**
  * Numerator
  *
  * Additional criteria:
  *   - HGBA1C recorded
  *   ---> in last year
  */
  function checkNumerator(){
    // Values
    // Dates
    //   - end:   () for current date, otherwise ( YYYY, MM, DD )
    //   - start: subtract from end as Y, M, D
    var end      = new Date(),
        resStart = new Date( end.getFullYear(), end.getMonth() - 6, end.getDate() ),

    // Lists
        resList  = patient.results(),

    // Medical codes
        resCodes ={ "pCLOCD"    :[ "4548-4",     // Hemoglobin A1c/​Hemoglobin.total in Blood
                                   "4549-2",     // Hemoglobin A1c/​Hemoglobin.total in Blood by Electrophoresis
                                   "17855-8",    // Hemoglobin A1c/​Hemoglobin.total in Blood by calculation
                                   "17856-6",    // Hemoglobin A1c/​Hemoglobin.total in Blood by HPLC
                                   "41995-2",    // Hemoglobin A1c [Mass/​volume] in Blood
                                   "43150-2",    // Hemoglobin A1c measurement device panel
                                   "55454-3",    // Hemoglobin A1c in Blood
                                   "59261-8",    // Hemoglobin A1c/​Hemoglobin.total in Blood by IFCC protocol
                                   "62388-4",    // Hemoglobin A1c/​Hemoglobin.total in Blood by JDS/​JSCC protocol
                                   "71875-9" ]}, // Hemoglobin A1c/​Hemoglobin.total [Pure mass fraction] in Blood
                                                 // http://search.loinc.org/search.zul?query=hemoglobin+a1c

    // Filters
        results       = filter_general( resList, resCodes, resStart );

    // Inclusion/exclusion
    return isMatch( results );
  }


  /**
  * Emit Numerator and Denominator:
  *   - numerator must also be in denominator
  *   - tagged with physician ID
  */
  var denominator = checkDenominator(),
      numerator   = denominator && checkNumerator(),
      physicianID = "_" + patient.json.primary_care_provider_id;

  emit( "denominator" + physicianID, +denominator );
  emit( "numerator"   + physicianID, +numerator   );
}


/*******************************************************************************
* Helper Functions                                                             *
*   These should be the same for all queries.  Copy a fresh set on every edit! *
*******************************************************************************/


/**
* Filters a coded entry list:
*   - parameters 1 & 2: list, codes
*     - conditions(), immunizations(), medications(), results() or vitalSigns()
*     - LOINC, pCLOCD, whoATC, SNOMED-CT, whoATC
*   - parameters 3 - 6: dates or values, keep low/high pairs together
*     - minimum and maximum values
*     - start and end dates
*     --> inclusive ranges, boundary cases are counted
*     - null/undefined/unsubmitted values are ignored
*/
function filter_general( list, codes, p3, p4, p5, p6 ){
  // Default variables = undefined
  var min, max, start, end, filteredList;

  // Check parameters, which can be dates or number values (scalars)
  if(( p3 instanceof Date )&&( p4 instanceof Date )){
    start = p3;
    end   = p4;
    min   = p5;
    max   = p6;
  }
  else if(( p3 instanceof Date )&&(! p4 )){
    start = p3;
  }
  else if(( p3 instanceof Date )&&( typeof p4 === 'number' )){
    start = p3;
    min   = p4;
    max   = p5;
  }
  else if(( typeof p3 === 'number' )&&( typeof p4 === 'number' )){
    min   = p3;
    max   = p4;
    start = p5;
    end   = p6;
  }
  else if(( typeof p3 === 'number' )&&(! p4 )){
    min   = p3;
  }
  else if(( typeof p3 === 'number' )&&( p4 instanceof Date )){
    min   = p3;
    start = p4;
    end   = p5;
  }

  // Use API's match functions to filter based on codes and dates
  //   - Immunizations, medications and results use an exact code match
  //   - Conditions use a regex match, so make sure to preface with '^'!
  //   - undefined / null values are ignored
  if(( list[0] )&&( list[0].json._type === 'Condition' ))
    filteredList = list.regex_match( codes, start, end );
  else
    filteredList = list.match( codes, start, end );

  // If there are scalar values (min/max), then filter with them
  if( typeof min === 'number' ){
    // Default value
    max = max || 1000000000;
    filteredList = filter_values( filteredList, min, max );
  }

  return filteredList;
}


/**
* Filters a list of medications:
*   - active status only (20% pad on time interval)
*/
function filter_activeMeds( matches ){
  var now      = new Date(),
      toReturn = new hQuery.CodedEntryList();

  for( var i = 0, L = matches.length; i < L; i++ ){
    var drug  = matches[ i ],
        start = drug.indicateMedicationStart().getTime(),
        pad   =( drug.indicateMedicationStop().getTime() - start )* 1.2,
        end   = start + pad;

    if( start <= now && now <= end )
      toReturn.push( drug );
  }
  return toReturn;
}


/**
* Used by filter_general() and filter_general()
*   - inclusive range, boundary cases are counted
*/
function filter_values( list, min, max ){
  // Default value
  max = max || 1000000000;

  var toReturn = new hQuery.CodedEntryList();

  // Builds a set with values meeting min/max
  for( var i = 0, L = list.length; i < L; i++ ){
    var entry  = list[ i ],
        scalar = entry.values()[0].scalar();

    if( min <= scalar && scalar <= max )
      toReturn.push( entry );
  }
  return toReturn;
}


/**
* T/F: Does a filtered list contain matches (/is not empty)?
*/
function isMatch( list ) {
  return 0 < list.length;
}


/**
* T/F: Does the patient fall in this age range?
*   - inclusive range, boundary cases are counted
*/
function isAge( ageMin, ageMax ) {
  // Default values
  ageMax = ageMax || 200;

  ageNow = patient.age( new Date() );
  return ( ageMin <= ageNow && ageNow <= ageMax );
}


/*******************************************************************************
* Debugging Functions                                                          *
*   These are badly commented, non-optimized and intended for development.     *
*******************************************************************************/


/**
* Substitute for filter_general() to troubleshoot values
*/
function emit_filter_general( list, codes, min, max ){
  var filtered = list.match( codes );

  if( typeof min === 'number' )
    filtered = filter_values( filtered, min,( max || 1000000000 ));

  emit_values( filtered, min, max );

  return filtered;
}


/**
* Used by emit_filter_general() to emit age, ID and values
*/
function emit_values( list, min, max ){
  for( var i = 0, L = list.length; i < L; i++ ){

    if( list[ i ].values()[0] ){
      var scalar = list[ i ].values()[0].scalar();

      scalar = scalarToString( scalar );
      var units  = " " + list[ i ].values()[0].units(),
          age    = " -- " + scalarToString( patient.age ( new Date() )),
          first  = " -- " + patient.json.first.substr( 1, 5 );
      emit( scalar + units + age + first, 1 );
    }
  }
}


/**
* Round a scalar (or int) and convert to string, otherwise string emit crashes
*/
function scalarToString( scalar ){
  return Math.floor( scalar.toString() );
}
