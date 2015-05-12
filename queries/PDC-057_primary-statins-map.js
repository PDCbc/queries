/**
 * Query Title: PDC-057
 * Query Type:  Ratio
 * Desctiption: Statin: Primary prevention.
 */
function map( patient ){
  /**
   * Denominator:
   *   - have received a statin medication (for cholesterol)
   */
  // Declare in map() scope, used by checDenominator() and checkNumerator()
  var mapScope_medications;

  function checkDenominator(){
    // List of medications, codes for statins
    var medList  = patient.medications(),
        medCodes ={ "whoATC" :[ "C10AA", "C10BX" ]};

    // Filters (variable declared in map())
    mapScope_medications = filter_general( medList, medCodes );

    return isMatch( mapScope_medications );
  }


  /**
   * Numerator:
   *   - medication is active
   *   - have not had a stroke
   *   - have not had a myocardial infarction (MI, heart attack)
   *   - have not had an acute myocardial infarction (AMI, heart attack)
   */
  function checkNumerator(){
    // Denominator's list of medications, list of conditions, condition codes
    var medList  = mapScope_medications,
        conList  = patient.conditions(),
        conCodes ={ "ICD9":[ "410..*", "411..*", "412..*", "429.7",
                             "410",    "411",    "412",    "V17.1",
                             "438",    "433.1",  "434.1",  "438..*" ]},

    // Filters
        medications = filter_activeMeds( medList ),
        conditions  = filter_general( conList, conCodes );

    return isMatch( medications )&&(! isMatch( conditions ));
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

