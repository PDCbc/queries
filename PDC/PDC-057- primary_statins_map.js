/**
* Query Title: PDC-057
* Query Type:  Ratio
* Desctiption: Statins for primary prevention
*/
function map( patient ){
  /**
  * Denominator:
  *   - have received a statin medication (for cholesterol)
  */
  // Keep in map() scope, used in checkNumerator()
  var d_medications;

  function checkDenominator(){
    // List of medications, codes for statins
    var medList  = patient.medications(),
        medCodes ={ "whoATC" :[ "C10AA", "C10BX" ]};

    // Filters
    d_medications = filter_general( medList, medCodes );

    return isMatch( d_medications );
  }


  /**
  * Numerator:
  *   - medication is active
  *   - have not had a stroke
  *   - have not had a myocardial infarction (MI, heart attack)
  *   - have not had an acute myocardial infarction (AMI, heart attack)
  */
  function checkNumerator(){
    // Denominator's list of medications, list of conditions, conditionn codes
    var medList  = d_medications,
        conList  = patient.conditions(),
        conCodes ={ "ICD9":[ "410..*", "411..*", "412..*", "429.7",
                             "410",    "411",    "412",    "V17.1",
                             "438",    "433.1",  "434.1",  "438..*" ]};

    // Filters
    var medications = filter_activeMeds( medList ),
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
      pid = "_" + patient.json.primary_care_provider_id;

  emit( "denominator" + pid, denominator );
  emit( "numerator"   + pid, numerator   );
}


/*******************************************************************************
* Helper Functions                                                             *
*   These should be the same for all queries.  Copy a fresh set on every edit! *
*******************************************************************************/


/**
* Filters a list of lab results:
*   - lab, medication and condition codes (e.g. pCLOCD, whoATC, HC-DIN)
*   - minimum and maximum values
*   --> exclusive range, boundary cases are excluded
*/
function filter_general( list, codes, min, max ){
  // Use API's .match() to filter with codes
  var filteredList = list.match( codes );

  // If there are values, then filter with them
  if( typeof min === 'number' ){
    max = max ||  1000000000;
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

  for( var i = 0, l = matches.length; i < l; i++ ){
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
*   --> exclusive range, boundary cases are excluded
*/
function filter_values( list, min, max ){
  // Default values
  max = max || 1000000000;

  var toReturn = new hQuery.CodedEntryList();

  // Builds a set with values meeting min/max
  for( var i = 0, L = list.length; i < L; i++ ){
    var entry  = list[ i ],
        scalar = entry.values()[0].scalar();

    if( min < scalar && scalar < max )
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
* Used by emit_filter_...() functions to emit age, ID and values
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
