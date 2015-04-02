/**
 * Query Title: PolyRx:  5+ meds, 65+
 * Query Title: PDC-053
 * Query Type:  Ratio
 * Desctiption: 5+ medications / age 65+
 */
function map( patient ){
  /**
   * Denominator:
   *   - 65+ years old
   */
  function checkDenominator(){
    var ageMin = 65;

    return isAge( ageMin );
  }


  /**
   * Numerator:
   *   - 5+ medications
   *   - medications are active
   */
  function checkNumerator(){
    var medMin    = 5,

    // List of medications
        medList   = patient.medications(),

    // Filters
        medActive = filter_activeMeds( medList );

    return isMatch( medActive )&&( medMin <= medActive.length );
  }


  /**
   * Emit Numerator and Denominator, tagged with physician ID
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
