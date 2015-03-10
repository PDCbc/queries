/**
* Query Title: PDC-027
* Description: Diabetics with LDL in last yr, LDL <= 2.5
*
* Explanation: Of patients with diabetes, how many have had LDL recorded in
*              the last year, such that LDL <= 2.5?
*/

function map( patient ){
  // Store physician ID, via JSON key
  var pid = "_" + patient.json.primary_care_provider_id;


  /**
  * Denominator
  *
  * Values:
  *  no restriction
  *
  * Sets:
  *   list of conditions, code for diabetes, code filtered match
  */
  var denomiList    = patient.conditions(),
      denomiCodes   ={ "ICD9" :[ "250*" ]},
      denomiMatches = denomiList.regex_match( denomiCodes );


  /**
  * Target Group
  *
  * Values:
  *   1 year ago <= date <= now, 0 <= LDL <= 2.5 (=tMax)
  *
  * Sets:
  *   list of test results, code for HGBA1C, date/code filtered match
  */
  var targetEnd     = new Date(),
      targetStart   = new Date( end.getFullYear() - 1, end.getMonth(), end.getDate() ),
      targetMin     = 0,
      targetMax     = 2.5;

  var targetList    = patient.results(),
      targetCodes   ={ "pCLOCD" :[ "39469-2" ]},
      targetMatches = targetList.match( targetCodes, targetStart, targetEnd );


  /**
  * Emit Numerator and Denominator
  *
  * Denominator:  Diabetics
  * Target Group: LDL <= 2.5, recorded in last year
  * Numerator:    Intersection of denominator and target
  */
  var denominator = checkDenominator( denomiMatches ),
      numerator   = denominator && checkTarget( targetMatches, targetMin, targetMax );
      emit( "denominator" + pid, denominator );
      emit( "numerator"   + pid, numerator   );
}


/**
* Checks the patient for a denominator match
*
*   1 or 0: diabetic?
*/
function checkDenominator( matches ) {
  return 0 < matches.length;
}


/**
* Checks the patient for a target group match
*
*   1 or 0: LDL <= 2.5? (already filtered by date)?
*/
function checkTarget( matches, min, max ) {
  for( var i = 0, l = matches.length; i < l; i++ ){
    var value = matches[ i ].values()[ 0 ].scalar();
      if( min <= value && value <= max )
        return true;
  }
  return false;
}
