/**
 * Query Title: STOPP: Dig >125 65+
 * Query ID:    PDC-056
 * Query Type:  Ratio
 * Description: Digoxin > 125 mcg/day / renal, age 65+
 */
function map( patient ){
  /**
   * Denominator:
   *   - 65+ years old
   *   - impaired renal function
   *   --> EGFR < 50 ml/min OR creatinine > 150 μmol/l
   */
  function checkDenominator(){
    var ageMin     = 65,
        valMax_E   = 50.001,                 // (+0.001, using INCLUSIVE ranges)
        valMin_C   = 150.001,                // (+0.001, using INCLUSIVE ranges)

    // List of lab test results, codes for eGFR and creatine
        resList    = patient.results(),
        resCodes_E ={ "pCLOCD" :[ "33914-3" ]},
        resCodes_C ={ "pCLOCD" :[ "45066-8", "14682-9", "2160-0", "33914-3",
                                  "50044-7", "48642-3", "48643-1" ]},

    // Filters
        results_E = filter_general( resList, resCodes_E, 0, valMax_E ),
        results_C = filter_general( resList, resCodes_C, valMin_C );

    return isAge( ageMin )&&( isMatch( results_E )|| isMatch( results_C ));
  }


  /**
   * Numerator:
   *   - digoxin (medication) > 125 mcg/day (using 0.125 mg/day)
   *   - medication is active
   */
  function checkNumerator(){
    // List of medications, codes for digoxin
    var medMin   = 0.1251,                  // (+0.0001, using INCLUSIVE ranges)

    // List of medications, codes for digoxin (class of medicines)
        medList  = patient.medications(),
        medCodes ={ "whoATC":[ "C01AA*" ],
                    "HC-DIN":[ "02281236", "02281228", "02281201", "02245428",
                               "02245427", "02245426", "02048264", "02048272",
                               "0021415",  "00698296", "00647470" ]},

    // Filters
        medications = filter_general( medList, medCodes, medMin );
        medications = filter_activeMeds( medications );

    return isMatch( medications );
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
