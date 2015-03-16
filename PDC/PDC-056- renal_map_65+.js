/**
* Query Title: PDC-056
* Query Type:  Ratio
* Description: 65+ w/ impaired renal: digoxin > 125/day?
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
        valMax_E   = 50,
        valMin_C   = 150,

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
    var medMin   = 0.125,

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

  emit( "denominator" + physicianID, denominator );
  emit( "numerator"   + physicianID, numerator   );
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
