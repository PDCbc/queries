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
  // List of medications, codes for statins
  var d_medList  = patient.medications(),
      d_medCodes ={ "whoATC" :[ "C10AA", "C10BX" ]};

  // Filters
  var d_final = filter_general( d_medList, d_medCodes );

  function checkDenominator(){
    return isMatch( d_final );
  }


  /**
  * Numerator:
  *   - medication is active
  *   - have not had a stroke
  *   - have not had a myocardial infarction (MI, heart attack)
  *   - have not had an acute myocardial infarction (AMI, heart attack)
  */
  // Filtered list of medications, list of conditions, codes for conditions
  var n_medList     = d_final,
      n_conditions  = patient.conditions(),
      n_condCodes   ={ "ICD9":[ "410..*", "411..*", "412..*", "429.7",
                                "410",    "411",    "412",    "V17.1",
                                "438",    "433.1",  "434.1",  "438..*" ]};

  // Filters
  var n_medsFinal = filter_activeMeds( n_medList ),
      n_condFinal = filter_general( n_conditions, n_condCodes );

  function checkNumerator(){
    return isMatch( n_medsFinal )&&(! isMatch( n_condFinal ));
  }


  /**
  * Emit Numerator and Denominator, tagged with physician ID
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
* Filters a list:
*   - lab, medication and condition codes (e.g. pCLOCD, whoATC, HC-DIN)
*   - minimum and maximum values
*/
function filter_general( list, codes, min, max ){
  // Use API's .match() to filter with codes
  var filteredList = list.match( codes );

  // If there are values, then filter with them
  if( typeof min === 'number' ){
    // Default value
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
* Filters a list (used by filter_general()):
*   - minimum and maximum values
*/
function filter_values( list, min, max ){
  // Default values
  max = max ||  1000000000;

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
* T/F: Does a list contain matches (/is not empty)?
*/
function isMatch( list ) {
  return 0 < list.length;
}


/**
* T/F: Does the patient fall in this age range?
*/
function isAge( ageMin, ageMax ) {
  // Default value
  ageMax = ageMax || 200;

  ageNow = patient.age( new Date() );
  return( ageMin <= ageNow && ageNow <= ageMax );
}
