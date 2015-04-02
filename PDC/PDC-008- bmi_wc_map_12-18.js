/**
 * Query Title: PDC-008
 * Query Type:  Ratio
 * Description: BMI or WC in last 2y / age 12-19
 */
function map( patient ){
  /**
    * Denominator
    *
    * Base criteria:
    *   - age 12 - 19
    */
  function checkDenominator(){
    // Ages
    var ageMin  = 12,
        ageMax  = 19;

    // Inclusion/exclusion
    return isAge( ageMin, ageMax );
  }


  /**
    * Numerator
    *
    * Additional criteria:
    *   - has Waist circuference
    *   OR
    *   - has BMI
    *   OR
    *   - has height AND has weight
    *   ---> ALL documented in last 2 years
    */
  function checkNumerator(){
    // Dates
    var end      = new Date(),
        vitStart = new Date( end.getFullYear() - 2, end.getMonth(), end.getDate() ),

    // Coded entry lists
        vitList  = patient.vitalSigns(),

    // Medical codes
        // http://search.loinc.org/search.zul
        vitCodes_WC ={ "LOINC" :[ "56115-9" ]},  // Waist Circumference by NCFS
        vitCodes_BM ={ "LOINC" :[ "39156-5" ]},  // Body mass index (BMI) [Ratio]
        vitCodes_Ht ={ "LOINC" :[ "8302-2" ]},   // Body height
        vitCodes_Wt ={ "LOINC" :[ "3141-9" ]},   // Body weight Measured

    // Filters
    //   - start/end and min/max may be used in either paired order
    //   - values and dates may be ommitted as necessary
        vitalSigns_WC    = filter_general( vitList, vitCodes_WC, vitStart ),
        vitalSigns_BM    = filter_general( vitList, vitCodes_BM, vitStart ),
        vitalSigns_Ht    = filter_general( vitList, vitCodes_Ht, vitStart ),
        vitalSigns_Wt    = filter_general( vitList, vitCodes_Wt, vitStart );

    // Inclusion/exclusion
    //   - isAge() and isMatch() are boolean (yes/no)
    //   - use && (AND) and || (OR) with brackets (...)
    return isMatch( vitalSigns_WC )||
           isMatch( vitalSigns_BM )||
           ( isMatch( vitalSigns_Ht )&& isMatch( vitalSigns_Wt ));
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
 * Helper Functions                                                            *
 *   These should be the same for all queries.  Copy a fresh set on every edit!*
 ******************************************************************************/


/**
 * Filters a coded entry list:
 *   - parameters 1 & 2: list, codes
 *     - conditions(), immunizations(), medications(), results() or vitalSigns()
 *     - LOINC, pCLOCD, whoATC, SNOMED-CT, whoATC
 *   - parameters 3 - 6: dates or values, keep low/high pairs together
 *     - minimum and maximum values
 *     - start and end dates
 *     --> inclusive range, boundary cases are counted
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
  for( var i = 0, L = list.length; i < L; i++ ){
    // Try-catch for missing value field in lab results
    try {
      var entry  = list[ i ],
          scalar = entry.values()[ 0 ].scalar();
      if( min <= scalar && scalar <= max )
        toReturn.push( entry );
    }
    catch( err ){
      emit( "Values key is missing! " + err, 1 );
    }
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
