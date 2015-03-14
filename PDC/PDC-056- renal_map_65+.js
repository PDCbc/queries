/**
* Query Title: PDC-056
* Query Type:  Ratio
* Description: 65+ w/ impaired renal: digoxin > 125/day?
*
* Denominator inclusion:
*   - 65+ years old
*   - impaired renal function
*   --> eGFR < 50 ml/min OR creatine > 150 μmol/l
*
* Numerator inclusion:
*   - in denominator
*   - digoxin (medication) > 125 mcg/day (using 0.125 mg/day)
*   - medication is active
*/


function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;


  /**
  * Denominator
  *
  * Values:
  *  min age, eGFR < 50 ml/min, creatine > 150 μmol/l
  *
  * Sets:
  *  list of lab test results, codes for eGFR and creatine
  *
  * Function:
  *  filters results and determines inclusion/exclusion
  */
  var d_ageMin         = 0,
      d_valMax_GFR     = 49.9,
      d_valMin_Cre     = 150;

  var d_resList        = patient.results(),
      d_resCodes_GFR   ={ "pCLOCD" :[ "33914-3" ]},
      d_resCodes_Cre   ={ "pCLOCD" :[ "45066-8", "14682-9", "2160-0", "33914-3",
                                      "50044-7", "48642-3", "48643-1" ]};

  function checkDenominator(){
    var d_final_GFR = filter_results( d_resList, d_resCodes_GFR, 0, d_valMax_GFR ),
        d_final_Cre = emit_filter_results( d_resList, d_resCodes_Cre, d_valMin_Cre );

    return isAge( d_ageMin ) &&
      ( isMatch( d_final_GFR ) || isMatch( d_final_Cre ));
  }


  /**
  * Numerator
  *
  * Values:
  *   digoxin > 0.125 MG/day
  *
  * Sets:
  *   list of medications, codes for digoxin
  *
  * Function:
  *  filters results and determines inclusion/exclusion
  */
  var n_medMin   = 0.125; // Measured in MG

  var n_medList  = patient.medications(),
      n_medCodes ={ "whoATC":[ "C01AA*" ],
                    "HC-DIN":[ "02281236", "02281228", "02281201", "02245428",
                               "02245427", "02245426", "02048264", "02048272",
                               "0021415",  "00698296", "00647470"]};

  function checkNumerator(){
    var n_final = filter_medications( n_medList, n_medCodes, n_medMin );

    return isMatch( n_final );
  }


  /**
  * Emit Numerator and Denominator
  */
  var denominator = checkDenominator(),
      numerator   = denominator && checkNumerator();
      emit( "denominator" + pid, denominator );
      emit( "numerator"   + pid, numerator   );
}


/*******************************************************************************
* Helper Functions                                                             *
*   These should be the same for all queries.  Copy a fresh set on every edit! *
*******************************************************************************/


/**
* Filters a list of lab results:
*   - lab codes (e.g. pCLOCD)
*   - minimum and maximum values
*/
function filter_results( list, codes, min, max ){
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
*   - medication codes (e.g. whoATC, HC-DIN)
*   - active status
*   - minimum and maximum values
*/
function filter_medications( list, codes, min, max ){
  // Use API's .match() to filter with codes
  var filteredList = list.match( codes );

  // Filter out inactive medications
  filteredList = filter_activeMeds( list );

  // If there are values, then filter with them
  if( typeof min === 'number' ){
    // Default value
    max = max ||  1000000000;
    filteredList = filter_values( filteredList, min, max );
  }

  return filteredList;
}


/**
* Used by filter_results() and filter_medications()
*/
function filter_values( list, min, max ){
  // Default values
  min = min || -1000000000;
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
* Used by filter_medications()
*/
function filter_activeMeds( matches, multiplier ){
  // Default value
  multiplier = multiplier || 1.2;

  var now      = new Date(),
      toReturn = new hQuery.CodedEntryList();

  if(! matches.length )
    return toReturn;

  for( var i = 0, l = matches.length; i < l; i++ ){
    var drug  = matches[ i ],
        start = drug.indicateMedicationStart().getTime(),
        pad   =( drug.indicateMedicationStop().getTime() - start )* multiplier,
        end   = start + pad;

    if( start <= now && now <= end ){
      toReturn.push( drug );
    }
  }
  return toReturn;
}


/**
* T/F: Is there anything (aka. a match) in a list?
*/
function isMatch( list ) {
  return 0 < list.length;
}


/**
* T/F: Is patient in the age range?
*/
function isAge( ageMin, ageMax ) {
  // Default values
  ageMin = ageMin || 0;
  ageMax = ageMax || 200;

  ageNow = patient.age( new Date() );
  return ( ageMin <= ageNow && ageNow <= ageMax );
}


/*******************************************************************************
* Debugging Functions                                                          *
*   These are badly commented, non-optimized and intended for troubleshooting. *
*******************************************************************************/


/**
* Substitute for filter_results() to troubleshoot values
*/
function emit_filter_results( list, codes, min, max ){
  var filtered = list.match( codes );

  if( typeof min === 'number' )
    filtered = filter_values( filtered, min,( max || 1000000000 ));

  emit_values( filtered, min, max );

  return filtered;
}


/**
* Emit age, ID and values
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
